'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
        setSolutionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="site-header-bento" role="banner" ref={headerRef}>
      {/* Top Announcement Bar */}
      <div className="bento-announcement">
        <span className="live-pulse-dot" aria-hidden="true" />
        <span>Accelerate Growth with Enterprise IT, Next.js 16 &amp; Cloud Automation</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <Link className="bento-announcement-link" href="/contact#project-inquiry">
          Book Free Consultation &rarr;
        </Link>
      </div>

      {/* Floating Pill Glass Navbar */}
      <div className="bento-nav-wrapper">
        <nav className="bento-nav-bar" aria-label="Main Navigation">
          {/* Brand Logo & Name */}
          <Link className="bento-brand" href="/" aria-label="ABSS Nexus Technologies home">
            <picture>
              <source srcSet="/assets/images/apex-prism/apex-prism-symbol.svg" type="image/svg+xml" />
              <source srcSet="/assets/images/favicon.webp" type="image/webp" />
              <img
                src="/assets/images/favicon.png"
                alt="ABSS Nexus Technologies logo"
                width={36}
                height={36}
                style={{ width: '36px', height: '36px', borderRadius: '8px' }}
              />
            </picture>
            <div className="bento-brand-stacked">
              <span className="bento-brand-top">ABSS NEXUS</span>
              <span className="bento-brand-bottom">TECHNOLOGIES</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="bento-nav-links">
            <Link href="/" className={`bento-nav-link ${pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>

            {/* Services Dropdown */}
            <div className={`bento-dropdown-wrapper ${servicesOpen ? 'open' : ''}`}>
              <button
                className="bento-nav-link"
                type="button"
                aria-expanded={servicesOpen}
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setSolutionsOpen(false);
                }}
              >
                <span>Services</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="bento-dropdown-menu">
                <div className="bento-dropdown-grid">
                  <div>
                    <div className="bento-dropdown-col-title">Web Engineering</div>
                    <Link className="bento-dropdown-item" href="/services/website-development">
                      <span className="bento-dropdown-item-title">Website Development</span>
                      <span className="bento-dropdown-item-desc">High-speed business platforms</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/services/ecommerce-development">
                      <span className="bento-dropdown-item-title">E-Commerce Development</span>
                      <span className="bento-dropdown-item-desc">Custom online storefronts</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/services/digital-marketing-seo">
                      <span className="bento-dropdown-item-title">Digital Marketing &amp; SEO</span>
                      <span className="bento-dropdown-item-desc">Search rankings &amp; organic growth</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/services/ui-ux-design">
                      <span className="bento-dropdown-item-title">UI/UX Design</span>
                      <span className="bento-dropdown-item-desc">Figma systems &amp; user experience</span>
                    </Link>
                  </div>

                  <div>
                    <div className="bento-dropdown-col-title">Software &amp; Cloud</div>
                    <Link className="bento-dropdown-item" href="/services/software-development">
                      <span className="bento-dropdown-item-title">Software Development</span>
                      <span className="bento-dropdown-item-desc">Custom web apps &amp; workflows</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/services/mobile-app-development">
                      <span className="bento-dropdown-item-title">Mobile App Development</span>
                      <span className="bento-dropdown-item-desc">iOS &amp; Android cross-platform</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/services/saas-development">
                      <span className="bento-dropdown-item-title">SaaS Development</span>
                      <span className="bento-dropdown-item-desc">Scalable multitenant cloud software</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/services/cloud-computing">
                      <span className="bento-dropdown-item-title">Cloud Computing &amp; DevOps</span>
                      <span className="bento-dropdown-item-desc">Edge servers &amp; CI/CD pipelines</span>
                    </Link>
                  </div>

                  <div>
                    <div className="bento-dropdown-col-title">Data, QA &amp; AI</div>
                    <Link className="bento-dropdown-item" href="/services/ai-machine-learning">
                      <span className="bento-dropdown-item-title">AI &amp; Machine Learning</span>
                      <span className="bento-dropdown-item-desc">Predictive models &amp; automation</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/services/data-analytics-bi">
                      <span className="bento-dropdown-item-title">Data Analytics &amp; BI</span>
                      <span className="bento-dropdown-item-desc">Real-time telemetry dashboards</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/services/cybersecurity">
                      <span className="bento-dropdown-item-title">Cybersecurity</span>
                      <span className="bento-dropdown-item-desc">Vulnerability audits &amp; edge hardening</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/services/software-testing-qa">
                      <span className="bento-dropdown-item-title">Software Testing &amp; QA</span>
                      <span className="bento-dropdown-item-desc">End-to-end quality assurance</span>
                    </Link>
                  </div>
                </div>

                <div className="bento-dropdown-footer">
                  <span>16 Comprehensive IT Disciplines Available</span>
                  <Link href="/services">View Complete Service Catalog &rarr;</Link>
                </div>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className={`bento-dropdown-wrapper ${solutionsOpen ? 'open' : ''}`}>
              <button
                className="bento-nav-link"
                type="button"
                aria-expanded={solutionsOpen}
                onClick={() => {
                  setSolutionsOpen(!solutionsOpen);
                  setServicesOpen(false);
                }}
              >
                <span>Solutions</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="bento-dropdown-menu" style={{ width: '560px' }}>
                <div className="bento-dropdown-grid two-cols">
                  <div>
                    <div className="bento-dropdown-col-title">Enterprise Architecture</div>
                    <Link className="bento-dropdown-item" href="/solutions#automation">
                      <span className="bento-dropdown-item-title">Process Automation</span>
                      <span className="bento-dropdown-item-desc">Workflow automation engines</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/solutions#platforms">
                      <span className="bento-dropdown-item-title">Custom Software Platforms</span>
                      <span className="bento-dropdown-item-desc">Relational databases &amp; controls</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/solutions#cloud">
                      <span className="bento-dropdown-item-title">Cloud Modernization</span>
                      <span className="bento-dropdown-item-desc">Serverless edge &amp; zero downtime</span>
                    </Link>
                  </div>

                  <div>
                    <div className="bento-dropdown-col-title">Connected Systems</div>
                    <Link className="bento-dropdown-item" href="/solutions#api">
                      <span className="bento-dropdown-item-title">Connected APIs</span>
                      <span className="bento-dropdown-item-desc">Secure REST bridges &amp; CRM sync</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/solutions#conversion">
                      <span className="bento-dropdown-item-title">High-Conversion UX</span>
                      <span className="bento-dropdown-item-desc">Sub-second performance</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/solutions#strategy">
                      <span className="bento-dropdown-item-title">Digital Transformation</span>
                      <span className="bento-dropdown-item-desc">Audits &amp; delivery roadmaps</span>
                    </Link>
                  </div>
                </div>

                <div className="bento-dropdown-footer">
                  <span>Outcome-Driven Technical Frameworks</span>
                  <Link href="/solutions">Explore All Solutions &rarr;</Link>
                </div>
              </div>
            </div>

            <Link href="/industries" className={`bento-nav-link ${pathname === '/industries' ? 'active' : ''}`}>
              Industries
            </Link>
            <Link href="/work" className={`bento-nav-link ${pathname?.startsWith('/work') ? 'active' : ''}`}>
              Work
            </Link>
            <Link href="/pricing" className={`bento-nav-link ${pathname === '/pricing' ? 'active' : ''}`}>
              Pricing
            </Link>
            <Link href="/brand" className={`bento-nav-link ${pathname === '/brand' ? 'active' : ''}`}>
              Brand
            </Link>
            <Link href="/blog" className={`bento-nav-link ${pathname?.startsWith('/blog') ? 'active' : ''}`}>
              Blog
            </Link>
            <Link href="/about" className={`bento-nav-link ${pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
            <Link href="/contact" className={`bento-nav-link ${pathname === '/contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </div>

          {/* Right Action: Theme Toggle & Start Project CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeToggle />
            <Link className="bento-nav-cta" href="/contact#project-inquiry">
              Start Project
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className="bento-mobile-toggle"
              type="button"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Drawer */}
          <div className={`bento-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
            <Link href="/" className="bento-nav-link">Home</Link>
            <Link href="/services" className="bento-nav-link">Services (16 Disciplines)</Link>
            <Link href="/solutions" className="bento-nav-link">Solutions</Link>
            <Link href="/industries" className="bento-nav-link">Industries</Link>
            <Link href="/work" className="bento-nav-link">Work &amp; Case Studies</Link>
            <Link href="/pricing" className="bento-nav-link">Pricing</Link>
            <Link href="/brand" className="bento-nav-link">Brand Identity &amp; Logos</Link>
            <Link href="/blog" className="bento-nav-link">Blog</Link>
            <Link href="/about" className="bento-nav-link">About</Link>
            <Link href="/contact" className="bento-nav-link">Contact</Link>
            <div style={{ marginTop: '12px' }}>
              <Link className="bento-btn-primary" href="/contact#project-inquiry" style={{ width: '100%', justifyContent: 'center' }}>
                Start Project Now &rarr;
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
