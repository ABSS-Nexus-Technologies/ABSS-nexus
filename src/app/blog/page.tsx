import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts } from '@/src/lib/data/blog';

export const metadata: Metadata = {
  title: 'Engineering & Technology Insights | ABSS Nexus Blog',
  description:
    'Authoritative insights on web performance, Core Web Vitals, cloud architecture, MSME digital verification, and modern UI/UX design systems.',
};

export default function BlogPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">
            <span className="site-hero__pulse-dot" aria-hidden="true"></span>
            <span>Technical Publications &bull; Engineering Journal</span>
          </span>
          <h1 className="site-hero__title">Architectural Perspectives on Modern Web &amp; Cloud Engineering</h1>
          <p className="site-hero__description">
            In-depth analysis, benchmark methodologies, and implementation guides written directly by our engineers to help
            teams build resilient, sub-second digital platforms.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>
                  <span style={{ color: 'var(--color-blue)', fontWeight: 600 }}>{post.category}</span>
                  <span>&bull;</span>
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 style={{ fontSize: '1.5rem', color: 'var(--color-near-black)', margin: 0 }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h2>

                <p style={{ fontSize: '0.98rem', color: 'var(--color-text-dim)', lineHeight: 1.6, margin: 0 }}>
                  {post.summary}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-near-black)', fontWeight: 500 }}>
                    By {post.author} &bull; {post.authorRole}
                  </span>
                  <Link href={`/blog/${post.slug}`} style={{ fontSize: '0.9rem', color: 'var(--color-blue)', fontWeight: 600, textDecoration: 'none' }}>
                    Read Article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
