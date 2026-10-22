const fs = require("fs");
const path = require("path");
const { renderHeader, renderFooter } = require("./service-template-engine");

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "src", "pages");

// 1. Generate Solutions Page (src/pages/solutions.html)
const solutionsHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Practical digital business solutions by ABSS Nexus Technologies. Process automation, custom platforms, cloud migration, and high-conversion customer web systems." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Digital Business Solutions | ABSS Nexus Technologies" />
    <meta property="og:description" content="Practical digital business solutions by ABSS Nexus Technologies. Process automation, custom platforms, cloud migration, and high-conversion customer web systems." />
    <meta property="og:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <meta property="og:url" content="https://abssnexus.in/solutions" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Digital Business Solutions | ABSS Nexus Technologies" />
    <meta name="twitter:description" content="Practical digital business solutions by ABSS Nexus Technologies. Process automation, custom platforms, cloud migration, and high-conversion customer web systems." />
    <meta name="twitter:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <link rel="canonical" href="https://abssnexus.in/solutions" />
    <title>Digital Business Solutions | ABSS Nexus Technologies</title>
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
        "name": "Digital Business Solutions",
        "url": "https://abssnexus.in/solutions",
        "description": "Practical digital business solutions by ABSS Nexus Technologies. Process automation, custom platforms, cloud migration, and high-conversion customer web systems.",
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
${renderHeader("/solutions")}

    <main>
      <!-- Hero Section -->
      <section class="site-hero site-hero--page page-hero section" id="hero">
        <div class="site-hero__container container">
          <nav class="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Solutions</span>
          </nav>

          <span class="site-hero__eyebrow section-badge-apple">
            <span class="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Outcome-Focused Solutions</span>
          </span>
          <h1 class="site-hero__title">Pragmatic Digital Solutions for Complex Business Challenges</h1>
          <p class="site-hero__description">
            We bridge the gap between business objectives and technology execution. ABSS Nexus Technologies architects
            focused digital solutions that eliminate operational friction, automate manual tasks, and accelerate customer conversion.
          </p>

          <div class="site-hero__actions hero-actions">
            <a class="site-hero__btn site-hero__btn--primary btn btn-apple-primary" href="/contact#project-inquiry">
              <span>Discuss Your Solution</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a class="site-hero__btn site-hero__btn--secondary btn btn-apple-secondary" href="/services">
              <span>Browse All Services</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Solutions Grid -->
      <section class="section">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Proven Solution Frameworks</p>
            <h2>Tailored Architectures for Measurable Operational Impact</h2>
            <p>Explore how our genuinely offered engineering capabilities resolve specific commercial hurdles.</p>
          </div>

          <div class="solutions-showcase-grid">
            <!-- Solution 1: Business Process Automation -->
            <article class="solution-showcase-card" id="automation">
              <span class="section-badge-apple">Automation</span>
              <h3>Business Process Automation</h3>
              <p>
                Eliminate manual data re-entry and administrative delays. We engineer custom workflow engines that connect
                inquiry forms, internal assignment queues, and automated client notifications into seamless digital pipelines.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Workflow Logic</span>
                <span class="tech-pill">Email/SMS Alerts</span>
                <span class="tech-pill">Database Persistence</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/software-development">View Custom Software &rarr;</a>
              </div>
            </article>

            <!-- Solution 2: Custom Software Platforms -->
            <article class="solution-showcase-card" id="platforms">
              <span class="section-badge-apple">Custom Systems</span>
              <h3>Custom Software Platforms</h3>
              <p>
                Move beyond rigid spreadsheets and expensive per-seat software licenses. We build tailored web platforms
                with relational databases, role-based access, and dedicated administrative control rooms designed for your exact operations.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Role Auth</span>
                <span class="tech-pill">Cloud D1 SQL</span>
                <span class="tech-pill">Data Management</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/saas-development">Explore SaaS Systems &rarr;</a>
              </div>
            </article>

            <!-- Solution 3: Cloud Adoption & Modernization -->
            <article class="solution-showcase-card" id="cloud">
              <span class="section-badge-apple">Cloud Architecture</span>
              <h3>Cloud Adoption &amp; Modernization</h3>
              <p>
                Transition aging, vulnerable on-premise tools to serverless edge cloud networks. Benefit from 99.98% uptime,
                automated global content caching, and zero physical server maintenance overhead.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Serverless Edge</span>
                <span class="tech-pill">Zero Downtime</span>
                <span class="tech-pill">Global CDN</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/cloud-computing">Explore Cloud Computing &rarr;</a>
              </div>
            </article>

            <!-- Solution 4: Connected Systems & API Integration -->
            <article class="solution-showcase-card" id="api">
              <span class="section-badge-apple">Interoperability</span>
              <h3>Connected Systems &amp; API Integration</h3>
              <p>
                Break down software silos. We build secure RESTful API bridges and webhook listeners that synchronize data
                between your public website, CRM platforms, accounting software, and payment gateways in real time.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">RESTful APIs</span>
                <span class="tech-pill">HMAC Webhooks</span>
                <span class="tech-pill">CRM Bridges</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/api-integration">Explore API Integration &rarr;</a>
              </div>
            </article>

            <!-- Solution 5: High-Conversion Customer Experiences -->
            <article class="solution-showcase-card" id="conversion">
              <span class="section-badge-apple">Customer Experience</span>
              <h3>High-Conversion Digital Customer Experiences</h3>
              <p>
                First impressions matter. We engineer sub-second websites and digital storefronts combining Apple-inspired
                minimalist aesthetics with clear value messaging, intuitive carts, and instant inquiry pathways.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Sub-Second LCP</span>
                <span class="tech-pill">Mobile-First</span>
                <span class="tech-pill">WhatsApp Checkout</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/website-development">Explore Web Engineering &rarr;</a>
              </div>
            </article>

            <!-- Solution 6: Strategic Digital Transformation -->
            <article class="solution-showcase-card" id="strategy">
              <span class="section-badge-apple">Strategy</span>
              <h3>Strategic Digital Transformation</h3>
              <p>
                Avoid over-budget technology projects and vendor lock-in. Our founder-led advisory services evaluate your current
                technology stack, construct phased execution roadmaps, and oversee technical delivery from discovery to launch.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Architecture Audits</span>
                <span class="tech-pill">Phased Roadmaps</span>
                <span class="tech-pill">Founder Advisory</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/it-consulting">Explore IT Consulting &rarr;</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Project Enquiry CTA -->
      <section class="section cta-band" id="project-inquiry">
        <div class="container">
          <div class="radiant-cta-box">
            <p class="eyebrow">Start Your Project</p>
            <h2>Ready to Implement a Targeted Solution for Your Business?</h2>
            <p>Schedule a technical discussion to review your operational requirements with our engineering team.</p>

            <div class="radiant-cta-actions">
              <a class="btn btn-glow-cyan" href="/contact#project-inquiry">
                <span>Discuss Your Requirements</span>
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

