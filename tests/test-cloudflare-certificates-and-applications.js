const assert = require("assert");

// Mock SQLite D1 Database for Cloudflare functions testing
class MockD1Database {
  constructor() {
    this.tables = {
      leads: [],
      projects: [],
      clients: [],
      tickets: [],
      pricing: [],
      activity: [],
      internship_applications: [],
      internship_programs: [],
      students: [],
      student_verification_tokens: [],
      student_sessions: [],
      certificates: [],
      app_metadata: [],
    };
  }

  prepare(sql) {
    const db = this;
    return {
      bind(...params) {
        return {
          async run() {
            const trimmed = sql.trim();
            if (trimmed.startsWith("CREATE TABLE") || trimmed.startsWith("CREATE INDEX") || trimmed.startsWith("PRAGMA")) {
              return { meta: { changes: 0 } };
            }

            if (trimmed.startsWith("INSERT OR REPLACE INTO certificates") || trimmed.startsWith("INSERT INTO certificates")) {
              const [id, student_name, program, issue_date, grade, status, verification_hash, skills_json, issuer, verification_url, created_at, updated_at] = params;
              const idx = db.tables.certificates.findIndex((c) => c.id.toUpperCase() === id.toUpperCase());
              const row = { id, student_name, program, issue_date, grade, status, verification_hash, skills_json, issuer, verification_url, created_at, updated_at };
              if (idx >= 0) db.tables.certificates[idx] = row;
              else db.tables.certificates.push(row);
              return { meta: { changes: 1 } };
            }

            if (trimmed.startsWith("UPDATE certificates SET status = 'Revoked'")) {
              const [updated_at, upperId] = params;
              const row = db.tables.certificates.find((c) => c.id.toUpperCase() === upperId.toUpperCase());
              if (row) {
                row.status = "Revoked";
                row.updated_at = updated_at;
                return { meta: { changes: 1 } };
              }
              return { meta: { changes: 0 } };
            }

            if (trimmed.startsWith("INSERT OR REPLACE INTO internship_applications")) {
              const [id, full_name, email, phone, college, course, graduation_year, internship_program, technical_skills, experience_level, portfolio_url, github_url, linkedin_url, resume_reference, motivation, status, admin_notes, created_at, updated_at] = params;
              const idx = db.tables.internship_applications.findIndex((a) => a.id.toLowerCase() === id.toLowerCase());
              const row = { id, full_name, email, phone, college, course, graduation_year, internship_program, technical_skills, experience_level, portfolio_url, github_url, linkedin_url, resume_reference, motivation, status, admin_notes, created_at, updated_at };
              if (idx >= 0) db.tables.internship_applications[idx] = row;
              else db.tables.internship_applications.push(row);
              return { meta: { changes: 1 } };
            }

            if (trimmed.startsWith("INSERT") && trimmed.includes("activity")) {
              return { meta: { changes: 1 } };
            }

            return { meta: { changes: 0 } };
          },

          async first() {
            const trimmed = sql.trim();
            if (trimmed.includes("FROM certificates WHERE upper(id) = ?")) {
              const [upperId] = params;
              return db.tables.certificates.find((c) => c.id.toUpperCase() === upperId.toUpperCase()) || null;
            }

            if (trimmed.includes("FROM internship_applications WHERE lower(id) = ? OR lower(email) = ?")) {
              const [q1, q2] = params;
              return db.tables.internship_applications.find(
                (a) => a.id.toLowerCase() === q1.toLowerCase() || a.email.toLowerCase() === q2.toLowerCase()
              ) || null;
            }

            if (trimmed.includes("COUNT(*) AS total FROM certificates")) {
              return { total: db.tables.certificates.length };
            }

            if (trimmed.includes("COUNT(*) AS total FROM internship_applications")) {
              return { total: db.tables.internship_applications.length };
            }

            return null;
          },

          async all() {
            const trimmed = sql.trim();
            if (trimmed.includes("FROM certificates")) {
              return { results: [...db.tables.certificates] };
            }
            if (trimmed.includes("FROM internship_applications")) {
              return { results: [...db.tables.internship_applications] };
            }
            return { results: [] };
          },
        };
      },
    };
  }
}

