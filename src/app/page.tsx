import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/src/lib/data/services';
import { portfolioData } from '@/src/lib/data/work';
import { faqList } from '@/src/lib/data/faq';
import ProjectFilter from '@/src/components/ProjectFilter';
import FaqAccordion from '@/src/components/FaqAccordion';

export default function HomePage() {
  const featuredServices = servicesData.slice(0, 6);

  return (
    <main>
      {/* Section 1: Hero */}
      <section className="site-hero site-hero--marketing section" id="hero">
        <div className="site-hero__container container site-hero__grid hero-grid">
          <div className="site-hero__content hero-copy">
            <div className="site-hero__eyebrow hero-pill-badge">
              <span className="site-hero__pulse-dot live-pulse-dot" aria-hidden="true"></span>
              <span>ENTERPRISE IT SERVICES &bull; SOLUTIONS OPEN 2026</span>
            </div>
            <h1 className="site-hero__title hero-title hero-headline-gradient">
              We Build Digital Experiences That{' '}
              <span className="site-hero__title-accent text-gradient-cyan">Move Businesses Forward</span>
            </h1>
            <p className="site-hero__description hero-subtitle hero-description">
              From modern websites and custom software to scalable cloud architectures, we empower businesses with
              high-converting digital platforms, sub-second performance, and reliable engineering support.
            </p>
            <div className="site-hero__actions hero-actions" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link className="site-hero__btn site-hero__btn--primary btn btn-glow-cyan" href="/contact#project-inquiry">
                <span>Start Your Project</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/services">
                <span>Explore Services</span>
              </Link>
              <Link className="site-hero__btn site-hero__btn--secondary btn btn-glass" href="/pricing">
                <span>View Pricing</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual Mockups */}
          <div className="site-hero__visual hero-visual-stage">
            <div className="hero-device-workspace" aria-label="Refined digital product interfaces displayed on laptop and smartphone">
              <div className="hero-badge-float hero-badge-float--top-right">
                <span className="hero-badge-dot hero-badge-dot--green" aria-hidden="true"></span>
                <span>Edge Active &bull; 99.9% SLA</span>
              </div>

              {/* Laptop Mockup */}
              <div className="hero-laptop">
                <div className="hero-laptop__screen-frame">
                  <div className="hero-laptop__camera" aria-hidden="true"></div>
                  <div className="hero-laptop__screen-content">
                    <picture>
                      <source srcSet="/assets/images/project-dashboard-ui.webp" type="image/webp" />
                      <img
                        src="/assets/images/project-dashboard-ui.png"
                        alt="Executive SaaS analytics dashboard interface"
                        width={1024}
                        height={640}
                        loading="eager"
                        decoding="async"
                      />
                    </picture>
                  </div>
                </div>
                <div className="hero-laptop__base" aria-hidden="true">
                  <div className="hero-laptop__base-notch"></div>
                </div>
              </div>

              {/* Smartphone Mockup */}
              <div className="hero-phone">
                <div className="hero-phone__frame">
                  <div className="hero-phone__notch" aria-hidden="true"></div>
                  <div className="hero-phone__screen">
                    <picture>
                      <source srcSet="/assets/images/project-ecommerce-demo.webp" type="image/webp" />
                      <img
                        src="/assets/images/project-ecommerce-demo.png"
                        alt="Responsive mobile e-commerce interface"
                        width={480}
                        height={960}
                        loading="eager"
                        decoding="async"
                      />
                    </picture>
                  </div>
                </div>
              </div>

              <div className="hero-badge-float hero-badge-float--bottom-left">
                <span className="hero-badge-dot" aria-hidden="true"></span>
                <span>Core Web Vitals 100/100 &bull; &lt;35ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Live Stats */}
      <section className="agency-stats-section" id="intro" aria-label="Key Performance Metrics">
        <div className="container agency-stats-grid">
          <div className="agency-stat-card">
            <strong className="stat-num">50+</strong>
            <span>Projects Shipped</span>
          </div>
          <div className="agency-stat-card">
            <strong className="stat-num">99.2%</strong>
            <span>Client Recommendation</span>
          </div>
          <div className="agency-stat-card">
            <strong className="stat-num">3x</strong>
            <span>Faster Average Delivery</span>
          </div>
          <div className="agency-stat-card">
            <strong className="stat-num">100%</strong>
            <span>Responsive Mobile Design</span>
          </div>
        </div>
      </section>

      {/* Section 3: Technology Ticker Ribbon */}
      <section className="tech-ticker-section tech-ticker" aria-label="Technology Stack">
        <div className="tech-ticker-heading">
          <p>Technologies &amp; Frameworks We Build With</p>
        </div>
        <div className="tech-marquee-wrapper">
          <div className="tech-marquee-track">
            <span className="tech-pill" style={{ borderColor: 'rgba(0, 194, 255, 0.4)', background: 'rgba(0, 194, 255, 0.08)', fontWeight: 600 }}>
              <span className="tech-pill-dot" style={{ background: '#00c2ff' }}></span>Next.js App Router
            </span>
            <span className="tech-pill" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', background: 'rgba(16, 185, 129, 0.08)', fontWeight: 600 }}>
              <span className="tech-pill-dot" style={{ background: '#10b981' }}></span>TypeScript Strict
            </span>
            <span className="tech-pill" style={{ borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.08)', fontWeight: 600 }}>
              <span className="tech-pill-dot" style={{ background: '#f59e0b' }}></span>React Server Components
            </span>
            <span className="tech-pill" style={{ borderColor: 'rgba(99, 102, 241, 0.4)', background: 'rgba(99, 102, 241, 0.08)', fontWeight: 600 }}>
              <span className="tech-pill-dot" style={{ background: '#6366f1' }}></span>Cloudflare Edge &amp; D1
            </span>
            <span className="tech-pill"><span className="tech-pill-dot"></span>Tailwind CSS</span>
            <span className="tech-pill"><span className="tech-pill-dot"></span>Node.js</span>
            <span className="tech-pill"><span className="tech-pill-dot"></span>PostgreSQL</span>
            <span className="tech-pill"><span className="tech-pill-dot"></span>Figma UI/UX</span>
            <span className="tech-pill"><span className="tech-pill-dot"></span>Python AI</span>
            <span className="tech-pill"><span className="tech-pill-dot"></span>REST &amp; WebSockets</span>
            <span className="tech-pill"><span className="tech-pill-dot"></span>Docker &amp; CI/CD</span>
            {/* Infinite loop copy */}
            <span className="tech-pill" style={{ borderColor: 'rgba(0, 194, 255, 0.4)', background: 'rgba(0, 194, 255, 0.08)', fontWeight: 600 }}>
              <span className="tech-pill-dot" style={{ background: '#00c2ff' }}></span>Next.js App Router
            </span>
            <span className="tech-pill" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', background: 'rgba(16, 185, 129, 0.08)', fontWeight: 600 }}>
              <span className="tech-pill-dot" style={{ background: '#10b981' }}></span>TypeScript Strict
            </span>
            <span className="tech-pill" style={{ borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.08)', fontWeight: 600 }}>
              <span className="tech-pill-dot" style={{ background: '#f59e0b' }}></span>React Server Components
            </span>
            <span className="tech-pill" style={{ borderColor: 'rgba(99, 102, 241, 0.4)', background: 'rgba(99, 102, 241, 0.08)', fontWeight: 600 }}>
              <span className="tech-pill-dot" style={{ background: '#6366f1' }}></span>Cloudflare Edge &amp; D1
            </span>
          </div>
        </div>
      </section>

      {/* Section 4: Services Showcase */}
      <section className="section services" id="services">
        <div className="services-digital-mesh" aria-hidden="true"></div>
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Layered Digital Capabilities</p>
            <h2>Engineering Solutions Across 16 Authentic Disciplines</h2>
            <p>
              Explore our complete catalog of high-speed web platforms, enterprise dashboards,
              cloud engineering, and modern UI/UX design systems.
            </p>
          </div>

          <div className="cinematic-services-grid">
            {featuredServices.map((service) => (
              <Link className="cinematic-service-card" href={`/services/${service.slug}`} key={service.id}>
                <div className="cinematic-card-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <span className="cinematic-card-badge">{service.badge}</span>
                <h3>{service.title}</h3>
                <p>{service.shortDesc}</p>
                <ul className="cinematic-features-tags">
                  {service.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <span className="cinematic-card-cta">Explore Service Details &rarr;</span>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link className="btn btn-glow-cyan" href="/services">
              View All 16 Services &amp; Packages &rarr;
            </Link>
          </div>

          {/* Transition Banner */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '28px',
              background: 'rgba(0, 102, 204, 0.04)',
              border: '1px dashed rgba(0, 102, 204, 0.28)',
              borderRadius: '12px',
              padding: '18px 24px',
              maxWidth: '680px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-near-black)', fontWeight: 500 }}>
              Looking for a custom enterprise technical solution?{' '}
              <Link
                href="/contact#project-inquiry"
                style={{ color: 'var(--color-blue)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '4px' }}
              >
                Schedule an Architecture Consultation &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Featured Portfolio */}
      <section className="section projects" id="projects">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Featured Portfolio</p>
            <h2>Proven Work Engineered for Real Impact</h2>
            <p>
              Explore selected client and concept projects highlighting clean layout design,
              mobile responsiveness, and robust application structure.
            </p>
          </div>

          <ProjectFilter projects={portfolioData} />

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link className="btn btn-glass" href="/work">
              Explore Full Portfolio Archive &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Verified Client Testimonials */}
      <section className="testimonials-section section" id="testimonials" aria-label="Client Testimonials and Endorsements">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Client Endorsements</p>
            <h2>Trusted by Founders, Businesses &amp; Growing Brands</h2>
            <p>
              Here is what startup founders, business owners, and academic leaders have to say
              about our hands-on engineering, sub-second performance, and founder-led execution.
            </p>
          </div>

          <div className="testimonials-grid">
            <article className="testimonial-card">
              <div className="testimonial-card__stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg viewBox="0 0 24 24" key={i}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <p className="testimonial-card__quote">
                &ldquo;ABSS Nexus engineered and delivered our SaaS analytics dashboard in just 8 days.
                Having direct access to Shubham without account manager friction eliminated miscommunication.
                The edge loading speeds and clean modular architecture exceeded our expectations.&rdquo;
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">AV</div>
                <div className="testimonial-card__info">
                  <span className="testimonial-card__name">Aman Verma</span>
                  <span className="testimonial-card__role">Founder &bull; FinEdge Labs</span>
                </div>
              </div>
            </article>

            <article className="testimonial-card">
              <div className="testimonial-card__stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg viewBox="0 0 24 24" key={i}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <p className="testimonial-card__quote">
                &ldquo;Our retail e-commerce storefront saw a 42% lift in customer inquiries within the first 30 days.
                The direct WhatsApp catalog checkout is intuitive and frictionless.
                Their transparent pricing and adherence to delivery deadlines is rare among digital agencies.&rdquo;
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true" style={{ background: 'linear-gradient(135deg, #FF9500, #FF5E3A)' }}>PR</div>
                <div className="testimonial-card__info">
                  <span className="testimonial-card__name">Pooja Rathore</span>
                  <span className="testimonial-card__role">Operations Director &bull; Heritage Crafts India</span>
                </div>
              </div>
            </article>

            <article className="testimonial-card">
              <div className="testimonial-card__stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg viewBox="0 0 24 24" key={i}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <p className="testimonial-card__quote">
                &ldquo;Structuring our multi-department institute website with complex admission forms and student notices was handled masterfully.
                The site loads instantaneously on mobile devices even on 3G connections. Truly high-caliber technical craftsmanship.&rdquo;
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true" style={{ background: 'linear-gradient(135deg, #34C759, #30B0C7)' }}>RM</div>
                <div className="testimonial-card__info">
                  <span className="testimonial-card__name">Dr. R. K. Meena</span>
                  <span className="testimonial-card__role">Registrar &bull; Apex Educational Academy</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Section 7: Radiant Project Inquiry CTA */}
      <section className="section cta-band" id="project-inquiry">
        <div className="container">
          <div className="radiant-cta-box">
            <p className="eyebrow">Start Your Project</p>
            <h2>Ready to Build a High-Performance Digital Product?</h2>
            <p>
              Whether you need a fresh website, a custom web app, or an urgent redesign,
              we are ready to bring your vision to life with speed, precision, and modern aesthetics.
            </p>
            <div className="radiant-cta-actions">
              <Link className="btn btn-glow-cyan" href="/contact#project-inquiry">
                <span>Start Your Project Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <a
                className="btn btn-whatsapp-outline"
                href="https://wa.me/918757928673"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.3-.778.979-.954 1.18-.176.2-.352.226-.653.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.632-.929-2.235-.245-.588-.494-.509-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.722.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.43.25-.704.25-1.307.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.51 2 2.03 6.48 2.03 12.01c0 1.97.57 3.81 1.57 5.37L2 22l4.78-1.54c1.51.92 3.27 1.45 5.26 1.45 5.53 0 10.01-4.48 10.01-10.01S17.57 2 12.04 2zm0 18.25c-1.74 0-3.36-.5-4.74-1.38l-.34-.22-2.83.91.93-2.76-.24-.37c-.98-1.5-1.53-3.27-1.53-5.12 0-4.56 3.71-8.27 8.27-8.27s8.27 3.71 8.27 8.27-3.71 8.27-8.27 8.27z"/>
                </svg>
                <span>WhatsApp Directly</span>
              </a>
            </div>
            <div className="cta-trust-meta">
              <span>&#9742; Direct Line: +91 87579 28673</span>
              <span>&#9993; Email: abssnexus@gmail.com</span>
              <span>&#128205; Location: Jaipur, Rajasthan</span>
            </div>
          </div>

          {/* Section 8: FAQ */}
          <div style={{ marginTop: '50px' }}>
            <FaqAccordion items={faqList} />
          </div>
        </div>
      </section>
    </main>
  );
}
