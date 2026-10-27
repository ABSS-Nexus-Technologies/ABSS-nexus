const { evaluatePasswordPolicy } = require("./password-policy");

/**
 * ABSS Nexus Enterprise Input Validation & Sanitization Engine
 * OWASP Top 10 Compliant
 * 
 * - RFC 5322 Email Validation & Disposable Domain Shield
 * - Indian Mobile Number Normalizer & Strict Validator
 * - Anti-XSS Sanitization & HTML Tag Stripper
 * - Task Submission Answer Validator (50 - 5000 chars)
 * - GitHub Repository URL Validator
 * - Strict Financial & Track Parameters Enforcement
 */

// Disposable and throwaway email domains
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "tempmail.com", "mailinator.com", "guerrillamail.com", "10minutemail.com",
  "throwawaymail.com", "temp-mail.org", "yopmail.com", "sharklasers.com",
  "guerrillamailblock.com", "dispostable.com", "trashmail.com", "getairmail.com",
  "fakemailgenerator.com", "nada.ltd", "burnermail.io", "maildrop.cc"
]);

// Reserved system usernames and handles
const RESERVED_NAMES = new Set([
  "admin", "administrator", "root", "system", "superuser",
  "support", "test", "demo", "null", "undefined", "abssnexus"
]);

const RFC5322_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Sanitize text input: strip script tags, dangerous HTML, and event handlers
 */
function sanitizeInput(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

/**
 * Validate and normalize email address
 */
function validateEmail(email) {
  if (!email || typeof email !== "string") {
    return { isValid: false, error: "Email address is required." };
  }

  const normalized = email.trim().toLowerCase();
  if (normalized.length < 5 || normalized.length > 254) {
    return { isValid: false, error: "Email address must be between 5 and 254 characters." };
  }

  if (!RFC5322_EMAIL_REGEX.test(normalized)) {
    return { isValid: false, error: "Please enter a valid RFC-compliant email address." };
  }

  const domain = normalized.split("@")[1];
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { isValid: false, error: "Disposable and temporary email addresses are not allowed." };
  }

  return { isValid: true, email: normalized };
}

/**
 * Validate and normalize Indian phone numbers (10 digits starting with 6, 7, 8, or 9)
 */
function validatePhone(phone) {
  if (!phone || typeof phone !== "string") {
    return { isValid: false, error: "Mobile number is required." };
  }

  // Strip country codes (+91, 0), spaces, hyphens, and brackets
  let cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }

  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return {
      isValid: false,
      error: "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
    };
  }

  return { isValid: true, phone: cleaned };
}

/**
 * Validate full name
 */
function validateName(name) {
  if (!name || typeof name !== "string") {
    return { isValid: false, error: "Full name is required." };
  }

  const sanitized = sanitizeInput(name);
  if (sanitized.length < 2 || sanitized.length > 100) {
    return { isValid: false, error: "Name must be between 2 and 100 characters in length." };
  }

  // Must only contain letters, numbers, spaces, dots, hyphens, and apostrophes
  if (!/^[a-zA-Z0-9\s.\-']+$/.test(sanitized)) {
    return { isValid: false, error: "Name contains invalid characters or emojis." };
  }

  const lower = sanitized.toLowerCase();
  if (RESERVED_NAMES.has(lower)) {
    return { isValid: false, error: "This name is reserved by the system." };
  }

  return { isValid: true, name: sanitized };
}

/**
 * Validate student task submission text answer
 * Min 50 characters, max 5000 characters, no malicious tags
 */
function validateTaskSubmissionText(text) {
  if (!text || typeof text !== "string") {
    return { isValid: false, error: "Task submission explanation is required." };
  }

  const sanitized = sanitizeInput(text);
  if (sanitized.length < 50) {
    return {
      isValid: false,
      error: `Submission explanation is too brief (${sanitized.length} characters). Minimum 50 characters required to describe your work.`,
    };
  }

  if (sanitized.length > 5000) {
    return {
      isValid: false,
      error: "Submission explanation exceeds maximum length of 5,000 characters.",
    };
  }

  return { isValid: true, textAnswer: sanitized };
}

/**
 * Validate GitHub repository link
 */
function validateGitHubUrl(url) {
  if (!url) return { isValid: true, url: "" }; // Optional
  if (typeof url !== "string") return { isValid: false, error: "Invalid URL format." };

  const trimmed = url.trim();
  const githubRegex = /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
  if (!githubRegex.test(trimmed)) {
    return {
      isValid: false,
      error: "GitHub link must be a valid public repository URL (e.g. https://github.com/username/repository).",
    };
  }

  return { isValid: true, url: trimmed };
}

/**
 * Validate teacher review feedback
 */
function validateTeacherFeedback(feedback, isRejecting = false) {
  const sanitized = sanitizeInput(feedback || "");
  if (isRejecting && sanitized.length < 10) {
    return {
      isValid: false,
      error: "Constructive feedback of at least 10 characters is mandatory when rejecting a submission.",
    };
  }
  if (sanitized.length > 1000) {
    return { isValid: false, error: "Feedback exceeds maximum 1,000 characters." };
  }
  return { isValid: true, feedback: sanitized };
}

/**
 * Validate financial enrollment amount
 */
function validateEnrollmentAmount(amount, duration) {
  const num = Number(amount);
  if (duration === "low" && num !== 119) {
    return { isValid: false, error: "Invalid amount for 4-week internship. Expected ₹119." };
  }
  if (duration === "high" && num !== 249) {
    return { isValid: false, error: "Invalid amount for 8-week internship. Expected ₹249." };
  }
  return { isValid: true, amount: num };
}

module.exports = {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateName,
  validateTaskSubmissionText,
  validateGitHubUrl,
  validateTeacherFeedback,
  validateEnrollmentAmount,
  evaluatePasswordPolicy,
};
