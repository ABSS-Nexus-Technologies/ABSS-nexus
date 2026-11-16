import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { careerRoles, getCareerBySlug } from '@/src/lib/data/careers';

interface CareerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return careerRoles.map((role) => ({
    slug: role.slug,
  }));
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareerBySlug(slug);

  if (!role) {
    return { title: 'Role Not Found' };
  }

  return {
    title: `${role.title} | Careers at ABSS Nexus Technologies`,
    description: role.overview,
  };
}

export default async function CareerRoleDetailPage({ params }: CareerPageProps) {
  const { slug } = await params;
  const role = getCareerBySlug(slug);

  if (!role) {
    notFound();
  }

  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <nav className="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator" aria-hidden="true">/</span>
            <Link href="/careers">Careers</Link>
            <span className="separator" aria-hidden="true">/</span>
            <span className="current">{role.title}</span>
          </nav>

          <span className="site-hero__eyebrow section-badge-apple">
            {role.department} &bull; {role.type} &bull; {role.location}
          </span>
          <h1 className="site-hero__title">{role.title}</h1>
          <p className="site-hero__description">{role.overview}</p>

          <div className="site-hero__actions hero-actions">
            <a
              className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan"
              href={`mailto:abssnexus@gmail.com?subject=${encodeURIComponent(`Application for ${role.title}`)}`}
            >
              <span>Apply via Email &rarr;</span>
            </a>
            <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/careers">
              <span>View All Openings</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-near-black)', marginBottom: '16px' }}>Core Responsibilities</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {role.responsibilities.map((r, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.96rem', color: 'var(--color-near-black)' }}>
                  <span style={{ color: 'var(--color-blue)', fontWeight: 700 }}>&bull;</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-near-black)', marginBottom: '16px' }}>Requirements &amp; Skills</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {role.requirements.map((req, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.96rem', color: 'var(--color-near-black)' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>&check;</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-near-black)', marginBottom: '16px' }}>Perks &amp; Benefits</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {role.perks.map((p, i) => (
                <div key={i} style={{ padding: '14px 18px', background: 'rgba(0, 102, 204, 0.04)', borderRadius: '8px', fontSize: '0.92rem', color: 'var(--color-near-black)', fontWeight: 500 }}>
                  ✨ {p}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '36px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-near-black)', marginBottom: '10px' }}>Ready to Apply?</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-dim)', marginBottom: '20px' }}>
              Email your resume, GitHub / portfolio link, and a brief note to <strong>abssnexus@gmail.com</strong>.
            </p>
            <a
              className="btn btn-glow-cyan"
              href={`mailto:abssnexus@gmail.com?subject=${encodeURIComponent(`Application for ${role.title}`)}`}
            >
              Send Application to abssnexus@gmail.com &rarr;
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
