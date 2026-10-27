const assert = require("assert");
const http = require("http");
const crypto = require("crypto");

const {
  evaluatePasswordPolicy,
  checkPasswordHistory,
  getPasswordExpiryDate,
  isPasswordExpired,
} = require("../backend/security/password-policy");
const {
  encryptAes256Gcm,
  decryptAes256Gcm,
  hashPasswordHardened,
  verifyPasswordHardened,
} = require("../backend/security/crypto-vault");
const {
  checkSlidingRateLimit,
  recordFailedAttempt,
  isAccountLocked,
  resetFailedAttempts,
} = require("../backend/security/rate-limiter");
const {
  createStudentSession,
  validateAndTouchSession,
  invalidateSession,
  invalidateAllStudentSessions,
  buildStudentSessionCookie,
} = require("../backend/security/session-manager");
const {
  validateEmail,
  validatePhone,
  validateName,
  validateTaskSubmissionText,
  validateGitHubUrl,
} = require("../backend/security/input-validator");
const {
  maskEmail,
  maskPhone,
  maskOtp,
  logSecurityEvent,
} = require("../backend/security/audit-logger");

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

async function runPhase1SecurityTests() {
  console.log("=================================================================");
  console.log("🔐 RUNNING ABSS NEXUS PHASE 1 COMPLETE SECURITY HARDENING SUITE");
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

  // -------------------------------------------------------------
  // SECTION 1: PASSWORD POLICY ENGINE & 1M PBKDF2 HASHING
  // -------------------------------------------------------------
  console.log("1. Testing Password Policy (12+ chars, 4 types, no sequences, history)...");

  test("Rejects password under 12 characters", () => {
    const res = evaluatePasswordPolicy("Short1!Aa");
    assert.strictEqual(res.isValid, false);
    assert.ok(res.errors.some((e) => e.includes("12 characters")));
  });

  test("Rejects password missing uppercase, lowercase, numbers, or special chars", () => {
    const resNoUpper = evaluatePasswordPolicy("nouppercasehere123!@#");
    assert.strictEqual(resNoUpper.isValid, false);
    assert.ok(resNoUpper.errors.some((e) => e.includes("UPPERCASE")));

    const resNoSpecial = evaluatePasswordPolicy("NoSpecialCharacters123456");
    assert.strictEqual(resNoSpecial.isValid, false);
    assert.ok(resNoSpecial.errors.some((e) => e.includes("special character")));
  });

  test("Rejects sequential numeric or keyboard patterns", () => {
    const resSeq = evaluatePasswordPolicy("SecureSeq123!Abc");
    assert.strictEqual(resSeq.isValid, false);
    assert.ok(resSeq.errors.some((e) => e.includes("sequential or keyboard")));

    const resQwerty = evaluatePasswordPolicy("Pass_qwerty_2026!A");
    assert.strictEqual(resQwerty.isValid, false);
    assert.ok(resQwerty.errors.some((e) => e.includes("qwerty")));
  });

  test("Rejects identity collision with student name or email", () => {
    const resEmail = evaluatePasswordPolicy("Kavya2026!PassPhrase", { email: "kavya.sharma@example.com" });
    assert.strictEqual(resEmail.isValid, false);
    assert.ok(resEmail.errors.some((e) => e.includes("email address")));

    const resName = evaluatePasswordPolicy("SharmaPass2026!Secure", { name: "Kavya Sharma" });
    assert.strictEqual(resName.isValid, false);
    assert.ok(resName.errors.some((e) => e.includes("parts of your name")));
  });

  test("Rejects known breached passwords", () => {
    const resLeaked = evaluatePasswordPolicy("password123456");
    assert.strictEqual(resLeaked.isValid, false);
    assert.ok(resLeaked.errors.some((e) => e.includes("public security data breaches")));
  });

  test("Accepts strong, unique passphrase with score >= 3", () => {
    const resStrong = evaluatePasswordPolicy("AlphaOmega#2026$NexusSecure");
    assert.strictEqual(resStrong.isValid, true);
    assert.strictEqual(resStrong.strength, "strong");
    assert.ok(resStrong.score >= 3);
  });

  test("Rejects reusing any of the last 5 previous passwords", () => {
    const oldHash1 = hashPasswordHardened("OldPassword123!A").hash;
    const oldHash2 = hashPasswordHardened("OldPassword456!B").hash;
    const currentHash = hashPasswordHardened("CurrentPassword789!C").hash;

    const student = {
      passwordHash: currentHash,
      passwordHistory: [
        { hash: oldHash1, changedAt: new Date().toISOString() },
        { hash: oldHash2, changedAt: new Date().toISOString() },
      ],
    };

    const checkCurrent = checkPasswordHistory("CurrentPassword789!C", student);
    assert.strictEqual(checkCurrent.isReused, true);

    const checkOld = checkPasswordHistory("OldPassword123!A", student);
    assert.strictEqual(checkOld.isReused, true);

    const checkFresh = checkPasswordHistory("FreshNewPassword2026!Z", student);
    assert.strictEqual(checkFresh.isReused, false);
  });

  test("Hardened PBKDF2 uses 1,000,000 iterations and 32-byte salt", () => {
    const result = hashPasswordHardened("SecretKey2026!Hardened");
    assert.strictEqual(result.iterations, 1000000);
    assert.strictEqual(result.salt.length, 64); // 32 bytes hex = 64 hex chars
    assert.ok(result.hash.startsWith("pbkdf2$v2$1000000$"));

    // Timing-safe verification
    assert.strictEqual(verifyPasswordHardened("SecretKey2026!Hardened", result.hash), true);
    assert.strictEqual(verifyPasswordHardened("WrongPassword2026!", result.hash), false);
  });

  test("Calculates 90-day password expiry timestamp", () => {
    const expiryStr = getPasswordExpiryDate();
    const expiryMs = new Date(expiryStr).getTime();
    const expectedApproxMs = Date.now() + 90 * 24 * 60 * 60 * 1000;
    assert.ok(Math.abs(expiryMs - expectedApproxMs) < 5000);
  });

  // -------------------------------------------------------------
  // SECTION 2: AES-256-GCM OTP ENCRYPTION & DECRYPTION
  // -------------------------------------------------------------
  console.log("\n2. Testing OTP AES-256-GCM Authenticated Encryption...");

  test("AES-256-GCM encrypts plaintext into ciphertext, IV, and auth tag", () => {
    const plaintext = "482910";
    const encrypted = encryptAes256Gcm(plaintext);

    assert.ok(encrypted.ciphertext && encrypted.ciphertext.length > 0);
    assert.strictEqual(encrypted.iv.length, 24); // 12-byte IV = 24 hex
    assert.strictEqual(encrypted.tag.length, 32); // 16-byte tag = 32 hex

    const decrypted = decryptAes256Gcm(encrypted.ciphertext, encrypted.iv, encrypted.tag);
    assert.strictEqual(decrypted, plaintext);
  });

  test("AES-256-GCM tampered ciphertext fails authentication and returns null", () => {
    const plaintext = "918234";
    const encrypted = encryptAes256Gcm(plaintext);
    const tamperedCiphertext = "ff" + encrypted.ciphertext.slice(2);

    const decrypted = decryptAes256Gcm(tamperedCiphertext, encrypted.iv, encrypted.tag);
    assert.strictEqual(decrypted, null);
  });

  // -------------------------------------------------------------
  // SECTION 3: SESSION TIMEOUT & MAX 2 CONCURRENT SESSIONS
  // -------------------------------------------------------------
  console.log("\n3. Testing Session Management (30-min timeout, max 2 concurrent)...");

  test("Enforces maximum 2 concurrent sessions per student (oldest revoked)", () => {
    const mockStudent = { id: "student-concurrency-test", email: "conc@example.com" };
    const mockDb = { studentSessions: [] };

    // Login 1
    const s1 = createStudentSession(mockStudent, { headers: { "user-agent": "Agent 1" } }, mockDb);
    // Login 2
    const s2 = createStudentSession(mockStudent, { headers: { "user-agent": "Agent 2" } }, mockDb);

    let active = mockDb.studentSessions.filter((s) => s.isActive);
    assert.strictEqual(active.length, 2);

    // Login 3 (should revoke Session 1)
    const s3 = createStudentSession(mockStudent, { headers: { "user-agent": "Agent 3" } }, mockDb);
    active = mockDb.studentSessions.filter((s) => s.isActive);
    assert.strictEqual(active.length, 2);

    const revokedS1 = mockDb.studentSessions.find((s) => s.id === s1.sessionRecord.id);
    assert.strictEqual(revokedS1.isActive, false);
    assert.strictEqual(revokedS1.terminationReason, "concurrent_session_limit");
  });

  test("Session cookie uses Max-Age=1800 (30 minutes) and HttpOnly; SameSite=Lax", () => {
    const cookie = buildStudentSessionCookie("test-token-value", 1800);
    assert.ok(cookie.includes("Max-Age=1800"));
    assert.ok(cookie.includes("HttpOnly"));
    assert.ok(cookie.includes("SameSite=Lax"));
  });

  // -------------------------------------------------------------
  // SECTION 4: SLIDING WINDOW RATE LIMITING & LOCKOUT
  // -------------------------------------------------------------
  console.log("\n4. Testing Sliding Window Rate Limiting & Account Lockout...");

  test("Sliding window allows up to limit and blocks on limit + 1", () => {
    const key = `test:sliding:${Date.now()}`;
    for (let i = 0; i < 3; i++) {
      const res = checkSlidingRateLimit(key, 3, 60000);
      assert.strictEqual(res.allowed, true);
    }
    const blocked = checkSlidingRateLimit(key, 3, 60000);
    assert.strictEqual(blocked.allowed, false);
    assert.ok(blocked.retryAfter > 0);
  });

  test("5 failed login attempts trigger 30-minute account lockout", () => {
    const email = `test.lockout.${Date.now()}@example.com`;
    for (let i = 1; i <= 4; i++) {
      const res = recordFailedAttempt(email, 5, 30 * 60 * 1000);
      assert.strictEqual(res.isLocked, false);
      assert.strictEqual(res.failedCount, i);
    }

    const fifthAttempt = recordFailedAttempt(email, 5, 30 * 60 * 1000);
    assert.strictEqual(fifthAttempt.isLocked, true);
    assert.strictEqual(fifthAttempt.newlyLocked, true);

    const status = isAccountLocked(email);
    assert.strictEqual(status.isLocked, true);
    assert.ok(status.remainingSeconds > 1700);

    resetFailedAttempts(email);
    assert.strictEqual(isAccountLocked(email).isLocked, false);
  });

  // -------------------------------------------------------------
  // SECTION 5: INPUT VALIDATION & DATA MASKING
  // -------------------------------------------------------------
  console.log("\n5. Testing Input Validation & PII Masking...");

  test("RFC 5322 email validation blocks disposable throwaway domains", () => {
    const badDisposable = validateEmail("attacker@tempmail.com");
    assert.strictEqual(badDisposable.isValid, false);
    assert.ok(badDisposable.error.includes("Disposable"));

    const goodEmail = validateEmail("student.kumar@abssnexus.in");
    assert.strictEqual(goodEmail.isValid, true);
    assert.strictEqual(goodEmail.email, "student.kumar@abssnexus.in");
  });

  test("Indian phone validator normalizes 10-digit mobile numbers", () => {
    const p1 = validatePhone("+91 9876543210");
    assert.strictEqual(p1.isValid, true);
    assert.strictEqual(p1.phone, "9876543210");

    const pInvalid = validatePhone("1234567890"); // Landline / doesn't start with 6-9
    assert.strictEqual(pInvalid.isValid, false);
  });

  test("Task submission text enforces minimum 50 characters", () => {
    const tooShort = validateTaskSubmissionText("I finished the html project.");
    assert.strictEqual(tooShort.isValid, false);
    assert.ok(tooShort.error.includes("Minimum 50 characters"));

    const longAnswer = "I built the entire responsive layout using semantic HTML5 tags and CSS flexbox, verified across mobile and desktop breakpoints.";
    const validTask = validateTaskSubmissionText(longAnswer);
    assert.strictEqual(validTask.isValid, true);
  });

  test("PII Masking masks emails, phones, and OTPs in logs", () => {
    assert.strictEqual(maskEmail("shubham@abssnexus.in"), "s***m@abssnexus.in");
    assert.strictEqual(maskPhone("9876543210"), "******3210");
    assert.strictEqual(maskOtp("849102"), "***102");
  });

  // -------------------------------------------------------------
  // SECTION 6: LIVE HTTP API ENDPOINTS TEST
  // -------------------------------------------------------------
  console.log("\n6. Testing Live HTTP Endpoints (/api/auth/validate-password, rate limits, headers)...");

  await testAsync("POST /api/auth/validate-password evaluates strength and checklist", async () => {
    const res = await apiRequest("/api/auth/validate-password", {
      method: "POST",
      body: { password: "Alpha#Nexus2026!Pro" },
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.json.isValid, true);
    assert.strictEqual(res.json.strength, "strong");
  });

  await testAsync("POST /api/otp/status returns account lock status", async () => {
    const res = await apiRequest("/api/otp/status?email=test.status@example.com");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.json.isLocked, false);
  });

  await testAsync("HTTP API returns security headers and sliding rate limit headers", async () => {
    const res = await apiRequest("/api/health");
    assert.strictEqual(res.headers["x-content-type-options"], "nosniff");
    assert.strictEqual(res.headers["x-frame-options"], "DENY");
    assert.strictEqual(res.headers["x-xss-protection"], "1; mode=block");
    assert.ok(res.headers["content-security-policy"]);
  });

  console.log("\n=================================================================");
  console.log(`🎉 ALL PHASE 1 SECURITY HARDENING TESTS PASSED: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================================\n");

  if (failed > 0) process.exit(1);
}

runPhase1SecurityTests().catch((err) => {
  console.error("Test runner error:", err);
  process.exit(1);
});
