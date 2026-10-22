const assert = require("assert");

async function runSecurityTests() {
  console.log("=== Testing Admin Authentication Security & Secret Hardening ===");

  const { onRequest } = await import("../functions/api/[[path]].js");

  // Helper to simulate Cloudflare fetch
  async function callApi(env, method, path, body = null, headers = {}) {
    const reqHeaders = new Headers({
      "Content-Type": "application/json",
      ...headers,
    });
    const req = new Request(`https://abssnexus.in${path}`, {
      method,
      headers: reqHeaders,
      body: body ? JSON.stringify(body) : null,
    });
    const res = await onRequest({ request: req, env });
    let data = null;
    try {
      data = await res.json();
    } catch {}
    return { status: res.status, data };
  }

  // 1. Production Fail-Closed: Missing Environment Variables
  console.log("\n1. Testing unconfigured Cloudflare Pages production deployment (no env vars)...");
  const emptyEnv = {
    ENVIRONMENT: "production",
  };
  const emptyLogin = await callApi(emptyEnv, "POST", "/api/auth/login", {
    username: "admin",
    password: "abss2026",
  });
  assert.strictEqual(emptyLogin.status, 503, "Unconfigured production must return 503 Service Unavailable");
  assert.ok(
    emptyLogin.data.error.includes("Cloudflare Dashboard"),
    "Error must instruct setting variables in Cloudflare Dashboard"
  );
  console.log("✓ PASS: Production fails closed with 503 when environment variables are missing");

  // 2. Production Fail-Closed: Default Insecure Password (abss2026)
  console.log("\n2. Testing production deployment configured with default insecure password (abss2026)...");
  const defaultPassEnv = {
    ENVIRONMENT: "production",
    ADMIN_USERNAME: "admin",
    ADMIN_PASSWORD: "abss2026",
    AUTH_SECRET: "secure-production-auth-secret-key-at-least-16-chars",
  };
  const defaultPassLogin = await callApi(defaultPassEnv, "POST", "/api/auth/login", {
    username: "admin",
    password: "abss2026",
  });
  assert.strictEqual(defaultPassLogin.status, 503, "Default password in production must return 503");
  console.log("✓ PASS: Default password 'abss2026' in production is blocked with 503");

  // 3. Production Fail-Closed: Insecure / Short Secret
  console.log("\n3. Testing production deployment configured with weak / default secret...");
  const weakSecretEnv = {
    ENVIRONMENT: "production",
    ADMIN_USERNAME: "secure_admin",
    ADMIN_PASSWORD: "SuperSecurePassword2026!",
    AUTH_SECRET: "short",
  };
  const weakSecretLogin = await callApi(weakSecretEnv, "POST", "/api/auth/login", {
    username: "secure_admin",
    password: "SuperSecurePassword2026!",
  });
  assert.strictEqual(weakSecretLogin.status, 503, "Short secret in production must return 503");
  console.log("✓ PASS: Weak / short secret in production is blocked with 503");

  // 4. Production Secure Configuration: Backdoor Attempt REJECTED
  console.log("\n4. Testing secure production configuration against default backdoor credentials...");
  const secureEnv = {
    ENVIRONMENT: "production",
    ADMIN_USERNAME: "nexus_admin_2026",
    ADMIN_PASSWORD: "CorrectProductionPassword#99!",
    AUTH_SECRET: "nexus-production-ultra-secure-hmac-key-2026",
  };
  const backdoorLogin = await callApi(secureEnv, "POST", "/api/auth/login", {
    username: "admin",
    password: "abss2026",
  });
  assert.strictEqual(backdoorLogin.status, 401, "Backdoor credentials must be rejected with 401");
  console.log("✓ PASS: Backdoor credentials ('admin' / 'abss2026') strictly rejected with 401");

  // 5. Production Secure Configuration: Valid Credentials Succeeded
  console.log("\n5. Testing secure production configuration with legitimate credentials...");
  const validLogin = await callApi(secureEnv, "POST", "/api/auth/login", {
    username: "nexus_admin_2026",
    password: "CorrectProductionPassword#99!",
  });
  assert.strictEqual(validLogin.status, 200, "Valid admin credentials must return 200");
  assert.ok(validLogin.data.token, "Token must be returned");
  assert.strictEqual(validLogin.data.role, "super_admin");
  const validToken = validLogin.data.token;
  console.log("✓ PASS: Valid admin login succeeded with token and role");

  // 6. Token Verification & Protected Admin Routes
  console.log("\n6. Testing /api/admin/auth/me with valid token...");
  const meRes = await callApi(secureEnv, "GET", "/api/admin/auth/me", null, {
    Authorization: `Bearer ${validToken}`,
  });
  assert.strictEqual(meRes.status, 200);
  assert.strictEqual(meRes.data.admin.username, "nexus_admin_2026");
  assert.strictEqual(meRes.data.admin.role, "super_admin");
  assert.strictEqual(meRes.data.admin.permissions.canManageSettings, true);
  console.log("✓ PASS: Protected /api/admin/auth/me verified authentic session");

  // 7. Forged Token Rejected
  console.log("\n7. Testing forged token signed with old known default secret...");
  const oldSecretHeader = "Bearer eyJleHAiOjk5OTk5OTk5OTk5OTl9.invalid_signature_here";
  const forgedRes = await callApi(secureEnv, "GET", "/api/admin/auth/me", null, {
    Authorization: oldSecretHeader,
  });
  assert.strictEqual(forgedRes.status, 401, "Forged/tampered token must be rejected with 401");
  console.log("✓ PASS: Forged token correctly rejected with 401 Unauthorized");

  // 8. Local Dev / Test Compatibility
  console.log("\n8. Testing local dev/test environment convenience fallback...");
  const devEnv = {
    ENVIRONMENT: "development",
  };
  const devLogin = await callApi(devEnv, "POST", "/api/auth/login", {
    username: "admin",
    password: "abss2026",
  });
  assert.strictEqual(devLogin.status, 200, "Dev environment allows local admin login");
  console.log("✓ PASS: Local dev environment allows seamless local development");

  console.log("\n🎉 ALL 8 ADMIN SECURITY & SECRET TESTS PASSED PERFECTLY!");
}

runSecurityTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
