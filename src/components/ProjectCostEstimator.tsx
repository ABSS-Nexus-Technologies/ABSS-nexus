'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface PlatformOption {
  id: string;
  name: string;
  baseInr: number;
  baseUsd: number;
  baseDays: number;
  icon: string;
}

const PLATFORMS: PlatformOption[] = [
  { id: 'web', name: 'High-Speed Web Platform', baseInr: 25000, baseUsd: 350, baseDays: 7, icon: '🌐' },
  { id: 'ecommerce', name: 'E-Commerce Storefront', baseInr: 45000, baseUsd: 600, baseDays: 12, icon: '🛍️' },
  { id: 'saas', name: 'Custom SaaS / Cloud App', baseInr: 75000, baseUsd: 990, baseDays: 18, icon: '⚡' },
  { id: 'mobile', name: 'Mobile App (iOS & Android)', baseInr: 65000, baseUsd: 850, baseDays: 16, icon: '📱' },
  { id: 'ai', name: 'AI & Cloud Automation', baseInr: 55000, baseUsd: 750, baseDays: 14, icon: '🤖' },
];

const TIERS = [
  { id: 'mvp', name: 'MVP / Starter', multiplier: 1.0, daysAdd: 0, desc: 'Essential core features ready for early market launch' },
  { id: 'growth', name: 'Growth Business', multiplier: 1.5, daysAdd: 5, desc: 'Advanced workflows, high concurrency, and conversion optimizations' },
  { id: 'enterprise', name: 'Enterprise Scale', multiplier: 2.2, daysAdd: 12, desc: 'Multi-region redundancy, strict SLA, and custom enterprise controls' },
];

interface AddonOption {
  id: string;
  name: string;
  priceInr: number;
  priceUsd: number;
  days: number;
}

const ADDONS: AddonOption[] = [
  { id: 'auth', name: 'User Auth & Role Controls (RBAC)', priceInr: 10000, priceUsd: 130, days: 2 },
  { id: 'payment', name: 'Payment Gateway (Razorpay/Stripe)', priceInr: 8000, priceUsd: 110, days: 2 },
  { id: 'admin', name: 'Executive Analytics & Admin Portal', priceInr: 15000, priceUsd: 200, days: 4 },
  { id: 'ai_bot', name: 'Custom AI Assistant / Automation', priceInr: 18000, priceUsd: 240, days: 4 },
  { id: 'security', name: 'Zero-Trust Security & OWASP Hardening', priceInr: 12000, priceUsd: 160, days: 3 },
  { id: 'seo', name: 'Enterprise Technical SEO & Schema', priceInr: 7000, priceUsd: 95, days: 2 },
];

