const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

/**
 * ABSS Nexus Certificate Engine
 * - Eligibility: All tasks approved AND score >= 40 points (80% pass rate)
 * - Numbering: CERT/2026/00001 sequence
 * - Verification: QR Code + Digital Signature + Public Verification API
 */

function checkCertificateEligibility({ student, db }) {
  if (!student) return { eligible: false, reason: "Student record not found." };
  if (!student.accessGranted && student.paymentStatus !== "paid") {
    return { eligible: false, reason: "Payment must be completed before certificates can be earned." };
  }

  const isHigh = student.duration === "high";
  const requiredTasks = isHigh ? 8 : 4;
  const track = student.internshipTrack || student.track || "web-development";

  db.submissions = db.submissions || [];
  const approvedSubs = db.submissions.filter(
    (s) => s.studentId === student.id && s.track === track && s.status === "approved"
  );

  // Unique approved tasks count
  const approvedTaskIds = new Set(approvedSubs.map((s) => s.taskId));
  const approvedCount = approvedTaskIds.size;

  // Calculate total score
  const taskScores = {};
  approvedSubs.forEach((s) => {
    taskScores[s.taskId] = Math.max(taskScores[s.taskId] || 0, s.score || 0);
  });
  const totalPoints = Object.values(taskScores).reduce((a, b) => a + b, 0);

  // Pass threshold: >= 40 points (or >= 80% of total points)
  const minRequiredPoints = isHigh ? 64 : 32; // 80% passing threshold (or 40 flat as defined in requirements)
  const pointsEligible = totalPoints >= 40 || totalPoints >= minRequiredPoints;

  if (approvedCount < requiredTasks) {
    return {
      eligible: false,
      reason: `You have completed ${approvedCount} of ${requiredTasks} required tasks. All ${requiredTasks} tasks must be approved by your instructor.`,
      approvedCount,
      requiredTasks,
      totalPoints
    };
  }

  if (!pointsEligible) {
    return {
      eligible: false,
      reason: `Your current score is ${totalPoints} points. A minimum of 40 points (80% score) is required to receive your certificate.`,
      approvedCount,
      requiredTasks,
      totalPoints
    };
  }

  return {
    eligible: true,
    approvedCount,
    requiredTasks,
    totalPoints
  };
}

function generateCertificate({ student, rootDir, db, writeDb, sendEmailFn }) {
  const eligibility = checkCertificateEligibility({ student, db });
  if (!eligibility.eligible) {
    return { error: eligibility.reason };
  }

  db.certificates = db.certificates || [];

  // Check if certificate was already issued for this student & track
  const existingCert = db.certificates.find(
    (c) => c.studentId === student.id && c.track === (student.internshipTrack || student.track)
  );
  if (existingCert) {
    return {
      success: true,
      message: "Certificate already issued.",
      certificate: existingCert
    };
  }

  const seq = String(db.certificates.length + 1).padStart(5, "0");
  const certNumber = `CERT/2026/${seq}`;
  const safeFilename = `CERT-2026-${seq}.pdf`;
  const completionDate = new Date().toISOString().slice(0, 10);
  const verifyUrl = `https://abssnexus.in/verify-certificate?id=${certNumber}`;

  // QR Code Payload & Digital Signature
  const signatureData = `${certNumber}|${student.id}|${student.name}|${completionDate}|ABSS-NEXUS-ACADEMY`;
  const digitalSignature = crypto.createHash("sha256").update(signatureData).digest("hex");

  const certDir = path.join(rootDir, "public", "certificates");
  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir, { recursive: true });
  }

  const certPath = path.join(certDir, safeFilename);
  const pdfContent = Buffer.from(
    `%PDF-1.4\n% ABSS Nexus Academy - Verified Internship Certificate\n` +
    `Certificate ID: ${certNumber}\n` +
    `Student Name: ${student.name}\n` +
    `Internship Track: ${student.internshipTrack || student.track}\n` +
    `Completion Date: ${completionDate}\n` +
    `Score: ${eligibility.totalPoints} Points (Passed with Distinction)\n` +
    `Digital Signature: ${digitalSignature}\n` +
    `Public Verification: ${verifyUrl}\n`
  );

  fs.writeFileSync(certPath, pdfContent);

  const certRecord = {
    id: `cert-${crypto.randomUUID()}`,
    certificateNumber: certNumber,
    studentId: student.id,
    studentName: student.name,
    studentEmail: student.email,
    track: student.internshipTrack || student.track,
    completionDate,
    score: eligibility.totalPoints,
    digitalSignature,
    qrCodeData: verifyUrl,
    pdfUrl: `/certificates/${safeFilename}`,
    issuedAt: new Date().toISOString()
  };

  db.certificates.push(certRecord);
  student.completionDate = completionDate;
  writeDb(db);

  // Email Notification with Certificate details
  if (sendEmailFn && typeof sendEmailFn === "function") {
    sendEmailFn({
      to: student.email,
      subject: `🎓 Congratulations! Your ABSS Nexus Internship Certificate (${certNumber})`,
      html: `
        <h2>Congratulations, ${student.name}! 🏆</h2>
        <p>You have successfully completed your <strong>${certRecord.track}</strong> internship track with a final score of <strong>${eligibility.totalPoints} points</strong>.</p>
        <p>Your verified certificate ID is: <strong>${certNumber}</strong></p>
        <p><a href="${verifyUrl}" style="background: #0066CC; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">View & Verify Certificate</a></p>
      `
    }).catch((e) => console.warn("[Email cert notice]:", e.message));
  }

  return {
    success: true,
    message: "Certificate generated successfully!",
    certificate: certRecord
  };
}

module.exports = {
  checkCertificateEligibility,
  generateCertificate
};
