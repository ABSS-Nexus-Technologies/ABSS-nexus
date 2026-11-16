import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { servicesData } from '@/src/lib/data/services';

export const metadata: Metadata = {
  title: 'All 16 IT Services & Engineering Disciplines',
  description:
    'Comprehensive catalog of corporate IT services: custom website development, enterprise software, cloud computing, cybersecurity, mobile apps, and 24/7 managed support.',
};

export default function ServicesPage() {
  return (
    <main>
      {/* Services Hero */}
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">
            <span className="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Complete Engineering Catalog</span>
          </span>
          <h1 className="site-hero__title">Comprehensive IT, Web &amp; Software Engineering Services</h1>
          <p className="site-hero__description">
            From high-speed responsive business websites to modular cloud systems, AI integrations, and proactive managed
            support. ABSS Nexus Technologies provides end-to-end digital engineering engineered for reliability, security,
            and measurable conversion.
          </p>

          <div className="site-hero__actions hero-actions">
            <Link className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan" href="/contact#project-inquiry">
              <span>Discuss Your Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/pricing">
              <span>View Pricing Packages</span>
            </Link>
          </div>
        </div>
      </section>

      {/* All 16 Services Grid */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">16 Specialized Disciplines</p>
            <h2>Explore Our Complete IT &amp; Engineering Disciplines</h2>
            <p>
              Every service is delivered with clean architecture, accessible contrast, transparent milestones, and
              founder-led communication.
            </p>
          </div>

          <div className="cinematic-services-grid" style={{ marginTop: '32px' }}>
            {servicesData.map((service) => (
              <Link className="cinematic-service-card" href={`/services/${service.slug}`} key={service.id}>
                <span className="cinematic-card-badge">{service.badge}</span>
                <h3>{service.title}</h3>
                <p>{service.shortDesc}</p>
                <ul className="cinematic-features-tags">
                  {service.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <span className="cinematic-card-cta">Explore Service Details &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Transition Consultation Banner */}
      <section className="section cta-band">
        <div className="container">
          <div className="radiant-cta-box">
            <p className="eyebrow">Technical Advisory</p>
            <h2>Need a Tailored Technical Consultation?</h2>
            <p>
              Not sure which tech stack or architecture fits your roadmap? Schedule a zero-obligation architecture
              consultation directly with our engineering team.
            </p>
            <div className="radiant-cta-actions">
              <Link className="btn btn-glow-cyan" href="/contact#project-inquiry">
                Schedule Consultation &rarr;
              </Link>
              <a className="btn btn-whatsapp-outline" href="https://wa.me/918757928673" target="_blank" rel="noopener noreferrer">
                WhatsApp Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
