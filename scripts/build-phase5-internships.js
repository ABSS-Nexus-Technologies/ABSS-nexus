const fs = require("fs");
const path = require("path");
const { renderHeader, renderFooter } = require("./service-template-engine");

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "src", "pages");

function generatePage({
  filename,
  title,
  metaDescription,
  canonicalUrl,
  activeRoute,
  jsonLd,
  isAuthOrProtected = false,
  mainContent,
  additionalScripts = "",
}) {
  const robotsMeta = isAuthOrProtected
    ? `    <meta name="robots" content="noindex, nofollow" />`
    : `    <meta name="robots" content="index, follow" />`;

  const jsonLdBlock = jsonLd
    ? `    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${metaDescription}" />
${robotsMeta}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${metaDescription}" />
    <meta property="og:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <meta property="og:url" content="${canonicalUrl}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <title>${title}</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/public/assets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/public/assets/images/favicon.png" />
    <link rel="apple-touch-icon" href="/public/assets/images/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/styles.css" />
${jsonLdBlock}
  </head>
  <body class="agency-dark-theme">
${renderHeader(activeRoute)}

    <main>
${mainContent}
    </main>

${renderFooter()}

    <script src="/src/config/admin-config.js"></script>
    <script src="/src/services/admin-api.js"></script>
    <script src="/src/scripts/script.js"></script>
${additionalScripts}
  </body>
</html>
`;

  const targetPath = path.join(pagesDir, filename);
  fs.writeFileSync(targetPath, html, "utf8");
  console.log(`Generated: src/pages/${filename}`);
}

// -----------------------------------------------------------------------------
// Sub-navigation bar component for internship portal
// -----------------------------------------------------------------------------
function renderPortalSubNav(activeSub) {
  return `      <nav class="portal-nav-bar" aria-label="Internship Portal Navigation">
        <div class="container portal-nav-inner">
          <a class="portal-nav-link ${activeSub === "overview" ? "active" : ""}" href="/internships">Portal Overview</a>
          <a class="portal-nav-link ${activeSub === "programs" ? "active" : ""}" href="/internships/programs">Curriculum Tracks</a>
          <a class="portal-nav-link ${activeSub === "how-it-works" ? "active" : ""}" href="/internships/how-it-works">How It Works</a>
          <a class="portal-nav-link ${activeSub === "faq" ? "active" : ""}" href="/internships/faq">Student FAQs</a>
          <a class="portal-nav-link ${activeSub === "support" ? "active" : ""}" href="/internships/support">Student Support</a>
          <a class="portal-nav-link ${activeSub === "register" ? "active" : ""}" href="/internships/register">Student Register</a>
          <a class="portal-nav-link ${activeSub === "login" ? "active" : ""}" href="/internships/login">Student Login</a>
        </div>
      </nav>`;
}

