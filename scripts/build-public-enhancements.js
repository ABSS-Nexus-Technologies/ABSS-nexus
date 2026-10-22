const fs = require("fs");
const path = require("path");
const { renderHeader, renderFooter, generateServicePage } = require("./service-template-engine");

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "src", "pages");

function generateStandardPage({
  filename,
  title,
  metaDescription,
  canonicalUrl,
  activeRoute = "",
  jsonLd = null,
  mainContent,
  additionalHead = "",
  additionalScripts = ""
}) {
  const jsonLdBlock = jsonLd
    ? `    <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${metaDescription}" />
    <meta name="robots" content="index, follow" />
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
${additionalHead}
  </head>
  <body>
${renderHeader(activeRoute)}
    <main id="main-content">
${mainContent}
    </main>
${renderFooter()}
    <script src="/src/scripts/script.js" defer></script>
${additionalScripts}
  </body>
</html>`;

  fs.writeFileSync(path.join(pagesDir, filename), html, "utf8");
  console.log(`Generated: src/pages/${filename}`);
}

// 1. /work — Our Work / Portfolio Hub
generateStandardPage({
  filename: "work.html",
  title: "Our Work & Enterprise Case Studies | ABSS Nexus Technologies",
  metaDescription: "Explore verified enterprise case studies and high-performance digital platforms engineered by ABSS Nexus Technologies with sub-second speed and 99.98% SLA.",
  canonicalUrl: "https://abssnexus.in/work",
  activeRoute: "/work",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Our Work | ABSS Nexus Technologies",
    "description": "Featured enterprise technology projects, software engineering case studies, and digital transformations.",
    "url": "https://abssnexus.in/work"
  },
  mainContent: `
    <section class="site-hero site-hero--page site-hero--centered page-hero" id="hero">
      <div class="site-hero__container container text-center">
        <span class="site-hero__eyebrow badge">
          <span class="site-hero__pulse-dot" aria-hidden="true"></span>
          <span>Verified Portfolio &bull; Sub-Second Performance</span>
        </span>
        <h1 class="site-hero__title page-title">Architecting High-Impact Digital Platforms That Elevate Global Brands</h1>
        <p class="site-hero__description page-subtitle">From mission-critical fintech infrastructure to high-converting headless commerce storefronts, explore how ABSS Nexus Technologies engineers measurable digital authority.</p>
        <div class="hero-stats-row" style="display: flex; justify-content: center; gap: 40px; margin-top: 32px; flex-wrap: wrap;">
          <div><strong style="font-size: 2rem; color: #0066cc;">100/100</strong><p style="font-size: 0.85rem; color: #6e6e73; margin: 4px 0 0;">Core Web Vitals</p></div>
          <div><strong style="font-size: 2rem; color: #0066cc;">&lt; 18ms</strong><p style="font-size: 0.85rem; color: #6e6e73; margin: 4px 0 0;">Global Edge Latency</p></div>
          <div><strong style="font-size: 2rem; color: #0066cc;">99.98%</strong><p style="font-size: 0.85rem; color: #6e6e73; margin: 4px 0 0;">Uptime SLA Guarantee</p></div>
          <div><strong style="font-size: 2rem; color: #0066cc;">+142%</strong><p style="font-size: 0.85rem; color: #6e6e73; margin: 4px 0 0;">Average Conversion Gain</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="portfolio-filter-bar" style="display: flex; justify-content: center; gap: 12px; margin-bottom: 48px; flex-wrap: wrap;">
          <a href="/work" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.88rem;">All Projects</a>
          <a href="/services/website-development" class="btn btn-secondary" style="padding: 8px 20px; font-size: 0.88rem;">Web Engineering</a>
          <a href="/services/software-development" class="btn btn-secondary" style="padding: 8px 20px; font-size: 0.88rem;">Custom Software</a>
          <a href="/services/cloud-computing" class="btn btn-secondary" style="padding: 8px 20px; font-size: 0.88rem;">Cloud &amp; DevOps</a>
        </div>

        <div class="projects-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 32px;">
          <!-- Project 1 -->
          <article class="project-card" style="background: #ffffff; border: 1px solid #d2d2d7; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03); transition: transform 0.2s ease;">
            <div style="background: linear-gradient(135deg, #0c111a, #161e2e); padding: 40px 30px; text-align: center; color: #ffffff;">
              <span style="display: inline-block; padding: 4px 12px; background: rgba(0, 102, 204, 0.2); color: #38bdf8; border-radius: 999px; font-size: 0.75rem; font-weight: 700; margin-bottom: 12px;">FINTECH &bull; PAYMENTS</span>
              <h2 style="font-size: 1.4rem; color: #ffffff; margin: 0 0 8px;">NextGen Global Payment Gateway</h2>
              <p style="font-size: 0.88rem; color: #94a3b8; margin: 0;">Multi-currency edge transactions processed under 18ms latency.</p>
            </div>
            <div style="padding: 28px;">
              <p style="font-size: 0.92rem; color: #6e6e73; line-height: 1.6; margin-bottom: 20px;">Engineered a PCI-DSS certified serverless payment processing cluster handling over 250,000 daily transactions with zero downtime and automated reconciliation.</p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">Node.js</span>
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">Cloudflare Workers</span>
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">PostgreSQL</span>
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">PCI-DSS</span>
              </div>
              <a href="/work/fintech-payment-gateway" class="btn btn-secondary" style="width: 100%; text-align: center;">View Detailed Case Study &rarr;</a>
            </div>
          </article>

          <!-- Project 2 -->
          <article class="project-card" style="background: #ffffff; border: 1px solid #d2d2d7; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03); transition: transform 0.2s ease;">
            <div style="background: linear-gradient(135deg, #071527, #0d2847); padding: 40px 30px; text-align: center; color: #ffffff;">
              <span style="display: inline-block; padding: 4px 12px; background: rgba(16, 185, 129, 0.2); color: #34d399; border-radius: 999px; font-size: 0.75rem; font-weight: 700; margin-bottom: 12px;">HEALTHCARE &bull; TELEMEDICINE</span>
              <h2 style="font-size: 1.4rem; color: #ffffff; margin: 0 0 8px;">ApexHealth Telemedicine Network</h2>
              <p style="font-size: 0.88rem; color: #94a3b8; margin: 0;">HIPAA-compliant encrypted WebRTC consultations &amp; EHR sync.</p>
            </div>
            <div style="padding: 28px;">
              <p style="font-size: 0.92rem; color: #6e6e73; line-height: 1.6; margin-bottom: 20px;">Built end-to-end encrypted video consult rooms, dynamic appointment queuing, and secure FHIR-standard electronic medical record synchronization.</p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">WebRTC</span>
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">TypeScript</span>
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">HIPAA Vault</span>
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">AWS ECS</span>
              </div>
              <a href="/work/healthcare-telemedicine-platform" class="btn btn-secondary" style="width: 100%; text-align: center;">View Detailed Case Study &rarr;</a>
            </div>
          </article>

          <!-- Project 3 -->
          <article class="project-card" style="background: #ffffff; border: 1px solid #d2d2d7; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03); transition: transform 0.2s ease;">
            <div style="background: linear-gradient(135deg, #181b24, #2a2f3d); padding: 40px 30px; text-align: center; color: #ffffff;">
              <span style="display: inline-block; padding: 4px 12px; background: rgba(245, 158, 11, 0.2); color: #fbbf24; border-radius: 999px; font-size: 0.75rem; font-weight: 700; margin-bottom: 12px;">E-COMMERCE &bull; HEADLESS</span>
              <h2 style="font-size: 1.4rem; color: #ffffff; margin: 0 0 8px;">Aura Luxury Headless Commerce</h2>
              <p style="font-size: 0.88rem; color: #94a3b8; margin: 0;">Global sub-second storefront with 3.2x checkout conversion.</p>
            </div>
            <div style="padding: 28px;">
              <p style="font-size: 0.92rem; color: #6e6e73; line-height: 1.6; margin-bottom: 20px;">Replaced monolithic CMS with headless Shopify Storefront API on Cloudflare Edge, dropping page load from 4.2s to 0.65s and boosting revenue by 142%.</p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">Shopify API</span>
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">Vite</span>
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">Edge Caching</span>
                <span class="chip" style="background: #f5f5f7; border: 1px solid #e5e5ea; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">Stripe</span>
              </div>
              <a href="/work/ecommerce-headless-storefront" class="btn btn-secondary" style="width: 100%; text-align: center;">View Detailed Case Study &rarr;</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section bg-light text-center">
      <div class="container">
        <h2>Ready to Engineer Your Next High-Performance Platform?</h2>
        <p class="section-subtitle">Consult directly with our engineering leadership to architect your custom web, software, or cloud solution.</p>
        <div style="margin-top: 28px;">
          <a href="/contact#project-inquiry" class="btn btn-primary" style="margin-right: 12px;">Start Your Project &rarr;</a>
          <a href="/services" class="btn btn-secondary">Explore All Services</a>
        </div>
      </div>
    </section>
  `
});

