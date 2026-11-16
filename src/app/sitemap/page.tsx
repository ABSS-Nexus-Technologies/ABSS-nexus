import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { servicesData } from '@/src/lib/data/services';
import { portfolioData } from '@/src/lib/data/work';
import { blogPosts } from '@/src/lib/data/blog';
import { careerRoles } from '@/src/lib/data/careers';

export const metadata: Metadata = {
  title: 'HTML Sitemap & Platform Index',
  description: 'Complete directory index of all pages, services, case studies, and engineering publications on ABSS Nexus Technologies.',
};

export default function SitemapPage() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section">
        <div className="site-hero__container container">
          <span className="site-hero__eyebrow section-badge-apple">Site Index &bull; Updated 2026</span>
          <h1 className="site-hero__title">Website Directory &amp; Sitemap</h1>
          <p className="site-hero__description">
            Complete architectural directory indexing all services, solutions, portfolio projects, and technical publications.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '36px' }}>
            {/* Core Navigation */}
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-blue)', marginBottom: '14px', borderBottom: '2px solid var(--border-subtle)', paddingBottom: '8px' }}>
                Core Navigation
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link href="/" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Home</Link></li>
                <li><Link href="/about" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>About Us</Link></li>
                <li><Link href="/services" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>All 16 Services</Link></li>
                <li><Link href="/solutions" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Solutions Architecture</Link></li>
                <li><Link href="/industries" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Industries We Serve</Link></li>
                <li><Link href="/work" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Portfolio &amp; Work</Link></li>
                <li><Link href="/pricing" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Pricing Packages</Link></li>
                <li><Link href="/careers" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Careers &amp; Jobs</Link></li>
                <li><Link href="/blog" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Engineering Blog</Link></li>
                <li><Link href="/faq" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>FAQ</Link></li>
                <li><Link href="/contact" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Contact &amp; Inquiries</Link></li>
              </ul>
            </div>

            {/* 16 Services */}
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-blue)', marginBottom: '14px', borderBottom: '2px solid var(--border-subtle)', paddingBottom: '8px' }}>
                All 16 IT Disciplines
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {servicesData.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Portfolio & Blog */}
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-blue)', marginBottom: '14px', borderBottom: '2px solid var(--border-subtle)', paddingBottom: '8px' }}>
                Case Studies &amp; Publications
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {portfolioData.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/work/${p.slug}`} style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>
                      Case Study: {p.title}
                    </Link>
                  </li>
                ))}
                {blogPosts.map((b) => (
                  <li key={b.slug}>
                    <Link href={`/blog/${b.slug}`} style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>
                      Blog: {b.title}
                    </Link>
                  </li>
                ))}
                {careerRoles.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/careers/${c.slug}`} style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>
                      Role: {c.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-blue)', marginTop: '28px', marginBottom: '14px', borderBottom: '2px solid var(--border-subtle)', paddingBottom: '8px' }}>
                Legal &amp; Governance
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link href="/privacy-policy" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Terms &amp; Conditions</Link></li>
                <li><Link href="/cookie-policy" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Cookie Policy</Link></li>
                <li><Link href="/disclaimer" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Disclaimer</Link></li>
                <li><Link href="/refund-policy" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Refund Policy</Link></li>
                <li><Link href="/support-policy" style={{ color: 'var(--color-near-black)', textDecoration: 'none' }}>Support Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