// =============================================================================
// 1. /internships — HIGH-CONVERTING LANDING PAGE
// =============================================================================
generatePage({
  filename: "internships.html",
  title: "Internship Portal & Engineering Programs | ABSS Nexus Technologies",
  metaDescription: "Industry-recognized virtual engineering internships at ABSS Nexus Technologies. Real production projects, 1-on-1 mentor reviews, and verified ISO-aligned certification.",
  canonicalUrl: "https://abssnexus.in/internships",
  activeRoute: "/internships",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ABSS Nexus Technologies Internship Portal",
    "description": "Structured virtual engineering internship programs with production deployments, mentor code reviews, and verified ISO-aligned certification.",
    "url": "https://abssnexus.in/internships",
    "publisher": {
      "@type": "Organization",
      "name": "ABSS Nexus Technologies",
      "url": "https://abssnexus.in"
    }
  },
  mainContent: `      <!-- 1. High-Impact Hero Section -->
      <section class="portal-hero">
        <div class="portal-hero-container">
          <span class="portal-badge portal-badge-urgent">
            <span class="live-pulse-dot" aria-hidden="true"></span>
            Upcoming Cohort: November 2026 Batch &bull; Limited Capacity
          </span>
          <h1>
            Production-Grade Virtual Internships &amp;
            <span class="text-gradient-cyan">Practical Engineering</span>
          </h1>
          <p class="portal-hero-desc">
            Bridge academic computer science with live web production. Build deployable client-grade platforms,
            receive 1-on-1 code reviews from senior engineers, and earn an authentic ISO-aligned certificate with an official Letter of Recommendation.
          </p>
          <div class="portal-hero-actions">
            <a class="btn btn-glow-cyan" href="/internships/register">
              <span>Apply for November Cohort &rarr;</span>
            </a>
            <a class="btn btn-whatsapp-outline" href="https://wa.me/918757928673" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.3-.778.979-.954 1.18-.176.2-.352.226-.653.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.632-.929-2.235-.245-.588-.494-.509-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.722.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.43.25-.704.25-1.307.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.51 2 2.03 6.48 2.03 12.01c0 1.97.57 3.81 1.57 5.37L2 22l4.78-1.54c1.51.92 3.27 1.45 5.26 1.45 5.53 0 10.01-4.48 10.01-10.01S17.57 2 12.04 2zm0 18.25c-1.74 0-3.36-.5-4.74-1.38l-.34-.22-2.83.91.93-2.76-.24-.37c-.98-1.5-1.53-3.27-1.53-5.12 0-4.56 3.71-8.27 8.27-8.27s8.27 3.71 8.27 8.27-3.71 8.27-8.27 8.27z"/>
              </svg>
              <span>WhatsApp Admission Support</span>
            </a>
            <a class="btn btn-glass" href="/internships/programs">
              <span>Explore All 5 Tracks &rarr;</span>
            </a>
          </div>
        </div>
      </section>

${renderPortalSubNav("overview")}

      <!-- 2. Core Value Pillars -->
      <section class="portal-section-white" id="pillars">
        <div class="container">
          <div class="section-title text-center">
            <span class="eyebrow">Academic Rigor &bull; Real Industry Proof</span>
            <h2>Why Engineering Students Choose ABSS Nexus</h2>
            <p>We replace copy-paste tutorial clones with verified production engineering and direct founder mentorship.</p>
          </div>

          <div class="portal-grid">
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Engineering Rigor</span>
                <h3>Production-Grade Code Quality</h3>
              </div>
              <p class="portal-card-desc">
                Learn modern Git workflows, semantic web architecture, accessible HTML, modular CSS tokens, and clean RESTful API contracts rather than trivial copy-paste tutorials.
              </p>
              <div class="portal-card-skills">
                <strong>Key Focus:</strong> Clean architecture, testability, and edge CDN deployments.
              </div>
            </div>

            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">1-on-1 Guidance</span>
                <h3>Direct Mentor Code Reviews</h3>
              </div>
              <p class="portal-card-desc">
                Submit weekly milestones on GitHub and receive line-by-line feedback from lead full-stack engineers to refine your architecture before production release.
              </p>
              <div class="portal-card-skills">
                <strong>Key Focus:</strong> Code quality reviews, architectural best practices, and PR workflows.
              </div>
            </div>

            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge" style="color: var(--portal-gold); border-color: rgba(180, 83, 9, 0.3);">Official Letter of Recommendation</span>
                <h3>Official LoR from Tech Lead</h3>
              </div>
              <p class="portal-card-desc">
                High-performing interns receive a personalized Letter of Recommendation (LoR) signed by Founder &amp; Technical Lead Shubham Kumar to accelerate job interviews.
              </p>
              <div class="portal-card-skills">
                <strong>Key Focus:</strong> Verified college credit acceptance and LinkedIn credibility.
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Interactive Certificate & LoR Showcase -->
      <section class="portal-section-alt" id="certificate-showcase">
        <div class="container text-center">
          <span class="eyebrow">Recruiter-Grade Credentials</span>
          <h2>Authentic ISO-Aligned Verified Certification</h2>
          <p style="color: var(--portal-light-muted); max-width: 680px; margin: 0 auto 30px;">
            Every graduate receives a tamper-proof certificate with a unique cryptographic verification hash and QR code, instant-searchable by HR recruiters and university registrars worldwide.
          </p>

          <div class="certificate-showcase-box">
            <div class="certificate-inner-frame">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
                <span class="certificate-badge-seal">&#127941; Official Verified Credential</span>
                <span style="font-size: 0.85rem; color: #0066CC; font-family: monospace; font-weight: 700;">STATUS: AUTHENTIC &bull; ON RECORD</span>
              </div>
              <h3 style="font-size: clamp(1.4rem, 2.5vw, 1.8rem); color: var(--color-near-black, #1D1D1F); margin: 0 0 10px;">
                Certificate of Technical Internship Completion
              </h3>
              <p style="color: #4B5563; font-size: 0.95rem; margin: 0 auto 20px; max-width: 620px;">
                This certifies that the recipient has successfully fulfilled all technical requirements, milestone code reviews, and capstone deployment under direct engineering supervision at ABSS Nexus Technologies.
              </p>
              <div class="certificate-meta-grid">
                <div class="cert-meta-item">
                  <strong>Recipient Name</strong>
                  <span>Aarav Sharma</span>
                </div>
                <div class="cert-meta-item">
                  <strong>Program Track</strong>
                  <span>Full-Stack Web Engineering</span>
                </div>
                <div class="cert-meta-item">
                  <strong>Credential ID</strong>
                  <span style="font-family: monospace; color: #0066CC; font-weight: 700;">ABSS-CERT-2026-WD-1042</span>
                </div>
                <div class="cert-meta-item">
                  <strong>Performance Grade</strong>
                  <span style="color: #15803D; font-weight: 700;">Grade A+ (Distinction 96%)</span>
                </div>
              </div>
              <div style="text-align: center; margin-top: 24px; padding-top: 18px; border-top: 1px dashed #D2D2D7;">
                <a class="btn btn-glow-cyan" href="/verify-certificate?id=ABSS-CERT-2026-WD-1042" target="_blank" rel="noopener noreferrer">
                  <span>Verify Sample Certificate Live &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. 5 High-Demand Specialization Tracks -->
      <section class="portal-section-white" id="tracks">
        <div class="container">
          <div class="section-title text-center">
            <span class="eyebrow">Industry Curricula</span>
            <h2>Select Your Specialization Track</h2>
            <p>Structured virtual tracks designed for engineering, computer application, and design students.</p>
          </div>

          <div class="portal-grid">
            <!-- Track 1: Web Development -->
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Frontend &amp; Performance</span>
                <h3>Web Development Track</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; Remote Virtual</span>
                <span class="portal-meta-pill">&#128188; 3 Live Projects</span>
              </div>
              <p class="portal-card-desc">
                Master modern HTML5, vanilla CSS grid/flexbox systems, JavaScript ES6+, Core Web Vitals optimization, responsive layout architectures, and Git.
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> HTML5, CSS3, JavaScript, Web Vitals, a11y, Git.
              </div>
              <div style="margin-top: 20px;">
                <a class="btn btn-glow-cyan" href="/internships/programs/web-development" style="width: 100%; text-align: center; display: block;">
                  View Track Curriculum &rarr;
                </a>
              </div>
            </div>

            <!-- Track 2: Software Development -->
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Full-Stack &amp; APIs</span>
                <h3>Software &amp; Full-Stack Track</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; Remote Virtual</span>
                <span class="portal-meta-pill">&#128188; 4 Live Projects</span>
              </div>
              <p class="portal-card-desc">
                Engineer scalable backend services in Node.js, manage relational database schemas (SQLite/Cloudflare D1), build secure session authentication, and deploy edge APIs.
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> Node.js, SQLite/SQL, REST APIs, Session Auth, Edge CDN.
              </div>
              <div style="margin-top: 20px;">
                <a class="btn btn-glow-cyan" href="/internships/programs/software-development" style="width: 100%; text-align: center; display: block;">
                  View Track Curriculum &rarr;
                </a>
              </div>
            </div>

            <!-- Track 3: UI/UX Design -->
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Design Systems &amp; Figma</span>
                <h3>UI/UX Design Track</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; Remote Virtual</span>
                <span class="portal-meta-pill">&#128188; 2 Design Systems</span>
              </div>
              <p class="portal-card-desc">
                Craft human-centered digital interfaces in Figma, build responsive wireframes, design token systems, conduct usability audits, and prepare developer-ready handoffs.
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> Figma, Design Tokens, User Journey, Wireframing, WCAG.
              </div>
              <div style="margin-top: 20px;">
                <a class="btn btn-glow-cyan" href="/internships/programs/ui-ux-design" style="width: 100%; text-align: center; display: block;">
                  View Track Curriculum &rarr;
                </a>
              </div>
            </div>

            <!-- Track 4: AI & Machine Learning -->
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Applied AI &amp; LLMs</span>
                <h3>AI &amp; Machine Learning Track</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; Remote Virtual</span>
                <span class="portal-meta-pill">&#128188; 3 AI Models</span>
              </div>
              <p class="portal-card-desc">
                Build applied machine learning models using Python, prompt engineering workflows, model evaluation metrics, and API endpoints for production applications.
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> Python, NumPy, Scikit-Learn, LLM APIs, Feature Engineering.
              </div>
              <div style="margin-top: 20px;">
                <a class="btn btn-glow-cyan" href="/internships/programs/ai-machine-learning" style="width: 100%; text-align: center; display: block;">
                  View Track Curriculum &rarr;
                </a>
              </div>
            </div>

            <!-- Track 5: Cloud Architecture & DevOps -->
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Edge Networks &amp; CI/CD</span>
                <h3>Cloud &amp; DevOps Track</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; Remote Virtual</span>
                <span class="portal-meta-pill">&#128188; 2 Cloud Pipelines</span>
              </div>
              <p class="portal-card-desc">
                Architect high-availability edge deployments, configure automated GitHub Actions CI/CD pipelines, SSL/TLS hardening, and system performance telemetry.
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> Edge Workers, GitHub Actions, CI/CD, DNS, HTTP Hardening.
              </div>
              <div style="margin-top: 20px;">
                <a class="btn btn-glow-cyan" href="/internships/programs/cloud-devops" style="width: 100%; text-align: center; display: block;">
                  View Track Curriculum &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. 4-Step Zero-Friction Student Journey -->
      <section class="portal-section-alt" id="journey">
        <div class="container">
          <div class="section-title text-center">
            <span class="eyebrow">Zero Friction &bull; Fast Onboarding</span>
            <h2>How the Internship Journey Works</h2>
            <p>From day one to final certificate release, our transparent roadmap guarantees timely delivery of college-approved credentials.</p>
          </div>

          <div class="journey-steps-grid">
            <div class="journey-step-box">
              <div class="journey-step-num">01</div>
              <h3>Apply Online</h3>
              <p>Select your track and submit your student details. Receive instant confirmation and your official Offer Letter within 24 hours.</p>
            </div>
            <div class="journey-step-box">
              <div class="journey-step-num">02</div>
              <h3>Milestone Projects</h3>
              <p>Work on weekly starter repositories with structured requirements, automated syntax checks, and step-by-step guidance.</p>
            </div>
            <div class="journey-step-box">
              <div class="journey-step-num">03</div>
              <h3>Mentor Code Reviews</h3>
              <p>Submit Pull Requests on GitHub. Senior software engineers inspect your code, provide constructive feedback, and approve your milestone.</p>
            </div>
            <div class="journey-step-box">
              <div class="journey-step-num">04</div>
              <h3>Verified Certification &amp; LoR</h3>
              <p>Deploy your capstone project live. Receive your ISO-aligned verified certificate and Letter of Recommendation (LoR).</p>
            </div>
          </div>
        </div>
      </section>



      <!-- 7. Verified Student Testimonials -->
      <section class="portal-section-alt" id="student-reviews">
        <div class="container">
          <div class="section-title text-center">
            <span class="eyebrow">Alumni Success</span>
            <h2>What Past Students Say</h2>
            <p>Real feedback from engineering students who completed their credentials with ABSS Nexus.</p>
          </div>

          <div class="portal-grid">
            <div class="portal-card">
              <div style="color: #f59e0b; margin-bottom: 12px; font-size: 1.1rem;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p class="portal-card-desc">
                &ldquo;The web development internship at ABSS Nexus was a game changer for my 6th-semester college submission. My college accepted the certificate and LoR without any questions, and the project I built helped me crack my first tech interview!&rdquo;
              </p>
              <div style="display: flex; align-items: center; gap: 12px; margin-top: 14px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #0071e3, #5ac8fa); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff;">RS</div>
                <div>
                  <strong style="display: block; color: var(--color-near-black, #1D1D1F); font-size: 0.95rem;">Rahul Sharma</strong>
                  <span style="font-size: 0.8rem; color: var(--color-secondary-text, #6E6E73);">B.Tech CSE &bull; RTU Kota</span>
                </div>
              </div>
            </div>

            <div class="portal-card">
              <div style="color: #f59e0b; margin-bottom: 12px; font-size: 1.1rem;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p class="portal-card-desc">
                &ldquo;Instead of boring theory lectures, Shubham sir gave direct code reviews on my GitHub commits. I learned how real APIs, token authentication, and databases work in production. Outstanding technical value.&rdquo;
              </p>
              <div style="display: flex; align-items: center; gap: 12px; margin-top: 14px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #34c759, #30b0c7); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff;">PK</div>
                <div>
                  <strong style="display: block; color: var(--color-near-black, #1D1D1F); font-size: 0.95rem;">Pooja Kumari</strong>
                  <span style="font-size: 0.8rem; color: var(--color-secondary-text, #6E6E73);">MCA &bull; University of Rajasthan</span>
                </div>
              </div>
            </div>

            <div class="portal-card">
              <div style="color: #f59e0b; margin-bottom: 12px; font-size: 1.1rem;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p class="portal-card-desc">
                &ldquo;The QR code on the certificate directly opens the verification page on abssnexus.in. When my college placement coordinator checked it, they were impressed by the professionalism and grade breakdown. Highly recommended!&rdquo;
              </p>
              <div style="display: flex; align-items: center; gap: 12px; margin-top: 14px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #af52de, #ff2d55); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff;">AV</div>
                <div>
                  <strong style="display: block; color: var(--color-near-black, #1D1D1F); font-size: 0.95rem;">Ankit Verma</strong>
                  <span style="font-size: 0.8rem; color: var(--color-secondary-text, #6E6E73);">BCA &bull; Amity University</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. Student FAQs -->
      <section class="portal-section-white" id="student-faqs">
        <div class="container">
          <div class="section-title text-center">
            <span class="eyebrow">Frequently Asked Questions</span>
            <h2>Common Student Questions</h2>
            <p>Everything you need to know about eligibility, schedules, and certificate acceptance.</p>
          </div>

          <div style="max-width: 800px; margin: 32px auto 0;">
            <div class="agency-faq-card">
              <button class="faq-agency-btn" type="button" aria-expanded="false" aria-controls="faq-intern-1" data-faq-toggle>
                <span>Will my college or university accept this internship certificate?</span>
                <svg class="faq-chevron-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="faq-agency-answer" id="faq-intern-1" hidden>
                <p>Yes, absolutely. Our certificates include your unique Credential ID, program duration, performance grade, and a live verification QR code that any college authority or university examiner can verify online at abssnexus.in/verify-certificate.</p>
              </div>
            </div>

            <div class="agency-faq-card">
              <button class="faq-agency-btn" type="button" aria-expanded="false" aria-controls="faq-intern-2" data-faq-toggle>
                <span>Can I complete this internship alongside regular college classes?</span>
                <svg class="faq-chevron-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="faq-agency-answer" id="faq-intern-2" hidden>
                <p>Yes. The internship is 100% virtual and self-paced. You have flexible hours to work on your milestone projects and submit tasks according to your study schedule.</p>
              </div>
            </div>

            <div class="agency-faq-card">
              <button class="faq-agency-btn" type="button" aria-expanded="false" aria-controls="faq-intern-3" data-faq-toggle>
                <span>When will I receive my official Offer Letter?</span>
                <svg class="faq-chevron-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="faq-agency-answer" id="faq-intern-3" hidden>
                <p>Once you register and confirm your track, your official Internship Offer Letter is generated within 24 hours so you can submit it immediately to your college HOD or placement cell.</p>
              </div>
            </div>

            <div class="agency-faq-card">
              <button class="faq-agency-btn" type="button" aria-expanded="false" aria-controls="faq-intern-4" data-faq-toggle>
                <span>What happens if I get stuck while coding my project?</span>
                <svg class="faq-chevron-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="faq-agency-answer" id="faq-intern-4" hidden>
                <p>You have direct access to our technical mentors via your student dashboard, email, and dedicated WhatsApp helpline. You can ask doubts, get code review pointers, and debug errors efficiently.</p>
              </div>
            </div>

            <div class="agency-faq-card">
              <button class="faq-agency-btn" type="button" aria-expanded="false" aria-controls="faq-intern-5" data-faq-toggle>
                <span>How is the Letter of Recommendation (LoR) awarded?</span>
                <svg class="faq-chevron-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="faq-agency-answer" id="faq-intern-5" hidden>
                <p>Interns who complete all weekly milestones on time and submit a high-quality capstone project with Grade A or A+ distinction receive a signed, personalized Letter of Recommendation (LoR) from our Founder &amp; Technical Lead Shubham Kumar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 9. Final High-Converting CTA Band -->
      <section class="portal-section-alt" id="apply-cta">
        <div class="container text-center" style="max-width: 800px;">
          <span class="eyebrow">Take Action Today</span>
          <h2 style="margin-bottom: 16px; font-size: clamp(1.8rem, 3.5vw, 2.6rem);">Begin Your Practical Engineering Career</h2>
          <p style="color: var(--portal-text-muted); margin-bottom: 32px; line-height: 1.6; font-size: 1.1rem;">
            Seats for the upcoming November 2026 cohort are filling up fast. Register your student account now, select your track, and receive your official Offer Letter within 24 hours.
          </p>
          <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
            <a class="btn btn-glow-cyan" href="/internships/register">
              <span>Register Free Student Account &rarr;</span>
            </a>
            <a class="btn btn-whatsapp-outline" href="https://wa.me/918757928673" target="_blank" rel="noopener noreferrer">
              <span>Chat on WhatsApp (+91 87579 28673)</span>
            </a>
          </div>
        </div>
      </section>`
});

