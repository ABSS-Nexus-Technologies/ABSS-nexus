const crypto = require("crypto");

/**
 * ABSS Nexus Crypto Vault
 * - AES-256-GCM Authenticated Encryption for OTPs and sensitive data
 * - Hardened Password Hashing (1,000,000 PBKDF2 iterations, 32-byte salt, timing-safe equality)
 * - Device Fingerprint Generation
 */

// Derive or load master 32-byte encryption key from environment
function getMasterEncryptionKey() {
  const envKey = process.env.OTP_ENCRYPTION_KEY || process.env.AUTH_SECRET || "abss-nexus-default-256-bit-key-2026-production";
  return crypto.createHash("sha256").update(envKey).digest(); // Exactly 32 bytes for AES-256
}

/**
 * Encrypt sensitive text (such as OTP codes or tokens) with AES-256-GCM
 * Returns { ciphertextHex, ivHex, tagHex }
 */
function encryptAes256Gcm(plaintext) {
  const key = getMasterEncryptionKey();
  const iv = crypto.randomBytes(12); // 96-bit IV recommended for GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(String(plaintext), "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: encrypted,
    iv: iv.toString("hex"),
    tag: authTag.toString("hex"),
  };
}

/**
 * Decrypt AES-256-GCM encrypted payload
 */
function decryptAes256Gcm(ciphertextHex, ivHex, tagHex) {
  try {
    const key = getMasterEncryptionKey();
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(tagHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertextHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (err) {
    return null;
  }
}

/**
 * Hardened Password Hashing
 * 1,000,000 iterations of PBKDF2-HMAC-SHA512 with 32-byte cryptographic salt
 */
function hashPasswordHardened(password, existingSalt = null) {
  const salt = existingSalt || crypto.randomBytes(32).toString("hex");
  const iterations = 1000000; // 1 Million Iterations (OWASP recommended for PBKDF2)
  const keylen = 64;
  const digest = "sha512";

  const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
  return {
    salt,
    iterations,
    hash: `pbkdf2$v2$${iterations}$${salt}$${derivedKey.toString("hex")}`,
  };
}

/**
 * Timing-safe password verification supporting both hardened v2 (1M iterations) and legacy v1 (100k)
 */
function verifyPasswordHardened(password, storedHash) {
  if (!storedHash || typeof storedHash !== "string") return false;

  const parts = storedHash.split("$");

  // Hardened v2 format: pbkdf2$v2$iterations$salt$hash
  if (parts.length === 5 && parts[0] === "pbkdf2" && parts[1] === "v2") {
    const iterations = parseInt(parts[2], 10);
    const salt = parts[3];
    const originalHash = parts[4];
    const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");

    const a = Buffer.from(derivedKey, "utf8");
    const b = Buffer.from(originalHash, "utf8");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }

  // Legacy format: pbkdf2$salt$hash (100k iterations)
  if (parts.length === 3 && parts[0] === "pbkdf2") {
    const salt = parts[1];
    const originalHash = parts[2];
    const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha256").toString("hex");

    const a = Buffer.from(derivedKey, "utf8");
    const b = Buffer.from(originalHash, "utf8");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }

  return false;
}

/**
 * Generate unique SHA-256 device fingerprint
 */
function createDeviceFingerprint(request) {
  const userAgent = request?.headers?.["user-agent"] || "unknown_device";
  const acceptLang = request?.headers?.["accept-language"] || "";
  const ip = request?.headers?.["x-forwarded-for"] || request?.socket?.remoteAddress || "127.0.0.1";
  const rawFingerprint = `${userAgent}|${acceptLang}|${String(ip).split(",")[0].trim()}`;
  return crypto.createHash("sha256").update(rawFingerprint).digest("hex");
}

/**
 * Generate 256-bit cryptographically secure CSRF token
 */
function generateCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * SHA-256 hash helper for tokens stored at rest
 */
function hashToken(token) {
  return crypto.createHash("sha256").update(String(token || "")).digest("hex");
}

/**
 * Generate 256-bit one-time password reset token valid for 1 hour
 */
function generatePasswordResetToken() {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour validity
  return {
    rawToken,
    hashedToken,
    expiresAt,
  };
}

module.exports = {
  encryptAes256Gcm,
  decryptAes256Gcm,
  hashPasswordHardened,
  verifyPasswordHardened,
  createDeviceFingerprint,
  generateCsrfToken,
  hashToken,
  generatePasswordResetToken,
};

