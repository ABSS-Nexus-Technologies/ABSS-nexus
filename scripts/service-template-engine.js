const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "src", "pages");

// Shared Header Component
function renderHeader(activeRoute = "") {
  return `    <header class="site-header" role="banner">
      <div class="announcement-bar">
        <div class="announcement-bar__container container">
          <span class="announcement-bar__badge">
            <span class="live-pulse-dot" aria-hidden="true"></span>
            <span>Applications open for 2026 Technical Internship Cohort.</span>
          </span>
          <a class="announcement-bar__link" href="/internships">Apply for Internship &rarr;</a>
        </div>
      </div>
      <nav class="nav" aria-label="Main Navigation">
        <a class="brand" href="/" aria-label="ABSS Nexus Technologies home">
          <img src="/public/assets/images/favicon.png" alt="ABSS Nexus Technologies logo" width="38" height="38" />
          <span class="brand-name">ABSS Nexus Technologies</span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav-links">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
        <div class="nav-links" id="main-nav-links">
          <a href="/" class="nav-link" ${activeRoute === "/" ? 'aria-current="page"' : ""}>Home</a>

          <!-- Services Mega Menu Dropdown -->
          <div class="nav-item-dropdown">
            <button class="nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true" ${activeRoute.startsWith("/services") ? 'style="color: #0066CC; font-weight: 600;"' : ""}>
              <span>Services</span>
              <svg class="dropdown-arrow" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="mega-menu mega-menu-services" role="menu">
              <div class="mega-menu-grid">
                <div class="mega-col">
                  <div class="mega-col-title">Web Engineering</div>
                  <ul class="mega-link-list">
                    <li><a class="mega-link" href="/services/website-development"><span class="mega-link-title">Website Development</span><span class="mega-link-desc">High-speed business platforms</span></a></li>
                    <li><a class="mega-link" href="/services/ecommerce-development"><span class="mega-link-title">E-Commerce Development</span><span class="mega-link-desc">Streamlined product storefronts</span></a></li>
                    <li><a class="mega-link" href="/services/digital-marketing-seo"><span class="mega-link-title">Digital Marketing &amp; SEO</span><span class="mega-link-desc">Core Web Vitals &amp; search rank</span></a></li>
                    <li><a class="mega-link" href="/services/ui-ux-design"><span class="mega-link-title">UI/UX Design</span><span class="mega-link-desc">Design systems &amp; Figma wireframes</span></a></li>
                    <li><a class="mega-link" href="/services/website-maintenance"><span class="mega-link-title">Website Maintenance</span><span class="mega-link-desc">Proactive health &amp; support</span></a></li>
                  </ul>
                </div>
                <div class="mega-col">
                  <div class="mega-col-title">Software &amp; Cloud</div>
                  <ul class="mega-link-list">
                    <li><a class="mega-link" href="/services/software-development"><span class="mega-link-title">Software Development</span><span class="mega-link-desc">Custom business logic systems</span></a></li>
                    <li><a class="mega-link" href="/services/mobile-app-development"><span class="mega-link-title">Mobile App &amp; PWA</span><span class="mega-link-desc">Responsive cross-platform apps</span></a></li>
                    <li><a class="mega-link" href="/services/saas-development"><span class="mega-link-title">SaaS Development</span><span class="mega-link-desc">Multi-tenant subscription MVPs</span></a></li>
                    <li><a class="mega-link" href="/services/cloud-computing"><span class="mega-link-title">Cloud Computing</span><span class="mega-link-desc">Serverless &amp; edge architecture</span></a></li>
                    <li><a class="mega-link" href="/services/api-integration"><span class="mega-link-title">API Integration</span><span class="mega-link-desc">Connected web system bridges</span></a></li>
                  </ul>
                </div>
                <div class="mega-col">
                  <div class="mega-col-title">Data, QA &amp; Support</div>
                  <ul class="mega-link-list">
                    <li><a class="mega-link" href="/services/ai-machine-learning"><span class="mega-link-title">AI &amp; Machine Learning</span><span class="mega-link-desc">Predictive models &amp; automation</span></a></li>
                    <li><a class="mega-link" href="/services/data-analytics-bi"><span class="mega-link-title">Data Analytics &amp; BI</span><span class="mega-link-desc">Real-time KPI telemetry</span></a></li>
                    <li><a class="mega-link" href="/services/cybersecurity"><span class="mega-link-title">Cybersecurity</span><span class="mega-link-desc">Proactive hardening &amp; audits</span></a></li>
                    <li><a class="mega-link" href="/services/software-testing-qa"><span class="mega-link-title">Software Testing &amp; QA</span><span class="mega-link-desc">Automated regression testing</span></a></li>
                    <li><a class="mega-link" href="/services/it-consulting"><span class="mega-link-title">IT Consulting</span><span class="mega-link-desc">Pragmatic digital roadmaps</span></a></li>
                    <li><a class="mega-link" href="/services/managed-it-support"><span class="mega-link-title">Managed IT Support</span><span class="mega-link-desc">24/7 technical monitoring &amp; SLA</span></a></li>
                  </ul>
                </div>
              </div>
              <div class="mega-menu-footer-bar">
                <span>16 Comprehensive IT Disciplines Available</span>
                <div style="display: flex; gap: 16px; align-items: center;">
                  <a href="/faq">FAQ</a>
                  <a href="/careers">Careers</a>
                  <a href="/services">View Complete Service Catalog &rarr;</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Solutions Mega Menu Dropdown -->
          <div class="nav-item-dropdown">
            <button class="nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true" ${activeRoute === "/solutions" ? 'style="color: #0066CC; font-weight: 600;"' : ""}>
              <span>Solutions</span>
              <svg class="dropdown-arrow" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="mega-menu mega-menu-solutions" role="menu">
              <div class="mega-menu-grid mega-menu-grid--solutions">
                <div class="mega-col">
                  <div class="mega-col-title">Enterprise Architecture</div>
                  <ul class="mega-link-list">
                    <li>
                      <a class="mega-link" href="/solutions#automation">
                        <span class="mega-link-title">Business Process Automation</span>
                        <span class="mega-link-desc">Custom workflow engines &amp; queue automation</span>
                      </a>
                    </li>
                    <li>
                      <a class="mega-link" href="/solutions#platforms">
                        <span class="mega-link-title">Custom Software Platforms</span>
                        <span class="mega-link-desc">Tailored relational databases &amp; admin controls</span>
                      </a>
                    </li>
                    <li>
                      <a class="mega-link" href="/solutions#cloud">
                        <span class="mega-link-title">Cloud Adoption &amp; Modernization</span>
                        <span class="mega-link-desc">Serverless edge networks &amp; zero downtime</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="mega-col">
                  <div class="mega-col-title">Integration &amp; Growth</div>
                  <ul class="mega-link-list">
                    <li>
                      <a class="mega-link" href="/solutions#api">
                        <span class="mega-link-title">Connected Systems &amp; APIs</span>
                        <span class="mega-link-desc">Secure REST bridges &amp; CRM synchronization</span>
                      </a>
                    </li>
                    <li>
                      <a class="mega-link" href="/solutions#conversion">
                        <span class="mega-link-title">High-Conversion Experiences</span>
                        <span class="mega-link-desc">Sub-second performance &amp; instant inquiries</span>
                      </a>
                    </li>
                    <li>
                      <a class="mega-link" href="/solutions#strategy">
                        <span class="mega-link-title">Strategic Digital Transformation</span>
                        <span class="mega-link-desc">Architecture audits &amp; phased delivery roadmaps</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mega-menu-footer-bar">
                <span>Outcome-Driven Technical Frameworks</span>
                <a href="/solutions">Explore All Solutions &rarr;</a>
              </div>
            </div>
          </div>

          <a href="/industries" class="nav-link" ${activeRoute === "/industries" ? 'aria-current="page"' : ""}>Industries</a>
          <a href="/work" class="nav-link" ${activeRoute === "/work" || activeRoute === "/projects" ? 'aria-current="page"' : ""}>Work</a>
          <a href="/pricing" class="nav-link" ${activeRoute === "/pricing" ? 'aria-current="page"' : ""}>Pricing</a>
          <a href="/blog" class="nav-link" ${activeRoute === "/blog" || activeRoute.startsWith("/blog/") ? 'aria-current="page"' : ""}>Blog</a>
          <a href="/about" class="nav-link" ${activeRoute === "/about" ? 'aria-current="page"' : ""}>About</a>
          <a href="/contact" class="nav-link" ${activeRoute === "/contact" ? 'aria-current="page"' : ""}>Contact</a>
          <a class="nav-cta" href="/contact#project-inquiry">Start Project</a>
        </div>
      </nav>
    </header>`;
}

