const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const includeAdmin = process.env.ABSS_EXCLUDE_ADMIN !== "true";
const excludedPublicDirs = new Set([path.join("src", "templates")]);

const copyRecursive = (source, destination) => {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    const relativeSource = path.relative(rootDir, source);
    if (excludedPublicDirs.has(relativeSource)) {
      return;
    }

    if (!includeAdmin && relativeSource === path.join("src", "admin")) {
      return;
    }

    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(destination, entry));
    }
    return;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
};

const copyTextFile = (fileName, transform = (value) => value) => {
  const source = path.join(rootDir, fileName);
  if (!fs.existsSync(source)) return;
  fs.writeFileSync(path.join(distDir, fileName), transform(fs.readFileSync(source, "utf8")));
};

fs.rmSync(distDir, { recursive: true, force: true });

for (const entry of ["src", "public", "internships"]) {
  if (fs.existsSync(path.join(rootDir, entry))) {
    copyRecursive(path.join(rootDir, entry), path.join(distDir, entry));
  }
}

const publicPages = [
  ["src/pages/index.html", "index.html"],
  ["src/pages/about.html", "about.html"],
  ["src/pages/services.html", "services.html"],
  ["src/pages/solutions.html", "solutions.html"],
  ["src/pages/industries.html", "industries.html"],
  ["src/pages/projects.html", "projects.html"],
  ["src/pages/contact.html", "contact.html"],
  ["src/pages/pricing.html", "pricing.html"],
  ["src/pages/careers.html", "careers.html"],
  ["src/pages/blog.html", "blog.html"],
  ["src/pages/blog-modern-web-performance.html", path.join("blog", "modern-web-performance-core-web-vitals.html")],
  ["src/pages/blog-resilient-cloud-architecture.html", path.join("blog", "resilient-cloud-architecture-edge-computing.html")],
  ["src/pages/blog-minimalist-design-systems.html", path.join("blog", "minimalist-design-systems-conversion.html")],
  ["src/pages/faq.html", "faq.html"],
  ["src/pages/cookie-policy.html", "cookie-policy.html"],
  ["src/pages/privacy-policy.html", "privacy-policy.html"],
  ["src/pages/terms-conditions.html", "terms-and-conditions.html"],
  ["src/pages/disclaimer.html", "disclaimer.html"],
  ["src/pages/refund-policy.html", "refund-policy.html"],
  ["src/pages/support-policy.html", "support-policy.html"],
  ["src/pages/sitemap.html", "sitemap.html"],
  ["src/pages/service-website-development.html", path.join("services", "website-development.html")],
  ["src/pages/service-software-development.html", path.join("services", "software-development.html")],
  ["src/pages/service-mobile-app-development.html", path.join("services", "mobile-app-development.html")],
  ["src/pages/service-ui-ux-design.html", path.join("services", "ui-ux-design.html")],
  ["src/pages/service-ai-machine-learning.html", path.join("services", "ai-machine-learning.html")],
  ["src/pages/service-cloud-computing.html", path.join("services", "cloud-computing.html")],
  ["src/pages/service-cybersecurity.html", path.join("services", "cybersecurity.html")],
  ["src/pages/service-data-analytics-bi.html", path.join("services", "data-analytics-bi.html")],
  ["src/pages/service-digital-marketing-seo.html", path.join("services", "digital-marketing-seo.html")],
  ["src/pages/service-ecommerce-development.html", path.join("services", "ecommerce-development.html")],
  ["src/pages/service-saas-development.html", path.join("services", "saas-development.html")],
  ["src/pages/service-api-integration.html", path.join("services", "api-integration.html")],
  ["src/pages/service-software-testing-qa.html", path.join("services", "software-testing-qa.html")],
  ["src/pages/service-it-consulting.html", path.join("services", "it-consulting.html")],
  ["src/pages/service-website-maintenance.html", path.join("services", "website-maintenance.html")],
  ["src/pages/internships.html", "internships.html"],
  ["src/pages/internships-about.html", path.join("internships", "about.html")],
  ["src/pages/internships-details.html", path.join("internships", "details.html")],
  ["src/pages/internships-contact.html", path.join("internships", "contact.html")],
  ["src/pages/internships-privacy-policy.html", path.join("internships", "privacy-policy.html")],
  ["src/pages/internships-terms-conditions.html", path.join("internships", "terms-and-conditions.html")],
  ["src/pages/internships-programs.html", path.join("internships", "programs.html")],
  ["src/pages/internships-program-web-development.html", path.join("internships", "programs", "web-development.html")],
  ["src/pages/internships-program-software-development.html", path.join("internships", "programs", "software-development.html")],
  ["src/pages/internships-program-ui-ux-design.html", path.join("internships", "programs", "ui-ux-design.html")],
  ["src/pages/internships-program-ai-machine-learning.html", path.join("internships", "programs", "ai-machine-learning.html")],
  ["src/pages/internships-program-cloud-devops.html", path.join("internships", "programs", "cloud-devops.html")],
  ["src/pages/internships-how-it-works.html", path.join("internships", "how-it-works.html")],
  ["src/pages/internships-faq.html", path.join("internships", "faq.html")],
  ["src/pages/internships-support.html", path.join("internships", "support.html")],
  ["src/pages/internships-register.html", path.join("internships", "register.html")],
  ["src/pages/internships-login.html", path.join("internships", "login.html")],
  ["src/pages/internships-verify-email.html", path.join("internships", "verify-email.html")],
  ["src/pages/internships-forgot-password.html", path.join("internships", "forgot-password.html")],
  ["src/pages/internships-reset-password.html", path.join("internships", "reset-password.html")],
  ["src/pages/internships-dashboard.html", path.join("internships", "dashboard.html")],
  ["src/pages/work.html", "work.html"],
  ["src/pages/work-fintech-payment-gateway.html", path.join("work", "fintech-payment-gateway.html")],
  ["src/pages/work-healthcare-telemedicine.html", path.join("work", "healthcare-telemedicine-platform.html")],
  ["src/pages/work-ecommerce-headless.html", path.join("work", "ecommerce-headless-storefront.html")],
  ["src/pages/service-managed-it-support.html", path.join("services", "managed-it-support.html")],
  ["src/pages/career-senior-fullstack-engineer.html", path.join("careers", "senior-fullstack-engineer.html")],
  ["src/pages/career-lead-ui-ux-designer.html", path.join("careers", "lead-ui-ux-designer.html")],
  ["src/pages/career-cloud-devops-architect.html", path.join("careers", "cloud-devops-architect.html")],
  ["src/pages/internships-application-status.html", path.join("internships", "application-status.html")],
  ["src/pages/internships-payment-status.html", path.join("internships", "payment-status.html")],
  ["src/pages/verify-certificate.html", "verify-certificate.html"],
  ["src/pages/register.html", "register.html"],
  ["src/pages/login.html", "login.html"],
  ["src/pages/verify-email.html", "verify-email.html"],
  ["src/pages/forgot-password.html", "forgot-password.html"],
  ["src/pages/reset-password.html", "reset-password.html"],
  ["src/pages/student-dashboard.html", path.join("student", "dashboard.html")],
  ["src/pages/student-profile.html", path.join("student", "profile.html")],
  ["src/pages/student-applications.html", path.join("student", "applications.html")],
  ["src/pages/student-internship.html", path.join("student", "internship.html")],
  ["src/pages/student-tasks.html", path.join("student", "tasks.html")],
  ["src/pages/student-task-detail.html", path.join("student", "tasks", "task-1.html")],
  ["src/pages/student-submissions.html", path.join("student", "submissions.html")],
  ["src/pages/student-submit-work.html", path.join("student", "submit-work.html")],
  ["src/pages/student-certificates.html", path.join("student", "certificates.html")],
  ["src/pages/student-settings.html", path.join("student", "settings.html")],
  ["src/pages/404.html", "404.html"],
];