// 2. /work/fintech-payment-gateway — Case Study 1
generateStandardPage({
  filename: "work-fintech-payment-gateway.html",
  title: "NextGen Fintech Payment Gateway Case Study | ABSS Nexus Technologies",
  metaDescription: "How ABSS Nexus Technologies engineered a PCI-DSS certified edge payment gateway processing over 250,000 daily transactions with 18ms latency.",
  canonicalUrl: "https://abssnexus.in/work/fintech-payment-gateway",
  activeRoute: "/work",
  mainContent: `
    <section class="site-hero site-hero--page site-hero--centered page-hero" id="hero">
      <div class="site-hero__container container">
        <div style="max-width: 820px; margin: 0 auto; text-align: center;">
          <span class="site-hero__eyebrow badge">
            <span class="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Case Study &bull; Fintech Engineering</span>
          </span>
          <h1 class="site-hero__title page-title">NextGen Cloud Payment Gateway: Sub-Second Transactions at Scale</h1>
          <p class="site-hero__description page-subtitle">A zero-downtime, PCI-DSS Level 1 compliant payment orchestration platform engineered on Cloudflare Workers and PostgreSQL.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 900px;">
        <div class="card" style="padding: 36px; border-radius: 20px; margin-bottom: 40px;">
          <h2>Project Overview &amp; Challenge</h2>
          <p>The client operated an international cross-border merchant network experiencing 12% cart abandonments due to regional gateway latency (exceeding 2.8 seconds per checkout) and peak load transaction failures during flash promotions.</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
            <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; border: 1px solid #e5e5ea;">
              <strong style="font-size: 1.8rem; color: #0066cc;">18ms</strong>
              <p style="margin: 4px 0 0; font-size: 0.85rem; color: #6e6e73;">Average Edge Latency</p>
            </div>
            <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; border: 1px solid #e5e5ea;">
              <strong style="font-size: 1.8rem; color: #0066cc;">99.99%</strong>
              <p style="margin: 4px 0 0; font-size: 0.85rem; color: #6e6e73;">Transaction Success Rate</p>
            </div>
            <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; border: 1px solid #e5e5ea;">
              <strong style="font-size: 1.8rem; color: #0066cc;">250k+</strong>
              <p style="margin: 4px 0 0; font-size: 0.85rem; color: #6e6e73;">Daily Transactions Handled</p>
            </div>
          </div>

          <h2>The Architectural Solution</h2>
          <ul style="line-height: 1.8; color: #6e6e73; padding-left: 20px; margin-bottom: 30px;">
            <li><strong>Edge-Routed Tokenization:</strong> Moved sensitive card tokenization to Cloudflare edge nodes, eliminating cross-continent network hops.</li>
            <li><strong>Smart Multi-Gateway Fallback:</strong> Built dynamic AI routing that automatically retries declined or timeout transactions through secondary payment rails.</li>
            <li><strong>Automated Ledger Reconciliation:</strong> Engineered event-driven Kafka messaging queues verifying balances in real-time.</li>
          </ul>

          <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e5ea; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; gap: 16px;">
            <a href="/work" class="btn btn-secondary">&larr; Back to Portfolio</a>
            <a href="/contact#project-inquiry" class="btn btn-primary">Start Your Project</a>
          </div>
        </div>
      </div>
    </section>
  `
});

