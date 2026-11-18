import React from 'react';
import type { Metadata } from 'next';
import HeroBackdrop from '@/src/components/HeroBackdrop';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How ABSS Nexus Technologies uses cookies and browser storage responsibly.',
};

export default function CookiePolicyPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section">
        <HeroBackdrop variant="legal" />
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">Legal Document &bull; Updated 2026</span>
          <h1 className="site-hero__title">Cookie Policy</h1>
          <p className="site-hero__description">
            Information about the minimal cookies and telemetry tokens used on our corporate website.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', lineHeight: 1.8, color: 'var(--color-near-black)' }}>
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text fragments stored by your browser when visiting websites. They facilitate essential functions
            such as remembering your navigation preferences and tracking performance errors.
          </p>

          <h2>2. Cookies We Use</h2>
          <p>
            Our website uses strictly essential operational cookies and anonymized analytics (Google Analytics 4 with IP anonymization).
            We do not use invasive third-party cross-site advertising trackers or sell browsing data to advertisers.
          </p>

          <h2>3. Managing Your Cookie Preferences</h2>
          <p>
            You can modify your browser settings to block or delete cookies at any time. Doing so will not hinder your ability to
            browse our services, portfolio, or submit project inquiries.
          </p>
        </div>
      </section>
    </main>
  );
}