for (const [sourceRelative, destinationRelative] of publicPages) {
  const source = path.join(rootDir, sourceRelative);
  const destination = path.join(distDir, destinationRelative);

  if (!fs.existsSync(source)) {
    throw new Error(`Required public page missing: ${sourceRelative}`);
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

if (includeAdmin) {
  const adminPageMappings = [
    ["src/admin/index.html", path.join("admin", "index.html")],
    ["src/admin/internships/index.html", path.join("admin", "internships", "index.html")],
    ["src/admin/internships/programs.html", path.join("admin", "internships", "programs.html")],
    ["src/admin/internships/applications.html", path.join("admin", "internships", "applications.html")],
    ["src/admin/internships/students.html", path.join("admin", "internships", "students.html")],
    ["src/admin/internships/tasks.html", path.join("admin", "internships", "tasks.html")],
    ["src/admin/internships/submissions.html", path.join("admin", "internships", "submissions.html")],
    ["src/admin/internships/reviews.html", path.join("admin", "internships", "reviews.html")],
    ["src/admin/internships/payments.html", path.join("admin", "internships", "payments.html")],
    ["src/admin/internships/certificates.html", path.join("admin", "internships", "certificates.html")],
    ["src/admin/internships/reports.html", path.join("admin", "internships", "reports.html")],
    ["src/admin/internships/settings.html", path.join("admin", "internships", "settings.html")],
    ["src/admin/company/index.html", path.join("admin", "company", "index.html")],
    ["src/admin/company/pages.html", path.join("admin", "company", "pages.html")],
    ["src/admin/company/navigation.html", path.join("admin", "company", "navigation.html")],
    ["src/admin/company/services.html", path.join("admin", "company", "services.html")],
    ["src/admin/company/solutions.html", path.join("admin", "company", "solutions.html")],
    ["src/admin/company/industries.html", path.join("admin", "company", "industries.html")],
    ["src/admin/company/projects.html", path.join("admin", "company", "projects.html")],
    ["src/admin/company/leads.html", path.join("admin", "company", "leads.html")],
    ["src/admin/company/careers.html", path.join("admin", "company", "careers.html")],
    ["src/admin/company/candidates.html", path.join("admin", "company", "candidates.html")],
    ["src/admin/company/blog.html", path.join("admin", "company", "blog.html")],
    ["src/admin/company/media.html", path.join("admin", "company", "media.html")],
    ["src/admin/company/seo.html", path.join("admin", "company", "seo.html")],
    ["src/admin/company/analytics.html", path.join("admin", "company", "analytics.html")],
    ["src/admin/company/settings.html", path.join("admin", "company", "settings.html")],

    // Legacy mappings
    ["src/admin/admin-dashboard.html", path.join("admin", "dashboard.html")],
    ["src/admin/admin-dashboard.html", path.join("admin", "admin-dashboard.html")],
    ["src/admin/admin-programs.html", path.join("admin", "programs.html")],
    ["src/admin/admin-programs.html", path.join("admin", "admin-programs.html")],
    ["src/admin/admin-applications.html", path.join("admin", "applications.html")],
    ["src/admin/admin-applications.html", path.join("admin", "admin-applications.html")],
    ["src/admin/admin-students.html", path.join("admin", "students.html")],
    ["src/admin/admin-students.html", path.join("admin", "admin-students.html")],
    ["src/admin/admin-tasks.html", path.join("admin", "tasks.html")],
    ["src/admin/admin-tasks.html", path.join("admin", "admin-tasks.html")],
    ["src/admin/admin-submissions.html", path.join("admin", "submissions.html")],
    ["src/admin/admin-submissions.html", path.join("admin", "admin-submissions.html")],
    ["src/admin/admin-reviews.html", path.join("admin", "reviews.html")],
    ["src/admin/admin-reviews.html", path.join("admin", "admin-reviews.html")],
    ["src/admin/admin-payments.html", path.join("admin", "payments.html")],
    ["src/admin/admin-payments.html", path.join("admin", "admin-payments.html")],
    ["src/admin/admin-certificates.html", path.join("admin", "certificates.html")],
    ["src/admin/admin-certificates.html", path.join("admin", "admin-certificates.html")],
    ["src/admin/admin-users.html", path.join("admin", "users.html")],
    ["src/admin/admin-users.html", path.join("admin", "admin-users.html")],
    ["src/admin/admin-audit-logs.html", path.join("admin", "audit-logs.html")],
    ["src/admin/admin-audit-logs.html", path.join("admin", "admin-audit-logs.html")],
    ["src/admin/admin-settings.html", path.join("admin", "settings.html")],
    ["src/admin/admin-settings.html", path.join("admin", "admin-settings.html")],
    ["src/admin/admin-login.html", path.join("admin", "login.html")],
    ["src/admin/admin-login.html", path.join("admin", "admin-login.html")],
    ["src/admin/admin-leads.html", path.join("admin", "leads.html")],
    ["src/admin/admin-leads.html", path.join("admin", "admin-leads.html")],
    ["src/admin/admin-projects.html", path.join("admin", "projects.html")],
    ["src/admin/admin-projects.html", path.join("admin", "admin-projects.html")],
    ["src/admin/admin-clients.html", path.join("admin", "clients.html")],
    ["src/admin/admin-clients.html", path.join("admin", "admin-clients.html")],
    ["src/admin/admin-support.html", path.join("admin", "support.html")],
    ["src/admin/admin-support.html", path.join("admin", "admin-support.html")],
    ["src/admin/admin-pricing.html", path.join("admin", "pricing.html")],
    ["src/admin/admin-pricing.html", path.join("admin", "admin-pricing.html")],
  ];
  for (const [srcRel, dstRel] of adminPageMappings) {
    const s = path.join(rootDir, srcRel);
    const d = path.join(distDir, dstRel);
    if (fs.existsSync(s)) {
      fs.mkdirSync(path.dirname(d), { recursive: true });
      fs.copyFileSync(s, d);
    }
  }
}

copyTextFile("robots.txt");
copyTextFile("sitemap.xml");
if (fs.existsSync(path.join(rootDir, "favicon.ico"))) {
  fs.copyFileSync(path.join(rootDir, "favicon.ico"), path.join(distDir, "favicon.ico"));
}
copyTextFile("_headers", (content) => (includeAdmin ? content : content.replace(/^\/(?:src\/)?admin[^\n]*(?:\n  .*)*\n?/gm, "")));
copyTextFile("_redirects", (content) => (includeAdmin ? content : content.replace(/^\/(?:src\/)?admin[^\n]*\n/gm, "")));

// =========================================================================
// CSS Optimization, @import Inlining & Minification Pipeline
// =========================================================================
const minifyCssString = (css) => {
  let min = css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s*([\{\};,>~])\s*/g, "$1")
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim();

  // Ensure CSS spec compliance: operators + and - inside calc() must always have surrounding whitespace
  min = min.replace(/calc\(([^)]+)\)/g, (m, expr) => {
    const fixed = expr
      .replace(/([0-9%a-z]+)\+([0-9%a-z]+)/gi, "$1 + $2")
      .replace(/([0-9%a-z]+)\-([0-9%a-z]+)/gi, "$1 - $2");
    return `calc(${fixed})`;
  });

  return min;
};