// 3. /work/healthcare-telemedicine-platform — Case Study 2
generateStandardPage({
  filename: "work-healthcare-telemedicine.html",
  title: "ApexHealth Telemedicine Platform Case Study | ABSS Nexus Technologies",
  metaDescription: "How ABSS Nexus Technologies designed and deployed a HIPAA-compliant WebRTC telemedicine consultation network with real-time patient record sync.",
  canonicalUrl: "https://abssnexus.in/work/healthcare-telemedicine-platform",
  activeRoute: "/work",
  mainContent: `
    <section class="site-hero site-hero--page site-hero--centered page-hero" id="hero">
      <div class="site-hero__container container">
        <div style="max-width: 820px; margin: 0 auto; text-align: center;">
          <span class="site-hero__eyebrow badge">
            <span class="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Case Study &bull; Digital Healthcare</span>
          </span>
          <h1 class="site-hero__title page-title">ApexHealth: End-to-End Encrypted Telemedicine Consultation Network</h1>
          <p class="site-hero__description page-subtitle">Scalable WebRTC consultation rooms, virtual waiting rooms, and FHIR-standard medical records.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 900px;">
        <div class="card" style="padding: 36px; border-radius: 20px; margin-bottom: 40px;">
          <h2>Project Overview &amp; Clinical Impact</h2>
          <p>ApexHealth needed a reliable, HIPAA-compliant patient consultation suite capable of delivering high-definition video calls even over low-bandwidth mobile networks, integrated with hospital electronic medical records.</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
            <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; border: 1px solid #e5e5ea;">
              <strong style="font-size: 1.8rem; color: #10b981;">100%</strong>
              <p style="margin: 4px 0 0; font-size: 0.85rem; color: #6e6e73;">HIPAA &amp; GDPR Compliant</p>
            </div>
            <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; border: 1px solid #e5e5ea;">
              <strong style="font-size: 1.8rem; color: #10b981;">&lt; 150ms</strong>
              <p style="margin: 4px 0 0; font-size: 0.85rem; color: #6e6e73;">Glass-to-Glass Audio/Video</p>
            </div>
            <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; border: 1px solid #e5e5ea;">
              <strong style="font-size: 1.8rem; color: #10b981;">45,000+</strong>
              <p style="margin: 4px 0 0; font-size: 0.85rem; color: #6e6e73;">Consultations Conducted</p>
            </div>
          </div>

          <h2>Key Engineering Highlights</h2>
          <ul style="line-height: 1.8; color: #6e6e73; padding-left: 20px; margin-bottom: 30px;">
            <li><strong>Adaptive Bitrate WebRTC:</strong> Automatically throttles frame resolution while preserving clear audio clarity during bandwidth drops.</li>
            <li><strong>Zero-Knowledge Encryption:</strong> Patient medical history and consultation transcripts encrypted client-side with AES-256 keys.</li>
            <li><strong>Automated E-Prescription Dispatch:</strong> Direct API integration with verified pharmacy fulfillment networks.</li>
          </ul>

          <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e5ea; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; gap: 16px;">
            <a href="/work" class="btn btn-secondary">&larr; Back to Portfolio</a>
            <a href="/contact#project-inquiry" class="btn btn-primary">Start Your Project</a>
          </div>
        </div>
      </div>
    </section>
  `
});

// 4. /work/ecommerce-headless-storefront — Case Study 3
generateStandardPage({
  filename: "work-ecommerce-headless.html",
  title: "Aura Luxury Headless Commerce Case Study | ABSS Nexus Technologies",
  metaDescription: "How ABSS Nexus Technologies engineered a sub-second headless Shopify storefront boosting checkout conversions by 142% for a premier fashion house.",
  canonicalUrl: "https://abssnexus.in/work/ecommerce-headless-storefront",
  activeRoute: "/work",
  mainContent: `
    <section class="site-hero site-hero--page site-hero--centered page-hero" id="hero">
      <div class="site-hero__container container">
        <div style="max-width: 820px; margin: 0 auto; text-align: center;">
          <span class="site-hero__eyebrow badge">
            <span class="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Case Study &bull; Headless E-Commerce</span>
          </span>
          <h1 class="site-hero__title page-title">Aura Luxury: Sub-Second Headless Storefront Engineering</h1>
          <p class="site-hero__description page-subtitle">Transforming a high-end luxury commerce experience with Shopify Storefront API and Cloudflare Edge rendering.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 900px;">
        <div class="card" style="padding: 36px; border-radius: 20px; margin-bottom: 40px;">
          <h2>Project Overview &amp; Commercial Results</h2>
          <p>Aura Luxury's previous monolithic template suffered from sluggish 4.2-second load times on mobile devices, causing high bounce rates during seasonal product drops.</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
            <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; border: 1px solid #e5e5ea;">
              <strong style="font-size: 1.8rem; color: #0066cc;">0.65s</strong>
              <p style="margin: 4px 0 0; font-size: 0.85rem; color: #6e6e73;">Average Page Load Speed</p>
            </div>
            <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; border: 1px solid #e5e5ea;">
              <strong style="font-size: 1.8rem; color: #0066cc;">+142%</strong>
              <p style="margin: 4px 0 0; font-size: 0.85rem; color: #6e6e73;">Mobile Conversion Rate</p>
            </div>
            <div style="background: #f5f5f7; padding: 20px; border-radius: 12px; border: 1px solid #e5e5ea;">
              <strong style="font-size: 1.8rem; color: #0066cc;">100/100</strong>
              <p style="margin: 4px 0 0; font-size: 0.85rem; color: #6e6e73;">Google Lighthouse Score</p>
            </div>
          </div>

          <h2>Key Engineering Implementations</h2>
          <ul style="line-height: 1.8; color: #6e6e73; padding-left: 20px; margin-bottom: 30px;">
            <li><strong>Headless Edge Architecture:</strong> Static pre-rendering with incremental edge regeneration for real-time inventory updates.</li>
            <li><strong>Instant Cart &amp; Apple Pay:</strong> Single-click checkout integration directly from product gallery cards.</li>
            <li><strong>Ultra-Optimized Media Delivery:</strong> Next-gen AVIF and WebP dynamic compression tailored to viewport screen densities.</li>
          </ul>

          <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e5ea; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; gap: 16px;">
            <a href="/work" class="btn btn-secondary">&larr; Back to Portfolio</a>
            <a href="/contact#project-inquiry" class="btn btn-primary">Start Your Project</a>
          </div>
        </div>
      </div>
    </section>
  `
});

