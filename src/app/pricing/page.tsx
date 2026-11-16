import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { faqList } from '@/src/lib/data/faq';
import FaqAccordion from '@/src/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Transparent Pricing & Engineering Packages',
  description:
    'Honest, transparent pricing for landing pages, multi-page business websites, and enterprise web applications with zero hidden fees.',
};

const tiers = [
  {
    name: 'Landing Page & Starter',
    badge: 'Fast Launch',
    price: '₹12,499',
    period: 'one-time',
    timeline: '⏱ 3-5 Days',
    description: 'Perfect for campaign launches, personal portfolios, and single-product promotions requiring high conversion.',
    features: [
      'Single-Page High-Conversion Layout',
      'Mobile-First Responsive Design',
      'Core Web Vitals 99/100 Guaranteed',
      'Interactive Contact & WhatsApp Routing',
      'Technical SEO & Social Share Preview',
      '14 Days Post-Launch Support',
    ],
    cta: 'Start Starter Project',
    popular: false,
  },
  {
    name: 'Corporate Business Website',
    badge: 'Most Popular',
    price: '₹29,999',
    period: 'one-time',
    timeline: '⏱ 7-12 Days',
    description: 'Comprehensive multi-page corporate web presence engineered for established brands, clinics, and firms.',
    features: [
      'Up to 8 Custom Responsive Pages',
      'Figma Design Prototype Handoff',
      'Sub-Second Global Edge Hosting',
      'Structured Schema Markup & Dynamic Sitemap',
      'Inquiry Capture with CRM Webhooks',
      'Full Repository & Code Ownership',
      '30 Days Dedicated Engineering Support',
    ],
    cta: 'Start Business Platform',
    popular: true,
  },
  {
    name: 'Custom Web App / Portal',
    badge: 'Enterprise SaaS',
    price: '₹74,999+',
    period: 'custom quote',
    timeline: '⏱ 2-4 Weeks',
    description: 'Custom internal tools, multi-tenant SaaS backends, customer portals, and real-time operational hubs.',
    features: [
      'Tailored Relational Database (Cloud D1 / SQL)',
      'Role-Based Authentication & Permissions',
      'Interactive Telemetry & Analytics Dashboard',
      'Automated Document / Invoice Generation',
      'Payment Gateway Settlement Middleware',
      'Zero Software Lock-In Architecture',
      '60 Days Priority Engineering SLA',
    ],
    cta: 'Discuss Custom Scope',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">
            <span className="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Transparent Engineering Investment</span>
          </span>
          <h1 className="site-hero__title">Transparent Pricing Engineered for High ROI &bull; Zero Hidden Fees</h1>
          <p className="site-hero__description">
            We operate with complete financial transparency. Clear milestone scopes, full code ownership, and zero monthly
            proprietary lock-in fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {tiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: 'var(--bg-card)',
                  border: tier.popular ? '2px solid var(--color-blue)' : '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '36px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: tier.popular ? '0 12px 36px rgba(0, 102, 204, 0.12)' : 'none',
                }}
              >
                {tier.popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--color-blue)',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '4px 14px',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Recommended Choice
                  </span>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--color-near-black)', margin: 0 }}>{tier.name}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-blue)', fontWeight: 600 }}>{tier.timeline}</span>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-dim)', marginBottom: '20px' }}>{tier.description}</p>

                  <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <strong style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-near-black)' }}>
                      {tier.price}
                    </strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>/{tier.period}</span>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '20px 0' }} />

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--color-near-black)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  className={`btn ${tier.popular ? 'btn-glow-cyan' : 'btn-glass'}`}
                  href={`/contact?package=${encodeURIComponent(tier.name)}#project-inquiry`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {tier.cta} &rarr;
                </Link>
              </div>
            ))}
          </div>

          {/* Pricing FAQ Section */}
          <div style={{ marginTop: '64px' }}>
            <div className="section-heading">
              <p className="eyebrow">Financial Transparency</p>
              <h2>Frequently Asked Pricing Questions</h2>
            </div>
            <FaqAccordion items={faqList} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="container">
          <div className="radiant-cta-box">
            <p className="eyebrow">Custom Scope &amp; Estimates</p>
            <h2>Need a Specific Architecture Estimate?</h2>
            <p>Send us your project outline for a line-item technical scope breakdown within 24 hours.</p>
            <div className="radiant-cta-actions">
              <Link className="btn btn-glow-cyan" href="/contact#project-inquiry">
                Request Itemized Quote &rarr;
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
