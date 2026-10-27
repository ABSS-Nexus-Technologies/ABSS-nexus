const crypto = require("crypto");

/**
 * ABSS Nexus OTP Engine (APITXT + Email Multi-channel Delivery)
 * - 5 Minutes Expiration Window
 * - Max 3 Resends per Session
 * - Anti-Bruteforce Attempt Limiting (Max 5 attempts)
 */

async function dispatchApiTxtSms(phone, code, type) {
  const apiKey = process.env.APITXT_API_KEY;
  if (!apiKey || apiKey.includes("placeholder")) {
    console.log(`[APITXT:Simulated] Mobile: ${phone} | OTP: ${code} | Type: ${type}`);
    return { success: true, simulated: true };
  }

  try {
    const message = `Your ABSS Nexus verification code is: ${code}. Valid for 5 minutes. Please do not share this OTP with anyone.`;
    const apiUrl = process.env.APITXT_API_URL || "https://api.txtbox.in/v1/sms/send";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "apiKey": apiKey
      },
      body: JSON.stringify({
        mobile: phone,
        message,
        sender: process.env.APITXT_SENDER_ID || "ABSSNX",
        otp: code
      })
    });

    if (!response.ok) {
      console.warn(`[APITXT] SMS gateway responded with ${response.status}`);
      return { success: false, status: response.status };
    }

    return { success: true };
  } catch (err) {
    console.warn(`[APITXT] Error sending SMS: ${err.message}`);
    return { success: false, error: err.message };
  }
}

async function generateAndSendOtp({ email, phone, type, db, writeDb, sendEmailFn }) {
  db.otps = db.otps || [];
  const normalizedEmail = (email || "").toLowerCase().trim();
  const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);

  // Check recent unexpired OTP for resend tracking
  const now = Date.now();
  const existingOtp = db.otps
    .filter((o) => o.email === normalizedEmail && o.type === type && !o.verified)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  let resendsCount = 0;
  if (existingOtp) {
    const createdAtMs = new Date(existingOtp.createdAt).getTime();
    // Resend limit applies within 15 minutes window
    if (now - createdAtMs < 15 * 60 * 1000) {
      resendsCount = (existingOtp.resendsCount || 0) + 1;
      if (resendsCount > 3) {
        return {
          error: "Maximum OTP resend limit reached (3 times). Please wait 15 minutes before requesting again."
        };
      }
    }
  }

  // Generate cryptographic 6-digit OTP
  const code = String(crypto.randomInt(100000, 999999));
  const expiresAt = new Date(now + 5 * 60 * 1000).toISOString(); // 5 Minutes Validity

  const newOtp = {
    id: `otp-${crypto.randomUUID()}`,
    email: normalizedEmail,
    phone: cleanPhone,
    code,
    type,
    attempts: 0,
    resendsCount,
    expiresAt,
    verified: false,
    createdAt: new Date().toISOString()
  };

  db.otps.push(newOtp);
  writeDb(db);

  // Dispatch via APITXT (if phone provided)
  if (cleanPhone) {
    dispatchApiTxtSms(cleanPhone, code, type).catch((e) => console.warn("[APITXT] SMS notice:", e.message));
  }

  // Dispatch via Transactional Email
  if (sendEmailFn && typeof sendEmailFn === "function") {
    const subject = type === "registration" 
      ? `🔐 Your Registration OTP: ${code} - ABSS Nexus Academy`
      : `🔑 Your Password Reset OTP: ${code} - ABSS Nexus Academy`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px; border: 1px solid #E5E7EB; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #0066CC; margin-top: 0;">ABSS Nexus Verification Code</h2>
        <p style="color: #374151; font-size: 15px;">Your one-time verification code is:</p>
        <div style="background: #F3F4F6; padding: 18px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #1D1D1F;">${code}</span>
        </div>
        <p style="color: #6B7280; font-size: 13px;">⏱️ This code is valid for <strong>5 minutes</strong>. Do not share this OTP with anyone.</p>
        <p style="color: #9CA3AF; font-size: 12px; border-top: 1px solid #E5E7EB; padding-top: 12px; margin-top: 20px;">ABSS Nexus Technologies • Secure Student Portal</p>
      </div>
    `;

    sendEmailFn({
      to: normalizedEmail,
      subject,
      html,
      text: `Your ABSS Nexus OTP code is: ${code}. Valid for 5 minutes.`
    }).catch((e) => console.warn("[Email OTP notice]:", e.message));
  }

  console.log(`[OTP Generated] To: ${normalizedEmail} | Phone: ${cleanPhone || "N/A"} | Code: ${code} | Type: ${type} | Expires in: 5m`);

  return {
    success: true,
    message: "OTP sent successfully. Valid for 5 minutes.",
    resendsRemaining: Math.max(0, 3 - resendsCount),
    demoOtp: code // Available for test validation
  };
}

function verifyOtpRecord({ email, code, type, db, writeDb }) {
  db.otps = db.otps || [];
  const normalizedEmail = (email || "").toLowerCase().trim();
  const cleanCode = String(code || "").trim();

  // Find latest unverified OTP matching email and type
  const matchingOtps = db.otps
    .filter((o) => o.email === normalizedEmail && o.type === type && !o.verified)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!matchingOtps.length) {
    return { error: "No active OTP request found. Please request a new OTP." };
  }

  const record = matchingOtps[0];

  // Check 5-minute expiration
  if (Date.now() > new Date(record.expiresAt).getTime()) {
    return { error: "OTP has expired. Please request a new OTP." };
  }

  // Check attempt limit
  record.attempts = (record.attempts || 0) + 1;
  if (record.attempts > 5) {
    writeDb(db);
    return { error: "Too many failed attempts. This OTP has been invalidated for security. Please request a new one." };
  }

  // Validate Code
  if (record.code !== cleanCode) {
    writeDb(db);
    return { error: `Incorrect OTP. You have ${5 - record.attempts} attempts remaining.` };
  }

  // Mark verified
  record.verified = true;
  record.verifiedAt = new Date().toISOString();
  writeDb(db);

  return {
    success: true,
    message: "OTP verified successfully."
  };
}

module.exports = {
  generateAndSendOtp,
  verifyOtpRecord,
  dispatchApiTxtSms
};
