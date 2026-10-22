# System Architecture Documentation (ARCHITECTURE.md)
## ABSS Nexus Technologies — Production Platform Architecture

---

## 1. High-Level Architecture Overview

ABSS Nexus Technologies employs a **Dual-Runtime Serverless & Edge Architecture** designed for high availability, zero maintenance overhead, and instantaneous response times.

```mermaid
graph TD
    Client[Web Browser / Mobile Client] -->|HTTPS| CloudflareEdge[Cloudflare Global Edge Network]
    
    subgraph Cloudflare Pages Infrastructure
        CloudflareEdge -->|Static Assets & Pre-rendered HTML| StaticStorage[Cloudflare Pages CDN /dist]
        CloudflareEdge -->|Dynamic /api/* Requests| EdgeFunctions[Cloudflare Pages Functions /functions/api]
        EdgeFunctions -->|Relational Queries| D1[(Cloudflare D1 SQL Database)]
        EdgeFunctions -->|Transactional Email| EmailService[Multi-Provider Gateway Resend / SendGrid]
        EdgeFunctions -.->|Fallback Key-Value| KV[(Cloudflare KV ABSS_ADMIN)]
    end

    subgraph Local Development Environment
        DevClient[Local Developer Browser] -->|HTTP :3000| LocalServer[Node.js Dependency-Free Server backend/server.js]
        LocalServer -->|File Read| LocalPages[src/pages/*.html & dist/]
        LocalServer -->|JSON REST API| LocalDB[(Local JSON Database backend/data/db.json)]
    end
```

---

## 2. Dual-Runtime Environment Architecture

### 2.1 Production Edge Runtime (Cloudflare Pages + D1)
- **Host**: Cloudflare Pages with worldwide Anycast edge deployment.
- **Routing**: `_redirects` file governs clean route mapping (e.g., `/services/website-development` -> `/services/website-development.html`).
- **Headers & Security**: `_headers` injects strict security policies, CSP, cache rules, and nosniff directives.
- **API Engine**: Cloudflare Pages Functions (`functions/api/[[path]].js`) executing in the V8 isolate environment at the edge.
- **Primary Persistence**: Cloudflare D1 SQL Database (`ABSS-Website-DB`), a distributed SQLite engine with global read replication.
- **Fallback Persistence**: Cloudflare KV (`ABSS_ADMIN`) for backward compatibility during legacy state synchronization.

### 2.2 Local Development Runtime (Dependency-Free Node.js)
- **Server**: `backend/server.js` running on standard Node.js without third-party npm runtime dependencies (pure native `http`, `fs`, `path`, `crypto`).
- **Port**: Default `3000` (configurable via `PORT` environment variable).
- **Persistence**: File-based transactional JSON database located at `backend/data/db.json`.
- **API Compatibility**: Implements identical REST endpoints as production Cloudflare Pages Functions, ensuring seamless parity during development.

---

## 3. Directory Layout & Layer Responsibilities

```text
/Users/shubhamkumar/New-ABSS-Deploy/
├── src/                               # Canonical Source of Truth
│   ├── components/                   # Canonical HTML components (header, footer, WhatsApp)
│   ├── pages/                        # Public HTML pages (Home, About, Services, Contact, etc.)
│   ├── admin/                        # Admin management console templates
│   ├── styles/                       # CSS architecture, components, and design system
│   │   └── components/               # Modular CSS bundles (header, hero, footer, etc.)
│   ├── scripts/                      # Client-side JavaScript controllers and utilities
│   │   ├── components/               # Scroll-reveal, hero-parallax, footer logic
│   │   └── config/                   # Central contact and environment configuration
│   └── services/                     # Frontend API services (admin-api.js, etc.)
├── functions/                        # Cloudflare Pages Functions (Production Edge API)
│   ├── api/[[path]].js               # Unified REST gateway router
│   └── _lib/                         # Edge libraries (d1-storage.js, email-service.js)
├── migrations/                       # Cloudflare D1 SQL schema migrations (0001 to 0005)
├── backend/                          # Local Node.js development server
│   ├── server.js                     # Native HTTP server & mock edge API
│   └── data/db.json                  # Local JSON database file
├── public/                           # Static assets, logos, mockups, documents, seals
│   └── assets/images/                # Web-optimized imagery and device frames
├── dist/                             # Compiled production build directory
├── scripts/                          # Build, sync, and automation tooling
│   ├── sync-components.js            # Single-source component injector
│   ├── build.js                      # Compilation, @import inlining, minification
│   ├── check-css-braces.js           # Syntax and bracket balance auditor
│   └── validate.sh                   # Comprehensive 16-point test runner
└── tests/                            # Automated verification test suites
```

