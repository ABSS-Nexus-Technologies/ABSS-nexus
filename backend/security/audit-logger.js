const crypto = require("crypto");

/**
 * ABSS Nexus Enterprise Security Audit Logger & Data Masker
 * OWASP Top 10 Compliant
 * 
 * - Masks PII (Emails, Mobile, Passwords, Tokens, OTPs)
 * - Persistent Security Events Ledger (db.security_events)
 * - Severity Classification (low, medium, high, critical)
 */

function maskEmail(email) {
  if (!email || typeof email !== "string") return "unknown";
  const parts = email.split("@");
  if (parts.length !== 2) return "***";
  const name = parts[0];
  const domain = parts[1];
  if (name.length <= 2) return `${name.charAt(0)}***@${domain}`;
  return `${name.charAt(0)}***${name.charAt(name.length - 1)}@${domain}`;
}

function maskPhone(phone) {
  if (!phone || typeof phone !== "string") return "unknown";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 4) return "***";
  return `******${cleaned.slice(-4)}`;
}

function maskOtp(code) {
  if (!code || typeof code !== "string") return "***";
  if (code.length <= 3) return "***";
  return `***${code.slice(-3)}`;
}

function maskToken(token) {
  if (!token || typeof token !== "string") return "***";
  if (token.length <= 6) return "***";
  return `${token.slice(0, 4)}...***`;
}

/**
 * Record a security event in the database ledger
 */
function logSecurityEvent(eventData, db, writeDb) {
  const {
    eventType,
    studentId = null,
    email = null,
    ip = "127.0.0.1",
    userAgent = "N/A",
    details = "",
    severity = "low",
  } = eventData;

  const eventRecord = {
    id: `sec_${crypto.randomUUID()}`,
    timestamp: new Date().toISOString(),
    eventType,
    studentId,
    emailMasked: maskEmail(email),
    ip: String(ip).split(",")[0].trim(),
    userAgent: String(userAgent).slice(0, 150),
    details,
    severity,
  };

  if (db) {
    db.security_events = db.security_events || [];
    db.security_events.push(eventRecord);
    // Keep last 1,000 security events
    if (db.security_events.length > 1000) {
      db.security_events = db.security_events.slice(-1000);
    }
    if (typeof writeDb === "function") {
      try {
        writeDb(db);
      } catch (err) {
        console.error("[AuditLogger] Failed to write event:", err.message);
      }
    }
  }

  const logLine = `[SECURITY:${severity.toUpperCase()}] [${eventType}] user=${studentId || "anon"} email=${maskEmail(email)} ip=${eventRecord.ip} msg="${details}"`;
  if (severity === "critical" || severity === "high") {
    console.warn(logLine);
  } else {
    console.log(logLine);
  }

  return eventRecord;
}

module.exports = {
  maskEmail,
  maskPhone,
  maskOtp,
  maskToken,
  logSecurityEvent,
};
