import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industry-Specific IT Solutions',
  description:
    'Tailored digital engineering and cloud software solutions for Healthcare, FinTech, E-Commerce, Education, Manufacturing, and Real Estate.',
};

const industries = [
  {
    id: 'healthcare',
    title: 'Healthcare & Life Sciences',
    icon: 'activity',
    badge: 'HIPAA & Telehealth',
    description: 'Compliant patient portals, real-time doctor appointment engines, encrypted diagnostic lockers, and high-security telemedicine architectures.',
    technologies: ['WebRTC', 'Cloudflare D1', 'HIPAA Hardening', 'SMS Gateways'],
    caseStudy: '/work/healthcare-telemedicine-platform',
  },
  {
    id: 'fintech',
    title: 'FinTech & Digital Payments',
    icon: 'credit-card',
    badge: 'Zero-Loss Ledger',
    description: 'High-throughput payment gateway middleware, idempotent webhook event consumers, automated bank settlement reconciliation, and fraud telemetry.',
    technologies: ['Node.js', 'PostgreSQL', 'Razorpay / Stripe', 'Zod'],
    caseStudy: '/work/fintech-payment-gateway',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Retail Brands',
    icon: 'shopping-bag',
    badge: 'Headless & High Conversion',
    description: 'Sub-second mobile catalogs, 1-tap WhatsApp checkout paths, inventory synchronization, and omnichannel customer communication hubs.',
    technologies: ['Next.js', 'Shopify Storefront API', 'Redis Cache', 'Tailwind'],
    caseStudy: '/work/ecommerce-headless-storefront',
  },
  {
    id: 'education',
    title: 'Education & Institutional Academies',
    icon: 'book-open',
    badge: 'High Concurrency',
    description: 'Scalable campus portals, online course delivery architectures, verified digital credential verification engines, and instant notification systems.',
    technologies: ['React', 'Next.js', 'Edge Rendering', 'Analytics'],
    caseStudy: '/contact?service=Custom%20Software%20Development#project-inquiry',
  },
  {
    id: 'real-estate',
    title: 'Real Estate & Property Development',
    icon: 'home',
    badge: 'Interactive & Visual',
    description: 'High-conversion property showcase platforms, interactive unit floorplans, automated inquiry routing to sales agents, and virtual tour embeddings.',
    technologies: ['Figma UI/UX', 'Cloudflare CDN', 'Lead Workflows', 'REST APIs'],
    caseStudy: '/contact?service=Website%20Development#project-inquiry',
  },
  {
    id: 'logistics',
    title: 'Manufacturing & Supply Chain',
    icon: 'truck',
    badge: 'Process Automation',
    description: 'Custom warehouse management portals, supplier dispatch tracking, automated PO generation, and production telemetry monitoring hubs.',
    technologies: ['TypeScript', 'Cloud D1 SQL', 'Docker', 'Role Auth'],
    caseStudy: '/solutions#automation',
  },
];

export default function IndustriesPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">
            <span className="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Industry Specialization</span>
          </span>
          <h1 className="site-hero__title">Tailored Digital Solutions Across High-Impact Industries</h1>
          <p className="site-hero__description">
            Every sector operates under distinct regulatory, compliance, and operational dynamics. We build domain-tuned
            architectures engineered to satisfy enterprise standards and drive immediate business outcomes.
          </p>

          <div className="site-hero__actions hero-actions">
            <Link className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan" href="/contact#project-inquiry">
              <span>Discuss Your Industry Needs</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/work">
              <span>View Case Studies</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Sector Expertise</p>
            <h2>Domain-Tuned Engineering for Industry Leaders</h2>
            <p>Proven frameworks designed to resolve industry-specific bottlenecks.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px', marginTop: '36px' }}>
            {industries.map((ind) => (
              <div
                id={ind.id}
                key={ind.id}
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
                      fontSize: '0.8rem',
                      color: 'var(--color-blue)',
                      fontWeight: 700,
                      display: 'inline-block',
                      marginBottom: '10px',
                    }}
                  >
                    {ind.badge}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--color-near-black)' }}>{ind.title}</h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--color-text-dim)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {ind.description}
                  </p>

                  <div style={{ marginBottom: '24px' }}>
                    <strong style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--color-text-dim)', display: 'block', marginBottom: '8px' }}>
                      Core Stack:
                    </strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {ind.technologies.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '0.8rem',
                            padding: '3px 8px',
                            background: 'rgba(0, 0, 0, 0.04)',
                            borderRadius: '4px',
                            color: 'var(--color-near-black)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
                  <Link
                    href={ind.caseStudy}
                    style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-blue)', textDecoration: 'none' }}
                  >
                    Explore Related Project &rarr;
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
            <p className="eyebrow">Enterprise Domain Expertise</p>
            <h2>Plan Your Industry Solution With Our Engineers</h2>
            <p>We work directly with founders and domain experts to deliver high-trust systems.</p>
            <div className="radiant-cta-actions">
              <Link className="btn btn-glow-cyan" href="/contact#project-inquiry">
                Start Project Now &rarr;
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
