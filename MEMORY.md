# Institutional Memory & Context (MEMORY.md)
## ABSS Nexus Technologies — Long-Term Project Memory & Decision Log

---

## 1. Project Identity & Key Metadata

- **Company Name**: ABSS Nexus Technologies
- **Legal & Operating Base**: Jaipur, Rajasthan, India
- **Founder & Lead Architect**: Shubham Kumar
- **Official Direct Phone**: `+91 87579 28673` (tel:+918757928673)
- **Official Email**: `abssnexus@gmail.com` (mailto:abssnexus@gmail.com)
- **Primary Domain**: `https://abssnexus.in`
- **Social Profiles**:
  - Instagram: `https://www.instagram.com/abssnexus/`
  - Facebook: `https://www.facebook.com/profile.php?id=61592563923350`
  - X / Twitter: `https://x.com/abssnexus`
- **Local Dev Port**: `3000` (http://localhost:3000)

---

## 2. 16 Authentic IT Service Disciplines

The platform is strictly organized around 16 authentic IT services, each with a dedicated route under `/services/*` and deep-dive page in `src/pages/service-*.html`:
1. **Website Development** (`/services/website-development`)
2. **Software Development** (`/services/software-development`)
3. **Mobile App Development** (`/services/mobile-app-development`)
4. **UI/UX Design** (`/services/ui-ux-design`)
5. **AI & Machine Learning** (`/services/ai-machine-learning`)
6. **Cloud Computing & DevOps** (`/services/cloud-computing`)
7. **Cybersecurity & Hardening** (`/services/cybersecurity`)
8. **Data Analytics & BI** (`/services/data-analytics-bi`)
9. **Digital Marketing & SEO** (`/services/digital-marketing-seo`)
10. **E-Commerce Development** (`/services/ecommerce-development`)
11. **SaaS Development** (`/services/saas-development`)
12. **API Integration & Webhooks** (`/services/api-integration`)
13. **Software Testing & QA** (`/services/software-testing-qa`)
14. **IT Consulting & Strategy** (`/services/it-consulting`)
15. **Website Maintenance & Support** (`/services/website-maintenance`)
16. **Managed IT Support** (`/services/managed-it-support`)

---

## 3. Key Architectural Decisions & Evolution Log

### Decision 1: Single Source of Truth for Global Shells
- **Problem**: 68 individual HTML files made updating navbars, footers, or WhatsApp CTAs prone to manual omissions and visual drifts.
- **Solution**: Established canonical components in `src/components/` (`header.html`, `footer.html`, `floating-whatsapp.html`). Built `scripts/sync-components.js` which automatically scans `src/pages/`, parses page routes, injects `aria-current="page"` dynamically, and syncs all pages.
- **Rule**: Never edit headers/footers in `src/pages/` directly. Always edit `src/components/` and run `npm run sync-components` or `npm run build`.

### Decision 2: Dual-Runtime Edge & Local Strategy
- **Problem**: Developing against remote Cloudflare D1/Pages Functions requires active network credentials and wrangler emulation.
- **Solution**: Created a lightweight, zero-dependency Node.js server (`backend/server.js`) that mimics the Cloudflare Pages Function routing and D1 storage locally using `backend/data/db.json`. In production, Cloudflare Pages Functions (`functions/api/[[path]].js`) seamlessly bind to live Cloudflare D1 SQL.

### Decision 3: Removal of "Verified Production Launch" Badges
- **Context**: Client Endorsements section previously displayed green checkmark badges reading `"Verified Production Launch"`, `"Verified Storefront Deployment"`, etc.
- **Decision**: Removed all badge rows to achieve a clean, minimalist Apple testimonial aesthetic (clean author avatar, name, and role/company) without distracting repetitive badges. Updated `test-phase2-public-sections.js` to assert author companies (`FinEdge Labs`).

### Decision 4: Universal Staggered Animation System
- **Context**: The site felt static on initial load, and scroll reveals were either manual or popped in abruptly.
- **Decision**:
  - Implemented `@view-transition { navigation: auto; }` for modern browsers.
  - Implemented `@keyframes heroItemFadeUp` with sequential delays (`0.05s`, `0.12s`, `0.20s`, `0.28s`) across all page heroes.
  - Implemented automated discovery of cards, headings, and CTAs in `script.js` and `scroll-reveal.js`. Elements visible on load cascade with a 45ms stagger; offscreen elements reveal on scroll with `IntersectionObserver`.
### Decision 5: Five Core Security & Authentication Mandates
- **Context**: Needed enterprise-grade defense-in-depth across student and admin authentication.
- **Decision**:
  1. *Server-Side Validation*: Enforced RFC 5322 email regex and password length constraints (8-128 chars) across Edge functions and local runtime.
  2. *Login Rate Limiting*: Implemented sliding-window IP rate limiting (10 attempts / 5 mins) with HTTP 429 and `Retry-After: 300`.
  3. *Salted PBKDF2 Encryption*: Stored passwords using PBKDF2 with 100,000 iterations and 16-byte random salt; constant-time comparison prevents timing side-channels.
  4. *Generic Error Messages*: Eliminated user enumeration across login and password reset endpoints.
  5. *Firebase Authentication*: Integrated Firebase Auth client architecture (`src/scripts/firebase-auth.js`) supporting Google Sign-In and Email/Password with graceful edge D1 fallback.

---

## 4. Complete API Route Catalog

### 4.1 Public Client Inquiries
- `POST /api/leads/contact`: Ingests inbound inquiry, stores in D1 `leads` table, and dispatches transactional email notification.

### 4.2 Internship & Student Authentication
- `POST /api/internships/auth/register`: Student registration with verification token generation.
- `GET /api/internships/auth/verify?token=...`: Activates student account.
- `POST /api/internships/auth/login`: Issues secure session cookie.
- `GET /api/internships/auth/me`: Authenticated profile fetch.
- `POST /api/internships/auth/logout`: Clears session cookie and invalidates session.
- `POST /api/internships/auth/forgot-password`: Generates reset token (generic safe response).
- `POST /api/internships/auth/reset-password`: Sets new password with valid token.

### 4.3 Student Dashboard & Tasks
- `GET /api/internships/dashboard/overview`: Fetch enrolled programs, active milestone tasks, and completion metrics.
- `POST /api/internships/tasks/submit`: Upload repo and demo URLs for task evaluation.

### 4.4 Verification Registry (Public)
- `GET /api/internships/verify/certificate/:id`: Validates certificate against D1 `internship_certificates`.
- `GET /api/internships/verify/application/:idOrEmail`: Fetches applicant status.
- `GET /api/internships/verify/payment/:txId`: Looks up verified payment receipt.

### 4.5 Administrative Console (Protected)
- `POST /api/admin/auth/login`: Authenticates administrator with session token.
- `GET /api/admin/auth/me`: Verifies active admin session.
- `GET /api/admin/leads`: Lists captured leads with search and status filters.
- `PATCH /api/admin/leads/:id`: Updates lead status or internal notes.
- `POST /api/admin/internships/certificates/issue`: Issues new verifiable certificate into D1.
- `PATCH /api/admin/internships/certificates/:id/revoke`: Revokes certificate in D1.

---

## 5. Standard Test & Validation Commands

```bash
# 1. Verify CSS Syntax & Balanced Brackets
node scripts/check-css-braces.js

# 2. Build production assets & synchronize components
npm run build

# 3. Test 5 Security & Authentication Mandates
node tests/test-security-five-points.js

# 4. Test Fail-Closed Admin Security & Secrets
node tests/test-security-admin-auth.js

# 5. Test Full Student Internship Authentication
node tests/test-phase5-auth.js

# 6. Test Header, Hero, and Responsive Breakpoints
node tests/test-header-hero-responsive.js

# 7. Test Public Sections, Testimonials & FAQs
node tests/test-phase2-public-sections.js

# 8. Full Route Status Audit (114 routes)
node tests/test-all-68-pages.js

# 9. Comprehensive Integration Suite (16 checks)
./scripts/validate.sh
```
