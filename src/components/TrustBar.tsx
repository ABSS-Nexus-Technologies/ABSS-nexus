import React from 'react';

export default function TrustBar() {
  return (
    <section className="bento-trust-bar-section" aria-label="Enterprise Architecture Standards and Verified Cloud Accreditations">
      <div className="bento-container">
        {/* Header Eyebrow */}
        <div className="trust-bar-header">
          <span className="trust-bar-pill">
            <span className="trust-pulse-dot" aria-hidden="true" />
            <span>Enterprise Architecture Standards</span>
          </span>
          <span className="trust-bar-divider" aria-hidden="true" />
          <span className="trust-bar-subtitle">Trusted Cloud Ecosystems &bull; Verified Production Reliability</span>
        </div>

        {/* 5 High-Tech Glassmorphic Badges */}
        <div className="trust-badges-grid">
          {/* Badge 1: AWS Cloud */}
          <div className="trust-badge-card brand-aws">
            <div className="trust-badge-icon-box" style={{ background: 'rgba(255, 153, 0, 0.08)', borderColor: 'rgba(255, 153, 0, 0.25)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#FF9900" fillOpacity="0.2" stroke="#FF9900" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M7 15l2.5-3 2.5 3" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 13l2-2.5 2 2.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="trust-badge-content">
              <span className="trust-badge-title">AWS Cloud Ecosystem</span>
              <span className="trust-badge-sub">Multi-Region VPC &bull; IAM Hardened</span>
              <span className="trust-badge-status" style={{ color: '#FF9900' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF9900' }} />
                <span>Certified Architecture</span>
              </span>
            </div>
          </div>

          {/* Badge 2: Cloudflare Edge */}
          <div className="trust-badge-card brand-cloudflare">
            <div className="trust-badge-icon-box" style={{ background: 'rgba(243, 128, 32, 0.08)', borderColor: 'rgba(243, 128, 32, 0.25)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#F38020" fillOpacity="0.25" stroke="#F38020" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="trust-badge-content">
              <span className="trust-badge-title">Cloudflare Edge</span>
              <span className="trust-badge-sub">14 Global Regions &bull; Anycast CDN</span>
              <span className="trust-badge-status" style={{ color: '#F38020' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F38020' }} />
                <span>Sub-15ms Latency</span>
              </span>
            </div>
          </div>

          {/* Badge 3: Next.js 16 */}
          <div className="trust-badge-card brand-nextjs">
            <div className="trust-badge-icon-box" style={{ background: 'rgba(0, 212, 255, 0.08)', borderColor: 'rgba(0, 212, 255, 0.25)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <polygon points="12 3 22 20 2 20" fill="rgba(0, 212, 255, 0.15)" stroke="#00D4FF" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M12 9v6" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="17.5" r="0.75" fill="#00D4FF" />
              </svg>
            </div>
            <div className="trust-badge-content">
              <span className="trust-badge-title">Next.js 16 App Router</span>
              <span className="trust-badge-sub">React 19 Server Components</span>
              <span className="trust-badge-status" style={{ color: '#00D4FF' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00D4FF' }} />
                <span>Turbopack Engine</span>
              </span>
            </div>
          </div>

          {/* Badge 4: MSME Govt of India */}
          <div className="trust-badge-card brand-msme">
            <div className="trust-badge-icon-box" style={{ background: 'rgba(234, 179, 8, 0.08)', borderColor: 'rgba(234, 179, 8, 0.25)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="rgba(234, 179, 8, 0.15)" stroke="#EAB308" strokeWidth="1.8" strokeLinejoin="round" />
                <circle cx="12" cy="11" r="3.5" stroke="#EAB308" strokeWidth="1.3" />
                <path d="M12 8.5v5M9.5 11h5M10.2 9.5l3.6 3M10.2 12.5l3.6-3" stroke="#EAB308" strokeWidth="0.9" strokeLinecap="round" />
              </svg>
            </div>
            <div className="trust-badge-content">
              <span className="trust-badge-title">MSME Registered</span>
              <span className="trust-badge-sub">Govt. of India Recognized</span>
              <span className="trust-badge-status" style={{ color: '#EAB308' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#EAB308' }} />
                <span>UDYAM Verified</span>
              </span>
            </div>
          </div>

          {/* Badge 5: OWASP Zero-Trust */}
          <div className="trust-badge-card brand-security">
            <div className="trust-badge-icon-box" style={{ background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="3" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1.8" />
                <path d="M8 11V7a4 4 0 118 0v4" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1.5" fill="#10B981" />
              </svg>
            </div>
            <div className="trust-badge-content">
              <span className="trust-badge-title">OWASP Zero-Trust</span>
              <span className="trust-badge-sub">Penetration Tested &bull; Strict CSP</span>
              <span className="trust-badge-status" style={{ color: '#10B981' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981' }} />
                <span>ISO/SOC2 Aligned</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