// 2. /internships/programs — BROWSE PROGRAMS
// =============================================================================
generatePage({
  filename: "internships-programs.html",
  title: "Internship Programs & Curriculum Tracks | ABSS Nexus Technologies",
  metaDescription: "Browse all available internship curriculum tracks at ABSS Nexus Technologies: Web Development, Full-Stack Software, UI/UX Design, AI/ML, and Cloud DevOps.",
  canonicalUrl: "https://abssnexus.in/internships/programs",
  activeRoute: "/internships/programs",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Internship Curriculum Tracks",
    "description": "Comprehensive catalog of modular engineering internship programs offered by ABSS Nexus Technologies.",
    "url": "https://abssnexus.in/internships/programs"
  },
  mainContent: `      <section class="portal-hero">
        <div class="portal-hero-container">
          <span class="portal-badge portal-badge-urgent">
            Curriculum Catalog &bull; 5 Modular Tracks
          </span>
          <h1>Internship Programs &amp; Curriculum Tracks</h1>
          <p class="portal-hero-desc">
            Explore our structured technical training tracks. Each program is built around hands-on engineering deliverables, milestone reviews, and modern industry standards.
          </p>
        </div>
      </section>

${renderPortalSubNav("programs")}

      <section class="portal-section-white">
        <div class="container">
          <div style="background: #FFF9E6; border: 1px solid rgba(178, 94, 0, 0.25); border-radius: 12px; padding: 16px 20px; margin-bottom: 32px; font-size: 0.9rem; color: #7A3E00; line-height: 1.5;">
            <strong>Important Notice:</strong> All programs listed below represent approved curriculum frameworks in this foundation phase. There are no fees or seat charges currently levied. In accordance with our safety and transparency standards, we do not invent vacancies, salaries, or commercial job guarantees.
          </div>

          <div class="portal-grid">
            <!-- Program 1: Web Development -->
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Web Engineering</span>
                <h3>Web Development Track</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; Remote Virtual</span>
                <span class="portal-meta-pill">&#128179; Free Preview</span>
              </div>
              <p class="portal-card-desc">
                High-speed business platforms, responsive mobile-first layouts, vanilla CSS architectures, semantic web standards, and Core Web Vitals optimization.
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> HTML5, Modern CSS, JavaScript ES6+, Web Vitals, a11y, Git.
              </div>
              <div class="portal-card-footer">
                <a class="btn btn-glow-cyan" href="/internships/programs/web-development" style="width: 100%; text-align: center; display: block;">View Curriculum &rarr;</a>
              </div>
            </div>

            <!-- Program 2: Software Development -->
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Full-Stack &amp; Systems</span>
                <h3>Software &amp; Full-Stack Track</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; Remote Virtual</span>
                <span class="portal-meta-pill">&#128179; Free Preview</span>
              </div>
              <p class="portal-card-desc">
                Practical backend architecture with Node.js, relational data modeling, password hashing and cookie sessions, REST APIs, and edge deployment.
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> Node.js, SQLite/PostgreSQL, Sessions, REST APIs, Security, Git.
              </div>
              <div class="portal-card-footer">
                <a class="btn btn-glow-cyan" href="/internships/programs/software-development" style="width: 100%; text-align: center; display: block;">View Curriculum &rarr;</a>
              </div>
            </div>

            <!-- Program 3: UI/UX Design -->
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Design Systems &amp; UX</span>
                <h3>UI/UX Design Track</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; Remote Virtual</span>
                <span class="portal-meta-pill">&#128179; Free Preview</span>
              </div>
              <p class="portal-card-desc">
                Design system development in Figma, high-fidelity wireframing, user journey maps, WCAG accessibility standards, and developer handoff documentation.
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> Figma, Tokens, User Research, Prototyping, Wireframes, WCAG.
              </div>
              <div class="portal-card-footer">
                <a class="btn btn-glow-cyan" href="/internships/programs/ui-ux-design" style="width: 100%; text-align: center; display: block;">View Curriculum &rarr;</a>
              </div>
            </div>

            <!-- Program 4: AI & Machine Learning -->
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Data &amp; Applied AI</span>
                <h3>AI &amp; Machine Learning Track</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; Remote Virtual</span>
                <span class="portal-meta-pill">&#128179; Free Preview</span>
              </div>
              <p class="portal-card-desc">
                Applied machine learning using Python, feature engineering, statistical evaluation metrics, supervised models, and RESTful model inference endpoints.
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> Python, Pandas, NumPy, Scikit-Learn, Feature Engineering, API serving.
              </div>
              <div class="portal-card-footer">
                <a class="btn btn-glow-cyan" href="/internships/programs/ai-machine-learning" style="width: 100%; text-align: center; display: block;">View Curriculum &rarr;</a>
              </div>
            </div>

            <!-- Program 5: Cloud Architecture & DevOps -->
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Infrastructure &amp; DevOps</span>
                <h3>Cloud &amp; DevOps Track</h3>
              </div>
              <div class="portal-meta-pills">
                <span class="portal-meta-pill">&#127760; Remote Virtual</span>
                <span class="portal-meta-pill">&#128179; Free Preview</span>
              </div>
              <p class="portal-card-desc">
                Edge computing architectures, Cloudflare Pages/Workers, DNS routing, automated CI/CD branch validation, SSL/TLS hardening, and system observability.
              </p>
              <div class="portal-card-skills">
                <strong>Skills:</strong> Edge Functions, Cloudflare Pages, CI/CD, Git, HTTP Headers, DNS.
              </div>
              <div class="portal-card-footer">
                <a class="btn btn-glow-cyan" href="/internships/programs/cloud-devops" style="width: 100%; text-align: center; display: block;">View Curriculum &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>`
});

