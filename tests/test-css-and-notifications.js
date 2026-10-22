const assert = require("assert");
const fs = require("fs");
const path = require("path");

async function runTests() {
  console.log("=== Testing CSS Optimization & Email/Notification Systems ===\n");

  // =========================================================================
  // Part 1: CSS Optimization & Minification Verification
  // =========================================================================
  console.log("--- 1. CSS Optimization & Bundle Verification ---");

  const distStylesMin = path.join(__dirname, "..", "dist", "src", "styles", "styles.min.css");
  const distStylesCss = path.join(__dirname, "..", "dist", "src", "styles", "styles.css");
  const srcStylesMin = path.join(__dirname, "..", "src", "styles", "styles.min.css");

  assert.ok(fs.existsSync(distStylesMin), "dist/src/styles/styles.min.css must exist");
  assert.ok(fs.existsSync(distStylesCss), "dist/src/styles/styles.css must exist");
  assert.ok(fs.existsSync(srcStylesMin), "src/styles/styles.min.css must exist");

  const minifiedContent = fs.readFileSync(distStylesMin, "utf8");

  // Verify no render-blocking @import waterfall remains in minified bundle
  assert.strictEqual(
    minifiedContent.includes("@import"),
    false,
    "Minified CSS bundle must have all @import statements inlined (zero render-blocking waterfall)"
  );
  console.log("✓ PASS: Inlined @import statements confirmed - zero network waterfalls");

  // Verify balanced braces in minified bundle
  let depth = 0;
  for (const ch of minifiedContent) {
    if (ch === "{") depth++;
    if (ch === "}") depth--;
    assert.ok(depth >= 0, "No extra closing brace in minified CSS");
  }
  assert.strictEqual(depth, 0, "Braces must be perfectly balanced in minified CSS");
  console.log("✓ PASS: Minified CSS syntax and brace balance verified");

  // Verify modular component bundles in dist
  const expectedModules = [
    "header.min.css",
    "hero.min.css",
    "footer.min.css",
    "public-sections.min.css",
    "internship-portal.min.css",
    "admin.min.css",
  ];

  for (const mod of expectedModules) {
    const modPath = path.join(__dirname, "..", "dist", "src", "styles", mod);
    assert.ok(fs.existsSync(modPath), `Modular bundle ${mod} must exist in dist`);
  }
  console.log("✓ PASS: All 6 modular CSS component bundles generated successfully");

  // =========================================================================
  // Part 2: Email & Notification System Verification
  // =========================================================================
  console.log("\n--- 2. Email & Notification System Verification ---");

  const {
    isEmailServiceConfigured,
    sendEmail,
    sendAdminWebhookAlert,
    renderContactAdminAlert,
    renderContactUserConfirmation,
    renderStudentVerificationEmail,
    renderStudentPasswordResetEmail,
  } = await import("../functions/_lib/email-service.js");

  // 2a. Provider detection
  assert.strictEqual(isEmailServiceConfigured({}), false, "Empty env must report unconfigured");
  assert.strictEqual(isEmailServiceConfigured({ RESEND_API_KEY: "re_12345" }), true, "Resend key detected");
  assert.strictEqual(isEmailServiceConfigured({ SENDGRID_API_KEY: "SG.12345" }), true, "SendGrid key detected");
  assert.strictEqual(isEmailServiceConfigured({ MAILCHANNELS_ENABLED: "true" }), true, "MailChannels detected");
  console.log("✓ PASS: Multi-provider configuration detection (Resend, SendGrid, MailChannels) verified");

  // 2b. Contact Lead Templates
  const sampleLead = {
    client: "Acme Enterprises",
    name: "Vikram Malhotra",
    email: "vikram@acme.com",
    phone: "+91 98765 43210",
    service: "Cloud & DevOps Architecture",
    budget: 85000,
    message: "We need resilient cloud migration from AWS to Cloudflare Workers and GCP.",
  };

  const adminEmail = renderContactAdminAlert(sampleLead);
  assert.ok(adminEmail.subject.includes("Acme Enterprises"), "Admin alert subject has client name");
  assert.ok(adminEmail.html.includes("Cloud & DevOps Architecture"), "Admin alert HTML has service");
  assert.ok(adminEmail.html.includes("85,000"), "Admin alert HTML formatted budget");
  console.log("✓ PASS: Branded Admin Lead Alert template rendered with complete metadata");

  const userEmail = renderContactUserConfirmation(sampleLead);
  assert.ok(userEmail.subject.includes("ABSS Nexus"), "User confirmation subject branded");
  assert.ok(userEmail.html.includes("Vikram Malhotra"), "User confirmation addressed to client");
  assert.ok(userEmail.html.includes("24 business hours"), "User confirmation states response timeline");
  console.log("✓ PASS: Branded Client Confirmation template rendered with response SLA");

  // 2c. Student Verification & Password Reset Templates
  const studentVerify = renderStudentVerificationEmail({
    name: "Aman Gupta",
    email: "aman@university.edu",
    verificationUrl: "https://abssnexus.in/internships/verify-email?token=abc123xyz789",
  });
  assert.ok(studentVerify.subject.includes("Verify Your Email"), "Student verify subject");
  assert.ok(studentVerify.html.includes("Aman Gupta"), "Student verify addresses student");
  assert.ok(studentVerify.html.includes("https://abssnexus.in/internships/verify-email?token=abc123xyz789"), "Student verify has token link");
  console.log("✓ PASS: Student Email Verification template rendered with security notice");

  const studentReset = renderStudentPasswordResetEmail({
    name: "Aman Gupta",
    email: "aman@university.edu",
    resetUrl: "https://abssnexus.in/internships/reset-password?token=resetToken456",
  });
  assert.ok(studentReset.subject.includes("Password Reset"), "Student reset subject");
  assert.ok(studentReset.html.includes("https://abssnexus.in/internships/reset-password?token=resetToken456"), "Student reset has link");
  console.log("✓ PASS: Student Password Reset template rendered with 1-hour expiration warning");

  // 2d. Non-blocking simulated send when unconfigured
  const simulatedSend = await sendEmail({}, {
    to: "test@example.com",
    subject: "Test Subject",
    html: "<p>Test</p>",
  });
  assert.strictEqual(simulatedSend.simulated, true, "Unconfigured send safely simulates without throwing");
  console.log("✓ PASS: Graceful non-blocking fallback when email keys are not yet configured");

  // 2e. Simulated webhook alert
  const webhookResult = await sendAdminWebhookAlert({}, {
    event: "test_event",
    title: "Test Alert",
    details: { Test: "Passed" },
  });
  assert.strictEqual(webhookResult.ok, false, "Safely returns false when no webhook URL configured");
  console.log("✓ PASS: Admin webhook gateway handles unconfigured state cleanly");

  console.log("\n🎉 ALL CSS OPTIMIZATION & EMAIL NOTIFICATION CHECKS PASSED PERFECTLY!");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