// Shared Footer Component
function renderFooter() {
  return `    <footer class="site-footer footer" role="contentinfo">
      <div class="site-footer__container container">
        <div class="site-footer__grid footer-grid">
          <!-- Column 1: Brand -->
          <div class="site-footer__brand footer-brand">
            <a class="site-footer__logo-link" href="/" aria-label="ABSS Nexus Technologies home">
              <img class="site-footer__logo" src="/public/assets/images/LogoGenerated.png" alt="ABSS Nexus Technologies logo" width="160" height="38" />
            </a>
            <p class="site-footer__brand-title footer-brand-title">ABSS Nexus Technologies</p>
            <p class="site-footer__brand-desc">Building high-performance digital solutions for businesses, startups, institutions, and growing brands.</p>
            <strong class="site-footer__tagline">Innovate &bull; Solve &bull; Elevate</strong>
            <div>
              <span class="site-footer__status footer-system-status">
                <span class="site-footer__status-pulse live-pulse-dot" aria-hidden="true"></span>
                <span>All Systems Operational &bull; Edge Active</span>
              </span>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="site-footer__col footer-column">
            <h3 class="site-footer__col-title">Quick Links</h3>
            <a class="site-footer__link" href="/">Home</a>
            <a class="site-footer__link" href="/about">About</a>
            <a class="site-footer__link" href="/services">Services</a>
            <a class="site-footer__link" href="/solutions">Solutions</a>
            <a class="site-footer__link" href="/industries">Industries</a>
            <a class="site-footer__link" href="/work">Work</a>
            <a class="site-footer__link" href="/careers">Careers</a>
            <a class="site-footer__link" href="/blog">Blog</a>
            <a class="site-footer__link" href="/faq">FAQ</a>
            <a class="site-footer__link" href="/pricing">Pricing</a>
            <a class="site-footer__link" href="/internships">Internships</a>
            <a class="site-footer__link" href="/contact">Contact</a>
          </div>

          <!-- Column 3: Our Services -->
          <div class="site-footer__col footer-column">
            <h3 class="site-footer__col-title">Our Services</h3>
            <a class="site-footer__link" href="/services/website-development">Website Development</a>
            <a class="site-footer__link" href="/services/software-development">Software Development</a>
            <a class="site-footer__link" href="/services/mobile-app-development">Mobile App Development</a>
            <a class="site-footer__link" href="/services/ui-ux-design">UI/UX Design</a>
            <a class="site-footer__link" href="/services/ai-machine-learning">AI &amp; Machine Learning</a>
            <a class="site-footer__link" href="/services/cloud-computing">Cloud Computing</a>
            <a class="site-footer__link" href="/services/cybersecurity">Cybersecurity</a>
            <a class="site-footer__link" href="/services/data-analytics-bi">Data Analytics</a>
            <a class="site-footer__link" href="/services/ecommerce-development">E-Commerce Development</a>
            <a class="site-footer__link" href="/services/saas-development">SaaS Development</a>
            <a class="site-footer__link" href="/services">All 15 Services &rarr;</a>
          </div>

          <!-- Column 4: Contact Info -->
          <div class="site-footer__col site-footer__contact footer-column footer-contact">
            <h3 class="site-footer__col-title">Contact Info</h3>
            <a class="site-footer__link" href="tel:+918757928673">Phone: +91 87579 28673</a>
            <a class="site-footer__link" href="mailto:abssnexus@gmail.com">Email: abssnexus@gmail.com</a>
            <span class="site-footer__contact-item">Location: Jaipur, Rajasthan, India</span>
            <span class="site-footer__contact-item">Shubham Kumar &mdash; Founder</span>
            <span class="site-footer__contact-item">Consultation &amp; Advisory: Open 2026</span>
          </div>
        </div>

        <!-- Divider & Lower Footer Bar (Inside Container) -->
        <div class="site-footer__bottom footer-lower">
          <div class="site-footer__socials footer-socials" aria-label="Social media profiles">
            <a class="site-footer__social-link" href="https://www.instagram.com/abssnexus/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            <a class="site-footer__social-link" href="https://www.facebook.com/profile.php?id=61592563923350" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            <a class="site-footer__social-link" href="https://x.com/abssnexus" target="_blank" rel="noopener noreferrer" aria-label="X">X / Twitter</a>
          </div>
          <nav class="site-footer__legal footer-legal" aria-label="Legal documents">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
            <a href="/cookie-policy">Cookie Policy</a>
            <a href="/disclaimer">Disclaimer</a>
            <a href="/refund-policy">Refund Policy</a>
            <a href="/support-policy">Support Policy</a>
            <a href="/sitemap">Sitemap</a>
          </nav>
        </div>

        <!-- Copyright Row (Inside Container) -->
        <div class="site-footer__copy footer-copy">
          <p>&copy; <span class="site-footer__year">2026</span> ABSS Nexus Technologies. All Rights Reserved.</p>
        </div>
      </div>
    </footer>

    <a class="floating-whatsapp" href="https://wa.me/918757928673" target="_blank" rel="noopener noreferrer" aria-label="Chat with ABSS Nexus Technologies on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.4 28.8l6.6-1.7A12.7 12.7 0 1 0 16 3.2Zm0 22.9c-2 0-3.9-.6-5.6-1.6l-.4-.2-3.9 1 1-3.8-.3-.4a10.3 10.3 0 1 1 9.2 5Z" />
        <path d="M21.7 18.6c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.1.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z" />
      </svg>
      <span>WhatsApp</span>
    </a>

    <script src="/src/scripts/seo-schema.js"></script>
    <script src="/src/scripts/components/footer.js" defer></script>
    <script src="/src/scripts/script.js"></script>`;
}

