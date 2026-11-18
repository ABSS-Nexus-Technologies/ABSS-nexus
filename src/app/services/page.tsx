import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { servicesData } from '@/src/lib/data/services';
import TrustBar from '@/src/components/TrustBar';
import HeroBackdrop from '@/src/components/HeroBackdrop';

export const metadata: Metadata = {
  title: 'All 16 IT Services & Engineering Disciplines | ABSS Nexus Technologies',
  description:
    'Comprehensive catalog of corporate IT services: custom website development, enterprise software, cloud computing, cybersecurity, mobile apps, and 24/7 managed support.',
};

export default function ServicesPage() {
  return (
    <main>
      {/* Services Hero */}
      <section className="bento-hero-section" id="hero" style={{ padding: '40px 0 30px' }}>
        <HeroBackdrop variant="services" />
        <div className="bento-container" style={{ textAlign: 'center' }}>
          <div className="bento-pill-badge">
            <span className="live-pulse-dot" aria-hidden="true" />
            <span>Complete Engineering Catalog &bull; 16 Disciplines</span>
          </div>
          <h1 className="bento-hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
            Comprehensive IT, Web &amp; <span className="gradient-text-hero">Software Services</span>
          </h1>
          <p className="bento-hero-subtitle" style={{ maxWidth: '720px' }}>
            From high-speed responsive business websites to modular cloud systems, AI integrations, and proactive managed
            support. ABSS Nexus Technologies provides end-to-end digital engineering engineered for reliability, security,
            and measurable conversion.
          </p>

          <div className="bento-hero-actions">
            <Link className="bento-btn-primary" href="/contact#project-inquiry">
              <span>Discuss Your Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link className="bento-btn-glass" href="/pricing">
              <span>View Pricing Packages</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Ecosystem Bar */}
      <TrustBar />

      {/* All 16 Services Bento Grid */}
      <section className="bento-section" style={{ paddingTop: '50px' }}>
        <div className="bento-container">
          <div className="bento-section-header">
            <span className="bento-section-eyebrow">16 Specialized Disciplines</span>
            <h2 className="bento-section-title">Explore Our Complete Service Capabilities</h2>
            <p className="bento-section-subtitle">
              Every service is delivered with clean architecture, accessible contrast, transparent milestones, and
              founder-led communication.
            </p>
          </div>

          <div className="services-bento-grid">
            {servicesData.map((service) => (
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
        </div>
      </section>

      {/* Radiant Consultation Banner */}
      <section className="bento-section" style={{ paddingTop: '10px' }}>
        <div className="bento-container">
          <div className="bento-cta-box">
            <span className="bento-section-eyebrow">Technical Advisory</span>
            <h2 className="bento-cta-title">Need a Tailored Technical Consultation?</h2>
            <p className="bento-cta-desc">
              Not sure which tech stack or architecture fits your roadmap? Schedule a zero-obligation architecture
              consultation directly with our engineering team.
            </p>
            <div className="bento-cta-actions">
              <Link className="bento-btn-primary" href="/contact#project-inquiry">
                Schedule Consultation &rarr;
              </Link>
              <a
                className="bento-btn-whatsapp"
                href="https://wa.me/917688899205?text=Hi%20Shubham%2C%20I%20saw%20your%20portfolio%20on%20ABSS%20Nexus%20Technologies%20and%20I%20want%20to%20discuss%20a%20new%20project."
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
