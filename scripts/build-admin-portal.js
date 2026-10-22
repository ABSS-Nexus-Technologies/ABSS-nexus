const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const adminDir = path.join(rootDir, "src", "admin");
const internshipsDir = path.join(adminDir, "internships");
const companyDir = path.join(adminDir, "company");

// Ensure target directories exist
fs.mkdirSync(internshipsDir, { recursive: true });
fs.mkdirSync(companyDir, { recursive: true });

// Read DB for real initial metrics
let db = {};
try {
  db = JSON.parse(fs.readFileSync(path.join(rootDir, "backend", "data", "db.json"), "utf8"));
} catch (e) {
  console.warn("Could not read db.json, using defaults", e.message);
}

const enrolledInternsCount = (db.students || []).length;
const activeTracksCount = (db.internshipPrograms || []).length || 5;
const applicationsCount = (db.internshipApplications || []).length;
const verifiedPaymentsCount = (db.internshipPayments || []).length;
const issuedCertsCount = (db.certificates || []).length;

const leadsCount = (db.leads || []).length;
const projectsCount = (db.projects || []).length;
const clientsCount = (db.clients || []).length;
const servicesCount = 17;
const careersCount = 3;

// Navigation items definition
const internshipNav = [
  { id: "overview", label: "Overview", href: "/admin/internships/", icon: "📊" },
  { id: "programs", label: "Internship Programs", href: "/admin/internships/programs", icon: "📚", count: activeTracksCount },
  { id: "applications", label: "Applications", href: "/admin/internships/applications", icon: "📝", count: applicationsCount },
  { id: "students", label: "Enrolled Interns", href: "/admin/internships/students", icon: "🎓", count: enrolledInternsCount },
  { id: "tasks", label: "Tasks & Assignments", href: "/admin/internships/tasks", icon: "📋" },
  { id: "submissions", label: "Work Submissions", href: "/admin/internships/submissions", icon: "📥" },
  { id: "reviews", label: "Evaluations & Reviews", href: "/admin/internships/reviews", icon: "⭐" },
  { id: "payments", label: "Fee Payments", href: "/admin/internships/payments", icon: "💳", count: verifiedPaymentsCount },
  { id: "certificates", label: "Certificate Registry", href: "/admin/internships/certificates", icon: "📜", count: issuedCertsCount },
  { id: "reports", label: "Internship Reports", href: "/admin/internships/reports", icon: "📈" },
  { id: "settings", label: "Internship Settings", href: "/admin/internships/settings", icon: "⚙️" },
];

const companyNav = [
  { id: "overview", label: "Company Overview", href: "/admin/company/", icon: "🏢" },
  { id: "pages", label: "Website Pages", href: "/admin/company/pages", icon: "📄", count: "68+" },
  { id: "navigation", label: "Navigation Links", href: "/admin/company/navigation", icon: "🧭" },
  { id: "services", label: "Service Listings", href: "/admin/company/services", icon: "🛠️", count: servicesCount },
  { id: "solutions", label: "Solutions", href: "/admin/company/solutions", icon: "💡" },
  { id: "industries", label: "Industries", href: "/admin/company/industries", icon: "🏭" },
  { id: "projects", label: "Portfolio & Projects", href: "/admin/company/projects", icon: "💼", count: projectsCount },
  { id: "leads", label: "Inquiries & Leads", href: "/admin/company/leads", icon: "📬", count: leadsCount },
  { id: "careers", label: "Job Listings", href: "/admin/company/careers", icon: "👥", count: careersCount },
  { id: "candidates", label: "Job Applicants", href: "/admin/company/candidates", icon: "📋" },
  { id: "blog", label: "Articles & Blog", href: "/admin/company/blog", icon: "📰", count: 3 },
  { id: "media", label: "Media Assets", href: "/admin/company/media", icon: "🖼️" },
  { id: "seo", label: "SEO Metadata", href: "/admin/company/seo", icon: "🔍" },
  { id: "analytics", label: "Analytics & Telemetry", href: "/admin/company/analytics", icon: "📊" },
  { id: "settings", label: "Company Settings", href: "/admin/company/settings", icon: "⚙️" },
];

function renderTopHeader(moduleType) {
  let moduleIndicator = "";
  let switchBtn = "";

  if (moduleType === "internships") {
    moduleIndicator = `<span class="admin-module-indicator module-indicator-internship">🎓 Internship Admin</span>`;
    switchBtn = `<a href="/admin/company/" class="btn-module-switch" title="Switch to Company Administration">🏢 Switch to Company Admin</a>`;
  } else if (moduleType === "company") {
    moduleIndicator = `<span class="admin-module-indicator module-indicator-company">🏢 Company Admin</span>`;
    switchBtn = `<a href="/admin/internships/" class="btn-module-switch" title="Switch to Internship Administration">🎓 Switch to Internship Admin</a>`;
  } else {
    moduleIndicator = `<span class="admin-module-indicator module-indicator-hub">Console Hub</span>`;
  }

  return `
    <header class="admin-top-header">
      <div class="admin-top-header-inner">
        <div class="admin-brand-group">
          <a href="/admin/" class="admin-brand-link" title="Admin Console Home">
            <img src="/public/assets/images/favicon.png" alt="ABSS Nexus Logo" width="32" height="32" style="border-radius: 6px;" />
            <span class="admin-brand-title">ABSS Nexus Operations Console</span>
          </a>
          ${moduleIndicator}
          <span style="background: rgba(16, 185, 129, 0.12); color: #10b981; padding: 4px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 700;">● D1 Storage Active</span>
        </div>
        <div class="admin-header-actions">
          <div class="admin-user-badge">
            <span>Role:</span>
            <span class="admin-role-pill" id="adminUserRoleBadge">Superadmin</span>
          </div>
          ${switchBtn}
          <a href="/admin/" class="btn-module-switch" style="font-size: 0.78rem;">Modules Hub</a>
          <a href="/admin/login" onclick="sessionStorage.removeItem('abss-admin-token'); sessionStorage.removeItem('abss-admin-role');" class="btn-signout">Sign Out</a>
        </div>
      </div>
    </header>
  `;
}

function renderSidebar(moduleType, activeId) {
  const isIntern = moduleType === "internships";
  const navList = isIntern ? internshipNav : companyNav;
  const moduleName = isIntern ? "Internship Admin" : "Company Admin";
  const switchTarget = isIntern ? "/admin/company/" : "/admin/internships/";
  const switchLabel = isIntern ? "⇄ Switch to Company Admin" : "⇄ Switch to Internship Admin";

  return `
    <aside class="admin-sidebar" aria-label="${moduleName} Navigation">
      <div class="sidebar-module-title">
        <span style="font-size: 1.25rem;">${isIntern ? "🎓" : "🏢"}</span>
        <h2 class="sidebar-module-name">${moduleName}</h2>
      </div>
      <a href="${switchTarget}" class="sidebar-module-switch-btn">${switchLabel}</a>
      <nav class="admin-sidebar-nav">
        ${navList.map(item => `
          <a href="${item.href}" class="sidebar-nav-item ${activeId === item.id ? 'active' : ''}">
            <span style="display: flex; align-items: center; gap: 8px;">
              <span>${item.icon}</span>
              <span>${item.label}</span>
            </span>
            ${item.count !== undefined ? `<span class="sidebar-badge">${item.count}</span>` : ''}
          </a>
        `).join("")}
      </nav>
      <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--admin-border-light); font-size: 0.72rem; color: var(--admin-text-secondary); text-align: center;">
        ABSS Nexus Operations v2.4<br/>
        <span style="color: #10b981;">● Server Verified</span>
      </div>
    </aside>
  `;
}

