import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ABSS Nexus Technologies',
  description:
    'Comprehensive legal and commercial terms, IP ownership, 30-day warranty, support SLA, refund policy, and technical disclaimer for ABSS Nexus Technologies.',
};

export default function TermsPage() {
  return (
    <main>
      <section className="bento-hero-section" style={{ padding: '40px 0 30px' }}>
        <div className="bento-container" style={{ textAlign: 'center' }}>
          <div className="bento-pill-badge">
            <span className="live-pulse-dot" aria-hidden="true" />
            <span>Official Commercial &amp; Legal Framework &bull; 2026</span>
          </div>
          <h1 className="bento-hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Terms &amp; Conditions
          </h1>
          <p className="bento-hero-subtitle" style={{ maxWidth: '720px' }}>
            Clear, transparent guidelines governing digital product engineering, IP transfer, warranty SLAs,
            and mutual confidentiality between ABSS Nexus Technologies and our clients.
          </p>
        </div>
      </section>

      <section className="bento-section" style={{ paddingTop: '10px' }}>
        <div
          className="bento-container"
          style={{
            maxWidth: '860px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 36px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '10px' }}>
              1. Engagement &amp; Scope of Work (SOW)
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              All software engineering, web development, and design engagements commence with a mutually agreed Scope of Work (SOW)
              or technical specification document. The SOW details exact deliverables, technical milestones, timeline estimates,
              and commercial pricing. Any additional requirements requested outside the agreed SOW will be scoped under a formal change request.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '10px' }}>
              2. Intellectual Property (IP) Transfer
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              Upon receipt of final milestone settlement, 100% of custom source code, design assets, database architectures, and documentation
              created specifically for the client transfer entirely to the client. ABSS Nexus Technologies retains no proprietary claim
              over bespoke client assets and charges zero ongoing licensing or lock-in fees.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '10px' }}>
              3. Milestone Payment Schedule
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              Engagements typically follow a structured milestone cadence: an initial kickoff deposit, prototype verification milestone,
              and final staging sign-off prior to production deployment. Invoices are payable within 7 business days of issuance via bank wire,
              UPI, or verified commercial payment channels.
            </p>
          </div>

          {/* Section 4: Support SLA */}
          <div id="support-policy" style={{ marginBottom: '32px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '10px' }}>
              4. 30-Day Defect Warranty &amp; Support Policy (SLA)
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '10px' }}>
              Every production delivery includes a complimentary <strong>30-day post-launch warranty period</strong>. During this window,
              any functional defects, regressions, or performance bugs falling within the original scope are resolved at zero additional fee.
            </p>
            <ul style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem', paddingLeft: '20px' }}>
              <li><strong>Critical Severity (Downtime/Data):</strong> Response within 2 hours; resolution priority round-the-clock.</li>
              <li><strong>Standard Inquiries &amp; Adjustments:</strong> Response within 1 business day.</li>
              <li><strong>Ongoing Maintenance:</strong> Extended monthly retainer support packages are available for server monitoring, dependency updates, and continuous improvements.</li>
            </ul>
          </div>

          {/* Section 5: Refund Policy */}
          <div id="refund-policy" style={{ marginBottom: '32px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '10px' }}>
              5. Refund &amp; Cancellation Policy
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              Because engineering time and infrastructure allocations are committed upon kickoff, payments for completed milestones
              are non-refundable. If a client terminates an active engagement prior to milestone completion, the client is only billed for
              verifiable work delivered up to the written date of termination. Any unearned upfront retainer funds for future milestones
              are promptly refunded within 14 business days.
            </p>
          </div>

          {/* Section 6: Technical Disclaimer */}
          <div id="disclaimer" style={{ marginBottom: '32px', scrollMarginTop: '100px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '10px' }}>
              6. Technical Disclaimer &amp; Third-Party Services
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              While we architect every platform using enterprise security best practices and zero-trust principles, ABSS Nexus Technologies
              is not liable for external third-party outages (including AWS, Cloudflare, Google Cloud, payment gateways, or domain registrars),
              client-side credential leaks, or unauthorized post-handover alterations executed by third parties.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '10px' }}>
              7. Confidentiality &amp; Non-Disclosure
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              Both parties agree to treat all business logic, user data, commercial rates, and technical specifications as strictly confidential.
              We are pleased to execute mutual Non-Disclosure Agreements (NDAs) prior to architectural discussions.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '10px' }}>
              8. Governing Law &amp; Jurisdiction
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              These terms are governed by and construed in accordance with the laws of the Republic of India. Any legal proceedings
              arising out of or relating to this agreement shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan.
            </p>
          </div>

          <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Questions regarding our terms? Reach us at <a href="mailto:abssnexus@gmail.com" style={{ color: 'var(--accent-cyan)' }}>abssnexus@gmail.com</a>
            </span>
            <Link className="bento-btn-primary" href="/contact#project-inquiry" style={{ padding: '8px 20px', fontSize: '0.88rem' }}>
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
