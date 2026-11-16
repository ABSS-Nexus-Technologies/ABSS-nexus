import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { faqList } from '@/src/lib/data/faq';
import FaqAccordion from '@/src/components/FaqAccordion';
import ProjectCostEstimator from '@/src/components/ProjectCostEstimator';

export const metadata: Metadata = {
  title: 'Transparent Pricing & Engineering Packages | ABSS Nexus Technologies',
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
    description: 'Comprehensive multi-page corporate web presence engineered for established brands, clinics, and growing firms.',
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
      {/* Header */}
      <section className="bento-hero-section" id="hero" style={{ padding: '40px 0 30px' }}>
        <div className="bento-container" style={{ textAlign: 'center' }}>
          <div className="bento-pill-badge">
            <span className="live-pulse-dot" aria-hidden="true" />
            <span>Transparent Engineering Investment &bull; Zero Hidden Fees</span>
          </div>
          <h1 className="bento-hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
            Transparent Pricing Engineered for <span className="gradient-text-hero">High ROI</span>
          </h1>
          <p className="bento-hero-subtitle" style={{ maxWidth: '720px' }}>
            We operate with complete financial transparency. Clear milestone scopes, full code ownership, and zero monthly
            proprietary lock-in fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="bento-section" style={{ paddingTop: '10px' }}>
        <div className="bento-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '70px' }}>
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="bento-card"
                style={{
                  border: tier.popular ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: tier.popular ? '0 16px 45px rgba(0, 194, 255, 0.2)' : '0 10px 30px rgba(0,0,0,0.15)',
                  position: 'relative',
                }}
              >
                {tier.popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #00c2ff, #0066cc)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 16px',
                      borderRadius: 'var(--radius-pill)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      boxShadow: '0 0 20px rgba(0,194,255,0.4)',
                    }}
                  >
                    Recommended Choice
                  </span>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>
                      {tier.name}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{tier.timeline}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
                    {tier.description}
                  </p>

                  <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {tier.price}
                    </strong>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>/{tier.period}</span>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '20px 0' }} />

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  className={tier.popular ? 'bento-btn-primary' : 'bento-btn-glass'}
                  href={`/contact?package=${encodeURIComponent(tier.name)}#project-inquiry`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {tier.cta} &rarr;
                </Link>
              </div>
            ))}
          </div>

          {/* Interactive Cost Estimator */}
          <div style={{ marginBottom: '70px' }}>
            <ProjectCostEstimator />
          </div>

          {/* Pricing FAQ Section */}
          <div style={{ marginTop: '50px' }}>
            <div className="bento-section-header">
              <span className="bento-section-eyebrow">Financial Transparency</span>
              <h2 className="bento-section-title">Frequently Asked Questions</h2>
            </div>
            <FaqAccordion items={faqList} />
          </div>
        </div>
      </section>

      {/* Radiant CTA Band */}
      <section className="bento-section" style={{ paddingTop: '10px' }}>
        <div className="bento-container">
          <div className="bento-cta-box">
            <span className="bento-section-eyebrow">Custom Scope &amp; Estimates</span>
            <h2 className="bento-cta-title">Need a Specific Architecture Estimate?</h2>
            <p className="bento-cta-desc">Send us your project outline for a line-item technical scope breakdown within 24 hours.</p>
            <div className="bento-cta-actions">
              <Link className="bento-btn-primary" href="/contact#project-inquiry">
                Request Itemized Quote &rarr;
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
