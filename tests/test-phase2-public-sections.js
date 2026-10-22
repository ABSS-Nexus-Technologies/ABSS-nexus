const fs = require("fs");
const path = require("path");
const assert = require("assert");

const rootDir = path.resolve(__dirname, "..");

console.log("=== Starting Phase 2: Public Website Sections & Content Verification ===\n");

function check(title, fn) {
  try {
    fn();
    console.log(`✓ PASS: ${title}`);
  } catch (err) {
    console.error(`✗ FAIL: ${title}`);
    console.error(`  ${err.message}`);
    process.exit(1);
  }
}

// 1. Homepage Below-the-Hero Sections
check("Homepage contains 16 services in services showcase", () => {
  const html = fs.readFileSync(path.join(rootDir, "src/pages/index.html"), "utf8");
  assert(html.includes("Engineering Solutions Across 16 Authentic Disciplines"), "Missing 16 disciplines heading");
  assert(html.includes("/services/managed-it-support"), "Missing link to managed-it-support");
  assert(html.includes("Managed IT Support &amp; Maintenance"), "Missing Managed IT Support card title");
  assert(html.includes("View All 16 Services &amp; Packages"), "Missing All 16 Services button");
});

check("Homepage contains verified client testimonials section", () => {
  const html = fs.readFileSync(path.join(rootDir, "src/pages/index.html"), "utf8");
  assert(html.includes('id="testimonials"'), "Missing testimonials section ID");
  assert(html.includes("testimonials-grid"), "Missing testimonials-grid class");
  assert(html.includes("Aman Verma"), "Missing testimonial 1 author");
  assert(html.includes("Pooja Rathore"), "Missing testimonial 2 author");
  assert(html.includes("Dr. R. K. Meena"), "Missing testimonial 3 author");
  assert(html.includes("FinEdge Labs"), "Missing testimonial company");
});

check("Homepage contains interactive FAQ accordion with 5 questions", () => {
  const html = fs.readFileSync(path.join(rootDir, "src/pages/index.html"), "utf8");
  const toggleCount = (html.match(/data-faq-toggle/g) || []).length;
  assert(toggleCount >= 5, `Expected at least 5 FAQ toggles, found ${toggleCount}`);
  assert(html.includes("Who owns the code"), "Missing code ownership FAQ");
  assert(html.includes("milestone stages structured"), "Missing milestone payment FAQ");
});

check("Homepage portfolio section contains filter buttons and demo cards", () => {
  const html = fs.readFileSync(path.join(rootDir, "src/pages/index.html"), "utf8");
  assert(html.includes('data-project-filter="all"'), "Missing all filter button");
  assert(html.includes('data-project-filter="website"'), "Missing website filter button");
  assert(html.includes('data-project-filter="webapp"'), "Missing webapp filter button");
  assert(html.includes('data-project-filter="ecommerce"'), "Missing ecommerce filter button");
  assert(html.includes("personal-portfolio.png"), "Missing personal portfolio preview");
  assert(html.includes("project-dashboard-ui.png"), "Missing dashboard preview");
});

check("Homepage radiant CTA band contains direct lines and WhatsApp shortcut", () => {
  const html = fs.readFileSync(path.join(rootDir, "src/pages/index.html"), "utf8");
  assert(html.includes('href="/contact#project-inquiry"'), "Missing inquiry button link");
  assert(html.includes("https://wa.me/918757928673"), "Missing official WhatsApp link");
  assert(html.includes("+91 87579 28673"), "Missing phone number in trust meta");
});

// 2. About Page Enhancements
check("About page contains founder spotlight and technical credentials", () => {
  const html = fs.readFileSync(path.join(rootDir, "src/pages/about.html"), "utf8");
  assert(html.includes("Shubham Kumar"), "Missing founder name");
  assert(html.includes("Founder &amp; Technical Lead"), "Missing founder title");
  assert(html.includes("Jaipur, Rajasthan"), "Missing Jaipur location");
  assert(html.includes("16 Specialized Digital &amp; IT Services"), "Missing 16 services count in capabilities");
});

check("About page contains company milestones timeline", () => {
  const html = fs.readFileSync(path.join(rootDir, "src/pages/about.html"), "utf8");
  assert(html.includes('id="milestones"'), "Missing milestones section ID");
  assert(html.includes("timeline-track"), "Missing timeline-track class");
  assert(html.includes("2024 &bull; Genesis"), "Missing 2024 milestone");
  assert(html.includes("2025 &bull; Architectural Scaling"), "Missing 2025 milestone");
  assert(html.includes("2026 &bull; Multi-Discipline Maturity"), "Missing 2026 milestone");
});

check("About page footer links to All 16 Services and has clean scripts", () => {
  const html = fs.readFileSync(path.join(rootDir, "src/pages/about.html"), "utf8");
  assert(html.includes("All 16 Services &rarr;"), "Footer should link to All 16 Services");
  assert(!html.includes("admin-config.js"), "Public about page should not include admin-config.js");
  const scriptMatches = (html.match(/src="\/src\/scripts\/script\.js"/g) || []).length;
  assert.strictEqual(scriptMatches, 1, `script.js should be included exactly once, found ${scriptMatches}`);
});

// 3. Services Page Enhancements
check("Services catalog page contains 16 disciplines and Service 16 card", () => {
  const html = fs.readFileSync(path.join(rootDir, "src/pages/services.html"), "utf8");
  assert(html.includes("16 Specialized Disciplines"), "Missing 16 disciplines eyebrow");
  assert(html.includes("All Services (16)"), "Missing All Services (16) filter button");
  assert(html.includes("Support &amp; QA (4)"), "Missing Support & QA (4) filter button");
  assert(html.includes("/services/managed-it-support"), "Missing Managed IT Support card link");
  assert(html.includes("All 16 Services &rarr;"), "Footer should link to All 16 Services");
});

// 4. Contact Page Enhancements
check("Contact page inquiry dropdown contains full service disciplines", () => {
  const html = fs.readFileSync(path.join(rootDir, "src/pages/contact.html"), "utf8");
  assert(html.includes('<option value="Website Development">Website Development</option>'), "Missing Website Development option");
  assert(html.includes('<option value="Software Development">Software Development</option>'), "Missing Software Development option");
  assert(html.includes('<option value="Managed IT Support">Managed IT Support</option>'), "Missing Managed IT Support option");
  assert(html.includes('<option value="Cybersecurity">Cybersecurity</option>'), "Missing Cybersecurity option");
  assert(html.includes("All 16 Services &rarr;"), "Footer should link to All 16 Services");
});

// 5. CSS Components Architecture
check("Public sections CSS stylesheet is imported and defines required classes", () => {
  const styles = fs.readFileSync(path.join(rootDir, "src/styles/styles.css"), "utf8");
  assert(styles.includes('@import url("./components/public-sections.css");'), "Missing public-sections.css import in styles.css");
  
  const componentCss = fs.readFileSync(path.join(rootDir, "src/styles/components/public-sections.css"), "utf8");
  assert(componentCss.includes(".testimonials-section"), "Missing .testimonials-section style");
  assert(componentCss.includes(".testimonial-card"), "Missing .testimonial-card style");
  assert(componentCss.includes(".timeline-track"), "Missing .timeline-track style");
  assert(componentCss.includes(".timeline-node"), "Missing .timeline-node style");
  assert(componentCss.includes(".faq-agency-btn"), "Missing .faq-agency-btn style");
});

console.log("\n🎉 ALL PHASE 2 PUBLIC SECTIONS & CONTENT VERIFICATION CHECKS PASSED SUCCESSFULLY!\n");