---

## 4. Component Synchronization Engine

To guarantee 100% UI consistency across all 68+ routes without template engine overhead:

```mermaid
sequenceDiagram
    participant Source as src/components/
    participant Script as scripts/sync-components.js
    participant Pages as src/pages/*.html
    participant Build as scripts/build.js
    participant Dist as dist/

    Source->>Script: Read canonical header.html, footer.html, floating-whatsapp.html
    Script->>Pages: Scan 68 HTML pages
    Note over Script,Pages: Inject header with dynamic aria-current="page"
    Note over Script,Pages: Inject canonical footer & WhatsApp button
    Script-->>Pages: Write synchronized files
    Build->>Pages: Read synchronized pages
    Build->>Dist: Copy HTML routes & inline CSS imports into styles.min.css
```

---

## 5. Database Schema & Data Models (Cloudflare D1)

Cloudflare D1 uses SQL migrations located in `/migrations/`:

### 5.1 Core Business Tables (`0001` - `0003`)
- `leads`: Inbound inquiries (name, email, phone, service, budget, timeline, message, status, notes).
- `projects`: Client deliveries (title, category, client_name, completion_date, metrics, url).
- `clients`: Customer registry (company, contact_person, email, phone, status, contract_value).
- `support_tickets`: Client issues (ticket_id, client_id, subject, priority, status).
- `pricing_packages`: Tiered pricing catalog (name, category, price, features, is_featured).
- `admin_users`: Credentials and roles for administrative access.
- `audit_logs`: Timestamped administrative actions and modifications.

### 5.2 Internship Academy & Verification Tables (`0004` - `0005`)
- `internship_programs`: 5 official tracks (Web, Software, UI/UX, AI/ML, Cloud/DevOps).
- `internship_applications`: Applicant submissions (application_id, program_id, status, duration).
- `internship_students`: Verified active students (student_id, email, password_hash, is_verified).
- `internship_tasks`: Curriculum milestones and engineering briefs.
- `internship_submissions`: Student work uploads (repo_url, live_demo_url, status).
- `internship_certificates`: Tamper-proof credentials (certificate_id, student_name, track, issue_date, grade, status).

---

## 6. End-to-End Data Flows

### 6.1 Public Client Inquiry Flow
```mermaid
sequenceDiagram
    actor Client as Website Visitor
    participant UI as Contact Page (/contact)
    participant Edge as Edge Function (/api/leads/contact)
    participant D1 as D1 Database (leads table)
    participant Email as Email Service (Resend/SendGrid)
    actor Admin as Shubham (Founder)

    Client->>UI: Submits inquiry form
    UI->>Edge: POST /api/leads/contact (JSON payload)
    Edge->>Edge: Validate input & sanitize fields
    Edge->>D1: INSERT INTO leads (...)
    Edge->>Email: Send lead notification template
    Email-->>Admin: Instant email alert with client details
    Edge-->>UI: HTTP 201 Created
    UI-->>Client: Displays user-friendly confirmation card
```

