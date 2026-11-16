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
              Building high-performance digital solutions, modern web platforms, and automated cloud systems for enterprises and growing businesses.
            </p>
            <div style={{ marginTop: '14px' }}>
              <span className="bento-footer-status">
                <span className="live-pulse-dot" aria-hidden="true" />
                <span>All Systems Operational &bull; Edge Active</span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="bento-footer-col-title">Navigation</h3>
            <div className="bento-footer-links">
              <Link className="bento-footer-link" href="/">Home</Link>
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

          {/* Column 3: Key Services */}
          <div>
            <h3 className="bento-footer-col-title">Core Services</h3>
            <div className="bento-footer-links">
              <Link className="bento-footer-link" href="/services/website-development">Website Development</Link>
              <Link className="bento-footer-link" href="/services/software-development">Software Development</Link>
              <Link className="bento-footer-link" href="/services/mobile-app-development">Mobile App Dev</Link>
              <Link className="bento-footer-link" href="/services/ui-ux-design">UI/UX Design Systems</Link>
              <Link className="bento-footer-link" href="/services/ai-machine-learning">AI &amp; Automations</Link>
              <Link className="bento-footer-link" href="/services/cloud-computing">Cloud Computing</Link>
              <Link className="bento-footer-link" href="/services/cybersecurity">Cybersecurity Audits</Link>
              <Link className="bento-footer-link" href="/services/saas-development">SaaS Development</Link>
              <Link className="bento-footer-link" href="/services" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>All 16 Disciplines &rarr;</Link>
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
          <p>&copy; {currentYear} ABSS Nexus Technologies. All Rights Reserved.</p>
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
