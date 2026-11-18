import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import TrustBar from '@/src/components/TrustBar';
import HeroBackdrop from '@/src/components/HeroBackdrop';

export const metadata: Metadata = {
  title: 'About Us | Engineering Excellence & Vision | ABSS Nexus Technologies',
  description:
    'Learn about ABSS Nexus Technologies: our founder-led engineering philosophy, verified credentials, and commitment to building resilient digital products.',
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bento-hero-section" id="hero" style={{ padding: '40px 0 30px' }}>
        <HeroBackdrop variant="about" />
        <div className="bento-container" style={{ textAlign: 'center' }}>
          <div className="bento-pill-badge">
            <span className="live-pulse-dot" aria-hidden="true" />
            <span>Parent Enterprise &amp; Conglomerate &bull; Jaipur, India</span>
          </div>
          <h1 className="bento-hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
            Building Resilient Digital Products That <span className="gradient-text-hero">Empower Businesses</span>
          </h1>
          <p className="bento-hero-subtitle" style={{ maxWidth: '740px' }}>
            ABSS Nexus Technologies operates as the parent holding entity behind global IT engineering, proprietary business cloud platforms (ABSS ERP, CRM &amp; HRM), and developer talent incubation via IntenNexus.
          </p>

          <div className="bento-hero-actions">
            <Link className="bento-btn-primary" href="/ecosystem">
              <span>Explore Our Ecosystem (3 Pillars) &rarr;</span>
            </Link>
            <Link className="bento-btn-glass" href="/services">
              <span>IT Services</span>
            </Link>
            <Link className="bento-btn-glass" href="/work">
              <span>Case Studies</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Ecosystem Bar */}
      <TrustBar />

      {/* Guiding Pillars */}
      <section className="bento-section" style={{ paddingTop: '50px' }}>
        <div className="bento-container">
          <div className="bento-section-header">
            <span className="bento-section-eyebrow">Our Guiding Pillars</span>
            <h2 className="bento-section-title">The Principles Behind Every Line of Code</h2>
            <p className="bento-section-subtitle">Our commitment to software quality, client autonomy, and operational speed.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="bento-card" style={{ padding: '32px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>⚡</div>
              <h3 className="bento-card-title" style={{ fontSize: '1.25rem' }}>Sub-Second Performance</h3>
              <p className="bento-card-desc">
                We obsess over millisecond rendering speeds. By utilizing serverless edge delivery, static generation, and
                zero-bloat modern scripts, our platforms achieve 99-100 Core Web Vitals on mobile.
              </p>
            </div>

            <div className="bento-card" style={{ padding: '32px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🔓</div>
              <h3 className="bento-card-title" style={{ fontSize: '1.25rem' }}>Zero Vendor Lock-In</h3>
              <p className="bento-card-desc">
                You own 100% of your source code, database architectures, and digital assets. We write clean, industry-standard
                TypeScript that any professional engineer can inspect, extend, and deploy.
              </p>
            </div>

            <div className="bento-card" style={{ padding: '32px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🤝</div>
              <h3 className="bento-card-title" style={{ fontSize: '1.25rem' }}>Founder-Led Collaboration</h3>
              <p className="bento-card-desc">
                No disconnected account managers or junior middlemen. You collaborate directly with principal engineering
                leadership, ensuring technical clarity and lightning-fast turnaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Founder Authority Profile */}
      <section className="bento-section" style={{ paddingTop: '10px' }}>
        <div className="bento-container" style={{ maxWidth: '880px' }}>
          <div className="bento-card" style={{ padding: '40px', border: '1px solid rgba(0, 194, 255, 0.35)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <span className="bento-badge-live">
                <span className="live-pulse-dot" aria-hidden="true" />
                <span>Leadership &bull; Engineering Craftsman</span>
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>Jaipur, Rajasthan, India</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text-main)', marginBottom: '14px' }}>
              Shubham Kumar &mdash; Founder &amp; Principal Architect
            </h2>

            <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
              Headquartered in Jaipur, Rajasthan, Shubham guides the technical direction, system architecture, and client
              partnerships at ABSS Nexus Technologies. With deep expertise across full-stack TypeScript, Next.js App Router, edge computing,
              relational database design, and conversion optimization, he ensures every project meets stringent enterprise benchmarks.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', padding: '16px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}>
                📍 Location: Jaipur, Rajasthan
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}>
                📞 Direct Phone: +91 76888 99205
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}>
                ✉️ Email: abssnexus@gmail.com
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                className="bento-btn-primary"
                href="https://wa.me/917688899205?text=Hi%20Shubham%2C%20I%20saw%20your%20portfolio%20on%20ABSS%20Nexus%20Technologies%20and%20I%20want%20to%20discuss%20a%20new%20project."
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Chat Directly with Shubham on WhatsApp &rarr;</span>
              </a>
              <Link className="bento-btn-glass" href="/contact#project-inquiry">
                Book Consultation Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Radiant CTA Band */}
      <section className="bento-section" style={{ paddingTop: '10px' }}>
        <div className="bento-container">
          <div className="bento-cta-box">
            <span className="bento-section-eyebrow">Start Your Project</span>
            <h2 className="bento-cta-title">Ready to Elevate Your Digital Footprint?</h2>
            <p className="bento-cta-desc">
              Whether you need a fresh website, a custom web app, or an urgent redesign,
              we are ready to bring your vision to life with speed, precision, and modern aesthetics.
            </p>
            <div className="bento-cta-actions">
              <Link className="bento-btn-primary" href="/contact#project-inquiry">
                Start Your Project Now &rarr;
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
