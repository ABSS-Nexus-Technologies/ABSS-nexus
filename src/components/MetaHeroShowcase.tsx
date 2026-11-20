'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Cpu,
  Layers,
  Database,
  Globe,
  Zap,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Code2,
  Terminal,
  Activity,
  Users,
} from 'lucide-react';

export default function MetaHeroShowcase() {
  const [activeTab, setActiveTab] = useState<'services' | 'saas' | 'intennexus'>('services');

  return (
    <div className="meta-showcase-wrapper" style={{ marginTop: '48px', width: '100%', position: 'relative' }}>
      {/* Meta-Style Interactive Tab Switcher */}
      <div
        className="meta-tab-switcher"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '999px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          marginBottom: '28px',
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`meta-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '999px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            background: activeTab === 'services' ? 'linear-gradient(135deg, #0064e0, #00d4ff)' : 'transparent',
            color: activeTab === 'services' ? '#ffffff' : 'var(--text-muted)',
            boxShadow: activeTab === 'services' ? '0 4px 18px rgba(0, 100, 224, 0.4)' : 'none',
          }}
        >
          <Cpu size={16} />
          <span>Pillar 01: Enterprise IT</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saas')}
          className={`meta-tab-btn ${activeTab === 'saas' ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '999px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            background: activeTab === 'saas' ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : 'transparent',
            color: activeTab === 'saas' ? '#ffffff' : 'var(--text-muted)',
            boxShadow: activeTab === 'saas' ? '0 4px 18px rgba(139, 92, 246, 0.4)' : 'none',
          }}
        >
          <Database size={16} />
          <span>Pillar 02: Business SaaS</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('intennexus')}
          className={`meta-tab-btn ${activeTab === 'intennexus' ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '999px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            background: activeTab === 'intennexus' ? 'linear-gradient(135deg, #ef4444, #f59e0b)' : 'transparent',
            color: activeTab === 'intennexus' ? '#ffffff' : 'var(--text-muted)',
            boxShadow: activeTab === 'intennexus' ? '0 4px 18px rgba(239, 68, 68, 0.4)' : 'none',
          }}
        >
          <Users size={16} />
          <span>Pillar 03: IntenNexus Hub</span>
        </button>
      </div>

      {/* Meta Theater Showcase Screen (32px Curves, Hardware/Software Feel) */}
      <div
        className="meta-screen-card"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '32px',
          padding: 'clamp(24px, 4vw, 42px)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--border-subtle)',
          textAlign: 'left',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.35s ease',
        }}
      >
        {/* Subtle Ambient Corner Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '320px',
            height: '320px',
            background:
              activeTab === 'services'
                ? 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)'
                : activeTab === 'saas'
                ? 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* TAB 1: ENTERPRISE IT SERVICES */}
        {activeTab === 'services' && (
          <div className="meta-tab-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(0, 100, 224, 0.12)', color: '#0064e0', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
                <Activity size={14} /> Next-Gen Enterprise Engineering
              </div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, margin: '0 0 14px', color: 'var(--text-main)', lineHeight: 1.2 }}>
                High-Performance Platforms Built on Next.js 16 &amp; Cloud Edge
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.65, margin: '0 0 24px' }}>
                We architect sub-second full-stack web applications, microservices, mobile apps, and AI automations. 16 distinct engineering disciplines with 99.98% uptime SLA.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>16 IT Disciplines</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>&lt;50ms Edge Latency</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Zero Hydration Lag</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Founder-Led Architecture</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  href="/services"
                  className="bento-btn-primary"
                  style={{ padding: '12px 26px', fontSize: '0.92rem' }}
                >
                  <span>Explore 16 Services</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="bento-btn-glass"
                  style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                >
                  <span>Schedule Consultation</span>
                </Link>
              </div>
            </div>

            {/* Simulated Live Architecture Terminal Mockup */}
            <div
              style={{
                background: '#090d16',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid rgba(0, 212, 255, 0.25)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                </div>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>edge-telemetry.abssnexus.in</span>
              </div>
              <div style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#38bdf8' }}>
                <p style={{ margin: '0 0 6px', color: '#10b981' }}>✓ 300+ Edge Nodes Operational</p>
                <p style={{ margin: '0 0 6px' }}>&gt; Route: /services/website-development</p>
                <p style={{ margin: '0 0 6px' }}>&gt; Build Target: Next.js 16.4.6 (Turbopack)</p>
                <p style={{ margin: '0 0 6px' }}>&gt; Core Web Vitals: LCP 0.8s | CLS 0.00 | FID 0ms</p>
                <p style={{ margin: '0 0 6px', color: '#f59e0b' }}>&gt; Global Anycast Ping: 18ms (Jaipur &bull; Mumbai &bull; US-East)</p>
                <div style={{ marginTop: '14px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff', fontSize: '0.78rem' }}>
                  ⚡ All 50+ Static Pages Synchronized with 100/100 Lighthouse Benchmark
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BUSINESS CLOUD SAAS */}
        {activeTab === 'saas' && (
          <div className="meta-tab-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
                <Database size={14} /> Modular Cloud Software Suite
              </div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, margin: '0 0 14px', color: 'var(--text-main)', lineHeight: 1.2 }}>
                ABSS Business Suite: ERP, CRM &amp; Intelligent HRM
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.65, margin: '0 0 24px' }}>
                Eliminate expensive multi-vendor SaaS bloat. Our integrated cloud suite unites billing, inventory, client pipelines, and team payroll into a unified, high-security dashboard.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#8b5cf6" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>ABSS Cloud ERP</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#8b5cf6" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Intelligent CRM</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#8b5cf6" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Automated Billing</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#8b5cf6" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>From ₹999 / mo</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  href="/pricing"
                  className="bento-btn-primary"
                  style={{ padding: '12px 26px', fontSize: '0.92rem', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
                >
                  <span>View SaaS Packages</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/ecosystem#saas-suite"
                  className="bento-btn-glass"
                  style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                >
                  <span>Explore Architecture</span>
                </Link>
              </div>
            </div>

            {/* Simulated SaaS Dashboard Widget */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>MONTHLY RECURRING REVENUE</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>₹4,85,000 <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>+24.6%</span></div>
                </div>
                <div style={{ padding: '6px 14px', borderRadius: '999px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', fontSize: '0.8rem', fontWeight: 700 }}>
                  Active Business Suite
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', fontSize: '0.85rem' }}>
                  <span>ABSS ERP Inventory Flow</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>99.9% In-Stock</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', fontSize: '0.85rem' }}>
                  <span>CRM Lead Conversion</span>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>38.4% Close Rate</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', fontSize: '0.85rem' }}>
                  <span>Automated GST Invoices</span>
                  <span style={{ color: '#c084fc', fontWeight: 700 }}>1,240 Generated</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INTENNEXUS TALENT HUB */}
        {activeTab === 'intennexus' && (
          <div className="meta-tab-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
                <Users size={14} /> Talent Incubation &amp; Production Mentorship
              </div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, margin: '0 0 14px', color: 'var(--text-main)', lineHeight: 1.2 }}>
                IntenNexus: Bridging the College-to-Industry Skills Chasm
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.65, margin: '0 0 24px' }}>
                Our proprietary engineering talent incubator trains student developers directly on live production codebases, GitHub CI/CD workflows, and edge cloud architectures.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#ef4444" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Live Production Git</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#ef4444" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Direct Code Review</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#ef4444" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Full-Stack &amp; AI</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#ef4444" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>Placement Pipeline</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="https://www.intennexus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-btn-primary"
                  style={{ padding: '12px 26px', fontSize: '0.92rem', background: 'linear-gradient(135deg, #ef4444, #f59e0b)' }}
                >
                  <span>Visit IntenNexus Hub</span>
                  <ExternalLink size={16} />
                </a>
                <Link
                  href="/ecosystem#talent-incubator"
                  className="bento-btn-glass"
                  style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                >
                  <span>Learn About Program</span>
                </Link>
              </div>
            </div>

            {/* Simulated IntenNexus Live Portal Card */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>IntenNexus Portal Stream</span>
                <span style={{ fontSize: '0.76rem', color: '#10b981', fontWeight: 600 }}>● Cohort 2026 Active</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', borderLeft: '3px solid #ef4444' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>PR #142 Merged &bull; Next.js 16 Edge Route</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Reviewed by Shubham Kumar &bull; 100% Test Coverage</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', borderLeft: '3px solid #f59e0b' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>AI Agent Automation Workflow</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Candidate Module 04 &bull; Completed Successfully</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.04)', borderLeft: '3px solid #10b981' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>Verified Certificate Issued</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Cryptographic verification on intennexus.com</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