const inlineCssImports = (entryFilePath) => {
  let content = fs.readFileSync(entryFilePath, "utf8");
  const baseDir = path.dirname(entryFilePath);

  content = content.replace(/@import\s+url\(["\x27]([^"\x27]+)["\x27]\)\s*;/g, (match, relPath) => {
    const absPath = path.resolve(baseDir, relPath);
    if (fs.existsSync(absPath)) {
      return "\n" + inlineCssImports(absPath) + "\n";
    }
    return match;
  });

  return content;
};

const srcStylesCss = path.join(rootDir, "src", "styles", "styles.css");
if (fs.existsSync(srcStylesCss)) {
  const inlinedRaw = inlineCssImports(srcStylesCss);
  const minified = minifyCssString(inlinedRaw);

  // Write minified bundle to src and dist
  fs.writeFileSync(path.join(rootDir, "src", "styles", "styles.min.css"), minified);
  fs.writeFileSync(path.join(distDir, "src", "styles", "styles.min.css"), minified);
  // Also optimize dist styles.css so existing <link> tags benefit immediately
  fs.writeFileSync(path.join(distDir, "src", "styles", "styles.css"), minified);

  // Build split modular CSS components
  const componentsDir = path.join(rootDir, "src", "styles", "components");
  if (fs.existsSync(componentsDir)) {
    const compFiles = fs.readdirSync(componentsDir);
    for (const f of compFiles) {
      if (f.endsWith(".css")) {
        const compRaw = fs.readFileSync(path.join(componentsDir, f), "utf8");
        const compMin = minifyCssString(compRaw);
        const baseName = f.replace(/\.css$/, "");
        fs.writeFileSync(path.join(distDir, "src", "styles", `${baseName}.min.css`), compMin);
      }
    }
  }

  console.log(`CSS optimization complete: Inlined @import waterfall, generated styles.min.css (${(minified.length / 1024).toFixed(1)} KB) and modular component bundles.`);
}