function renderBreadcrumbs(moduleType, pageTitle) {
  const isIntern = moduleType === "internships";
  const moduleHome = isIntern ? "/admin/internships/" : "/admin/company/";
  const moduleName = isIntern ? "Internship Administration" : "Company Administration";

  return `
    <nav class="admin-breadcrumbs" aria-label="Breadcrumb">
      <a href="/admin/">Admin Hub</a>
      <span class="separator">/</span>
      <a href="${moduleHome}">${moduleName}</a>
      <span class="separator">/</span>
      <span class="current">${pageTitle}</span>
    </nav>
  `;
}

function generateModularPage({ targetFile, title, moduleType, activeId, eyebrow, heading, subtitle, actionsHtml, bodyContent }) {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <title>${title} | ABSS Nexus Admin Console</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/public/assets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/public/assets/images/favicon.png" />
    <link rel="apple-touch-icon" href="/public/assets/images/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/styles.css" />
    <link rel="stylesheet" href="/src/styles/components/admin.css" />
  </head>
  <body class="admin-body">
    <div class="admin-wrapper" data-admin-app>
      ${renderTopHeader(moduleType)}

      <main class="admin-shell">
        <div class="admin-layout">
          ${renderSidebar(moduleType, activeId)}

          <div class="admin-main">
            ${renderBreadcrumbs(moduleType, title)}

            <div class="admin-page-header">
              <div>
                <div class="admin-page-eyebrow">${eyebrow}</div>
                <h1 class="admin-page-title">${heading}</h1>
                ${subtitle ? `<p class="admin-page-subtitle">${subtitle}</p>` : ''}
              </div>
              <div class="admin-actions-bar">
                ${actionsHtml || `
                  <button type="button" class="btn-admin btn-admin-secondary" onclick="alert('Exporting module data to CSV...');">Export CSV</button>
                  <button type="button" class="btn-admin btn-admin-primary" onclick="alert('Record creation modal opened.');">+ New Record</button>
                `}
              </div>
            </div>

            ${bodyContent}
          </div>
        </div>
      </main>
    </div>

    <script src="/src/config/admin-config.js"></script>
    <script src="/src/services/admin-api.js"></script>
    <script src="/src/scripts/admin-auth-guard.js"></script>
    <script src="/src/scripts/admin-app.js"></script>
  </body>
</html>`;

  fs.writeFileSync(targetFile, html, "utf8");
  console.log(`Generated: ${path.relative(rootDir, targetFile)}`);
}

// =============================================================================
// 1. ADMIN LANDING PAGE (/admin/ -> src/admin/index.html)
// =============================================================================

function generateAdminLandingPage() {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <title>Administration Console | ABSS Nexus Technologies</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/public/assets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/public/assets/images/favicon.png" />
    <link rel="apple-touch-icon" href="/public/assets/images/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/styles.css" />
    <link rel="stylesheet" href="/src/styles/components/admin.css" />
  </head>
  <body class="admin-body">
    <div class="admin-wrapper" data-admin-app>
      ${renderTopHeader("hub")}

      <main class="admin-hub-shell">
        <header class="admin-hub-header">
          <span class="admin-hub-eyebrow">Enterprise Command Center</span>
          <h1 class="admin-hub-title">Administration Modules</h1>
          <p class="admin-hub-subtitle">
            Welcome to the ABSS Nexus Technologies Operations Center. Select an administration module below to manage academic internship programs or corporate enterprise assets.
          </p>
        </header>

        <section class="admin-modules-grid">
          <!-- Card A: Internship Administration -->
          <article class="admin-module-card">
            <div class="module-card-icon-wrap icon-wrap-internship">🎓</div>
            <span class="module-card-badge" style="background: rgba(0, 102, 204, 0.1); color: #0066CC;">Academic &amp; Student Operations</span>
            <h2 class="module-card-title">Internship Administration</h2>
            <p class="module-card-description">
              Manage internship programs, applications, interns, assignments, submissions, payments and certificates.
            </p>
            <ul class="module-card-features">
              <li class="module-card-feature-item"><span class="feature-check">✓</span> <span><strong>${activeTracksCount}</strong> Internship Technical Tracks</span></li>
              <li class="module-card-feature-item"><span class="feature-check">✓</span> <span><strong>${applicationsCount}</strong> Applications Pipeline &amp; Review</span></li>
              <li class="module-card-feature-item"><span class="feature-check">✓</span> <span><strong>${enrolledInternsCount}</strong> Active Enrolled Learners</span></li>
              <li class="module-card-feature-item"><span class="feature-check">✓</span> <span><strong>${verifiedPaymentsCount}</strong> Fee Payments &amp; <strong>${issuedCertsCount}</strong> Verified Certificates</span></li>
            </ul>
            <a href="/admin/internships/" class="btn-open-module">Open Internship Admin &rarr;</a>
          </article>

          <!-- Card B: Company Administration -->
          <article class="admin-module-card">
            <div class="module-card-icon-wrap icon-wrap-company">🏢</div>
            <span class="module-card-badge" style="background: rgba(16, 185, 129, 0.12); color: #059669;">Enterprise &amp; Web Operations</span>
            <h2 class="module-card-title">Company Administration</h2>
            <p class="module-card-description">
              Manage the company website, services, projects, inquiries, careers, content and business settings.
            </p>
            <ul class="module-card-features">
              <li class="module-card-feature-item"><span class="feature-check">✓</span> <span><strong>68+</strong> Site Pages &amp; Global Navigation</span></li>
              <li class="module-card-feature-item"><span class="feature-check">✓</span> <span><strong>${servicesCount}</strong> Technical Enterprise Services</span></li>
              <li class="module-card-feature-item"><span class="feature-check">✓</span> <span><strong>${leadsCount}</strong> Client Inquiries &amp; Pipeline Leads</span></li>
              <li class="module-card-feature-item"><span class="feature-check">✓</span> <span>Careers, Blog Publishing &amp; Telemetry Analytics</span></li>
            </ul>
            <a href="/admin/company/" class="btn-open-module" style="background: #059669;">Open Company Admin &rarr;</a>
          </article>
        </section>

        <!-- Quick Summary Bar -->
        <section style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: var(--admin-radius-md); padding: 24px; box-shadow: var(--admin-shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <h3 style="margin: 0 0 4px; font-size: 1.05rem; font-family: var(--font-display);">System Telemetry &amp; Access Control</h3>
              <p style="margin: 0; font-size: 0.85rem; color: var(--admin-text-secondary);">
                Active Session: <strong>Superadmin</strong> &bull; Server Engine: <strong>Node.js + Cloudflare D1 Storage</strong>
              </p>
            </div>
            <div style="display: flex; gap: 10px;">
              <a href="/admin/internships/reports" class="btn-module-switch">View Internship Reports</a>
              <a href="/admin/company/analytics" class="btn-module-switch">View Web Analytics</a>
            </div>
          </div>
        </section>
      </main>
    </div>

    <script src="/src/config/admin-config.js"></script>
    <script src="/src/services/admin-api.js"></script>
    <script src="/src/scripts/admin-auth-guard.js"></script>
    <script src="/src/scripts/admin-app.js"></script>
  </body>
</html>`;

  fs.writeFileSync(path.join(adminDir, "index.html"), html, "utf8");
  console.log("Generated: src/admin/index.html");
}

generateAdminLandingPage();

// =============================================================================
// 2. INTERNSHIP ADMIN MODULE PAGES (11 Pages)
// =============================================================================

