# Engineering Standards & Guidelines (RULES.md)
## ABSS Nexus Technologies — Development & Architectural Rules

---

## 1. Core Engineering Philosophy

### Rule 1.1: Dependency-Free by Design
- **Vanilla Over Frameworks**: The core website runs on native HTML5, modern vanilla CSS, and standard ECMAScript. Do not introduce heavy frontend frameworks (React, Vue, Angular) or runtime UI libraries into public pages.
- **Node.js Native APIs**: Backend scripts and development servers must rely on native Node.js standard modules (`http`, `fs`, `path`, `crypto`). Avoid extraneous runtime npm packages.
- **Edge Native**: Production APIs must run inside Cloudflare Pages Functions using native Web Standards (`Request`, `Response`, `fetch`, `crypto.subtle`).

### Rule 1.2: Single Source of Truth for Global UI
- The canonical definitions of shared components reside **only** in `src/components/`:
  - `src/components/header.html`
  - `src/components/footer.html`
  - `src/components/floating-whatsapp.html`
- **NEVER** manually edit headers or footers across individual page files in `src/pages/`.
- Always execute `node scripts/sync-components.js` or `npm run build` to propagate changes across all 68+ pages automatically.

---

## 2. CSS & Styling Standards

### Rule 2.1: Design System & Token Integrity
- Always utilize established CSS custom properties from `:root`:
  ```css
  --color-white: #FFFFFF;
  --color-light-gray: #F5F5F7;
  --color-near-black: #1D1D1F;
  --color-blue: #0066CC;
  --color-border: #D2D2D7;
  --color-secondary-text: #6E6E73;
  --cyan: #00c2ff;
  --navy: #0d1b2a;
  ```
- **No Tailwind Classes**: Tailwind is not configured in this project. Use structured Vanilla CSS following modular BEM-like conventions.
- **Apple-Inspired Aesthetic**: Maintain clean typography (`Inter` for body, `Space Grotesk` for headlines), generous whitespace, refined borders, and subtle glassmorphic backdrops.

### Rule 2.2: Strict CSS Syntax & Brace Validation
- Before any build or commit, verify bracket balance using:
  ```bash
  node scripts/check-css-braces.js
  ```
- Never leave dangling braces or unclosed media queries in `src/styles/styles.css` or component stylesheets.

---

## 3. Motion & Animation Standards

### Rule 3.1: Hardware-Accelerated Compositing
- Animations and transitions must exclusively target `opacity` and `transform` (`translateY`, `scale`).
- **NEVER** animate geometry properties like `width`, `height`, `top`, `left`, `margin`, or `padding` during scroll reveals or hover states.

### Rule 3.2: Universal Decelerating Curves
- Use Apple's decelerating spring curve for smooth, premium physics:
  ```css
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  ```

### Rule 3.3: Mandatory Reduced Motion Compliance
- Every animation and transition must respect accessibility preferences:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 4. Security & Environment Standards

### Rule 4.1: Zero Committed Secrets
- `.env` files containing live credentials must **never** be checked into Git. Use `.env.example` as the schema template.
- Production secrets (`ADMIN_PASSWORD`, `AUTH_SECRET`, `RESEND_API_KEY`) must only be configured in the Cloudflare Pages Dashboard under **Settings > Environment Variables**.

### Rule 4.2: Fail-Closed Security Posture
- In production, administrative endpoints (`/api/admin/*`) must fail closed with HTTP 503 if secrets are unconfigured, empty, or using insecure default passwords (`abss2026`).
- Development fallbacks are only allowed when `NODE_ENV === 'development'` or running locally on `localhost`.

### Rule 4.3: Secure Cookie Flags
- Authentication tokens must be set with `HttpOnly; Secure; SameSite=Strict; Path=/`.
- Never expose session tokens in client-accessible `localStorage` or `document.cookie`.

### Rule 4.4: Mandatory Server-Side Validation
- Never trust client-side validation alone. All incoming authentication and registration payloads must be validated on the server/edge runtime:
  - Email addresses must strictly match RFC 5322 validation (`EMAIL_REGEX`), with length bounds (3-254 chars).
  - Passwords must be validated for minimum 8 characters and maximum 128 characters (to thwart ReDoS and CPU exhaustion).
  - Text fields (names, titles) must enforce bounded string lengths.

### Rule 4.5: Sliding-Window Login Rate Limiting
- All authentication endpoints (`/api/auth/login`, `/api/internships/auth/login`, `/api/internships/auth/register`, `/api/internships/auth/forgot-password`) must enforce sliding-window rate limiting keyed by client IP (`cf-connecting-ip` / `x-forwarded-for`).
- Exceeding rate limits must immediately return `HTTP 429 Too Many Requests` accompanied by a `Retry-After: 300` header.

### Rule 4.6: Cryptographic Password Encryption & Timing-Safe Hashing
- User passwords must never be stored in plain text or with weak algorithms (MD5, SHA1).
- Passwords must be hashed using PBKDF2 with 100,000 iterations (or scrypt), a unique 16-byte cryptographically secure random salt, and verified using constant-time comparison (`crypto.timingSafeEqual` / `constantTimeEqual`) to prevent timing side-channel attacks.

### Rule 4.7: Generic Error Responses (Zero User Enumeration)
- Never disclose whether an email or username exists in the system via authentication responses.
- Failed logins must uniformly return `HTTP 401 Unauthorized` with generic message: `"Invalid email or password."` or `"Invalid credentials"`.
- Password reset endpoints must always return `HTTP 200 OK` with generic feedback: `"If an account with that email exists, password reset instructions have been generated."`.

### Rule 4.8: Identity Provider Integration (Firebase Auth)
- Do not reinvent bespoke third-party OAuth/SSO systems. For cloud identity management, integrate standard Firebase Authentication (`src/scripts/firebase-auth.js` and `src/services/firebase-config.js`) supporting Google Sign-In and Email/Password with graceful fallback to hardened edge D1 auth.

---

## 5. Testing & Verification Gateways

### Rule 5.1: 100% Pass Required Before Deployment
Every pull request or release candidate must successfully pass all validation suites:
1. `npm run build`: Synchronizes components and compiles `dist/`.
2. `node scripts/check-css-braces.js`: Validates CSS syntax.
3. `node tests/test-security-admin-auth.js`: Verifies fail-closed admin security and secret hardening.
4. `node tests/test-security-five-points.js`: Verifies the 5 core security rules (validation, rate limiting, hashing, generic errors, Firebase auth).
5. `node tests/test-phase5-auth.js`: Verifies full student internship authentication and session lifecycle.
6. `node tests/test-header-hero-responsive.js`: Validates header, hero, and breakpoints.
7. `node tests/test-phase2-public-sections.js`: Validates public sections and content.
8. `node tests/test-all-68-pages.js`: Confirms all 114 endpoints respond with HTTP 200.
9. `./scripts/validate.sh`: Full 16-point integration test run.

---

## 6. Route & SEO Integrity

### Rule 6.1: Clean URLs & Canonical Tags
- Every public page must contain a valid canonical link tag pointing to `https://abssnexus.in/<route>`.
- Internal links must use clean extensionless paths (e.g., `/about`, `/services`, `/contact`). The `_redirects` engine handles `.html` mapping seamlessly.

### Rule 6.2: Complete Social & Structured Metadata
- Every page must feature:
  - Unique `<title>` tag adhering to the pattern: `Page Name | ABSS Nexus Technologies`.
  - Compelling `<meta name="description">` (< 160 characters).
  - OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`).
  - Twitter Card metadata (`summary_large_image`).
  - Structured JSON-LD schema (Organization, Service, or BreadcrumbList).
