import React from 'react';

export default function TrustBar() {
  return (
    <section className="bento-trust-bar-section" aria-label="Technology Partnerships and Verified Accreditations" style={{ padding: '30px 0 20px', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255, 255, 255, 0.01)' }}>
      <div className="bento-container">
        <p style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '18px' }}>
          Enterprise Architecture Standards &bull; Trusted Cloud Ecosystems
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
          {/* Badge 1: AWS */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.8, transition: 'opacity 0.2s ease' }}>
            <span style={{ fontSize: '1.2rem' }}>☁️</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>AWS Cloud Ecosystem</span>
          </div>

          {/* Badge 2: Cloudflare */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.8, transition: 'opacity 0.2s ease' }}>
            <span style={{ fontSize: '1.2rem' }}>⚡</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Cloudflare Edge &bull; 14 Regions</span>
          </div>

          {/* Badge 3: Next.js */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.8, transition: 'opacity 0.2s ease' }}>
            <span style={{ fontSize: '1.2rem' }}>▲</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Next.js 16 App Router</span>
          </div>

          {/* Badge 4: MSME */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.8, transition: 'opacity 0.2s ease' }}>
            <span style={{ fontSize: '1.2rem' }}>🏛️</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>MSME Registered (Govt. of India)</span>
          </div>

          {/* Badge 5: Security */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.8, transition: 'opacity 0.2s ease' }}>
            <span style={{ fontSize: '1.2rem' }}>🔒</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>OWASP Zero-Trust Audited</span>
          </div>
        </div>
      </div>
    </section>
  );
}
