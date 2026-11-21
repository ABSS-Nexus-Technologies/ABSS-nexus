import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/src/components/ContactForm';
import HeroBackdrop from '@/src/components/HeroBackdrop';

export const metadata: Metadata = {
  title: 'Contact Us & Start Your Project | ABSS Nexus Technologies',
  description:
    'Get in touch with ABSS Nexus Technologies for new project inquiries, software consulting, and technical advisory. Reach us via phone, email, or WhatsApp.',
};

export default function ContactPage() {
  return (
    <main>
      <section className="bento-hero-section" id="hero" style={{ padding: '40px 0 30px' }}>
        <HeroBackdrop variant="contact" />
        <div className="bento-container" style={{ textAlign: 'center' }}>
          <div className="bento-pill-badge">
            <span className="live-pulse-dot" aria-hidden="true" />
            <span>Founder-Led Advisory &bull; Open 2026</span>
          </div>
          <h1 className="bento-hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
            Let&apos;s Build Something <span className="gradient-text-hero">Extraordinary</span>
          </h1>
          <p className="bento-hero-subtitle" style={{ maxWidth: '720px' }}>
            Whether you have a detailed technical specification ready or simply want to explore architectural options for your
            business, we are ready to guide you toward the right solution.
          </p>
        </div>
      </section>

      <section className="bento-section" id="project-inquiry" style={{ paddingTop: '50px' }}>
        <div className="bento-container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'start' }}>
            {/* Left: Direct Contact Information */}
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="bento-section-eyebrow">Direct Contact</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                  Get in Touch Directly
                </h2>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  We typically respond to inquiries within 4 business hours.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="bento-card" style={{ padding: '24px' }}>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                    Telephone &amp; WhatsApp Hotline
                  </span>
                  <a href="tel:+917688899205" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', textDecoration: 'none', fontFamily: 'var(--font-heading)' }}>
                    +91 76888 99205
                  </a>
                  <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Mon &ndash; Sat, 9:00 AM &ndash; 7:00 PM IST
                  </p>
                </div>

                <div className="bento-card" style={{ padding: '24px' }}>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                    Official Corporate Email
                  </span>
                  <a href="mailto:abssnexus@gmail.com" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', textDecoration: 'none' }}>
                    abssnexus@gmail.com
                  </a>
                  <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    For RFP documents, vendor compliance, and formal quotes
                  </p>
                </div>

                <div className="bento-card" style={{ padding: '24px' }}>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                    Registered Operational Office
                  </span>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Jaipur, Rajasthan, India
                  </p>
                  <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    MSME Registered Digital Enterprise &bull; Govt. of India
                  </p>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <a
                    className="bento-btn-whatsapp"
                    href="https://wa.me/917688899205?text=Hi%20Shubham%2C%20I%20saw%20your%20portfolio%20on%20ABSS%20Nexus%20Technologies%20and%20I%20want%20to%20discuss%20a%20new%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Chat Directly on WhatsApp &rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bento-card" style={{ padding: '36px' }}>
              <div style={{ marginBottom: '20px' }}>
                <span className="bento-badge-live" style={{ marginBottom: '8px' }}>Active Response Queue</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', margin: '6px 0' }}>
                  Start Your Project Inquiry
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Fill out the scope brief below and we will prepare a tailored engineering proposal.
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
