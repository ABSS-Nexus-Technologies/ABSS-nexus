import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { portfolioData } from '@/src/lib/data/work';
import ProjectFilter from '@/src/components/ProjectFilter';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | Proven Engineering Work',
  description:
    'Explore featured client and concept projects by ABSS Nexus Technologies, highlighting clean architecture, mobile responsiveness, and high conversion.',
};

export default function WorkPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">
            <span className="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Production Portfolio</span>
          </span>
          <h1 className="site-hero__title">Engineered for Reliability, Performance &amp; Real Commercial Impact</h1>
          <p className="site-hero__description">
            Explore our curated archive of enterprise web platforms, custom SaaS dashboards, high-converting e-commerce
            storefronts, and mission-critical API integrations.
          </p>

          <div className="site-hero__actions hero-actions">
            <Link className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan" href="/contact#project-inquiry">
              <span>Start Your Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/services">
              <span>Explore Services</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section projects">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Select Works</p>
            <h2>Featured Client &amp; System Case Studies</h2>
            <p>Filtering by platform type to explore relevant engineering depth.</p>
          </div>

          <ProjectFilter projects={portfolioData} />
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="container">
          <div className="radiant-cta-box">
            <p className="eyebrow">Have a Project in Mind?</p>
            <h2>Let&apos;s Build Your Next High-Performance Platform</h2>
            <p>From initial Figma designs to full-stack deployment, we partner with you for success.</p>
            <div className="radiant-cta-actions">
              <Link className="btn btn-glow-cyan" href="/contact#project-inquiry">
                Discuss Your Requirements &rarr;
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