export default function ProjectCostEstimator() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('web');
  const [selectedTier, setSelectedTier] = useState<string>('growth');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['auth', 'admin', 'seo']);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'express'>('standard');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const platform = PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0];
  const tier = TIERS.find((t) => t.id === selectedTier) || TIERS[1];

  let rawInr = platform.baseInr * tier.multiplier;
  let rawUsd = platform.baseUsd * tier.multiplier;
  let rawDays = platform.baseDays + tier.daysAdd;

  selectedAddons.forEach((addonId) => {
    const item = ADDONS.find((a) => a.id === addonId);
    if (item) {
      rawInr += item.priceInr;
      rawUsd += item.priceUsd;
      rawDays += item.days;
    }
  });

  if (timelineSpeed === 'express') {
    rawInr *= 1.2;
    rawUsd *= 1.2;
    rawDays = Math.max(7, Math.round(rawDays * 0.65));
  }

  const estimatedInr = Math.round(rawInr / 500) * 500;
  const estimatedUsd = Math.round(rawUsd / 10) * 10;
  const estimatedDays = Math.round(rawDays);

  const addonNames = selectedAddons
    .map((id) => ADDONS.find((a) => a.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  const whatsappMessage = encodeURIComponent(
    `Hi Shubham, I used the Cost Estimator on ABSS Nexus Technologies:\n` +
      `• Platform: ${platform.name}\n` +
      `• Tier: ${tier.name}\n` +
      `• Add-ons: ${addonNames || 'None'}\n` +
      `• Timeline: ${timelineSpeed === 'express' ? 'Express Sprint' : 'Standard Delivery'} (~${estimatedDays} Days)\n` +
      `• Estimated Investment: ${currency === 'INR' ? `₹${estimatedInr.toLocaleString('en-IN')}` : `$${estimatedUsd.toLocaleString('en-US')}`}\n` +
      `I would like to lock in this estimate and discuss project kickoff.`
  );

  return (
    <div className="bento-card" style={{ padding: '36px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="bento-badge-live" style={{ marginBottom: '10px' }}>
          <span className="live-pulse-dot" aria-hidden="true" />
          <span>Interactive Scope &amp; Budget Engine &bull; 2026</span>
        </span>
        <h3 className="bento-card-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
          Calculate Your Project Investment &amp; Timeline
        </h3>
        <p className="bento-card-desc" style={{ maxWidth: '640px', margin: '0 auto' }}>
          Select your platform requirements, technical tier, and integrations to calculate real-time estimated investment.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {/* Controls Column */}
        <div>
          {/* Step 1: Platform Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '0.06em', marginBottom: '12px' }}>
              1. Select Digital Platform
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlatform(p.id)}
                  className={`estimator-btn ${selectedPlatform === p.id ? 'selected' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{p.icon}</span>
                  <span style={{ fontWeight: selectedPlatform === p.id ? 700 : 500, fontSize: '0.92rem' }}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Architecture Tier */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '0.06em', marginBottom: '12px' }}>
              2. Target Scale &amp; Tier
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTier(t.id)}
                  className={`estimator-btn ${selectedTier === t.id ? 'selected' : ''}`}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: selectedTier === t.id ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Add-on Capabilities */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-cyan)', letterSpacing: '0.06em', marginBottom: '12px' }}>
              3. Key Integrations &amp; Add-ons
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isChecked ? 'rgba(16, 185, 129, 0.35)' : 'var(--border-subtle)'}`,
                      color: isChecked ? 'var(--text-main)' : 'var(--text-muted)',
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span>{addon.name}</span>
                    <span style={{ fontSize: '0.8rem', color: isChecked ? '#10b981' : 'var(--text-dim)', fontWeight: 600 }}>
                      {isChecked ? '✓ Included' : '+ Add'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Estimation Output Card */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="cost-estimator-result-card">
            <div>
              {/* Currency Selector */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Estimated Investment
                </span>
                <div style={{ display: 'flex', gap: '4px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-pill)', padding: '2px' }}>
                  <button
                    type="button"
                    onClick={() => setCurrency('INR')}
                    style={{
                      background: currency === 'INR' ? 'var(--accent-cyan)' : 'transparent',
                      color: currency === 'INR' ? '#000000' : 'var(--text-muted)',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      padding: '2px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    ₹ INR
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    style={{
                      background: currency === 'USD' ? 'var(--accent-cyan)' : 'transparent',
                      color: currency === 'USD' ? '#000000' : 'var(--text-muted)',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      padding: '2px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              {/* Big Budget Number */}
              <div style={{ marginBottom: '18px' }}>
                <span className="cost-big-number" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 800, color: 'var(--accent-cyan)', textShadow: '0 0 25px rgba(0,194,255,0.4)', lineHeight: 1 }}>
                  {currency === 'INR' ? `₹${estimatedInr.toLocaleString('en-IN')}` : `$${estimatedUsd.toLocaleString('en-US')}`}
                </span>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Transparent milestone pricing &bull; 0% hidden charges
                </span>
              </div>

              {/* Delivery Speed Toggle */}
              <div className="estimator-inner-box" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)' }}>Delivery Timeline</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#10b981' }}>~{estimatedDays} Business Days</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('standard')}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: timelineSpeed === 'standard' ? 'rgba(0,194,255,0.15)' : 'transparent',
                      border: `1px solid ${timelineSpeed === 'standard' ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                      color: timelineSpeed === 'standard' ? 'var(--text-main)' : 'var(--text-muted)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('express')}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: timelineSpeed === 'express' ? 'rgba(16,185,129,0.15)' : 'transparent',
                      border: `1px solid ${timelineSpeed === 'express' ? '#10b981' : 'var(--border-subtle)'}`,
                      color: timelineSpeed === 'express' ? '#10b981' : 'var(--text-muted)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    ⚡ Express Sprint
                  </button>
                </div>
              </div>

              {/* Scope Breakdown */}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'var(--text-main)' }}>Included in this package:</p>
                <ul style={{ paddingLeft: '16px', margin: 0 }}>
                  <li>100% Full Source Code &amp; IP Ownership Transfer</li>
                  <li>Responsive Mobile &amp; Desktop Architecture</li>
                  <li>30-Day Post-Launch Defect Warranty</li>
                  <li>Direct Founder Engineering Supervision</li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                className="bento-btn-primary"
                href={`https://wa.me/917688899205?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}
              >
                <span>Lock In Estimate on WhatsApp &rarr;</span>
              </a>
              <Link
                className="bento-btn-glass"
                href={`/contact?platform=${selectedPlatform}&tier=${selectedTier}&budget=${currency === 'INR' ? estimatedInr : estimatedUsd}`}
                style={{ width: '100%', justifyContent: 'center', textAlign: 'center', fontSize: '0.88rem', padding: '10px' }}
              >
                Submit Formal Scope Brief
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
