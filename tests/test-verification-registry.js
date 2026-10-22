const assert = require("assert");
const http = require("http");

function fetchJson(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

async function run() {
  console.log("=== Testing Real Certificate & Verification Registry APIs ===");

  // 1. Valid Certificate Check
  const validCert = await fetchJson("/api/certificates/verify?id=ABSS-CERT-2026-WD-1042");
  assert.strictEqual(validCert.status, 200, "Valid cert returns 200");
  assert.strictEqual(validCert.body.valid, true, "Valid cert body has valid: true");
  assert.strictEqual(validCert.body.certificate.studentName, "Aarav Sharma", "Valid cert belongs to Aarav Sharma");
  console.log("✓ PASS: Valid certificate returns 200 and authentic student data");

  // 2. Fake Certificate Check
  const fakeCert = await fetchJson("/api/certificates/verify?id=FAKE-ID-9999");
  assert.strictEqual(fakeCert.status, 404, "Fake cert returns 404");
  assert.strictEqual(fakeCert.body.valid, false, "Fake cert body has valid: false");
  assert.ok(fakeCert.body.error.includes("No certificate found"), "Fake cert returns not found message");
  console.log("✓ PASS: Fake/tampered certificate correctly rejected with 404 error");

  // 3. Valid Application Check by ID
  const validAppById = await fetchJson("/api/internships/application-status?query=ABSS-2026-WD-8492");
  assert.strictEqual(validAppById.status, 200, "Valid app by ID returns 200");
  assert.strictEqual(validAppById.body.found, true, "Valid app body has found: true");
  assert.strictEqual(validAppById.body.application.name, "Aarav Sharma", "Matches student name");
  console.log("✓ PASS: Valid application by ID returns 200 and pipeline status");

  // 4. Valid Application Check by Email
  const validAppByEmail = await fetchJson("/api/internships/application-status?query=aarav.sharma@example.com");
  assert.strictEqual(validAppByEmail.status, 200, "Valid app by email returns 200");
  assert.strictEqual(validAppByEmail.body.found, true, "Valid app body has found: true");
  console.log("✓ PASS: Valid application by Email returns 200");

  // 5. Fake Application Check
  const fakeApp = await fetchJson("/api/internships/application-status?query=non-existent-student@gmail.com");
  assert.strictEqual(fakeApp.status, 404, "Fake app returns 404");
  assert.strictEqual(fakeApp.body.found, false, "Fake app body has found: false");
  console.log("✓ PASS: Fake application correctly returns 404 error");

  // 6. Valid Payment Check
  const validPayment = await fetchJson("/api/internships/payment-status?query=TXN-84920482");
  assert.strictEqual(validPayment.status, 200, "Valid payment returns 200");
  assert.strictEqual(validPayment.body.found, true, "Valid payment body has found: true");
  assert.strictEqual(validPayment.body.payment.receiptNumber, "ABSS-REC-2026-0492", "Receipt number matches");
  console.log("✓ PASS: Valid payment returns 200 and receipt data");

  // 7. Fake Payment Check
  const fakePayment = await fetchJson("/api/internships/payment-status?query=FAKE-TXN-000");
  assert.strictEqual(fakePayment.status, 404, "Fake payment returns 404");
  assert.strictEqual(fakePayment.body.found, false, "Fake payment body has found: false");
  console.log("✓ PASS: Fake payment transaction correctly returns 404 error");

  console.log("\n🎉 ALL 7 VERIFICATION REGISTRY CHECKS PASSED SUCCESSFULLY!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
