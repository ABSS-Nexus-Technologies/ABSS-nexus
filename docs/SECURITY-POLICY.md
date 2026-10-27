# ABSS Nexus Technologies — Enterprise Security Policy & Architecture

**Document Version:** 2.0.0  
**Classification:** Enterprise Operational Standard / Production Hardening  
**Target:** OWASP Top 10 (2021) Compliance, Student Management Security, and Data Protection  
**Last Updated:** October 2026  

---

## 1. Executive Summary

This document establishes the official security architecture, technical controls, and operational runbook for the ABSS Nexus platform (`abssnexus.in`), covering student management, internships, authentication, communications, payment gateways, and backend administrative operations.

---

## 2. 12-Point OWASP Top 10 Implementation Matrix

| Point | Area | Classification | Safeguards & Technical Implementations |
|---|---|---|---|
| **1** | **Password Policy** | 🔴 CRITICAL | 12+ chars, 4 character classes, sequential/keyboard block, identity collision block, 1,000,000 PBKDF2-HMAC-SHA512 iterations with 32-byte salt, history check (reject last 5), 90-day expiry. |
| **2** | **OTP Security** | 🔴 CRITICAL | 6-digit numeric crypto randomness, authenticated AES-256-GCM encryption at rest, 5-minute TTL, 3 requests/hr per email, max 5 verify attempts per code. |
| **3** | **Session Security** | 🔴 CRITICAL | 30-minute idle sliding timeout, 8-hour absolute maximum lifetime ceiling, max 2 concurrent sessions per student (oldest revoked), 256-bit cryptographically random tokens stored hashed (SHA-256). |
| **4** | **Rate Limiting** | 🔴 CRITICAL | Sliding window counter across all API endpoints: login (5/15m), registration (10/hr/IP), OTP (3/hr/email), tasks (10/hr/student), track change (1/24h), global API (100/5m auth, 60/5m unauth). HTTP 429 with `Retry-After`. |
| **5** | **Input Validation** | 🟠 HIGH | RFC 5322 email with disposable domain blocklist, Indian mobile 10-digit regex (`[6-9]\d{9}`), task text minimum 50 chars with HTML/script sanitization, GitHub repository URL validation. |
| **6** | **Account Security** | 🟠 HIGH | 5 failed login attempts in 15 mins triggers 30-minute account lockout, suspicious login detection via SHA-256 device fingerprinting (`User-Agent + Accept-Language + IP`), pre-expiry warning alerts. |
| **7** | **Data Protection** | 🟠 HIGH | AES-256-GCM encryption for all OTP codes and sensitive payloads, PBKDF2 v2 1M iterations, zero plaintext secrets in application logs, PII masking (`s***m@example.com`, `******1234`). |
| **8** | **API Security** | 🟠 HIGH | Double-submit CSRF cookie pattern (`abss_csrf` + `X-CSRF-Token`), CORS whitelist restricted to `abssnexus.in` and approved origins, HTTP method restrictions (no `TRACE` / `CONNECT`). |
| **9** | **Cookie Security** | 🟢 LOW | Flags enforced: `HttpOnly; SameSite=Lax; Path=/; Max-Age=1800; Secure` in production, zero JavaScript access to authentication credentials. |
| **10** | **HTTP Headers** | 🟢 LOW | HSTS (`max-age=31536000; includeSubDomains; preload`), CSP (`default-src 'self'`), `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`. |
| **11** | **Audit & Monitoring**| 🟡 MEDIUM | Classified security ledger (`db.security_events`) tracking low/medium/high/critical events, masked audit log retention, real-time alert dispatching. |
| **12** | **Compliance** | 🟡 MEDIUM | OWASP Top 10 (2021) compliance mapping, GDPR privacy standards (right to erasure, purpose limitation), PCI DSS scope minimization via Razorpay hosted checkout. |

---

## 3. Cryptographic Standards

### 3.1 Password Storage
- **Algorithm:** PBKDF2-HMAC-SHA512 (hardened v2)
- **Iterations:** 1,000,000 iterations (OWASP recommended standard)
- **Salt:** 32 bytes (256-bit) cryptographically random salt generated via `crypto.randomBytes(32)`
- **Format:** `pbkdf2$v2$1000000$<salt>$<hash>`
- **Timing Defense:** Verification uses `crypto.timingSafeEqual()` to guarantee constant-time verification and prevent timing attacks.

### 3.2 OTP Codes and Secret Data at Rest
- **Algorithm:** AES-256-GCM (Authenticated Galois/Counter Mode)
- **Key Derivation:** SHA-256 derivation from high-entropy master secret (`OTP_ENCRYPTION_KEY` or `AUTH_SECRET`)
- **Initialization Vector:** 96-bit (12 bytes) fresh random IV per encryption
- **Integrity Tag:** 128-bit (16 bytes) authentication tag verified prior to decryption
- **At Rest Storage:** Stored as `{ codeEncrypted, iv, tag }` in JSON database ledger.