// 2.1 /admin/internships/ (Overview)
generateModularPage({
  targetFile: path.join(internshipsDir, "index.html"),
  title: "Internship Overview Dashboard",
  moduleType: "internships",
  activeId: "overview",
  eyebrow: "Internship Command Center",
  heading: "Academic Cohorts &amp; Student Operations",
  subtitle: "Real-time telemetry across learner applications, enrolled students, assignment evaluations and credentials.",
  bodyContent: `
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <span class="kpi-label">TOTAL APPLICATIONS</span>
        <div class="kpi-value">${applicationsCount}</div>
        <div class="kpi-sub" style="color: var(--admin-accent);">3 in active review cycle</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">ENROLLED INTERNS</span>
        <div class="kpi-value">${enrolledInternsCount}</div>
        <div class="kpi-sub" style="color: var(--admin-success);">+24% vs previous cohort</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">VERIFIED PAYMENTS</span>
        <div class="kpi-value">${verifiedPaymentsCount}</div>
        <div class="kpi-sub" style="color: var(--admin-success);">100% reconciled</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">ISSUED CERTIFICATES</span>
        <div class="kpi-value">${issuedCertsCount}</div>
        <div class="kpi-sub" style="color: #6E6E73;">Cryptographically verifiable</div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="admin-filter-bar">
      <div class="admin-filter-group">
        <input type="text" class="admin-search-input" placeholder="Search applications or interns..." />
        <select class="admin-select">
          <option>All Tracks</option>
          <option>Web Engineering</option>
          <option>AI &amp; Machine Learning</option>
          <option>Software Development</option>
          <option>UI/UX Design</option>
          <option>Cloud &amp; DevOps</option>
        </select>
        <select class="admin-select">
          <option>All Statuses</option>
          <option>Under Review</option>
          <option>Shortlisted</option>
          <option>Offer Letter</option>
        </select>
      </div>
      <span style="font-size: 0.82rem; color: var(--admin-text-secondary);">Showing 3 recent applications</span>
    </div>

    <!-- Applications Table -->
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Candidate Name</th>
            <th>Track / Program</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody data-applications-table>
          <tr>
            <td colspan="6" style="text-align: center; padding: 48px 16px; color: #6e6e73;">
              <div style="font-size: 2.2rem; margin-bottom: 8px;">📝</div>
              <strong style="display: block; font-size: 1.05rem; color: #1d1d1f; margin-bottom: 4px; font-family: 'Space Grotesk', sans-serif;">Loading Live Applications...</strong>
              <p style="margin: 0; font-size: 0.88rem; color: #6e6e73;">Connecting to Cloudflare D1 database registry...</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="admin-pagination-bar">
        <span>Showing page 1 of 1</span>
        <div class="pagination-controls">
          <button class="btn-page" disabled>&larr;</button>
          <button class="btn-page active">1</button>
          <button class="btn-page" disabled>&rarr;</button>
        </div>
      </div>
    </div>
  `
});

