import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { blogPosts, getBlogPostBySlug } from '@/src/lib/data/blog';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${post.title} | ABSS Nexus Technologies Engineering`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://abssnexus.in/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" id="hero">
        <div className="site-hero__container container" style={{ maxWidth: '840px' }}>
          <nav className="site-hero__breadcrumb breadcrumb-trail" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator" aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link>
            <span className="separator" aria-hidden="true">/</span>
            <span className="current">{post.title}</span>
          </nav>

          <span className="site-hero__eyebrow section-badge-apple">
            {post.category} &bull; {post.readTime}
          </span>
          <h1 className="site-hero__title" style={{ fontSize: '2.4rem', lineHeight: 1.25 }}>
            {post.title}
          </h1>
          <p className="site-hero__description" style={{ fontSize: '1.1rem' }}>
            {post.summary}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '20px', fontSize: '0.92rem', color: 'var(--color-text-dim)' }}>
            <span style={{ fontWeight: 600, color: 'var(--color-near-black)' }}>{post.author}</span>
            <span>&bull;</span>
            <span>{post.authorRole}</span>
            <span>&bull;</span>
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <article
            style={{
              fontSize: '1.08rem',
              lineHeight: 1.8,
              color: 'var(--color-near-black)',
            }}
          >
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} style={{ fontSize: '1.6rem', marginTop: '36px', marginBottom: '14px', color: 'var(--color-near-black)' }}>
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} style={{ fontSize: '1.3rem', marginTop: '28px', marginBottom: '12px', color: 'var(--color-near-black)' }}>
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').map((item) => item.replace(/^- /, ''));
                return (
                  <ul key={index} style={{ margin: '16px 0 24px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {listItems.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d+\. /)) {
                const listItems = paragraph.split('\n').map((item) => item.replace(/^\d+\. /, ''));
                return (
                  <ol key={index} style={{ margin: '16px 0 24px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {listItems.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} style={{ marginBottom: '20px' }}>
                  {paragraph}
                </p>
              );
            })}
          </article>

          {/* Author Box */}
          <div style={{ marginTop: '56px', padding: '32px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-blue), #00c2ff)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}>
              SK
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '1.15rem', color: 'var(--color-near-black)' }}>Written by {post.author}</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-dim)' }}>
                {post.authorRole} at ABSS Nexus Technologies. Dedicated to building reliable, accessible, and ultra-fast digital infrastructure.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link className="btn btn-glass" href="/blog">
              &larr; Back to All Publications
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
