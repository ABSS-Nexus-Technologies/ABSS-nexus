const crypto = require("crypto");
const { verifyPasswordHardened } = require("./crypto-vault");

/**
 * ABSS Nexus Enterprise Password Policy Engine
 * - 12+ Character Minimum Length
 * - Strict Complexity (Upper, Lower, Number, Special)
 * - Sequence & Keyboard Pattern Blocking
 * - Identity Collision Protection (Email / Name matching)
 * - Last 5 Passwords History Checking
 * - 90-Day Password Expiry Enforcement
 * - Common Leaked Password Screening
 */

// Common breached and dictionary passwords
const LEAKED_PASSWORDS_SET = new Set([
  "password123456", "admin12345678", "qwerty123456", "welcome123456",
  "iloveyou12345", "123456789012", "changeme12345", "passcode12345",
  "abssnexus1234", "abss202612345", "monkey1234567", "dragon1234567"
]);

const SEQUENTIAL_PATTERNS = [
  "012", "123", "234", "345", "456", "567", "678", "789", "890",
  "987", "876", "765", "654", "543", "432", "321", "210",
  "qwerty", "asdfgh", "zxcvbn", "abcdef", "fedcba"
];

/**
 * Validate password against 12-point policy and calculate strength score (0-4)
 */
function evaluatePasswordPolicy(password, userContext = {}) {
  const pwd = String(password || "");
  const errors = [];

  // 1. Length Check (12+ characters)
  if (pwd.length < 12) {
    errors.push("Password must be at least 12 characters in length.");
  }

  // 2. Character Categories
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

  if (!hasUpper) errors.push("Password must include at least one UPPERCASE letter (A-Z).");
  if (!hasLower) errors.push("Password must include at least one lowercase letter (a-z).");
  if (!hasNumber) errors.push("Password must include at least one number (0-9).");
  if (!hasSpecial) errors.push("Password must include at least one special character (!@#$%^&*).");

  // 3. Sequential / Keyboard Patterns
  const lowerPwd = pwd.toLowerCase();
  for (const seq of SEQUENTIAL_PATTERNS) {
    if (lowerPwd.includes(seq)) {
      errors.push(`Password cannot contain obvious sequential or keyboard patterns ("${seq}").`);
      break;
    }
  }

  // 4. Identity collision check (cannot contain email username or student name)
  if (userContext.email) {
    const emailPrefix = userContext.email.split("@")[0].toLowerCase();
    const emailParts = emailPrefix.split(/[._\-+]/).filter((p) => p.length >= 3);
    emailParts.push(emailPrefix);
    for (const part of emailParts) {
      if (lowerPwd.includes(part)) {
        errors.push("Password cannot contain parts of your email address.");
        break;
      }
    }
  }
  if (userContext.name) {
    const nameParts = userContext.name.toLowerCase().split(/\s+/);
    for (const part of nameParts) {
      if (part.length >= 3 && lowerPwd.includes(part)) {
        errors.push("Password cannot contain parts of your name.");
        break;
      }
    }
  }

  // 5. Compromised password check
  if (LEAKED_PASSWORDS_SET.has(lowerPwd)) {
    errors.push("This password has appeared in public security data breaches. Please choose a unique passphrase.");
  }

  // Calculate Strength Score (0 to 4)
  let score = 0;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (hasUpper && hasLower && hasNumber && hasSpecial) score++;
  if (errors.length === 0 && pwd.length >= 14) score++;
  score = Math.min(4, Math.max(0, score));

  let strength = "weak";
  if (score >= 4) strength = "strong";
  else if (score >= 3) strength = "fair";

  return {
    isValid: errors.length === 0,
    errors,
    score,
    strength,
    isAllowed: errors.length === 0 && (strength === "fair" || strength === "strong"),
  };
}

/**
 * Check if the new password has been used in the student's last 5 passwords
 */