// =============================================================================
// 3. PROGRAM DETAIL PAGES (5 Tracks)
// =============================================================================
const programTracks = [
  {
    slug: "web-development",
    title: "Web Development Internship Track",
    metaDescription: "Comprehensive Web Development Internship at ABSS Nexus Technologies. Learn semantic HTML, responsive CSS, JavaScript, Core Web Vitals, and modern web engineering.",
    duration: "8 Weeks (Modular)",
    mode: "Remote Virtual Learning",
    badge: "Web Engineering",
    skills: "HTML5, CSS Grid/Flexbox, JavaScript ES6+, Web Vitals (LCP, CLS, INP), Accessibility, Git",
    modules: [
      {
        num: "Module 1",
        title: "Semantic HTML5, Architecture & Accessibility",
        topics: ["Document structure, semantic landmarks (<main>, <header>, <nav>, <section>)", "Accessible ARIA attributes, keyboard tab order, and screen-reader testing", "Clean URL conventions, meta tags, and Open Graph configurations"],
        outcome: "Deliver an accessible, valid static markup skeleton conforming to WCAG 2.1 AA."
      },
      {
        num: "Module 2",
        title: "Modern CSS Architecture & Apple-Inspired Design Tokens",
        topics: ["CSS custom properties (tokens), color palette design, and typography hierarchy", "Responsive layout engineering with CSS Grid and Flexbox (no bloated frameworks)", "Micro-interactions, smooth hover transitions, and reduced-motion media queries"],
        outcome: "Construct a complete, framework-free design system with responsive breakpoints."
      },
      {
        num: "Module 3",
        title: "Client-Side JavaScript & Async API Integration",
        topics: ["ES6+ syntax, DOM manipulation, and event delegation patterns", "Form validation with native Constraint Validation API and async Fetch requests", "Secure state management without insecure localStorage token storage"],
        outcome: "Implement an interactive, asynchronously validated form with real-time feedback."
      },
      {
        num: "Module 4",
        title: "Performance Engineering & Core Web Vitals Optimization",
        topics: ["Largest Contentful Paint (LCP) diagnostics and critical rendering paths", "Cumulative Layout Shift (CLS) prevention through explicit aspect ratios", "Automated validation pipelines and lighthouse performance auditing"],
        outcome: "Audit and optimize a web application to achieve 95+ Lighthouse performance scores."
      }
    ],
    eligibility: "Students or graduates enrolled in BCA, B.Tech, Computer Science, or related degrees with basic understanding of web basics.",
    requirements: "Personal laptop/desktop, code editor (VS Code recommended), modern browser (Chrome/Edge/Firefox), and 10-12 hours per week commitment."
  },
  {
    slug: "software-development",
    title: "Software & Full-Stack Development Track",
    metaDescription: "Software & Full-Stack Development Internship at ABSS Nexus Technologies. Master Node.js, relational database schemas, secure sessions, and REST APIs.",
    duration: "10 Weeks (Modular)",
    mode: "Remote Virtual Learning",
    badge: "Full-Stack & Systems",
    skills: "Node.js, Express/HTTP, SQLite/PostgreSQL, Authentication & Sessions, REST API Design, Git",
    modules: [
      {
        num: "Module 1",
        title: "Node.js Fundamentals & Server Architecture",
        topics: ["Event loop, asynchronous patterns, and native Node.js HTTP/URL modules", "Modular project structure, request handling, and error middleware", "Environment variables management and secret isolation best practices"],
        outcome: "Build a robust HTTP service handling routing and structured JSON responses."
      },
      {
        num: "Module 2",
        title: "Relational Database Design & Migrations",
        topics: ["SQLite / Cloudflare D1 relational modeling and foreign key constraints", "Additive, reversible migration files and schema management", "Parameterized SQL queries to prevent SQL injection vulnerabilities"],
        outcome: "Author additive database migrations and write resilient CRUD queries."
      },
      {
        num: "Module 3",
        title: "Authentication, Password Hashing & Cookie Sessions",
        topics: ["Modern password hashing using scrypt with cryptographically random salts", "Expiring verification tokens and secure single-use token hashes", "HttpOnly, SameSite cookie sessions and CSRF protection mechanisms"],
        outcome: "Implement complete, production-grade student registration and session authentication."
      },
      {
        num: "Module 4",
        title: "RESTful API Engineering & Rate Limiting",
        topics: ["Idempotent API endpoint design and HTTP status code compliance", "Server-side payload sanitization and structured error messaging", "In-memory and edge sliding-window rate limiting architectures"],
        outcome: "Expose protected REST endpoints guarded by rate limiting and session verification."
      }
    ],
    eligibility: "Students with foundational programming knowledge in JavaScript, Python, or C++ seeking practical full-stack and backend engineering experience.",
    requirements: "Computer with Node.js LTS installed, Git, basic terminal familiarity, and 12-14 hours weekly commitment."
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design & Product Interface Track",
    metaDescription: "UI/UX Design & Product Interface Internship at ABSS Nexus Technologies. Learn Figma prototyping, design systems, usability testing, and WCAG accessibility.",
    duration: "6 Weeks (Modular)",
    mode: "Remote Virtual Learning",
    badge: "Design Systems & UX",
    skills: "Figma Prototyping, Design Systems, Typography & Color Tokens, Wireframing, User Testing, WCAG 2.1",
    modules: [
      {
        num: "Module 1",
        title: "User Research & Problem Definition",
        topics: ["User persona creation and competitive interface benchmarking", "Information architecture, sitemaps, and user journey mapping", "Feature prioritization and minimalist product scope formulation"],
        outcome: "Formulate a user journey map and architectural wireframe hierarchy."
      },
      {
        num: "Module 2",
        title: "Design System Tokens & Typography Hierarchy",
        topics: ["Apple-inspired light palette tokens (#FFFFFF, #F5F5F7, #1D1D1F, #0066CC)", "Typographic pairing with Space Grotesk and Inter for digital interfaces", "Atomic component architecture in Figma (buttons, inputs, cards, dialogs)"],
        outcome: "Assemble a reusable Figma component library with variants and auto-layout."
      },
      {
        num: "Module 3",
        title: "High-Fidelity Prototyping & Developer Handoff",
        topics: ["Interactive transitions, smart animation, and mobile responsive variants", "WCAG 2.1 AA color contrast compliance and accessible focus states", "Structured handoff documentation with spacing tokens and CSS property specs"],
        outcome: "Deliver an interactive clickable prototype and comprehensive developer design spec."
      }
    ],
    eligibility: "Designers, creative students, and frontend enthusiasts with an eye for visual hierarchy and user-centered design.",
    requirements: "Free Figma account, computer with modern web browser, and 8-10 hours weekly commitment."
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Applied Machine Learning Track",
    metaDescription: "AI & Applied Machine Learning Internship at ABSS Nexus Technologies. Practical data preprocessing, supervised learning, model evaluation, and API serving.",
    duration: "8 Weeks (Modular)",
    mode: "Remote Virtual Learning",
    badge: "Data & Applied AI",
    skills: "Python, NumPy, Pandas, Scikit-Learn, Feature Engineering, Model Serving, Evaluation Metrics",
    modules: [
      {
        num: "Module 1",
        title: "Data Preprocessing & Exploratory Analysis",
        topics: ["Data wrangling with Pandas and numerical computation with NumPy", "Handling missing values, outlier detection, and categorical encoding", "Exploratory data visualization and correlation analysis"],
        outcome: "Clean, explore, and preprocess a real-world tabular dataset."
      },
      {
        num: "Module 2",
        title: "Supervised Learning Models & Feature Engineering",
        topics: ["Regression and classification algorithms in Scikit-Learn", "Feature scaling, cross-validation, and hyperparameter tuning", "Evaluating models with Precision, Recall, F1-Score, and ROC-AUC curves"],
        outcome: "Train and rigorously evaluate predictive models with cross-validation."
      },
      {
        num: "Module 3",
        title: "Model Serialization & REST API Serving",
        topics: ["Model serialization using joblib/pickle and inference optimization", "Exposing prediction endpoints via lightweight Python web services", "Input validation and error handling for production inference requests"],
        outcome: "Package a trained model and serve predictions through a clean REST API."
      }
    ],
    eligibility: "Students with foundational Python programming knowledge and basic mathematics/statistics coursework.",
    requirements: "Python 3.10+ installed or access to Google Colab, and 10-12 hours weekly commitment."
  },
  {
    slug: "cloud-devops",
    title: "Cloud Architecture & DevOps Track",
    metaDescription: "Cloud Architecture & DevOps Internship at ABSS Nexus Technologies. Edge computing, Cloudflare Pages/Workers, automated CI/CD pipelines, and SSL hardening.",
    duration: "6 Weeks (Modular)",
    mode: "Remote Virtual Learning",
    badge: "Infrastructure & DevOps",
    skills: "Cloudflare Pages/Workers, Edge Routing, Git CI/CD, SSL/TLS, DNS Configuration, Monitoring",
    modules: [
      {
        num: "Module 1",
        title: "Edge Architectures & Static Site Deployment",
        topics: ["Static asset hosting, CDN edge distribution, and caching strategies", "Cloudflare Pages deployment conventions and _redirects / _headers rules", "Custom domain configuration, DNS records, and SSL/TLS termination"],
        outcome: "Configure and deploy an edge-cached static web platform with zero downtime."
      },
      {
        num: "Module 2",
        title: "Edge Serverless Functions & Security Hardening",
        topics: ["Cloudflare Workers / Pages Functions serverless request handling", "HTTP security headers (CSP, HSTS, X-Content-Type-Options, X-Frame-Options)", "Bot protection and Cloudflare Turnstile CAPTCHA integration"],
        outcome: "Implement hardened edge APIs with strict headers and bot mitigation."
      },
      {
        num: "Module 3",
        title: "CI/CD Automation & Validation Pipelines",
        topics: ["Automated pull-request syntax and link checking with bash scripts", "Pre-deployment staging builds and automated schema verification", "Observability, log analysis, and performance telemetry"],
        outcome: "Build an automated continuous validation workflow guaranteeing zero regressions."
      }
    ],
    eligibility: "Students interested in cloud computing, edge infrastructure, DevOps automation, and system administration.",
    requirements: "Personal computer with terminal access, Git installed, GitHub account, and 8-10 hours weekly commitment."
  }
];