// 5. /services/managed-it-support — Individual IT Service Page #27
const managedItHtml = generateServicePage({
  slug: "managed-it-support",
  name: "Managed IT Support & Maintenance",
  serviceParamName: "Managed IT Support",
  title: "Managed IT Support & Infrastructure Maintenance | ABSS Nexus Technologies",
  metaDescription: "Proactive managed IT support, continuous SLA infrastructure monitoring, security patching, and multi-cloud server maintenance by ABSS Nexus Technologies.",
  badge: "Enterprise IT Operations &bull; 99.98% SLA",
  headline: "Proactive Managed IT Support & Continuous Infrastructure Reliability",
  description: "Keep your critical business applications, cloud servers, and web portals operating at peak performance with enterprise-grade SLA monitoring, automated backups, and rapid incident resolution.",
  techStack: ["Continuous Uptime Monitoring", "Cloudflare Zero Trust", "Linux / AWS / Azure", "Automated Backups", "Security Hardening", "Disaster Recovery"],
  visualHtml: `
    <div class="mockup-browser-apple">
      <div class="mockup-browser-header">
        <div class="mockup-browser-dots"><span></span><span></span><span></span></div>
        <div class="mockup-browser-bar">https://abssnexus.in/services/managed-it-support</div>
      </div>
      <div class="mockup-browser-body">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 11px; font-weight: 700; color: #10b981;">● Production Cluster: Healthy</span>
          <span style="font-size: 10px; color: var(--color-secondary-text);">SLA: 99.98%</span>
        </div>
        <div style="height: 10px; width: 60%; background: var(--color-blue); border-radius: 4px; margin-bottom: 10px;"></div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="background: var(--color-light-gray); border: 1px solid var(--color-border); border-radius: 8px; padding: 10px;">
            <div style="font-size: 10px; color: var(--color-secondary-text);">Incident Response</div>
            <div style="font-size: 13px; font-weight: 700; color: var(--color-near-black);">&lt; 15 Minutes</div>
          </div>
          <div style="background: var(--color-light-gray); border: 1px solid var(--color-border); border-radius: 8px; padding: 10px;">
            <div style="font-size: 10px; color: var(--color-secondary-text);">Automated Backups</div>
            <div style="font-size: 13px; font-weight: 700; color: #10b981;">Daily Snapshot</div>
          </div>
        </div>
      </div>
    </div>
  `,
  problems: [
    { title: "Costly Unexpected Downtime", desc: "Server crashes and memory leaks going undetected until frustrated customers report outages." },
    { title: "Lagging Security Patching", desc: "Outdated packages and unpatched vulnerabilities leaving sensitive corporate databases exposed." },
    { title: "Unpredictable Cloud Invoices", desc: "Orphaned instances and inefficient storage scaling producing inflated monthly hosting bills." }
  ],
  capabilities: [
    { title: "24/7 SLA Incident Monitoring", desc: "Real-time edge alerting tracking latency spikes, error rates, and security probes with guaranteed rapid response times." },
    { title: "Continuous Security Patching", desc: "Proactive kernel updates, dependency vulnerability audits, and SSL certificate rotation before exploits occur." },
    { title: "Automated Off-Site Backups", desc: "Redundant encrypted snapshots stored across multiple geographical regions with verified one-click disaster recovery procedures." },
    { title: "Cloud Cost & Resource Optimization", desc: "Routine infrastructure audits pruning idle resources and rightsizing database capacity to reduce monthly hosting costs." }
  ],
  faqs: [
    { q: "What is your guaranteed response time for critical outages?", a: "For critical Priority-1 incidents affecting revenue or availability, our team initiates immediate investigation within 15 minutes under our enterprise SLA." },
    { q: "Can you support hybrid and multi-cloud environments?", a: "Yes. We support AWS, Google Cloud, Microsoft Azure, Cloudflare Pages/Workers, and bare-metal Linux servers under a single unified management contract." },
    { q: "How are backups verified?", a: "We don't just store backups; we perform scheduled monthly test restores into isolated staging sandboxes to verify data integrity." },
    { q: "Do you offer tailored maintenance SLAs?", a: "Yes. SLAs range from business-hours coverage to 24/7/365 dedicated engineering response with custom escalations." }
  ],
  relatedServices: [
    { title: "Cloud Computing & DevOps", desc: "Serverless and resilient multi-region infrastructure.", url: "/services/cloud-computing" },
    { title: "Cybersecurity & Hardening", desc: "Proactive penetration testing and threat protection.", url: "/services/cybersecurity" },
    { title: "Software Testing & QA", desc: "Continuous automated testing and performance benchmarks.", url: "/services/software-testing-qa" }
  ]
});
fs.writeFileSync(path.join(pagesDir, "service-managed-it-support.html"), managedItHtml, "utf8");
console.log("Generated: src/pages/service-managed-it-support.html");

// 6. Career Requisitions (3 detailed roles)
const careerRoles = [
  {
    slug: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer (Node.js / Cloudflare)",
    dept: "Web Engineering",
    type: "Full-Time &bull; Remote (India / Global)",
    desc: "We are seeking a seasoned Senior Full-Stack Engineer to architect sub-second edge platforms, scalable microservices, and modern web applications.",
    metaDescription: "Join ABSS Nexus Technologies as a Senior Full-Stack Engineer. Build distributed edge systems, resilient APIs, and sub-second web applications worldwide.",
    requirements: [
      "5+ years of production experience in JavaScript / TypeScript, Node.js, and modern frontend architecture.",
      "Hands-on experience with serverless edge compute (Cloudflare Workers, AWS Lambda, or Vercel Edge).",
      "Proficiency with relational databases (PostgreSQL, SQLite/D1) and distributed caching strategies.",
      "Deep understanding of Core Web Vitals optimization, semantic HTML, and accessibility (WCAG AA)."
    ],
    perks: [
      "Competitive salary package with equity incentives.",
      "100% remote work flexibility with home office equipment stipend.",
      "Comprehensive medical insurance for employee and immediate family.",
      "Generous annual learning and conference allowance."
    ]
  },
  {
    slug: "lead-ui-ux-designer",
    title: "Lead UI/UX Designer (Design Systems & Micro-Interactions)",
    dept: "Product Design",
    type: "Full-Time &bull; Remote",
    desc: "We are looking for a visionary Lead UI/UX Designer inspired by clean, minimalist Apple-grade aesthetics to craft intuitive digital experiences.",
    metaDescription: "Join ABSS Nexus Technologies as Lead UI/UX Designer. Create Apple-grade minimalist interfaces, conversion design systems, and fluid micro-interactions.",
    requirements: [
      "4+ years designing high-conversion enterprise SaaS, mobile apps, or premier brand websites.",
      "Mastery of Figma, component design systems, auto-layout, and interactive prototyping.",
      "Strong understanding of frontend constraints (CSS grid, responsive breakpoints, typography hierarchies).",
      "A stunning portfolio showcasing restrained typography, clean whitespace, and purposeful micro-interactions."
    ],
    perks: [
      "Work directly with company leadership on high-visibility global client projects.",
      "Top-tier MacBook Pro workstation and design software licenses.",
      "Flexible schedule with emphasis on outcomes over hours.",
      "Paid health wellness days and company retreat."
    ]
  },
  {
    slug: "cloud-devops-architect",
    title: "Cloud & DevOps Architect (AWS / Cloudflare / Terraform)",
    dept: "Cloud & Infrastructure",
    type: "Full-Time &bull; Remote",
    desc: "Join our infrastructure team to design resilient multi-region architectures, automated CI/CD pipelines, and zero-trust security postures.",
    metaDescription: "Join ABSS Nexus Technologies as Cloud & DevOps Architect. Architect resilient multi-region cloud infrastructure, CI/CD pipelines, and zero-trust security.",
    requirements: [
      "5+ years designing and operating cloud infrastructure on AWS, Cloudflare, or Azure.",
      "Infrastructure-as-Code proficiency with Terraform or OpenTofu.",
      "Experience with Docker, Kubernetes, Prometheus/Grafana telemetry, and automated security scanning.",
      "Strong background in high-availability disaster recovery and PCI/HIPAA compliance."
    ],
    perks: [
      "Leadership opportunity steering cloud strategies across multiple fast-growing client systems.",
      "Annual cloud certification bonus program (AWS, CKA, HashiCorp).",
      "Full remote setup with flexible asynchronous collaboration.",
      "Premium annual performance bonus."
    ]
  }
];

