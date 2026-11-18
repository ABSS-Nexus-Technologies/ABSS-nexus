import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/src/lib/data/services';
import { portfolioData } from '@/src/lib/data/work';
import { faqList } from '@/src/lib/data/faq';
import ProjectFilter from '@/src/components/ProjectFilter';
import FaqAccordion from '@/src/components/FaqAccordion';
import TrustBar from '@/src/components/TrustBar';
import ProjectCostEstimator from '@/src/components/ProjectCostEstimator';

export default function HomePage() {
  const featuredServices = servicesData.slice(0, 6);

  return (
    <main>
      {/* ====================================================================
          SECTION 1: HERO & INTERLOCKING BENTO GRID SHOWCASE
          ==================================================================== */}
      <section className="bento-hero-section" id="hero">
        <div className="bento-container">
          {/* Eyebrow Badge */}
          <div className="bento-pill-badge">
            <span className="live-pulse-dot" aria-hidden="true" />
            <span>Next-Gen Enterprise Engineering &bull; 2026 Ready</span>
          </div>

          {/* Radiant Hero Headline */}
          <h1 className="bento-hero-headline">
            We Build Digital Experiences That{' '}
            <span className="gradient-text-hero">Move Businesses Forward</span>
          </h1>

          {/* Subtitle */}
          <p className="bento-hero-subtitle">
            From modern Next.js 16 platforms and custom software to scalable cloud architectures,
            we empower businesses with high-converting digital products, sub-second performance,
            and reliable engineering support.
          </p>

          {/* Hero Actions */}
          <div className="bento-hero-actions">
            <Link className="bento-btn-primary" href="/contact#project-inquiry">
              <span>Start Your Project Now</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link className="bento-btn-glass" href="/services">
              <span>Explore Services</span>
            </Link>
            <Link className="bento-btn-glass" href="/pricing">
              <span>View Transparent Pricing</span>
            </Link>
          </div>

          {/* ==================================================================
              INTERLOCKING BENTO GRID (4 BESPOKE HIGH-TECH CARDS)
              ================================================================== */}
          <div className="bento-grid-hero">
            {/* Card 1: Real-Time Telemetry & Traffic Stream (Col 8) */}
            <div className="bento-card bento-col-8">
              <div className="bento-card-header">
                <div>
                  <h3 className="bento-card-title">Real-Time Telemetry &amp; Traffic Stream</h3>
                  <p className="bento-card-desc">Live edge analytics across 14 multi-cloud global regions.</p>
                </div>
                <span className="bento-badge-live">
                  <span className="live-pulse-dot" aria-hidden="true" />
                  <span>All Nodes Operational</span>
                </span>
              </div>

              {/* Stats Row */}
              <div className="analytics-stats-row">
                <div className="analytics-stat-item">
                  <span className="val cyan">+184.2%</span>
                  <span className="lbl">Throughput</span>
                </div>
                <div className="analytics-stat-item">
                  <span className="val">18ms</span>
                  <span className="lbl">Global Latency</span>
                </div>
                <div className="analytics-stat-item">
                  <span className="val">99.99%</span>
                  <span className="lbl">Availability</span>
                </div>
                <div className="analytics-stat-item">
                  <span className="val">0</span>
                  <span className="lbl">Dropped Requests</span>
                </div>
              </div>

              {/* SVG Glowing Curve Chart */}
              <div className="analytics-chart-mock" aria-label="Live telemetry throughput graph">
                <svg viewBox="0 0 720 140" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00c2ff" stopOpacity="0.35" />
                      <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#00c2ff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="chartStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00c2ff" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#00c2ff" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="0" y1="35" x2="720" y2="35" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="70" x2="720" y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="105" x2="720" y2="105" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                  {/* Gradient Area Fill */}
                  <path
                    d="M0,110 C80,95 140,120 220,60 C300,10 380,85 460,40 C540,15 620,45 720,20 L720,140 L0,140 Z"
                    fill="url(#chartGradient)"
                  />

                  {/* Smooth Glowing Top Stroke */}
                  <path
                    d="M0,110 C80,95 140,120 220,60 C300,10 380,85 460,40 C540,15 620,45 720,20"
                    stroke="url(#chartStroke)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Highlight Dots */}
                  <circle cx="220" cy="60" r="4" fill="#00c2ff" />
                  <circle cx="460" cy="40" r="4" fill="#8b5cf6" />
                  <circle cx="720" cy="20" r="4" fill="#00c2ff" />
                </svg>
              </div>
            </div>

            {/* Card 2: Edge Infrastructure & Global SLA (Col 4) */}
            <div className="bento-card bento-col-4">
              <div className="bento-card-header">
                <div>
                  <h3 className="bento-card-title">Edge Infrastructure</h3>
                  <p className="bento-card-desc">Zero-downtime routing across continents.</p>
                </div>
                <span className="bento-badge-live">99.9% SLA</span>
              </div>

              <div className="metric-box-highlight">
                <span className="metric-big-number">0.38s</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  First Contentful Paint (FCP)
                </span>
              </div>

              <div className="edge-nodes-list">
                <div className="edge-node-row">
                  <span className="edge-node-name">
                    <span className="live-pulse-dot" style={{ width: '6px', height: '6px' }} />
                    IN-BOM-1 (Mumbai)
                  </span>
                  <span className="edge-node-latency">14ms</span>
                </div>
                <div className="edge-node-row">
                  <span className="edge-node-name">
                    <span className="live-pulse-dot" style={{ width: '6px', height: '6px' }} />
                    US-EAST-1 (N. Virginia)
                  </span>
                  <span className="edge-node-latency">32ms</span>
                </div>
                <div className="edge-node-row">
                  <span className="edge-node-name">
                    <span className="live-pulse-dot" style={{ width: '6px', height: '6px' }} />
                    EU-FRA-1 (Frankfurt)
                  </span>
                  <span className="edge-node-latency">28ms</span>
                </div>
              </div>
            </div>

            {/* Card 3: Production Quality & Core Web Vitals (Col 4) */}
            <div className="bento-card bento-col-4">
              <div className="bento-card-header">
                <div>
                  <h3 className="bento-card-title">Production Quality</h3>
                  <p className="bento-card-desc">Lighthouse &amp; Security Audits.</p>
                </div>
                <span className="bento-badge-live">Audited</span>
              </div>

              <div className="metric-box-highlight">
                <span className="metric-big-number">100/100</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Lighthouse Performance Score
                </span>
              </div>

              <div className="metric-pills-list">
                <div className="metric-pill-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>50+ Enterprise Systems Shipped</span>
                </div>
                <div className="metric-pill-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Zero-Trust Security &amp; Data Isolation</span>
                </div>
                <div className="metric-pill-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>TypeScript Strict &amp; Zod Schema Safe</span>
                </div>
              </div>
            </div>

            {/* Card 4: Type-Safe Edge Runtime Code Sandbox (Col 8) */}
            <div className="bento-card bento-col-8">
              <div className="bento-card-header">
                <div>
                  <h3 className="bento-card-title">Type-Safe Edge Runtime</h3>
                  <p className="bento-card-desc">Serverless API compute running within 35ms of your users.</p>
                </div>
                <span className="bento-badge-live" style={{ color: 'var(--accent-cyan)', borderColor: 'rgba(0,194,255,0.3)', background: 'rgba(0,194,255,0.08)' }}>
                  Next.js 16 Edge
                </span>
              </div>

              <div className="code-window-frame">
                <div className="code-window-topbar">
                  <div className="code-window-dots">
                    <span className="code-dot-red" />
                    <span className="code-dot-yellow" />
                    <span className="code-dot-green" />
                  </div>
                  <span className="code-window-filename">src/api/telemetry/route.ts</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>TypeScript</span>
                </div>
                <pre className="code-content-body">
                  <code>
                    <span className="code-token-kw">import</span> {'{ NextRequest, NextResponse }'} <span className="code-token-kw">from</span> <span className="code-token-str">&apos;next/server&apos;</span>;{'\n'}
                    <span className="code-token-kw">export const</span> runtime = <span className="code-token-str">&apos;edge&apos;</span>;{'\n\n'}
                    <span className="code-token-kw">export async function</span> <span className="code-token-fn">POST</span>(req: <span className="code-token-type">NextRequest</span>) {'{'}{'\n'}
                    {'  '}<span className="code-token-comment">// Sub-millisecond localized edge computation</span>{'\n'}
                    {'  '}<span className="code-token-kw">const</span> region = req.geo?.city || <span className="code-token-str">&apos;Mumbai&apos;</span>;{'\n'}
                    {'  '}<span className="code-token-kw">return</span> NextResponse.<span className="code-token-fn">json</span>({'{'}{'\n'}
                    {'    '}status: <span className="code-token-str">&apos;operational&apos;</span>,{'\n'}
                    {'    '}latency: <span className="code-token-str">&apos;14ms&apos;</span>,{'\n'}
                    {'    '}edgeNode: region,{'\n'}
                    {'    '}timestamp: <span className="code-token-kw">new</span> <span className="code-token-fn">Date</span>().<span className="code-token-fn">toISOString</span>(){'\n'}
                    {'  '}{'}'});{'\n'}
                    {'}'}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: INFINITE TECH MARQUEE
          ==================================================================== */}
      <section className="bento-marquee-section" aria-label="Technologies & Frameworks">
        <p className="bento-marquee-title">Technologies &amp; Frameworks We Build With</p>
        <div className="bento-marquee-track">
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Next.js 16 App Router</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />React 19 Server Components</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />TypeScript Strict Mode</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Zod Schema Validation</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Tailwind CSS</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />PostgreSQL &amp; D1 Edge</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Docker &amp; Kubernetes</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />AWS &amp; Cloudflare</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Node.js Microservices</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Python &amp; AI Automations</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Figma Enterprise UI/UX</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />REST &amp; WebSockets</span>

          {/* Marquee Loop Duplicate */}
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Next.js 16 App Router</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />React 19 Server Components</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />TypeScript Strict Mode</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Zod Schema Validation</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Tailwind CSS</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />PostgreSQL &amp; D1 Edge</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Docker &amp; Kubernetes</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />AWS &amp; Cloudflare</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Node.js Microservices</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Python &amp; AI Automations</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />Figma Enterprise UI/UX</span>
          <span className="bento-tech-pill"><span className="bento-tech-dot" />REST &amp; WebSockets</span>
        </div>
      </section>

      {/* Verified Partnerships & Ecosystem Trust Bar */}
      <TrustBar />

      {/* ====================================================================
          SECTION 2.5: THE ABSS NEXUS ECOSYSTEM (3 CORE PILLARS)
          ==================================================================== */}
      <section className="bento-section ecosystem-section" id="ecosystem">
        <div className="bento-container">
          <div className="bento-section-header" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 40px' }}>
            <span className="bento-section-eyebrow">CONGLOMERATE ECOSYSTEM &bull; 3 PILLARS</span>
            <h2 className="bento-section-title">
              Powering the Future Through Three Synergistic Divisions
            </h2>
            <p className="bento-section-subtitle">
              ABSS Nexus Technologies operates a high-impact corporate ecosystem encompassing client IT consulting, proprietary business cloud platforms (ERP, CRM, HRM), and tech talent incubation via IntenNexus.
            </p>
          </div>

          <div className="ecosystem-grid">
            {/* PILLAR 1: IT Services */}
            <div className="ecosystem-card pillar-services">
              <div>
                <span className="ecosystem-pillar-tag">Pillar 01 &bull; Client Consulting</span>
                <h3 className="ecosystem-title">ABSS IT Services</h3>
                <p className="ecosystem-desc">
                  Bespoke software development, Next.js 16 platforms, mobile apps, multi-cloud DevOps, and cybersecurity built for growing businesses and enterprises worldwide.
                </p>
                <div className="ecosystem-feature-list">
                  <div className="ecosystem-feature-item">
                    <span style={{ color: '#00D4FF' }}>&bull;</span>
                    <span><strong>16 Specialized Disciplines:</strong> Web, Software, AI, Cloud, QA</span>
                  </div>
                  <div className="ecosystem-feature-item">
                    <span style={{ color: '#00D4FF' }}>&bull;</span>
                    <span><strong>Next.js 16 &amp; Cloudflare Edge:</strong> Sub-second global performance</span>
                  </div>
                  <div className="ecosystem-feature-item">
                    <span style={{ color: '#00D4FF' }}>&bull;</span>
                    <span><strong>Founder-Led Execution:</strong> Direct architecture oversight by Shubham Kumar</span>
                  </div>
                </div>
              </div>
              <div className="ecosystem-card-footer">
                <Link href="/services" className="bento-btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>View 16 Services</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/work" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  Case Studies &rarr;
                </Link>
              </div>
            </div>

            {/* PILLAR 2: Business SaaS */}
            <div className="ecosystem-card pillar-saas">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span className="ecosystem-pillar-tag" style={{ margin: 0, fontSize: '0.70rem', padding: '3px 8px' }}>
                    Pillar 02 &bull; Proprietary Cloud
                  </span>
                  <span className="saas-subdomain-pill" style={{ fontSize: '0.68rem', padding: '3px 7px' }}>
                    <span className="dot" />
                    <span>Free Subdomains Active</span>
                  </span>
                </div>
                <h3 className="ecosystem-title">ABSS Business SaaS</h3>
                <p className="ecosystem-desc">
                  Integrated enterprise cloud platforms engineered for MSMEs and growing businesses. Available under dedicated free subdomains.
                </p>
                <div className="ecosystem-feature-list">
                  <div className="ecosystem-feature-item" style={{ flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <strong>📦 ABSS ERP</strong>
                      <span className="saas-subdomain-pill">erp.abssnexus.in</span>
                    </div>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      GST Invoicing, Real-Time Inventory, Ledger &amp; Supply Chain Operations.
                    </span>
                  </div>

                  <div className="ecosystem-feature-item" style={{ flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <strong>🤝 ABSS CRM</strong>
                      <span className="saas-subdomain-pill">crm.abssnexus.in</span>
                    </div>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Automated Lead Pipelines, Omnichannel Support &amp; Customer Retention.
                    </span>
                  </div>

                  <div className="ecosystem-feature-item" style={{ flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <strong>👥 ABSS HRM</strong>
                      <span className="saas-subdomain-pill">hrm.abssnexus.in</span>
                    </div>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      One-Click Payroll, Biometric Attendance &amp; Employee Lifecycle Portal.
                    </span>
                  </div>
                </div>
              </div>
              <div className="ecosystem-card-footer">
                <Link href="/ecosystem#business-saas" className="bento-btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Explore SaaS Suite</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/contact#project-inquiry" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  Book Demo &rarr;
                </Link>
              </div>
            </div>

            {/* PILLAR 3: IntenNexus */}
            <div className="ecosystem-card pillar-intennexus">
              <div>
                <a
                  href="https://www.intennexus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ecosystem-pillar-tag"
                  style={{ display: 'inline-block', textDecoration: 'none' }}
                >
                  Pillar 03 &bull; EdTech &amp; Talent
                </a>
                <h3 className="ecosystem-title">IntenNexus</h3>
                <p className="ecosystem-desc">
                  An ABSS Nexus Technologies initiative bridging academic theory and real-world tech engineering through live student internships and career mentorship.
                </p>
                <div className="ecosystem-feature-list">
                  <div className="ecosystem-feature-item">
                    <span style={{ color: '#C084FC' }}>&bull;</span>
                    <span><strong>Live Production Internships:</strong> Web Dev, React, Python, Cloud, AI</span>
                  </div>
                  <div className="ecosystem-feature-item">
                    <span style={{ color: '#C084FC' }}>&bull;</span>
                    <span><strong>Verified Experience Credentials:</strong> QR-verifiable internship certificates</span>
                  </div>
                  <div className="ecosystem-feature-item">
                    <span style={{ color: '#C084FC' }}>&bull;</span>
                    <span><strong>Direct Placement Pipeline:</strong> Top performers join ABSS Nexus ventures</span>
                  </div>
                </div>
              </div>
              <div className="ecosystem-card-footer">
                <a
                  href="https://www.intennexus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.85rem', background: 'linear-gradient(135deg, #7C3AED, #A855F7)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Explore IntenNexus</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <Link href="/ecosystem#intennexus" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  Learn More &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: SERVICES BENTO SECTION
          ==================================================================== */}
      <section className="bento-section" id="services">
        <div className="bento-container">
          <div className="bento-section-header">
            <span className="bento-section-eyebrow">Layered Digital Capabilities</span>
            <h2 className="bento-section-title">Engineering Solutions Across 16 Disciplines</h2>
            <p className="bento-section-subtitle">
              Explore our complete catalog of high-speed web platforms, enterprise dashboards,
              cloud engineering, and modern UI/UX design systems.
            </p>
          </div>

          <div className="services-bento-grid">
            {featuredServices.map((service) => (
              <Link className="service-bento-item" href={`/services/${service.slug}`} key={service.id}>
                <div>
                  <div className="service-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <span className="service-badge">{service.badge}</span>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.shortDesc}</p>
                </div>

                <div>
                  <div className="service-tag-row">
                    {service.features.slice(0, 3).map((f) => (
                      <span className="service-tag" key={f}>{f}</span>
                    ))}
                  </div>
                  <span className="service-cta-arrow">
                    Explore Service Details &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link className="bento-btn-primary" href="/services">
              View All 16 Services &amp; Packages &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4: FEATURED PORTFOLIO BENTO SECTION
          ==================================================================== */}
      <section className="bento-section" id="projects">
        <div className="bento-container">
          <div className="bento-section-header">
            <span className="bento-section-eyebrow">Featured Portfolio</span>
            <h2 className="bento-section-title">Proven Work Engineered for Real Impact</h2>
            <p className="bento-section-subtitle">
              Explore selected client and concept projects highlighting clean layout design,
              mobile responsiveness, and robust application structure.
            </p>
          </div>

          <ProjectFilter projects={portfolioData} />

          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link className="bento-btn-glass" href="/work">
              Explore Full Portfolio Archive &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: VERIFIED CLIENT ENDORSEMENTS
          ==================================================================== */}
      <section className="bento-section" id="testimonials">
        <div className="bento-container">
          <div className="bento-section-header">
            <span className="bento-section-eyebrow">Client Endorsements</span>
            <h2 className="bento-section-title">Trusted by Founders &amp; Growing Brands</h2>
            <p className="bento-section-subtitle">
              Here is what startup founders, business owners, and academic leaders have to say
              about our hands-on engineering, sub-second performance, and founder-led execution.
            </p>
          </div>

          <div className="testimonials-bento-grid">
            <article className="testimonial-bento-card">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg viewBox="0 0 24 24" key={i}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-quote">
                &ldquo;ABSS Nexus Technologies engineered and delivered our SaaS analytics dashboard in just 8 days.
                Having direct access to Shubham without account manager friction eliminated miscommunication.
                The edge loading speeds and clean modular architecture exceeded our expectations.&rdquo;
              </p>
              <div className="testimonial-author-row">
                <div className="testimonial-avatar">AV</div>
                <div>
                  <div className="testimonial-author-name">Aman Verma</div>
                  <div className="testimonial-author-role">Founder &bull; FinEdge Labs</div>
                </div>
              </div>
            </article>

            <article className="testimonial-bento-card">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg viewBox="0 0 24 24" key={i}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-quote">
                &ldquo;Our retail e-commerce storefront saw a 42% lift in customer inquiries within the first 30 days.
                The direct WhatsApp catalog checkout is intuitive and frictionless.
                Their transparent pricing and adherence to delivery deadlines is rare among digital agencies.&rdquo;
              </p>
              <div className="testimonial-author-row">
                <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>PR</div>
                <div>
                  <div className="testimonial-author-name">Pooja Rathore</div>
                  <div className="testimonial-author-role">Operations Director &bull; Heritage Crafts India</div>
                </div>
              </div>
            </article>

            <article className="testimonial-bento-card">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg viewBox="0 0 24 24" key={i}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-quote">
                &ldquo;Structuring our multi-department institute website with complex admission forms and student notices was handled masterfully.
                The site loads instantaneously on mobile devices even on 3G connections. Truly high-caliber technical craftsmanship.&rdquo;
              </p>
              <div className="testimonial-author-row">
                <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>RM</div>
                <div>
                  <div className="testimonial-author-name">Dr. R. K. Meena</div>
                  <div className="testimonial-author-role">Registrar &bull; Apex Educational Academy</div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 6: INTERACTIVE COST ESTIMATOR & SCOPE ENGINE
          ==================================================================== */}
      <section className="bento-section" id="estimator">
        <div className="bento-container">
          <ProjectCostEstimator />
        </div>
      </section>

      {/* ====================================================================
          SECTION 7: RADIANT PROJECT INQUIRY CTA BOX
          ==================================================================== */}
      <section className="bento-section" id="project-inquiry">
        <div className="bento-container">
          <div className="bento-cta-box">
            <span className="bento-section-eyebrow">Start Your Project</span>
            <h2 className="bento-cta-title">Ready to Build a High-Performance Digital Product?</h2>
            <p className="bento-cta-desc">
              Whether you need a fresh website, a custom web app, or an urgent redesign,
              we are ready to bring your vision to life with speed, precision, and modern aesthetics.
            </p>

            <div className="bento-cta-actions">
              <Link className="bento-btn-primary" href="/contact#project-inquiry">
                <span>Start Your Project Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <a
                className="bento-btn-whatsapp"
                href="https://wa.me/917688899205"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat directly on WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.3-.778.979-.954 1.18-.176.2-.352.226-.653.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.632-.929-2.235-.245-.588-.494-.509-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.722.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.43.25-.704.25-1.307.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.51 2 2.03 6.48 2.03 12.01c0 1.97.57 3.81 1.57 5.37L2 22l4.78-1.54c1.51.92 3.27 1.45 5.26 1.45 5.53 0 10.01-4.48 10.01-10.01S17.57 2 12.04 2zm0 18.25c-1.74 0-3.36-.5-4.74-1.38l-.34-.22-2.83.91.93-2.76-.24-.37c-.98-1.5-1.53-3.27-1.53-5.12 0-4.56 3.71-8.27 8.27-8.27s8.27 3.71 8.27 8.27-3.71 8.27-8.27 8.27z"/>
                </svg>
                <span>WhatsApp Directly</span>
              </a>
            </div>

            <div className="bento-cta-trust-row">
              <span>&#9742; Direct Line: +91 76888 99205</span>
              <span>&#9993; Email: abssnexus@gmail.com</span>
              <span>&#128205; Location: Jaipur, Rajasthan</span>
            </div>
          </div>

          {/* ==================================================================
              SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ)
              ================================================================== */}
          <div style={{ marginTop: '70px' }}>
            <div className="bento-section-header">
              <span className="bento-section-eyebrow">Common Queries</span>
              <h2 className="bento-section-title">Frequently Asked Questions</h2>
            </div>
            <FaqAccordion items={faqList} />
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link href="/faq" className="bento-btn-glass" style={{ display: 'inline-flex', padding: '10px 24px', fontSize: '0.9rem' }}>
                <span>View Full Knowledge Base &amp; All FAQs &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
