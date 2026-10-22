const fs = require("fs");
const path = require("path");
const { renderHeader, renderFooter } = require("./service-template-engine");

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "src", "pages");

// 1. Upgrade src/pages/services.html (Catalog of all 15 services)
const servicesHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Explore ABSS Nexus Technologies complete catalog of 15 IT services: website engineering, custom software, UI/UX design, cloud architecture, and managed support." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Comprehensive IT &amp; Web Services | ABSS Nexus Technologies" />
    <meta property="og:description" content="Explore ABSS Nexus Technologies complete catalog of 15 IT services: website engineering, custom software, UI/UX design, cloud architecture, and managed support." />
    <meta property="og:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <meta property="og:url" content="https://abssnexus.in/services" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Comprehensive IT &amp; Web Services | ABSS Nexus Technologies" />
    <meta name="twitter:description" content="Explore ABSS Nexus Technologies complete catalog of 15 IT services: website engineering, custom software, UI/UX design, cloud architecture, and managed support." />
    <meta name="twitter:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <link rel="canonical" href="https://abssnexus.in/services" />
    <title>Comprehensive IT &amp; Web Services | ABSS Nexus Technologies</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/public/assets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/public/assets/images/favicon.png" />
    <link rel="apple-touch-icon" href="/public/assets/images/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/styles.css" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Comprehensive IT & Web Services",
        "url": "https://abssnexus.in/services",
        "description": "Explore ABSS Nexus Technologies complete catalog of 15 IT services: website engineering, custom software, UI/UX design, cloud architecture, and managed support.",
        "publisher": {
          "@type": "Organization",
          "name": "ABSS Nexus Technologies",
          "url": "https://abssnexus.in/",
          "logo": "https://abssnexus.in/public/assets/images/LogoGenerated.png"
        }
      }
    </script>
  </head>
  <body class="agency-dark-theme">
