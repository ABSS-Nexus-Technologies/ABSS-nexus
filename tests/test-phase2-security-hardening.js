const assert = require("assert");
const http = require("http");
const crypto = require("crypto");

const {
  evaluatePasswordPolicy,
  checkPasswordHistory,
  getPasswordExpiryDate,
  isPasswordExpired,
  isPasswordExpiringSoon,
  calculateDaysUntilExpiry,
} = require("../backend/security/password-policy");
const {
  generateCsrfToken,
  buildCsrfCookie,
  verifyCsrfToken,
} = require("../backend/security/csrf-protection");
const {
  generatePasswordResetToken,
  hashToken,
  createDeviceFingerprint,
} = require("../backend/security/crypto-vault");

const BASE_URL = "http://localhost:3000";

function apiRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const bodyStr = options.body ? (typeof options.body === "string" ? options.body : JSON.stringify(options.body)) : null;

    const req = http.request(
      url,
      {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(bodyStr ? { "Content-Length": Buffer.byteLength(bodyStr) } : {}),
          ...(options.headers || {}),
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          let json = null;
          try {
            json = JSON.parse(raw);
          } catch {}
          resolve({ status: res.statusCode, headers: res.headers, raw, json });
        });
      }
    );

    req.on("error", reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function runPhase2SecurityTests() {
  console.log("=================================================================");
  console.log("🔐 RUNNING ABSS NEXUS PHASE 2 ADVANCED SECURITY HARDENING SUITE");
  console.log("=================================================================\n");

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ FAIL: ${name}`);
      console.error(err);
      failed++;
    }
  }

  async function testAsync(name, fn) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ FAIL: ${name}`);
      console.error(err);
      failed++;
    }
  }

  // ==========================================
  // 1. CSRF Protection Unit Tests
  // ==========================================
  console.log("--- 1. Double-Submit CSRF Protection Engine ---");

  test("generateCsrfToken produces 256-bit (64 hex characters) cryptographically secure string", () => {
    const token = generateCsrfToken();
    assert.strictEqual(typeof token, "string");
    assert.strictEqual(token.length, 64);
  });

  test("buildCsrfCookie generates Lax SameSite cookie with 24-hour expiration", () => {
    const token = generateCsrfToken();
    const cookie = buildCsrfCookie(token);
    assert(cookie.includes(`abss_csrf=${token}`));
    assert(cookie.includes("SameSite=Lax"));
    assert(cookie.includes("Max-Age=86400"));
  });

  test("verifyCsrfToken validates exact token match between header and cookie", () => {
    const token = generateCsrfToken();
    const mockReq = {
      headers: {
        cookie: `abss_csrf=${token}`,
        "x-csrf-token": token,
      },
    };
    const res = verifyCsrfToken(mockReq);
    assert.strictEqual(res.valid, true);
  });

  test("verifyCsrfToken rejects tampered or mismatched CSRF token", () => {
    const token = generateCsrfToken();
    const fakeToken = generateCsrfToken();
    const mockReq = {
      headers: {
        cookie: `abss_csrf=${token}`,
        "x-csrf-token": fakeToken,
      },
    };
    const res = verifyCsrfToken(mockReq);
    assert.strictEqual(res.valid, false);
    assert(res.error.includes("CSRF token validation failed"));
  });

  test("verifyCsrfToken rejects when CSRF token is missing", () => {
    const mockReq = { headers: {} };
    const res = verifyCsrfToken(mockReq);
    assert.strictEqual(res.valid, false);
    assert(res.error.includes("Missing CSRF verification token"));
  });

  // ==========================================
  // 2. Password Expiry & Pre-Expiry Warnings
  // ==========================================
  console.log("\n--- 2. Password Expiry & 7-Day Pre-Expiry Warning Engine ---");

  test("calculateDaysUntilExpiry correctly computes remaining days", () => {
    const fiveDaysFuture = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
    const student = { passwordExpiresAt: fiveDaysFuture };
    const days = calculateDaysUntilExpiry(student);
    assert.strictEqual(days, 5);
  });

  test("isPasswordExpiringSoon returns true for passwords within 7-day threshold", () => {
    const fourDaysFuture = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString();
    const student = { passwordExpiresAt: fourDaysFuture };
    assert.strictEqual(isPasswordExpiringSoon(student, 7), true);
  });

  test("isPasswordExpiringSoon returns false for passwords with >7 days remaining", () => {
    const thirtyDaysFuture = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const student = { passwordExpiresAt: thirtyDaysFuture };
    assert.strictEqual(isPasswordExpiringSoon(student, 7), false);
  });

  test("isPasswordExpired flags passwords past expiration timestamp", () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const student = { passwordExpiresAt: yesterday };
    assert.strictEqual(isPasswordExpired(student), true);
  });

  // ==========================================
  // 3. Password Reset Security
  // ==========================================
  console.log("\n--- 3. One-Time 256-Bit Password Reset Token Engine ---");

  test("generatePasswordResetToken generates 256-bit token with 1-hour expiration and SHA-256 hash", () => {
    const reset = generatePasswordResetToken();
    assert.strictEqual(typeof reset.rawToken, "string");
    assert.strictEqual(reset.rawToken.length, 64);
    assert.strictEqual(reset.hashedToken, hashToken(reset.rawToken));
    const expiryMs = new Date(reset.expiresAt).getTime();
    const diffMins = Math.round((expiryMs - Date.now()) / (60 * 1000));
    assert(diffMins >= 59 && diffMins <= 60);
  });

  // ==========================================
  // 4. Live Server API Endpoints Testing
  // ==========================================
  console.log("\n--- 4. Live Server API Endpoints Testing ---");

  await testAsync("GET /api/csrf-token issues double-submit cookie and returns token payload", async () => {
    const res = await apiRequest("/api/csrf-token");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.json.ok, true);
    assert.strictEqual(typeof res.json.csrfToken, "string");
    assert.strictEqual(res.json.csrfToken.length, 64);

    const setCookie = res.headers["set-cookie"];
    assert(Array.isArray(setCookie) ? setCookie.some((c) => c.includes("abss_csrf=")) : setCookie.includes("abss_csrf="));
  });

  await testAsync("POST /api/internships/register creates student account with 90-day password expiry", async () => {
    const uniqueEmail = `secphase2_${Date.now()}@teststudent.com`;
    const regRes = await apiRequest("/api/internships/auth/register", {
      method: "POST",
      body: {
        name: "Security Phase Two",
        email: uniqueEmail,
        phone: "9876543210",
        password: "PassPhrase!2026Secure",
        track: "web-development",
        duration: "low",
      },
    });
    assert(regRes.status === 200 || regRes.status === 201);
    assert.strictEqual(regRes.json.ok, true);
    const fs = require("fs");
    const path = require("path");
    const dbPath = path.resolve(__dirname, "../backend/data/db.json");
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    const student = (db.students || []).find((s) => s.email.toLowerCase() === uniqueEmail);
    assert(student);
    assert(student.passwordExpiresAt);
  });

  await testAsync("POST /api/internships/auth/login sets CSRF cookie alongside session cookie", async () => {
    // 1. Create and verify a student
    const testEmail = `csrfstudent_${Date.now()}@example.com`;
    const regRes = await apiRequest("/api/internships/auth/register", {
      method: "POST",
      body: {
        name: "Csrf Student",
        email: testEmail,
        phone: "9123456789",
        password: "StrongPassword!2026#",
        track: "cloud-devops",
        duration: "low",
      },
    });
    assert(regRes.status === 200 || regRes.status === 201);

    // Verify email using devVerificationUrl
    const verifyToken = regRes.json.devVerificationUrl.split("token=")[1];
    const verRes = await apiRequest("/api/internships/auth/verify-email", {
      method: "POST",
      body: { token: verifyToken },
    });
    assert.strictEqual(verRes.status, 200);

    // 2. Perform login
    const loginRes = await apiRequest("/api/internships/auth/login", {
      method: "POST",
      body: {
        email: testEmail,
        password: "StrongPassword!2026#",
      },
    });

    assert.strictEqual(loginRes.status, 200);
    assert.strictEqual(loginRes.json.ok, true);
    assert.strictEqual(typeof loginRes.json.csrfToken, "string");

    const setCookies = loginRes.headers["set-cookie"] || [];
    const cookieStr = Array.isArray(setCookies) ? setCookies.join("; ") : setCookies;
    assert(cookieStr.includes("abss_student_session="));
    assert(cookieStr.includes("abss_csrf="));
  });

  await testAsync("POST /api/auth/change-password rejects requests with invalid CSRF token", async () => {
    const testEmail = `csrfattack_${Date.now()}@example.com`;
    const regRes = await apiRequest("/api/internships/auth/register", {
      method: "POST",
      body: {
        name: "CSRF Target",
        email: testEmail,
        phone: "9234567890",
        password: "SecurePassphrase!2026",
        track: "web-development",
        duration: "low",
      },
    });
    const verifyToken = regRes.json.devVerificationUrl.split("token=")[1];
    await apiRequest("/api/internships/auth/verify-email", {
      method: "POST",
      body: { token: verifyToken },
    });

    const loginRes = await apiRequest("/api/internships/auth/login", {
      method: "POST",
      body: { email: testEmail, password: "SecurePassphrase!2026" },
    });

    const setCookies = loginRes.headers["set-cookie"] || [];
    const cookieStr = Array.isArray(setCookies) ? setCookies.map((c) => c.split(";")[0]).join("; ") : setCookies;

    // Send change-password with forged / mismatched CSRF token
    const attackRes = await apiRequest("/api/auth/change-password", {
      method: "POST",
      headers: {
        Cookie: cookieStr,
        "X-CSRF-Token": "forged_invalid_csrf_token_value_here",
      },
      body: {
        oldPassword: "SecurePassphrase!2026",
        newPassword: "BrandNewSecurePassword!2026",
      },
    });

    assert.strictEqual(attackRes.status, 403);
    assert.strictEqual(attackRes.json.code, "CSRF_ERROR");
  });

  await testAsync("POST /api/auth/change-password succeeds with matching CSRF token and invalidates sessions", async () => {
    const testEmail = `csrflegit_${Date.now()}@example.com`;
    const regRes = await apiRequest("/api/internships/auth/register", {
      method: "POST",
      body: {
        name: "CSRF Legit",
        email: testEmail,
        phone: "9345678901",
        password: "InitialPassword!2026",
        track: "web-development",
        duration: "low",
      },
    });
    const verifyToken = regRes.json.devVerificationUrl.split("token=")[1];
    await apiRequest("/api/internships/auth/verify-email", {
      method: "POST",
      body: { token: verifyToken },
    });

    const loginRes = await apiRequest("/api/internships/auth/login", {
      method: "POST",
      body: { email: testEmail, password: "InitialPassword!2026" },
    });

    const csrfToken = loginRes.json.csrfToken;
    const setCookies = loginRes.headers["set-cookie"] || [];
    const sessionCookie = (Array.isArray(setCookies) ? setCookies : [setCookies])
      .map((c) => c.split(";")[0])
      .join("; ");

    const changeRes = await apiRequest("/api/auth/change-password", {
      method: "POST",
      headers: {
        Cookie: `${sessionCookie}; abss_csrf=${csrfToken}`,
        "X-CSRF-Token": csrfToken,
      },
      body: {
        oldPassword: "InitialPassword!2026",
        newPassword: "BrandNewSecurePassword!2026",
      },
    });

    assert.strictEqual(changeRes.status, 200);
    assert.strictEqual(changeRes.json.ok, true);

    // Old session should now be invalidated
    const meRes = await apiRequest("/api/internships/auth/me", {
      headers: { Cookie: sessionCookie },
    });
    assert.strictEqual(meRes.status, 401);
  });

  await testAsync("POST /api/internships/auth/login blocks logins when password has expired", async () => {
    const testEmail = `expiredpass_${Date.now()}@example.com`;
    const regRes = await apiRequest("/api/internships/auth/register", {
      method: "POST",
      body: {
        name: "Rohan Kumar",
        email: testEmail,
        phone: "9456789012",
        password: "OldPasswordExpired!2026",
        track: "data-science",
        duration: "low",
      },
    });
    const verifyToken = regRes.json.devVerificationUrl.split("token=")[1];
    await apiRequest("/api/internships/auth/verify-email", {
      method: "POST",
      body: { token: verifyToken },
    });

    // Manually expire password in db.json for this student
    const fs = require("fs");
    const path = require("path");
    const dbPath = path.resolve(__dirname, "../backend/data/db.json");
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    const student = (db.students || []).find((s) => s.email.toLowerCase() === testEmail);
    assert(student);
    student.passwordExpiresAt = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // 1 day ago
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");

    // Attempt login with expired password
    const loginRes = await apiRequest("/api/internships/auth/login", {
      method: "POST",
      body: {
        email: testEmail,
        password: "OldPasswordExpired!2026",
      },
    });

    assert.strictEqual(loginRes.status, 403);
    assert.strictEqual(loginRes.json.passwordExpired, true);
    assert.strictEqual(loginRes.json.mustChangePassword, true);
  });

  console.log("\n=================================================================");
  console.log(`🎉 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase2SecurityTests().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