### 6.2 Certificate Verification Flow
```mermaid
sequenceDiagram
    actor Verifier as Employer / Student
    participant Page as /verify-certificate
    participant Edge as /api/internships/verify/certificate/:id
    participant D1 as D1 Database

    Verifier->>Page: Enters Certificate ID (e.g. ABSS-2026-WD-1042)
    Page->>Edge: GET /api/internships/verify/certificate/ABSS-2026-WD-1042
    Edge->>D1: SELECT * FROM internship_certificates WHERE certificate_id = ?
    alt Certificate Exists & Active
        D1-->>Edge: Returns student name, track, issue date, grade
        Edge-->>Page: HTTP 200 { valid: true, data: {...} }
        Page-->>Verifier: Displays official verification badge with verified details
    else Certificate Invalid or Revoked
        D1-->>Edge: Not Found or Status = 'Revoked'
        Edge-->>Page: HTTP 404 / 400 { valid: false, error: '...' }
        Page-->>Verifier: Displays invalid or revoked credential warning
    end
```

---

## 7. Performance & Optimization Architecture
1. **Zero Network Waterfalls**: Inlined `@import` statements ensure the browser downloads a single consolidated `styles.min.css`.
2. **IntersectionObserver Scroll Reveal**: Minimal CPU cycles, observes offscreen cards, and unobserves upon entry.
3. **Hardware-Accelerated Compositing**: Animations strictly use `transform` (`translateY`) and `opacity` to avoid layout reflows.
4. **Edge Caching**: Static assets served with `Cache-Control: public, max-age=31536000, immutable` headers.

---

## 8. Authentication & Security Architecture

### 8.1 Core Security Mandates
The platform enforces 5 strict security principles across both Edge functions (`functions/api/[[path]].js`) and local server (`backend/server.js`):

```mermaid
graph TD
    Client[Incoming Request] --> RateLimiter{1. Rate Limiter<br/>Sliding Window 10/5m}
    RateLimiter -- Exceeded --> R429[HTTP 429 + Retry-After: 300]
    RateLimiter -- Allowed --> InputValidator{2. Server-Side Validation<br/>RFC-5322, Len: 8-128}
    InputValidator -- Malformed --> R400[HTTP 400 Bad Request]
    InputValidator -- Valid --> AuthEngine{3. Identity Engine<br/>Firebase Auth / Edge D1}
    AuthEngine --> CryptoHash[4. PBKDF2 Hashing<br/>100k iter + 16B Salt + Timing-Safe]
    CryptoHash -- Mismatch --> Generic401[5. Generic Error Response<br/>HTTP 401 No Enumeration]
    CryptoHash -- Match --> SessionAuth[Set HttpOnly SameSite=Strict Cookie]
```

1. **Server-Side Validation**:
   - RFC 5322 email validation (`EMAIL_REGEX`).
   - Passwords strictly bounded between 8 and 128 characters to protect against ReDoS / CPU exhaustion.
   - String inputs bounded to protect database integrity.
2. **Rate Limiting**:
   - Sliding-window in-memory rate limiting keyed by client IP (`cf-connecting-ip`, `x-forwarded-for`).
   - Authentication routes capped at 10 requests per 5-minute window; returns HTTP 429 with `Retry-After: 300`.
3. **Cryptographic Password Encryption**:
   - Passwords hashed using PBKDF2 with 100,000 iterations and 16-byte cryptographically secure random salt.
   - Verified using constant-time comparison (`crypto.timingSafeEqual` in Node.js, `constantTimeEqual` in Edge Functions).
4. **Generic Error Responses (Zero Enumeration)**:
   - Identical error message (`"Invalid email or password."`) regardless of whether an account exists or the password is bad.
   - Password reset always yields identical HTTP 200 response (`"If an account with that email exists, password reset instructions have been generated."`).
5. **Firebase Authentication Architecture**:
   - Client-side modular wrapper in `src/scripts/firebase-auth.js` and `src/services/firebase-config.js`.
   - Supports Google Sign-In and standard Email/Password authentication.
   - Graceful fallback to Cloudflare D1 edge database if Firebase credentials are omitted or during edge offline mode.