${renderHeader("/services")}

    <main>
      <!-- Hero Section -->
      <section class="site-hero site-hero--page page-hero section" id="hero">
        <div class="site-hero__container container">
          <nav class="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Services</span>
          </nav>

          <span class="site-hero__eyebrow section-badge-apple">
            <span class="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Complete Engineering Catalog</span>
          </span>
          <h1 class="site-hero__title">Comprehensive IT, Web &amp; Software Engineering Services</h1>
          <p class="site-hero__description">
            From high-speed responsive business websites to modular cloud systems, AI integrations, and proactive managed support.
            ABSS Nexus Technologies provides end-to-end digital engineering engineered for reliability, security, and measurable conversion.
          </p>

          <div class="site-hero__actions hero-actions">
            <a class="site-hero__btn site-hero__btn--primary btn btn-apple-primary" href="/contact#project-inquiry">
              <span>Discuss Your Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a class="site-hero__btn site-hero__btn--secondary btn btn-apple-secondary" href="/pricing">
              <span>View Pricing Packages</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          </div>
        </div>
      </section>

      <!-- All 15 Services Grid -->
      <section class="section">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">15 Specialized Disciplines</p>
            <h2>Explore Our Complete IT &amp; Engineering Disciplines</h2>
            <p>Every service is delivered with clean architecture, accessible contrast, transparent milestones, and founder-led communication.</p>
          </div>

          <div class="service-filter-bar" data-service-filter-bar aria-label="Filter services by category">
            <button type="button" class="service-filter-btn active" data-filter="all">All Services (15)</button>
            <button type="button" class="service-filter-btn" data-filter="web">Web &amp; Mobile (4)</button>
            <button type="button" class="service-filter-btn" data-filter="software">Software &amp; Cloud (5)</button>
            <button type="button" class="service-filter-btn" data-filter="ai">AI &amp; Data (3)</button>
            <button type="button" class="service-filter-btn" data-filter="support">Support &amp; QA (3)</button>
          </div>

          <div class="cinematic-services-grid" style="margin-top: 32px;">
            <!-- 1. Website Development -->
            <a class="cinematic-service-card" href="/services/website-development" data-category="web">
              <span class="cinematic-card-badge">Web Engineering &bull; ⏱ 5-10 Days</span>
              <h3>Website Development</h3>
              <p>Bespoke responsive websites engineered for speed, clean layout hierarchy, and maximum customer inquiry conversion.</p>
              <ul class="cinematic-features-tags">
                <li>Responsive UI</li><li>Core Web Vitals</li><li>Edge Hosted</li><li>SEO Architecture</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 2. Software Development -->
            <a class="cinematic-service-card" href="/services/software-development" data-category="software">
              <span class="cinematic-card-badge">Custom Software &bull; Modular</span>
              <h3>Software Development</h3>
              <p>Tailored management systems, internal workflow engines, and relational SQL backends built for your exact operational requirements.</p>
              <ul class="cinematic-features-tags">
                <li>Custom Logic</li><li>Cloud D1 SQL</li><li>Role Auth</li><li>Audit Logs</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 3. Mobile App Development -->
            <a class="cinematic-service-card" href="/services/mobile-app-development" data-category="web">
              <span class="cinematic-card-badge">Mobile &bull; Cross-Platform</span>
              <h3>Mobile App Development</h3>
              <p>Touch-optimized progressive web applications and cross-platform apps with offline caching, fast rendering, and PWA installability.</p>
              <ul class="cinematic-features-tags">
                <li>Progressive Web Apps</li><li>Touch First</li><li>Offline Sync</li><li>Capacitor</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 4. UI/UX Design -->
            <a class="cinematic-service-card" href="/services/ui-ux-design" data-category="web">
              <span class="cinematic-card-badge">Interface &bull; Figma Systems</span>
              <h3>UI/UX Design</h3>
              <p>Apple-inspired minimalist design systems, clickable Figma prototypes, and human-centered user journeys that eliminate friction.</p>
              <ul class="cinematic-features-tags">
                <li>Figma Prototypes</li><li>Design Tokens</li><li>WCAG AAA</li><li>User Flows</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 5. AI & Machine Learning -->
            <a class="cinematic-service-card" href="/services/ai-machine-learning" data-category="ai">
              <span class="cinematic-card-badge">Artificial Intelligence &bull; Practical</span>
              <h3>AI &amp; Machine Learning</h3>
              <p>Smart automated document extraction, context-aware customer assistants, and predictive intelligence integrated via secure APIs.</p>
              <ul class="cinematic-features-tags">
                <li>RAG Pipelines</li><li>OpenAI / Gemini</li><li>Vector Context</li><li>Automation</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 6. Cloud Computing -->
            <a class="cinematic-service-card" href="/services/cloud-computing" data-category="software">
              <span class="cinematic-card-badge">Cloud &bull; Serverless Edge</span>
              <h3>Cloud Computing</h3>
              <p>Eliminate server maintenance overhead. Global edge CDN routing, serverless compute functions, and distributed relational SQL storage.</p>
              <ul class="cinematic-features-tags">
                <li>Cloudflare Pages</li><li>Workers Edge</li><li>Zero Downtime</li><li>DDoS Mitigation</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 7. Cybersecurity -->
            <a class="cinematic-service-card" href="/services/cybersecurity" data-category="support">
              <span class="cinematic-card-badge">Security &bull; Hardening</span>
              <h3>Cybersecurity</h3>
              <p>Proactive defense against OWASP vulnerabilities, bot spam, honeypot form protection, rate-limiting, and security header hardening.</p>
              <ul class="cinematic-features-tags">
                <li>CSP Headers</li><li>Honeypots</li><li>Rate Limits</li><li>SQL Sanitization</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 8. Data Analytics & BI -->
            <a class="cinematic-service-card" href="/services/data-analytics-bi" data-category="ai">
              <span class="cinematic-card-badge">Telemetry &bull; Dashboards</span>
              <h3>Data Analytics &amp; BI</h3>
              <p>Executive visual dashboards and operational telemetry tracking conversion funnels, response times, and key business KPIs in real time.</p>
              <ul class="cinematic-features-tags">
                <li>Interactive Charts</li><li>KPI Dashboards</li><li>Event Telemetry</li><li>SQL Aggregation</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 9. Digital Marketing & SEO -->
            <a class="cinematic-service-card" href="/services/digital-marketing-seo" data-category="web">
              <span class="cinematic-card-badge">SEO &bull; Search Architecture</span>
              <h3>Digital Marketing &amp; SEO</h3>
              <p>Technical search engine optimization, sub-second Core Web Vitals acceleration, structured Schema.org markup, and clean canonical routing.</p>
              <ul class="cinematic-features-tags">
                <li>Core Web Vitals</li><li>Schema.org JSON-LD</li><li>Search Console</li><li>Clean Canonicals</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 10. E-Commerce Development -->
            <a class="cinematic-service-card" href="/services/ecommerce-development" data-category="web">
              <span class="cinematic-card-badge">Commerce &bull; Zero Commission</span>
              <h3>E-Commerce Development</h3>
              <p>Fast digital storefronts with responsive product grids, frictionless shopping cart engines, and direct WhatsApp order conversion paths.</p>
              <ul class="cinematic-features-tags">
                <li>Fast Product Grids</li><li>WhatsApp Checkout</li><li>Cart Engine</li><li>Razorpay / Stripe</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 11. SaaS Development -->
            <a class="cinematic-service-card" href="/services/saas-development" data-category="software">
              <span class="cinematic-card-badge">SaaS &bull; Subscriptions</span>
              <h3>SaaS Development</h3>
              <p>Turn internal software concepts into commercial subscription products with multi-tenant data isolation, billing webhooks, and team roles.</p>
              <ul class="cinematic-features-tags">
                <li>Multi-Tenant DB</li><li>Subscription Webhooks</li><li>Role Permissions</li><li>SaaS MVPs</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 12. API Integration -->
            <a class="cinematic-service-card" href="/services/api-integration" data-category="software">
              <span class="cinematic-card-badge">APIs &bull; Connected Systems</span>
              <h3>API Integration</h3>
              <p>Connect your website to CRMs, payment providers, and communication channels with secure RESTful endpoints and HMAC webhooks.</p>
              <ul class="cinematic-features-tags">
                <li>RESTful Endpoints</li><li>HMAC Webhooks</li><li>CRM Sync</li><li>Payment Bridges</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 13. Software Testing & QA -->
            <a class="cinematic-service-card" href="/services/software-testing-qa" data-category="support">
              <span class="cinematic-card-badge">Testing &bull; Automated Audits</span>
              <h3>Software Testing &amp; QA</h3>
              <p>Automated link validation, cross-browser rendering audits, form stress testing, and regression suites preventing production bugs.</p>
              <ul class="cinematic-features-tags">
                <li>Link Integrity</li><li>Syntax Verification</li><li>Cross-Browser</li><li>Form Stress Tests</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 14. IT Consulting -->
            <a class="cinematic-service-card" href="/services/it-consulting" data-category="support">
              <span class="cinematic-card-badge">Advisory &bull; Strategy</span>
              <h3>IT Consulting</h3>
              <p>Pragmatic, founder-led software architecture evaluation, cost-effective cloud roadmaps, and milestone delivery oversight.</p>
              <ul class="cinematic-features-tags">
                <li>Architecture Audits</li><li>Phased Roadmaps</li><li>Cost Reduction</li><li>Agile Oversight</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>

            <!-- 15. Website Maintenance -->
            <a class="cinematic-service-card" href="/services/website-maintenance" data-category="support">
              <span class="cinematic-card-badge">Support &bull; Active Care</span>
              <h3>Website Maintenance</h3>
              <p>Dedicated monthly technical care: automated uptime monitoring, link health audits, security patching, and fast content updates.</p>
              <ul class="cinematic-features-tags">
                <li>Uptime Pings</li><li>Link Health Audits</li><li>Fast Updates</li><li>Priority SLA</li>
              </ul>
              <span class="cinematic-card-cta">Explore Service Details &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Project Enquiry CTA -->
      <section class="section cta-band" id="project-inquiry">
        <div class="container">
          <div class="radiant-cta-box">
            <p class="eyebrow">Start Your Project</p>
            <h2>Ready to Discuss Your Custom Service Requirements?</h2>
            <p>Schedule a focused technical consultation to review your requirements, architecture, and timeline.</p>

            <div class="radiant-cta-actions">
              <a class="btn btn-glow-cyan" href="/contact#project-inquiry">
                <span>Start a Project Discussion</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <a class="btn btn-whatsapp-outline" href="https://wa.me/918757928673" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.3-.778.979-.954 1.18-.176.2-.352.226-.653.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.632-.929-2.235-.245-.588-.494-.509-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.722.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.43.25-.704.25-1.307.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.51 2 2.03 6.48 2.03 12.01c0 1.97.57 3.81 1.57 5.37L2 22l4.78-1.54c1.51.92 3.27 1.45 5.26 1.45 5.53 0 10.01-4.48 10.01-10.01S17.57 2 12.04 2zm0 18.25c-1.74 0-3.36-.5-4.74-1.38l-.34-.22-2.83.91.93-2.76-.24-.37c-.98-1.5-1.53-3.27-1.53-5.12 0-4.56 3.71-8.27 8.27-8.27s8.27 3.71 8.27 8.27-3.71 8.27-8.27 8.27z"/></svg>
                <span>WhatsApp Directly</span>
              </a>
            </div>

            <div class="cta-trust-meta">
              <span>&#9742; Direct Line: +91 87579 28673</span>
              <span>&#9993; Email: abssnexus@gmail.com</span>
              <span>&#128205; Location: Jaipur, Rajasthan</span>
            </div>
          </div>
        </div>
      </section>
    </main>

