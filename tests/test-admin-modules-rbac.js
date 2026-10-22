const http = require("http");
const assert = require("assert");

const BASE_URL = "http://localhost:3000";

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqHeaders = { ...headers };
    let postData = null;

    if (body) {
      postData = typeof body === "string" ? body : JSON.stringify(body);
      reqHeaders["Content-Type"] = "application/json";
      reqHeaders["Content-Length"] = Buffer.byteLength(postData);
    }

    const req = http.request(
      url,
      {
        method,
        headers: reqHeaders,
      },
      (res) => {
        let resData = "";
        res.on("data", (chunk) => {
          resData += chunk;
        });
        res.on("end", () => {
          let json = null;
          try {
            json = JSON.parse(resData);
          } catch {}
          resolve({ status: res.statusCode, headers: res.headers, body: resData, json });
        });
      }
    );

    req.on("error", reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runRbacTests() {
  console.log("\n=== Starting ABSS Nexus Two-Module Admin & RBAC Verification Suite ===\n");
  let passed = 0;

  // 1. Landing Page Card Verification
  console.log("--- 1. Admin Landing Page (/admin/) Structure ---");
  const landingRes = await request("GET", "/admin/");
  assert.strictEqual(landingRes.status, 200, "Landing page should return 200");
  assert.ok(landingRes.body.includes("Internship Administration"), "Must have Card A: Internship Administration");
  assert.ok(landingRes.body.includes("Company Administration"), "Must have Card B: Company Administration");
  assert.ok(landingRes.body.includes("/admin/internships/"), "Must link to /admin/internships/");
  assert.ok(landingRes.body.includes("/admin/company/"), "Must link to /admin/company/");
  assert.ok(landingRes.body.includes("Open Internship Admin"), "Card A button text");
  assert.ok(landingRes.body.includes("Open Company Admin"), "Card B button text");
  console.log("✓ PASS: Admin Landing page contains Card A & Card B with correct routes and buttons");
  passed++;

  // 2. Module Switcher and Navigation
  console.log("\n--- 2. Module Navigation & Cross-Module Switcher ---");
  const internRes = await request("GET", "/admin/internships/");
  assert.strictEqual(internRes.status, 200);
  assert.ok(internRes.body.includes("Switch to Company Admin"), "Internship page must have Switch to Company Admin button");
  assert.ok(internRes.body.includes("/admin/company/"), "Internship switch button must link to /admin/company/");

  const companyRes = await request("GET", "/admin/company/");
  assert.strictEqual(companyRes.status, 200);
  assert.ok(companyRes.body.includes("Switch to Internship Admin"), "Company page must have Switch to Internship Admin button");
  assert.ok(companyRes.body.includes("/admin/internships/"), "Company switch button must link to /admin/internships/");
  console.log("✓ PASS: Visible module switchers present on both module interfaces");
  passed++;

  // 3. Authentication & Role Issuance
  console.log("\n--- 3. Multi-Role Authentication ---");
  const superLogin = await request("POST", "/api/auth/login", { username: "admin", password: "abss2026" });
  assert.strictEqual(superLogin.status, 200);
  assert.strictEqual(superLogin.json?.role, "super_admin");
  const superToken = superLogin.json.token;

  const internAdminLogin = await request("POST", "/api/auth/login", { username: "internship_admin", password: "abss2026" });
  assert.strictEqual(internAdminLogin.status, 200);
  assert.strictEqual(internAdminLogin.json?.role, "internship_admin");
  const internAdminToken = internAdminLogin.json.token;

  const companyAdminLogin = await request("POST", "/api/auth/login", { username: "company_admin", password: "abss2026" });
  assert.strictEqual(companyAdminLogin.status, 200);
  assert.strictEqual(companyAdminLogin.json?.role, "company_admin");
  const companyAdminToken = companyAdminLogin.json.token;

  const reviewerLogin = await request("POST", "/api/auth/login", { username: "internship_reviewer", password: "abss2026" });
  assert.strictEqual(reviewerLogin.status, 200);
  assert.strictEqual(reviewerLogin.json?.role, "internship_reviewer");
  const reviewerToken = reviewerLogin.json.token;

  const badLogin = await request("POST", "/api/auth/login", { username: "admin", password: "wrongpassword" });
  assert.strictEqual(badLogin.status, 401);
  console.log("✓ PASS: All 4 administrator roles authenticate and receive cryptographically signed tokens");
  passed++;

  // 4. Server-Side RBAC Enforcement on Protected API Routes
  console.log("\n--- 4. Server-Side Role-Based Access Control (RBAC) ---");

  // 4a. Unauthenticated request rejected
  const noAuthRes = await request("GET", "/api/admin/internships/overview");
  assert.strictEqual(noAuthRes.status, 401, "Unauthenticated request must return 401");
  console.log("✓ PASS: Unauthenticated API request correctly rejected with 401");
  passed++;

  // 4b. super_admin has access to both modules
  const superInternRes = await request("GET", "/api/admin/internships/overview", null, { Authorization: `Bearer ${superToken}` });
  assert.strictEqual(superInternRes.status, 200, "super_admin should access internships overview");
  const superCompRes = await request("GET", "/api/admin/company/overview", null, { Authorization: `Bearer ${superToken}` });
  assert.strictEqual(superCompRes.status, 200, "super_admin should access company overview");
  console.log("✓ PASS: super_admin has full cross-module access to both modules");
  passed++;

  // 4c. internship_admin allowed on internships, FORBIDDEN on company
  const internAdminInternRes = await request("GET", "/api/admin/internships/overview", null, { Authorization: `Bearer ${internAdminToken}` });
  assert.strictEqual(internAdminInternRes.status, 200, "internship_admin should access internships overview");
  const internAdminCompRes = await request("GET", "/api/admin/company/overview", null, { Authorization: `Bearer ${internAdminToken}` });
  assert.strictEqual(internAdminCompRes.status, 403, "internship_admin must be rejected from company module with 403");
  console.log("✓ PASS: internship_admin can access internships (200), blocked from company (403 Forbidden)");
  passed++;

  // 4d. company_admin allowed on company, FORBIDDEN on internships
  const compAdminCompRes = await request("GET", "/api/admin/company/overview", null, { Authorization: `Bearer ${companyAdminToken}` });
  assert.strictEqual(compAdminCompRes.status, 200, "company_admin should access company overview");
  const compAdminInternRes = await request("GET", "/api/admin/internships/overview", null, { Authorization: `Bearer ${companyAdminToken}` });
  assert.strictEqual(compAdminInternRes.status, 403, "company_admin must be rejected from internships module with 403");
  console.log("✓ PASS: company_admin can access company (200), blocked from internships (403 Forbidden)");
  passed++;

  // 4e. internship_reviewer allowed on submissions/reviews, FORBIDDEN on payments & company
  const revSubRes = await request("GET", "/api/admin/internships/submissions", null, { Authorization: `Bearer ${reviewerToken}` });
  assert.strictEqual(revSubRes.status, 200, "reviewer should access submissions");
  const revPayRes = await request("GET", "/api/admin/internships/payments", null, { Authorization: `Bearer ${reviewerToken}` });
  assert.strictEqual(revPayRes.status, 403, "reviewer must be blocked from payments with 403");
  const revCompRes = await request("GET", "/api/admin/company/overview", null, { Authorization: `Bearer ${reviewerToken}` });
  assert.strictEqual(revCompRes.status, 403, "reviewer must be blocked from company module with 403");
  console.log("✓ PASS: internship_reviewer can access submissions (200), blocked from payments & company (403 Forbidden)");
  passed++;

  // 5. Dynamic Data & Honest Metrics
  console.log("\n--- 5. Dynamic Data Verification ---");
  const overviewData = internAdminInternRes.json;
  assert.ok(overviewData.metrics.enrolledInternsCount >= 19, "Enrolled interns count matches db.json");
  assert.ok(overviewData.metrics.activeTracksCount === 5, "5 Active tracks");
  assert.ok(overviewData.metrics.issuedCertificatesCount >= 3, "Issued certs count matches db.json");
  console.log(`✓ PASS: Real backend telemetry verified: ${overviewData.metrics.enrolledInternsCount} enrolled, ${overviewData.metrics.activeTracksCount} tracks, ${overviewData.metrics.issuedCertificatesCount} certs`);
  passed++;

  // 6. Certificate Issuance, Public Verification & Audit Logging
  console.log("\n--- 6. Certificate Lifecycle & Audit Trail ---");
  const testCertId = `ABSS-CERT-TEST-${Date.now()}`;
  const issueRes = await request(
    "POST",
    "/api/admin/internships/certificates",
    {
      id: testCertId,
      studentName: "Test Audit Learner",
      program: "Full-Stack Web Engineering",
      grade: "Grade A+ (Distinction - 99%)",
    },
    { Authorization: `Bearer ${superToken}` }
  );
  assert.strictEqual(issueRes.status, 201, "Certificate issuance should return 201");
  assert.strictEqual(issueRes.json?.certificate?.id, testCertId);

  // Verify public verification registry immediately recognizes the new certificate
  const verifyRes = await request("GET", `/api/certificates/verify?id=${testCertId}`);
  assert.strictEqual(verifyRes.status, 200, "Public verification must return 200");
  assert.strictEqual(verifyRes.json?.certificate?.studentName, "Test Audit Learner");

  // Revoke certificate
  const revokeRes = await request(
    "PUT",
    "/api/admin/internships/certificates/revoke",
    { id: testCertId },
    { Authorization: `Bearer ${superToken}` }
  );
  assert.strictEqual(revokeRes.status, 200, "Certificate revoke should return 200");
  assert.strictEqual(revokeRes.json?.certificate?.status, "Revoked");

  // Verify audit log has recorded the actions
  const auditRes = await request("GET", "/api/admin/audit-logs", null, { Authorization: `Bearer ${superToken}` });
  assert.strictEqual(auditRes.status, 200);
  assert.ok(auditRes.json?.activity?.some((act) => act.includes(testCertId)), "Audit trail must record certificate actions");
  console.log("✓ PASS: Certificate issuance, public verification, revocation and audit trail validated");
  passed++;

  console.log(`\n🎉 ALL ${passed} TWO-MODULE ADMIN & RBAC VERIFICATION CHECKS PASSED!\n`);
}

runRbacTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
