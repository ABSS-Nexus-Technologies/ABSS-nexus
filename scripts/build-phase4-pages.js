const fs = require("fs");
const path = require("path");
const { renderHeader, renderFooter } = require("./service-template-engine");

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "src", "pages");

function generateHtmlPage({
  filename,
  title,
  metaDescription,
  canonicalUrl,
  activeRoute,
  jsonLd,
  mainContent,
}) {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${metaDescription}" />
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
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>
  </head>
  <body>
${renderHeader(activeRoute)}

    <main>
${mainContent}
    </main>

${renderFooter()}

    <script src="/src/config/admin-config.js"></script>
    <script src="/src/services/admin-api.js"></script>
    <script src="/src/scripts/script.js"></script>
  </body>
</html>
`;

  const targetPath = path.join(pagesDir, filename);
  fs.writeFileSync(targetPath, html, "utf8");
  console.log(`Generated: src/pages/${filename}`);
}

// -----------------------------------------------------------------------------
// 1. ABOUT PAGE
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "about.html",
  title: "About Us | ABSS Nexus Technologies",
  metaDescription: "Learn about ABSS Nexus Technologies, a founder-led engineering studio delivering high-performance websites, custom software, and pragmatic digital solutions.",
  canonicalUrl: "https://abssnexus.in/about",
  activeRoute: "/about",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ABSS Nexus Technologies",
    "url": "https://abssnexus.in/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "ABSS Nexus Technologies",
      "url": "https://abssnexus.in",
      "email": "abssnexus@gmail.com",
      "telephone": "+91 8757928673",
      "founder": {
        "@type": "Person",
        "name": "Shubham Kumar"
      }
    }
  },
  mainContent: `      <section class="site-hero site-hero--page page-hero section" id="hero">
        <div class="site-hero__container container">
          <nav class="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">About</span>
          </nav>
          <div class="site-hero__eyebrow section-badge-apple hero-pill-badge">
            <span class="site-hero__pulse-dot live-pulse-dot" aria-hidden="true"></span>
            <span>Founder-Led Technology Studio</span>
          </div>
          <h1 class="site-hero__title hero-headline-gradient">Engineering Practical Digital Solutions with Technical Precision</h1>
          <p class="site-hero__description">
            ABSS Nexus Technologies is an independent, founder-led software engineering and digital services studio based in Jaipur, Rajasthan. We engineer high-performance web platforms, custom software architectures, and intuitive digital interfaces for businesses across India.
          </p>
          <div class="site-hero__actions hero-actions">
            <a class="site-hero__btn site-hero__btn--primary btn primary" href="/contact">Discuss Your Project</a>
            <a class="site-hero__btn site-hero__btn--secondary btn secondary" href="/services">Explore Our Services</a>
          </div>
        </div>
      </section>

      <!-- Mission & Vision Section -->
      <section class="section" style="background: var(--color-white); border-bottom: 1px solid var(--color-border);">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Mission &amp; Vision</p>
            <h2>Guided by Technical Integrity &amp; Clear Execution</h2>
          </div>
          <div class="culture-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3>Our Engineering Mission</h3>
              <p>
                To design and build resilient, high-speed, and maintainable digital products that directly solve operational bottlenecks for businesses, eliminating bloated frameworks, opaque costs, and technical fragility.
              </p>
            </article>

            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <h3>Our Long-Term Vision</h3>
              <p>
                To establish ABSS Nexus Technologies as a trusted technical partner renowned for pristine code standards, human-centered UI/UX design, and transparent, accountable collaboration across modern enterprise verticals.
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Core Principles -->
      <section class="section" style="background: var(--color-light-gray); border-bottom: 1px solid var(--color-border);">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Engineering Philosophy</p>
            <h2>Five Principles That Define Our Code &amp; Conduct</h2>
          </div>
          <div class="culture-grid">
            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3>1. Sub-Second Speed</h3>
              <p>We optimize critical rendering paths, minimize JavaScript bundles, and leverage edge caching to ensure instantaneous load times across all devices.</p>
            </article>

            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h3>2. Security by Default</h3>
              <p>Security is integrated at every architectural tier, from Content Security Policies and CSRF protection to parameterized database queries and edge defenses.</p>
            </article>

            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
              </div>
              <h3>3. Zero Unnecessary Bloat</h3>
              <p>We write clean vanilla CSS tokens and modular ES modules whenever possible, avoiding heavy, brittle dependencies that slow down systems and inflate maintenance costs.</p>
            </article>

            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3>4. Human-Centered Design</h3>
              <p>Inspired by Apple’s minimalist clarity, our interfaces prioritize visual hierarchy, high legibility, and effortless usability for end customers.</p>
            </article>

            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h3>5. Direct Accountability</h3>
              <p>You work directly with engineers who architect and code your product. Scopes, milestones, and deliverables are documented with full transparency.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Founder & Technical Leadership -->
      <section class="section" style="background: var(--color-white); border-bottom: 1px solid var(--color-border);">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Technical Leadership</p>
            <h2>Founder-Led Hands-On Engineering</h2>
          </div>
          <div class="case-breakdown-card" style="margin-top: 36px;">
            <div>
              <span class="blog-tag" style="margin-bottom: 16px; display: inline-block;">Founder &amp; Technical Lead</span>
              <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--color-near-black); margin-bottom: 12px;">Shubham Kumar</h3>
              <p style="font-size: 1rem; line-height: 1.7; color: var(--color-secondary-text); margin-bottom: 16px;">
                Shubham Kumar is the founder and lead software architect at ABSS Nexus Technologies. With extensive hands-on experience in full-stack web engineering, distributed systems, and performance tuning, Shubham directly oversees all client architecture and code reviews.
              </p>
              <p style="font-size: 0.95rem; line-height: 1.6; color: var(--color-secondary-text); margin-bottom: 24px;">
                Based in Jaipur, Rajasthan, he champions pragmatic engineering practices: building robust systems that perform reliably under real-world conditions rather than chasing transient software fads.
              </p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <span class="blog-filter-btn" style="cursor: default;">Full-Stack Architecture</span>
                <span class="blog-filter-btn" style="cursor: default;">Edge Computing</span>
                <span class="blog-filter-btn" style="cursor: default;">Core Web Vitals</span>
                <span class="blog-filter-btn" style="cursor: default;">Database Design</span>
              </div>
            </div>
            <div style="background: var(--color-light-gray); border-radius: 16px; padding: 32px; border: 1px solid var(--color-border);">
              <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--color-near-black); margin-bottom: 16px;">Our Engineering Capabilities</h4>
              <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
                <li style="display: flex; gap: 10px; font-size: 0.94rem; color: var(--color-secondary-text);">
                  <strong style="color: var(--color-blue);">&bull;</strong> 15 Specialized Digital &amp; IT Services
                </li>
                <li style="display: flex; gap: 10px; font-size: 0.94rem; color: var(--color-secondary-text);">
                  <strong style="color: var(--color-blue);">&bull;</strong> 6 Core Enterprise Solution Problem Areas
                </li>
                <li style="display: flex; gap: 10px; font-size: 0.94rem; color: var(--color-secondary-text);">
                  <strong style="color: var(--color-blue);">&bull;</strong> 6 Target Industry Vertical Specializations
                </li>
                <li style="display: flex; gap: 10px; font-size: 0.94rem; color: var(--color-secondary-text);">
                  <strong style="color: var(--color-blue);">&bull;</strong> Pan-India Remote Client Delivery Model
                </li>
              </ul>
              <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--color-border);">
                <a class="btn primary" style="width: 100%; text-align: center;" href="/contact">Schedule Technical Consultation</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Final Project CTA Banner -->
      <section class="section" style="background: var(--color-light-gray);">
        <div class="container" style="text-align: center; max-width: 720px;">
          <p class="eyebrow">Start Working Together</p>
          <h2 style="font-family: var(--font-heading); font-size: 2rem; color: var(--color-near-black); margin-bottom: 16px;">Ready to Engineer Your Next Digital Platform?</h2>
          <p style="font-size: 1.05rem; line-height: 1.6; color: var(--color-secondary-text); margin-bottom: 28px;">
            Whether you require a custom website, a scalable SaaS MVP, or managed technical maintenance, we deliver transparent timelines and robust code.
          </p>
          <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
            <a class="btn primary" href="/contact">Discuss Your Project</a>
            <a class="btn secondary" href="/services">Browse All Services</a>
          </div>
        </div>
      </section>`
});

// -----------------------------------------------------------------------------
// 2. CAREERS PAGE
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "careers.html",
  title: "Careers & Culture | ABSS Nexus Technologies",
  metaDescription: "Explore the engineering culture at ABSS Nexus Technologies. Learn about our standards, work environment, and speculative collaboration opportunities.",
  canonicalUrl: "https://abssnexus.in/careers",
  activeRoute: "/careers",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Careers at ABSS Nexus Technologies",
    "url": "https://abssnexus.in/careers",
    "description": "Engineering standards, team culture, and collaboration opportunities at ABSS Nexus Technologies."
  },
  mainContent: `      <section class="site-hero site-hero--page page-hero section" id="hero">
        <div class="site-hero__container container">
          <nav class="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Careers</span>
          </nav>
          <div class="site-hero__eyebrow section-badge-apple hero-pill-badge">
            <span class="site-hero__pulse-dot live-pulse-dot" aria-hidden="true"></span>
            <span>Culture &amp; Collaboration</span>
          </div>
          <h1 class="site-hero__title hero-headline-gradient">Building Resilient Software with Craftsmanship &amp; Integrity</h1>
          <p class="site-hero__description">
            We are an engineering-driven studio that values craftsmanship, clean code, and intellectual curiosity over rushed deadlines and bloated frameworks.
          </p>
          <div class="site-hero__actions hero-actions">
            <a class="site-hero__btn site-hero__btn--primary btn primary" href="/contact">Send General Inquiry</a>
            <a class="site-hero__btn site-hero__btn--secondary btn secondary" href="/about">Learn About Our Team</a>
          </div>
        </div>
      </section>

      <!-- Culture Pillars -->
      <section class="section" style="background: var(--color-white); border-bottom: 1px solid var(--color-border);">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Work Culture</p>
            <h2>How We Build &amp; Work Together</h2>
          </div>
          <div class="culture-grid">
            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <h3>Craftsmanship Over Shortcuts</h3>
              <p>We write clean, semantic code that is built to endure. Every pull request is reviewed with care, ensuring performance, accessibility, and documentation integrity.</p>
            </article>

            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3>Continuous Learning</h3>
              <p>We stay on the bleeding edge of modern web standards, serverless architectures, and Core Web Vitals, dedicating time to research, experiment, and refine our toolchains.</p>
            </article>

            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
              </div>
              <h3>Focus &amp; Deep Work</h3>
              <p>We eliminate pointless meetings and micromanagement. Our team operates on asynchronous workflows and deep, uninterrupted problem-solving sessions.</p>
            </article>

            <article class="culture-card">
              <div class="culture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h3>Honest Communication</h3>
              <p>We value candid, constructive feedback. When an architectural challenge arises, we analyze root causes collaboratively rather than hiding technical debt.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Transparent Openings Status -->
      <section class="section" style="background: var(--color-light-gray); border-bottom: 1px solid var(--color-border);">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Current Vacancies</p>
            <h2>Job Openings Status</h2>
          </div>

          <div class="career-empty-card">
            <div class="career-empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <h3>No Active Full-Time Openings</h3>
            <p>
              ABSS Nexus Technologies currently operates as a tight-knit founder-led engineering studio. While we do not have open salaried positions at this time, we frequently collaborate with skilled freelance developers, technical writers, and UI/UX designers on project contracts.
            </p>
            <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
              <a class="btn primary" href="/contact">Submit Speculative Profile</a>
              <a class="btn secondary" href="mailto:abssnexus@gmail.com">Email Your Portfolio</a>
            </div>
          </div>

          <div style="max-width: 680px; margin: 40px auto 0 auto; padding: 24px; background: var(--color-white); border-radius: 14px; border: 1px solid var(--color-border); text-align: center;">
            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--color-near-black); margin-bottom: 8px;">Notice for Students &amp; Graduates</h4>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--color-secondary-text); margin: 0;">
              Our verified software engineering and web development internship program is administered separately. Applications and curriculum tracks will open exclusively through our upcoming academic internship portal.
            </p>
          </div>
        </div>
      </section>`
});

// -----------------------------------------------------------------------------
// 3. BLOG LISTING PAGE
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "blog.html",
  title: "Engineering Blog & Technical Guides | ABSS Nexus Technologies",
  metaDescription: "Read engineering insights, technical guides, and architectural best practices from the ABSS Nexus Technologies development and software design team.",
  canonicalUrl: "https://abssnexus.in/blog",
  activeRoute: "/blog",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ABSS Nexus Technologies Engineering Blog",
    "url": "https://abssnexus.in/blog",
    "description": "Technical insights on web performance, distributed edge architecture, and functional UI/UX design systems."
  },
  mainContent: `      <section class="site-hero site-hero--page page-hero section" id="hero">
        <div class="site-hero__container container">
          <nav class="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Blog</span>
          </nav>
          <div class="site-hero__eyebrow section-badge-apple hero-pill-badge">
            <span class="site-hero__pulse-dot live-pulse-dot" aria-hidden="true"></span>
            <span>Technical Insights &amp; Guides</span>
          </div>
          <h1 class="site-hero__title hero-headline-gradient">Technical Insights, Architecture Guides &amp; Web Engineering</h1>
          <p class="site-hero__description">
            In-depth guides and architectural breakdowns from the ABSS Nexus Technologies engineering team covering Core Web Vitals, serverless edge systems, and functional design.
          </p>
        </div>
      </section>

      <section class="section" style="background: var(--color-white); border-bottom: 1px solid var(--color-border);">
        <div class="container">
          <div class="blog-grid">
            <!-- Article 1 -->
            <article class="blog-card">
              <div class="blog-card-header">
                <span class="blog-tag">Web Performance</span>
                <span class="blog-read-time">6 min read</span>
              </div>
              <div class="blog-card-body">
                <h2 class="blog-card-title"><a href="/blog/modern-web-performance-core-web-vitals" style="text-decoration: none; color: inherit;">Modern Web Performance &amp; Core Web Vitals: An Engineering Guide</a></h2>
                <p class="blog-card-excerpt">
                  A deep technical breakdown of optimizing Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and layout stability through modern rendering strategies.
                </p>
                <div class="blog-card-meta">
                  <span class="blog-card-author">Engineering Team</span>
                  <time datetime="2026-10-19">Oct 19, 2026</time>
                </div>
              </div>
            </article>

            <!-- Article 2 -->
            <article class="blog-card">
              <div class="blog-card-header">
                <span class="blog-tag">Cloud Architecture</span>
                <span class="blog-read-time">5 min read</span>
              </div>
              <div class="blog-card-body">
                <h2 class="blog-card-title"><a href="/blog/resilient-cloud-architecture-edge-computing" style="text-decoration: none; color: inherit;">Building Resilient Cloud Architecture with Edge Functions &amp; Serverless KV</a></h2>
                <p class="blog-card-excerpt">
                  Practical architectural patterns for deploying business logic at the global edge, managing low-latency key-value state, and implementing zero-trust security.
                </p>
                <div class="blog-card-meta">
                  <span class="blog-card-author">Engineering Team</span>
                  <time datetime="2026-10-19">Oct 19, 2026</time>
                </div>
              </div>
            </article>

            <!-- Article 3 -->
            <article class="blog-card">
              <div class="blog-card-header">
                <span class="blog-tag">UI/UX Design</span>
                <span class="blog-read-time">5 min read</span>
              </div>
              <div class="blog-card-body">
                <h2 class="blog-card-title"><a href="/blog/minimalist-design-systems-conversion" style="text-decoration: none; color: inherit;">Minimalist UI/UX Design Systems: Crafting High-Conversion Interfaces</a></h2>
                <p class="blog-card-excerpt">
                  How Apple-inspired visual hierarchy, purposeful whitespace, and WCAG-compliant design tokens increase user trust and interface engagement.
                </p>
                <div class="blog-card-meta">
                  <span class="blog-card-author">Engineering Team</span>
                  <time datetime="2026-10-19">Oct 19, 2026</time>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>`
});

// -----------------------------------------------------------------------------
// 4. ARTICLE 1: MODERN WEB PERFORMANCE
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "blog-modern-web-performance.html",
  title: "Modern Web Performance & Core Web Vitals | ABSS Nexus",
  metaDescription: "A comprehensive engineering guide to optimizing Largest Contentful Paint, Interaction to Next Paint, and layout stability for high-speed websites.",
  canonicalUrl: "https://abssnexus.in/blog/modern-web-performance-core-web-vitals",
  activeRoute: "/blog",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Modern Web Performance & Core Web Vitals: An Engineering Guide",
    "description": "A comprehensive engineering guide to optimizing Largest Contentful Paint, Interaction to Next Paint, and layout stability for high-speed websites.",
    "datePublished": "2026-10-19",
    "dateModified": "2026-10-19",
    "author": {
      "@type": "Organization",
      "name": "ABSS Nexus Technologies Engineering Team",
      "url": "https://abssnexus.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ABSS Nexus Technologies",
      "url": "https://abssnexus.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://abssnexus.in/public/assets/images/LogoGenerated.png"
      }
    },
    "mainEntityOfPage": "https://abssnexus.in/blog/modern-web-performance-core-web-vitals"
  },
  mainContent: `      <article class="article-container">
        <header class="article-header">
          <nav class="breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <a href="/blog">Blog</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Web Performance</span>
          </nav>
          <span class="article-category-tag">Web Performance</span>
          <h1 class="article-title">Modern Web Performance &amp; Core Web Vitals: An Engineering Guide</h1>
          <p class="article-lead">
            In modern web engineering, performance is not an afterthought or an optimization pass—it is the foundation of user trust, organic search rank, and commercial conversion.
          </p>
          <div class="article-meta-bar">
            <span>By <strong>Engineering Team, ABSS Nexus Technologies</strong></span>
            <span>&bull;</span>
            <time datetime="2026-10-19">Published Oct 19, 2026</time>
            <span>&bull;</span>
            <span>6 min read</span>
          </div>
        </header>

        <div class="article-body">
          <h2>The Triad of Modern User Experience Metrics</h2>
          <p>
            Google’s Core Web Vitals establish rigorous quantitative benchmarks for evaluating real-world web experience. Rather than relying solely on synthetic Lighthouse audits under pristine CPU conditions, modern search engines monitor field data gathered from real user sessions across diverse mobile networks and hardware tiers.
          </p>
          <p>
            The current vital metrics comprise:
          </p>
          <ul>
            <li><strong>Largest Contentful Paint (LCP):</strong> Measures perceived loading speed. Marks when the primary hero element or content block renders. Target: &le; 2.5 seconds.</li>
            <li><strong>Interaction to Next Paint (INP):</strong> Assesses overall page responsiveness. Evaluates the latency of all user interactions (clicks, keypresses, taps) throughout the full session lifecycle. Target: &le; 200 milliseconds.</li>
            <li><strong>Cumulative Layout Shift (CLS):</strong> Quantifies visual stability. Evaluates unexpected layout jumps that disrupt user focus. Target: &le; 0.1.</li>
          </ul>

          <h2>Engineering for Sub-Second LCP</h2>
          <p>
            Optimizing LCP requires tackling the critical rendering path end-to-end: Time to First Byte (TTFB), Resource Load Delay, Resource Load Time, and Element Render Delay.
          </p>
          <p>
            Key architectural techniques include:
          </p>
          <div class="article-callout">
            <h4>Priority Resource Hinting</h4>
            <p>
              When a hero image is critical to LCP, utilize <code>fetchpriority="high"</code> and preload the critical asset directly in the document <code>&lt;head&gt;</code> before CSS parse completion.
            </p>
          </div>
          <p>
            Avoid client-side hydration delays by delivering semantic HTML directly from edge nodes. When JavaScript frameworks are used, adopt islands architecture or static pre-rendering so that the initial DOM paint does not block on bundle execution.
          </p>

          <h2>Taming Interaction to Next Paint (INP)</h2>
          <p>
            INP replaced First Input Delay (FID) to evaluate the responsiveness of every interaction on the page, not merely the first click. High INP is almost always caused by long JavaScript tasks occupying the browser main thread for more than 50 milliseconds.
          </p>
          <p>
            To maintain &le; 200ms INP across mobile devices:
          </p>
          <ul>
            <li><strong>Yield to the Main Thread:</strong> Break monolithic computational loops into smaller chunks using <code>requestIdleCallback()</code> or modern cooperative scheduling with <code>scheduler.yield()</code>.</li>
            <li><strong>Debounce &amp; Throttle Input Handlers:</strong> Never execute DOM mutations synchronously inside high-frequency scroll or resize listeners. Utilize <code>requestAnimationFrame</code> for visual animations.</li>
            <li><strong>Avoid Heavy DOM Trees:</strong> Excessive DOM depth (&gt; 1,500 nodes) magnifies style recalculation and layout costs whenever an element updates.</li>
          </ul>

          <h2>Eliminating Layout Shifts (CLS)</h2>
          <p>
            Layout shifts frustrate users and trigger accidental clicks. The most common causes of layout shift are un-dimensioned images, late-loading web fonts, and dynamically injected banners.
          </p>
          <p>
            Enforce explicit <code>width</code> and <code>height</code> attributes on all images and video containers, allowing the browser to reserve layout space via CSS <code>aspect-ratio</code> before assets download. For typography, configure <code>font-display: swap</code> paired with size-adjusted fallback font metrics to prevent layout shifts when custom web fonts finish streaming.
          </p>

          <div class="article-author-card">
            <div class="author-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div class="author-info">
              <h4>ABSS Nexus Technologies Engineering Team</h4>
              <p>Specializing in high-performance web systems, distributed edge architecture, and clean user interfaces. We engineer websites and digital products that prioritize speed, accessibility, and reliability.</p>
            </div>
          </div>
        </div>
      </article>`
});

// -----------------------------------------------------------------------------
// 5. ARTICLE 2: RESILIENT CLOUD ARCHITECTURE
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "blog-resilient-cloud-architecture.html",
  title: "Resilient Cloud Architecture with Edge Functions | ABSS Nexus",
  metaDescription: "Learn architectural patterns for deploying low-latency edge functions, serverless KV state, and multi-region resilience across distributed web platforms.",
  canonicalUrl: "https://abssnexus.in/blog/resilient-cloud-architecture-edge-computing",
  activeRoute: "/blog",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Building Resilient Cloud Architecture with Edge Functions & Serverless KV",
    "description": "Learn architectural patterns for deploying low-latency edge functions, serverless KV state, and multi-region resilience across distributed web platforms.",
    "datePublished": "2026-10-19",
    "dateModified": "2026-10-19",
    "author": {
      "@type": "Organization",
      "name": "ABSS Nexus Technologies Engineering Team",
      "url": "https://abssnexus.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ABSS Nexus Technologies",
      "url": "https://abssnexus.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://abssnexus.in/public/assets/images/LogoGenerated.png"
      }
    },
    "mainEntityOfPage": "https://abssnexus.in/blog/resilient-cloud-architecture-edge-computing"
  },
  mainContent: `      <article class="article-container">
        <header class="article-header">
          <nav class="breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <a href="/blog">Blog</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Cloud Architecture</span>
          </nav>
          <span class="article-category-tag">Cloud Architecture</span>
          <h1 class="article-title">Building Resilient Cloud Architecture with Edge Functions &amp; Serverless KV</h1>
          <p class="article-lead">
            Traditional monolithic servers centralized in a single region create single points of failure and geographic latency penalties. Modern edge infrastructure flips this paradigm.
          </p>
          <div class="article-meta-bar">
            <span>By <strong>Engineering Team, ABSS Nexus Technologies</strong></span>
            <span>&bull;</span>
            <time datetime="2026-10-19">Published Oct 19, 2026</time>
            <span>&bull;</span>
            <span>5 min read</span>
          </div>
        </header>

        <div class="article-body">
          <h2>The Geodistributed Edge Paradigm</h2>
          <p>
            When a user in Delhi requests a webpage from an origin server in Northern Virginia, the speed-of-light round trip across undersea fiber optic cables guarantees hundreds of milliseconds of unavoidable latency. Even with optimized application code, the physical distance imposes a hard lower bound on responsiveness.
          </p>
          <p>
            Serverless edge computing relocates application logic to hundreds of globally distributed Points of Presence (PoPs). By executing routing, authentication, and personalized rendering directly on edge servers located within 50 milliseconds of the end user, round-trip latency collapses.
          </p>

          <h2>State Management at the Edge</h2>
          <p>
            The primary challenge in distributed edge architecture is managing state. Traditional relational databases expect a single centralized primary writer. Distributing application state globally requires decoupling reads from writes:
          </p>
          <ul>
            <li><strong>High-Frequency Edge Caching:</strong> Static assets and pre-computed JSON states are cached globally with precise <code>Cache-Control</code> headers, revalidating in the background using stale-while-revalidate semantics.</li>
            <li><strong>Serverless Key-Value (KV) Stores:</strong> Read-heavy configuration and session tokens are propagated across global nodes with sub-millisecond read latency.</li>
            <li><strong>Edge SQL Databases:</strong> Modern distributed databases (such as Cloudflare D1 with SQLite engine) place read replicas near users while coordinating writes through consensus algorithms.</li>
          </ul>

          <div class="article-callout">
            <h4>Defense in Depth at the Edge</h4>
            <p>
              By handling input validation and origin verification at the edge tier, illegitimate requests and DDoS volume are mitigated before they ever touch your backend infrastructure or database connections.
            </p>
          </div>

          <h2>Resilience and Failover Circuits</h2>
          <p>
            High availability requires designing for failure. In our production setups, edge handlers implement graceful fallback circuits: if an external third-party API or database query experiences an unhandled timeout, the edge function catches the exception and serves a cached fallback response or a graceful degraded state rather than returning a blank 500 error page.
          </p>

          <div class="article-author-card">
            <div class="author-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div class="author-info">
              <h4>ABSS Nexus Technologies Engineering Team</h4>
              <p>Specializing in high-performance web systems, distributed edge architecture, and clean user interfaces. We engineer websites and digital products that prioritize speed, accessibility, and reliability.</p>
            </div>
          </div>
        </div>
      </article>`
});

// -----------------------------------------------------------------------------
// 6. ARTICLE 3: MINIMALIST DESIGN SYSTEMS
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "blog-minimalist-design-systems.html",
  title: "Minimalist UI/UX Design Systems for Conversion | ABSS Nexus",
  metaDescription: "Explore how minimalist design systems, structured typography, and deliberate whitespace enhance usability, brand trust, and business conversion rates.",
  canonicalUrl: "https://abssnexus.in/blog/minimalist-design-systems-conversion",
  activeRoute: "/blog",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Minimalist UI/UX Design Systems: Crafting High-Conversion Interfaces",
    "description": "Explore how minimalist design systems, structured typography, and deliberate whitespace enhance usability, brand trust, and business conversion rates.",
    "datePublished": "2026-10-19",
    "dateModified": "2026-10-19",
    "author": {
      "@type": "Organization",
      "name": "ABSS Nexus Technologies Engineering Team",
      "url": "https://abssnexus.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ABSS Nexus Technologies",
      "url": "https://abssnexus.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://abssnexus.in/public/assets/images/LogoGenerated.png"
      }
    },
    "mainEntityOfPage": "https://abssnexus.in/blog/minimalist-design-systems-conversion"
  },
  mainContent: `      <article class="article-container">
        <header class="article-header">
          <nav class="breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <a href="/blog">Blog</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">UI/UX Design</span>
          </nav>
          <span class="article-category-tag">UI/UX Design</span>
          <h1 class="article-title">Minimalist UI/UX Design Systems: Crafting High-Conversion Interfaces</h1>
          <p class="article-lead">
            Minimalism is not about removing features until nothing remains—it is about removing distraction until the essential purpose of the interface communicates with total clarity.
          </p>
          <div class="article-meta-bar">
            <span>By <strong>Engineering Team, ABSS Nexus Technologies</strong></span>
            <span>&bull;</span>
            <time datetime="2026-10-19">Published Oct 19, 2026</time>
            <span>&bull;</span>
            <span>5 min read</span>
          </div>
        </header>

        <div class="article-body">
          <h2>The Psychology of Visual Clarity</h2>
          <p>
            When a visitor arrives at a modern business website, cognitive friction is the number one driver of high bounce rates. Cluttered sidebars, flashing popups, inconsistent typography, and conflicting calls-to-action force the visitor's brain to expend energy deciphering the page rather than absorbing its value proposition.
          </p>
          <p>
            Inspired by Apple’s timeless design philosophy, a minimalist design system enforces purposeful constraints:
          </p>
          <ul>
            <li><strong>Restrained Color Palette:</strong> High-contrast base tones (pure white <code>#FFFFFF</code>, subtle light gray <code>#F5F5F7</code>, and near-black <code>#1D1D1F</code>) allow deliberate accent blues (<code>#0066CC</code>) to command immediate attention on conversion CTAs.</li>
            <li><strong>Typographic Cadence:</strong> Pairing an architectural heading font (such as Space Grotesk) with an ultra-legible body face (such as Inter) establishes clear hierarchical rhythm.</li>
            <li><strong>Generous Whitespace:</strong> Generous margins and paddings give complex information room to breathe, elevating perceived value and professionalism.</li>
          </ul>

          <h2>Design Tokens as Architectural Primitives</h2>
          <p>
            A high-grade design system is only as good as its implementation. Ad-hoc CSS classes and arbitrary pixel values lead to visual fragmentation. Instead, we define centralized CSS Custom Properties for all tokens:
          </p>
          <div class="article-callout">
            <h4>Tokenized Spacing &amp; Borders</h4>
            <p>
              Standardizing radii (<code>16px</code> for cards, <code>980px</code> for pills) and border colors (<code>#D2D2D7</code>) ensures that every page across a multi-tier web application feels cohesive and unified.
            </p>
          </div>

          <h2>Accessibility Drives Conversion</h2>
          <p>
            True minimalism never sacrifices accessibility for aesthetics. Every interactive element must satisfy WCAG AA contrast ratios (&ge; 4.5:1 for body copy), provide visible focus rings for keyboard navigation, and respect the user’s <code>prefers-reduced-motion</code> operating system preferences.
          </p>

          <div class="article-author-card">
            <div class="author-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div class="author-info">
              <h4>ABSS Nexus Technologies Engineering Team</h4>
              <p>Specializing in high-performance web systems, distributed edge architecture, and clean user interfaces. We engineer websites and digital products that prioritize speed, accessibility, and reliability.</p>
            </div>
          </div>
        </div>
      </article>`
});

// -----------------------------------------------------------------------------
// 7. FAQ PAGE
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "faq.html",
  title: "Frequently Asked Questions (FAQ) | ABSS Nexus Technologies",
  metaDescription: "Find clear, direct answers to common questions about our web development, custom software engineering, delivery processes, and project engagements.",
  canonicalUrl: "https://abssnexus.in/faq",
  activeRoute: "/faq",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does ABSS Nexus Technologies specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in 15 core digital and software services including custom website development, software development, mobile apps, UI/UX design, cloud architecture, and ongoing technical maintenance."
        }
      },
      {
        "@type": "Question",
        "name": "How is project pricing and scope determined?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pricing is based on clear, itemized project scopes, technical requirements, integrations, and milestone deliverables. We provide transparent written quotations prior to project commencement."
        }
      },
      {
        "@type": "Question",
        "name": "How do you communicate during project development?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We maintain regular communication through structured milestone updates, email briefs, and direct messaging on WhatsApp, providing live staging links for iterative review."
        }
      }
    ]
  },
  mainContent: `      <section class="site-hero site-hero--page page-hero section" id="hero">
        <div class="site-hero__container container">
          <nav class="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">FAQ</span>
          </nav>
          <div class="site-hero__eyebrow section-badge-apple hero-pill-badge">
            <span class="site-hero__pulse-dot live-pulse-dot" aria-hidden="true"></span>
            <span>Help &amp; Knowledge Base</span>
          </div>
          <h1 class="site-hero__title hero-headline-gradient">Frequently Asked Questions: <span class="site-hero__title-accent text-gradient-cyan">Clear Answers to Common Inquiries</span></h1>
          <p class="site-hero__description">
            Honest, transparent answers about our engineering capabilities, project onboarding, delivery timelines, and technical support engagements.
          </p>
          <div class="site-hero__actions hero-actions">
            <a class="site-hero__btn site-hero__btn--primary btn primary" href="/contact">Ask a Specific Question</a>
            <a class="site-hero__btn site-hero__btn--secondary btn secondary" href="/services">Explore Our Services</a>
          </div>
        </div>
      </section>

      <section class="section" style="background: var(--color-white); border-bottom: 1px solid var(--color-border);">
        <div class="container" style="max-width: 860px;">

          <!-- Category 1 -->
          <div class="faq-category-block">
            <h2 class="faq-category-title">
              <span class="faq-category-icon" aria-hidden="true">⚙️</span>
              Services &amp; Project Scope
            </h2>
            <div class="faq-list">
              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-1" data-faq-toggle>
                  What digital services does ABSS Nexus Technologies offer?
                </button>
                <div class="faq-answer" id="faq-ans-1" hidden>
                  <p>
                    We offer 15 specialized digital services organized into four key areas: Web &amp; Software Engineering (Website Development, Custom Software, Mobile Apps, SaaS), Design &amp; Digital Growth (UI/UX Design, Technical SEO), Cloud &amp; Systems (Cloud Computing, API Integration, Cybersecurity), and Quality &amp; Support (Software Testing, IT Consulting, Managed Maintenance).
                  </p>
                </div>
              </article>

              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-2" data-faq-toggle>
                  Do you build custom websites or use pre-made templates?
                </button>
                <div class="faq-answer" id="faq-ans-2" hidden>
                  <p>
                    Every business project is custom engineered. We write clean, semantic HTML, modern CSS design tokens, and modular JavaScript tailored to your brand identity, business workflows, and performance requirements rather than relying on bloated off-the-shelf templates.
                  </p>
                </div>
              </article>

              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-3" data-faq-toggle>
                  Can you redesign and modernize an existing website?
                </button>
                <div class="faq-answer" id="faq-ans-3" hidden>
                  <p>
                    Yes. We conduct complete technical audits of existing websites, analyzing Core Web Vitals, mobile responsiveness, accessibility, and visual aesthetics, then re-architect the platform to deliver high speed and clean conversion funnels.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <!-- Category 2 -->
          <div class="faq-category-block">
            <h2 class="faq-category-title">
              <span class="faq-category-icon" aria-hidden="true">📋</span>
              Discovery, Pricing &amp; Quotations
            </h2>
            <div class="faq-list">
              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-4" data-faq-toggle>
                  How is project pricing calculated?
                </button>
                <div class="faq-answer" id="faq-ans-4" hidden>
                  <p>
                    Pricing is calculated transparently based on functional requirements, page/screen volume, backend logic complexity, database integrations, and timeline constraints. We provide itemized quotations so you know exactly what is included prior to commencing work.
                  </p>
                </div>
              </article>

              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-5" data-faq-toggle>
                  What information should I provide when requesting a quote?
                </button>
                <div class="faq-answer" id="faq-ans-5" hidden>
                  <p>
                    Providing your business type, the primary objective of the site, reference designs you like, expected features (e.g. contact forms, product catalogs, user accounts), and target timeline helps us prepare an accurate and detailed quotation quickly.
                  </p>
                </div>
              </article>

              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-6" data-faq-toggle>
                  What are your standard payment milestones?
                </button>
                <div class="faq-answer" id="faq-ans-6" hidden>
                  <p>
                    Projects typically operate on structured milestones (e.g. an initial project commencement deposit, milestone progress demonstrations on staging servers, and final settlement upon deployment approval). All terms are agreed in writing before kick-off.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <!-- Category 3 -->
          <div class="faq-category-block">
            <h2 class="faq-category-title">
              <span class="faq-category-icon" aria-hidden="true">🚀</span>
              Development &amp; Delivery Process
            </h2>
            <div class="faq-list">
              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-7" data-faq-toggle>
                  How can I track progress during development?
                </button>
                <div class="faq-answer" id="faq-ans-7" hidden>
                  <p>
                    We deploy progress builds to private staging preview URLs so you can test functionality and review design iterations in real time on desktop and mobile devices.
                  </p>
                </div>
              </article>

              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-8" data-faq-toggle>
                  What communication channels do you use?
                </button>
                <div class="faq-answer" id="faq-ans-8" hidden>
                  <p>
                    We use official email (abssnexus@gmail.com) for formal briefs, scope documentation, and approvals, paired with WhatsApp messaging for quick day-to-day updates, clarification questions, and staging link sharing.
                  </p>
                </div>
              </article>

              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-9" data-faq-toggle>
                  Who owns the intellectual property and code upon project completion?
                </button>
                <div class="faq-answer" id="faq-ans-9" hidden>
                  <p>
                    You retain 100% ownership of your custom code, design files, and content upon final project settlement. We hand over all production files and repository access without proprietary lock-in.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <!-- Category 4 -->
          <div class="faq-category-block">
            <h2 class="faq-category-title">
              <span class="faq-category-icon" aria-hidden="true">🛡️</span>
              Security, Hosting &amp; Ongoing Support
            </h2>
            <div class="faq-list">
              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-10" data-faq-toggle>
                  Should I send hosting account passwords via the contact form?
                </button>
                <div class="faq-answer" id="faq-ans-10" hidden>
                  <p>
                    No. Never submit passwords or private credentials through public contact forms. Secure access sharing instructions (such as delegated collaborator access or encrypted password managers) are arranged only after project engagement is confirmed.
                  </p>
                </div>
              </article>

              <article class="faq-item">
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-ans-11" data-faq-toggle>
                  Do you provide ongoing website maintenance and support?
                </button>
                <div class="faq-answer" id="faq-ans-11" hidden>
                  <p>
                    Yes. We offer managed technical maintenance plans covering security patching, edge CDN monitoring, performance health checks, link verification, and content updates to keep your platform running smoothly.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div style="background: var(--color-light-gray); border-radius: 16px; padding: 36px; text-align: center; border: 1px solid var(--color-border); margin-top: 48px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--color-near-black); margin-bottom: 8px;">Have a Question Not Answered Here?</h3>
            <p style="font-size: 0.95rem; color: var(--color-secondary-text); max-width: 520px; margin: 0 auto 20px auto;">
              Our founder and engineering team are available to answer your technical questions and evaluate project feasibility.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a class="btn primary" href="/contact">Send Direct Inquiry</a>
              <a class="btn secondary" href="https://wa.me/918757928673" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>`
});

// -----------------------------------------------------------------------------
// 8. PRIVACY POLICY
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "privacy-policy.html",
  title: "Privacy Policy | ABSS Nexus Technologies",
  metaDescription: "Read the ABSS Nexus Technologies privacy policy detailing how client inquiry information, browser storage, and security telemetry are collected and handled.",
  canonicalUrl: "https://abssnexus.in/privacy-policy",
  activeRoute: "/privacy-policy",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - ABSS Nexus Technologies",
    "url": "https://abssnexus.in/privacy-policy"
  },
  mainContent: `      <section class="page-hero section">
        <div class="container">
          <nav class="breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Privacy Policy</span>
          </nav>
          <div class="hero-pill-badge">
            <span class="live-pulse-dot" aria-hidden="true"></span>
            Data Protection &amp; Privacy
          </div>
          <p class="eyebrow">Legal Notice</p>
          <h1 class="hero-headline-gradient">Privacy Policy: Transparent Data Collection &amp; Handling Practices</h1>
          <p>
            This document outlines how ABSS Nexus Technologies collects, handles, and protects information submitted through our website and digital services.
          </p>
        </div>
      </section>

      <section class="section" style="background: var(--color-white); border-bottom: 1px solid var(--color-border);">
        <div class="legal-container">
          <div class="legal-meta-banner">
            <div>
              <span>Effective Date: <strong>October 19, 2026</strong></span>
              <span style="margin: 0 10px;">&bull;</span>
              <span>Version: <strong>2.0</strong></span>
            </div>
            <span class="legal-badge-draft">Review-Ready Draft</span>
          </div>

          <div class="article-callout" style="margin-top: 0; margin-bottom: 32px;">
            <h4>Notice: Review-Ready Legal Draft</h4>
            <p>
              This privacy policy is a review-ready operational draft accurately describing this website’s technical data collection, browser storage, and Cloudflare edge processing practices. It is subject to formal legal counsel review prior to binding corporate execution.
            </p>
          </div>

          <div class="legal-section-block">
            <h2>1. Information We Collect</h2>
            <p>
              ABSS Nexus Technologies adheres to the principle of data minimization. We collect only information strictly necessary to evaluate project inquiries and maintain website security:
            </p>
            <ul>
              <li><strong>Contact Inquiry Information:</strong> When you complete our Project Inquiry Form, we collect your full name, business email address, telephone number, organization name, required service, estimated budget range, preferred timeline, and project description.</li>
              <li><strong>Technical Edge Telemetry:</strong> In the course of normal HTTP communication, our edge hosting infrastructure (Cloudflare) automatically processes client IP addresses, browser user-agent headers, and HTTP request paths for DDoS mitigation, rate limiting, and anomaly detection.</li>
              <li><strong>Browser Client Storage:</strong> We utilize browser LocalStorage solely to maintain administrative authentication session tokens and temporary local inquiry submission queues.</li>
            </ul>
          </div>

          <div class="legal-section-block">
            <h2>2. Purpose of Data Processing</h2>
            <p>Information submitted through our website is used strictly for legitimate business purposes:</p>
            <ul>
              <li>To evaluate project feasibility, prepare technical scopes, and provide itemized quotations.</li>
              <li>To communicate with prospective clients via email or phone regarding their inquiries.</li>
              <li>To detect, prevent, and mitigate malicious traffic, bot spam, and security vulnerabilities.</li>
            </ul>
            <p>We do not sell, rent, lease, or monetize client inquiry information to third-party advertisers or data brokers.</p>
          </div>

          <div class="legal-section-block">
            <h2>3. Third-Party Infrastructure Processors</h2>
            <p>
              To maintain global edge availability and security, we partner with industry-standard infrastructure providers:
            </p>
            <ul>
              <li><strong>Cloudflare Inc.:</strong> Provides Content Delivery Network (CDN), DDoS mitigation, SSL encryption, and edge computing functions. Processing occurs under standard data protection agreements.</li>
              <li><strong>WhatsApp (Meta Platforms):</strong> Click-to-chat links redirect directly to the official WhatsApp protocol; communications over WhatsApp are governed by their respective end-to-end encrypted privacy policies.</li>
            </ul>
          </div>

          <div class="legal-section-block">
            <h2>4. Data Retention &amp; Security Controls</h2>
            <p>
              Client inquiries are retained only for as long as necessary to fulfill project evaluation or ongoing contractual agreements. All data in transit is encrypted using modern TLS 1.3 cryptographic protocols. Administrative database access is restricted via cryptographically signed tokens.
            </p>
          </div>

          <div class="legal-section-block">
            <h2>5. User Rights &amp; Privacy Contact</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal inquiry records. To exercise these rights, please contact our technical data controller:
            </p>
            <p style="margin-top: 10px;">
              <strong>ABSS Nexus Technologies</strong><br />
              Attn: Shubham Kumar, Founder &amp; Technical Lead<br />
              Jaipur, Rajasthan, India<br />
              Email: <a href="mailto:abssnexus@gmail.com">abssnexus@gmail.com</a><br />
              Telephone: +91 87579 28673
            </p>
          </div>
        </div>
      </section>`
});

// -----------------------------------------------------------------------------
// 9. TERMS AND CONDITIONS
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "terms-conditions.html",
  title: "Terms and Conditions | ABSS Nexus Technologies",
  metaDescription: "Review the terms and conditions governing professional digital services, software development engagements, and website usage at ABSS Nexus Technologies.",
  canonicalUrl: "https://abssnexus.in/terms-and-conditions",
  activeRoute: "/terms-and-conditions",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions - ABSS Nexus Technologies",
    "url": "https://abssnexus.in/terms-and-conditions"
  },
  mainContent: `      <section class="page-hero section">
        <div class="container">
          <nav class="breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Terms &amp; Conditions</span>
          </nav>
          <div class="hero-pill-badge">
            <span class="live-pulse-dot" aria-hidden="true"></span>
            Terms of Service
          </div>
          <p class="eyebrow">Legal Terms</p>
          <h1 class="hero-headline-gradient">Terms and Conditions: Professional Service &amp; Engagement Terms</h1>
          <p>
            These terms govern the use of the ABSS Nexus Technologies website and define the general terms of engagement for our digital engineering services.
          </p>
        </div>
      </section>

      <section class="section" style="background: var(--color-white); border-bottom: 1px solid var(--color-border);">
        <div class="legal-container">
          <div class="legal-meta-banner">
            <div>
              <span>Effective Date: <strong>October 19, 2026</strong></span>
              <span style="margin: 0 10px;">&bull;</span>
              <span>Version: <strong>2.0</strong></span>
            </div>
            <span class="legal-badge-draft">Review-Ready Draft</span>
          </div>

          <div class="article-callout" style="margin-top: 0; margin-bottom: 32px;">
            <h4>Notice: Review-Ready Legal Draft</h4>
            <p>
              These terms and conditions represent an operational draft based on our actual service delivery models, intellectual property assignments, and payment milestone structures. They are subject to review by qualified legal counsel.
            </p>
          </div>

          <div class="legal-section-block">
            <h2>1. Service Engagement &amp; Written Scope</h2>
            <p>
              All software development, UI/UX design, and IT consulting engagements require a formal written project scope, itemized quotation, or signed statement of work. Quotations provided via email or PDF are valid for 30 calendar days from the date of issue unless specified otherwise.
            </p>
          </div>

          <div class="legal-section-block">
            <h2>2. Client Responsibilities &amp; Materials</h2>
            <p>
              Clients are responsible for providing all necessary brand assets, text copy, media, access credentials, and timely feedback required to meet agreed milestones. Delays in asset provision or scope clarifications may result in corresponding delivery timeline extensions.
            </p>
          </div>

          <div class="legal-section-block">
            <h2>3. Intellectual Property Rights &amp; Ownership</h2>
            <p>
              Upon receipt of full and final payment for an agreed project scope, all custom source code, custom graphics, and final deliverables created specifically for the client transfer exclusively to the client. ABSS Nexus Technologies retains no proprietary claim over client business logic or bespoke assets. Pre-existing open-source libraries or third-party packages remain subject to their respective open-source licenses.
            </p>
          </div>

          <div class="legal-section-block">
            <h2>4. Payment Terms &amp; Invoicing</h2>
            <p>
              Services are billed according to agreed milestone schedules (e.g. initial project commencement deposit, milestone staging sign-offs, and final deployment settlement). Invoices are payable within the timeframe indicated on each invoice. Work on subsequent milestones may pause if overdue balances remain unsettled.
            </p>
          </div>

          <div class="legal-section-block">
            <h2>5. Warranties &amp; Limitation of Liability</h2>
            <p>
              We provide all software development services with professional care and engineering diligence. However, software and web platforms are provided on an "as-is" and "as-available" basis. To the maximum extent permitted by applicable law, ABSS Nexus Technologies shall not be liable for indirect, incidental, or consequential damages resulting from third-party hosting outages, DNS propagation delays, cyberattacks, or external API failures outside our direct control.
            </p>
          </div>

          <div class="legal-section-block">
            <h2>6. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms or client engagements shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan, India.
            </p>
          </div>
        </div>
      </section>`
});

// -----------------------------------------------------------------------------
// 10. COOKIE POLICY
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "cookie-policy.html",
  title: "Cookie Policy | ABSS Nexus Technologies",
  metaDescription: "Understand how ABSS Nexus Technologies utilizes essential cookies, browser local storage, and edge security headers to ensure website performance.",
  canonicalUrl: "https://abssnexus.in/cookie-policy",
  activeRoute: "/cookie-policy",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy - ABSS Nexus Technologies",
    "url": "https://abssnexus.in/cookie-policy"
  },
  mainContent: `      <section class="site-hero site-hero--compact page-hero section" id="hero">
        <div class="site-hero__container container">
          <nav class="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">Cookie Policy</span>
          </nav>
          <div class="site-hero__eyebrow section-badge-apple hero-pill-badge">
            <span class="site-hero__pulse-dot live-pulse-dot" aria-hidden="true"></span>
            <span>Storage &amp; Cookies</span>
          </div>
          <h1 class="site-hero__title hero-headline-gradient">Cookie Policy: Transparent Information on Browser Storage &amp; Cookies</h1>
          <p class="site-hero__description">
            Learn about how ABSS Nexus Technologies uses cookies, HTTP headers, and browser storage to deliver a fast, secure website experience.
          </p>
        </div>
      </section>

      <section class="section" style="background: var(--color-white); border-bottom: 1px solid var(--color-border);">
        <div class="legal-container">
          <div class="legal-meta-banner">
            <div>
              <span>Effective Date: <strong>October 19, 2026</strong></span>
              <span style="margin: 0 10px;">&bull;</span>
              <span>Version: <strong>2.0</strong></span>
            </div>
            <span class="legal-badge-draft">Review-Ready Draft</span>
          </div>

          <div class="article-callout" style="margin-top: 0; margin-bottom: 32px;">
            <h4>Notice: Review-Ready Legal Draft</h4>
            <p>
              This cookie policy details the exact technical cookies and storage mechanisms employed on this website. It is subject to review by qualified legal counsel.
            </p>
          </div>

          <div class="legal-section-block">
            <h2>1. What Are Cookies &amp; Browser Storage?</h2>
            <p>
              Cookies are small text files placed on your device by websites you visit. In addition to cookies, modern web applications utilize HTML5 LocalStorage and SessionStorage to retain state within your browser across page reloads without transferring data to the server on every HTTP request.
            </p>
          </div>

          <div class="legal-section-block">
            <h2>2. What We Use</h2>
            <p>
              ABSS Nexus Technologies utilizes minimal browser storage strictly necessary for security and core functionality:
            </p>
            <ul>
              <li><strong>Essential Edge Security Cookies:</strong> Cloudflare edge security cookies (such as bot-management tokens and Turnstile anti-spam verification) used to prevent automated spam and DDoS abuse.</li>
              <li><strong>Functional Local Storage:</strong> Client-side LocalStorage keys (e.g. <code>abss-contact-lead-queue</code> and <code>abss-admin-dashboard</code>) used solely for offline lead queue resilience and administrative login state.</li>
            </ul>
          </div>

          <div class="legal-section-block">
            <h2>3. What We Do NOT Use</h2>
            <p>We believe in user privacy and technical cleanliness:</p>
            <ul>
              <li>We do NOT use third-party advertising cookies or cross-site tracking pixels.</li>
              <li>We do NOT sell or share browsing behavior with data brokers or marketing aggregators.</li>
              <li>We do NOT embed intrusive third-party social media tracking widgets.</li>
            </ul>
          </div>

          <div class="legal-section-block">
            <h2>4. Managing Cookies in Your Browser</h2>
            <p>
              You can configure your browser to block or alert you about cookies. Most browsers allow you to delete cookies and local storage through their settings (e.g. Chrome Settings &gt; Privacy and Security &gt; Cookies and Other Site Data). Note that disabling essential security cookies may affect form validation behavior.
            </p>
          </div>
        </div>
      </section>`
});

// -----------------------------------------------------------------------------
// 11. 404 PAGE
// -----------------------------------------------------------------------------
generateHtmlPage({
  filename: "404.html",
  title: "404 — Page Not Found | ABSS Nexus Technologies",
  metaDescription: "The requested page could not be found on ABSS Nexus Technologies. Browse our services, solutions, portfolio, or contact our engineering team.",
  canonicalUrl: "https://abssnexus.in/404",
  activeRoute: "/404",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "404 Not Found - ABSS Nexus Technologies",
    "url": "https://abssnexus.in/404"
  },
  mainContent: `      <section class="page-hero section" style="text-align: center;">
        <div class="container" style="max-width: 760px;">
          <div class="hero-pill-badge">
            <span class="live-pulse-dot" aria-hidden="true"></span>
            HTTP 404 &bull; Resource Not Found
          </div>
          <p class="eyebrow">Error 404</p>
          <h1 class="hero-headline-gradient">404: The Requested Page Could Not Be Found</h1>
          <p>
            The link you followed may be broken, updated, or the page may have moved to a clean URL. Use the links below to navigate our verified services and resources.
          </p>
          <div class="hero-actions" style="justify-content: center;">
            <a class="btn primary" href="/">Return to Homepage</a>
            <a class="btn secondary" href="/contact">Contact Support</a>
          </div>

          <div class="error-nav-grid">
            <a class="error-nav-card" href="/services">
              <h4>Services Catalog</h4>
              <p>Explore 15 web, software &amp; cloud engineering services.</p>
            </a>
            <a class="error-nav-card" href="/solutions">
              <h4>Solutions</h4>
              <p>Review business automation &amp; modernization solutions.</p>
            </a>
            <a class="error-nav-card" href="/industries">
              <h4>Industries</h4>
              <p>Inspect our 6 target industry vertical capabilities.</p>
            </a>
            <a class="error-nav-card" href="/projects">
              <h4>Portfolio</h4>
              <p>Browse verified production systems and concept showcases.</p>
            </a>
            <a class="error-nav-card" href="/blog">
              <h4>Engineering Blog</h4>
              <p>Read Core Web Vitals and edge architecture guides.</p>
            </a>
            <a class="error-nav-card" href="/faq">
              <h4>FAQ &amp; Help</h4>
              <p>Find answers regarding pricing, scope, and delivery.</p>
            </a>
          </div>
        </div>
      </section>`
});

console.log("\nAll Phase 4 pages generated successfully!");