async function run() {
  console.log("=== Testing Cloudflare D1 Certificates & Application Status APIs ===");

  const { onRequest } = await import("../functions/api/[[path]].js");

  const mockDb = new MockD1Database();
  const env = {
    ABSS_DB: mockDb,
    AUTH_SECRET: "test-auth-secret-key-2026",
    ADMIN_USERNAME: "admin",
    ADMIN_PASSWORD: "testpassword2026",
  };

  // Helper to simulate Cloudflare fetch
  async function callApi(method, path, body = null, headers = {}) {
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
    const data = await res.json();
    return { status: res.status, data };
  }

  // 1. Verify Official Demo Certificate
  console.log("1. Verifying official demo certificate...");
  const cert1 = await callApi("GET", "/api/certificates/verify?id=ABSS-CERT-2026-WD-1042");
  assert.strictEqual(cert1.status, 200, "Official cert returns 200");
  assert.strictEqual(cert1.data.valid, true, "Official cert valid = true");
  assert.strictEqual(cert1.data.certificate.studentName, "Aarav Sharma");
  console.log("✓ PASS: Default authentic certificate verified");

  // 2. Query Non-Existent Certificate
  console.log("2. Querying fake certificate ID...");
  const fakeCert = await callApi("GET", "/api/certificates/verify?id=FAKE-CERT-9999");
  assert.strictEqual(fakeCert.status, 404, "Fake cert returns 404");
  assert.strictEqual(fakeCert.data.valid, false, "Fake cert valid = false");
  assert.ok(fakeCert.data.error.includes("No certificate found"));
  console.log("✓ PASS: Fake certificate rejected with 404");

  // 3. Admin Login to get Token
  console.log("3. Logging in as admin...");
  const loginRes = await callApi("POST", "/api/auth/login", {
    username: "admin",
    password: "testpassword2026",
  });
  assert.strictEqual(loginRes.status, 200);
  const adminToken = loginRes.data.token;
  assert.ok(adminToken, "Admin token received");
  console.log("✓ PASS: Admin authenticated");

  // 4. Admin Issues a Real Certificate into D1
  console.log("4. Admin issuing new certificate for Rahul Verma...");
  const newCertId = "ABSS-CERT-2026-WD-9988";
  const issueRes = await callApi(
    "POST",
    "/api/admin/internships/certificates",
    {
      id: newCertId,
      studentName: "Rahul Verma",
      program: "Full-Stack Web Engineering",
      issueDate: "April 20, 2026",
      grade: "Grade A+ (Distinction - 99%)",
      skills: ["React", "Cloudflare Workers", "SQLite D1"],
    },
    { Authorization: `Bearer ${adminToken}` }
  );
  assert.strictEqual(issueRes.status, 201, "Issue cert returns 201 Created");
  assert.strictEqual(issueRes.data.certificate.studentName, "Rahul Verma");
  assert.strictEqual(issueRes.data.certificate.id, newCertId);
  console.log("✓ PASS: Certificate created in D1 database");

  // 5. Public Verification of newly issued D1 Certificate
  console.log("5. Public verifying newly issued certificate from D1...");
  const verifyNew = await callApi("GET", `/api/certificates/verify?id=${newCertId}`);
  assert.strictEqual(verifyNew.status, 200, "New cert returns 200");
  assert.strictEqual(verifyNew.data.valid, true, "New cert valid = true");
  assert.strictEqual(verifyNew.data.certificate.studentName, "Rahul Verma", "Student name matches real student");
  assert.deepStrictEqual(verifyNew.data.certificate.skills, ["React", "Cloudflare Workers", "SQLite D1"]);
  console.log("✓ PASS: Real D1 student certificate verified successfully (Not hardcoded!)");

  // 6. Admin Revokes Certificate
  console.log("6. Admin revoking certificate...");
  const revokeRes = await callApi(
    "PUT",
    "/api/admin/internships/certificates/revoke",
    { id: newCertId },
    { Authorization: `Bearer ${adminToken}` }
  );
  assert.strictEqual(revokeRes.status, 200, "Revoke returns 200");
  console.log("✓ PASS: Certificate marked Revoked in D1");

  // 7. Public Verification of Revoked Certificate
  console.log("7. Public verifying revoked certificate...");
  const verifyRevoked = await callApi("GET", `/api/certificates/verify?id=${newCertId}`);
  assert.strictEqual(verifyRevoked.status, 200);
  assert.strictEqual(verifyRevoked.data.valid, false, "Revoked cert valid = false");
  assert.strictEqual(verifyRevoked.data.certificate.status, "Revoked");
  console.log("✓ PASS: Revoked certificate correctly identified as invalid");

  // 8. Application Status - Default demo query
  console.log("8. Checking demo application status...");
  const app1 = await callApi("GET", "/api/internships/application-status?query=ABSS-2026-WD-8492");
  assert.strictEqual(app1.status, 200);
  assert.strictEqual(app1.data.found, true);
  assert.strictEqual(app1.data.application.name, "Aarav Sharma");
  console.log("✓ PASS: Demo application status returned");

  // 9. Application Status - Real Candidate in D1
  console.log("9. Checking real applicant stored in D1...");
  mockDb.tables.internship_applications.push({
    id: "ABSS-2026-APP-7711",
    full_name: "Neha Sundaram",
    email: "neha.s@college.edu",
    phone: "9876543210",
    college: "Delhi Technological University",
    course: "B.Tech CSE",
    graduation_year: "2027",
    internship_program: "Web Development Internship",
    technical_skills: "Node.js, Vue, TailwindCSS",
    experience_level: "Intermediate",
    portfolio_url: "https://neha.dev",
    github_url: "https://github.com/neha",
    linkedin_url: "https://linkedin.com/in/neha",
    resume_reference: "drive.google.com/resume",
    motivation: "Excited to build full-stack apps",
    status: "Shortlisted",
    admin_notes: "Passed coding assessment with top marks.",
    created_at: "2026-04-18T10:00:00.000Z",
    updated_at: "2026-04-19T10:00:00.000Z",
  });

  const realAppById = await callApi("GET", "/api/internships/application-status?query=ABSS-2026-APP-7711");
  assert.strictEqual(realAppById.status, 200);
  assert.strictEqual(realAppById.data.found, true);
  assert.strictEqual(realAppById.data.application.name, "Neha Sundaram", "Returns real candidate name from D1");
  assert.strictEqual(realAppById.data.application.status, "Shortlisted");
  assert.strictEqual(realAppById.data.application.step, 3);
  console.log("✓ PASS: Real D1 applicant verified by ID");

  const realAppByEmail = await callApi("GET", "/api/internships/application-status?query=neha.s@college.edu");
  assert.strictEqual(realAppByEmail.status, 200);
  assert.strictEqual(realAppByEmail.data.found, true);
  assert.strictEqual(realAppByEmail.data.application.name, "Neha Sundaram");
  console.log("✓ PASS: Real D1 applicant verified by registered email");

  // 10. Fake Application Query
  console.log("10. Checking fake applicant query...");
  const fakeApp = await callApi("GET", "/api/internships/application-status?query=nonexistent@gmail.com");
  assert.strictEqual(fakeApp.status, 404, "Fake application query returns 404");
  assert.strictEqual(fakeApp.data.found, false);
  assert.ok(fakeApp.data.error.includes("No application record found"));
  console.log("✓ PASS: Fake application query correctly rejected with 404");

  console.log("\n🎉 ALL 10 D1 CERTIFICATE & APPLICATION REGISTRY TESTS PASSED PERFECTLY!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
