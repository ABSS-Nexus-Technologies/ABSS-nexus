import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Engineering Excellence & Vision',
  description:
    'Learn about ABSS Nexus Technologies: our founder-led engineering philosophy, verified credentials, and commitment to building resilient digital products.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">
            <span className="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Founder-Led Engineering Agency</span>
          </span>
          <h1 className="site-hero__title">Building Resilient Digital Products That Empower Growing Businesses</h1>
          <p className="site-hero__description">
            ABSS Nexus Technologies was founded on a simple conviction: modern businesses deserve clean, high-speed digital
            platforms built by genuine craftsmen, without bureaucratic agency bloat or unmaintainable templates.
          </p>

          <div className="site-hero__actions hero-actions">
            <Link className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan" href="/contact#project-inquiry">
              <span>Work With Us &rarr;</span>
            </Link>
            <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/work">
              <span>Explore Our Work</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Our Guiding Pillars</p>
            <h2>The Principles Behind Every Line of Code</h2>
            <p>Our commitment to software quality, client autonomy, and operational speed.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginTop: '36px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '14px' }}>⚡</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--color-near-black)' }}>Sub-Second Performance</h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--color-text-dim)', lineHeight: 1.6, margin: 0 }}>
                We obsess over millisecond rendering speeds. By utilizing serverless edge delivery, static generation, and
                zero-bloat modern scripts, our platforms achieve 99-100 Core Web Vitals on mobile.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '14px' }}>🔓</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--color-near-black)' }}>Zero Vendor Lock-In</h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--color-text-dim)', lineHeight: 1.6, margin: 0 }}>
                You own 100% of your source code, database architectures, and digital assets. We write clean, industry-standard
                TypeScript that any professional engineer can inspect, extend, and deploy.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '14px' }}>🤝</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--color-near-black)' }}>Founder-Led Collaboration</h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--color-text-dim)', lineHeight: 1.6, margin: 0 }}>
                No disconnected account managers or junior middlemen. You collaborate directly with principal engineering
                leadership, ensuring technical clarity and lightning-fast turnaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Profile */}
      <section className="section" style={{ background: 'rgba(0, 0, 0, 0.02)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-blue)', fontWeight: 700 }}>
              Leadership &bull; Engineering Craftsman
            </span>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-near-black)', margin: 0 }}>Shubham Kumar &mdash; Founder &amp; Principal Engineer</h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-dim)', lineHeight: 1.7, margin: 0 }}>
              Headquartered in Jaipur, Rajasthan, Shubham guides the technical direction, system architecture, and client
              partnerships at ABSS Nexus Technologies. With deep expertise across full-stack TypeScript, edge networks,
              relational database design, and conversion optimization, he ensures every project meets stringent enterprise
              benchmarks.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', paddingTop: '10px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-near-black)', fontWeight: 500 }}>
                📍 Jaipur, Rajasthan, India
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-near-black)', fontWeight: 500 }}>
                📞 +91 76888 99205
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-near-black)', fontWeight: 500 }}>
                ✉️ abssnexus@gmail.com
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="container">
          <div className="radiant-cta-box">
            <p className="eyebrow">Start Working With Us</p>
            <h2>Ready to Upgrade Your Digital Infrastructure?</h2>
            <p>Connect with our leadership team today to map out a clear technical execution plan.</p>
            <div className="radiant-cta-actions">
              <Link className="btn btn-glow-cyan" href="/contact#project-inquiry">
                Schedule Founder Consultation &rarr;
              </Link>
              <a className="btn btn-whatsapp-outline" href="https://wa.me/917688899205" target="_blank" rel="noopener noreferrer">
                WhatsApp Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
