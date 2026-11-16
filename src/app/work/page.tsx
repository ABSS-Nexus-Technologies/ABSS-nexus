import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { portfolioData } from '@/src/lib/data/work';
import ProjectFilter from '@/src/components/ProjectFilter';
import TrustBar from '@/src/components/TrustBar';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | Proven Engineering Work | ABSS Nexus Technologies',
  description:
    'Explore featured client and concept projects by ABSS Nexus Technologies, highlighting clean architecture, mobile responsiveness, and high conversion.',
};

export default function WorkPage() {
  return (
    <main>
      <section className="bento-hero-section" id="hero" style={{ padding: '40px 0 30px' }}>
        <div className="bento-container" style={{ textAlign: 'center' }}>
          <div className="bento-pill-badge">
            <span className="live-pulse-dot" aria-hidden="true" />
            <span>Production Portfolio &bull; Verified Impact</span>
          </div>
          <h1 className="bento-hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
            Engineered for Reliability, Performance &amp; <span className="gradient-text-hero">Real Impact</span>
          </h1>
          <p className="bento-hero-subtitle" style={{ maxWidth: '720px' }}>
            Explore our curated archive of enterprise web platforms, custom SaaS dashboards, high-converting e-commerce
            storefronts, and mission-critical API integrations.
          </p>

          <div className="bento-hero-actions">
            <Link className="bento-btn-primary" href="/contact#project-inquiry">
              <span>Start Your Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link className="bento-btn-glass" href="/services">
              <span>Explore Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Ecosystem Bar */}
      <TrustBar />

      <section className="bento-section" style={{ paddingTop: '50px' }}>
        <div className="bento-container">
          <div className="bento-section-header">
            <span className="bento-section-eyebrow">Select Works</span>
            <h2 className="bento-section-title">Featured Client &amp; System Case Studies</h2>
            <p className="bento-section-subtitle">Filter by platform type to explore relevant engineering depth.</p>
          </div>

          <ProjectFilter projects={portfolioData} />
        </div>
      </section>

      {/* Radiant CTA Band */}
      <section className="bento-section" style={{ paddingTop: '10px' }}>
        <div className="bento-container">
          <div className="bento-cta-box">
            <span className="bento-section-eyebrow">Have a Project in Mind?</span>
            <h2 className="bento-cta-title">Let&apos;s Build Your Next High-Performance Platform</h2>
            <p className="bento-cta-desc">From initial Figma designs to full-stack deployment, we partner with you for success.</p>
            <div className="bento-cta-actions">
              <Link className="bento-btn-primary" href="/contact#project-inquiry">
                Discuss Your Requirements &rarr;
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
