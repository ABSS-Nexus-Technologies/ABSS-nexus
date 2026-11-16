import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Legal disclaimer and intellectual property notice for ABSS Nexus Technologies.',
};

export default function DisclaimerPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">Legal Document &bull; Updated 2026</span>
          <h1 className="site-hero__title">Website Disclaimer</h1>
          <p className="site-hero__description">
            General information notice regarding the technical content and case studies published on this site.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', lineHeight: 1.8, color: 'var(--color-near-black)' }}>
          <h2>1. General Information</h2>
          <p>
            The technical guides, benchmarks, and architectural patterns shared on this website are for educational and exploratory
            purposes. While we make every effort to maintain accurate and updated information, implementation outcomes may vary based
            on specific software configurations.
          </p>

          <h2>2. External Third-Party Links</h2>
          <p>
            Our website may include links to external resources, client live websites, or third-party APIs. ABSS Nexus Technologies
            does not control or endorse the content or privacy standards of external destinations.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All brand assets, custom layout graphics, logos, and written technical content are the registered property of
            ABSS Nexus Technologies and protected under Indian and international copyright treaties.
          </p>
        </div>
      </section>
    </main>
  );
}
