import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { careerRoles } from '@/src/lib/data/careers';
import HeroBackdrop from '@/src/components/HeroBackdrop';

export const metadata: Metadata = {
  title: 'Careers at ABSS Nexus Technologies | Engineering & Design Roles',
  description:
    'Join our fast-growing engineering team in Jaipur or remote across India. Explore openings for full-stack developers, UI/UX designers, and cloud architects at ABSS Nexus Technologies.',
};

export default function CareersPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <HeroBackdrop variant="careers" />
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">
            <span className="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>We Are Hiring &bull; 2026 Openings</span>
          </span>
          <h1 className="site-hero__title">Build World-Class Software With Complete Autonomy</h1>
          <p className="site-hero__description">
            We are looking for passionate engineers, system architects, and UI/UX designers who care about craft, performance,
            and shipping production systems that empower genuine businesses.
          </p>

          <div className="site-hero__actions hero-actions">
            <a className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan" href="#openings">
              <span>View Open Positions &darr;</span>
            </a>
            <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/about">
              <span>About Our Culture</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="section" style={{ background: 'rgba(0, 0, 0, 0.02)' }}>
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Life at ABSS Nexus Technologies</p>
            <h2>Why Build Your Career Here?</h2>
            <p>We treat engineers as creators, not ticket-pushing cogs.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '36px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🚀</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-near-black)' }}>Zero Bureaucracy</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-dim)', lineHeight: 1.6, margin: 0 }}>
                Flat organizational structure. You work directly alongside the founder with full autonomy over architectural decisions.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🌐</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-near-black)' }}>Remote &amp; Flexible</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-dim)', lineHeight: 1.6, margin: 0 }}>
                Work from anywhere in India or our Jaipur office. We focus entirely on high-quality shipped code rather than desk hours.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>📈</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-near-black)' }}>Modern Tech Stacks</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-dim)', lineHeight: 1.6, margin: 0 }}>
                No legacy PHP monoliths. You build with Next.js, TypeScript, Cloudflare Workers, Python AI, and modern Figma systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Openings Grid */}
      <section className="section" id="openings">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Current Opportunities</p>
            <h2>Open Engineering &amp; Design Roles</h2>
            <p>Click on any role to view detailed responsibilities, qualifications, and application guidelines.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '840px', margin: '36px auto 0' }}>
            {careerRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/careers/${role.slug}`}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '28px 32px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-blue)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    {role.department} &bull; {role.type}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--color-near-black)', margin: '0 0 6px 0' }}>{role.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-dim)', margin: 0 }}>
                    📍 {role.location} &bull; ⏱ {role.experience} Experience
                  </p>
                </div>
                <span style={{ fontSize: '1.1rem', color: 'var(--color-blue)', fontWeight: 700 }}>
                  View Role &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
