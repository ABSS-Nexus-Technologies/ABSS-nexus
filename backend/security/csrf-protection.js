const crypto = require("crypto");
const { generateCsrfToken } = require("./crypto-vault");

/**
 * ABSS Nexus Enterprise CSRF Protection Engine
 * OWASP Top 10 Compliant Double-Submit Cookie Pattern
 * - 256-bit cryptographically secure tokens
 * - Timing-safe equality comparison
 * - Lax SameSite cookies with production Secure flag
 */

function parseCookies(request) {
  const list = {};
  const rc = request?.headers?.cookie;
  if (!rc) return list;
  rc.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    const name = parts.shift().trim();
    const val = parts.join("=").trim();
    if (name) {
      list[name] = decodeURIComponent(val);
    }
  });
  return list;
}

/**
 * Build CSRF token cookie for the browser
 * NOTE: Non-HttpOnly by design to allow client scripts to read and attach to X-CSRF-Token headers
 */
function buildCsrfCookie(csrfToken) {
  const isProd = process.env.NODE_ENV === "production";
  const secureFlag = isProd ? "; Secure" : "";
  return `abss_csrf=${encodeURIComponent(csrfToken)}; Path=/; SameSite=Lax; Max-Age=86400${secureFlag}`;
}

/**
 * Verify CSRF token from request header/body against cookie
 */
function verifyCsrfToken(request, body = null) {
  const cookies = parseCookies(request);
  const cookieToken = cookies.abss_csrf;

  const headerToken =
    request?.headers?.["x-csrf-token"] ||
    request?.headers?.["x-xsrf-token"] ||
    body?.csrfToken ||
    body?._csrf;

  if (!cookieToken || !headerToken) {
    return {
      valid: false,
      error: "Missing CSRF verification token. Please ensure X-CSRF-Token header or csrfToken field is provided.",
    };
  }

  const cookieBuf = Buffer.from(String(cookieToken), "utf8");
  const headerBuf = Buffer.from(String(headerToken), "utf8");

  if (cookieBuf.length !== headerBuf.length || !crypto.timingSafeEqual(cookieBuf, headerBuf)) {
    return {
      valid: false,
      error: "CSRF token validation failed. Possible Cross-Site Request Forgery attempt detected.",
    };
  }

  return { valid: true };
}

module.exports = {
  generateCsrfToken,
  buildCsrfCookie,
  verifyCsrfToken,
};
