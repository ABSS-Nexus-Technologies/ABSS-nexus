const crypto = require("crypto");

/**
 * ABSS Nexus Task Engine
 * - Weekly Availability Logic
 * - Duration Filtering (Low: 4 tasks / High: 8 tasks)
 * - Submission Validation & State Machine
 */

function calculateStudentWeek(student) {
  if (!student) return 1;
  if (student.currentWeek && typeof student.currentWeek === "number") {
    return student.currentWeek;
  }
  const enrolledAt = student.enrolledAt || student.createdAt || new Date().toISOString();
  const enrolledMs = new Date(enrolledAt).getTime();
  const diffWeeks = Math.floor((Date.now() - enrolledMs) / (7 * 24 * 60 * 60 * 1000)) + 1;
  return Math.max(1, diffWeeks);
}

function getTasksForStudent({ student, db }) {
  if (!student) return [];
  const track = student.internshipTrack || student.track || "web-development";
  const isHigh = student.duration === "high";
  const maxWeeks = isHigh ? 8 : 4;
  const currentWeek = calculateStudentWeek(student);

  db.tasks = db.tasks || [];
  db.submissions = db.submissions || [];

  const trackTasks = db.tasks
    .filter((t) => t.track === track && t.week <= maxWeeks && t.status !== "archived")
    .sort((a, b) => a.week - b.week);

  // Map each task with dynamic state (available, locked, submitted, approved, rejected)
  return trackTasks.map((task) => {
    // Find latest submission for this student and task
    const studentSubmissions = db.submissions.filter(
      (s) => s.studentId === student.id && s.taskId === task.id
    );
    const latestSub = studentSubmissions[studentSubmissions.length - 1];

    let availability = "locked";
    // Availability rules:
    // If already approved -> completed
    // If pending review -> submitted
    // If rejected -> resubmit_available
    // If week matches currentWeek and not yet approved -> available
    // If past week and not submitted -> past_locked
    // If future week -> locked_future

    if (latestSub && latestSub.status === "approved") {
      availability = "approved";
    } else if (latestSub && latestSub.status === "pending") {
      availability = "under_review";
    } else if (latestSub && latestSub.status === "rejected") {
      availability = "resubmit_allowed";
    } else if (task.week <= currentWeek) {
      availability = "available";
    } else {
      availability = "locked_future";
    }

    return {
      id: task.id,
      week: task.week,
      title: task.title,
      description: task.description,
      points: task.points || 10,
      track: task.track,
      duration: task.duration,
      availability,
      isSubmittable: availability === "available" || availability === "resubmit_allowed",
      latestSubmission: latestSub || null
    };
  });
}

function submitTaskSolution({ student, taskId, textAnswer, githubLink, db, writeDb }) {
  if (!student) return { error: "Authentication required" };
  if (!student.accessGranted && student.paymentStatus !== "paid") {
    return { error: "Course materials and tasks are locked until payment is completed." };
  }

  const cleanText = String(textAnswer || "").trim();
  const cleanGithub = String(githubLink || "").trim();

  if (!cleanText || cleanText.length < 20) {
    return { error: "Please provide a detailed text answer (at least 20 characters)." };
  }
  if (cleanGithub && !/^https?:\/\/(www\.)?github\.com\/.+/i.test(cleanGithub)) {
    return { error: "Please provide a valid GitHub URL (https://github.com/username/repo)." };
  }

  const tasks = getTasksForStudent({ student, db });
  const targetTask = tasks.find((t) => t.id === taskId);
  if (!targetTask) {
    return { error: "Task not found for your enrolled track." };
  }

  if (!targetTask.isSubmittable && targetTask.availability !== "resubmit_allowed") {
    return { error: `Task Week ${targetTask.week} is currently ${targetTask.availability} and not open for submission.` };
  }

  db.submissions = db.submissions || [];
  const submissionId = `sub-${crypto.randomUUID()}`;
  const submissionRecord = {
    id: submissionId,
    studentId: student.id,
    studentEmail: student.email,
    studentName: student.name,
    taskId,
    track: targetTask.track,
    week: targetTask.week,
    textAnswer: cleanText,
    githubLink: cleanGithub || null,
    status: "pending", // pending, approved, rejected
    score: null,
    feedback: "",
    reviewedBy: null,
    reviewedAt: null,
    submittedAt: new Date().toISOString()
  };

  db.submissions.push(submissionRecord);
  writeDb(db);

  return {
    success: true,
    message: `Task Week ${targetTask.week} submitted successfully! Your submission is now under teacher review.`,
    submission: submissionRecord
  };
}

module.exports = {
  calculateStudentWeek,
  getTasksForStudent,
  submitTaskSolution
};
