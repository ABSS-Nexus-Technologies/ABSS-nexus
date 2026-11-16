import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { solutionsData } from '@/src/lib/data/solutions';

export const metadata: Metadata = {
  title: 'Enterprise Architecture & Technical Solutions',
  description:
    'Outcome-driven technical frameworks: business process automation, custom software platforms, cloud modernization, and connected API ecosystems.',
};

export default function SolutionsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">
            <span className="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Enterprise Frameworks</span>
          </span>
          <h1 className="site-hero__title">Outcome-Driven Technical Frameworks for Scaling Businesses</h1>
          <p className="site-hero__description">
            We architect and implement end-to-end technology solutions designed to solve operational bottlenecks, eliminate
            manual work, and build high-performance foundations that scale smoothly with your business growth.
          </p>

          <div className="site-hero__actions hero-actions">
            <Link className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan" href="/contact#project-inquiry">
              <span>Schedule Architecture Review</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/services">
              <span>Explore Services Catalog</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Architectural Blueprints</p>
            <h2>Proven Solutions for Enterprise Challenges</h2>
            <p>Select a framework tailored to your operational requirements and scale stage.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px', marginTop: '36px' }}>
            {solutionsData.map((solution) => (
              <div
                id={solution.hash}
                key={solution.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--color-blue)',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    {solution.category}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--color-near-black)' }}>{solution.title}</h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-dim)', fontStyle: 'italic', marginBottom: '16px' }}>
                    {solution.tagline}
                  </p>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-near-black)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {solution.description}
                  </p>

                  <div style={{ marginBottom: '24px' }}>
                    <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-text-dim)', display: 'block', marginBottom: '8px' }}>
                      Key Capabilities:
                    </strong>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {solution.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            fontSize: '0.82rem',
                            padding: '4px 10px',
                            background: 'rgba(0, 102, 204, 0.05)',
                            border: '1px solid rgba(0, 102, 204, 0.15)',
                            borderRadius: '6px',
                            color: 'var(--color-blue)',
                            fontWeight: 500,
                          }}
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#10b981' }}>
                    Impact: {solution.metrics}
                  </span>
                  <Link
                    href={`/contact?solution=${encodeURIComponent(solution.title)}#project-inquiry`}
                    style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-blue)', textDecoration: 'none' }}
                  >
                    Deploy Solution &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="container">
          <div className="radiant-cta-box">
            <p className="eyebrow">Transform Your Infrastructure</p>
            <h2>Ready to Modernize Your Enterprise Stack?</h2>
            <p>Speak directly with our principal architects to craft an implementation roadmap tailored to your timeline.</p>
            <div className="radiant-cta-actions">
              <Link className="btn btn-glow-cyan" href="/contact#project-inquiry">
                Request Architecture Consultation &rarr;
              </Link>
              <a className="btn btn-whatsapp-outline" href="https://wa.me/917688899205?text=Hi%20Shubham%2C%20I%20saw%20your%20portfolio%20on%20ABSS%20Nexus%20Technologies%20and%20I%20want%20to%20discuss%20a%20new%20project." target="_blank" rel="noopener noreferrer">
                WhatsApp Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
