const http = require("http");
const assert = require("assert");

const BASE_URL = "http://127.0.0.1:3000";

const request = (path, options = {}) =>
  new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || "GET",
      headers: options.headers || {},
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          json,
        });
      });
    });

    req.on("error", reject);
    if (options.body) {
      const payload = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
      req.write(payload);
    }
    req.end();
  });

async function runTests() {
  console.log("=== Starting Phase 5 Test Suite ===\n");
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`PASS: ${name}`);
      passed += 1;
    } catch (err) {
      console.error(`FAIL: ${name}`);
      console.error(err);
      failed += 1;
    }
  }

  // 1. Public Routes Availability
  const publicRoutes = [
    "/internships",
    "/internships/programs",
    "/internships/programs/web-development",
    "/internships/programs/software-development",
    "/internships/programs/ui-ux-design",
    "/internships/programs/ai-machine-learning",
    "/internships/programs/cloud-devops",
    "/internships/how-it-works",
    "/internships/faq",
    "/internships/support",
    "/internships/register",
    "/internships/login",
    "/internships/verify-email",
    "/internships/forgot-password",
    "/internships/reset-password",
  ];

  for (const route of publicRoutes) {
    await test(`Public route ${route} returns HTTP 200`, async () => {
      const res = await request(route);
      assert.strictEqual(res.statusCode, 200, `Expected 200 for ${route}`);
      assert.ok(res.body.includes("<!DOCTYPE html>"), "Expected HTML response");
    });
  }

  // 2. Anonymous Access to Dashboard
  await test("Anonymous GET /internships/dashboard redirects with 302 to login", async () => {
    const res = await request("/internships/dashboard");
    assert.strictEqual(res.statusCode, 302);
    assert.ok(res.headers.location.includes("/internships/login?redirect=/internships/dashboard"));
  });

  await test("Anonymous GET /api/internships/dashboard/overview returns HTTP 401", async () => {
    const res = await request("/api/internships/dashboard/overview");
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.json?.error, "Unauthenticated");
  });

  // 3. Student Registration Validation & Execution
  const testEmail = `test.student.${Date.now()}@example.com`;
  const testPassword = "SecurePassword2026!";
  let verificationToken = "";

  await test("Registration rejects invalid/short passwords with HTTP 400", async () => {
    const res = await request("/api/internships/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { name: "Test Student", email: testEmail, password: "short" },
    });
    assert.strictEqual(res.statusCode, 400);
    assert.ok(res.json?.error.includes("8 characters"));
  });

  await test("Registration succeeds and provides honest dev verification URL", async () => {
    const res = await request("/api/internships/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { name: "Test Student", email: testEmail, password: testPassword },
    });
    assert.strictEqual(res.statusCode, 201);
    assert.strictEqual(res.json?.ok, true);
    assert.strictEqual(res.json?.emailServiceConfigured, false);
    assert.ok(res.json?.devVerificationUrl.includes("token="));

    const tokenMatch = res.json.devVerificationUrl.match(/token=([a-f0-9]+)/);
    assert.ok(tokenMatch, "Token expected in verification URL");
    verificationToken = tokenMatch[1];
  });

  await test("Registration rejects duplicate email with HTTP 409", async () => {
    const res = await request("/api/internships/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { name: "Duplicate Student", email: testEmail.toUpperCase(), password: testPassword },
    });
    assert.strictEqual(res.statusCode, 409);
    assert.ok(res.json?.error.includes("already exists"));
  });

  // 4. Unverified Login Attempt
  await test("Login before verification returns HTTP 403 with emailVerified: false", async () => {
    const res = await request("/api/internships/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { email: testEmail, password: testPassword },
    });
    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.json?.emailVerified, false);
  });

  // 5. Verification Token Handling & Reuse Prevention
  await test("Verification with tampered token returns HTTP 400", async () => {
    const res = await request("/api/internships/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { token: "invaliddeadbeef0000000000000000000000000000000000000000000000000000" },
    });
    assert.strictEqual(res.statusCode, 400);
    assert.ok(res.json?.error.includes("Invalid"));
  });

  await test("Verification with valid token activates student email with HTTP 200", async () => {
    const res = await request("/api/internships/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { token: verificationToken },
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.json?.ok, true);
  });

  await test("Reusing the same verification token is rejected with HTTP 400", async () => {
    const res = await request("/api/internships/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { token: verificationToken },
    });
    assert.strictEqual(res.statusCode, 400);
    assert.ok(res.json?.error.includes("already used") || res.json?.error.includes("Invalid"));
  });

  // 6. Authenticated Login & Cookie Session
  let sessionCookie = "";

  await test("Login with valid verified credentials returns 200 and HttpOnly session cookie", async () => {
    const res = await request("/api/internships/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { email: testEmail, password: testPassword },
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.json?.ok, true);
    assert.strictEqual(res.json?.student?.email, testEmail);

    const setCookie = res.headers["set-cookie"];
    assert.ok(setCookie, "Set-Cookie header expected");
    const cookieHeader = Array.isArray(setCookie) ? setCookie[0] : setCookie;
    assert.ok(cookieHeader.includes("abss_student_session="));
    assert.ok(cookieHeader.includes("HttpOnly"));
    assert.ok(cookieHeader.includes("SameSite=Lax"));

    sessionCookie = cookieHeader.split(";")[0];
  });

  await test("Authenticated GET /api/internships/auth/me returns student profile", async () => {
    const res = await request("/api/internships/auth/me", {
      headers: { Cookie: sessionCookie },
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.json?.student?.email, testEmail);
    assert.strictEqual(res.json?.student?.emailVerified, true);
  });

  await test("Authenticated GET /internships/dashboard returns HTTP 200 (not 302)", async () => {
    const res = await request("/internships/dashboard", {
      headers: { Cookie: sessionCookie },
    });
    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.body.includes("Student Dashboard"));
  });

  await test("Authenticated GET /api/internships/dashboard/overview returns dashboard data", async () => {
    const res = await request("/api/internships/dashboard/overview", {
      headers: { Cookie: sessionCookie },
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.json?.ok, true);
    assert.strictEqual(res.json?.student?.email, testEmail);
    assert.ok(Array.isArray(res.json?.enrolledCohorts));
    assert.ok(Array.isArray(res.json?.availablePrograms));
  });

  // 7. Password Reset Flow
  let resetToken = "";

  await test("Forgot password returns generic message (no user enumeration)", async () => {
    const res = await request("/api/internships/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { email: testEmail },
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.json?.ok, true);
    assert.ok(res.json?.message.includes("If an account with that email exists"));
    assert.ok(res.json?.devResetUrl.includes("token="));

    const tokenMatch = res.json.devResetUrl.match(/token=([a-f0-9]+)/);
    assert.ok(tokenMatch, "Reset token expected");
    resetToken = tokenMatch[1];
  });

  await test("Forgot password for non-existent email returns identical generic message", async () => {
    const res = await request("/api/internships/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { email: "nonexistent.user.2026@randomdomain.test" },
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.json?.ok, true);
    assert.ok(res.json?.message.includes("If an account with that email exists"));
    assert.strictEqual(res.json?.devResetUrl, null);
  });

  const updatedPassword = "NewlyUpdatedPassword2026!";

  await test("Reset password with valid token updates password", async () => {
    const res = await request("/api/internships/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { token: resetToken, newPassword: updatedPassword },
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.json?.ok, true);
  });

  await test("Reusing the same password reset token is rejected with HTTP 400", async () => {
    const res = await request("/api/internships/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { token: resetToken, newPassword: "AnotherPassword123!" },
    });
    assert.strictEqual(res.statusCode, 400);
    assert.ok(res.json?.error.includes("already used") || res.json?.error.includes("Invalid"));
  });

  await test("Old password is now rejected with HTTP 401", async () => {
    const res = await request("/api/internships/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { email: testEmail, password: testPassword },
    });
    assert.strictEqual(res.statusCode, 401);
  });

  await test("New password logs in successfully with HTTP 200", async () => {
    const res = await request("/api/internships/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { email: testEmail, password: updatedPassword },
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.json?.ok, true);
    const setCookie = res.headers["set-cookie"];
    const cookieHeader = Array.isArray(setCookie) ? setCookie[0] : setCookie;
    sessionCookie = cookieHeader.split(";")[0];
  });

  // 8. Logout & Session Termination
  await test("Logout invalidates session and clears cookie", async () => {
    const res = await request("/api/internships/auth/logout", {
      method: "POST",
      headers: { Cookie: sessionCookie },
    });
    assert.strictEqual(res.statusCode, 200);
    const setCookie = res.headers["set-cookie"];
    const cookieHeader = Array.isArray(setCookie) ? setCookie[0] : setCookie;
    assert.ok(cookieHeader.includes("Max-Age=0") || cookieHeader.includes("Expires="));

    const checkRes = await request("/api/internships/auth/me", {
      headers: { Cookie: sessionCookie },
    });
    assert.strictEqual(checkRes.statusCode, 401);
  });

  // 9. Regression Check: Contact API
  await test("POST /api/leads/contact regression check returns HTTP 201", async () => {
    const res = await request("/api/leads/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      body: {
        name: "Regression Test Contact",
        client: "Regression Test Client",
        email: "regression@example.com",
        service: "Website Development",
        budget: 15000,
      },
    });
    assert.strictEqual(res.statusCode, 201);
    assert.strictEqual(res.json?.ok, true);
  });

  // 10. Regression Check: Main Company Pages
  await test("GET / returns HTTP 200 and Homepage HTML", async () => {
    const res = await request("/");
    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.body.includes("ABSS Nexus Technologies"));
  });

  await test("GET /about returns HTTP 200", async () => {
    const res = await request("/about");
    assert.strictEqual(res.statusCode, 200);
  });

  await test("GET /services/website-development returns HTTP 200", async () => {
    const res = await request("/services/website-development");
    assert.strictEqual(res.statusCode, 200);
  });

  console.log(`\n=== Test Suite Finished: ${passed} Passed, ${failed} Failed ===`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner error:", err);
  process.exit(1);
});
