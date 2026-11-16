import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy and data governance practices at ABSS Nexus Technologies.',
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">Legal Document &bull; Updated 2026</span>
          <h1 className="site-hero__title">Privacy Policy</h1>
          <p className="site-hero__description">
            Your privacy and data security are fundamental to how we engineer and operate digital services.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', lineHeight: 1.8, color: 'var(--color-near-black)' }}>
          <h2>1. Information We Collect</h2>
          <p>
            When you interact with ABSS Nexus Technologies via our contact forms, consultation booking requests, or direct email,
            we may collect your name, business email address, telephone/WhatsApp number, company name, and project requirements.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use collected information solely to evaluate project scopes, respond to commercial inquiries, schedule technical
            discovery calls, and fulfill agreed development contracts. We never sell, rent, or trade your personal or business
            information to third-party data brokers.
          </p>

          <h2>3. Data Security &amp; Storage</h2>
          <p>
            All website data is transmitted over encrypted HTTPS/TLS 1.3 connections. Project communications and repository
            access are protected under zero-trust access controls, multi-factor authentication, and strict least-privilege principles.
          </p>

          <h2>4. Cookies &amp; Telemetry</h2>
          <p>
            We use minimal, privacy-conscious analytics (anonymized IP logging via Google Analytics 4) to monitor website performance,
            broken links, and Core Web Vitals. No sensitive personal data is stored in tracking cookies.
          </p>

          <h2>5. Contact Information</h2>
          <p>
            For any questions or data removal requests regarding this Privacy Policy, please contact our data compliance officer at{' '}
            <a href="mailto:abssnexus@gmail.com" style={{ color: 'var(--color-blue)', fontWeight: 600 }}>abssnexus@gmail.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