const requiredBuildFiles = [
  "index.html",
  "about.html",
  "services.html",
  "solutions.html",
  "industries.html",
  "projects.html",
  "work.html",
  "contact.html",
  "pricing.html",
  "careers.html",
  "blog.html",
  path.join("blog", "modern-web-performance-core-web-vitals.html"),
  path.join("blog", "resilient-cloud-architecture-edge-computing.html"),
  path.join("blog", "minimalist-design-systems-conversion.html"),
  path.join("work", "fintech-payment-gateway.html"),
  path.join("work", "healthcare-telemedicine-platform.html"),
  path.join("work", "ecommerce-headless-storefront.html"),
  path.join("careers", "senior-fullstack-engineer.html"),
  path.join("careers", "lead-ui-ux-designer.html"),
  path.join("careers", "cloud-devops-architect.html"),
  "faq.html",
  "cookie-policy.html",
  "privacy-policy.html",
  "terms-and-conditions.html",
  "disclaimer.html",
  "refund-policy.html",
  "support-policy.html",
  "sitemap.html",
  "verify-certificate.html",
  "register.html",
  "login.html",
  "verify-email.html",
  "forgot-password.html",
  "reset-password.html",
  "404.html",
  path.join("services", "website-development.html"),
  path.join("services", "software-development.html"),
  path.join("services", "mobile-app-development.html"),
  path.join("services", "ui-ux-design.html"),
  path.join("services", "ai-machine-learning.html"),
  path.join("services", "cloud-computing.html"),
  path.join("services", "cybersecurity.html"),
  path.join("services", "data-analytics-bi.html"),
  path.join("services", "digital-marketing-seo.html"),
  path.join("services", "ecommerce-development.html"),
  path.join("services", "saas-development.html"),
  path.join("services", "api-integration.html"),
  path.join("services", "software-testing-qa.html"),
  path.join("services", "it-consulting.html"),
  path.join("services", "website-maintenance.html"),
  path.join("services", "managed-it-support.html"),
  "internships.html",
  path.join("internships", "about.html"),
  path.join("internships", "details.html"),
  path.join("internships", "contact.html"),
  path.join("internships", "privacy-policy.html"),
  path.join("internships", "terms-and-conditions.html"),
  path.join("internships", "programs.html"),
  path.join("internships", "programs", "web-development.html"),
  path.join("internships", "programs", "software-development.html"),
  path.join("internships", "programs", "ui-ux-design.html"),
  path.join("internships", "programs", "ai-machine-learning.html"),
  path.join("internships", "programs", "cloud-devops.html"),
  path.join("internships", "how-it-works.html"),
  path.join("internships", "faq.html"),
  path.join("internships", "support.html"),
  path.join("internships", "application-status.html"),
  path.join("internships", "payment-status.html"),
  path.join("student", "dashboard.html"),
  path.join("student", "profile.html"),
  path.join("student", "applications.html"),
  path.join("student", "internship.html"),
  path.join("student", "tasks.html"),
  path.join("student", "tasks", "task-1.html"),
  path.join("student", "submissions.html"),
  path.join("student", "submit-work.html"),
  path.join("student", "certificates.html"),
  path.join("student", "settings.html"),
  "_redirects",
  "_headers",
];

for (const requiredFile of requiredBuildFiles) {
  if (!fs.existsSync(path.join(distDir, requiredFile))) {
    throw new Error(`Cloudflare build failed: dist/${requiredFile} was not created.`);
  }
}

console.log(`Build complete. Admin pages ${includeAdmin ? "included" : "excluded"} in dist.`);