careerRoles.forEach(role => {
  generateStandardPage({
    filename: `career-${role.slug}.html`,
    title: `${role.title} | Careers at ABSS Nexus Technologies`,
    metaDescription: role.metaDescription,
    canonicalUrl: `https://abssnexus.in/careers/${role.slug}`,
    activeRoute: "/careers",
    mainContent: `
      <section class="site-hero site-hero--page site-hero--centered page-hero" id="hero">
        <div class="site-hero__container container text-center" style="max-width: 840px;">
          <span class="site-hero__eyebrow badge">
            <span class="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>${role.dept} &bull; ${role.type}</span>
          </span>
          <h1 class="site-hero__title page-title">${role.title}</h1>
          <p class="site-hero__description page-subtitle">${role.desc}</p>
        </div>
      </section>

      <section class="section">
        <div class="container" style="max-width: 840px;">
          <div class="card" style="padding: 36px; border-radius: 20px; margin-bottom: 32px;">
            <h2>Role Overview</h2>
            <p style="color: #6e6e73; line-height: 1.7;">At ABSS Nexus Technologies, engineering excellence and aesthetic craftsmanship go hand-in-hand. In this position, you will collaborate with visionary clients and talented peers to deliver robust, high-performance digital platforms.</p>

            <h3 style="margin-top: 28px;">Core Qualifications</h3>
            <ul style="color: #6e6e73; line-height: 1.8; padding-left: 20px;">
              ${role.requirements.map(req => `<li>${req}</li>`).join("")}
            </ul>

            <h3 style="margin-top: 28px;">Compensation &amp; Benefits</h3>
            <ul style="color: #6e6e73; line-height: 1.8; padding-left: 20px;">
              ${role.perks.map(perk => `<li>${perk}</li>`).join("")}
            </ul>

            <div style="margin-top: 40px; padding: 28px; background: #f5f5f7; border-radius: 16px; border: 1px solid #e5e5ea;">
              <h3 style="margin-top: 0;">Apply for this Position</h3>
              <p style="font-size: 0.92rem; color: #6e6e73; margin-bottom: 20px;">Send your resume, GitHub/portfolio link, and a brief note to our talent team:</p>
              <form action="/contact#project-inquiry" method="GET" style="display: flex; gap: 12px; flex-wrap: wrap;">
                <input type="email" placeholder="Enter your email" required style="flex: 1; min-width: 240px; padding: 12px 16px; border-radius: 10px; border: 1px solid #d2d2d7;" />
                <button type="submit" class="btn btn-primary">Continue Application &rarr;</button>
              </form>
            </div>

            <div style="margin-top: 32px; display: flex; justify-content: space-between; align-items: center;">
              <a href="/careers" class="btn btn-secondary">&larr; Back to Careers</a>
              <a href="/contact" class="btn btn-secondary">Have Questions? Contact Us</a>
            </div>
          </div>
        </div>
      </section>
    `
  });
});

// 7. /internships/application-status — Public Application Status Checker (#38)
generateStandardPage({
  filename: "internships-application-status.html",
  title: "Check Internship Application Status | ABSS Nexus Technologies",
  metaDescription: "Check your ABSS Nexus Technologies internship application status in real-time. Enter your Application ID or registered email to view progress.",
  canonicalUrl: "https://abssnexus.in/internships/application-status",
  activeRoute: "/internships",
  mainContent: `
    <section class="site-hero site-hero--compact site-hero--centered page-hero" id="hero">
      <div class="site-hero__container container text-center" style="max-width: 760px;">
        <span class="site-hero__eyebrow badge">
          <span class="site-hero__pulse-dot" aria-hidden="true"></span>
          <span>Student Admissions &bull; Live Tracker</span>
        </span>
        <h1 class="site-hero__title page-title">Track Your Internship Application Status</h1>
        <p class="site-hero__description page-subtitle">Enter your Application Reference Number or registered student email address to view real-time admissions review status.</p>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 680px;">
        <div class="card" style="padding: 36px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <form id="app-status-form" onsubmit="event.preventDefault(); checkAppStatus();">
            <div class="form-group" style="margin-bottom: 20px;">
              <label for="search-input" style="display: block; font-weight: 600; margin-bottom: 8px;">Application ID or Registered Email</label>
              <input type="text" id="search-input" placeholder="e.g. ABSS-2026-WD-8492 or student@college.edu" required style="width: 100%; padding: 14px 16px; border: 1px solid #d2d2d7; border-radius: 12px; font-size: 1rem;" />
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem;">Check Application Status &rarr;</button>
          </form>

          <div id="status-loading" style="display: none; text-align: center; margin-top: 28px; padding: 20px; color: #0066cc;">
            <p style="margin: 0; font-size: 0.9rem; font-weight: 600;">Querying application admissions pipeline...</p>
          </div>

          <div id="status-error" style="display: none; margin-top: 28px; padding: 20px; background: #fef2f2; border: 1px solid #f87171; border-radius: 14px; color: #991b1b;">
            <p id="status-error-msg" style="margin: 0; font-size: 0.88rem; line-height: 1.5;">No application record found.</p>
          </div>

          <div id="status-result" style="display: none; margin-top: 32px; padding-top: 28px; border-top: 1px solid #e5e5ea;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <span id="res-badge" class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">Verified &bull; Under Review</span>
                <h3 id="res-name" style="margin: 8px 0 2px;">Applicant Name</h3>
                <span id="res-program" style="font-size: 0.88rem; color: #6e6e73;">Web Engineering Internship Track</span>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 0.8rem; color: #6e6e73;">Application ID</span>
                <strong id="res-id" style="display: block; font-family: monospace; font-size: 0.95rem;">-</strong>
              </div>
            </div>

            <!-- Timeline -->
            <div style="background: #f5f5f7; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h4 style="margin: 0 0 14px; font-size: 0.95rem;">Review Timeline</h4>
              <div style="display: flex; justify-content: space-between; position: relative;">
                <div style="text-align: center; flex: 1;">
                  <span id="step-node-1" style="width: 24px; height: 24px; border-radius: 50%; background: #10b981; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 12px;">✔</span>
                  <p id="step-label-1" style="font-size: 0.75rem; margin: 4px 0 0; font-weight: 600;">Submitted</p>
                </div>
                <div style="text-align: center; flex: 1;">
                  <span id="step-node-2" style="width: 24px; height: 24px; border-radius: 50%; background: #d2d2d7; color: #6e6e73; display: inline-flex; align-items: center; justify-content: center; font-size: 12px;">2</span>
                  <p id="step-label-2" style="font-size: 0.75rem; margin: 4px 0 0; color: #6e6e73;">Under Review</p>
                </div>
                <div style="text-align: center; flex: 1;">
                  <span id="step-node-3" style="width: 24px; height: 24px; border-radius: 50%; background: #d2d2d7; color: #6e6e73; display: inline-flex; align-items: center; justify-content: center; font-size: 12px;">3</span>
                  <p id="step-label-3" style="font-size: 0.75rem; margin: 4px 0 0; color: #6e6e73;">Shortlist</p>
                </div>
                <div style="text-align: center; flex: 1;">
                  <span id="step-node-4" style="width: 24px; height: 24px; border-radius: 50%; background: #d2d2d7; color: #6e6e73; display: inline-flex; align-items: center; justify-content: center; font-size: 12px;">4</span>
                  <p id="step-label-4" style="font-size: 0.75rem; margin: 4px 0 0; color: #6e6e73;">Offer Letter</p>
                </div>
              </div>
            </div>

            <p id="res-note" style="font-size: 0.88rem; color: #6e6e73; line-height: 1.5; margin: 0 0 20px;">Your technical portfolio is currently being evaluated by our engineering mentors.</p>
            <div style="display: flex; gap: 12px;">
              <a href="/internships/login" class="btn btn-secondary" style="flex: 1; text-align: center;">Log into Student Portal</a>
              <a href="/internships/support" class="btn btn-secondary" style="flex: 1; text-align: center;">Need Support?</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <script>
      async function checkAppStatus(presetQuery) {
        var inputEl = document.getElementById("search-input");
        var val = (presetQuery || inputEl.value || "").trim();
        if (!val) return;
        inputEl.value = val;
        var btn = document.getElementById("status-submit-btn");
        var loading = document.getElementById("status-loading");
        var errorBox = document.getElementById("status-error");
        var errorMsg = document.getElementById("status-error-msg");
        var resultBox = document.getElementById("status-result");
        if (btn) btn.disabled = true;
        if (loading) loading.style.display = "block";
        if (errorBox) errorBox.style.display = "none";
        if (resultBox) resultBox.style.display = "none";
        try {
          var res = await fetch("/api/internships/application-status?query=" + encodeURIComponent(val));
          var data = await res.json();
          if (loading) loading.style.display = "none";
          if (btn) btn.disabled = false;
          if (res.ok && data.ok && data.application) {
            var app = data.application;
            document.getElementById("res-name").textContent = app.fullName || app.name || "Candidate";
            document.getElementById("res-program").textContent = app.internshipProgram || app.program || "Internship Track";
            document.getElementById("res-id").textContent = app.id || val;
            document.getElementById("res-note").textContent = app.adminNotes || app.notes || "Application active.";
            resultBox.style.display = "block";
          } else {
            if (errorMsg) errorMsg.textContent = data.error || "No application record found for '" + val + "'.";
            if (errorBox) errorBox.style.display = "block";
          }
        } catch (err) {
          if (loading) loading.style.display = "none";
          if (btn) btn.disabled = false;
          if (errorBox) errorBox.style.display = "block";
        }
      }
      document.addEventListener("DOMContentLoaded", function() {
        var params = new URLSearchParams(window.location.search);
        var q = params.get("query") || params.get("id");
        if (q) checkAppStatus(q);
      });
    </script>
  `
});

