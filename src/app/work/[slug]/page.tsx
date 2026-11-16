import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { portfolioData, getProjectBySlug } from '@/src/lib/data/work';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Case Study Not Found' };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.shortDesc,
    openGraph: {
      title: `${project.title} | ABSS Nexus Technologies`,
      description: project.shortDesc,
      url: `https://abssnexus.in/work/${project.slug}`,
      images: [{ url: project.image }],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <nav className="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator" aria-hidden="true">/</span>
            <Link href="/work">Work</Link>
            <span className="separator" aria-hidden="true">/</span>
            <span className="current">{project.title}</span>
          </nav>

          <span className="site-hero__eyebrow section-badge-apple">
            {project.categoryLabel} &bull; {project.client}
          </span>
          <h1 className="site-hero__title">{project.title}</h1>
          <p className="site-hero__description">{project.fullDesc}</p>

          <div className="site-hero__actions hero-actions">
            {project.liveUrl ? (
              <a
                className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Visit Live Application &rarr;</span>
              </a>
            ) : (
              <Link className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan" href="/contact#project-inquiry">
                <span>Request Similar Architecture &rarr;</span>
              </Link>
            )}
            <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/work">
              <span>Back to All Work</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: '36px 0', background: 'rgba(0, 102, 204, 0.03)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
          {project.impactMetrics.map((m, i) => (
            <div key={i}>
              <strong style={{ fontSize: '2.4rem', color: 'var(--color-blue)', display: 'block', fontWeight: 800 }}>
                {m.value}
              </strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-near-black)', marginBottom: '14px' }}>Executive Overview</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-near-black)' }}>{project.overview}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '40px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#b91c1c', marginBottom: '12px' }}>The Challenge</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-dim)', margin: 0 }}>{project.problem}</p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#047857', marginBottom: '12px' }}>Our Solution</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-dim)', margin: 0 }}>{project.solution}</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-near-black)', marginBottom: '16px' }}>Key Technical Outcomes</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.keyOutcomes.map((outcome, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    background: 'rgba(0, 0, 0, 0.02)',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    color: 'var(--color-near-black)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-dim)', marginBottom: '12px' }}>
              Technologies &amp; Architecture:
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.technologies.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.85rem',
                    padding: '6px 14px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '999px',
                    color: 'var(--color-near-black)',
                    fontWeight: 500,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container">
          <div className="radiant-cta-box">
            <p className="eyebrow">Ready for Measurable Results?</p>
            <h2>Build a Solution of Similar Caliber for Your Business</h2>
            <p>Schedule an architecture call with Shubham Kumar to evaluate your timeline and technical specs.</p>
            <div className="radiant-cta-actions">
              <Link className="btn btn-glow-cyan" href="/contact#project-inquiry">
                Schedule Project Discovery &rarr;
              </Link>
              <a className="btn btn-whatsapp-outline" href="https://wa.me/918757928673" target="_blank" rel="noopener noreferrer">
                Discuss on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
