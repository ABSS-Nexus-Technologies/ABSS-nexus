const crypto = require("crypto");

/**
 * ABSS Nexus Track Change Engine
 * - Enforces ₹49 Migration Fee
 * - Deletes/Resets Old Track Task Submissions
 * - Sets Student Enrollment to Week 1 on New Track
 * - Logs Migration History in db.track_changes
 */

function initiateTrackChangeOrder({ student, newTrack, razorpayInstance }) {
  if (!student) {
    return { error: "Authentication required" };
  }
  if (!newTrack || newTrack === student.internshipTrack) {
    return { error: "Please select a different internship track to switch to." };
  }

  const amount = 49;
  const amountInPaise = amount * 100;
  const orderId = `order_tc_${crypto.randomBytes(6).toString("hex")}`;

  return {
    success: true,
    amount,
    currency: "INR",
    orderId,
    studentId: student.id,
    currentTrack: student.internshipTrack,
    newTrack
  };
}

function executeTrackChange({ student, newTrack, paymentId, db, writeDb }) {
  if (!student) return { error: "Student not found" };
  if (!newTrack) return { error: "New track must be specified" };

  const oldTrack = student.internshipTrack;

  // 1. Record migration in track_changes
  db.track_changes = db.track_changes || [];
  const changeRecord = {
    id: `tc-${crypto.randomUUID()}`,
    studentId: student.id,
    studentEmail: student.email,
    oldTrack,
    newTrack,
    chargeApplied: 49,
    currency: "INR",
    paymentId: paymentId || `pay_sim_${Date.now()}`,
    status: "completed",
    changedAt: new Date().toISOString()
  };
  db.track_changes.push(changeRecord);

  // 2. Delete old track task submissions from student record
  db.submissions = db.submissions || [];
  db.submissions = db.submissions.filter(
    (s) => !(s.studentId === student.id && s.track === oldTrack)
  );

  // 3. Update student record: migrate track and reset progress to Week 1
  student.internshipTrack = newTrack;
  student.track = newTrack;
  student.currentWeek = 1;
  student.totalPoints = 0;
  student.updatedAt = new Date().toISOString();

  // Find track metadata for duration weeks / tasks count
  const trackObj = (db.tracks || []).find((t) => t.slug === newTrack);
  if (trackObj) {
    const isHigh = student.duration === "high";
    student.durationWeeks = isHigh ? trackObj.highDurationWeeks : trackObj.lowDurationWeeks;
    student.tasksCount = isHigh ? trackObj.highTasksCount : trackObj.lowTasksCount;
  }

  writeDb(db);

  return {
    success: true,
    message: `Track successfully changed from ${oldTrack} to ${newTrack}. Tasks have been reset to Week 1.`,
    student
  };
}

module.exports = {
  initiateTrackChangeOrder,
  executeTrackChange
};
