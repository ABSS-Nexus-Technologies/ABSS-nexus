import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support Policy & Service Level Agreements (SLA)',
  description: 'Technical support response times, incident management, and post-launch maintenance terms.',
};

export default function SupportPolicyPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">Operational SLA &bull; Updated 2026</span>
          <h1 className="site-hero__title">Support Policy &amp; SLA</h1>
          <p className="site-hero__description">
            Guaranteed response times, incident resolution categories, and post-deployment maintenance terms.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', lineHeight: 1.8, color: 'var(--color-near-black)' }}>
          <h2>1. 30-Day Launch Warranty</h2>
          <p>
            All custom websites and applications developed by ABSS Nexus Technologies include 30 days of complimentary engineering
            support post-deployment to address any functional anomalies or environment regressions.
          </p>

          <h2>2. Incident Severity Classification</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><strong>Critical Severity (P1)</strong>: Total platform outage or checkout failure. Response SLA: &lt; 1 Hour.</li>
            <li><strong>Major Severity (P2)</strong>: Core feature impaired with workaround available. Response SLA: &lt; 4 Hours.</li>
            <li><strong>Minor Severity (P3)</strong>: Cosmetic UI adjustments or minor non-blocking questions. Response SLA: &lt; 24 Hours.</li>
          </ul>

          <h2>3. Managed Support Tiers</h2>
          <p>
            Clients requiring ongoing 24/7 server monitoring, routine dependency updates, and dedicated engineering hours can
            subscribe to our monthly Managed IT Support agreements.
          </p>
        </div>
      </section>
    </main>
  );
}
