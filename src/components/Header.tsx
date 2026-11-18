'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeAllDropdowns = () => {
    setEcosystemOpen(false);
    setServicesOpen(false);
    setSolutionsOpen(false);
    setCompanyOpen(false);
  };

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    closeAllDropdowns();
  }, [pathname]);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeAllDropdowns();
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
        <span className="bento-announcement-text">Accelerate Growth with Enterprise IT, Next.js 16 &amp; Cloud Automation</span>
        <span className="bento-announcement-divider" style={{ opacity: 0.4 }}>|</span>
        <Link className="bento-announcement-link" href="/contact#project-inquiry">
          Book Free Consultation &rarr;
        </Link>
      </div>

      {/* Floating Pill Glass Navbar */}
      <div className="bento-nav-wrapper">
        <nav className="bento-nav-bar" aria-label="Main Navigation">
          {/* Brand Logo & Name (Clicks Home) */}
          <Link className="bento-brand" href="/" aria-label="ABSS Nexus Technologies home">
            <picture>
              <source srcSet="/assets/images/crystalline-apex/crystalline-symbol.svg" type="image/svg+xml" />
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

          {/* Desktop Nav Links (6 Focused, Luxury Menu Items) */}
          <div className="bento-nav-links">
            {/* 1. ECOSYSTEM DROPDOWN */}
            <div className={`bento-dropdown-wrapper ${ecosystemOpen ? 'open' : ''}`}>
              <button
                className={`bento-nav-link ${pathname === '/ecosystem' ? 'active' : ''}`}
                type="button"
                aria-expanded={ecosystemOpen}
                onClick={() => {
                  setEcosystemOpen(!ecosystemOpen);
                  setServicesOpen(false);
                  setSolutionsOpen(false);
                  setCompanyOpen(false);
                }}
              >
                <span>Ecosystem</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: ecosystemOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="bento-dropdown-menu" style={{ width: '660px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-cyan)' }}>
                      Parent Holding Conglomerate
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Operating across 3 core synergistic divisions
                    </div>
                  </div>
                  <Link href="/ecosystem" className="saas-subdomain-pill" style={{ textDecoration: 'none' }}>
                    <span className="dot" />
                    <span>View All 3 Pillars</span>
                  </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <Link href="/ecosystem#it-services" className="bento-dropdown-card">
                    <div style={{ fontSize: '1.25rem', marginBottom: '6px' }}>⚡</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#00D4FF', marginBottom: '4px' }}>IT Services</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>16 Engineering disciplines, bespoke web &amp; cloud systems.</div>
                  </Link>

                  <Link href="/ecosystem#business-saas" className="bento-dropdown-card">
                    <div style={{ fontSize: '1.25rem', marginBottom: '6px' }}>💼</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38BDF8', marginBottom: '4px' }}>Business SaaS</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>ABSS ERP, CRM &amp; HRM on free subdomains.</div>
                  </Link>

                  <a href="https://www.intennexus.com" target="_blank" rel="noopener noreferrer" className="bento-dropdown-card">
                    <div style={{ fontSize: '1.25rem', marginBottom: '6px' }}>🎓</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#A855F7', marginBottom: '4px' }}>IntenNexus</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Talent incubator &amp; live project internships.</div>
                  </a>
                </div>

                <div className="bento-dropdown-footer">
                  <span>Meta / Alphabet Holding Operating Model</span>
                  <Link href="/ecosystem">Explore Conglomerate Architecture &rarr;</Link>
                </div>
              </div>
            </div>

            {/* 2. SERVICES DROPDOWN */}
            <div className={`bento-dropdown-wrapper ${servicesOpen ? 'open' : ''}`}>
              <button
                className={`bento-nav-link ${pathname?.startsWith('/services') ? 'active' : ''}`}
                type="button"
                aria-expanded={servicesOpen}
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setEcosystemOpen(false);
                  setSolutionsOpen(false);
                  setCompanyOpen(false);
                }}
              >
                <span>Services</span>
                <svg
                  width="13"
                  height="13"
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

            {/* 3. SOLUTIONS & INDUSTRIES DROPDOWN */}
            <div className={`bento-dropdown-wrapper ${solutionsOpen ? 'open' : ''}`}>
              <button
                className={`bento-nav-link ${pathname === '/solutions' || pathname === '/industries' ? 'active' : ''}`}
                type="button"
                aria-expanded={solutionsOpen}
                onClick={() => {
                  setSolutionsOpen(!solutionsOpen);
                  setEcosystemOpen(false);
                  setServicesOpen(false);
                  setCompanyOpen(false);
                }}
              >
                <span>Solutions</span>
                <svg
                  width="13"
                  height="13"
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

              <div className="bento-dropdown-menu" style={{ width: '580px' }}>
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
                    <Link className="bento-dropdown-item" href="/solutions#api">
                      <span className="bento-dropdown-item-title">Connected APIs</span>
                      <span className="bento-dropdown-item-desc">Secure REST bridges &amp; CRM sync</span>
                    </Link>
                  </div>

                  <div>
                    <div className="bento-dropdown-col-title">Industries We Serve</div>
                    <Link className="bento-dropdown-item" href="/industries#healthcare">
                      <span className="bento-dropdown-item-title">Healthcare &amp; MedTech</span>
                      <span className="bento-dropdown-item-desc">HIPAA-ready clinical systems</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/industries#fintech">
                      <span className="bento-dropdown-item-title">FinTech &amp; Banking</span>
                      <span className="bento-dropdown-item-desc">PCI-DSS compliance &amp; ledger sync</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/industries#ecommerce">
                      <span className="bento-dropdown-item-title">Retail &amp; E-Commerce</span>
                      <span className="bento-dropdown-item-desc">High-volume cart &amp; inventory</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/industries#logistics">
                      <span className="bento-dropdown-item-title">Logistics &amp; Supply Chain</span>
                      <span className="bento-dropdown-item-desc">Fleet telemetry &amp; dispatching</span>
                    </Link>
                  </div>
                </div>

                <div className="bento-dropdown-footer">
                  <span>Tailored Technical Frameworks</span>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Link href="/solutions">All Solutions &rarr;</Link>
                    <Link href="/industries">All Industries &rarr;</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. WORK / CASE STUDIES (Direct Link) */}
            <Link href="/work" className={`bento-nav-link ${pathname?.startsWith('/work') ? 'active' : ''}`}>
              Work
            </Link>

            {/* 5. PRICING (Direct Link) */}
            <Link href="/pricing" className={`bento-nav-link ${pathname === '/pricing' ? 'active' : ''}`}>
              Pricing
            </Link>

            {/* 6. COMPANY DROPDOWN (About, Brand, Blog, Careers, Contact) */}
            <div className={`bento-dropdown-wrapper ${companyOpen ? 'open' : ''}`}>
              <button
                className={`bento-nav-link ${
                  pathname === '/about' ||
                  pathname === '/brand' ||
                  pathname === '/faq' ||
                  pathname?.startsWith('/blog') ||
                  pathname?.startsWith('/careers') ||
                  pathname === '/contact'
                    ? 'active'
                    : ''
                }`}
                type="button"
                aria-expanded={companyOpen}
                onClick={() => {
                  setCompanyOpen(!companyOpen);
                  setEcosystemOpen(false);
                  setServicesOpen(false);
                  setSolutionsOpen(false);
                }}
              >
                <span>Company</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: companyOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="bento-dropdown-menu" style={{ width: '520px' }}>
                <div className="bento-dropdown-grid two-cols">
                  <div>
                    <div className="bento-dropdown-col-title">Organization</div>
                    <Link className="bento-dropdown-item" href="/about">
                      <span className="bento-dropdown-item-title">About ABSS Nexus</span>
                      <span className="bento-dropdown-item-desc">Holding model, vision &amp; founder story</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/brand">
                      <span className="bento-dropdown-item-title">Brand Identity &amp; Logos</span>
                      <span className="bento-dropdown-item-desc">3D Crystalline assets &amp; guidelines</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/careers">
                      <span className="bento-dropdown-item-title">Careers &amp; Culture</span>
                      <span className="bento-dropdown-item-desc">High-impact engineering openings</span>
                    </Link>
                  </div>

                  <div>
                    <div className="bento-dropdown-col-title">Insights &amp; Outreach</div>
                    <Link className="bento-dropdown-item" href="/blog">
                      <span className="bento-dropdown-item-title">Tech Insights &amp; Blog</span>
                      <span className="bento-dropdown-item-desc">Next.js 16, edge &amp; cloud architecture</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/faq">
                      <span className="bento-dropdown-item-title">FAQ &amp; Help</span>
                      <span className="bento-dropdown-item-desc">Timelines, IP ownership &amp; pricing</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/contact">
                      <span className="bento-dropdown-item-title">Direct Contact</span>
                      <span className="bento-dropdown-item-desc">Office, WhatsApp &amp; direct inquiries</span>
                    </Link>
                    <Link className="bento-dropdown-item" href="/terms-and-conditions#support-policy">
                      <span className="bento-dropdown-item-title">Client Warranty &amp; SLA</span>
                      <span className="bento-dropdown-item-desc">Code guarantees &amp; 99.98% uptime</span>
                    </Link>
                  </div>
                </div>

                <div className="bento-dropdown-footer">
                  <span>Founded by Shubham Kumar &bull; Jaipur, India</span>
                  <Link href="/about">Company Overview &rarr;</Link>
                </div>
              </div>
            </div>
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

          {/* Clean Categorized Mobile Drawer */}
          <div className={`bento-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="bento-mobile-group-title">Ecosystem &amp; Operating Ventures</div>
            <Link href="/ecosystem" className="bento-nav-link">✦ Ecosystem Overview (3 Pillars)</Link>
            <Link href="/services" className="bento-nav-link">⚡ ABSS IT Services (16 Disciplines)</Link>
            <Link href="/ecosystem#business-saas" className="bento-nav-link">💼 Business SaaS (ERP, CRM, HRM)</Link>
            <a href="https://www.intennexus.com" target="_blank" rel="noopener noreferrer" className="bento-nav-link">🎓 IntenNexus Talent Incubator</a>

            <div className="bento-mobile-group-title">Capabilities &amp; Proof</div>
            <Link href="/solutions" className="bento-nav-link">Solutions Architecture</Link>
            <Link href="/industries" className="bento-nav-link">Industries We Serve</Link>
            <Link href="/work" className="bento-nav-link">Work &amp; Case Studies</Link>
            <Link href="/pricing" className="bento-nav-link">Pricing &amp; Cost Estimator</Link>

            <div className="bento-mobile-group-title">Company &amp; Resources</div>
            <Link href="/about" className="bento-nav-link">About ABSS Nexus</Link>
            <Link href="/brand" className="bento-nav-link">Brand Identity &amp; Logos</Link>
            <Link href="/blog" className="bento-nav-link">Tech Blog &amp; Insights</Link>
            <Link href="/faq" className="bento-nav-link">FAQ &amp; Knowledge Base</Link>
            <Link href="/careers" className="bento-nav-link">Careers</Link>
            <Link href="/contact" className="bento-nav-link">Contact Us</Link>

            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
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
