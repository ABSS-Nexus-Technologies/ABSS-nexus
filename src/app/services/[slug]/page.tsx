import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { servicesData, getServiceBySlug } from '@/src/lib/data/services';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.title} | Enterprise IT Services`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | ABSS Nexus Technologies`,
      description: service.shortDesc,
      url: `https://abssnexus.in/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <nav className="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator" aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span className="separator" aria-hidden="true">/</span>
            <span className="current">{service.title}</span>
          </nav>

          <div className="site-hero__grid service-hero-grid">
            <div className="site-hero__content service-hero-content">
              <span className="site-hero__eyebrow section-badge-apple">
                {service.category} &bull; {service.badge}
              </span>
              <h1 className="site-hero__title">{service.title}</h1>
              <p className="site-hero__description">{service.fullDesc}</p>

              <div className="site-hero__actions hero-actions">
                <Link
                  className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan"
                  href={`/contact?service=${encodeURIComponent(service.title)}#project-inquiry`}
                >
                  <span>Discuss Your Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/services">
                  <span>Explore Other Services</span>
                </Link>
              </div>

              <div className="site-hero__tech-stack tech-pills-row" aria-label="Key Technologies">
                {service.technologies.map((tech) => (
                  <span className="site-hero__tech-tag tech-pill" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="site-hero__visual service-visual-box" aria-label={`${service.title} architectural preview`}>
              <div className="mockup-browser-apple">
                <div className="mockup-browser-header">
                  <div className="mockup-browser-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="mockup-browser-bar">https://abssnexus.in/services/{service.slug}</div>
                </div>
                <div className="mockup-browser-body">
                  <div style={{ height: '12px', width: '45%', background: 'var(--color-blue)', borderRadius: '4px', marginBottom: '8px' }}></div>
                  <div style={{ height: '8px', width: '85%', background: 'var(--color-border)', borderRadius: '4px', marginBottom: '6px' }}></div>
                  <div style={{ height: '8px', width: '70%', background: 'var(--color-border)', borderRadius: '4px', marginBottom: '14px' }}></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div style={{ background: 'var(--color-light-gray)', borderRadius: '6px', border: '1px solid var(--color-border)', padding: '10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-near-black)', display: 'block' }}>Timeline SLA</span>
                      <div style={{ fontSize: '10px', color: 'var(--color-blue)', fontWeight: 600 }}>{service.timeline}</div>
                    </div>
                    <div style={{ background: 'var(--color-light-gray)', borderRadius: '6px', border: '1px solid var(--color-border)', padding: '10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-near-black)', display: 'block' }}>Standard</span>
                      <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 600 }}>Zero Lock-In</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Client Challenges</p>
            <h2>Challenges We Solve for Growing Businesses</h2>
            <p>
              We engineer targeted solutions addressing common architectural, performance, and scalability bottlenecks.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '36px' }}>
            {service.challenges.map((c, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-card)',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(0, 102, 204, 0.08)', color: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '14px' }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', color: 'var(--color-near-black)' }}>{c.title}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-dim)', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(0, 0, 0, 0.02)' }}>
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Milestones &amp; Output</p>
            <h2>Core Deliverables Included</h2>
            <p>Complete project transparency with verified production-ready assets.</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '32px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {service.deliverables.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-near-black)' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container">
          <div className="radiant-cta-box">
            <p className="eyebrow">Ready to Begin?</p>
            <h2>Start Your {service.title} Project Today</h2>
            <p>
              Connect directly with our engineering team for scoping, architectural planning, and custom delivery timelines.
            </p>
            <div className="radiant-cta-actions">
              <Link
                className="btn btn-glow-cyan"
                href={`/contact?service=${encodeURIComponent(service.title)}#project-inquiry`}
              >
                Start Project Now &rarr;
              </Link>
              <a
                className="btn btn-whatsapp-outline"
                href="https://wa.me/918757928673"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
