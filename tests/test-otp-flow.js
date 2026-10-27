const http = require("http");
const assert = require("assert");

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body });
        }
      });
    });
    req.on("error", reject);
    if (data) req.write(typeof data === "string" ? data : JSON.stringify(data));
    req.end();
  });
}

async function run() {
  console.log("Testing OTP Registration and Verification Flow...");
  const testEmail = `student-otp-${Date.now()}@example.com`;

  // 1. Send OTP Registration Request
  const regRes = await request(
    {
      hostname: "127.0.0.1",
      port: 3000,
      path: "/api/internships/register",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      name: "Rohit Sharma",
      email: testEmail,
      phone: "9876543210",
      password: "SuperSecret@Password2026!",
      track: "full-stack-web-development",
      duration: "high",
    }
  );

  console.log("1. /api/internships/register response status:", regRes.status);
  assert.strictEqual(regRes.status, 200, "Registration should return 200");
  assert.strictEqual(regRes.body.success, true, "Success should be true");
  assert(regRes.body.demoOtp, "demoOtp should be returned");
  const otpCode = regRes.body.demoOtp;
  console.log("   ✓ Generated OTP:", otpCode);

  // 2. Verify OTP with incorrect code (should fail)
  const failRes = await request(
    {
      hostname: "127.0.0.1",
      port: 3000,
      path: "/api/internships/verify-otp",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      email: testEmail,
      code: "000000",
      type: "registration",
    }
  );
  console.log("2. Incorrect OTP response status:", failRes.status);
  assert.strictEqual(failRes.status, 400, "Invalid OTP should return 400");
  console.log("   ✓ Incorrect OTP correctly rejected");

  // 3. Verify OTP with correct code (should succeed)
  const verifyRes = await request(
    {
      hostname: "127.0.0.1",
      port: 3000,
      path: "/api/internships/verify-otp",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      email: testEmail,
      code: otpCode,
      type: "registration",
    }
  );
  console.log("3. /api/internships/verify-otp response status:", verifyRes.status);
  assert.strictEqual(verifyRes.status, 200, "Valid OTP should return 200");
  assert.strictEqual(verifyRes.body.success, true, "Verification should succeed");
  console.log("   ✓ OTP verified successfully!");

  // 4. Resend OTP
  const resendRes = await request(
    {
      hostname: "127.0.0.1",
      port: 3000,
      path: "/api/internships/resend-otp",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      email: testEmail,
      phone: "9876543210",
      type: "registration",
    }
  );
  console.log("4. /api/internships/resend-otp response status:", resendRes.status);
  assert.strictEqual(resendRes.status, 200, "Resend OTP should return 200");
  assert(resendRes.body.demoOtp, "Resend should return new demoOtp");
  console.log("   ✓ Resend OTP working successfully!");

  console.log("\n🎉 ALL OTP FLOW TESTS PASSED SUCCESSFULLY!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
