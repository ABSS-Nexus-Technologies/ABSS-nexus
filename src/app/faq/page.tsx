import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { faqList } from '@/src/lib/data/faq';
import FaqAccordion from '@/src/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description:
    'Answers to common questions regarding website development timelines, custom software architecture, pricing, code ownership, and post-launch maintenance.',
};

export default function FaqPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">
            <span className="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Transparency &amp; Answers</span>
          </span>
          <h1 className="site-hero__title">Frequently Asked Questions</h1>
          <p className="site-hero__description">
            Everything you need to know about our engineering approach, delivery timelines, intellectual property
            ownership, payment milestones, and ongoing support.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '840px' }}>
          <FaqAccordion items={faqList} />

          <div style={{ marginTop: '56px', padding: '36px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-near-black)', marginBottom: '8px' }}>Have a question not listed here?</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dim)', marginBottom: '24px' }}>
              We are always happy to clarify our process, review code architectures, or explore feasibility.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link className="btn btn-glow-cyan" href="/contact#project-inquiry">
                Ask Us Directly &rarr;
              </Link>
              <a className="btn btn-whatsapp-outline" href="https://wa.me/918757928673" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