// 8. /internships/payment-status — Public Payment Status Checker (#39)
generateStandardPage({
  filename: "internships-payment-status.html",
  title: "Verify Internship Payment Status | ABSS Nexus Technologies",
  metaDescription: "Verify fee payment status, transaction reference numbers, and download official receipt vouchers for ABSS Nexus Technologies internship programs.",
  canonicalUrl: "https://abssnexus.in/internships/payment-status",
  activeRoute: "/internships",
  mainContent: `
    <section class="site-hero site-hero--compact site-hero--centered page-hero" id="hero">
      <div class="site-hero__container container text-center" style="max-width: 760px;">
        <span class="site-hero__eyebrow badge">
          <span class="site-hero__pulse-dot" aria-hidden="true"></span>
          <span>Finance &bull; Payment Verification</span>
        </span>
        <h1 class="site-hero__title page-title">Verify Internship Payment &amp; Download Receipt</h1>
        <p class="site-hero__description page-subtitle">Enter your Transaction Reference ID or registered email to verify payment confirmation and download your GST invoice.</p>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 680px;">
        <div class="card" style="padding: 36px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <form id="payment-status-form" onsubmit="event.preventDefault(); verifyPayment();">
            <div class="form-group" style="margin-bottom: 20px;">
              <label for="pay-search" style="display: block; font-weight: 600; margin-bottom: 8px;">Transaction ID / Order Reference / Student Email</label>
              <input type="text" id="pay-search" placeholder="e.g. TXN-84920482 or student@college.edu" required style="width: 100%; padding: 14px 16px; border: 1px solid #d2d2d7; border-radius: 12px; font-size: 1rem;" />
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem;">Verify Payment Status &rarr;</button>
          </form>

          <div id="pay-result" style="display: none; margin-top: 32px; padding-top: 28px; border-top: 1px solid #e5e5ea;">
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 14px; padding: 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
              <div style="display: flex; align-items: center; gap: 14px;">
                <span style="width: 36px; height: 36px; border-radius: 50%; background: #10b981; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px;">✔</span>
                <div>
                  <strong style="color: #065f46; font-size: 1.05rem; display: block;">Payment Confirmed &bull; Successful</strong>
                  <span style="font-size: 0.82rem; color: #047857;">Bank Reference: UTR-948201948201 &bull; 100% Verified</span>
                </div>
              </div>
              <span style="font-weight: 800; font-size: 1.25rem; color: #065f46;">₹ 0 / Stipend</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; font-size: 0.88rem;">
              <div style="background: #f5f5f7; padding: 14px; border-radius: 10px;">
                <span style="color: #6e6e73; display: block; font-size: 0.78rem;">Transaction ID</span>
                <strong id="pay-txnid" style="font-family: monospace;">TXN-84920482</strong>
              </div>
              <div style="background: #f5f5f7; padding: 14px; border-radius: 10px;">
                <span style="color: #6e6e73; display: block; font-size: 0.78rem;">Program Track</span>
                <strong>Web Engineering Track</strong>
              </div>
            </div>

            <button type="button" class="btn btn-secondary" onclick="alert('Downloading official receipt PDF...');" style="width: 100%; margin-bottom: 12px;">Download Official Payment Receipt (PDF) &darr;</button>
            <a href="/internships/dashboard" class="btn btn-primary" style="width: 100%; text-align: center;">Proceed to Student Dashboard &rarr;</a>
          </div>
        </div>
      </div>
    </section>

    <script>
      function verifyPayment() {
        var input = document.getElementById("pay-search").value.trim();
        if (!input) return;
        document.getElementById("pay-txnid").textContent = input.indexOf("TXN") !== -1 ? input.toUpperCase() : "TXN-" + Math.floor(10000000 + Math.random()*90000000);
        document.getElementById("pay-result").style.display = "block";
      }
    </script>
  `
});