programTracks.forEach((track) => {
  const modulesHtml = track.modules
    .map(
      (mod) => `            <div class="curriculum-module">
              <div class="module-header">
                <span class="module-number">${mod.num}</span>
                <span class="portal-badge portal-badge-urgent">Core Milestone</span>
              </div>
              <h3 class="module-title">${mod.title}</h3>
              <ul class="module-topics-list">
                ${mod.topics.map((top) => `<li>${top}</li>`).join("\n                ")}
              </ul>
              <div class="module-outcome">
                <strong>Deliverable:</strong> ${mod.outcome}
              </div>
            </div>`
    )
    .join("\n");

  generatePage({
    filename: `internships-program-${track.slug}.html`,
    title: `${track.title} | ABSS Nexus Technologies`,
    metaDescription: track.metaDescription,
    canonicalUrl: `https://abssnexus.in/internships/programs/${track.slug}`,
    activeRoute: `/internships/programs/${track.slug}`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": track.title,
      "description": track.metaDescription,
      "provider": {
        "@type": "Organization",
        "name": "ABSS Nexus Technologies",
        "url": "https://abssnexus.in"
      }
    },
    mainContent: `      <section class="portal-hero">
        <div class="portal-hero-container">
          <span class="portal-badge portal-badge-urgent">
            ${track.badge} &bull; ${track.duration}
          </span>
          <h1>${track.title}</h1>
          <p class="portal-hero-desc">
            A structured modular curriculum focusing on production engineering standards, hands-on milestones, and verified portfolio deliverables.
          </p>
          <div class="portal-hero-actions">
            <a class="btn btn-glow-cyan" href="/internships/register">Register for Track &rarr;</a>
            <a class="btn btn-glass" href="/internships/programs">&larr; Back to All Programs</a>
          </div>
        </div>
      </section>

${renderPortalSubNav("programs")}

      <section class="portal-section-white">
        <div class="container" style="max-width: 900px;">
          <div style="background: #FFF9E6; border: 1px solid rgba(178, 94, 0, 0.25); border-radius: 12px; padding: 16px 20px; margin-bottom: 32px; font-size: 0.9rem; color: #7A3E00; line-height: 1.5;">
            <strong>Demonstration Curriculum:</strong> This track reflects our approved syllabus framework. There are no fees or charges in this foundation phase. ABSS Nexus Technologies provides real technical education but does not make false placement promises or exaggerated claims.
          </div>

          <div style="background: #F5F5F7; border: 1px solid var(--color-border); border-radius: 14px; padding: 24px 28px; margin-bottom: 40px;">
            <h2 style="font-family: var(--font-heading); font-size: 1.25rem; margin: 0 0 16px; color: var(--color-near-black);">Track Overview &amp; Key Parameters</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; font-size: 0.9rem;">
              <div><strong>Duration:</strong> <span style="color: var(--color-secondary-text);">${track.duration}</span></div>
              <div><strong>Work Mode:</strong> <span style="color: var(--color-secondary-text);">${track.mode}</span></div>
              <div><strong>Program Fee:</strong> <span style="color: var(--color-blue); font-weight: 700;">Free / Preview Phase</span></div>
              <div><strong>Target Audience:</strong> <span style="color: var(--color-secondary-text);">Students &amp; Graduates</span></div>
            </div>
            <div style="margin-top: 16px; font-size: 0.9rem; border-top: 1px solid #E0E0E5; padding-top: 12px;">
              <strong>Core Technologies:</strong> <span style="color: var(--color-secondary-text);">${track.skills}</span>
            </div>
          </div>

          <div style="margin-bottom: 36px;">
            <div class="section-title">
              <span class="eyebrow">Milestone Syllabus</span>
              <h2>Detailed Module Breakdown</h2>
              <p>Each module combines theoretical foundations with practical code deliverables.</p>
            </div>

${modulesHtml}
          </div>

          <div style="background: #FFFFFF; border: 1px solid var(--color-border); border-radius: 14px; padding: 28px; margin-bottom: 40px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--color-near-black); margin: 0 0 14px;">Eligibility &amp; Prerequisites</h3>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--color-secondary-text); margin: 0 0 16px;">
              ${track.eligibility}
            </p>
            <h4 style="font-family: var(--font-heading); font-size: 1rem; color: var(--color-near-black); margin: 0 0 8px;">Technical Equipment:</h4>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--color-secondary-text); margin: 0;">
              ${track.requirements}
            </p>
          </div>

          <div style="text-align: center; padding: 32px 0;">
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--color-near-black); margin: 0 0 12px;">Ready to Explore This Track?</h3>
            <p style="color: var(--color-secondary-text); margin: 0 auto 24px; max-width: 540px;">
              Register your student profile today to view upcoming cohort dates, access track materials, and begin working on foundational milestones.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a class="btn btn-glow-cyan" href="/internships/register">Register for Track &rarr;</a>
              <a class="btn btn-glass" href="/internships/faq">Read Track FAQs</a>
              <a class="btn btn-glass" href="/internships/support">Ask Questions</a>
            </div>
          </div>
        </div>
      </section>`
  });
});

// =============================================================================
// 4. /internships/how-it-works — HOW IT WORKS
// =============================================================================
generatePage({
  filename: "internships-how-it-works.html",
  title: "How It Works: Application & Learning Process | ABSS Nexus Technologies",
  metaDescription: "Understand the 5-step learning and evaluation process for ABSS Nexus Technologies internships: registration, milestones, code reviews, and certification.",
  canonicalUrl: "https://abssnexus.in/internships/how-it-works",
  activeRoute: "/internships/how-it-works",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Participate in ABSS Nexus Internship Programs",
    "description": "Step-by-step student learning journey from registration through milestone delivery and verified certification.",
    "url": "https://abssnexus.in/internships/how-it-works"
  },
  mainContent: `      <section class="portal-hero">
        <div class="portal-hero-container">
          <span class="portal-badge">
            Step-by-Step Learning Process
          </span>
          <h1>How the Internship Process Works</h1>
          <p class="portal-hero-desc">
            A transparent walkthrough of how our virtual internships operate &mdash; from student account creation to milestone evaluation and verified project completion.
          </p>
        </div>
      </section>

${renderPortalSubNav("how-it-works")}

      <section class="portal-section-white">
        <div class="container" style="max-width: 860px;">
          <div class="portal-grid" style="grid-template-columns: 1fr; gap: 28px;">
            <!-- Step 1 -->
            <div class="portal-card" style="padding: 32px;">
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
                <span style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: #0066CC; color: #FFFFFF; font-weight: 700; font-size: 1rem;">1</span>
                <h3 style="margin: 0; font-family: var(--font-heading); font-size: 1.3rem; color: var(--color-near-black);">Browse Curriculum &amp; Create Student Profile</h3>
              </div>
              <p class="portal-card-desc">
                Review the available program tracks, prerequisite requirements, and time commitments. Register with your name and email to set up your student access credentials.
              </p>
              <div class="portal-card-skills">
                <strong>Output:</strong> Verified student account with access to the personalized learning dashboard.
              </div>
            </div>

            <!-- Step 2 -->
            <div class="portal-card" style="padding: 32px;">
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
                <span style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: #0066CC; color: #FFFFFF; font-weight: 700; font-size: 1rem;">2</span>
                <h3 style="margin: 0; font-family: var(--font-heading); font-size: 1.3rem; color: var(--color-near-black);">Email Verification &amp; Account Activation</h3>
              </div>
              <p class="portal-card-desc">
                Confirm your student identity using our secure, expiring single-use verification token. This validates communication channels and protects the integrity of your academic records.
              </p>
              <div class="portal-card-skills">
                <strong>Output:</strong> Fully activated student account ready for cohort enrollment.
              </div>
            </div>

            <!-- Step 3 -->
            <div class="portal-card" style="padding: 32px;">
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
                <span style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: #0066CC; color: #FFFFFF; font-weight: 700; font-size: 1rem;">3</span>
                <h3 style="margin: 0; font-family: var(--font-heading); font-size: 1.3rem; color: var(--color-near-black);">Hands-On Milestone Projects</h3>
              </div>
              <p class="portal-card-desc">
                Work through structured modules with concrete engineering specifications. You write code using standard version control (Git), write tests, and document your implementation choices.
              </p>
              <div class="portal-card-skills">
                <strong>Output:</strong> Real repository commits and verifiable code deliverables on GitHub.
              </div>
            </div>

            <!-- Step 4 -->
            <div class="portal-card" style="padding: 32px;">
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
                <span style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: #0066CC; color: #FFFFFF; font-weight: 700; font-size: 1rem;">4</span>
                <h3 style="margin: 0; font-family: var(--font-heading); font-size: 1.3rem; color: var(--color-near-black);">Code Quality Review &amp; Feedback</h3>
              </div>
              <p class="portal-card-desc">
                Submissions are reviewed against real-world criteria: accessibility, code structure, error handling, security, and performance. You receive constructive feedback to refine your work.
              </p>
              <div class="portal-card-skills">
                <strong>Output:</strong> Actionable feedback and revised code meeting engineering standards.
              </div>
            </div>

            <!-- Step 5 -->
            <div class="portal-card" style="padding: 32px;">
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
                <span style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: #0066CC; color: #FFFFFF; font-weight: 700; font-size: 1rem;">5</span>
                <h3 style="margin: 0; font-family: var(--font-heading); font-size: 1.3rem; color: var(--color-near-black);">Portfolio Showcase &amp; Verified Credential</h3>
              </div>
              <p class="portal-card-desc">
                Upon successfully passing all milestone criteria, students earn a verified certificate of completion with a unique credential ID and a substantive GitHub portfolio for job applications.
              </p>
              <div class="portal-card-skills">
                <strong>Output:</strong> Verified completion record and tangible project portfolio.
              </div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 48px;">
            <a class="btn btn-glow-cyan" href="/internships/register">Register Free Account &rarr;</a>
          </div>
        </div>
      </section>`
});

