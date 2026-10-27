/**
 * ABSS Nexus Teacher Review & Grading Engine
 * - Score validation: 0, 2, 4, 6, 8, 10 points
 * - Approve / Reject workflow
 * - Student Total Points & Progression Recalculation
 */

function reviewSubmission({ submissionId, reviewerEmail, score, feedback, status, db, writeDb }) {
  db.submissions = db.submissions || [];
  const subIndex = db.submissions.findIndex((s) => s.id === submissionId);
  if (subIndex === -1) {
    return { error: "Submission record not found." };
  }

  const validStatuses = ["approved", "rejected", "pending"];
  if (!validStatuses.includes(status)) {
    return { error: "Status must be 'approved' or 'rejected'." };
  }

  const parsedScore = Number(score);
  const validScores = [0, 2, 4, 6, 8, 10];
  if (status === "approved" && !validScores.includes(parsedScore)) {
    return { error: "Score must be one of: 0, 2, 4, 6, 8, or 10 points." };
  }

  const sub = db.submissions[subIndex];
  sub.status = status;
  sub.score = status === "approved" ? parsedScore : (parsedScore || 0);
  sub.feedback = String(feedback || "").trim();
  sub.reviewedBy = reviewerEmail || "instructor@abssnexus.in";
  sub.reviewedAt = new Date().toISOString();

  // Recalculate student totalPoints and check if week should advance
  db.students = db.students || [];
  const student = db.students.find((s) => s.id === sub.studentId || s.email === sub.studentEmail);
  if (student) {
    const studentApprovedSubs = db.submissions.filter(
      (s) => s.studentId === student.id && s.status === "approved"
    );
    
    // Sum unique approved task scores
    const approvedTaskMap = {};
    studentApprovedSubs.forEach((s) => {
      approvedTaskMap[s.taskId] = Math.max(approvedTaskMap[s.taskId] || 0, s.score || 0);
    });
    student.totalPoints = Object.values(approvedTaskMap).reduce((a, b) => a + b, 0);

    // If approved and matches currentWeek, allow student to advance to next week
    if (status === "approved" && sub.week >= (student.currentWeek || 1)) {
      const isHigh = student.duration === "high";
      const maxWeeks = isHigh ? 8 : 4;
      student.currentWeek = Math.min(maxWeeks, sub.week + 1);
    }

    student.updatedAt = new Date().toISOString();
  }

  writeDb(db);

  return {
    success: true,
    message: `Submission ${status === "approved" ? "approved with " + sub.score + " points" : "rejected with feedback"}.`,
    submission: sub,
    studentTotalPoints: student ? student.totalPoints : null
  };
}

function getSubmissionsForReview({ track, status, db }) {
  db.submissions = db.submissions || [];
  let list = db.submissions;

  if (track && track !== "all") {
    list = list.filter((s) => s.track === track);
  }
  if (status && status !== "all") {
    list = list.filter((s) => s.status === status);
  }

  // Return newest first
  return list.slice().sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
}

module.exports = {
  reviewSubmission,
  getSubmissionsForReview
};
