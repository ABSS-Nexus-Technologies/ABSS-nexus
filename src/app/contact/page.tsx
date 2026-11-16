import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/src/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us & Start Your Project',
  description:
    'Get in touch with ABSS Nexus Technologies for new project inquiries, software consulting, and technical advisory. Reach us via phone, email, or WhatsApp.',
};

export default function ContactPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">
            <span className="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Founder-Led Advisory &bull; Open 2026</span>
          </span>
          <h1 className="site-hero__title">Let&apos;s Build Something Extraordinary Together</h1>
          <p className="site-hero__description">
            Whether you have a detailed technical specification ready or simply want to explore architectural options for your
            business, we are ready to guide you toward the right solution.
          </p>
        </div>
      </section>

      <section className="section" id="project-inquiry">
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
            {/* Left: Contact Info */}
            <div>
              <div className="section-heading" style={{ textAlign: 'left', marginBottom: '28px' }}>
                <p className="eyebrow">Direct Contact</p>
                <h2 style={{ fontSize: '1.8rem' }}>Get in Touch Directly</h2>
                <p>We typically respond to inquiries within 4 business hours.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-dim)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Telephone &amp; WhatsApp Hotline
                  </span>
                  <a href="tel:+918757928673" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-blue)', textDecoration: 'none' }}>
                    +91 87579 28673
                  </a>
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>
                    Mon &ndash; Sat, 9:00 AM &ndash; 7:00 PM IST
                  </p>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-dim)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Official Corporate Email
                  </span>
                  <a href="mailto:abssnexus@gmail.com" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-near-black)', textDecoration: 'none' }}>
                    abssnexus@gmail.com
                  </a>
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>
                    For RFP documents, vendor compliance, and formal quotes
                  </p>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-dim)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Registered Operational Office
                  </span>
                  <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-near-black)' }}>
                    Jaipur, Rajasthan, India
                  </p>
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>
                    MSME Registered Digital Enterprise
                  </p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <a
                    className="btn btn-whatsapp-outline"
                    href="https://wa.me/918757928673"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Quick WhatsApp Chat &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div style={{ background: 'var(--bg-card)', padding: '36px', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-near-black)', margin: '0 0 6px 0' }}>Project Discovery Form</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', margin: 0 }}>
                  Fill out the form below to receive an architectural estimate.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