// =============================================================================
// 5. /internships/faq — FAQS
// =============================================================================
generatePage({
  filename: "internships-faq.html",
  title: "Internship FAQs & Answers | ABSS Nexus Technologies",
  metaDescription: "Frequently asked questions about ABSS Nexus Technologies internships: eligibility, remote work, equipment, honest fee policies, and evaluation criteria.",
  canonicalUrl: "https://abssnexus.in/internships/faq",
  activeRoute: "/internships/faq",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Internship Program FAQs",
    "description": "Answers to frequently asked questions about ABSS Nexus Technologies virtual internship programs.",
    "url": "https://abssnexus.in/internships/faq"
  },
  mainContent: `      <section class="portal-hero">
        <div class="portal-hero-container">
          <span class="portal-badge">
            Questions &amp; Transparent Answers
          </span>
          <h1>Internship Frequently Asked Questions</h1>
          <p class="portal-hero-desc">
            Direct, honest answers about program formats, technical prerequisites, fees, evaluation criteria, and academic expectations.
          </p>
        </div>
      </section>

${renderPortalSubNav("faq")}

      <section class="portal-section-white">
        <div class="container">
          <div class="portal-faq-list">
            <details class="portal-faq-item" open>
              <summary class="portal-faq-summary">Who is eligible to participate in these internship tracks?</summary>
              <div class="portal-faq-content">
                Any student currently enrolled in or recently graduated from a relevant technical degree (B.Tech, BCA, MCA, B.Sc Computer Science, or self-taught developers with equivalent foundational skills) is eligible to apply. Specific prerequisite skills are detailed on each track's curriculum page.
              </div>
            </details>

            <details class="portal-faq-item">
              <summary class="portal-faq-summary">Are these internships remote or in-person?</summary>
              <div class="portal-faq-content">
                All internship tracks offered through this portal are 100% remote virtual programs. You complete your milestone deliverables, submit code via Git, and receive reviews online from anywhere in India.
              </div>
            </details>

            <details class="portal-faq-item">
              <summary class="portal-faq-summary">What are the fees or charges for these internships?</summary>
              <div class="portal-faq-content">
                There are zero seat fees or charges in this foundation phase. All curriculum frameworks and syllabus previews are completely free. If an approved fee structure is introduced for future live mentorship cohorts, it will be transparently communicated and server-controlled with no hidden charges.
              </div>
            </details>

            <details class="portal-faq-item">
              <summary class="portal-faq-summary">Do you guarantee jobs, placements, or stipends?</summary>
              <div class="portal-faq-content">
                No. ABSS Nexus Technologies strictly abides by honest advertising standards. We provide real engineering curriculum, code reviews, and tangible portfolio artifacts, but we make zero false job guarantees, placement promises, or fake stipend claims. Success in the industry depends on your personal technical mastery and interview readiness.
              </div>
            </details>

            <details class="portal-faq-item">
              <summary class="portal-faq-summary">What hardware or software equipment do I need?</summary>
              <div class="portal-faq-content">
                You will need a reliable computer (laptop or desktop running Windows, macOS, or Linux) with an internet connection, a modern web browser, and standard free developer tools such as VS Code, Git, and Node.js or Python depending on your chosen track.
              </div>
            </details>

            <details class="portal-faq-item">
              <summary class="portal-faq-summary">How does email verification work?</summary>
              <div class="portal-faq-content">
                Upon registration, a single-use expiring token is generated to verify your email. In development environments where third-party SMTP is not yet configured, the platform transparently informs you and provides a direct verification link so you can complete testing without fake email delivery.
              </div>
            </details>

            <details class="portal-faq-item">
              <summary class="portal-faq-summary">Can I apply to more than one program track?</summary>
              <div class="portal-faq-content">
                Yes. You may explore multiple curriculum tracks through your student dashboard, though we recommend focusing on one primary track at a time to ensure high-quality milestone completion.
              </div>
            </details>

            <details class="portal-faq-item">
              <summary class="portal-faq-summary">How are milestone projects evaluated?</summary>
              <div class="portal-faq-content">
                Projects are evaluated using objective rubric metrics: functional correctness, adherence to semantic web standards, code readability, error handling, performance benchmarks, and documentation clarity.
              </div>
            </details>

            <details class="portal-faq-item">
              <summary class="portal-faq-summary">What happens if I encounter technical issues?</summary>
              <div class="portal-faq-content">
                You can reach our dedicated student support team via our student support page or by emailing abssnexus@gmail.com with your student account email and issue details.
              </div>
            </details>
          </div>
        </div>
      </section>`
});

// =============================================================================
// 6. /internships/support — SUPPORT
// =============================================================================
generatePage({
  filename: "internships-support.html",
  title: "Student Support & Inquiries | ABSS Nexus Technologies",
  metaDescription: "Contact the ABSS Nexus Technologies student support desk for assistance with registration, internship tracks, curriculum details, or technical help.",
  canonicalUrl: "https://abssnexus.in/internships/support",
  activeRoute: "/internships/support",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Internship Student Support Desk",
    "description": "Student support channels and contact information for ABSS Nexus Technologies internship programs.",
    "url": "https://abssnexus.in/internships/support"
  },
  mainContent: `      <section class="portal-hero">
        <div class="portal-hero-container">
          <span class="portal-badge">
            Dedicated Student Help Desk
          </span>
          <h1>Internship Support &amp; Enquiries</h1>
          <p class="portal-hero-desc">
            Need assistance with student registration, password reset, curriculum clarification, or technical issues? We are here to help.
          </p>
        </div>
      </section>

${renderPortalSubNav("support")}

      <section class="portal-section-white">
        <div class="container" style="max-width: 860px;">
          <div class="portal-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 40px;">
            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Email Support</span>
                <h3>Direct Email Desk</h3>
              </div>
              <p class="portal-card-desc">
                For questions regarding account verification, curriculum details, or portal feedback, email our engineering desk.
              </p>
              <div class="portal-card-skills">
                <a href="mailto:abssnexus@gmail.com" style="color: var(--color-blue); font-weight: 600; font-size: 0.95rem;">abssnexus@gmail.com</a>
                <div style="font-size: 0.8rem; margin-top: 4px; color: var(--color-secondary-text);">Response within 1-2 business days.</div>
              </div>
            </div>

            <div class="portal-card">
              <div class="portal-card-header">
                <span class="portal-badge">Phone &amp; WhatsApp</span>
                <h3>Direct Inquiry Line</h3>
              </div>
              <p class="portal-card-desc">
                Speak directly with our team for urgent registration assistance or partnership queries.
              </p>
              <div class="portal-card-skills">
                <a href="tel:+918757928673" style="color: var(--color-blue); font-weight: 600; font-size: 0.95rem;">+91 87579 28673</a>
                <div style="font-size: 0.8rem; margin-top: 4px; color: var(--color-secondary-text);">Mon &ndash; Fri, 9:30 AM &ndash; 6:30 PM IST</div>
              </div>
            </div>
          </div>

          <div style="background: #F5F5F7; border: 1px solid var(--color-border); border-radius: 16px; padding: 32px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--color-near-black); margin: 0 0 12px;">Frequently Needed Quick Links</h3>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--color-secondary-text); font-size: 0.92rem;">
              <li><a href="/internships/faq" style="color: var(--color-blue); text-decoration: underline;">Browse All Frequently Asked Questions</a> &mdash; Find immediate answers to common questions.</li>
              <li><a href="/internships/forgot-password" style="color: var(--color-blue); text-decoration: underline;">Forgot Password</a> &mdash; Request a secure password reset link.</li>
              <li><a href="/internships/verify-email" style="color: var(--color-blue); text-decoration: underline;">Verify Student Email</a> &mdash; Complete your account activation with a verification token.</li>
              <li><a href="/privacy-policy" style="color: var(--color-blue); text-decoration: underline;">Privacy Policy</a> &mdash; Review our data protection and confidentiality standards.</li>
            </ul>
          </div>
        </div>
      </section>`
});

// =============================================================================
// 7. STUDENT AUTHENTICATION PAGES (Noindex, Nofollow)
// =============================================================================

// A. Register Page
generatePage({
  filename: "internships-register.html",
  title: "Student Registration | ABSS Nexus Internship Portal",
  metaDescription: "Register for your free student account on the ABSS Nexus Internship Portal. Access modular engineering curriculum tracks and milestone projects.",
  canonicalUrl: "https://abssnexus.in/internships/register",
  activeRoute: "/internships/register",
  isAuthOrProtected: true,
  mainContent: `      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-header">
            <span class="portal-badge">Student Access</span>
            <h1>Create Student Account</h1>
            <p>Register to access curriculum tracks, milestone tasks, and technical reviews.</p>
          </div>

          <div id="auth-alert" class="auth-alert"></div>

          <form id="register-form" novalidate>
            <div class="auth-form-group">
              <label for="reg-name">Full Name *</label>
              <input class="auth-input" type="text" id="reg-name" name="name" required placeholder="e.g. Priya Sharma" autocomplete="name" />
            </div>

            <div class="auth-form-group">
              <label for="reg-email">Email Address *</label>
              <input class="auth-input" type="email" id="reg-email" name="email" required placeholder="e.g. priya@example.com" autocomplete="email" />
            </div>

            <div class="auth-form-group">
              <label for="reg-password">Password *</label>
              <input class="auth-input" type="password" id="reg-password" name="password" required minlength="8" placeholder="Minimum 8 characters (letters &amp; numbers)" autocomplete="new-password" />
            </div>

            <div class="auth-form-group">
              <label for="reg-confirm">Confirm Password *</label>
              <input class="auth-input" type="password" id="reg-confirm" name="confirmPassword" required minlength="8" placeholder="Repeat your password" autocomplete="new-password" />
            </div>

            <div class="auth-form-group">
              <label for="reg-track">Preferred Track (Optional)</label>
              <select class="auth-input" id="reg-track" name="track">
                <option value="">Select an interest track...</option>
                <option value="web-development">Web Development Track</option>
                <option value="software-development">Software &amp; Full-Stack Track</option>
                <option value="ui-ux-design">UI/UX Design Track</option>
                <option value="ai-machine-learning">AI &amp; Machine Learning Track</option>
                <option value="cloud-devops">Cloud Architecture &amp; DevOps Track</option>
              </select>
            </div>

            <div class="auth-form-group">
              <label for="reg-duration">Internship Duration *</label>
              <select class="auth-input" id="reg-duration" name="duration" required>
                <option value="">Select duration...</option>
                <option value="1 week">1 Week</option>
                <option value="2 week">2 Weeks</option>
                <option value="3 week">3 Weeks</option>
                <option value="4 week">4 Weeks</option>
                <option value="2 months">2 Months</option>
              </select>
            </div>

            <button type="submit" class="auth-btn-primary" id="reg-submit-btn">Create Account</button>
          </form>

          <div class="auth-links">
            Already have an account? <a href="/internships/login">Log in here</a>
          </div>
        </div>
      </div>`,
  additionalScripts: `    <script>
      (function() {
        const form = document.getElementById("register-form");
        const alertBox = document.getElementById("auth-alert");
        const submitBtn = document.getElementById("reg-submit-btn");

        function showAlert(type, message, htmlContent = "") {
          alertBox.className = "auth-alert visible auth-alert-" + type;
          if (htmlContent) {
            alertBox.innerHTML = htmlContent;
          } else {
            alertBox.textContent = message;
          }
        }

        form.addEventListener("submit", async function(e) {
          e.preventDefault();
          alertBox.className = "auth-alert";

          const name = document.getElementById("reg-name").value.trim();
          const email = document.getElementById("reg-email").value.trim().toLowerCase();
          const password = document.getElementById("reg-password").value;
          const confirmPassword = document.getElementById("reg-confirm").value;

          const track = document.getElementById("reg-track").value;
          const duration = document.getElementById("reg-duration").value;

          if (!name || name.length < 2) {
            showAlert("error", "Please provide your full name (minimum 2 characters).");
            return;
          }
          if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
            showAlert("error", "Please provide a valid email address.");
            return;
          }
          if (!password || password.length < 8) {
            showAlert("error", "Password must be at least 8 characters long.");
            return;
          }
          if (password !== confirmPassword) {
            showAlert("error", "Passwords do not match.");
            return;
          }
          if (!duration) {
            showAlert("error", "Please select an internship duration.");
            return;
          }

          submitBtn.disabled = true;
          submitBtn.textContent = "Creating Account...";

          try {
            const res = await fetch("/api/internships/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, password, track, duration })
            });
            const data = await res.json();

            if (!res.ok) {
              showAlert("error", data.error || "Registration failed. Please review your information.");
              submitBtn.disabled = false;
              submitBtn.textContent = "Create Account";
              return;
            }

            form.reset();
            let successHtml = "<strong>" + (data.message || "Account registered successfully!") + "</strong>";
            if (data.devVerificationUrl) {
              successHtml += "<div style='margin-top: 12px; font-size: 0.88rem; padding: 10px; background: #FFFFFF; border-radius: 8px; border: 1px solid #86EFAC;'><strong>Direct Verification Link:</strong><br><a href='" + data.devVerificationUrl + "' style='color: #0066CC; word-break: break-all; font-weight: 600; text-decoration: underline;'>Verify your email address now &rarr;</a></div>";
            }
            showAlert("success", "", successHtml);
            submitBtn.textContent = "Account Created";
          } catch (err) {
            showAlert("error", "Network connection error. Please try again.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Create Account";
          }
        });
      })();
    </script>`
});

