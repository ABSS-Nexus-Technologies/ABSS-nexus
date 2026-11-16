import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Milestone escrow and refund policy terms at ABSS Nexus Technologies.',
};

export default function RefundPolicyPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">Legal Document &bull; Updated 2026</span>
          <h1 className="site-hero__title">Refund &amp; Cancellation Policy</h1>
          <p className="site-hero__description">
            Transparent financial safeguards and milestone escrow criteria.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', lineHeight: 1.8, color: 'var(--color-near-black)' }}>
          <h2>1. Milestone-Based Protection</h2>
          <p>
            To protect both client and agency, projects are executed in phased milestones. Work begins only upon mutual agreement
            of the deliverables for each specific phase.
          </p>

          <h2>2. Kickoff Deposits &amp; Cancellation</h2>
          <p>
            If a client requests cancellation before design or development kickoff, the initial deposit is refunded in full minus
            any banking processing fees. Once milestone engineering has commenced, completed work is billed on a pro-rata basis.
          </p>

          <h2>3. Disputed Deliverables</h2>
          <p>
            If any milestone deliverable does not match the specifications defined in the initial Scope of Work, we provide revisions
            free of charge until full compliance is met before any subsequent invoice is generated.
          </p>
        </div>
      </section>
    </main>
  );
}
