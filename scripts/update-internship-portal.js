const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build-phase5-internships.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. UPDATE internships.html (Main Landing Page)
const oldLandingMarkerStart = '// 1. /internships — LANDING PAGE';
const oldLandingMarkerEnd = '// 2. /internships/programs — BROWSE PROGRAMS';

const newLandingPageCode = `// 1. /internships — HIGH-CONVERTING LANDING PAGE
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
  mainContent: \`      <!-- 1. High-Impact Hero Section -->
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

\${renderPortalSubNav("overview")}

      <!-- 2. Core Value Pillars -->
      <section class="portal-section-dark" id="pillars">
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
                <span class="portal-badge" style="color: var(--portal-gold); border-color: rgba(245, 158, 11, 0.3);">Official Letter of Recommendation</span>
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
          <p style="color: var(--portal-text-muted); max-width: 680px; margin: 0 auto 30px;">
            Every graduate receives a tamper-proof certificate with a unique cryptographic verification hash and QR code, instant-searchable by HR recruiters and university registrars worldwide.
          </p>

          <div class="certificate-showcase-box">
            <div class="certificate-inner-frame">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
                <span class="certificate-badge-seal">&#127941; Official Verified Credential</span>
                <span style="font-size: 0.85rem; color: #5ac8fa; font-family: monospace;">STATUS: AUTHENTIC &bull; ON RECORD</span>
              </div>
              <h3 style="font-size: clamp(1.4rem, 2.5vw, 1.8rem); color: #ffffff; margin: 0 0 10px;">
                Certificate of Technical Internship Completion
              </h3>
              <p style="color: #cbd5e1; font-size: 0.95rem; margin: 0 auto 20px; max-width: 620px;">
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
                  <span style="font-family: monospace; color: #5ac8fa;">ABSS-CERT-2026-WD-1042</span>
                </div>
                <div class="cert-meta-item">
                  <strong>Performance Grade</strong>
                  <span style="color: #34c759;">Grade A+ (Distinction 96%)</span>
                </div>
              </div>
              <div style="text-align: center; margin-top: 24px; padding-top: 18px; border-top: 1px dashed rgba(255, 255, 255, 0.1);">
                <a class="btn btn-glow-cyan" href="/verify-certificate?id=ABSS-CERT-2026-WD-1042" target="_blank" rel="noopener noreferrer">
                  <span>Verify Sample Certificate Live &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. 5 High-Demand Specialization Tracks -->
      <section class="portal-section-dark" id="tracks">
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
                <span class="portal-meta-pill">&#9201; 8 Weeks</span>
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
                <span class="portal-meta-pill">&#9201; 10 Weeks</span>
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
                <span class="portal-meta-pill">&#9201; 6 Weeks</span>
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
                <span class="portal-meta-pill">&#9201; 8 Weeks</span>
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
                <span class="portal-meta-pill">&#9201; 6 Weeks</span>
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

      <!-- 6. Transparent, High-ROI Pricing Plans -->
      <section class="portal-section-dark" id="pricing-plans">
        <div class="container">
          <div class="section-title text-center">
            <span class="eyebrow">Transparent Enrollment</span>
            <h2>Affordable, High-ROI Student Plans</h2>
            <p>Simple, transparent pricing with zero hidden charges. Covers personalized code reviews, cloud hosting, verified certification, and LoR.</p>
          </div>

          <div class="pricing-portal-grid">
            <!-- Plan 1 -->
            <div class="pricing-portal-card">
              <h3 style="color: #ffffff; font-size: 1.25rem; margin: 0 0 6px;">Fast-Track Sprint</h3>
              <p style="color: var(--portal-text-muted); font-size: 0.85rem; margin: 0;">Ideal for immediate college semester credit requirements</p>
              <div class="pricing-price-row">
                <span class="currency">&#8377;</span><span class="amount">999</span><span class="period">/ 4 Weeks</span>
              </div>
              <ul class="pricing-features-list">
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 2 Production-Grade Projects</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Weekly Code Reviews on GitHub</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Official Offer Letter (PDF)</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> QR-Verified Digital Certificate</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Dedicated WhatsApp Support</li>
              </ul>
              <a class="btn btn-apple-secondary" href="/internships/register" style="width: 100%; text-align: center; display: block;">Enroll in Fast-Track &rarr;</a>
            </div>

            <!-- Plan 2 (Popular) -->
            <div class="pricing-portal-card popular">
              <span class="pricing-popular-tag">Comprehensive Track &bull; Includes LoR</span>
              <h3 style="color: #ffffff; font-size: 1.25rem; margin: 0 0 6px;">Full-Stack Mastery</h3>
              <p style="color: var(--portal-text-muted); font-size: 0.85rem; margin: 0;">Comprehensive career-building track with official LoR</p>
              <div class="pricing-price-row">
                <span class="currency">&#8377;</span><span class="amount">1,499</span><span class="period">/ 8 Weeks</span>
              </div>
              <ul class="pricing-features-list">
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 4 Advanced Full-Stack Projects</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Database &amp; API Integration</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Official Offer Letter + LoR (Signed by Lead)</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> QR-Verified Certificate with Grade Distinction</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Resume Review &amp; LinkedIn Optimization</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Priority WhatsApp Mentor Access</li>
              </ul>
              <a class="btn btn-glow-cyan" href="/internships/register" style="width: 100%; text-align: center; display: block;">Enroll in Full-Stack Mastery &rarr;</a>
            </div>

            <!-- Plan 3 -->
            <div class="pricing-portal-card">
              <h3 style="color: #ffffff; font-size: 1.25rem; margin: 0 0 6px;">Enterprise &amp; AI Track</h3>
              <p style="color: var(--portal-text-muted); font-size: 0.85rem; margin: 0;">Advanced cloud systems &amp; intelligent AI workflows</p>
              <div class="pricing-price-row">
                <span class="currency">&#8377;</span><span class="amount">2,499</span><span class="period">/ 12 Weeks</span>
              </div>
              <ul class="pricing-features-list">
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Full Cloud / AI Architecture Deployment</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Multi-Model LLM or DevOps CI/CD Pipelines</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 1-on-1 Dedicated Technical Mentorship</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Priority Letter of Recommendation (LoR)</li>
                <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Verified Credential + Portfolio Showcase</li>
              </ul>
              <a class="btn btn-apple-secondary" href="/internships/register" style="width: 100%; text-align: center; display: block;">Enroll in Enterprise AI &rarr;</a>
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
                  <strong style="display: block; color: #fff; font-size: 0.95rem;">Rahul Sharma</strong>
                  <span style="font-size: 0.8rem; color: #94a3b8;">B.Tech CSE &bull; RTU Kota</span>
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
                  <strong style="display: block; color: #fff; font-size: 0.95rem;">Pooja Kumari</strong>
                  <span style="font-size: 0.8rem; color: #94a3b8;">MCA &bull; University of Rajasthan</span>
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
                  <strong style="display: block; color: #fff; font-size: 0.95rem;">Ankit Verma</strong>
                  <span style="font-size: 0.8rem; color: #94a3b8;">BCA &bull; Amity University</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. Student FAQs -->
      <section class="portal-section-dark" id="student-faqs">
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
      </section>\`
});

`;

const startIdx = content.indexOf(oldLandingMarkerStart);
const endIdx = content.indexOf(oldLandingMarkerEnd);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.slice(0, startIdx) + newLandingPageCode + content.slice(endIdx);
  console.log('✓ Successfully upgraded internships.html section');
} else {
  console.error('✗ Markers for internships.html not found');
}

// 2. Remove demo notices and update background styling in program catalog & detail pages
content = content.replace(/style="background: #FFFFFF;"/g, 'class="portal-section-dark"');
content = content.replace(/style="background: #F5F5F7;"/g, 'class="portal-section-alt"');
content = content.replace(/portal-badge-demo/g, 'portal-badge-urgent');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ build-phase5-internships.js updated successfully!');
