import { onRequest } from "../functions/api/[[path]].js";
import assert from "node:assert";

async function runTestSuite() {
  console.log("=== Testing Cloudflare Pages Functions Student Auth Suite ===");

  // Mock Cloudflare KV Storage
  const kvStore = new Map();
  const mockEnv = {
    ABSS_ADMIN: {
      get: async (key) => kvStore.get(key) || null,
      put: async (key, val) => kvStore.set(key, val),
    },
    AUTH_SECRET: "test-auth-secret-key-12345",
  };

  const testEmail = `student_${Date.now()}@example.com`;
  const testPassword = "Password@12345";
  const testName = "Test Student";

  // 1. Test Registration
  console.log("1. Testing Registration...");
  const regReq = new Request("https://abssnexus.in/api/internships/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: testName,
      email: testEmail,
      password: testPassword,
    }),
  });

  const regRes = await onRequest({ request: regReq, env: mockEnv });
  assert.strictEqual(regRes.status, 201, "Registration should return 201");
  const regData = await regRes.json();
  assert.strictEqual(regData.ok, true);
  assert.ok(regData.devVerificationUrl, "Should provide devVerificationUrl");
  console.log("✓ Registration passed:", regData.devVerificationUrl);

  const tokenMatch = regData.devVerificationUrl.match(/token=([a-f0-9]+)/);
  const rawToken = tokenMatch[1];

  // 2. Test Login before email verification (should fail with 403)
  console.log("2. Testing Login before verification...");
  const preLoginReq = new Request("https://abssnexus.in/api/internships/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
    }),
  });
  const preLoginRes = await onRequest({ request: preLoginReq, env: mockEnv });
  assert.strictEqual(preLoginRes.status, 403, "Unverified login should return 403");
  console.log("✓ Unverified login correctly rejected (403)");

  // 3. Test Email Verification
  console.log("3. Testing Email Verification...");
  const verifyReq = new Request("https://abssnexus.in/api/internships/auth/verify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: rawToken }),
  });
  const verifyRes = await onRequest({ request: verifyReq, env: mockEnv });
  assert.strictEqual(verifyRes.status, 200, "Verification should return 200");
  const verifyData = await verifyRes.json();
  assert.strictEqual(verifyData.ok, true);
  console.log("✓ Email verified successfully");

  // 4. Test Login after verification
  console.log("4. Testing Login after verification...");
  const loginReq = new Request("https://abssnexus.in/api/internships/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
    }),
  });
  const loginRes = await onRequest({ request: loginReq, env: mockEnv });
  assert.strictEqual(loginRes.status, 200, "Login should return 200");
  const cookieHeader = loginRes.headers.get("Set-Cookie");
  assert.ok(cookieHeader, "Login should set session cookie");
  assert.ok(cookieHeader.includes("abss_student_session="), "Cookie should contain abss_student_session");
  const sessionToken = cookieHeader.split(";")[0].split("=")[1];
  console.log("✓ Login successful and session cookie issued");

  // 5. Test Authenticated /me
  console.log("5. Testing /api/internships/auth/me...");
  const meReq = new Request("https://abssnexus.in/api/internships/auth/me", {
    method: "GET",
    headers: { Cookie: `abss_student_session=${sessionToken}` },
  });
  const meRes = await onRequest({ request: meReq, env: mockEnv });
  assert.strictEqual(meRes.status, 200, "/me should return 200");
  const meData = await meRes.json();
  assert.strictEqual(meData.student.email, testEmail);
  assert.strictEqual(meData.student.name, testName);
  console.log("✓ /me authenticated successfully for:", meData.student.name);

  // 6. Test Dashboard Overview
  console.log("6. Testing /api/internships/dashboard/overview...");
  const dashReq = new Request("https://abssnexus.in/api/internships/dashboard/overview", {
    method: "GET",
    headers: { Cookie: `abss_student_session=${sessionToken}` },
  });
  const dashRes = await onRequest({ request: dashReq, env: mockEnv });
  assert.strictEqual(dashRes.status, 200, "Dashboard overview should return 200");
  const dashData = await dashRes.json();
  assert.ok(dashData.availablePrograms.length >= 5, "Should return default programs");
  console.log(`✓ Dashboard overview returned ${dashData.availablePrograms.length} programs`);

  // 7. Test Logout
  console.log("7. Testing Logout...");
  const logoutReq = new Request("https://abssnexus.in/api/internships/auth/logout", {
    method: "POST",
    headers: { Cookie: `abss_student_session=${sessionToken}` },
  });
  const logoutRes = await onRequest({ request: logoutReq, env: mockEnv });
  assert.strictEqual(logoutRes.status, 200, "Logout should return 200");
  const logoutCookie = logoutRes.headers.get("Set-Cookie");
  assert.ok(logoutCookie.includes("Max-Age=0") || logoutCookie.includes("Expires="), "Logout should clear cookie");
  console.log("✓ Logout successful");

  // 8. Test /me after logout
  const postLogoutMeReq = new Request("https://abssnexus.in/api/internships/auth/me", {
    method: "GET",
    headers: { Cookie: `abss_student_session=${sessionToken}` },
  });
  const postLogoutMeRes = await onRequest({ request: postLogoutMeReq, env: mockEnv });
  assert.strictEqual(postLogoutMeRes.status, 401, "Session should be invalidated after logout");
  console.log("✓ Post-logout request correctly rejected with 401");

  console.log("\nALL CLOUDFLARE STUDENT AUTH TESTS PASSED PERFECTLY!");
}

runTestSuite().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
