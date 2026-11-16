import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__container container">
        <div className="site-footer__grid footer-grid">
          {/* Column 1: Brand */}
          <div className="site-footer__brand footer-brand">
            <Link className="site-footer__logo-link" href="/" aria-label="ABSS Nexus Technologies home">
              <picture>
                <source srcSet="/assets/images/LogoGenerated.webp" type="image/webp" />
                <img
                  className="site-footer__logo"
                  src="/assets/images/LogoGenerated.png"
                  alt="ABSS Nexus Technologies logo"
                  width={160}
                  height={38}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </Link>
            <p className="site-footer__brand-title footer-brand-title">ABSS Nexus Technologies</p>
            <p className="site-footer__brand-desc">
              Building high-performance digital solutions for businesses, startups, institutions, and growing brands.
            </p>
            <strong className="site-footer__tagline">Innovate &bull; Solve &bull; Elevate</strong>
            <div>
              <span className="site-footer__status footer-system-status">
                <span className="site-footer__status-pulse live-pulse-dot" aria-hidden="true"></span>
                <span>All Systems Operational &bull; Edge Active</span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="site-footer__col footer-column">
            <h3 className="site-footer__col-title">Quick Links</h3>
            <Link className="site-footer__link" href="/">Home</Link>
            <Link className="site-footer__link" href="/about">About</Link>
            <Link className="site-footer__link" href="/services">Services</Link>
            <Link className="site-footer__link" href="/solutions">Solutions</Link>
            <Link className="site-footer__link" href="/industries">Industries</Link>
            <Link className="site-footer__link" href="/work">Work</Link>
            <Link className="site-footer__link" href="/careers">Careers</Link>
            <Link className="site-footer__link" href="/blog">Blog</Link>
            <Link className="site-footer__link" href="/faq">FAQ</Link>
            <Link className="site-footer__link" href="/pricing">Pricing</Link>
            <Link className="site-footer__link" href="/contact">Contact</Link>
          </div>

          {/* Column 3: Our Services */}
          <div className="site-footer__col footer-column">
            <h3 className="site-footer__col-title">Our Services</h3>
            <Link className="site-footer__link" href="/services/website-development">Website Development</Link>
            <Link className="site-footer__link" href="/services/software-development">Software Development</Link>
            <Link className="site-footer__link" href="/services/mobile-app-development">Mobile App Development</Link>
            <Link className="site-footer__link" href="/services/ui-ux-design">UI/UX Design</Link>
            <Link className="site-footer__link" href="/services/ai-machine-learning">AI &amp; Machine Learning</Link>
            <Link className="site-footer__link" href="/services/cloud-computing">Cloud Computing</Link>
            <Link className="site-footer__link" href="/services/cybersecurity">Cybersecurity</Link>
            <Link className="site-footer__link" href="/services/data-analytics-bi">Data Analytics</Link>
            <Link className="site-footer__link" href="/services/ecommerce-development">E-Commerce Development</Link>
            <Link className="site-footer__link" href="/services/saas-development">SaaS Development</Link>
            <Link className="site-footer__link" href="/services">All 16 Services &rarr;</Link>
          </div>

          {/* Column 4: Contact Info */}
          <div className="site-footer__col site-footer__contact footer-column footer-contact">
            <h3 className="site-footer__col-title">Contact Info</h3>
            <a className="site-footer__link" href="tel:+918757928673">Phone: +91 87579 28673</a>
            <a className="site-footer__link" href="mailto:abssnexus@gmail.com">Email: abssnexus@gmail.com</a>
            <span className="site-footer__contact-item">Location: Jaipur, Rajasthan, India</span>
            <span className="site-footer__contact-item">Shubham Kumar &mdash; Founder</span>
            <span className="site-footer__contact-item">Consultation &amp; Advisory: Open 2026</span>
          </div>
        </div>

        {/* Divider & Lower Footer Bar */}
        <div className="site-footer__bottom footer-lower">
          <div className="site-footer__socials footer-socials" aria-label="Social media profiles">
            <a className="site-footer__social-link" href="https://www.instagram.com/abssnexus/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            <a className="site-footer__social-link" href="https://www.facebook.com/profile.php?id=61592563923350" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            <a className="site-footer__social-link" href="https://x.com/abssnexus" target="_blank" rel="noopener noreferrer" aria-label="X">X / Twitter</a>
          </div>
          <nav className="site-footer__legal footer-legal" aria-label="Legal documents">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/support-policy">Support Policy</Link>
            <Link href="/sitemap">Sitemap</Link>
          </nav>
        </div>

        {/* Copyright Row */}
        <div className="site-footer__copy footer-copy">
          <p>&copy; <span className="site-footer__year">{currentYear}</span> ABSS Nexus Technologies. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