${renderFooter()}
  </body>
</html>`;

fs.writeFileSync(path.join(pagesDir, "services.html"), servicesHtml, "utf8");
console.log("Upgraded: src/pages/services.html");

// 2. Upgrade src/pages/projects.html (Portfolio with real vs. demo labeling and detailed case studies)
const projectsHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Explore ABSS Nexus Technologies portfolio projects, live production demos, and case studies featuring responsive websites, web apps, and modern UI/UX design." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Portfolio &amp; Case Studies | ABSS Nexus Technologies" />
    <meta property="og:description" content="Explore ABSS Nexus Technologies portfolio projects, live production demos, and case studies featuring responsive websites, web apps, and modern UI/UX design." />
    <meta property="og:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <meta property="og:url" content="https://abssnexus.in/projects" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Portfolio &amp; Case Studies | ABSS Nexus Technologies" />
    <meta name="twitter:description" content="Explore ABSS Nexus Technologies portfolio projects, live production demos, and case studies featuring responsive websites, web apps, and modern UI/UX design." />
    <meta name="twitter:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <link rel="canonical" href="https://abssnexus.in/projects" />
    <title>Portfolio &amp; Case Studies | ABSS Nexus Technologies</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/public/assets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/public/assets/images/favicon.png" />
    <link rel="apple-touch-icon" href="/public/assets/images/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/styles.css" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Portfolio & Case Studies",
        "url": "https://abssnexus.in/projects",
        "description": "Explore ABSS Nexus Technologies portfolio projects, live production demos, and case studies featuring responsive websites, web apps, and modern UI/UX design.",
        "publisher": {
          "@type": "Organization",
          "name": "ABSS Nexus Technologies",
          "url": "https://abssnexus.in/",
          "logo": "https://abssnexus.in/public/assets/images/LogoGenerated.png"
        }
      }
    </script>
  </head>
  <body class="agency-dark-theme">
${renderHeader("/projects")}

    <main>
      <!-- Hero Section -->
      <section class="site-hero site-hero--page page-hero section" id="hero">
        <div class="site-hero__container container">
          <nav class="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Projects</span>
          </nav>

          <span class="site-hero__eyebrow section-badge-apple">
            <span class="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Engineering Showcase</span>
          </span>
          <h1 class="site-hero__title">Featured Portfolio, Live Demos &amp; Technical Case Studies</h1>
          <p class="site-hero__description">
            Explore selected production systems and verified concept implementations. We engineer responsive web applications,
            corporate platforms, and intuitive management dashboards with high performance, clean code, and zero layout shift.
          </p>

          <div class="site-hero__actions hero-actions">
            <a class="site-hero__btn site-hero__btn--primary btn btn-apple-primary" href="/contact#project-inquiry">
              <span>Start Your Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a class="site-hero__btn site-hero__btn--secondary btn btn-apple-secondary" href="/services">
              <span>Explore Services</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Category Filter Controls -->
      <section class="section split-band" style="padding: 24px 0;">
        <div class="container">
          <div class="project-filter-container" aria-label="Filter projects by category">
            <button class="filter-btn active" type="button" data-project-filter="all">All Projects</button>
            <button class="filter-btn" type="button" data-project-filter="website">Websites</button>
            <button class="filter-btn" type="button" data-project-filter="webapp">Web Apps</button>
            <button class="filter-btn" type="button" data-project-filter="landing">Landing Pages</button>
            <button class="filter-btn" type="button" data-project-filter="ecommerce">E-Commerce</button>
          </div>
        </div>
      </section>

      <!-- Detailed Case Studies Section -->
      <section class="section">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Case Studies &amp; Demonstrations</p>
            <h2>Architectural Breakdowns of Selected Implementations</h2>
            <p>Every implementation details the core business problem, our engineering approach, technical stack, and verified outcomes.</p>
          </div>

          <!-- Project 1: Personal Portfolio (Real Production) -->
          <article class="case-breakdown-card" data-project-category="website">
            <div>
              <div class="mockup-browser-apple">
                <div class="mockup-browser-header">
                  <div class="mockup-browser-dots"><span></span><span></span><span></span></div>
                  <div class="mockup-browser-bar">shubham-portfolio-abss.netlify.app</div>
                </div>
                <img src="/public/assets/images/personal-portfolio.png" alt="Personal Portfolio Website preview" style="width: 100%; display: block;" loading="lazy" />
              </div>
            </div>
            <div>
              <span class="section-badge-apple">Production &bull; Live Client Demo</span>
              <h3>Personal Developer &amp; Designer Portfolio</h3>
              <p>
                <strong>Problem:</strong> Standard template portfolios felt bloated, slow to load on mobile, and failed to communicate deep technical competencies to prospective clients.<br /><br />
                <strong>Approach:</strong> Engineered a lightweight, mobile-first responsive architecture using pure semantic HTML5, CSS3, and vanilla JavaScript with sub-second LCP.<br /><br />
                <strong>Outcome:</strong> 100/100 Lighthouse performance score, zero layout shift, and instant mobile responsiveness.
              </p>
              <div class="tech-pills-row" style="margin-bottom: 20px;">
                <span class="tech-pill">HTML5</span><span class="tech-pill">CSS3</span><span class="tech-pill">JavaScript</span><span class="tech-pill">Netlify Edge</span>
              </div>
              <a class="btn btn-apple-primary" href="https://shubham-portfolio-abss.netlify.app/" target="_blank" rel="noopener noreferrer">
                <span>View Live Deployment &rarr;</span>
              </a>
            </div>
          </article>

          <!-- Project 2: Cloud Analytics & Admin Dashboard (Demonstration) -->
          <article class="case-breakdown-card" data-project-category="webapp">
            <div>
              <div class="mockup-browser-apple">
                <div class="mockup-browser-header">
                  <div class="mockup-browser-dots"><span></span><span></span><span></span></div>
                  <div class="mockup-browser-bar">abssnexus.in/analytics/dashboard</div>
                </div>
                <img src="/public/assets/images/project-dashboard-ui.png" alt="Cloud Analytics Dashboard preview" style="width: 100%; display: block;" loading="lazy" />
              </div>
            </div>
            <div>
              <span class="section-badge-apple" style="color: #6E6E73; background: #eaeaea;">Concept &bull; Demo Showcase</span>
              <h3>Cloud Analytics &amp; Telemetry Dashboard</h3>
              <p>
                <strong>Problem:</strong> Business managers struggled to monitor real-time lead submissions, project status updates, and support tickets in one centralized location.<br /><br />
                <strong>Approach:</strong> Built a modular administration control room powered by Cloudflare D1 SQL, secure token authentication, and interactive telemetry charts.<br /><br />
                <strong>Outcome:</strong> Real-time operational visibility, sub-15ms SQL querying at the edge, and role-based permissions preventing unauthorized access.
              </p>
              <div class="tech-pills-row" style="margin-bottom: 20px;">
                <span class="tech-pill">Cloud D1 SQL</span><span class="tech-pill">REST APIs</span><span class="tech-pill">JWT Auth</span><span class="tech-pill">Interactive Charts</span>
              </div>
              <a class="btn btn-apple-secondary" href="/services/software-development">
                <span>Explore Custom Software Service &rarr;</span>
              </a>
            </div>
          </article>

          <!-- Project 3: E-Commerce Storefront (Demonstration) -->
          <article class="case-breakdown-card" data-project-category="ecommerce">
            <div>
              <div class="mockup-browser-apple">
                <div class="mockup-browser-header">
                  <div class="mockup-browser-dots"><span></span><span></span><span></span></div>
                  <div class="mockup-browser-bar">abssnexus.in/storefront/retail</div>
                </div>
                <img src="/public/assets/images/project-ecommerce-demo.png" alt="E-Commerce Retail Platform preview" style="width: 100%; display: block;" loading="lazy" />
              </div>
            </div>
            <div>
              <span class="section-badge-apple" style="color: #6E6E73; background: #eaeaea;">Concept &bull; Demo Showcase</span>
              <h3>High-Conversion E-Commerce Retail Storefront</h3>
              <p>
                <strong>Problem:</strong> Small retailers losing customers to slow multi-page checkout flows and heavy platform monthly subscription fees.<br /><br />
                <strong>Approach:</strong> Engineered a lightweight product catalog with instant category filtering, persistent client-side cart, and direct WhatsApp checkout routing.<br /><br />
                <strong>Outcome:</strong> Zero platform commission, instant checkout transfer, and sub-second catalog page load speeds on mobile networks.
              </p>
              <div class="tech-pills-row" style="margin-bottom: 20px;">
                <span class="tech-pill">JavaScript Cart</span><span class="tech-pill">WhatsApp API</span><span class="tech-pill">Responsive UI</span><span class="tech-pill">Razorpay Ready</span>
              </div>
              <a class="btn btn-apple-secondary" href="/services/ecommerce-development">
                <span>Explore E-Commerce Service &rarr;</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <!-- Project Enquiry CTA -->
      <section class="section cta-band" id="project-inquiry">
        <div class="container">
          <div class="radiant-cta-box">
            <p class="eyebrow">Start Your Project</p>
            <h2>Have a Similar Digital Product in Mind?</h2>
            <p>We work directly with founders and business owners to build high-performance websites and custom software.</p>

            <div class="radiant-cta-actions">
              <a class="btn btn-glow-cyan" href="/contact#project-inquiry">
                <span>Discuss Your Project</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <a class="btn btn-whatsapp-outline" href="https://wa.me/918757928673" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.3-.778.979-.954 1.18-.176.2-.352.226-.653.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.632-.929-2.235-.245-.588-.494-.509-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.722.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.43.25-.704.25-1.307.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.51 2 2.03 6.48 2.03 12.01c0 1.97.57 3.81 1.57 5.37L2 22l4.78-1.54c1.51.92 3.27 1.45 5.26 1.45 5.53 0 10.01-4.48 10.01-10.01S17.57 2 12.04 2zm0 18.25c-1.74 0-3.36-.5-4.74-1.38l-.34-.22-2.83.91.93-2.76-.24-.37c-.98-1.5-1.53-3.27-1.53-5.12 0-4.56 3.71-8.27 8.27-8.27s8.27 3.71 8.27 8.27-3.71 8.27-8.27 8.27z"/></svg>
                <span>WhatsApp Directly</span>
              </a>
            </div>

            <div class="cta-trust-meta">
              <span>&#9742; Direct Line: +91 87579 28673</span>
              <span>&#9993; Email: abssnexus@gmail.com</span>
              <span>&#128205; Location: Jaipur, Rajasthan</span>
            </div>
          </div>
        </div>
      </section>
    </main>

${renderFooter()}
  </body>
</html>`;

fs.writeFileSync(path.join(pagesDir, "projects.html"), projectsHtml, "utf8");
console.log("Upgraded: src/pages/projects.html");