fs.writeFileSync(path.join(pagesDir, "solutions.html"), solutionsHtml, "utf8");
console.log("Generated: src/pages/solutions.html");

// 2. Generate Industries Page (src/pages/industries.html)
const industriesHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Target industry digital solutions by ABSS Nexus Technologies. Custom platforms and responsive websites for education, healthcare, retail, hospitality, and startups." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Target Industry Verticals | ABSS Nexus Technologies" />
    <meta property="og:description" content="Target industry digital solutions by ABSS Nexus Technologies. Custom platforms and responsive websites for education, healthcare, retail, hospitality, and startups." />
    <meta property="og:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <meta property="og:url" content="https://abssnexus.in/industries" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Target Industry Verticals | ABSS Nexus Technologies" />
    <meta name="twitter:description" content="Target industry digital solutions by ABSS Nexus Technologies. Custom platforms and responsive websites for education, healthcare, retail, hospitality, and startups." />
    <meta name="twitter:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <link rel="canonical" href="https://abssnexus.in/industries" />
    <title>Target Industry Verticals | ABSS Nexus Technologies</title>
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
        "name": "Target Industry Verticals",
        "url": "https://abssnexus.in/industries",
        "description": "Target industry digital solutions by ABSS Nexus Technologies. Custom platforms and responsive websites for education, healthcare, retail, hospitality, and startups.",
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
${renderHeader("/industries")}

    <main>
      <!-- Hero Section -->
      <section class="site-hero site-hero--page page-hero section" id="hero">
        <div class="site-hero__container container">
          <nav class="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Industries</span>
          </nav>

          <span class="site-hero__eyebrow section-badge-apple">
            <span class="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Specialized Verticals</span>
          </span>
          <h1 class="site-hero__title">Target Industry Verticals &amp; Tailored Digital Solutions</h1>
          <p class="site-hero__description">
            Every industry presents unique operational workflows and customer expectations. We engineer tailored web platforms,
            institutional portals, and digital storefronts customized for the specific needs of modern commercial sectors.
          </p>

          <div class="site-hero__actions hero-actions">
            <a class="site-hero__btn site-hero__btn--primary btn btn-apple-primary" href="/contact#project-inquiry">
              <span>Discuss Your Sector Needs</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a class="site-hero__btn site-hero__btn--secondary btn btn-apple-secondary" href="/services">
              <span>Explore All Services</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Transparency Note -->
      <section style="background: var(--color-light-gray); border-bottom: 1px solid var(--color-border); padding: 18px 0;">
        <div class="container">
          <div style="font-size: 0.88rem; color: var(--color-secondary-text); display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <span><strong>Scope Note:</strong> Sector categories represent targeted architectural capabilities and tailored technical feature sets designed for client project deployments.</span>
          </div>
        </div>
      </section>

      <!-- Industries Grid -->
      <section class="section">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Sector Capabilities</p>
            <h2>Tailored Architectures by Industry Domain</h2>
            <p>Review how our engineering disciplines are customized across key business sectors.</p>
          </div>

          <div class="industries-showcase-grid">
            <!-- Sector 1: Higher Education & Coaching Institutes -->
            <article class="industry-showcase-card">
              <span class="section-badge-apple">Academia &bull; Education</span>
              <h3>Higher Education &amp; Coaching Institutes</h3>
              <p>
                Comprehensive academic portals organizing course admissions, faculty departments, student notices, and campus
                facilities with clean structure, accessible contrast, and mobile responsiveness.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Admissions Lead Flow</span>
                <span class="tech-pill">Department Hubs</span>
                <span class="tech-pill">Notice Feeds</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/website-development">View Web Solutions &rarr;</a>
              </div>
            </article>

            <!-- Sector 2: Retail, E-Commerce & Dining -->
            <article class="industry-showcase-card">
              <span class="section-badge-apple">Commerce &bull; Hospitality</span>
              <h3>Retail, E-Commerce &amp; Dining</h3>
              <p>
                High-speed digital storefronts, interactive product showcases, digital restaurant menus, table reservation
                workflows, and frictionless direct WhatsApp ordering pipelines.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Product Grids</span>
                <span class="tech-pill">WhatsApp Checkout</span>
                <span class="tech-pill">Fast Catalog</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/ecommerce-development">View E-Commerce &rarr;</a>
              </div>
            </article>

            <!-- Sector 3: Healthcare & Clinical Practices -->
            <article class="industry-showcase-card">
              <span class="section-badge-apple">Healthcare &bull; Clinics</span>
              <h3>Healthcare &amp; Clinical Practices</h3>
              <p>
                Accessible, calming clinic websites featuring practitioner profiles, service breakdowns, interactive FAQs,
                patient inquiry forms, and location map directions.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Appointment Inquiries</span>
                <span class="tech-pill">Doctor Directories</span>
                <span class="tech-pill">WCAG Accessible</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/ui-ux-design">View UI/UX Design &rarr;</a>
              </div>
            </article>

            <!-- Sector 4: Finance & Professional Services -->
            <article class="industry-showcase-card">
              <span class="section-badge-apple">Professional &bull; Advisory</span>
              <h3>Finance &amp; Professional Services</h3>
              <p>
                Polished corporate web platforms for accounting practices, legal consultants, and advisory firms designed to
                establish commanding brand credibility and generate qualified client inquiries.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Security Hardening</span>
                <span class="tech-pill">Brand Authority</span>
                <span class="tech-pill">Confidential Inquiries</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/cybersecurity">View Security Hardening &rarr;</a>
              </div>
            </article>

            <!-- Sector 5: Manufacturing & Logistics -->
            <article class="industry-showcase-card">
              <span class="section-badge-apple">Industrial &bull; Operations</span>
              <h3>Manufacturing &amp; Logistics</h3>
              <p>
                Custom business software portals tracking operational status, client shipments, parts inventory, and internal
                staff communication without expensive third-party licensing.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Custom Relational DB</span>
                <span class="tech-pill">Audit Telemetry</span>
                <span class="tech-pill">Status Tracking</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/software-development">View Custom Software &rarr;</a>
              </div>
            </article>

            <!-- Sector 6: Tech Startups & Growing Businesses -->
            <article class="industry-showcase-card">
              <span class="section-badge-apple">Startups &bull; SaaS</span>
              <h3>Tech Startups &amp; Growing Businesses</h3>
              <p>
                Fast-to-market software MVPs, validation landing pages, multi-tenant subscription software, and scalable edge
                cloud architecture engineered to turn early traction into scalable revenue.
              </p>
              <div class="tech-pills-row">
                <span class="tech-pill">Rapid MVPs</span>
                <span class="tech-pill">Subscription Billing</span>
                <span class="tech-pill">Edge Cloud</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a class="btn-apple-subtle" href="/services/saas-development">View SaaS Development &rarr;</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Project Enquiry CTA -->
      <section class="section cta-band" id="project-inquiry">
        <div class="container">
          <div class="radiant-cta-box">
            <p class="eyebrow">Start Your Project</p>
            <h2>Ready to Build a Tailored Platform for Your Sector?</h2>
            <p>Schedule a focused technical consultation to review your requirements, architecture, and timeline.</p>

            <div class="radiant-cta-actions">
              <a class="btn btn-glow-cyan" href="/contact#project-inquiry">
                <span>Discuss Your Sector Needs</span>
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

fs.writeFileSync(path.join(pagesDir, "industries.html"), industriesHtml, "utf8");
console.log("Generated: src/pages/industries.html");