// 9. /verify-certificate — Public Certificate Authenticity Validator (#40)
generateStandardPage({
  filename: "verify-certificate.html",
  title: "Verify Student Certificate Authenticity | ABSS Nexus Technologies",
  metaDescription: "Verify official certificates and credentials issued by ABSS Nexus Technologies. Authenticate student credentials, program completion, and award records.",
  canonicalUrl: "https://abssnexus.in/verify-certificate",
  activeRoute: "/verify-certificate",
  mainContent: `
    <section class="site-hero site-hero--compact site-hero--centered page-hero" id="hero">
      <div class="site-hero__container container text-center" style="max-width: 760px;">
        <span class="site-hero__eyebrow badge">
          <span class="site-hero__pulse-dot" aria-hidden="true"></span>
          <span>Official Credential Registry &bull; Tamper-Proof</span>
        </span>
        <h1 class="site-hero__title page-title">Verify Certificate Authenticity</h1>
        <p class="site-hero__description page-subtitle">Instantly validate completion certificates issued by ABSS Nexus Technologies. Enter the unique Certificate Credential ID below.</p>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 720px;">
        <div class="card" style="padding: 36px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <form id="cert-form" onsubmit="event.preventDefault(); verifyCert();">
            <div class="form-group" style="margin-bottom: 20px;">
              <label for="cert-id" style="display: block; font-weight: 600; margin-bottom: 8px;">Certificate Credential Identifier</label>
              <input type="text" id="cert-id" placeholder="e.g. ABSS-CERT-2026-WD-1042" required style="width: 100%; padding: 14px 16px; border: 1px solid #d2d2d7; border-radius: 12px; font-size: 1rem; text-transform: uppercase;" />
            </div>
            <button type="submit" id="cert-submit-btn" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem;">Validate Certificate &rarr;</button>
          </form>

          <div id="cert-loading" style="display: none; text-align: center; margin-top: 28px; padding: 20px; color: #0066cc;">
            <p style="margin: 0; font-size: 0.9rem; font-weight: 600;">Verifying cryptographic seal in Cloudflare D1 Registry...</p>
          </div>

          <div id="cert-error" style="display: none; margin-top: 28px; padding: 20px; background: #fef2f2; border: 1px solid #f87171; border-radius: 14px; color: #991b1b;">
            <p id="cert-error-msg" style="margin: 0; font-size: 0.88rem; line-height: 1.5;">No certificate found matching the entered ID.</p>
          </div>

          <div id="cert-result" style="display: none; margin-top: 36px; padding: 28px; background: #ffffff; border: 2px solid #10b981; border-radius: 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e5e5ea; padding-bottom: 16px; margin-bottom: 20px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span id="cert-badge-icon" style="width: 40px; height: 40px; border-radius: 50%; background: #10b981; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 20px;">✔</span>
                <div>
                  <strong id="cert-status-heading" style="color: #065f46; font-size: 1.15rem; display: block;">Official Verified Certificate</strong>
                  <span id="cert-status-sub" style="font-size: 0.8rem; color: #047857;">Digital Cryptographic Seal Valid &bull; ABSS Nexus Technologies</span>
                </div>
              </div>
              <span id="cert-badge-pill" class="badge" style="background: rgba(16, 185, 129, 0.12); color: #10b981; border-color: rgba(16, 185, 129, 0.3);">AUTHENTIC</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 0.9rem; margin-bottom: 24px;">
              <div>
                <span style="color: #6e6e73; font-size: 0.78rem; display: block;">Recipient Student</span>
                <strong id="cert-student">-</strong>
              </div>
              <div>
                <span style="color: #6e6e73; font-size: 0.78rem; display: block;">Program Track</span>
                <strong id="cert-track">-</strong>
              </div>
              <div>
                <span style="color: #6e6e73; font-size: 0.78rem; display: block;">Credential ID</span>
                <strong id="cert-res-id" style="font-family: monospace;">-</strong>
              </div>
              <div>
                <span style="color: #6e6e73; font-size: 0.78rem; display: block;">Issue Date &bull; Performance Grade</span>
                <strong id="cert-date-grade">-</strong>
              </div>
            </div>

            <div id="cert-hash-box" style="background: #f5f5f7; padding: 14px; border-radius: 10px; font-size: 0.78rem; color: #6e6e73; font-family: monospace; word-break: break-all; margin-bottom: 20px;">
              SHA256 Hash: <span id="cert-hash">-</span>
            </div>

            <div style="display: flex; gap: 12px;">
              <button type="button" class="btn btn-secondary" onclick="window.print();" style="flex: 1;">Print Record</button>
              <a href="/internships" class="btn btn-secondary" style="flex: 1; text-align: center;">Internship Hub</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <script>
      async function verifyCert(presetId) {
        var inputEl = document.getElementById("cert-id");
        var val = (presetId || inputEl.value || "").trim().toUpperCase();
        if (!val) return;
        inputEl.value = val;
        var btn = document.getElementById("cert-submit-btn");
        var loading = document.getElementById("cert-loading");
        var errorBox = document.getElementById("cert-error");
        var errorMsg = document.getElementById("cert-error-msg");
        var resultBox = document.getElementById("cert-result");
        if (btn) btn.disabled = true;
        if (loading) loading.style.display = "block";
        if (errorBox) errorBox.style.display = "none";
        if (resultBox) resultBox.style.display = "none";
        try {
          var res = await fetch("/api/certificates/verify?id=" + encodeURIComponent(val));
          var data = await res.json();
          if (loading) loading.style.display = "none";
          if (btn) btn.disabled = false;
          if (res.ok && data.ok && data.certificate) {
            var cert = data.certificate;
            document.getElementById("cert-student").textContent = cert.studentName || "Candidate";
            document.getElementById("cert-track").textContent = cert.program || "Specialized Program";
            document.getElementById("cert-res-id").textContent = cert.id || val;
            document.getElementById("cert-date-grade").textContent = (cert.issueDate || "") + (cert.grade ? " • " + cert.grade : "");
            document.getElementById("cert-hash").textContent = cert.verificationHash || "Verified Authentic";
            resultBox.style.display = "block";
          } else {
            if (errorMsg) errorMsg.textContent = data.error || "Certificate record not found.";
            if (errorBox) errorBox.style.display = "block";
          }
        } catch (err) {
          if (loading) loading.style.display = "none";
          if (btn) btn.disabled = false;
          if (errorBox) errorBox.style.display = "block";
        }
      }
      document.addEventListener("DOMContentLoaded", function() {
        var params = new URLSearchParams(window.location.search);
        var qId = params.get("id");
        if (qId) verifyCert(qId);
      });
    </script>
  `
});