// B. Login Page
generatePage({
  filename: "internships-login.html",
  title: "Student Login | ABSS Nexus Internship Portal",
  metaDescription: "Log in to your ABSS Nexus Technologies student portal account to view enrolled tracks, milestone projects, and course progress.",
  canonicalUrl: "https://abssnexus.in/internships/login",
  activeRoute: "/internships/login",
  isAuthOrProtected: true,
  mainContent: `      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-header">
            <span class="portal-badge">Student Portal</span>
            <h1>Student Login</h1>
            <p>Access your enrolled curriculum tracks and milestone tasks.</p>
          </div>

          <div id="auth-alert" class="auth-alert"></div>

          <form id="login-form" novalidate>
            <div class="auth-form-group">
              <label for="login-email">Email Address *</label>
              <input class="auth-input" type="email" id="login-email" name="email" required placeholder="your.email@example.com" autocomplete="email" />
            </div>

            <div class="auth-form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label for="login-password" style="margin-bottom: 0;">Password *</label>
                <a href="/internships/forgot-password" style="font-size: 0.8rem; color: var(--color-blue); text-decoration: underline;">Forgot password?</a>
              </div>
              <input class="auth-input" type="password" id="login-password" name="password" required placeholder="Enter your password" autocomplete="current-password" />
            </div>

            <button type="submit" class="auth-btn-primary" id="login-submit-btn">Log In</button>
          </form>

          <div class="auth-links">
            New student? <a href="/internships/register">Register for free</a>
          </div>
        </div>
      </div>`,
  additionalScripts: `    <script>
      (function() {
        const form = document.getElementById("login-form");
        const alertBox = document.getElementById("auth-alert");
        const submitBtn = document.getElementById("login-submit-btn");

        function showAlert(type, message, htmlContent = "") {
          alertBox.className = "auth-alert visible auth-alert-" + type;
          if (htmlContent) {
            alertBox.innerHTML = htmlContent;
          } else {
            alertBox.textContent = message;
          }
        }

        form.addEventListener("submit", async function(e) {
          e.preventDefault();
          alertBox.className = "auth-alert";

          const email = document.getElementById("login-email").value.trim().toLowerCase();
          const password = document.getElementById("login-password").value;

          if (!email || !password) {
            showAlert("error", "Please provide both your email address and password.");
            return;
          }

          submitBtn.disabled = true;
          submitBtn.textContent = "Authenticating...";

          try {
            const res = await fetch("/api/internships/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (!res.ok) {
              if (res.status === 403 && data.emailVerified === false) {
                showAlert("error", "", "<strong>" + data.error + "</strong><div style='margin-top: 8px;'><a href='/internships/verify-email' style='color: #0066CC; text-decoration: underline;'>Click here to verify your email address &rarr;</a></div>");
              } else {
                showAlert("error", data.error || "Invalid email or password.");
              }
              submitBtn.disabled = false;
              submitBtn.textContent = "Log In";
              return;
            }

            showAlert("success", "Login successful! Redirecting to dashboard...");
            const urlParams = new URLSearchParams(window.location.search);
            const redirectTarget = urlParams.get("redirect");
            const safeRedirect = (redirectTarget && redirectTarget.startsWith("/") && !redirectTarget.startsWith("//"))
              ? redirectTarget
              : "/internships/dashboard";

            setTimeout(() => {
              window.location.href = safeRedirect;
            }, 500);
          } catch (err) {
            showAlert("error", "Network connection error. Please try again.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Log In";
          }
        });
      })();
    </script>`
});

// C. Verify Email Page
generatePage({
  filename: "internships-verify-email.html",
  title: "Verify Student Email | ABSS Nexus Internship Portal",
  metaDescription: "Verify your student email address to activate your ABSS Nexus Technologies internship portal account.",
  canonicalUrl: "https://abssnexus.in/internships/verify-email",
  activeRoute: "/internships/verify-email",
  isAuthOrProtected: true,
  mainContent: `      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-header">
            <span class="portal-badge">Account Activation</span>
            <h1>Verify Your Email</h1>
            <p>Confirm your student account credentials with your secure token.</p>
          </div>

          <div id="auth-alert" class="auth-alert"></div>

          <form id="verify-form" novalidate>
            <div class="auth-form-group">
              <label for="verify-token">Verification Token *</label>
              <input class="auth-input" type="text" id="verify-token" name="token" required placeholder="Paste your 64-character verification token" />
            </div>

            <button type="submit" class="auth-btn-primary" id="verify-submit-btn">Verify Email Address</button>
          </form>

          <div id="verify-success-actions" style="display: none; text-align: center; margin-top: 24px;">
            <a class="btn-primary" href="/internships/login">Proceed to Student Login &rarr;</a>
          </div>

          <div class="auth-links">
            Need to register? <a href="/internships/register">Create account here</a>
          </div>
        </div>
      </div>`,
  additionalScripts: `    <script>
      (function() {
        const form = document.getElementById("verify-form");
        const alertBox = document.getElementById("auth-alert");
        const submitBtn = document.getElementById("verify-submit-btn");
        const tokenInput = document.getElementById("verify-token");
        const successActions = document.getElementById("verify-success-actions");

        function showAlert(type, message, htmlContent = "") {
          alertBox.className = "auth-alert visible auth-alert-" + type;
          if (htmlContent) {
            alertBox.innerHTML = htmlContent;
          } else {
            alertBox.textContent = message;
          }
        }

        async function submitVerification(token) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Verifying Token...";

          try {
            const res = await fetch("/api/internships/auth/verify-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token })
            });
            const data = await res.json();

            if (!res.ok) {
              showAlert("error", data.error || "Email verification failed.");
              submitBtn.disabled = false;
              submitBtn.textContent = "Verify Email Address";
              return;
            }

            form.style.display = "none";
            successActions.style.display = "block";
            showAlert("success", data.message || "Email address verified successfully! You can now log in.");
          } catch (err) {
            showAlert("error", "Network connection error. Please try again.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Verify Email Address";
          }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const queryToken = urlParams.get("token");
        if (queryToken) {
          tokenInput.value = queryToken;
          submitVerification(queryToken);
        }

        form.addEventListener("submit", function(e) {
          e.preventDefault();
          const token = tokenInput.value.trim();
          if (!token) {
            showAlert("error", "Please paste or enter your verification token.");
            return;
          }
          submitVerification(token);
        });
      })();
    </script>`
});

