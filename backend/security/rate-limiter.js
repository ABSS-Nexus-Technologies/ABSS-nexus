/**
 * ABSS Nexus Enterprise Sliding-Window Rate Limiter & Brute-Force Shield
 * OWASP Top 10 Compliant
 * 
 * Tracks sliding window request timestamps per key.
 * Provides account lockout mechanism for repeated failed attempts.
 */

// In-memory sliding-window store: key -> array of unix epoch timestamps (ms)
const slidingWindowStore = new Map();

// Account lockout store: emailOrId -> { failedCount, lockedUntil, lastFailedAt }
const lockoutStore = new Map();

/**
 * Sliding window rate limit checker
 * @param {string} key - Unique rate limit identifier (e.g., "ratelimit:login:user@example.com")
 * @param {number} maxHits - Maximum permitted requests in window
 * @param {number} windowMs - Window duration in milliseconds
 * @returns {{ allowed: boolean, limit: number, remaining: number, reset: number, retryAfter: number }}
 */
function checkSlidingRateLimit(key, maxHits = 10, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  let timestamps = slidingWindowStore.get(key) || [];
  // Filter out timestamps outside the active sliding window
  timestamps = timestamps.filter((t) => t > windowStart);

  if (timestamps.length >= maxHits) {
    const oldestTimestamp = timestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1000));
    const resetEpochSeconds = Math.ceil((oldestTimestamp + windowMs) / 1000);

    slidingWindowStore.set(key, timestamps);
    return {
      allowed: false,
      limit: maxHits,
      remaining: 0,
      reset: resetEpochSeconds,
      retryAfter: retryAfterSeconds,
    };
  }

  // Record this attempt
  timestamps.push(now);
  slidingWindowStore.set(key, timestamps);

  const resetEpochSeconds = Math.ceil((now + windowMs) / 1000);
  return {
    allowed: true,
    limit: maxHits,
    remaining: maxHits - timestamps.length,
    reset: resetEpochSeconds,
    retryAfter: 0,
  };
}

/**
 * Account Lockout Shield
 * 5 failed login/OTP attempts within 15 minutes -> 30-minute lockout
 */
function recordFailedAttempt(identifier, maxAttempts = 5, lockDurationMs = 30 * 60 * 1000) {
  const key = String(identifier || "").toLowerCase().trim();
  const now = Date.now();
  const record = lockoutStore.get(key) || { failedCount: 0, lockedUntil: null, lastFailedAt: null };

  // If already locked and lock hasn't expired
  if (record.lockedUntil && now < record.lockedUntil) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return {
      isLocked: true,
      remainingSeconds,
      lockedUntil: new Date(record.lockedUntil).toISOString(),
    };
  }

  // Increment failure count
  record.failedCount = (record.failedCount || 0) + 1;
  record.lastFailedAt = new Date(now).toISOString();

  if (record.failedCount >= maxAttempts) {
    record.lockedUntil = now + lockDurationMs;
    lockoutStore.set(key, record);
    const remainingSeconds = Math.ceil(lockDurationMs / 1000);
    return {
      isLocked: true,
      newlyLocked: true,
      remainingSeconds,
      lockedUntil: new Date(record.lockedUntil).toISOString(),
    };
  }

  lockoutStore.set(key, record);
  return {
    isLocked: false,
    failedCount: record.failedCount,
    attemptsRemaining: Math.max(0, maxAttempts - record.failedCount),
  };
}

/**
 * Check if account/identifier is currently locked out
 */
function isAccountLocked(identifier) {
  const key = String(identifier || "").toLowerCase().trim();
  const now = Date.now();
  const record = lockoutStore.get(key);
  if (!record || !record.lockedUntil) {
    return { isLocked: false };
  }

  if (now >= record.lockedUntil) {
    // Lock has expired; automatically unlock
    record.lockedUntil = null;
    record.failedCount = 0;
    lockoutStore.set(key, record);
    return { isLocked: false };
  }

  const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
  return {
    isLocked: true,
    remainingSeconds,
    lockedUntil: new Date(record.lockedUntil).toISOString(),
  };
}

/**
 * Reset failed attempts on successful authentication
 */
function resetFailedAttempts(identifier) {
  const key = String(identifier || "").toLowerCase().trim();
  lockoutStore.delete(key);
}

// Garbage collection every 10 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  for (const [key, timestamps] of slidingWindowStore.entries()) {
    const valid = timestamps.filter((t) => t > oneHourAgo);
    if (valid.length === 0) {
      slidingWindowStore.delete(key);
    } else {
      slidingWindowStore.set(key, valid);
    }
  }

  for (const [key, record] of lockoutStore.entries()) {
    if (record.lockedUntil && now > record.lockedUntil) {
      lockoutStore.delete(key);
    }
  }
}, 10 * 60 * 1000).unref();

module.exports = {
  checkSlidingRateLimit,
  recordFailedAttempt,
  isAccountLocked,
  resetFailedAttempts,
};