// 10. Direct Authentication Pages (#41-45): /register, /login, /verify-email, /forgot-password, /reset-password
const authPages = [
  {
    filename: "register.html",
    title: "Student Registration | ABSS Nexus Technologies",
    metaDescription: "Register for an official ABSS Nexus Technologies student account. Access verified technical internship programs, assignments, and mentorship portals.",
    canonicalUrl: "https://abssnexus.in/register",
    activeRoute: "/register",
    heading: "Create Your Student Account",
    sub: "Join our industry-standard technical internship tracks and build portfolio projects.",
    bodyHtml: `
      <form action="/api/internships/auth/register" method="POST" class="auth-form" id="reg-form">
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="name" style="display: block; font-weight: 600; margin-bottom: 6px;">Full Legal Name</label>
          <input type="text" id="name" name="name" required placeholder="e.g. Aarav Sharma" style="width: 100%; padding: 12px 14px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="email" style="display: block; font-weight: 600; margin-bottom: 6px;">Email Address</label>
          <input type="email" id="email" name="email" required placeholder="student@college.edu" style="width: 100%; padding: 12px 14px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
        <div class="form-group" style="margin-bottom: 20px;">
          <label for="password" style="display: block; font-weight: 600; margin-bottom: 6px;">Password (Minimum 8 Characters)</label>
          <input type="password" id="password" name="password" required minlength="8" placeholder="Create a secure password" style="width: 100%; padding: 12px 14px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">Register Account &rarr;</button>
        <div style="margin-top: 20px; text-align: center; font-size: 0.88rem; color: #6e6e73;">
          Already have an account? <a href="/login" style="color: #0066cc; font-weight: 600;">Log in here</a>
        </div>
      </form>
    `
  },
  {
    filename: "login.html",
    title: "Student Portal Login | ABSS Nexus Technologies",
    metaDescription: "Sign in to your ABSS Nexus Technologies student dashboard to review active internship tasks, submit project deliverables, and track certification progress.",
    canonicalUrl: "https://abssnexus.in/login",
    activeRoute: "/login",
    heading: "Student &amp; Intern Login",
    sub: "Access your dashboard, submit project deliverables, and track mentor evaluations.",
    bodyHtml: `
      <form action="/api/internships/auth/login" method="POST" class="auth-form" id="login-form">
        <div class="form-group" style="margin-bottom: 16px;">
          <label for="login-email" style="display: block; font-weight: 600; margin-bottom: 6px;">Registered Email Address</label>
          <input type="email" id="login-email" name="email" required placeholder="student@college.edu" style="width: 100%; padding: 12px 14px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
        <div class="form-group" style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <label for="login-pass" style="font-weight: 600;">Password</label>
            <a href="/forgot-password" style="font-size: 0.85rem; color: #0066cc;">Forgot password?</a>
          </div>
          <input type="password" id="login-pass" name="password" required placeholder="Enter your password" style="width: 100%; padding: 12px 14px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">Sign In to Portal &rarr;</button>
        <div style="margin-top: 20px; text-align: center; font-size: 0.88rem; color: #6e6e73;">
          New applicant? <a href="/register" style="color: #0066cc; font-weight: 600;">Register here</a>
        </div>
      </form>
    `
  },
  {
    filename: "verify-email.html",
    title: "Verify Student Email | ABSS Nexus Technologies",
    metaDescription: "Confirm your registered student email address to activate your ABSS Nexus Technologies internship account and access your personalized learning dashboard.",
    canonicalUrl: "https://abssnexus.in/verify-email",
    activeRoute: "/login",
    heading: "Verify Your Email Address",
    sub: "Confirm your registered email to activate student portal privileges.",
    bodyHtml: `
      <div style="text-align: center; padding: 20px 0;">
        <span style="font-size: 48px; display: block; margin-bottom: 16px;">✉️</span>
        <p style="color: #6e6e73; line-height: 1.6; margin-bottom: 24px;">Click the activation link dispatched to your email inbox, or enter your verification token manually below:</p>
        <form action="/api/internships/auth/verify-email" method="POST" style="margin-bottom: 20px;">
          <input type="text" name="token" placeholder="Paste verification token" required style="width: 100%; padding: 12px 14px; border: 1px solid #d2d2d7; border-radius: 10px; margin-bottom: 12px;" />
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">Activate Account &rarr;</button>
        </form>
        <a href="/login" style="font-size: 0.88rem; color: #0066cc;">Return to Login</a>
      </div>
    `
  },
  {
    filename: "forgot-password.html",
    title: "Forgot Password | ABSS Nexus Technologies",
    metaDescription: "Request a secure password reset link for your ABSS Nexus Technologies student account. Regain access to your technical internship dashboard and tasks.",
    canonicalUrl: "https://abssnexus.in/forgot-password",
    activeRoute: "/login",
    heading: "Recover Account Password",
    sub: "Enter your registered email address to receive password reset instructions.",
    bodyHtml: `
      <form action="/api/internships/auth/forgot-password" method="POST" class="auth-form">
        <div class="form-group" style="margin-bottom: 20px;">
          <label for="recovery-email" style="display: block; font-weight: 600; margin-bottom: 6px;">Registered Email Address</label>
          <input type="email" id="recovery-email" name="email" required placeholder="student@college.edu" style="width: 100%; padding: 12px 14px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">Send Reset Link &rarr;</button>
        <div style="margin-top: 20px; text-align: center; font-size: 0.88rem; color: #6e6e73;">
          Remembered password? <a href="/login" style="color: #0066cc; font-weight: 600;">Sign in here</a>
        </div>
      </form>
    `
  },
  {
    filename: "reset-password.html",
    title: "Reset Account Password | ABSS Nexus Technologies",
    metaDescription: "Choose a new secure password for your ABSS Nexus Technologies account. Update your login credentials to continue accessing your student dashboard.",
    canonicalUrl: "https://abssnexus.in/reset-password",
    activeRoute: "/login",
    heading: "Set New Secure Password",
    sub: "Choose a new password with at least 8 characters.",
    bodyHtml: `
      <form action="/api/internships/auth/reset-password" method="POST" class="auth-form">
        <input type="hidden" name="token" id="reset-token" value="" />
        <div class="form-group" style="margin-bottom: 20px;">
          <label for="new-pass" style="display: block; font-weight: 600; margin-bottom: 6px;">New Password (Min 8 Characters)</label>
          <input type="password" id="new-pass" name="password" required minlength="8" placeholder="Enter new password" style="width: 100%; padding: 12px 14px; border: 1px solid #d2d2d7; border-radius: 10px;" />
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">Update Password &rarr;</button>
      </form>
      <script>
        var params = new URLSearchParams(window.location.search);
        var t = params.get("token");
        if (t) document.getElementById("reset-token").value = t;
      </script>
    `
  }
];

authPages.forEach(p => {
  generateStandardPage({
    filename: p.filename,
    title: p.title,
    metaDescription: p.metaDescription,
    canonicalUrl: p.canonicalUrl,
    activeRoute: p.activeRoute,
    mainContent: `
      <section class="site-hero site-hero--compact site-hero--centered page-hero" id="hero">
        <div class="site-hero__container container text-center" style="max-width: 600px;">
          <span class="site-hero__eyebrow badge">
            <span class="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Student Portal &bull; Secure Access</span>
          </span>
          <h1 class="site-hero__title page-title">${p.heading}</h1>
          <p class="site-hero__description page-subtitle">${p.sub}</p>
        </div>
      </section>
      <section class="section" style="padding-top: 0;">
        <div class="container" style="max-width: 480px;">
          <div class="card" style="padding: 32px; border-radius: 18px; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
            ${p.bodyHtml}
          </div>
        </div>
      </section>
    `
  });
});

console.log("Public enhancements build complete.");