// D. Forgot Password Page
generatePage({
  filename: "internships-forgot-password.html",
  title: "Forgot Password | ABSS Nexus Internship Portal",
  metaDescription: "Request a password reset link for your ABSS Nexus Technologies internship student portal account.",
  canonicalUrl: "https://abssnexus.in/internships/forgot-password",
  activeRoute: "/internships/forgot-password",
  isAuthOrProtected: true,
  mainContent: `      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-header">
            <span class="portal-badge">Account Recovery</span>
            <h1>Reset Your Password</h1>
            <p>Enter your student email address to receive password reset instructions.</p>
          </div>

          <div id="auth-alert" class="auth-alert"></div>

          <form id="forgot-form" novalidate>
            <div class="auth-form-group">
              <label for="forgot-email">Email Address *</label>
              <input class="auth-input" type="email" id="forgot-email" name="email" required placeholder="your.email@example.com" autocomplete="email" />
            </div>

            <button type="submit" class="auth-btn-primary" id="forgot-submit-btn">Send Reset Instructions</button>
          </form>

          <div class="auth-links">
            Remembered your password? <a href="/internships/login">Return to login</a>
          </div>
        </div>
      </div>`,
  additionalScripts: `    <script>
      (function() {
        const form = document.getElementById("forgot-form");
        const alertBox = document.getElementById("auth-alert");
        const submitBtn = document.getElementById("forgot-submit-btn");

        function showAlert(type, message, htmlContent = "") {
          alertBox.className = "auth-alert visible auth-alert-" + type;
          if (htmlContent) {
            alertBox.innerHTML = htmlContent;
          } else {
            alertBox.textContent = message;
          }
        }

        form.addEventListener("submit", async function(e) {
          e.preventDefault();
          alertBox.className = "auth-alert";

          const email = document.getElementById("forgot-email").value.trim().toLowerCase();
          if (!email) {
            showAlert("error", "Please provide your registered student email address.");
            return;
          }

          submitBtn.disabled = true;
          submitBtn.textContent = "Processing Request...";

          try {
            const res = await fetch("/api/internships/auth/forgot-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email })
            });
            const data = await res.json();

            let msg = data.message || "If an account with that email exists, password reset instructions have been generated.";
            let successHtml = "<strong>" + msg + "</strong>";

            if (data.devResetUrl) {
              successHtml += "<div style='margin-top: 12px; font-size: 0.88rem; padding: 10px; background: #FFFFFF; border-radius: 8px; border: 1px solid #BFDBFE;'><strong>Direct Password Reset Link:</strong><br><a href='" + data.devResetUrl + "' style='color: #0066CC; word-break: break-all; font-weight: 600; text-decoration: underline;'>Reset your password now &rarr;</a></div>";
            }

            showAlert("info", "", successHtml);
            form.reset();
            submitBtn.textContent = "Request Sent";
          } catch (err) {
            showAlert("error", "Network connection error. Please try again.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Reset Instructions";
          }
        });
      })();
    </script>`
});

// E. Reset Password Page
generatePage({
  filename: "internships-reset-password.html",
  title: "Set New Password | ABSS Nexus Internship Portal",
  metaDescription: "Set a new secure password for your ABSS Nexus Technologies internship student portal account.",
  canonicalUrl: "https://abssnexus.in/internships/reset-password",
  activeRoute: "/internships/reset-password",
  isAuthOrProtected: true,
  mainContent: `      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-header">
            <span class="portal-badge">Security Update</span>
            <h1>Set New Password</h1>
            <p>Create a fresh, secure password for your student account.</p>
          </div>

          <div id="auth-alert" class="auth-alert"></div>

          <form id="reset-form" novalidate>
            <div class="auth-form-group">
              <label for="reset-token">Reset Token *</label>
              <input class="auth-input" type="text" id="reset-token" name="token" required placeholder="Paste your password reset token" />
            </div>

            <div class="auth-form-group">
              <label for="reset-new-password">New Password *</label>
              <input class="auth-input" type="password" id="reset-new-password" name="newPassword" required minlength="8" placeholder="Minimum 8 characters (letters &amp; numbers)" autocomplete="new-password" />
            </div>

            <div class="auth-form-group">
              <label for="reset-confirm-password">Confirm New Password *</label>
              <input class="auth-input" type="password" id="reset-confirm-password" name="confirmPassword" required minlength="8" placeholder="Repeat new password" autocomplete="new-password" />
            </div>

            <button type="submit" class="auth-btn-primary" id="reset-submit-btn">Update Password</button>
          </form>

          <div id="reset-success-actions" style="display: none; text-align: center; margin-top: 24px;">
            <a class="btn-primary" href="/internships/login">Proceed to Student Login &rarr;</a>
          </div>

          <div class="auth-links">
            Back to <a href="/internships/login">Student Login</a>
          </div>
        </div>
      </div>`,
  additionalScripts: `    <script>
      (function() {
        const form = document.getElementById("reset-form");
        const alertBox = document.getElementById("auth-alert");
        const submitBtn = document.getElementById("reset-submit-btn");
        const tokenInput = document.getElementById("reset-token");
        const successActions = document.getElementById("reset-success-actions");

        const urlParams = new URLSearchParams(window.location.search);
        const queryToken = urlParams.get("token");
        if (queryToken) {
          tokenInput.value = queryToken;
        }

        function showAlert(type, message) {
          alertBox.className = "auth-alert visible auth-alert-" + type;
          alertBox.textContent = message;
        }

        form.addEventListener("submit", async function(e) {
          e.preventDefault();
          alertBox.className = "auth-alert";

          const token = tokenInput.value.trim();
          const newPassword = document.getElementById("reset-new-password").value;
          const confirmPassword = document.getElementById("reset-confirm-password").value;

          if (!token) {
            showAlert("error", "Please provide the password reset token.");
            return;
          }
          if (!newPassword || newPassword.length < 8) {
            showAlert("error", "New password must be at least 8 characters long.");
            return;
          }
          if (newPassword !== confirmPassword) {
            showAlert("error", "Passwords do not match.");
            return;
          }

          submitBtn.disabled = true;
          submitBtn.textContent = "Updating Password...";

          try {
            const res = await fetch("/api/internships/auth/reset-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token, newPassword })
            });
            const data = await res.json();

            if (!res.ok) {
              showAlert("error", data.error || "Password reset failed.");
              submitBtn.disabled = false;
              submitBtn.textContent = "Update Password";
              return;
            }

            form.style.display = "none";
            successActions.style.display = "block";
            showAlert("success", data.message || "Password successfully updated! You can now log in.");
          } catch (err) {
            showAlert("error", "Network connection error. Please try again.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Update Password";
          }
        });
      })();
    </script>`
});

// F. Protected Student Dashboard Placeholder
generatePage({
  filename: "internships-dashboard.html",
  title: "Student Dashboard | ABSS Nexus Internship Portal",
  metaDescription: "Student learning dashboard for ABSS Nexus Technologies internships. Track enrolled tracks, milestone submissions, and technical evaluation feedback.",
  canonicalUrl: "https://abssnexus.in/internships/dashboard",
  activeRoute: "/internships/dashboard",
  isAuthOrProtected: true,
  mainContent: `      <div class="dashboard-wrapper">
        <div class="container">
          <div class="dashboard-user-banner">
            <div class="dashboard-greeting">
              <span class="portal-badge" id="dash-verification-badge">Verifying Session...</span>
              <h1 id="dash-greeting">Welcome, Student</h1>
              <p id="dash-email">Loading student credentials...</p>
            </div>
            <div>
              <button type="button" class="auth-btn-secondary" id="dash-logout-btn">Log Out</button>
            </div>
          </div>

          <div class="dashboard-widget-card">
            <h2>
              <span>My Enrolled Tracks</span>
              <span class="portal-badge portal-badge-urgent">Foundation Phase</span>
            </h2>
            <div class="empty-state-box">
              <div style="font-size: 2.2rem; line-height: 1; margin-bottom: 8px;">&#128218;</div>
              <h3>No Enrolled Cohorts Yet</h3>
              <p>You have not joined any live internship cohorts yet. Browse the approved curriculum tracks to review syllabus details and requirements.</p>
              <a class="btn btn-glow-cyan" href="/internships/programs">Browse Curriculum Tracks &rarr;</a>
            </div>
          </div>

          <div class="dashboard-widget-card">
            <h2>
              <span>Milestone Task Submissions</span>
              <span class="portal-badge" style="background: #F5F5F7; color: var(--color-secondary-text); border-color: var(--color-border);">Milestone Telemetry</span>
            </h2>
            <div class="empty-state-box">
              <div style="font-size: 2.2rem; line-height: 1; margin-bottom: 8px;">&#128187;</div>
              <h3>No Pending Project Deliverables</h3>
              <p>Task submissions, automated test runners, and mentor review feedback will be unlocked once your cohort enrollment is confirmed.</p>
              <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <a class="btn btn-glass" href="/internships/how-it-works">Review Evaluation Process</a>
                <a class="btn btn-glass" href="/internships/support">Student Support Desk</a>
              </div>
            </div>
          </div>

          <div class="dashboard-widget-card">
            <h2>
              <span>Academic Transparency &amp; Safety</span>
            </h2>
            <div style="font-size: 0.9rem; line-height: 1.6; color: var(--color-secondary-text);">
              <p style="margin: 0 0 10px;">
                <strong>Foundation Phase Disclosure:</strong> In Phase 5, this dashboard serves as your verified student identity hub. Real payment processing, certificate generation, and task submission grading will be phased in subsequent releases after rigorous testing.
              </p>
              <p style="margin: 0;">
                If you have questions about your account status, reach out to <a href="mailto:abssnexus@gmail.com" style="color: var(--color-blue); text-decoration: underline;">abssnexus@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>`,
  additionalScripts: `    <script>
      (function() {
        const greeting = document.getElementById("dash-greeting");
        const emailEl = document.getElementById("dash-email");
        const badge = document.getElementById("dash-verification-badge");
        const logoutBtn = document.getElementById("dash-logout-btn");

        async function checkSession() {
          try {
            const res = await fetch("/api/internships/auth/me");
            if (!res.ok) {
              window.location.href = "/internships/login?redirect=/internships/dashboard";
              return;
            }
            const data = await res.json();
            const student = data.student;

            greeting.textContent = "Welcome, " + (student.name || "Student");
            emailEl.textContent = "Logged in as " + student.email;

            if (student.emailVerified) {
              badge.textContent = "Verified Student Account";
              badge.className = "portal-badge";
              badge.style.background = "#EBF4FF";
              badge.style.color = "#0066CC";
            } else {
              badge.textContent = "Email Verification Pending";
              badge.className = "portal-badge portal-badge-urgent";
            }
          } catch (err) {
            window.location.href = "/internships/login?redirect=/internships/dashboard";
          }
        }

        logoutBtn.addEventListener("click", async function() {
          try {
            await fetch("/api/internships/auth/logout", { method: "POST" });
          } catch (e) {}
          window.location.href = "/internships/login";
        });

        checkSession();
      })();
    </script>`
});

console.log("Phase 5 internship pages generated successfully.");
