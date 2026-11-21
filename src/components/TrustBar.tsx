import React from 'react';

export default function TrustBar() {
  const trustLogos = [
    {
      name: 'AWS Cloud',
      subtitle: 'Certified Architecture',
      tag: 'Multi-Region VPC',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      ),
    },
    {
      name: 'Cloudflare Edge',
      subtitle: 'Global Anycast CDN',
      tag: 'Sub-15ms Latency',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      name: 'Next.js 16',
      subtitle: 'React 19 Server Engine',
      tag: 'Turbopack Edge',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 15 6-6" />
          <path d="M15 9v6" />
        </svg>
      ),
    },
    {
      name: 'MSME Registered',
      subtitle: 'Govt. of India Certified',
      tag: 'UDYAM Verified',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      ),
    },
    {
      name: 'OWASP Zero-Trust',
      subtitle: 'Enterprise Data Security',
      tag: 'ISO / SOC2 Ready',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bento-trust-bar-section" aria-label="Global Infrastructure & Accreditations">
      <div className="bento-container">
        {/* Meta-Style Minimalist Trust Header */}
        <div className="trust-meta-header">
          <span className="trust-meta-eyebrow">
            <span className="live-pulse-dot" aria-hidden="true" />
            <span>GLOBAL CLOUD &amp; SECURITY ACCREDITATIONS</span>
          </span>
          <h3 className="trust-meta-title">
            Powered by Industry-Standard Cloud &amp; Security Ecosystems
          </h3>
        </div>

        {/* 5 Sleek Monochrome Luxury Cards */}
        <div className="trust-meta-grid">
          {trustLogos.map((item, idx) => (
            <div key={idx} className="trust-meta-card">
              <div className="trust-meta-icon">{item.icon}</div>
              <div className="trust-meta-details">
                <span className="trust-meta-name">{item.name}</span>
                <span className="trust-meta-sub">{item.subtitle}</span>
              </div>
              <span className="trust-meta-tag">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
