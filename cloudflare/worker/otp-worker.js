// Cloudflare Worker for OTP handling with APITXT integration and D1 database

const json = (data, status = 200, origin = "*") =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    },
  });

async function hash(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateOtp() {
  const n = new Uint32Array(1);
  crypto.getRandomValues(n);
  return String(n[0] % 1000000).padStart(6, "0");
}

function randomTicket() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    // Enforce allowed origin (configure ALLOWED_ORIGIN in env)
    if (env.ALLOWED_ORIGIN && origin !== env.ALLOWED_ORIGIN) {
      return json({ error: "Origin not allowed" }, 403, env.ALLOWED_ORIGIN);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Vary": "Origin",
        },
      });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, env.ALLOWED_ORIGIN);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, env.ALLOWED_ORIGIN);
    }

    const phone = String(body.phone || "");

    // Validate Indian mobile number (91 + 10 digits, first digit 6-9)
    if (!/^91[6-9]\d{9}$/.test(phone)) {
      return json({ error: "Enter a valid Indian mobile number" }, 400, env.ALLOWED_ORIGIN);
    }

    const now = Math.floor(Date.now() / 1000);
    const url = new URL(request.url);

    // ------- Send OTP endpoint -------
    if (url.pathname === "/api/auth/send-otp") {
      // Rate limiting: at least 60s between requests per phone
      const existing = await env.DB.prepare(
        "SELECT last_sent_at FROM otp_challenges WHERE phone = ?"
      ).bind(phone).first();

      if (existing && now - existing.last_sent_at < 60) {
        return json({ error: "Wait before requesting another OTP" }, 429, env.ALLOWED_ORIGIN);
      }

      // Hourly cap per phone (5 requests per hour)
      const recent = await env.DB.prepare(
        "SELECT COUNT(*) AS n FROM otp_challenges WHERE phone = ? AND created_at > ?"
      ).bind(phone, now - 3600).first();

      if ((recent?.n || 0) >= 5) {
        return json({ error: "OTP request limit reached" }, 429, env.ALLOWED_ORIGIN);
      }

      const otp = generateOtp();
      const otpHash = await hash(`${phone}:${otp}:${env.OTP_PEPPER}`);

      await env.DB.prepare(`
        INSERT INTO otp_challenges
          (phone, otp_hash, expires_at, attempts, created_at, last_sent_at)
        VALUES (?, ?, ?, 0, ?, ?)
        ON CONFLICT(phone) DO UPDATE SET
          otp_hash = excluded.otp_hash,
          expires_at = excluded.expires_at,
          attempts = 0,
          created_at = excluded.created_at,
          last_sent_at = excluded.last_sent_at
      `).bind(phone, otpHash, now + 300, now, now).run();

      // Call APITXT SMS endpoint (GET per user example)
      const smsUrl = new URL("https://apitxt.com/api/sendOTP");
      smsUrl.searchParams.set("authkey", env.APITXT_AUTHKEY);
      smsUrl.searchParams.set("mobile", phone);
      smsUrl.searchParams.set("otp", otp);

      let smsResponse;
      try {
        smsResponse = await fetch(smsUrl.toString(), {
          method: "GET",
          signal: AbortSignal.timeout(10000),
        });
      } catch {
        // Cleanup on failure
        await env.DB.prepare("DELETE FROM otp_challenges WHERE phone = ?").bind(phone).run();
        return json({ error: "SMS provider unavailable; try again later" }, 502, env.ALLOWED_ORIGIN);
      }

      if (!smsResponse.ok) {
        await env.DB.prepare("DELETE FROM otp_challenges WHERE phone = ?").bind(phone).run();
        return json({ error: "SMS could not be sent" }, 502, env.ALLOWED_ORIGIN);
      }

      return json({ message: "OTP request accepted", expiresIn: 300, resendAfter: 60 }, 200, env.ALLOWED_ORIGIN);
    }

    // ------- Verify OTP endpoint -------
    if (url.pathname === "/api/auth/verify-otp") {
      const otp = String(body.otp || "");
      if (!/^\d{6}$/.test(otp)) {
        return json({ error: "Enter the 6-digit OTP" }, 400, env.ALLOWED_ORIGIN);
      }

      const row = await env.DB.prepare(
        "SELECT * FROM otp_challenges WHERE phone = ?"
      ).bind(phone).first();

      if (!row || row.expires_at < now || row.attempts >= 5) {
        return json({ error: "OTP expired or unavailable; request a new one" }, 400, env.ALLOWED_ORIGIN);
      }

      // Increment attempts before verification to mitigate brute‑force.
      await env.DB.prepare(
        "UPDATE otp_challenges SET attempts = attempts + 1 WHERE phone = ?"
      ).bind(phone).run();

      const suppliedHash = await hash(`${phone}:${otp}:${env.OTP_PEPPER}`);
      if (suppliedHash !== row.otp_hash) {
        return json({ error: "Incorrect OTP" }, 400, env.ALLOWED_ORIGIN);
      }

      // OTP succeeded – remove challenge.
      await env.DB.prepare("DELETE FROM otp_challenges WHERE phone = ?").bind(phone).run();

      const ticket = randomTicket();
      const ticketHash = await hash(ticket);

      await env.DB.prepare(
        "INSERT INTO verified_signups (ticket_hash, phone, expires_at, created_at) VALUES (?, ?, ?, ?)"
      ).bind(ticketHash, phone, now + 600, now).run();

      return json({ verified: true, signupTicket: ticket, expiresIn: 600 }, 200, env.ALLOWED_ORIGIN);
    }

    return json({ error: "Not found" }, 404, env.ALLOWED_ORIGIN);
  },
};