function checkPasswordHistory(newPassword, student) {
  if (!student || !student.passwordHistory || !Array.isArray(student.passwordHistory)) {
    return { isReused: false };
  }

  // Check current password as well
  if (student.passwordHash && verifyPasswordHardened(newPassword, student.passwordHash)) {
    return {
      isReused: true,
      error: "You cannot reuse your current active password. Please choose a new password."
    };
  }

  // Check up to the last 5 historical passwords
  const recentHistory = student.passwordHistory.slice(-5);
  for (const hist of recentHistory) {
    if (hist.hash && verifyPasswordHardened(newPassword, hist.hash)) {
      return {
        isReused: true,
        error: "For your security, you cannot reuse any of your last 5 previous passwords."
      };
    }
  }

  return { isReused: false };
}

/**
 * Calculate 90-day password expiration timestamp
 */
function getPasswordExpiryDate() {
  return new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
}

/**
 * Check if student's password has expired (90 days)
 */
function isPasswordExpired(student) {
  if (!student || !student.passwordExpiresAt) return false;
  return Date.now() > new Date(student.passwordExpiresAt).getTime();
}

/**
 * Calculate remaining days until password expiry
 */
function calculateDaysUntilExpiry(student) {
  if (!student || !student.passwordExpiresAt) return null;
  const diffMs = new Date(student.passwordExpiresAt).getTime() - Date.now();
  return Math.ceil(diffMs / (24 * 60 * 60 * 1000));
}

/**
 * Check if password will expire within the given threshold days (default: 7 days)
 */
function isPasswordExpiringSoon(student, thresholdDays = 7) {
  if (!student || !student.passwordExpiresAt) return false;
  const days = calculateDaysUntilExpiry(student);
  return days !== null && days <= thresholdDays && days > 0;
}

/**
 * HaveIBeenPwned API (k-Anonymity model)
 * Computes SHA-1 hash of the password, queries api.pwnedpasswords.com/range/{5-char-prefix}
 * Never reveals full password hash over the wire.
 */
async function checkHaveIBeenPwned(password) {
  if (!password || typeof password !== "string") return { isPwned: false, count: 0 };

  const lowerPwd = password.toLowerCase();
  if (LEAKED_PASSWORDS_SET.has(lowerPwd)) {
    return { isPwned: true, count: 1000, source: "local_breach_cache" };
  }

  try {
    const sha1 = crypto.createHash("sha1").update(password, "utf8").digest("hex").toUpperCase();
    const prefix = sha1.slice(0, 5);
    const suffix = sha1.slice(5);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { "User-Agent": "ABSS-Nexus-Security-Hardening" },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return { isPwned: false, count: 0 };

    const body = await res.text();
    const lines = body.split("\r\n");
    for (const line of lines) {
      const [hashSuffix, countStr] = line.split(":");
      if (hashSuffix && hashSuffix.trim() === suffix) {
        const count = parseInt(countStr, 10) || 1;
        return { isPwned: true, count, source: "haveibeenpwned" };
      }
    }
    return { isPwned: false, count: 0 };
  } catch (err) {
    return { isPwned: false, count: 0, offline: true };
  }
}

/**
 * Async password policy evaluation including HaveIBeenPwned breach verification
 */
async function evaluatePasswordPolicyAsync(password, userContext = {}) {
  const syncResult = evaluatePasswordPolicy(password, userContext);
  const pwned = await checkHaveIBeenPwned(password);

  if (pwned.isPwned) {
    syncResult.errors.push(`This password has appeared in public security data breaches (${pwned.count.toLocaleString()} occurrences). Please choose a unique passphrase.`);
    syncResult.isValid = false;
    syncResult.isAllowed = false;
    syncResult.isPwned = true;
    syncResult.breachCount = pwned.count;
  } else {
    syncResult.isPwned = false;
    syncResult.breachCount = 0;
  }

  return syncResult;
}

module.exports = {
  evaluatePasswordPolicy,
  evaluatePasswordPolicyAsync,
  checkHaveIBeenPwned,
  checkPasswordHistory,
  getPasswordExpiryDate,
  isPasswordExpired,
  isPasswordExpiringSoon,
  calculateDaysUntilExpiry,
};