### 3.3 Session Tokens & CSRF Tokens
- **Entropy:** 256 bits of cryptographic randomness (`crypto.randomBytes(32)`)
- **Session Tokens at Rest:** Hashed via SHA-256 before storage in `db.studentSessions`. Plaintext raw token is only held by the student in an `HttpOnly` cookie.
- **CSRF Tokens:** Non-HttpOnly double-submit cookie `abss_csrf` verified against request header `X-CSRF-Token` using constant-time comparison.

---

## 4. Session & Inactivity Management

### 4.1 Lifecycle Parameters
- **Idle Expiration:** 30 minutes (1,800 seconds). Each authenticated HTTP request automatically extends the idle timer by 30 minutes.
- **Absolute Lifetime Ceiling:** 8 hours (28,800 seconds). Once reached, the session is invalidated regardless of activity.
- **Concurrent Session Limit:** Maximum 2 active sessions per student account. When a third login occurs, the oldest active session is automatically revoked with reason `concurrent_session_limit`.
- **Immediate Revocation Triggers:**
  1. Student clicks "Log Out" (revokes specific session and clears cookies).
  2. Student updates or resets password (revokes all active sessions for that student).
  3. Student account lockout (revokes active sessions).
  4. Explicit API session revocation via `DELETE /api/auth/sessions/:sessionId` or `POST /api/auth/logout-all`.

### 4.2 Client-Side Session Experience
- **Inactivity Warning:** At 25 minutes of inactivity (5 minutes before timeout), a modal popup prompts the student: *"Your session will expire in 5 minutes. Click Stay Logged In to continue."*
- **Cross-Tab Synchronization:** When logout occurs in any browser window, a `storage` event broadcast automatically invalidates all other open tabs and redirects to the login screen.

---

## 5. Rate Limiting & Account Lockout Defense

### 5.1 Sliding Window Counter
All rate limiters enforce exact sliding timestamps (not fixed windows) to prevent burst attacks at window boundaries.

| Endpoint / Operation | Window | Limit | Consequence |
|---|---|---|---|
| Student Login (`/api/internships/auth/login`) | 15 Minutes | 5 failed attempts | 30-Minute Account Lockout & HTTP 429 |
| Student Registration (`/api/internships/register`) | 1 Hour | 10 per IP | HTTP 429 with `Retry-After` |
| OTP Request / Resend (`/api/otp/request`) | 1 Hour | 3 requests per email | HTTP 429 with `Retry-After` |
| OTP Verification Attempts | Per OTP Code | 5 failed attempts | OTP Invalidation & 30-min Account Lockout |
| Task Solution Submissions | 1 Hour | 10 per student | HTTP 429 |
| Track Change Requests | 24 Hours | 1 per student | HTTP 429 |
| Public Contact / Leads | 1 Hour | 3 per IP | HTTP 429 |
| Authenticated API Gateway | 5 Minutes | 100 requests per IP | HTTP 429 |
| Unauthenticated API Gateway | 5 Minutes | 60 requests per IP | HTTP 429 |

---

## 6. Incident Response & Threat Runbook

### 6.1 Incident Classification
- **Low:** Single failed login attempt, password change event, task submission rate limit reached.
- **Medium:** Suspicious new device login, 3 consecutive failed logins, expired password login attempt.
- **High:** Account lockout triggered (5 failed attempts), CSRF token mismatch, disposable email registration flood.
- **Critical:** Cryptographic decryption failure (tampered data), brute force on OTP codes, admin privilege escalation attempt.

### 6.2 Incident Handling Procedures
1. **Detection & Triage:** Security events are written to `db.security_events` with classifications. Automated alerts are dispatched for High and Critical events.
2. **Containment:**
   - For compromised accounts: Execute `POST /api/auth/logout-all` and lock the student record (`accountLockedUntil`).
   - For malicious IP addresses: The sliding rate limiter blocks the IP for 30–60 minutes automatically; Cloudflare WAF IP ban can be enacted for distributed threats.
3. **Eradication:** Revoke active tokens in `db.studentTokens` and `db.studentSessions`.
4. **Recovery & Notification:** Force password reset with a 1-hour one-time cryptographic token. Notify student with details of the event.

---

## 7. Data Privacy & Compliance

- **GDPR Article 32 (Security of Processing):** Pseudonymization and encryption of personal data (masked audit logs, salted password hashes, AES-256 OTP storage).
- **PCI DSS Requirement 3 & 4:** Cardholder data is never received, processed, or stored on ABSS Nexus infrastructure. Payments are processed client-side via Razorpay's PCI-DSS Level 1 certified checkout modal.
- **Zero-Logging Policy:** Plaintext passwords, unencrypted OTP codes, and payment keys are strictly prohibited from all application logs.
