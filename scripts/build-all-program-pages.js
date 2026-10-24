const fs = require("fs");
const path = require("path");
const { DOMAIN_TASKS, AVAILABLE_DOMAINS } = require("./build-domain-tasks.js");
const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "backend", "data", "db.json"), "utf8"));

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "src", "pages");
const programsDir = path.join(rootDir, "internships", "programs");

function generateProgramHtml(prog) {
  const tasks = DOMAIN_TASKS[prog.slug] || DOMAIN_TASKS["web-development"] || [];
  const canonicalUrl = `https://abssnexus.in/internships/programs/${prog.slug}`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${prog.description.replace(/"/g, '&quot;')}" />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${prog.title} | ABSS Nexus Technologies" />
    <meta property="og:description" content="${prog.description.replace(/"/g, '&quot;')}" />
    <meta property="og:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <meta property="og:url" content="${canonicalUrl}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <title>${prog.title} | ABSS Nexus Technologies</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/public/assets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/public/assets/images/favicon.png" />
    <link rel="apple-touch-icon" href="/public/assets/images/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/styles.css?v=20261023v2" />
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "${prog.title}",
  "description": "${prog.description.replace(/"/g, '&quot;')}",
  "provider": {
    "@type": "Organization",
    "name": "ABSS Nexus Technologies",
    "url": "https://abssnexus.in"
  }
}
    </script>
  </head>
  <body class="agency-dark-theme">
    <header class="site-header site-header--academy" role="banner">
      <div class="announcement-bar announcement-bar--academy">
        <div class="announcement-bar__container container">
          <span class="announcement-bar__badge">
            <span class="live-pulse-dot" aria-hidden="true"></span>
            <span>Admissions Open: 2026 Virtual Internship Cohorts &bull; ISO-Verified Credentials</span>
          </span>
          <a class="announcement-bar__link" href="/internships/register">Apply for Cohort &rarr;</a>
        </div>
      </div>
      <nav class="nav" aria-label="Internship Academy Navigation">
        <a class="brand" href="/internships" aria-label="ABSS Nexus Academy home">
          <img src="/public/assets/images/favicon.png" alt="ABSS Nexus Academy logo" width="38" height="38" />
          <div class="brand-text-group" style="display: flex; flex-direction: column; text-align: left;">
            <span class="brand-name">ABSS Nexus Academy</span>
            <span class="brand-subtext" style="font-size: 0.72rem; color: #6E6E73; font-weight: 500; letter-spacing: 0.02em;">Internship &amp; Engineering Portal</span>
          </div>
        </a>
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav-links">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
        <div class="nav-links" id="main-nav-links">
          <a href="/internships" class="nav-link">Home</a>
          <a href="/internships/about" class="nav-link">About Us</a>
          <a href="/internships/programs" class="nav-link" aria-current="page">Services / Programs</a>
          <a href="/internships/details" class="nav-link">Internship Details</a>
          <a href="/internships/contact" class="nav-link">Contact Us</a>
          <a href="/internships/login" class="nav-link" style="font-weight: 600; color: #0066CC;">Student Login</a>
          <a class="nav-cta" href="/internships/register?track=${prog.slug}" style="background: linear-gradient(135deg, #0066cc 0%, #00c2ff 100%);">Apply Now</a>
          <a href="/" class="nav-link" style="font-size: 0.8rem; color: #86868B; margin-left: 6px;" title="Switch to Corporate Services Platform">Corporate Site &rarr;</a>
        </div>
      </nav>
    </header>

    <main>
      <section class="portal-hero">
        <div class="portal-hero-container">
          <span class="portal-badge portal-badge-urgent">
            ${prog.category || "Professional Track"} &bull; ${prog.duration}
          </span>
          <h1>${prog.title}</h1>
          <p class="portal-hero-desc">
            ${prog.description}
          </p>
          <div class="portal-hero-actions">
            <a class="btn btn-glow-cyan" href="/internships/register?track=${prog.slug}">Register for Track &rarr;</a>
            <a class="btn btn-glass" href="/internships/programs">&larr; Back to All Programs</a>
          </div>
        </div>
      </section>

      <nav class="portal-nav-bar" aria-label="Internship Portal Navigation">
        <div class="container portal-nav-inner">
          <a class="portal-nav-link" href="/internships">Portal Overview</a>
          <a class="portal-nav-link active" href="/internships/programs">Curriculum Tracks</a>
          <a class="portal-nav-link" href="/internships/how-it-works">How It Works</a>
          <a class="portal-nav-link" href="/internships/faq">Student FAQs</a>
          <a class="portal-nav-link" href="/internships/support">Student Support</a>
          <a class="portal-nav-link" href="/internships/register?track=${prog.slug}">Student Register</a>
          <a class="portal-nav-link" href="/internships/login">Student Login</a>
        </div>
      </nav>

      <section class="portal-section-white">
        <div class="container" style="max-width: 900px;">
          <div style="background: #FFF9E6; border: 1px solid rgba(178, 94, 0, 0.25); border-radius: 12px; padding: 16px 20px; margin-bottom: 32px; font-size: 0.9rem; color: #7A3E00; line-height: 1.5;">
            <strong>Demonstration Curriculum:</strong> This track reflects our approved syllabus framework. There are no fees or charges in this foundation phase. ABSS Nexus Technologies provides real technical education but does not make false placement promises or exaggerated claims.
          </div>

          <div style="background: #F5F5F7; border: 1px solid var(--color-border); border-radius: 14px; padding: 24px 28px; margin-bottom: 40px;">
            <h2 style="font-family: var(--font-heading); font-size: 1.25rem; margin: 0 0 16px; color: var(--color-near-black);">Track Overview &amp; Key Parameters</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; font-size: 0.9rem;">
              <div><strong>Duration:</strong> <span style="color: var(--color-secondary-text);">${prog.duration}</span></div>
              <div><strong>Work Mode:</strong> <span style="color: var(--color-secondary-text);">${prog.workMode}</span></div>
              <div><strong>Program Fee:</strong> <span style="color: var(--color-blue); font-weight: 700;">Free / Preview Phase</span></div>
              <div><strong>Target Audience:</strong> <span style="color: var(--color-secondary-text);">${prog.eligibility}</span></div>
            </div>
            <div style="margin-top: 16px; font-size: 0.9rem; border-top: 1px solid #E0E0E5; padding-top: 12px;">
              <strong>Core Technologies &amp; Skills:</strong> <span style="color: var(--color-secondary-text);">${prog.skills}</span>
            </div>
          </div>

          <div style="margin-bottom: 36px;">
            <div class="section-title">
              <span class="eyebrow">Milestone Syllabus</span>
              <h2>Detailed Module Breakdown</h2>
              <p>Each module combines theoretical foundations with practical project deliverables.</p>
            </div>

            ${tasks.map((task, idx) => `
            <div class="curriculum-module">
              <div class="module-header">
                <span class="module-number">Module ${idx + 1}</span>
                <span class="portal-badge portal-badge-urgent">${task.difficulty}</span>
              </div>
              <h3 class="module-title">${task.name}</h3>
              <p style="color: var(--color-secondary-text); font-size: 0.92rem; margin: 0 0 14px; line-height: 1.6;">${task.desc}</p>
              <ul class="module-topics-list">
                ${task.steps.map(step => `<li>${step}</li>`).join('\n                ')}
              </ul>
              <div class="module-outcome">
                <strong>Expected Deliverable:</strong> Estimated time: ${task.time}. Verification via GitHub repo or live project proof.
              </div>
            </div>
            `).join('\n')}
          </div>

          <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: 14px; padding: 28px; margin-bottom: 40px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--color-near-black); margin: 0 0 14px;">Eligibility &amp; Prerequisites</h3>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--color-secondary-text); margin: 0 0 16px;">
              ${prog.eligibility}
            </p>
            <h4 style="font-family: var(--font-heading); font-size: 1rem; color: var(--color-near-black); margin: 0 0 8px;">Technical Equipment &amp; Commitment:</h4>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--color-secondary-text); margin: 0;">
              ${prog.requirements}
            </p>
          </div>

          <div style="text-align: center; padding: 32px 0;">
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--color-near-black); margin: 0 0 12px;">Ready to Explore This Track?</h3>
            <p style="color: var(--color-secondary-text); margin: 0 auto 24px; max-width: 540px;">
              Register your student profile today to view upcoming cohort dates, access track materials, and begin working on foundational milestones.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a class="btn btn-glow-cyan" href="/internships/register?track=${prog.slug}">Register for Track &rarr;</a>
              <a class="btn btn-glass" href="/internships/faq">Read Track FAQs</a>
              <a class="btn btn-glass" href="/internships/support">Ask Questions</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer site-footer--academy" role="contentinfo">
      <div class="site-footer__container container">
        <div class="site-footer__grid footer-grid">
          <div class="site-footer__brand footer-brand">
            <a class="site-footer__logo-link" href="/internships" aria-label="ABSS Nexus Academy home">
              <img class="site-footer__logo" src="/public/assets/images/LogoGenerated.png" alt="ABSS Nexus Academy logo" width="160" height="38" />
            </a>
            <p class="site-footer__brand-title footer-brand-title">ABSS Nexus Academy</p>
            <p class="site-footer__brand-desc">Industry-standard virtual technical internships, hands-on production code reviews, and verifiable credentials for ambitious software engineers.</p>
            <strong class="site-footer__tagline" style="color: #00c2ff;">Learn &bull; Build &bull; Get Certified</strong>
          </div>
          <div class="site-footer__col footer-column">
            <h3 class="site-footer__col-title">Navigation</h3>
            <a class="site-footer__link" href="/internships">Home</a>
            <a class="site-footer__link" href="/internships/about">About Us</a>
            <a class="site-footer__link" href="/internships/programs">Services / Programs</a>
            <a class="site-footer__link" href="/internships/details">Internship Details</a>
            <a class="site-footer__link" href="/internships/how-it-works">How It Works</a>
          </div>
          <div class="site-footer__col footer-column">
            <h3 class="site-footer__col-title">Support &amp; Verification</h3>
            <a class="site-footer__link" href="/verify-certificate">Verify Certificate</a>
            <a class="site-footer__link" href="/internships/faq">Student FAQs</a>
            <a class="site-footer__link" href="/internships/support">Student Support</a>
            <a class="site-footer__link" href="/internships/privacy-policy">Privacy Policy</a>
            <a class="site-footer__link" href="/internships/terms-and-conditions">Terms &amp; Conditions</a>
          </div>
        </div>
        <div class="site-footer__bottom footer-bottom">
          <p class="site-footer__copyright">&copy; 2026 ABSS Nexus Technologies Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </body>
</html>
`;
}

// Write pages for all programs
db.internshipPrograms.forEach(prog => {
  const pageFile = path.join(pagesDir, `internships-program-${prog.slug}.html`);
  const html = generateProgramHtml(prog);
  fs.writeFileSync(pageFile, html, "utf8");

  // Also write to internships/programs/<slug>/index.html
  const progFolder = path.join(programsDir, prog.slug);
  if (!fs.existsSync(progFolder)) {
    fs.mkdirSync(progFolder, { recursive: true });
  }
  fs.writeFileSync(path.join(progFolder, "index.html"), html, "utf8");
});

console.log(`Successfully generated ${db.internshipPrograms.length} program pages in src/pages and internships/programs`);
