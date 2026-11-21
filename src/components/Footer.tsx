import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bento-footer" role="contentinfo">
      <div className="bento-container">
        {/* Pre-Footer Action Banner */}
        <div className="bento-footer-cta-banner">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="live-pulse-dot" aria-hidden="true" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-cyan)' }}>
                Start Your Digital Transformation
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
              Ready to Engineer Your Next Digital Platform?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, maxWidth: '640px' }}>
              Book a direct technical scoping roadmap session with our engineering leads. Fast turnarounds, transparent milestones, and zero hidden fees.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link className="bento-btn-primary" href="/contact#project-inquiry" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
              <span>Book Free Consultation</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a
              className="bento-btn-glass"
              href="https://wa.me/917688899205?text=Hi%20Shubham%2C%20I%20saw%20ABSS%20Nexus%20Technologies%20and%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
            >
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Main 5-Column High-Tech Footer Grid */}
        <div className="bento-footer-grid">
          {/* Column 1: Parent Brand & Holding Vision */}
          <div>
            <Link href="/" aria-label="ABSS Nexus Technologies home" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '14px' }}>
              <picture>
                <source srcSet="/assets/images/logo/abss-nexus-symbol.webp" type="image/webp" />
                <img
                  src="/assets/images/logo/abss-nexus-symbol.png"
                  alt="ABSS Nexus Technologies logo"
                  width={46}
                  height={24}
                  loading="lazy"
                  decoding="async"
                  style={{ width: 'auto', height: '28px', objectFit: 'contain' }}
                />
              </picture>
              <div className="bento-brand-stacked">
                <span className="bento-brand-top" style={{ fontSize: '1.25rem' }}>
                  ABSS <span className="brand-coral-nexus">Nexus</span>
                </span>
                <span className="bento-brand-bottom" style={{ fontSize: '0.62rem', letterSpacing: '0.18em' }}>TECHNOLOGIES</span>
              </div>
            </Link>
            <p className="bento-footer-brand-desc">
              Parent technology holding group engineering bespoke enterprise software, the ABSS Business SaaS Suite (ERP, CRM, HRM), and incubating next-generation software talent.
            </p>
            <div style={{ marginBottom: '18px' }}>
              <span className="bento-footer-status">
                <span className="live-pulse-dot" aria-hidden="true" />
                <span>All 3 Divisions Active &bull; 99.98% SLA</span>
              </span>
            </div>

            {/* Social Media Glass Icons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <a
                className="bento-footer-social-icon"
                href="https://wa.me/917688899205"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Hotline"
                title="WhatsApp Direct"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
              <a
                className="bento-footer-social-icon"
                href="https://x.com/abssnexus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                title="X (Twitter)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a
                className="bento-footer-social-icon"
                href="https://www.instagram.com/abssnexus/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                className="bento-footer-social-icon"
                href="https://www.linkedin.com/company/abssnexus/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Company Page"
                title="LinkedIn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Ecosystem & SaaS Suite */}
          <div>
            <h3 className="bento-footer-col-title">Ecosystem Pillars</h3>
            <div className="bento-footer-links">
              <Link className="bento-footer-link" href="/services">
                <span style={{ color: '#00D4FF' }}>⚡</span>
                <span>ABSS IT Services</span>
              </Link>
              <Link className="bento-footer-link" href="/ecosystem#business-saas">
                <span>📦</span>
                <span>ABSS ERP (erp.abssnexus.in)</span>
              </Link>
              <Link className="bento-footer-link" href="/ecosystem#business-saas">
                <span>🤝</span>
                <span>ABSS CRM (crm.abssnexus.in)</span>
              </Link>
              <Link className="bento-footer-link" href="/ecosystem#business-saas">
                <span>👥</span>
                <span>ABSS HRM (hrm.abssnexus.in)</span>
              </Link>
              <a className="bento-footer-link" href="https://www.intennexus.com" target="_blank" rel="noopener noreferrer">
                <span style={{ color: '#C084FC' }}>🎓</span>
                <span>IntenNexus Talent Hub</span>
              </a>
              <Link className="bento-footer-link" href="/ecosystem" style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginTop: '6px' }}>
                <span>✦</span>
                <span>Ecosystem Architecture &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Column 3: Engineering Disciplines */}
          <div>
            <h3 className="bento-footer-col-title">Core Disciplines</h3>
            <div className="bento-footer-links">
              <Link className="bento-footer-link" href="/services/website-development">Website Development</Link>
              <Link className="bento-footer-link" href="/services/software-development">Custom Software &amp; SaaS</Link>
              <Link className="bento-footer-link" href="/services/mobile-app-development">Mobile Apps (iOS &amp; Android)</Link>
              <Link className="bento-footer-link" href="/services/cloud-computing">Cloud &amp; DevOps Pipelines</Link>
              <Link className="bento-footer-link" href="/services/ai-machine-learning">AI &amp; Intelligent Workflows</Link>
              <Link className="bento-footer-link" href="/services/ecommerce-development">E-Commerce Platforms</Link>
              <Link className="bento-footer-link" href="/services/cybersecurity">Cybersecurity &amp; Audits</Link>
              <Link className="bento-footer-link" href="/services" style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginTop: '6px' }}>
                <span>View All 16 Disciplines &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Column 4: Company & Trust */}
          <div>
            <h3 className="bento-footer-col-title">Company &amp; Proof</h3>
            <div className="bento-footer-links">
              <Link className="bento-footer-link" href="/about">About ABSS Nexus</Link>
              <Link className="bento-footer-link" href="/portfolio">Portfolio &amp; Case Studies</Link>
              <Link className="bento-footer-link" href="/solutions">Enterprise Solutions</Link>
              <Link className="bento-footer-link" href="/industries">Industries We Serve</Link>
              <Link className="bento-footer-link" href="/pricing">Pricing &amp; Cost Estimator</Link>
              <Link className="bento-footer-link" href="/brand">Brand Identity &amp; Logos</Link>
              <Link className="bento-footer-link" href="/blog">Tech Blog &amp; Insights</Link>
              <Link className="bento-footer-link" href="/careers">Careers &amp; Culture</Link>
              <Link className="bento-footer-link" href="/faq">FAQ &amp; Knowledge Base</Link>
            </div>
          </div>

          {/* Column 5: Direct Contact & Headquarters */}
          <div>
            <h3 className="bento-footer-col-title">Direct Connect</h3>
            <div className="bento-footer-links" style={{ marginBottom: '14px' }}>
              <a className="bento-footer-link" href="tel:+917688899205" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                <span>📞</span>
                <span>+91 76888 99205</span>
              </a>
              <a
                className="bento-footer-link"
                href="https://wa.me/917688899205"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#10b981', fontWeight: 600 }}
              >
                <span>💬</span>
                <span>WhatsApp Founder</span>
              </a>
              <a className="bento-footer-link" href="mailto:abssnexus@gmail.com">
                <span>✉️</span>
                <span>abssnexus@gmail.com</span>
              </a>
              <span className="bento-footer-link" style={{ cursor: 'default' }}>
                <span>📍</span>
                <span>Jaipur, Rajasthan, India</span>
              </span>
              <span className="bento-footer-link" style={{ cursor: 'default' }}>
                <span>👤</span>
                <span>Shubham Kumar &mdash; Founder</span>
              </span>
              <span className="bento-footer-link" style={{ cursor: 'default', color: '#10b981', fontSize: '0.8rem' }}>
                <span>⏱️</span>
                <span>&lt; 24h Project Scoping SLA</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="bento-footer-bottom">
          <p>&copy; {currentYear} ABSS Nexus Technologies. All Rights Reserved. &bull; Parent Holding Entity of IntenNexus &amp; ABSS Cloud Platforms.</p>
          <div className="bento-footer-legal-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/terms-and-conditions#support-policy">Warranty &amp; Support SLA</Link>
            <Link href="/terms-and-conditions#refund-policy">Refund Policy</Link>
            <Link href="/sitemap.xml">XML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