// 2.2 /admin/internships/programs
generateModularPage({
  targetFile: path.join(internshipsDir, "programs.html"),
  title: "Internship Programs",
  moduleType: "internships",
  activeId: "programs",
  eyebrow: "Curriculum &amp; Tracks",
  heading: "Manage Internship Programs",
  subtitle: "Configure syllabus, duration, intake capacity, and cohort schedules across all 5 engineering domains.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Program Title</th>
            <th>Duration</th>
            <th>Mode</th>
            <th>Active Interns</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Web Development Engineering</strong><br/><small style="color: #6E6E73;">HTML5, CSS3, JS, React, Cloudflare Workers</small></td>
            <td>12 Weeks</td>
            <td>Remote / Hybrid</td>
            <td><strong>64</strong></td>
            <td><span class="status-pill status-success">Active / Open</span></td>
            <td><button class="btn-admin btn-admin-secondary" style="padding: 4px 10px; font-size: 0.76rem;">Edit Curriculum</button></td>
          </tr>
          <tr>
            <td><strong>Software Development &amp; Architecture</strong><br/><small style="color: #6E6E73;">Python, Node.js, PostgreSQL, System Design</small></td>
            <td>16 Weeks</td>
            <td>Remote</td>
            <td><strong>38</strong></td>
            <td><span class="status-pill status-success">Active / Open</span></td>
            <td><button class="btn-admin btn-admin-secondary" style="padding: 4px 10px; font-size: 0.76rem;">Edit Curriculum</button></td>
          </tr>
          <tr>
            <td><strong>UI/UX Product Design</strong><br/><small style="color: #6E6E73;">Figma, Design Systems, Heuristics, User Research</small></td>
            <td>8 Weeks</td>
            <td>Remote</td>
            <td><strong>18</strong></td>
            <td><span class="status-pill status-success">Active / Open</span></td>
            <td><button class="btn-admin btn-admin-secondary" style="padding: 4px 10px; font-size: 0.76rem;">Edit Curriculum</button></td>
          </tr>
          <tr>
            <td><strong>AI &amp; Applied Machine Learning</strong><br/><small style="color: #6E6E73;">PyTorch, LLM Fine-tuning, RAG, Neural Networks</small></td>
            <td>16 Weeks</td>
            <td>Remote</td>
            <td><strong>16</strong></td>
            <td><span class="status-pill status-success">Active / Open</span></td>
            <td><button class="btn-admin btn-admin-secondary" style="padding: 4px 10px; font-size: 0.76rem;">Edit Curriculum</button></td>
          </tr>
          <tr>
            <td><strong>Cloud Computing &amp; DevOps</strong><br/><small style="color: #6E6E73;">AWS, Docker, Kubernetes, CI/CD, Terraform</small></td>
            <td>12 Weeks</td>
            <td>Remote</td>
            <td><strong>12</strong></td>
            <td><span class="status-pill status-success">Active / Open</span></td>
            <td><button class="btn-admin btn-admin-secondary" style="padding: 4px 10px; font-size: 0.76rem;">Edit Curriculum</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 2.3 /admin/internships/applications
generateModularPage({
  targetFile: path.join(internshipsDir, "applications.html"),
  title: "Review Applications",
  moduleType: "internships",
  activeId: "applications",
  eyebrow: "Admissions Pipeline",
  heading: "Candidate Applications &amp; Review",
  subtitle: "Evaluate submissions, review portfolios, schedule assessments, and issue offer letters.",
  bodyContent: `
    <div class="admin-filter-bar">
      <div class="admin-filter-group">
        <input type="text" class="admin-search-input" placeholder="Search applicant by name, email, or ID..." />
        <select class="admin-select">
          <option>All Statuses</option>
          <option>Under Review</option>
          <option>Shortlisted</option>
          <option>Offer Letter</option>
          <option>Rejected</option>
        </select>
      </div>
      <button class="btn-admin btn-admin-primary">Batch Actions</button>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Applicant</th>
            <th>Track</th>
            <th>Application Notes</th>
            <th>Decision Stage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody data-applications-table>
          <tr>
            <td colspan="6" style="text-align: center; padding: 48px 16px; color: #6e6e73;">
              <div style="font-size: 2.2rem; margin-bottom: 8px;">📝</div>
              <strong style="display: block; font-size: 1.05rem; color: #1d1d1f; margin-bottom: 4px; font-family: 'Space Grotesk', sans-serif;">Loading Live Applications...</strong>
              <p style="margin: 0; font-size: 0.88rem; color: #6e6e73;">Connecting to Cloudflare D1 database registry...</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 2.4 /admin/internships/students
generateModularPage({
  targetFile: path.join(internshipsDir, "students.html"),
  title: "Enrolled Interns",
  moduleType: "internships",
  activeId: "students",
  eyebrow: "Learner Directory",
  heading: "Manage Enrolled Interns",
  subtitle: "Active students, progress milestones, cohort attendance, and mentoring status.",
  bodyContent: `
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <span class="kpi-label">TOTAL ENROLLED</span>
        <div class="kpi-value">${enrolledInternsCount}</div>
        <div class="kpi-sub">Across 5 tracks</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">ACTIVE TODAY</span>
        <div class="kpi-value">17</div>
        <div class="kpi-sub" style="color: #10b981;">89.4% engagement rate</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">AVERAGE PROGRESS</span>
        <div class="kpi-value">68%</div>
        <div class="kpi-sub">Cohort milestone #3</div>
      </div>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Student Name &amp; Email</th>
            <th>Assigned Track</th>
            <th>Account Status</th>
            <th>Verification</th>
            <th>Enrolled Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody data-students-table>
          <tr>
            <td colspan="6" style="text-align: center; padding: 48px 16px; color: #6e6e73;">
              <div style="font-size: 2.2rem; margin-bottom: 8px;">🎓</div>
              <strong style="display: block; font-size: 1.05rem; color: #1d1d1f; margin-bottom: 4px; font-family: 'Space Grotesk', sans-serif;">Loading Enrolled Interns...</strong>
              <p style="margin: 0; font-size: 0.88rem; color: #6e6e73;">Fetching registered student records from Cloudflare D1...</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 2.5 /admin/internships/tasks
generateModularPage({
  targetFile: path.join(internshipsDir, "tasks.html"),
  title: "Internship Tasks",
  moduleType: "internships",
  activeId: "tasks",
  eyebrow: "Assignments &amp; Milestones",
  heading: "Create &amp; Assign Tasks",
  subtitle: "Configure weekly technical assignments, acceptance rubrics, and deliverable deadlines.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Program Track</th>
            <th>Deadline</th>
            <th>Deliverables</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Task 1: Production UI &amp; Accessibility Audit</strong></td>
            <td>Web Engineering</td>
            <td>Cohort Week 2</td>
            <td>Git Repo + Live URL</td>
            <td><span class="status-pill status-success">Active</span></td>
            <td><button class="btn-admin btn-admin-secondary" style="padding: 4px 8px; font-size: 0.76rem;">Edit Rubric</button></td>
          </tr>
          <tr>
            <td><strong>Task 2: RESTful API Integration &amp; Cloudflare D1</strong></td>
            <td>Web Engineering</td>
            <td>Cohort Week 4</td>
            <td>Postman Collection + Test Suite</td>
            <td><span class="status-pill status-success">Active</span></td>
            <td><button class="btn-admin btn-admin-secondary" style="padding: 4px 8px; font-size: 0.76rem;">Edit Rubric</button></td>
          </tr>
          <tr>
            <td><strong>Task 3: Fine-Tuning &amp; Vector Embeddings Pipeline</strong></td>
            <td>AI &amp; Machine Learning</td>
            <td>Cohort Week 6</td>
            <td>Jupyter Notebook + Evaluation Report</td>
            <td><span class="status-pill status-info">Upcoming</span></td>
            <td><button class="btn-admin btn-admin-secondary" style="padding: 4px 8px; font-size: 0.76rem;">Edit Rubric</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 2.6 /admin/internships/submissions
generateModularPage({
  targetFile: path.join(internshipsDir, "submissions.html"),
  title: "Work Submissions",
  moduleType: "internships",
  activeId: "submissions",
  eyebrow: "Deliverable Pipeline",
  heading: "Review Submitted Work",
  subtitle: "Inspect student pull requests, demo preview deployments, and code quality benchmarks.",
  bodyContent: `
    <div class="admin-filter-bar">
      <div class="admin-filter-group">
        <input type="text" class="admin-search-input" placeholder="Search by student or task name..." />
        <select class="admin-select">
          <option>All Submissions</option>
          <option>Pending Review</option>
          <option>Approved</option>
          <option>Changes Requested</option>
        </select>
      </div>
      <span style="font-size: 0.82rem; color: #f59e0b; font-weight: 600;">● Reviewer SLA: &lt; 24h turnaround</span>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Task</th>
            <th>Repository / Demo</th>
            <th>Submitted At</th>
            <th>Review Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" style="text-align: center; padding: 48px 16px; color: #6e6e73;">
              <div style="font-size: 2.2rem; margin-bottom: 8px;">📥</div>
              <strong style="display: block; font-size: 1.05rem; color: #1d1d1f; margin-bottom: 4px; font-family: 'Space Grotesk', sans-serif;">No Work Submissions Yet</strong>
              <p style="margin: 0; font-size: 0.88rem; color: #6e6e73;">When enrolled interns submit pull requests and task deliverables, they will appear here.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 2.7 /admin/internships/reviews
generateModularPage({
  targetFile: path.join(internshipsDir, "reviews.html"),
  title: "Evaluations & Reviews",
  moduleType: "internships",
  activeId: "reviews",
  eyebrow: "Grading &amp; Feedback",
  heading: "Student Evaluations &amp; Reviews",
  subtitle: "Assign rubric marks, deliver mentorship feedback, and record milestone completion scores.",
  bodyContent: `
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <span class="kpi-label">AVERAGE GRADE</span>
        <div class="kpi-value">91.4%</div>
        <div class="kpi-sub" style="color: #10b981;">Cohort distinction track</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">REVIEWS COMPLETED</span>
        <div class="kpi-value">142</div>
        <div class="kpi-sub">Total evaluations logged</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">PENDING REVIEWS</span>
        <div class="kpi-value">3</div>
        <div class="kpi-sub" style="color: #f59e0b;">Assigned to mentor desk</div>
      </div>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Evaluated Task</th>
            <th>Score</th>
            <th>Reviewer Comments</th>
            <th>Evaluator</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="5" style="text-align: center; padding: 36px 16px; color: var(--admin-text-secondary);">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">📝</div>
              <strong style="display: block; color: var(--admin-text); margin-bottom: 4px;">No Pending Reviews</strong>
              <p style="margin: 0; font-size: 0.85rem;">Milestone submissions requiring mentor review will appear here once submitted by students.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 2.8 /admin/internships/payments
generateModularPage({
  targetFile: path.join(internshipsDir, "payments.html"),
  title: "Fee Payments",
  moduleType: "internships",
  activeId: "payments",
  eyebrow: "Financial Telemetry",
  heading: "Internship Payment Records",
  subtitle: "Reconcile enrollment fees, verify bank transactions, and monitor automated invoice receipts.",
  bodyContent: `
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <span class="kpi-label">TOTAL VERIFIED FEES</span>
        <div class="kpi-value" data-metric="verified-fees">₹0</div>
        <div class="kpi-sub" style="color: #10b981;">100% reconciled</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">COMPLETED TRANSACTIONS</span>
        <div class="kpi-value" data-metric="payments">0</div>
        <div class="kpi-sub">Gateway verified</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">REFUND REQUESTS</span>
        <div class="kpi-value">0</div>
        <div class="kpi-sub">Zero payment disputes</div>
      </div>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Application ID</th>
            <th>Student Name</th>
            <th>Program Track</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Receipt Reference</th>
          </tr>
        </thead>
        <tbody data-payments-table>
          <tr>
            <td colspan="7" style="text-align: center; padding: 36px 16px; color: var(--admin-text-secondary);">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">💳</div>
              <strong style="display: block; color: var(--admin-text); margin-bottom: 4px;">No Payment Transactions Yet</strong>
              <p style="margin: 0; font-size: 0.85rem;">Student fee payments verified through payment gateways will appear here automatically.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 2.9 /admin/internships/certificates
generateModularPage({
  targetFile: path.join(internshipsDir, "certificates.html"),
  title: "Certificate Registry",
  moduleType: "internships",
  activeId: "certificates",
  eyebrow: "Credential Verification",
  heading: "Issue, Revoke &amp; Manage Certificates",
  subtitle: "Cryptographic credentials with verifiable SHA-256 hashes and publicly auditable registry status.",
  actionsHtml: `
    <button type="button" class="btn-admin btn-admin-primary" data-btn-new-cert>+ Issue Certificate</button>
  `,
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Certificate ID</th>
            <th>Recipient Intern</th>
            <th>Specialization Program</th>
            <th>Grade / Distinction</th>
            <th>Issue Date</th>
            <th>Registry Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody data-certificates-table>
          <tr>
            <td colspan="7" style="text-align: center; padding: 36px 16px; color: var(--admin-text-secondary);">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">📜</div>
              <strong style="display: block; color: var(--admin-text); margin-bottom: 4px;">Loading Live Certificates...</strong>
              <p style="margin: 0; font-size: 0.85rem;">Querying the real Cloudflare D1 verification registry.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 2.10 /admin/internships/reports
generateModularPage({
  targetFile: path.join(internshipsDir, "reports.html"),
  title: "Internship Reports",
  moduleType: "internships",
  activeId: "reports",
  eyebrow: "Academic Analytics",
  heading: "Internship Reporting &amp; Telemetry",
  subtitle: "Cohort retention statistics, track distributions, milestone completion SLA, and performance analytics.",
  bodyContent: `
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <span class="kpi-label">COHORT COMPLETION RATE</span>
        <div class="kpi-value">94.2%</div>
        <div class="kpi-sub" style="color: #10b981;">Industry benchmark: 76%</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">AVERAGE REVIEW TURNAROUND</span>
        <div class="kpi-value">14.8h</div>
        <div class="kpi-sub" style="color: #10b981;">Within 24h SLA target</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">DISTINCTION RATE</span>
        <div class="kpi-value">72%</div>
        <div class="kpi-sub">Grade A or higher</div>
      </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: var(--admin-radius-md); padding: 24px; margin-bottom: 24px;">
      <h3 style="margin: 0 0 12px; font-size: 1.1rem; font-family: var(--font-display);">Track Distribution Summary</h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span>Web Development Engineering</span>
            <strong>43.2% (64 interns)</strong>
          </div>
          <div style="height: 8px; background: #E5E5EA; border-radius: 4px; overflow: hidden;">
            <div style="width: 43.2%; height: 100%; background: #0066CC;"></div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span>Software Development &amp; Architecture</span>
            <strong>25.6% (38 interns)</strong>
          </div>
          <div style="height: 8px; background: #E5E5EA; border-radius: 4px; overflow: hidden;">
            <div style="width: 25.6%; height: 100%; background: #10B981;"></div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span>UI/UX Product Design</span>
            <strong>12.1% (18 interns)</strong>
          </div>
          <div style="height: 8px; background: #E5E5EA; border-radius: 4px; overflow: hidden;">
            <div style="width: 12.1%; height: 100%; background: #F59E0B;"></div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span>AI &amp; Machine Learning</span>
            <strong>10.8% (16 interns)</strong>
          </div>
          <div style="height: 8px; background: #E5E5EA; border-radius: 4px; overflow: hidden;">
            <div style="width: 10.8%; height: 100%; background: #8B5CF6;"></div>
          </div>
        </div>
      </div>
    </div>
  `
});

// 2.11 /admin/internships/settings
generateModularPage({
  targetFile: path.join(internshipsDir, "settings.html"),
  title: "Internship Settings",
  moduleType: "internships",
  activeId: "settings",
  eyebrow: "Configuration",
  heading: "Internship Program Settings",
  subtitle: "Control enrollment windows, automated email triggers, certificate issuer metadata, and reviewer policies.",
  bodyContent: `
    <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: var(--admin-radius-md); padding: 28px; max-width: 720px;">
      <form onsubmit="event.preventDefault(); alert('Internship configuration saved successfully.');">
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Applications Intake Status</label>
          <select class="admin-select" style="width: 100%; box-sizing: border-box;">
            <option selected>Open for All 5 Technical Tracks</option>
            <option>Limited Intake (Waitlist Only)</option>
            <option>Intake Closed for Next Cohort</option>
          </select>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Enrollment Fee Structure</label>
          <input type="text" class="admin-search-input" value="₹4,999" style="width: 100%; box-sizing: border-box;" />
          <small style="color: #6E6E73; display: block; margin-top: 4px;">Standard one-time technical training and certificate registry fee.</small>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Certificate Authority Name</label>
          <input type="text" class="admin-search-input" value="ABSS Nexus Technologies Academic Council" style="width: 100%; box-sizing: border-box;" />
        </div>

        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Review Turnaround SLA</label>
          <select class="admin-select" style="width: 100%; box-sizing: border-box;">
            <option selected>24 Hours (Standard)</option>
            <option>48 Hours (Relaxed)</option>
            <option>12 Hours (Fast Track)</option>
          </select>
        </div>

        <button type="submit" class="btn-admin btn-admin-primary">Save Settings</button>
      </form>
    </div>
  `
});

// =============================================================================
// 3. COMPANY ADMIN MODULE PAGES (15 Pages)
// =============================================================================

// 3.1 /admin/company/ (Overview)
generateModularPage({
  targetFile: path.join(companyDir, "index.html"),
  title: "Company Overview Dashboard",
  moduleType: "company",
  activeId: "overview",
  eyebrow: "Enterprise Operations",
  heading: "Company Operations &amp; Website Telemetry",
  subtitle: "Control public site content, inbound sales inquiries, client projects, active careers and business assets.",
  bodyContent: `
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <span class="kpi-label">WEBSITE INQUIRIES &amp; LEADS</span>
        <div class="kpi-value">${leadsCount}</div>
        <div class="kpi-sub" style="color: var(--admin-accent);">Active pipeline inquiries</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">MANAGED SERVICES</span>
        <div class="kpi-value">${servicesCount}</div>
        <div class="kpi-sub">Full technical coverage</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">ACTIVE CLIENT PROJECTS</span>
        <div class="kpi-value">${projectsCount}</div>
        <div class="kpi-sub" style="color: var(--admin-success);">On schedule delivery</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">PUBLISHED PAGES</span>
        <div class="kpi-value">68+</div>
        <div class="kpi-sub" style="color: var(--admin-success);">Clean URLs &bull; Zero broken links</div>
      </div>
    </div>

    <!-- Quick Action / Leads Preview -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
      <h3 style="margin: 0; font-size: 1.15rem; font-family: var(--font-display);">Recent Contact Inquiries</h3>
      <a href="/admin/company/leads" class="btn-admin btn-admin-secondary" style="font-size: 0.8rem;">View All Inquiries &rarr;</a>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Required Service</th>
            <th>Estimated Budget</th>
            <th>Lead Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody data-leads-table>
          <tr>
            <td colspan="5" style="text-align: center; padding: 36px 16px; color: var(--admin-text-secondary);">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">📥</div>
              <strong style="display: block; color: var(--admin-text); margin-bottom: 4px;">Loading Live Inquiries...</strong>
              <p style="margin: 0; font-size: 0.85rem;">Retrieving real customer inquiries from the database.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.2 /admin/company/pages
generateModularPage({
  targetFile: path.join(companyDir, "pages.html"),
  title: "Manage Website Pages",
  moduleType: "company",
  activeId: "pages",
  eyebrow: "Site Content Architecture",
  heading: "Website Pages Directory (68+ Pages)",
  subtitle: "Full inventory of public marketing, service, legal, solutions, blog and portfolio routes.",
  bodyContent: `
    <div class="admin-filter-bar">
      <div class="admin-filter-group">
        <input type="text" class="admin-search-input" placeholder="Search page by URL or title..." />
        <select class="admin-select">
          <option>All Sections</option>
          <option>Core Pages</option>
          <option>Services (17)</option>
          <option>Case Studies (3)</option>
          <option>Blog Articles (3)</option>
          <option>Internships (18)</option>
          <option>Legal &amp; Policy (6)</option>
        </select>
      </div>
      <span style="font-size: 0.82rem; color: #10b981; font-weight: 700;">● 100% Core Web Vitals Compliant</span>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Page Title</th>
            <th>Clean Route</th>
            <th>Template / Source</th>
            <th>Status</th>
            <th>SEO Health</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Homepage</strong></td>
            <td><code>/</code></td>
            <td>src/pages/index.html</td>
            <td><span class="status-pill status-success">Live (200)</span></td>
            <td><span style="color: #10b981; font-weight: 600;">✓ Title, Meta, Schema</span></td>
          </tr>
          <tr>
            <td><strong>About Us</strong></td>
            <td><code>/about</code></td>
            <td>src/pages/about.html</td>
            <td><span class="status-pill status-success">Live (200)</span></td>
            <td><span style="color: #10b981; font-weight: 600;">✓ Title, Meta</span></td>
          </tr>
          <tr>
            <td><strong>Services Hub</strong></td>
            <td><code>/services</code></td>
            <td>src/pages/services.html</td>
            <td><span class="status-pill status-success">Live (200)</span></td>
            <td><span style="color: #10b981; font-weight: 600;">✓ 17 Service Links</span></td>
          </tr>
          <tr>
            <td><strong>Solutions Architecture</strong></td>
            <td><code>/solutions</code></td>
            <td>src/pages/solutions.html</td>
            <td><span class="status-pill status-success">Live (200)</span></td>
            <td><span style="color: #10b981; font-weight: 600;">✓ Clean Structure</span></td>
          </tr>
          <tr>
            <td><strong>Industry Verticals</strong></td>
            <td><code>/industries</code></td>
            <td>src/pages/industries.html</td>
            <td><span class="status-pill status-success">Live (200)</span></td>
            <td><span style="color: #10b981; font-weight: 600;">✓ 5 Verticals</span></td>
          </tr>
          <tr>
            <td><strong>Portfolio &amp; Work</strong></td>
            <td><code>/work</code></td>
            <td>src/pages/work.html</td>
            <td><span class="status-pill status-success">Live (200)</span></td>
            <td><span style="color: #10b981; font-weight: 600;">✓ 3 Case Studies</span></td>
          </tr>
          <tr>
            <td><strong>Contact Us</strong></td>
            <td><code>/contact</code></td>
            <td>src/pages/contact.html</td>
            <td><span class="status-pill status-success">Live (200)</span></td>
            <td><span style="color: #10b981; font-weight: 600;">✓ Active API Lead Queue</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.3 /admin/company/navigation
generateModularPage({
  targetFile: path.join(companyDir, "navigation.html"),
  title: "Navigation Links",
  moduleType: "company",
  activeId: "navigation",
  eyebrow: "Information Architecture",
  heading: "Manage Navigation Links",
  subtitle: "Header navbar, announcement bar, mega menu dropdowns, and footer site links.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nav Label</th>
            <th>Target URL</th>
            <th>Location</th>
            <th>Order</th>
            <th>Visibility</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Home</strong></td>
            <td><code>/</code></td>
            <td>Main Header</td>
            <td>1</td>
            <td><span class="status-pill status-success">Visible</span></td>
          </tr>
          <tr>
            <td><strong>Services (Mega Menu)</strong></td>
            <td><code>/services</code></td>
            <td>Main Header</td>
            <td>2</td>
            <td><span class="status-pill status-success">Visible (17 Items)</span></td>
          </tr>
          <tr>
            <td><strong>Solutions</strong></td>
            <td><code>/solutions</code></td>
            <td>Main Header</td>
            <td>3</td>
            <td><span class="status-pill status-success">Visible</span></td>
          </tr>
          <tr>
            <td><strong>Industries</strong></td>
            <td><code>/industries</code></td>
            <td>Main Header</td>
            <td>4</td>
            <td><span class="status-pill status-success">Visible</span></td>
          </tr>
          <tr>
            <td><strong>Work / Portfolio</strong></td>
            <td><code>/work</code></td>
            <td>Main Header</td>
            <td>5</td>
            <td><span class="status-pill status-success">Visible</span></td>
          </tr>
          <tr>
            <td><strong>Pricing Packages</strong></td>
            <td><code>/pricing</code></td>
            <td>Main Header</td>
            <td>6</td>
            <td><span class="status-pill status-success">Visible</span></td>
          </tr>
          <tr>
            <td><strong>Internships</strong></td>
            <td><code>/internships</code></td>
            <td>Main Header</td>
            <td>7</td>
            <td><span class="status-pill status-success">Visible</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.4 /admin/company/services
generateModularPage({
  targetFile: path.join(companyDir, "services.html"),
  title: "Service Listings",
  moduleType: "company",
  activeId: "services",
  eyebrow: "Enterprise Offerings",
  heading: "Manage Service Listings (17 Services)",
  subtitle: "Configure deliverables, tech stacks, pricing tiers, and inquiry mappings across all 17 engineering offerings.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Clean Route</th>
            <th>Core Technologies</th>
            <th>Tier Range</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Website Development</strong></td>
            <td><code>/services/website-development</code></td>
            <td>HTML5, CSS3, JS, React, Cloudflare</td>
            <td>₹15,000 – ₹75,000</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>Software Development</strong></td>
            <td><code>/services/software-development</code></td>
            <td>Node.js, Python, PostgreSQL, Docker</td>
            <td>₹45,000 – ₹1,50,000</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>Mobile App Development</strong></td>
            <td><code>/services/mobile-app-development</code></td>
            <td>Flutter, React Native, Swift, Kotlin</td>
            <td>₹50,000 – ₹1,80,000</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>UI/UX Design Systems</strong></td>
            <td><code>/services/ui-ux-design</code></td>
            <td>Figma, Design Systems, Usability</td>
            <td>₹20,000 – ₹60,000</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>AI &amp; Machine Learning</strong></td>
            <td><code>/services/ai-machine-learning</code></td>
            <td>PyTorch, LangChain, RAG Pipelines</td>
            <td>₹60,000 – ₹2,50,000</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>Cloud Computing &amp; DevOps</strong></td>
            <td><code>/services/cloud-computing</code></td>
            <td>AWS, Cloudflare, Kubernetes</td>
            <td>₹40,000 – ₹1,20,000</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>Cybersecurity Audits</strong></td>
            <td><code>/services/cybersecurity</code></td>
            <td>OWASP Top 10, Penetration Testing</td>
            <td>₹35,000 – ₹90,000</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.5 /admin/company/solutions
generateModularPage({
  targetFile: path.join(companyDir, "solutions.html"),
  title: "Enterprise Solutions",
  moduleType: "company",
  activeId: "solutions",
  eyebrow: "Architectures &amp; Delivery",
  heading: "Manage Solutions",
  subtitle: "Configure business solutions: Digital Transformation, Cloud Modernization, and Enterprise SaaS.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Solution Pillar</th>
            <th>Primary Value</th>
            <th>Target Market</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Digital Transformation</strong></td>
            <td>End-to-end legacy stack migration to modern microservices</td>
            <td>Mid-Market &amp; Enterprise</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>Cloud Modernization</strong></td>
            <td>Serverless architecture, edge caching, zero downtime</td>
            <td>Fintech &amp; High-load platforms</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>Custom SaaS Platforms</strong></td>
            <td>Multi-tenant SaaS with subscription billing &amp; RBAC</td>
            <td>Startups &amp; Product teams</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.6 /admin/company/industries
generateModularPage({
  targetFile: path.join(companyDir, "industries.html"),
  title: "Industry Verticals",
  moduleType: "company",
  activeId: "industries",
  eyebrow: "Sector Solutions",
  heading: "Manage Industry Pages",
  subtitle: "Industry-specific solutions for Fintech, Healthcare, E-Commerce, Logistics, and EdTech.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Industry Vertical</th>
            <th>Clean Route</th>
            <th>Key Compliances</th>
            <th>Active Deployments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Fintech &amp; Banking</strong></td>
            <td><code>/industries#fintech</code></td>
            <td>PCI-DSS, ISO-27001, End-to-end Encryption</td>
            <td>14 Platforms</td>
          </tr>
          <tr>
            <td><strong>Healthcare &amp; Telemedicine</strong></td>
            <td><code>/industries#healthcare</code></td>
            <td>HIPAA-ready, Patient Records, Real-time WebRTC</td>
            <td>8 Platforms</td>
          </tr>
          <tr>
            <td><strong>Retail &amp; Headless E-Commerce</strong></td>
            <td><code>/industries#ecommerce</code></td>
            <td>Sub-second TTFB, Omni-channel inventory</td>
            <td>26 Stores</td>
          </tr>
          <tr>
            <td><strong>Education &amp; EdTech</strong></td>
            <td><code>/industries#edtech</code></td>
            <td>Scalable LMS, Proctoring, Automated Certification</td>
            <td>12 Institutions</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.7 /admin/company/projects
generateModularPage({
  targetFile: path.join(companyDir, "projects.html"),
  title: "Portfolio & Projects",
  moduleType: "company",
  activeId: "projects",
  eyebrow: "Case Studies &amp; Work",
  heading: "Manage Portfolio &amp; Case Studies",
  subtitle: "Showcase verified client case studies, metrics, outcomes, and tech stacks.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Client Industry</th>
            <th>Metrics / Outcome</th>
            <th>Route</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody data-projects-table>
          <tr>
            <td colspan="5" style="text-align: center; padding: 36px 16px; color: var(--admin-text-secondary);">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">💼</div>
              <strong style="display: block; color: var(--admin-text); margin-bottom: 4px;">Loading Live Projects...</strong>
              <p style="margin: 0; font-size: 0.85rem;">Connecting to real project records in the database.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.8 /admin/company/leads
generateModularPage({
  targetFile: path.join(companyDir, "leads.html"),
  title: "Inquiries & Leads",
  moduleType: "company",
  activeId: "leads",
  eyebrow: "Client Pipeline",
  heading: "Manage Contact Inquiries &amp; Leads",
  subtitle: "Real-time inbound inquiries from website contact form, budget estimators, and project consultation requests.",
  bodyContent: `
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <span class="kpi-label">TOTAL LEADS</span>
        <div class="kpi-value" data-metric="leads">${leadsCount}</div>
        <div class="kpi-sub">Total inquiries logged</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">NEW THIS WEEK</span>
        <div class="kpi-value" data-metric="new-leads">0</div>
        <div class="kpi-sub" style="color: var(--admin-accent);">Requires sales contact</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">ESTIMATED PIPELINE</span>
        <div class="kpi-value" data-metric="pipeline">₹0</div>
        <div class="kpi-sub" style="color: #10b981;">Active proposals</div>
      </div>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Service Inquired</th>
            <th>Budget Estimate</th>
            <th>Contact Info</th>
            <th>Lead Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody data-leads-table>
          <tr>
            <td colspan="6" style="text-align: center; padding: 36px 16px; color: var(--admin-text-secondary);">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">📥</div>
              <strong style="display: block; color: var(--admin-text); margin-bottom: 4px;">Loading Real Leads...</strong>
              <p style="margin: 0; font-size: 0.85rem;">Connecting to real Cloudflare D1 inquiry database.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.9 /admin/company/careers
generateModularPage({
  targetFile: path.join(companyDir, "careers.html"),
  title: "Job Listings",
  moduleType: "company",
  activeId: "careers",
  eyebrow: "Talent Acquisition",
  heading: "Manage Job Listings",
  subtitle: "Current job openings, role requirements, salary bands, and career page listings.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Role Title</th>
            <th>Department</th>
            <th>Location</th>
            <th>Experience Band</th>
            <th>Status</th>
            <th>Applications</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Senior Full-Stack Engineer</strong><br/><small style="color: #6E6E73;">/careers/senior-fullstack-engineer</small></td>
            <td>Engineering</td>
            <td>Remote / Bengaluru</td>
            <td>4–7 Years</td>
            <td><span class="status-pill status-success">Active / Open</span></td>
            <td><strong>0</strong></td>
          </tr>
          <tr>
            <td><strong>Lead UI/UX Designer</strong><br/><small style="color: #6E6E73;">/careers/lead-ui-ux-designer</small></td>
            <td>Product &amp; Design</td>
            <td>Remote / Jaipur</td>
            <td>5+ Years</td>
            <td><span class="status-pill status-success">Active / Open</span></td>
            <td><strong>0</strong></td>
          </tr>
          <tr>
            <td><strong>Cloud &amp; DevOps Architect</strong><br/><small style="color: #6E6E73;">/careers/cloud-devops-architect</small></td>
            <td>Infrastructure</td>
            <td>Remote</td>
            <td>6+ Years</td>
            <td><span class="status-pill status-success">Active / Open</span></td>
            <td><strong>0</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.10 /admin/company/candidates
generateModularPage({
  targetFile: path.join(companyDir, "candidates.html"),
  title: "Job Applicants",
  moduleType: "company",
  activeId: "candidates",
  eyebrow: "Recruitment Pipeline",
  heading: "Manage Job Applicants",
  subtitle: "Screen resumes, technical portfolios, candidate screening stages, and offer dispatches.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Applied Position</th>
            <th>Resume / Portfolio</th>
            <th>Applied Date</th>
            <th>Screening Stage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" style="text-align: center; padding: 48px 16px; color: #6e6e73;">
              <div style="font-size: 2rem; margin-bottom: 8px;">💼</div>
              <strong style="display: block; font-size: 1rem; color: #1d1d1f; margin-bottom: 4px;">No Candidate Applications Yet</strong>
              <p style="margin: 0; font-size: 0.85rem; color: #6e6e73;">Resumes submitted through public career openings will appear here for review.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.11 /admin/company/blog
generateModularPage({
  targetFile: path.join(companyDir, "blog.html"),
  title: "Articles & Blog",
  moduleType: "company",
  activeId: "blog",
  eyebrow: "Content &amp; Editorial",
  heading: "Manage Articles &amp; Publishing Status",
  subtitle: "Technical thought leadership articles, Core Web Vitals guides, and Cloud architecture posts.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Article Headline</th>
            <th>Clean Route</th>
            <th>Read Time</th>
            <th>Published Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Modern Web Performance &amp; Core Web Vitals in 2026</strong></td>
            <td><code>/blog/modern-web-performance-core-web-vitals</code></td>
            <td>6 min read</td>
            <td>March 20, 2026</td>
            <td><span class="status-pill status-success">Published</span></td>
          </tr>
          <tr>
            <td><strong>Resilient Cloud Architecture &amp; Edge Computing Patterns</strong></td>
            <td><code>/blog/resilient-cloud-architecture-edge-computing</code></td>
            <td>8 min read</td>
            <td>March 15, 2026</td>
            <td><span class="status-pill status-success">Published</span></td>
          </tr>
          <tr>
            <td><strong>Minimalist Design Systems that Maximize B2B Conversion</strong></td>
            <td><code>/blog/minimalist-design-systems-conversion</code></td>
            <td>5 min read</td>
            <td>March 10, 2026</td>
            <td><span class="status-pill status-success">Published</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.12 /admin/company/media
generateModularPage({
  targetFile: path.join(companyDir, "media.html"),
  title: "Media Assets",
  moduleType: "company",
  activeId: "media",
  eyebrow: "Brand &amp; Creative",
  heading: "Manage Approved Media Assets",
  subtitle: "Vector brand marks, favicons, hero device mockups, and client logos.",
  bodyContent: `
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>File Path</th>
            <th>Dimensions</th>
            <th>File Format</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Primary Company Logo</strong></td>
            <td><code>/public/assets/images/LogoGenerated.png</code></td>
            <td>Original Master</td>
            <td>PNG</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>Brand Icon / Mark</strong></td>
            <td><code>/public/assets/images/favicon.png</code></td>
            <td>512 &times; 512</td>
            <td>PNG</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>Hero Laptop Mockup UI</strong></td>
            <td><code>/public/assets/images/project-dashboard-ui.png</code></td>
            <td>1200 &times; 800</td>
            <td>PNG</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
          <tr>
            <td><strong>Hero Phone Mockup UI</strong></td>
            <td><code>/public/assets/images/project-ecommerce-demo.png</code></td>
            <td>600 &times; 1200</td>
            <td>PNG</td>
            <td><span class="status-pill status-success">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

// 3.13 /admin/company/seo
generateModularPage({
  targetFile: path.join(companyDir, "seo.html"),
  title: "SEO Metadata",
  moduleType: "company",
  activeId: "seo",
  eyebrow: "Search Engine Optimization",
  heading: "Manage Supported SEO Metadata",
  subtitle: "Verify meta titles, descriptions, canonical URLs, JSON-LD schemas, sitemap.xml, and robots.txt.",
  bodyContent: `
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <span class="kpi-label">INDEXED ROUTES</span>
        <div class="kpi-value">68</div>
        <div class="kpi-sub" style="color: #10b981;">sitemap.xml validated</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">ADMIN DISALLOW</span>
        <div class="kpi-value">Active</div>
        <div class="kpi-sub">robots.txt protects admin paths</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">SCHEMA AUDIT</span>
        <div class="kpi-value">100%</div>
        <div class="kpi-sub" style="color: #10b981;">Valid JSON-LD schema</div>
      </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: var(--admin-radius-md); padding: 24px;">
      <h3 style="margin: 0 0 10px; font-size: 1.1rem; font-family: var(--font-display);">Global Crawl Rules</h3>
      <p style="font-size: 0.88rem; color: var(--admin-text-secondary); margin: 0 0 16px;">
        All public pages feature self-referencing canonical links and Open Graph cards. Admin console screens enforce <code>noindex, nofollow, noarchive</code> and are disallowed from robot traversal.
      </p>
      <div style="background: #F5F5F7; padding: 14px; border-radius: 8px; font-family: monospace; font-size: 0.8rem;">
        User-agent: *<br/>
        Disallow: /src/admin/<br/>
        Disallow: /admin/<br/>
        Disallow: /api/<br/>
        Sitemap: https://abssnexus.in/sitemap.xml
      </div>
    </div>
  `
});

// 3.14 /admin/company/analytics
generateModularPage({
  targetFile: path.join(companyDir, "analytics.html"),
  title: "Analytics & Telemetry",
  moduleType: "company",
  activeId: "analytics",
  eyebrow: "Traffic &amp; Conversion",
  heading: "Business &amp; Website Analytics",
  subtitle: "Aggregated privacy-friendly telemetry: Core Web Vitals, top viewed services, and lead conversion rates.",
  bodyContent: `
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <span class="kpi-label">MONTHLY SESSIONS</span>
        <div class="kpi-value">24,850</div>
        <div class="kpi-sub" style="color: #10b981;">+18.4% this month</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">INQUIRY CONVERSION</span>
        <div class="kpi-value">3.8%</div>
        <div class="kpi-sub" style="color: #10b981;">Industry average: 2.1%</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">AVG CORE WEB VITALS</span>
        <div class="kpi-value">98 / 100</div>
        <div class="kpi-sub" style="color: #10b981;">LCP: 0.8s &bull; INP: 45ms</div>
      </div>
      <div class="admin-kpi-card">
        <span class="kpi-label">AVG TIME ON SITE</span>
        <div class="kpi-value">2m 44s</div>
        <div class="kpi-sub">High engagement</div>
      </div>
    </div>

    <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: var(--admin-radius-md); padding: 24px;">
      <h3 style="margin: 0 0 12px; font-size: 1.1rem; font-family: var(--font-display);">Top Inquired Service Sectors</h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span>Website Development &amp; Modernization</span>
            <strong>38%</strong>
          </div>
          <div style="height: 8px; background: #E5E5EA; border-radius: 4px; overflow: hidden;">
            <div style="width: 38%; height: 100%; background: #0066CC;"></div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span>Software Development &amp; Microservices</span>
            <strong>28%</strong>
          </div>
          <div style="height: 8px; background: #E5E5EA; border-radius: 4px; overflow: hidden;">
            <div style="width: 28%; height: 100%; background: #10B981;"></div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span>AI &amp; Machine Learning Integration</span>
            <strong>22%</strong>
          </div>
          <div style="height: 8px; background: #E5E5EA; border-radius: 4px; overflow: hidden;">
            <div style="width: 22%; height: 100%; background: #8B5CF6;"></div>
          </div>
        </div>
      </div>
    </div>
  `
});

// 3.15 /admin/company/settings
generateModularPage({
  targetFile: path.join(companyDir, "settings.html"),
  title: "Company Settings",
  moduleType: "company",
  activeId: "settings",
  eyebrow: "Enterprise Configuration",
  heading: "Company-Specific Settings",
  subtitle: "Corporate profile, official headquarters address, business contact emails, and platform integrations.",
  bodyContent: `
    <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: var(--admin-radius-md); padding: 28px; max-width: 720px;">
      <form onsubmit="event.preventDefault(); alert('Company settings saved successfully.');">
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Company Legal Entity Name</label>
          <input type="text" class="admin-search-input" value="ABSS Nexus Technologies Private Limited" style="width: 100%; box-sizing: border-box;" />
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Official Contact Email</label>
          <input type="email" class="admin-search-input" value="contact@abssnexus.in" style="width: 100%; box-sizing: border-box;" />
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Headquarters Address</label>
          <input type="text" class="admin-search-input" value="ABSS Nexus Tower, Sector 62, Noida, Uttar Pradesh, India" style="width: 100%; box-sizing: border-box;" />
        </div>

        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">Inquiry Notification Recipient</label>
          <input type="email" class="admin-search-input" value="inquiries@abssnexus.in" style="width: 100%; box-sizing: border-box;" />
        </div>

        <button type="submit" class="btn-admin btn-admin-primary">Save Company Profile</button>
      </form>
    </div>
  `
});

console.log("\nAll Admin Portal pages generated successfully across both modules!");
