import React from 'react';
import Link from 'next/link';
import TrustBar from '@/src/components/TrustBar';

export default function EcosystemPage() {
  return (
    <main>
      {/* ====================================================================
          HERO SECTION: CONGLOMERATE HOLDING STRUCTURE
          ==================================================================== */}
      <section className="bento-hero-section" id="hero" style={{ padding: '50px 0 30px' }}>
        <div className="bento-container" style={{ textAlign: 'center' }}>
          <div className="bento-pill-badge">
            <span className="live-pulse-dot" aria-hidden="true" />
            <span>Parent Enterprise &bull; 3 Operating Pillars</span>
          </div>

          <h1 className="bento-hero-headline" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', maxWidth: '960px', margin: '0 auto 20px' }}>
            The ABSS Nexus Ecosystem: <br />
            <span className="gradient-text-hero">Platforms, Cloud SaaS &amp; Emerging Talent</span>
          </h1>

          <p className="bento-hero-subtitle" style={{ maxWidth: '780px', margin: '0 auto 36px' }}>
            Operating with a Meta/Alphabet holding structure, <strong>ABSS Nexus Technologies</strong> powers three synergistic divisions:
            high-impact Enterprise IT Consulting, proprietary Business SaaS suites (ABSS ERP, CRM &amp; HRM), and developer talent incubation via IntenNexus.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#it-services" className="bento-btn-glass" style={{ padding: '10px 22px' }}>
              ⚡ 1. IT Services
            </a>
            <a href="#business-saas" className="bento-btn-primary" style={{ padding: '10px 22px' }}>
              💼 2. Business SaaS (ERP, CRM, HRM)
            </a>
            <a href="#intennexus" className="bento-btn-glass" style={{ padding: '10px 22px', borderColor: 'rgba(168, 85, 247, 0.4)', color: '#C084FC' }}>
              🎓 3. IntenNexus Hub
            </a>
          </div>
        </div>
      </section>

      {/* Trust Ecosystem Bar */}
      <TrustBar />

      {/* ====================================================================
          PILLAR 1: ENTERPRISE IT SERVICES
          ==================================================================== */}
      <section className="bento-section" id="it-services" style={{ paddingTop: '60px' }}>
        <div className="bento-container">
          <div className="bento-card" style={{ padding: '48px 36px', background: 'radial-gradient(circle at 10% 20%, rgba(0, 212, 255, 0.1) 0%, rgba(14, 17, 27, 0.95) 100%)', border: '1px solid rgba(0, 212, 255, 0.35)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div>
                <span className="ecosystem-pillar-tag" style={{ background: 'rgba(0, 212, 255, 0.15)', color: '#00D4FF', border: '1px solid rgba(0, 212, 255, 0.4)' }}>
                  Pillar 01 &bull; Global Client Advisory
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '12px 0 16px', letterSpacing: '-0.02em' }}>
                  ABSS Enterprise IT Services
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
                  We engineer bespoke, mission-critical software systems for ambitious startups, mid-market businesses, and enterprises worldwide.
                  From high-converting web applications to automated multi-cloud architectures, our engineering prioritizes sub-second speed, military-grade security, and measurable ROI.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '30px' }}>
                  <div className="bento-card" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#00D4FF' }}>16 Disciplines</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Web, Mobile, Cloud, AI, Security</div>
                  </div>
                  <div className="bento-card" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>99.98% Uptime</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cloudflare Edge &amp; AWS resilient SLAs</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link href="/services" className="bento-btn-primary">
                    <span>Explore All 16 Disciplines &rarr;</span>
                  </Link>
                  <Link href="/work" className="bento-btn-glass">
                    <span>View Case Studies</span>
                  </Link>
                </div>
              </div>

              <div className="bento-card" style={{ padding: '32px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '16px', color: '#00D4FF' }}>
                  Core Engineering Capabilities
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span>🚀</span>
                    <div>
                      <strong>High-Performance Next.js 16 Web Apps</strong>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Headless CMS, React Server Components, Core Web Vitals optimization</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span>📱</span>
                    <div>
                      <strong>Cross-Platform Mobile Engineering</strong>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>React Native &amp; Flutter apps with offline sync and native performance</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span>☁️</span>
                    <div>
                      <strong>Multi-Cloud DevOps &amp; Cloudflare Edge</strong>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Automated CI/CD pipelines, Docker containers, zero-trust security</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span>🤖</span>
                    <div>
                      <strong>Custom AI Automations &amp; LLM Workflows</strong>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Intelligent process automations, CRM sync, semantic search engines</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PILLAR 2: PROPRIETARY BUSINESS SAAS SUITE
          ==================================================================== */}
      <section className="bento-section" id="business-saas" style={{ paddingTop: '80px' }}>
        <div className="bento-container">
          <div className="bento-card" style={{ padding: '48px 36px', background: 'radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.1) 0%, rgba(14, 17, 27, 0.95) 100%)', border: '1px solid rgba(56, 189, 248, 0.35)' }}>
            <div className="bento-section-header" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 40px' }}>
              <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span className="ecosystem-pillar-tag" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                  Pillar 02 &bull; Proprietary Cloud Platforms
                </span>
                <span className="saas-subdomain-pill">
                  <span className="dot" />
                  <span>Zero-Cost Free Subdomains Active</span>
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '12px 0 16px', letterSpacing: '-0.02em' }}>
                ABSS Business SaaS Cloud Suite
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
                Purpose-built business management suites hosted directly on free subdomains of <code>abssnexus.in</code>.
                Automating operations, pipeline conversion, and workforce management for Indian MSMEs and global businesses.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {/* PRODUCT 1: ABSS ERP */}
              <div className="bento-card" style={{ padding: '32px 24px', borderTop: '3px solid #00D4FF', background: 'rgba(255, 255, 255, 0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 212, 255, 0.12)', border: '1px solid rgba(0, 212, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    📦
                  </div>
                  <span className="saas-subdomain-pill">erp.abssnexus.in</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                  ABSS ERP Cloud
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px', minHeight: '44px' }}>
                  Complete operational operating system: inventory management, GST e-invoicing, billing, multi-warehouse tracking, and financial ledgers.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '24px' }}>
                  <div>&bull; Automated GST Billing &amp; E-Way Bill generation</div>
                  <div>&bull; Real-time barcode inventory &amp; low-stock alerts</div>
                  <div>&bull; Multi-branch purchase orders &amp; vendor accounts</div>
                  <div>&bull; Financial P&amp;L reports &amp; CA export audit trails</div>
                </div>
                <Link href="/contact#project-inquiry" className="bento-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
                  Request ERP Early Access &rarr;
                </Link>
              </div>

              {/* PRODUCT 2: ABSS CRM */}
              <div className="bento-card" style={{ padding: '32px 24px', borderTop: '3px solid #38BDF8', background: 'rgba(255, 255, 255, 0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    🤝
                  </div>
                  <span className="saas-subdomain-pill">crm.abssnexus.in</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                  ABSS CRM Suite
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px', minHeight: '44px' }}>
                  Intelligent customer relationship management with automated sales funnels, WhatsApp omnichannel chats, and AI lead qualification.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '24px' }}>
                  <div>&bull; Visual drag-and-drop deal pipeline tracking</div>
                  <div>&bull; WhatsApp Business API &amp; email autoresponders</div>
                  <div>&bull; Auto-assignment of inbound leads to sales agents</div>
                  <div>&bull; Client activity timeline &amp; call recording notes</div>
                </div>
                <Link href="/contact#project-inquiry" className="bento-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
                  Request CRM Early Access &rarr;
                </Link>
              </div>

              {/* PRODUCT 3: ABSS HRM */}
              <div className="bento-card" style={{ padding: '32px 24px', borderTop: '3px solid #10B981', background: 'rgba(255, 255, 255, 0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    👥
                  </div>
                  <span className="saas-subdomain-pill">hrm.abssnexus.in</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                  ABSS HRM Platform
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px', minHeight: '44px' }}>
                  Comprehensive human resource management system automating biometric attendance, compliant Indian payroll, and employee self-service.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '24px' }}>
                  <div>&bull; Biometric &amp; geofenced mobile attendance sync</div>
                  <div>&bull; One-click payroll calculation (PF, ESI, TDS, Bonus)</div>
                  <div>&bull; Leave management &amp; holiday calendar workflows</div>
                  <div>&bull; Employee digital onboarding &amp; payslip PDF portal</div>
                </div>
                <Link href="/contact#project-inquiry" className="bento-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
                  Request HRM Early Access &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PILLAR 3: INTENNEXUS TALENT & EDTECH INCUBATOR
          ==================================================================== */}
      <section className="bento-section" id="intennexus" style={{ paddingTop: '80px', paddingBottom: '90px' }}>
        <div className="bento-container">
          <div className="bento-card" style={{ padding: '48px 36px', background: 'radial-gradient(circle at 10% 20%, rgba(168, 85, 247, 0.1) 0%, rgba(14, 17, 27, 0.95) 100%)', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div>
                <span className="ecosystem-pillar-tag" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#C084FC', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
                  Pillar 03 &bull; An ABSS Nexus Technologies Venture
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '12px 0 16px', letterSpacing: '-0.02em' }}>
                  IntenNexus: The Tech Talent Incubator
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
                  <strong>IntenNexus</strong> was founded to solve India&apos;s college-to-corporate talent gap. We place engineering students and fresh graduates onto real-world production projects, offering rigorous mentorship, code reviews, and verifiable industry experience credentials.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: '#C084FC' }}>✔</span>
                    <span><strong>Live Production Experience:</strong> Hands-on development on real web, cloud, and AI codebases</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: '#C084FC' }}>✔</span>
                    <span><strong>QR-Verifiable Credentials:</strong> Digitally signed certificates backed by ABSS Nexus Technologies</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: '#C084FC' }}>✔</span>
                    <span><strong>Talent Pipeline:</strong> Direct hiring track into ABSS IT Services and our SaaS product teams</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link href="/careers" className="bento-btn-primary" style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
                    <span>Explore Careers &amp; Programs &rarr;</span>
                  </Link>
                  <Link href="/contact#project-inquiry" className="bento-btn-glass">
                    <span>University Partnerships &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Right Side: Track Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="bento-card" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>💻</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>Fullstack Web Track</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>React, Next.js, Node.js, PostgreSQL</div>
                </div>

                <div className="bento-card" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>☁️</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>Cloud &amp; DevOps</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Docker, AWS, Cloudflare, Linux</div>
                </div>

                <div className="bento-card" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>🤖</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>AI &amp; Data Engineering</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Python, LangChain, API Pipelines</div>
                </div>

                <div className="bento-card" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>🎨</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>UI/UX Design Systems</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Figma, Design Tokens, Micro-Interactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
