const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const today = new Date().toISOString().split("T")[0];

const sitemapEntries = [
  // 1. Core Primary Hubs
  { loc: "https://abssnexus.in/", priority: "1.0", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships", priority: "0.95", changefreq: "weekly" },
  { loc: "https://abssnexus.in/services", priority: "0.90", changefreq: "weekly" },
  { loc: "https://abssnexus.in/solutions", priority: "0.85", changefreq: "monthly" },
  { loc: "https://abssnexus.in/industries", priority: "0.85", changefreq: "monthly" },
  { loc: "https://abssnexus.in/work", priority: "0.85", changefreq: "monthly" },
  { loc: "https://abssnexus.in/projects", priority: "0.85", changefreq: "monthly" },
  { loc: "https://abssnexus.in/about", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/pricing", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/contact", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/careers", priority: "0.75", changefreq: "weekly" },
  { loc: "https://abssnexus.in/blog", priority: "0.80", changefreq: "weekly" },
  { loc: "https://abssnexus.in/faq", priority: "0.70", changefreq: "monthly" },

  // 2. Enterprise IT Services
  { loc: "https://abssnexus.in/services/website-development", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/software-development", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/mobile-app-development", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/ui-ux-design", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/ai-machine-learning", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/cloud-computing", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/cybersecurity", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/data-analytics-bi", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/digital-marketing-seo", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/ecommerce-development", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/saas-development", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/api-integration", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/software-testing-qa", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/it-consulting", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/website-maintenance", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/services/managed-it-support", priority: "0.80", changefreq: "monthly" },

  // 3. Internship Programs Hub & 18 Tracks
  { loc: "https://abssnexus.in/internships/programs", priority: "0.90", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/web-development", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/data-science", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/machine-learning", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/ai-machine-learning", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/data-analyst", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/cyber-security", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/software-development", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/prompt-engineering", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/agent-engineering", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/ai-engineering", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/android-development", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/product-management", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/ui-ux-design", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/graphics-design", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/human-resources", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/digital-marketing", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/content-writing", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/programs/cloud-devops", priority: "0.85", changefreq: "weekly" },

  // 4. Internship Academy Info Pages
  { loc: "https://abssnexus.in/internships/about", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/internships/details", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/internships/how-it-works", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/internships/faq", priority: "0.75", changefreq: "monthly" },
  { loc: "https://abssnexus.in/internships/support", priority: "0.75", changefreq: "monthly" },
  { loc: "https://abssnexus.in/internships/contact", priority: "0.75", changefreq: "monthly" },
  { loc: "https://abssnexus.in/internships/register", priority: "0.85", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/login", priority: "0.70", changefreq: "monthly" },
  { loc: "https://abssnexus.in/internships/application-status", priority: "0.70", changefreq: "weekly" },
  { loc: "https://abssnexus.in/internships/payment-status", priority: "0.70", changefreq: "weekly" },
  { loc: "https://abssnexus.in/verify-certificate", priority: "0.80", changefreq: "monthly" },

  // 5. Work Case Studies
  { loc: "https://abssnexus.in/work/fintech-payment-gateway", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/work/healthcare-telemedicine-platform", priority: "0.80", changefreq: "monthly" },
  { loc: "https://abssnexus.in/work/ecommerce-headless-storefront", priority: "0.80", changefreq: "monthly" },

  // 6. Careers Openings
  { loc: "https://abssnexus.in/careers/senior-fullstack-engineer", priority: "0.75", changefreq: "monthly" },
  { loc: "https://abssnexus.in/careers/lead-ui-ux-designer", priority: "0.75", changefreq: "monthly" },
  { loc: "https://abssnexus.in/careers/cloud-devops-architect", priority: "0.75", changefreq: "monthly" },

  // 7. Blog Articles
  { loc: "https://abssnexus.in/blog/modern-web-performance-core-web-vitals", priority: "0.75", changefreq: "monthly" },
  { loc: "https://abssnexus.in/blog/resilient-cloud-architecture-edge-computing", priority: "0.75", changefreq: "monthly" },
  { loc: "https://abssnexus.in/blog/minimalist-design-systems-conversion", priority: "0.75", changefreq: "monthly" },

  // 8. Auth & Legal Policies
  { loc: "https://abssnexus.in/register", priority: "0.70", changefreq: "monthly" },
  { loc: "https://abssnexus.in/login", priority: "0.70", changefreq: "monthly" },
  { loc: "https://abssnexus.in/privacy-policy", priority: "0.50", changefreq: "yearly" },
  { loc: "https://abssnexus.in/terms-and-conditions", priority: "0.50", changefreq: "yearly" },
  { loc: "https://abssnexus.in/cookie-policy", priority: "0.50", changefreq: "yearly" },
  { loc: "https://abssnexus.in/refund-policy", priority: "0.50", changefreq: "yearly" },
  { loc: "https://abssnexus.in/support-policy", priority: "0.50", changefreq: "yearly" },
  { loc: "https://abssnexus.in/disclaimer", priority: "0.50", changefreq: "yearly" },
  { loc: "https://abssnexus.in/internships/privacy-policy", priority: "0.50", changefreq: "yearly" },
  { loc: "https://abssnexus.in/internships/terms-and-conditions", priority: "0.50", changefreq: "yearly" },
  { loc: "https://abssnexus.in/sitemap", priority: "0.60", changefreq: "monthly" }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
for (const entry of sitemapEntries) {
  xml += `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>\n`;
}
xml += `</urlset>\n`;

// Write to root, public, and dist if dist exists
fs.writeFileSync(path.join(rootDir, "sitemap.xml"), xml, "utf8");
fs.writeFileSync(path.join(rootDir, "public", "sitemap.xml"), xml, "utf8");
if (fs.existsSync(path.join(rootDir, "dist"))) {
  fs.writeFileSync(path.join(rootDir, "dist", "sitemap.xml"), xml, "utf8");
}

const robotsTxt = `User-agent: *
Disallow: /src/admin/
Disallow: /admin/
Disallow: /admin-*
Disallow: /student/
Disallow: /student-*
Disallow: /internships/dashboard
Disallow: /api/

Sitemap: https://abssnexus.in/sitemap.xml
`;

fs.writeFileSync(path.join(rootDir, "robots.txt"), robotsTxt, "utf8");
fs.writeFileSync(path.join(rootDir, "public", "robots.txt"), robotsTxt, "utf8");
if (fs.existsSync(path.join(rootDir, "dist"))) {
  fs.writeFileSync(path.join(rootDir, "dist", "robots.txt"), robotsTxt, "utf8");
}

console.log(`Generated sitemap.xml (${sitemapEntries.length} canonical routes) and robots.txt in root, public/, and dist/.`);