// Service Page Template Generator
function generateServicePage(data) {
  const canonical = `https://abssnexus.in/services/${data.slug}`;
  const inquiryUrl = `/contact?service=${encodeURIComponent(data.serviceParamName || data.name)}#project-inquiry`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${data.metaDescription}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${data.title}" />
    <meta property="og:description" content="${data.metaDescription}" />
    <meta property="og:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <meta property="og:url" content="${canonical}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${data.title}" />
    <meta name="twitter:description" content="${data.metaDescription}" />
    <meta name="twitter:image" content="https://abssnexus.in/public/assets/images/LogoGenerated.png" />
    <link rel="canonical" href="${canonical}" />
    <title>${data.title}</title>
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
        "@type": "Service",
        "name": "${data.name}",
        "serviceType": "${data.name}",
        "url": "${canonical}",
        "description": "${data.metaDescription}",
        "provider": {
          "@type": "Organization",
          "name": "ABSS Nexus Technologies",
          "url": "https://abssnexus.in/",
          "logo": "https://abssnexus.in/public/assets/images/LogoGenerated.png"
        },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        }
      }
    </script>
  </head>
  <body class="agency-dark-theme">
${renderHeader(`/services/${data.slug}`)}

    <main>
      <!-- 1. Hero Section -->
      <section class="site-hero site-hero--page page-hero section" id="hero">
        <div class="site-hero__container container">
          <nav class="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="separator" aria-hidden="true">/</span>
            <a href="/services">Services</a>
            <span class="separator" aria-hidden="true">/</span>
            <span class="current">${data.name}</span>
          </nav>
          
          <div class="site-hero__grid service-hero-grid">
            <div class="site-hero__content service-hero-content">
              <span class="site-hero__eyebrow section-badge-apple">${data.badge}</span>
              <h1 class="site-hero__title">${data.headline}</h1>
              <p class="site-hero__description">${data.description}</p>
              
              <div class="site-hero__actions hero-actions">
                <a class="site-hero__btn site-hero__btn--primary btn btn-apple-primary" href="${inquiryUrl}">
                  <span>Discuss Your Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                <a class="site-hero__btn site-hero__btn--secondary btn btn-apple-secondary" href="/services">
                  <span>Explore Our Services</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </div>

              <div class="site-hero__tech-stack tech-pills-row" aria-label="Key Technologies">
                ${data.techStack.map((tech) => `<span class="site-hero__tech-tag tech-pill">${tech}</span>`).join("\n                ")}
              </div>
            </div>

            <div class="site-hero__visual service-visual-box" aria-label="${data.name} architectural preview">
              ${data.visualHtml}
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Customer Problems Addressed -->
      <section class="section">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Client Challenges</p>
            <h2>Challenges We Solve for Growing Businesses</h2>
            <p>We eliminate technical bottlenecks, poor performance, and complex maintenance so you can focus on scale.</p>
          </div>
          
          <div class="problem-solution-grid">
            ${data.problems.map((prob) => `
            <article class="problem-card">
              <div class="problem-icon-pill" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3>${prob.title}</h3>
              <p>${prob.desc}</p>
            </article>`).join("")}
          </div>
        </div>
      </section>

      <!-- 3. Capabilities and Deliverables -->
      <section class="section" style="background: var(--color-light-gray); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Core Capabilities</p>
            <h2>Concrete Deliverables &amp; Engineering Scope</h2>
            <p>Every milestone produces clean, verifiable code, thorough documentation, and measurable performance.</p>
          </div>

          <div class="capabilities-matrix-grid">
            ${data.capabilities.map((cap) => `
            <div class="capability-tile">
              <h4>${cap.title}</h4>
              <p>${cap.desc}</p>
            </div>`).join("")}
          </div>
        </div>
      </section>

      <!-- 4. Step-by-Step Delivery Process -->
      <section class="section">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Systematic Execution</p>
            <h2>Structured Delivery Process from Concept to Launch</h2>
            <p>Transparent milestones and direct communication ensure your project stays on schedule and on scope.</p>
          </div>

          <div class="delivery-process-apple">
            <div class="process-step-apple">
              <span class="step-num-apple">01</span>
              <h3>Discovery &amp; Scope</h3>
              <p>We discuss your operational objectives, user requirements, technical constraints, and milestone timelines.</p>
            </div>
            <div class="process-step-apple">
              <span class="step-num-apple">02</span>
              <h3>Architecture Blueprint</h3>
              <p>We plan database models, API contracts, interface wireframes, and performance budgets before writing code.</p>
            </div>
            <div class="process-step-apple">
              <span class="step-num-apple">03</span>
              <h3>Interactive Prototyping</h3>
              <p>We craft high-fidelity interface layouts and component states in Figma with accessible contrast and clean typography.</p>
            </div>
            <div class="process-step-apple">
              <span class="step-num-apple">04</span>
              <h3>Agile Engineering</h3>
              <p>Clean, modular code development with responsive styling, security checks, and high-performance edge bindings.</p>
            </div>
            <div class="process-step-apple">
              <span class="step-num-apple">05</span>
              <h3>Quality Assurance</h3>
              <p>Rigorous automated link validation, form health audits, mobile device testing, and Core Web Vitals profiling.</p>
            </div>
            <div class="process-step-apple">
              <span class="step-num-apple">06</span>
              <h3>Production Release</h3>
              <p>Zero-downtime deployment, DNS configuration, search engine indexing verification, and post-delivery SLA support.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Relevant Project Examples -->
      <section class="section" style="background: var(--color-light-gray); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Demonstrated Experience</p>
            <h2>Practical Project Implementations</h2>
            <p>Review real implementations and concept showcases built with high performance and clean architecture.</p>
          </div>

          <div class="projects-modern-grid">
            <article class="project-modern-card">
              <div class="project-preview-wrap">
                <div class="browser-mockup-bar" aria-hidden="true">
                  <div class="browser-mockup-dots"><span></span><span></span><span></span></div>
                  <span class="browser-mockup-url">shubham-portfolio-abss.netlify.app</span>
                </div>
                <img src="/public/assets/images/personal-portfolio.png" alt="Personal Developer Portfolio preview" loading="lazy" />
                <span class="project-badge-tag">Portfolio &bull; Live</span>
              </div>
              <div class="project-card-content">
                <h3>Personal Developer Portfolio</h3>
                <p>High-speed responsive portfolio built with modern typography, interactive project showcases, and accessible layout design.</p>
                <div class="project-action-row">
                  <a class="project-live-btn" href="https://shubham-portfolio-abss.netlify.app/" target="_blank" rel="noopener noreferrer">Live Demo &rarr;</a>
                  <span class="project-status-label">Production</span>
                </div>
              </div>
            </article>

            <article class="project-modern-card">
              <div class="project-preview-wrap">
                <div class="browser-mockup-bar" aria-hidden="true">
                  <div class="browser-mockup-dots"><span></span><span></span><span></span></div>
                  <span class="browser-mockup-url">abssnexus.in/analytics/dashboard</span>
                </div>
                <img src="/public/assets/images/project-dashboard-ui.png" alt="Cloud Analytics & Admin Dashboard preview" loading="lazy" />
                <span class="project-badge-tag">Web App &bull; Demonstration</span>
              </div>
              <div class="project-card-content">
                <h3>Cloud Analytics &amp; Telemetry Hub</h3>
                <p>Enterprise administration panel featuring metrics telemetry, user management, interactive chart widgets, and real-time status.</p>
                <div class="project-action-row">
                  <a class="project-live-btn" href="/projects">View Details &rarr;</a>
                  <span class="project-status-label">Demo Showcase</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- 6. Frequently Asked Questions -->
      <section class="section faq">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Common Inquiries</p>
            <h2>Frequently Asked Questions About ${data.name}</h2>
            <p>Direct answers regarding timelines, deliverables, technology selection, and maintenance.</p>
          </div>

          <div class="agency-faq-wrapper" id="faq">
            ${data.faqs.map((faq, i) => `
            <div class="agency-faq-card">
              <button class="faq-agency-btn" type="button" aria-expanded="false" aria-controls="faq-ans-${i + 1}" data-faq-toggle>
                <span>${faq.q}</span>
                <svg class="faq-chevron-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="faq-agency-answer" id="faq-ans-${i + 1}" hidden>
                ${faq.a}
              </div>
            </div>`).join("")}
          </div>
        </div>
      </section>

      <!-- 7. Final Project Enquiry CTA -->
      <section class="section cta-band" id="project-inquiry">
        <div class="container">
          <div class="radiant-cta-box">
            <p class="eyebrow">Start Your Project</p>
            <h2>Ready to Elevate Your Digital Systems?</h2>
            <p>Schedule a focused technical consultation to review your requirements, architecture, and timeline with our engineering team.</p>
            
            <div class="radiant-cta-actions">
              <a class="btn btn-glow-cyan" href="${inquiryUrl}">
                <span>Discuss Your Project Now</span>
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

      <!-- 8. Related Services -->
      <section class="section">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Complementary Solutions</p>
            <h2>Related Services &amp; Extensions</h2>
            <p>Explore other specialized engineering disciplines that work hand-in-hand with ${data.name}.</p>
          </div>

          <div class="related-services-grid">
            ${data.relatedServices.map((rel) => `
            <a class="related-service-card" href="${rel.url}">
              <h4>${rel.title}</h4>
              <p>${rel.desc}</p>
              <span class="explore-arrow">Explore Discipline &rarr;</span>
            </a>`).join("")}
          </div>
        </div>
      </section>
    </main>

${renderFooter()}
  </body>
</html>`;
}

module.exports = {
  renderHeader,
  renderFooter,
  generateServicePage,
};
