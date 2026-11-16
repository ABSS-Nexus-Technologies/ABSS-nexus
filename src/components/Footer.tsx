import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bento-footer" role="contentinfo">
      <div className="bento-container">
        <div className="bento-footer-grid">
          {/* Column 1: Brand & Status */}
          <div>
            <Link href="/" aria-label="ABSS Nexus Technologies home" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '14px' }}>
              <picture>
                <source srcSet="/assets/images/crystalline-apex/crystalline-symbol.svg" type="image/svg+xml" />
                <source srcSet="/assets/images/favicon.webp" type="image/webp" />
                <img
                  src="/assets/images/favicon.png"
                  alt="ABSS Nexus Technologies logo"
                  width={38}
                  height={38}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '38px', height: '38px', borderRadius: '8px' }}
                />
              </picture>
              <div className="bento-brand-stacked">
                <span className="bento-brand-top" style={{ fontSize: '1.2rem' }}>ABSS NEXUS</span>
                <span className="bento-brand-bottom" style={{ fontSize: '0.62rem' }}>TECHNOLOGIES</span>
              </div>
            </Link>
            <p className="bento-footer-brand-desc">
              Parent entity powering Global IT Services, the ABSS Business SaaS Suite (ERP, CRM, HRM), and the IntenNexus developer talent incubator.
            </p>
            <div style={{ marginTop: '14px' }}>
              <span className="bento-footer-status">
                <span className="live-pulse-dot" aria-hidden="true" />
                <span>Ecosystem Active &bull; All Subdomains Live</span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="bento-footer-col-title">Navigation</h3>
            <div className="bento-footer-links">
              <Link className="bento-footer-link" href="/">Home</Link>
              <Link className="bento-footer-link" href="/ecosystem" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Our Ecosystem (3 Pillars)</Link>
              <Link className="bento-footer-link" href="/about">About Us</Link>
              <Link className="bento-footer-link" href="/services">Services Catalog</Link>
              <Link className="bento-footer-link" href="/solutions">Solutions</Link>
              <Link className="bento-footer-link" href="/industries">Industries</Link>
              <Link className="bento-footer-link" href="/work">Work / Portfolio</Link>
              <Link className="bento-footer-link" href="/pricing">Pricing Plans</Link>
              <Link className="bento-footer-link" href="/brand">Brand Identity &amp; Logos</Link>
              <Link className="bento-footer-link" href="/careers">Careers</Link>
              <Link className="bento-footer-link" href="/blog">Blog &amp; Insights</Link>
              <Link className="bento-footer-link" href="/contact">Contact</Link>
            </div>
          </div>

          {/* Column 3: Ecosystem Divisions & Core Services */}
          <div>
            <h3 className="bento-footer-col-title">Ecosystem &amp; SaaS</h3>
            <div className="bento-footer-links">
              <Link className="bento-footer-link" href="/services">ABSS IT Services (16 Disciplines)</Link>
              <Link className="bento-footer-link" href="/ecosystem#business-saas">📦 ABSS ERP (erp.abssnexus.in)</Link>
              <Link className="bento-footer-link" href="/ecosystem#business-saas">🤝 ABSS CRM (crm.abssnexus.in)</Link>
              <Link className="bento-footer-link" href="/ecosystem#business-saas">👥 ABSS HRM (hrm.abssnexus.in)</Link>
              <Link className="bento-footer-link" href="/ecosystem#intennexus" style={{ color: '#C084FC' }}>🎓 IntenNexus (Talent Incubator)</Link>
              <Link className="bento-footer-link" href="/services/website-development">Website Development</Link>
              <Link className="bento-footer-link" href="/services/software-development">Software Development</Link>
              <Link className="bento-footer-link" href="/services/cloud-computing">Cloud &amp; DevOps</Link>
            </div>
          </div>

          {/* Column 4: Contact & Socials */}
          <div>
            <h3 className="bento-footer-col-title">Direct Contact</h3>
            <div className="bento-footer-links" style={{ marginBottom: '18px' }}>
              <a className="bento-footer-link" href="tel:+917688899205">Phone: +91 76888 99205</a>
              <a className="bento-footer-link" href="mailto:abssnexus@gmail.com">Email: abssnexus@gmail.com</a>
              <span className="bento-footer-link" style={{ cursor: 'default' }}>Location: Jaipur, Rajasthan, India</span>
              <span className="bento-footer-link" style={{ cursor: 'default' }}>Shubham Kumar &mdash; Founder</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <a
                className="bento-tech-pill"
                href="https://www.instagram.com/abssnexus/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              >
                Instagram
              </a>
              <a
                className="bento-tech-pill"
                href="https://x.com/abssnexus"
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              >
                X / Twitter
              </a>
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
            <Link href="/terms-and-conditions#support-policy">Warranty &amp; Support SLA</Link>
            <Link href="/terms-and-conditions#refund-policy">Refund Policy</Link>
            <Link href="/sitemap.xml">XML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
