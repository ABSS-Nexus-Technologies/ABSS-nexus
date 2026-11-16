'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    <header className="site-header" role="banner" ref={headerRef}>
      <div className="announcement-bar">
        <div className="announcement-bar__container container">
          <span className="announcement-bar__badge">
            <span className="live-pulse-dot" aria-hidden="true"></span>
            <span>Accelerate Your Business Growth &bull; Enterprise IT Solutions, Web &amp; Cloud Engineering</span>
          </span>
          <Link className="announcement-bar__link" href="/contact#project-inquiry">
            Schedule Free Consultation &rarr;
          </Link>
        </div>
      </div>

      <nav className="nav" aria-label="Main Navigation">
        <Link className="brand" href="/" aria-label="ABSS Nexus Technologies home" title="ABSS Nexus Technologies">
          <picture>
            <source srcSet="/assets/images/favicon.webp" type="image/webp" />
            <img
              src="/assets/images/favicon.png"
              alt="ABSS Nexus Technologies logo"
              width={38}
              height={38}
              style={{ width: '38px', height: '38px' }}
            />
          </picture>
          <span className="brand-name">ABSS Nexus</span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-nav-links"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="main-nav-links">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>

          {/* Services Mega Menu Dropdown */}
          <div className={`nav-item-dropdown ${servicesOpen ? 'open' : ''}`}>
            <button
              className="nav-dropdown-trigger"
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => {
                setServicesOpen(!servicesOpen);
                setSolutionsOpen(false);
              }}
            >
              <span>Services</span>
              <svg className="dropdown-arrow" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className={`mega-menu mega-menu-services ${servicesOpen ? 'show' : ''}`} role="menu">
              <div className="mega-menu-grid">
                <div className="mega-col">
                  <div className="mega-col-title">Web Engineering</div>
                  <ul className="mega-link-list">
                    <li>
                      <Link className="mega-link" href="/services/website-development">
                        <span className="mega-link-title">Website Development</span>
                        <span className="mega-link-desc">High-speed business &amp; corporate platforms</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/ecommerce-development">
                        <span className="mega-link-title">E-Commerce Development</span>
                        <span className="mega-link-desc">Online storefronts &amp; fast checkout paths</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/digital-marketing-seo">
                        <span className="mega-link-title">Digital Marketing &amp; SEO</span>
                        <span className="mega-link-desc">Search rankings &amp; lead growth</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/ui-ux-design">
                        <span className="mega-link-title">UI/UX Design</span>
                        <span className="mega-link-desc">Figma wireframes &amp; design systems</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/website-maintenance">
                        <span className="mega-link-title">Website Maintenance</span>
                        <span className="mega-link-desc">Proactive updates, security &amp; backups</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mega-col">
                  <div className="mega-col-title">Software &amp; Cloud</div>
                  <ul className="mega-link-list">
                    <li>
                      <Link className="mega-link" href="/services/software-development">
                        <span className="mega-link-title">Software Development</span>
                        <span className="mega-link-desc">Custom web apps &amp; workflow software</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/mobile-app-development">
                        <span className="mega-link-title">Mobile App Development</span>
                        <span className="mega-link-desc">iOS &amp; Android cross-platform solutions</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/saas-development">
                        <span className="mega-link-title">SaaS Development</span>
                        <span className="mega-link-desc">Scalable cloud platforms &amp; client portals</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/cloud-computing">
                        <span className="mega-link-title">Cloud Computing &amp; DevOps</span>
                        <span className="mega-link-desc">Edge servers, CI/CD pipelines &amp; scaling</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/api-integration">
                        <span className="mega-link-title">API Integration</span>
                        <span className="mega-link-desc">Clean RESTful &amp; edge database APIs</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mega-col">
                  <div className="mega-col-title">Data, QA &amp; Support</div>
                  <ul className="mega-link-list">
                    <li>
                      <Link className="mega-link" href="/services/ai-machine-learning">
                        <span className="mega-link-title">AI &amp; Machine Learning</span>
                        <span className="mega-link-desc">Intelligent automation &amp; predictive models</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/data-analytics-bi">
                        <span className="mega-link-title">Data Analytics &amp; BI</span>
                        <span className="mega-link-desc">Real-time dashboards &amp; telemetry hubs</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/cybersecurity">
                        <span className="mega-link-title">Cybersecurity</span>
                        <span className="mega-link-desc">Vulnerability audits &amp; edge hardening</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/software-testing-qa">
                        <span className="mega-link-title">Software Testing &amp; QA</span>
                        <span className="mega-link-desc">End-to-end verification &amp; audits</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/it-consulting">
                        <span className="mega-link-title">IT Consulting &amp; Strategy</span>
                        <span className="mega-link-desc">Technology audits &amp; roadmap planning</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/services/managed-it-support">
                        <span className="mega-link-title">Managed IT Support</span>
                        <span className="mega-link-desc">24/7 technical monitoring &amp; maintenance</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mega-menu-footer-bar">
                <span>16 Comprehensive IT Disciplines Available</span>
                <Link href="/services">View Complete Service Catalog &rarr;</Link>
              </div>
            </div>
          </div>

          {/* Solutions Mega Menu Dropdown */}
          <div className={`nav-item-dropdown ${solutionsOpen ? 'open' : ''}`}>
            <button
              className="nav-dropdown-trigger"
              type="button"
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              onClick={() => {
                setSolutionsOpen(!solutionsOpen);
                setServicesOpen(false);
              }}
            >
              <span>Solutions</span>
              <svg className="dropdown-arrow" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className={`mega-menu mega-menu-solutions ${solutionsOpen ? 'show' : ''}`} role="menu">
              <div className="mega-menu-grid mega-menu-grid--solutions">
                <div className="mega-col">
                  <div className="mega-col-title">Enterprise Architecture</div>
                  <ul className="mega-link-list">
                    <li>
                      <Link className="mega-link" href="/solutions#automation">
                        <span className="mega-link-title">Business Process Automation</span>
                        <span className="mega-link-desc">Custom workflow engines &amp; queue automation</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/solutions#platforms">
                        <span className="mega-link-title">Custom Software Platforms</span>
                        <span className="mega-link-desc">Tailored relational databases &amp; admin controls</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/solutions#cloud">
                        <span className="mega-link-title">Cloud Adoption &amp; Modernization</span>
                        <span className="mega-link-desc">Serverless edge networks &amp; zero downtime</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-col">
                  <div className="mega-col-title">Integration &amp; Growth</div>
                  <ul className="mega-link-list">
                    <li>
                      <Link className="mega-link" href="/solutions#api">
                        <span className="mega-link-title">Connected Systems &amp; APIs</span>
                        <span className="mega-link-desc">Secure REST bridges &amp; CRM synchronization</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/solutions#conversion">
                        <span className="mega-link-title">High-Conversion Experiences</span>
                        <span className="mega-link-desc">Sub-second performance &amp; instant inquiries</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="mega-link" href="/solutions#strategy">
                        <span className="mega-link-title">Strategic Digital Transformation</span>
                        <span className="mega-link-desc">Architecture audits &amp; phased delivery roadmaps</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mega-menu-footer-bar">
                <span>Outcome-Driven Technical Frameworks</span>
                <Link href="/solutions">Explore All Solutions &rarr;</Link>
              </div>
            </div>
          </div>

          <Link href="/industries" className={`nav-link ${pathname === '/industries' ? 'active' : ''}`}>
            Industries
          </Link>
          <Link href="/work" className={`nav-link ${pathname?.startsWith('/work') ? 'active' : ''}`}>
            Work
          </Link>
          <Link href="/pricing" className={`nav-link ${pathname === '/pricing' ? 'active' : ''}`}>
            Pricing
          </Link>
          <Link href="/blog" className={`nav-link ${pathname?.startsWith('/blog') ? 'active' : ''}`}>
            Blog
          </Link>
          <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
          <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>
            Contact
          </Link>
          <Link className="nav-cta" href="/contact#project-inquiry">
            Start Project
          </Link>
        </div>
      </nav>
    </header>
  );
}
