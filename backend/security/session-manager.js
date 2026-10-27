const crypto = require("crypto");
const { createDeviceFingerprint } = require("./crypto-vault");

/**
 * ABSS Nexus Enterprise Session Manager
 * OWASP Top 10 Compliant Session Security
 * - 30-Minute Idle Expiration (Max-Age=1800)
 * - 8-Hour Absolute Lifetime Ceiling
 * - Maximum 2 Concurrent Sessions per Student (Oldest revoked)
 * - Cryptographic 256-bit Random Token Generation (Hashed at rest)
 * - Device Fingerprint Verification & Suspicious Activity Tagging
 * - Immediate Invalidation on Logout, Password Change, or Account Lockout
 */

const IDLE_TIMEOUT_MS = 30 * 60 * 1000;       // 30 Minutes
const ABSOLUTE_TIMEOUT_MS = 8 * 60 * 60 * 1000; // 8 Hours Max

function hashSessionToken(rawToken) {
  return crypto.createHash("sha256").update(String(rawToken)).digest("hex");
}

/**
 * Create a new student session
 * Enforces maximum 2 concurrent sessions per student
 */
function createStudentSession(student, request, db) {
  db.studentSessions = db.studentSessions || [];

  // Generate 256-bit cryptographic token (32 bytes hex)
  const rawToken = crypto.randomBytes(32).toString("hex");
  const sessionHash = hashSessionToken(rawToken);
  const now = Date.now();
  const expiresAt = new Date(now + IDLE_TIMEOUT_MS).toISOString();
  const absoluteExpiresAt = new Date(now + ABSOLUTE_TIMEOUT_MS).toISOString();

  const userAgent = request?.headers?.["user-agent"] || "unknown_agent";
  const ipAddress = (request?.headers?.["x-forwarded-for"] || request?.socket?.remoteAddress || "127.0.0.1").split(",")[0].trim();
  const deviceFingerprint = request ? createDeviceFingerprint(request) : "fingerprint_unknown";

  // Filter existing active sessions for this student
  const activeSessions = db.studentSessions.filter(
    (s) => s.studentId === student.id && s.isActive !== false && !s.isLoggedOut && new Date(s.expiresAt).getTime() > now
  );

  // If already at or above 2 concurrent sessions, terminate the oldest one(s)
  if (activeSessions.length >= 2) {
    activeSessions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    // Terminate oldest
    const sessionsToTerminate = activeSessions.slice(0, activeSessions.length - 1);
    for (const oldSession of sessionsToTerminate) {
      oldSession.isActive = false;
      oldSession.isLoggedOut = true;
      oldSession.terminatedAt = new Date().toISOString();
      oldSession.terminationReason = "concurrent_session_limit";
    }
  }

  const sessionRecord = {
    id: `sess_${crypto.randomUUID()}`,
    sessionHash,
    studentId: student.id,
    email: student.email,
    deviceFingerprint,
    userAgent,
    ipAddress,
    createdAt: new Date(now).toISOString(),
    lastActivity: new Date(now).toISOString(),
    expiresAt,
    absoluteExpiresAt,
    isActive: true,
    isLoggedOut: false,
    terminatedAt: null,
    terminationReason: null,
  };

  db.studentSessions.push(sessionRecord);

  return {
    rawToken,
    sessionRecord,
  };
}

/**
 * Validate and extend active session (Sliding 30-min idle timeout)
 */
function validateAndTouchSession(rawToken, request, db) {
  if (!rawToken) return null;
  db.studentSessions = db.studentSessions || [];
  const sessionHash = hashSessionToken(rawToken);

  const session = db.studentSessions.find((s) => s.sessionHash === sessionHash);
  if (!session || session.isActive === false || session.isLoggedOut) {
    return null;
  }

  const now = Date.now();
  const expiresAtMs = new Date(session.expiresAt).getTime();
  const absoluteExpiresAtMs = session.absoluteExpiresAt ? new Date(session.absoluteExpiresAt).getTime() : now + ABSOLUTE_TIMEOUT_MS;

  // Check if idle expired or absolute ceiling reached
  if (now > expiresAtMs || now > absoluteExpiresAtMs) {
    session.isActive = false;
    session.terminatedAt = new Date().toISOString();
    session.terminationReason = now > absoluteExpiresAtMs ? "absolute_timeout" : "idle_timeout";
    return null;
  }

  // Extend idle session up to absolute limit
  const nextIdleExpiry = now + IDLE_TIMEOUT_MS;
  const newExpiresAt = Math.min(nextIdleExpiry, absoluteExpiresAtMs);
  session.lastActivity = new Date(now).toISOString();
  session.expiresAt = new Date(newExpiresAt).toISOString();

  // Verify device fingerprint
  if (request) {
    const currentFingerprint = createDeviceFingerprint(request);
    if (session.deviceFingerprint && session.deviceFingerprint !== currentFingerprint) {
      // Flag suspicious fingerprint drift, but allow legitimate IP transitions (mobile cell tower handoff)
      session.suspiciousDriftDetected = true;
    }
  }

  // Find associated student
  const student = (db.students || []).find((st) => st.id === session.studentId);
  if (!student) return null;

  return {
    session,
    student,
  };
}

/**
 * Invalidate a single session (Logout)
 */
function invalidateSession(rawToken, db, reason = "user_logout") {
  if (!rawToken || !db.studentSessions) return false;
  const sessionHash = hashSessionToken(rawToken);
  const session = db.studentSessions.find((s) => s.sessionHash === sessionHash);
  if (session) {
    session.isActive = false;
    session.isLoggedOut = true;
    session.terminatedAt = new Date().toISOString();
    session.terminationReason = reason;
  }
  db.studentSessions = (db.studentSessions || []).filter((s) => s.sessionHash !== sessionHash);
  return true;
}

/**
 * Invalidate ALL sessions for a given student (Password change, lockout, logout-all)
 */
function invalidateAllStudentSessions(studentId, db, reason = "password_changed") {
  if (!studentId || !db.studentSessions) return 0;
  let count = 0;
  for (const s of db.studentSessions) {
    if (s.studentId === studentId && s.isActive !== false) {
      s.isActive = false;
      s.isLoggedOut = true;
      s.terminatedAt = new Date().toISOString();
      s.terminationReason = reason;
      count++;
    }
  }
  return count;
}

/**
 * Build enterprise-grade secure HttpOnly session cookie
 */
function buildStudentSessionCookie(rawToken, maxAge = 1800) {
  const isProd = process.env.NODE_ENV === "production";
  const secureFlag = isProd ? "; Secure" : "";
  // SameSite=Lax for CSRF mitigation
  return `abss_student_session=${encodeURIComponent(rawToken)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secureFlag}`;
}

/**
 * Build clear cookie string for logout
 */
function buildStudentLogoutCookie() {
  const isProd = process.env.NODE_ENV === "production";
  const secureFlag = isProd ? "; Secure" : "";
  return `abss_student_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax${secureFlag}`;
}

module.exports = {
  createStudentSession,
  validateAndTouchSession,
  invalidateSession,
  invalidateAllStudentSessions,
  buildStudentSessionCookie,
  buildStudentLogoutCookie,
  hashSessionToken,
};
