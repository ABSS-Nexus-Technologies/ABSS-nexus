import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions governing IT consulting and software development services at ABSS Nexus Technologies.',
};

export default function TermsPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">Legal Document &bull; Updated 2026</span>
          <h1 className="site-hero__title">Terms &amp; Conditions</h1>
          <p className="site-hero__description">
            Standard commercial and legal terms governing digital product engineering, deliverables, and IP ownership.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', lineHeight: 1.8, color: 'var(--color-near-black)' }}>
          <h2>1. Engagement &amp; Scope of Work</h2>
          <p>
            All development projects begin with an agreed Scope of Work (SOW) defining deliverables, milestone timelines,
            and commercial considerations. Any features requested outside the initial SOW are scoped as formal change requests.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Upon receipt of final milestone settlement, 100% of custom code, design files, relational database architectures, and
            content created specifically for the client transfer entirely to the client with zero ongoing licensing fees.
          </p>

          <h2>3. Payment Milestones</h2>
          <p>
            Standard projects follow structured milestone payments: an initial kickoff deposit, prototype verification stage, and
            final staging sign-off before production deployment. Invoices are payable within 7 business days of issuance.
          </p>

          <h2>4. Warranties &amp; Support</h2>
          <p>
            We provide a 30-day post-launch warranty covering any functional bugs or regressions within the agreed scope at zero
            additional charge. Ongoing maintenance plans are available for long-term server patching and uptime monitoring.
          </p>

          <h2>5. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of India, under the jurisdiction of courts in
            Jaipur, Rajasthan.
          </p>
        </div>
      </section>
    </main>
  );
}
