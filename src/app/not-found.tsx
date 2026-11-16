import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found (404)',
  description: 'The requested page could not be located on ABSS Nexus Technologies.',
};

export default function NotFound() {
  return (
    <main>
      <section className="site-hero site-hero--page page-hero section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="site-hero__container container" style={{ textAlign: 'center' }}>
          <span className="site-hero__eyebrow section-badge-apple">
            <span>Error 404 &bull; Resource Not Found</span>
          </span>
          <h1 className="site-hero__title" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>404 &mdash; Page Not Found</h1>
          <p className="site-hero__description" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
            The page you requested may have moved, been renamed, or does not exist. Explore our services or return to the
            home page.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn btn-glow-cyan" href="/">
              Return to Homepage &rarr;
            </Link>
            <Link className="btn btn-glass" href="/services">
              Browse All Services
            </Link>
            <Link className="btn btn-glass" href="/contact">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
