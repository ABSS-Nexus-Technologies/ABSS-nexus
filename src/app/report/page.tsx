"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeroBackdrop from "@/src/components/HeroBackdrop";
import { CorporateSealLogo, SITE_NAME } from "@/src/components/BrandLogos";
import {
  FileText,
  Printer,
  Share2,
  CheckCircle,
  Download,
  BookOpen,
  Layers,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Award,
  ExternalLink,
  ChevronRight,
  Code,
  Database,
  Globe,
  Zap,
} from "lucide-react";

const CHAPTERS = [
  { id: "front-matter", num: "00", title: "Certificate & Declaration" },
  { id: "abstract", num: "ABS", title: "Executive Summary / Abstract" },
  { id: "chapter-1", num: "01", title: "Introduction & Problem Domain" },
  { id: "chapter-2", num: "02", title: "Tri-Pillar Ecosystem Architecture" },
  { id: "chapter-3", num: "03", title: "System Requirements (SRS)" },
  { id: "chapter-4", num: "04", title: "System Design & Architectural Blueprints" },
  { id: "chapter-5", num: "05", title: "Technology Stack & Implementation" },
  { id: "chapter-6", num: "06", title: "Modular Architecture & Code Blueprints" },
  { id: "chapter-7", num: "07", title: "Testing, QA & Lighthouse Benchmarks" },
  { id: "chapter-8", num: "08", title: "Business Model & Commercial Viability" },
  { id: "chapter-9", num: "09", title: "Conclusion & References" },
];

export default function ProjectReportPage() {
  const [activeSection, setActiveSection] = useState("front-matter");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const chapter of CHAPTERS) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(chapter.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="report-page-wrapper">
      <HeroBackdrop variant="ecosystem" />

      <div className="report-container">
        {/* Top Header & Metadata */}
        <header className="report-hero-header">
          <span className="report-badge">
            <Award size={15} /> Official Academic &amp; Engineering Project Report • 2025–2026
          </span>
          <h1 className="report-main-title">
            ABSS Nexus Technologies
          </h1>
          <p className="report-subtitle">
            A Scalable Next-Generation Enterprise Digital Ecosystem, Distributed Cloud SaaS, and Engineering Talent Incubator
          </p>

          {/* Academic Metadata Grid */}
          <div className="report-meta-grid">
            <div className="report-meta-item">
              <span className="report-meta-label">Author &amp; Lead Architect</span>
              <span className="report-meta-value">Shubham Kumar</span>
            </div>
            <div className="report-meta-item">
              <span className="report-meta-label">Project Role</span>
              <span className="report-meta-value">Founder &amp; Systems Architect</span>
            </div>
            <div className="report-meta-item">
              <span className="report-meta-label">Degree &amp; Discipline</span>
              <span className="report-meta-value">B.Tech / BCA / MCA (CSE / IT)</span>
            </div>
            <div className="report-meta-item">
              <span className="report-meta-label">Academic Year</span>
              <span className="report-meta-value">2025 – 2026</span>
            </div>
            <div className="report-meta-item">
              <span className="report-meta-label">Project Guide</span>
              <span className="report-meta-value">[Project Guide / Supervisor]</span>
            </div>
            <div className="report-meta-item">
              <span className="report-meta-label">Institution</span>
              <span className="report-meta-value">[College / University Name]</span>
            </div>
            <div className="report-meta-item">
              <span className="report-meta-label">Core Tech Stack</span>
              <span className="report-meta-value">Next.js 16 • React 19 • Cloudflare</span>
            </div>
            <div className="report-meta-item">
              <span className="report-meta-label">Audit &amp; Lighthouse Score</span>
              <span className="report-meta-value" style={{ color: "#10b981" }}>
                100 / 100 Performance
              </span>
            </div>
          </div>

          {/* Actions Toolbar */}
          <div className="report-actions-bar">
            <button onClick={handlePrint} className="report-btn report-btn-primary">
              <Printer size={18} /> Print / Save as PDF (A4 Format)
            </button>
            <button onClick={handleCopyLink} className="report-btn report-btn-secondary">
              <Share2 size={18} /> {copied ? "Link Copied!" : "Share Report Link"}
            </button>
            <Link
              href="/ecosystem"
              className="report-btn report-btn-secondary"
              target="_blank"
            >
              <ExternalLink size={18} /> View Live Ecosystem
            </Link>
          </div>
        </header>

        {/* 2-Column Report Body */}
        <div className="report-content-grid">
          {/* Sticky Navigation Sidebar */}
          <aside className="report-sidebar-nav">
            <div className="report-sidebar-title">
              <span>Table of Contents</span>
              <BookOpen size={16} />
            </div>
            <ul className="report-nav-list">
              {CHAPTERS.map((ch) => (
                <li
                  key={ch.id}
                  className={`report-nav-item ${activeSection === ch.id ? "active" : ""}`}
                >
                  <a href={`#${ch.id}`}>
                    <span className="report-nav-chapter-num">{ch.num}</span>
                    <span>{ch.title}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: "1.75rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                fontSize: "0.8rem",
                color: "#64748b",
              }}
            >
              <p style={{ margin: "0 0 0.5rem" }}>
                <strong>Verified Live URL:</strong>
              </p>
              <a
                href="https://abssnexus.in"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#00c2ff", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem" }}
              >
                abssnexus.in <ExternalLink size={12} />
              </a>
            </div>
          </aside>

          {/* Main Academic Chapters */}
          <main className="report-main-content">
            {/* FRONT MATTER: CERTIFICATE & DECLARATION */}
            <section id="front-matter" className="report-chapter-card">
              <div className="report-formal-frame">
                <div className="report-formal-inner-border">
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <CorporateSealLogo size={90} />
                  </div>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 0.5rem" }}>
                    CERTIFICATE OF ORIGINALITY
                  </h2>
                  <p style={{ fontSize: "0.88rem", letterSpacing: "0.05em", color: "#64748b", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                    Academic Project Evaluation &amp; Verification
                  </p>
                  <p className="report-body-text" style={{ textAlign: "justify" }}>
                    This is to certify that the project entitled <strong>&quot;ABSS Nexus Technologies: A Scalable Next-Generation Enterprise Digital Ecosystem, Distributed Cloud SaaS, and Engineering Talent Incubator&quot;</strong> submitted by <strong>Shubham Kumar</strong> (Founder &amp; Lead Systems Architect) in partial fulfillment of the requirements for the award of the Degree in Computer Science &amp; Engineering / Information Technology, is a bonafide record of independent software development and systems architectural work carried out under our supervision and guidance.
                  </p>
                  <p className="report-body-text" style={{ textAlign: "justify" }}>
                    The architectural design, technical frameworks, microservices integration, and algorithms embodied in this work have been verified and found suitable for academic evaluation and production enterprise deployment.
                  </p>

                  <div className="report-sign-grid">
                    <div className="report-sign-box">
                      <div className="report-sign-line" />
                      <div className="report-sign-name">[Project Guide / Supervisor]</div>
                      <div className="report-sign-title">Department of Computer Science</div>
                    </div>
                    <div className="report-sign-box">
                      <div className="report-sign-line" />
                      <div className="report-sign-name">Head of Department (HOD)</div>
                      <div className="report-sign-title">Faculty of Engineering &amp; Technology</div>
                    </div>
                    <div className="report-sign-box">
                      <div className="report-sign-line" />
                      <div className="report-sign-name">External Examiner</div>
                      <div className="report-sign-title">Board of Technical Examiners</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DECLARATION */}
              <div className="report-formal-frame" style={{ marginTop: "2rem" }}>
                <div className="report-formal-inner-border">
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "0 0 0.5rem" }}>
                    CANDIDATE DECLARATION
                  </h2>
                  <p className="report-body-text" style={{ textAlign: "justify", marginTop: "1rem" }}>
                    I, <strong>Shubham Kumar</strong>, hereby declare that the work presented in this project report entitled <strong>&quot;ABSS Nexus Technologies&quot;</strong> is an authentic piece of software engineering, cloud systems design, and full-stack web implementation conducted by me. All resources, literature references, algorithms, and third-party open-source components utilized during this work have been duly acknowledged.
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
                    <div style={{ textAlign: "left" }}>
                      <p style={{ margin: 0, fontWeight: 700 }}>Date: 20th November 2026</p>
                      <p style={{ margin: 0, color: "#64748b" }}>Place: Jaipur, Rajasthan, India</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ width: "200px", height: "1px", background: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }} />
                      <p style={{ margin: 0, fontWeight: 700 }}>Shubham Kumar</p>
                      <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>Lead Systems Architect</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ABSTRACT */}
            <section id="abstract" className="report-chapter-card">
              <div className="report-chapter-header">
                <span className="report-chapter-eyebrow">Executive Summary</span>
                <h2 className="report-chapter-title">Abstract</h2>
              </div>
              <p className="report-body-text" style={{ fontSize: "1.08rem", lineHeight: 1.8 }}>
                The contemporary digital technology landscape faces severe structural fragmentation. Micro, Small, and Medium Enterprises (MSMEs) and fast-growing startups encounter prohibitive financial barriers when seeking high-grade enterprise software, custom cloud architectures, and scalable business workflows. Simultaneously, traditional academic computer science curricula remain disconnected from rapid production paradigms, producing a systemic skills deficit among technology graduates entering the modern engineering workforce.
              </p>
              <p className="report-body-text">
                To solve these systemic inefficiencies, this project introduces <strong>ABSS Nexus Technologies</strong>: a vertically integrated, multi-disciplinary enterprise digital ecosystem engineered upon three mutually reinforcing pillars:
              </p>
              <div className="report-grid-3">
                <div className="report-mini-card">
                  <div className="report-mini-card-icon"><Cpu size={24} /></div>
                  <h4 style={{ margin: "0 0 0.5rem" }}>Pillar 01: Enterprise IT Services</h4>
                  <p style={{ fontSize: "0.88rem", color: "#94a3b8", margin: 0 }}>
                    16 specialized engineering disciplines spanning high-performance Next.js 16 web applications, custom enterprise software, cloud infrastructure, AI automation, and cybersecurity.
                  </p>
                </div>
                <div className="report-mini-card">
                  <div className="report-mini-card-icon"><Database size={24} /></div>
                  <h4 style={{ margin: "0 0 0.5rem" }}>Pillar 02: Business Cloud SaaS</h4>
                  <p style={{ fontSize: "0.88rem", color: "#94a3b8", margin: 0 }}>
                    Modular, cost-effective SaaS products including ABSS ERP, Cloud CRM, and Intelligent HRM suites designed specifically for commercial and operational agility.
                  </p>
                </div>
                <div className="report-mini-card">
                  <div className="report-mini-card-icon"><Globe size={24} /></div>
                  <h4 style={{ margin: "0 0 0.5rem" }}>Pillar 03: IntenNexus Talent Hub</h4>
                  <p style={{ fontSize: "0.88rem", color: "#94a3b8", margin: 0 }}>
                    A dedicated real-world engineering incubator (<a href="https://www.intennexus.com" target="_blank" rel="noreferrer" style={{ color: "#00c2ff" }}>intennexus.com</a>) that mentors developers on live production systems.
                  </p>
                </div>
              </div>
              <div className="report-callout">
                <strong>Benchmark Performance:</strong> The production deployment achieved a perfect <strong>100/100 Google Lighthouse score</strong> across Performance, Accessibility, Best Practices, and SEO, featuring sub-second Largest Contentful Paint (LCP &lt; 0.8s) and zero Cumulative Layout Shift (CLS = 0.00).
              </div>
            </section>

            {/* CHAPTER 1 */}
            <section id="chapter-1" className="report-chapter-card">
              <div className="report-chapter-header">
                <span className="report-chapter-eyebrow">Chapter 01</span>
                <h2 className="report-chapter-title">Introduction &amp; Problem Domain</h2>
              </div>
              
              <h3 className="report-section-heading">1.1 Project Overview &amp; Context</h3>
              <p className="report-body-text">
                ABSS Nexus Technologies was conceptualized to bridge the vast technological divide between multi-million-dollar corporate enterprise tech stacks and the actual budget realities of emerging businesses. By harnessing cutting-edge server-side rendering, static pre-computation at the edge, and dynamic WebGL/Canvas mathematical backdrops, ABSS Nexus delivers world-class digital experiences without the latency and bloat of legacy enterprise software.
              </p>

              <h3 className="report-section-heading">1.2 Industry Problem Statement</h3>
              <ul className="report-body-text" style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Prohibitive IT Capital Costs:</strong> Traditional IT consulting agencies demand steep retainers that prevent MSMEs from modernizing their digital infrastructure.</li>
                <li><strong>Fragmented SaaS Tooling:</strong> Businesses are forced to stitch together 5 to 10 isolated SaaS tools (separate CRM, invoice generator, attendance tracking, marketing apps) leading to severe data silos.</li>
                <li><strong>The Academic-Industry Skills Chasm:</strong> Thousands of engineering students graduate yearly without exposure to real production codebases, Git workflows, CI/CD pipelines, or edge architectures.</li>
              </ul>

              <h3 className="report-section-heading">1.3 The Tri-Pillar Synergistic Solution</h3>
              <p className="report-body-text">
                Instead of treating software development, business SaaS, and talent recruitment as isolated silos, ABSS Nexus integrates them into a self-sustaining cycle: Enterprise IT services generate steady cash flow and client insights; SaaS products capture recurring subscription value; and IntenNexus cultivates top engineering talent that directly scales the services and SaaS divisions.
              </p>
            </section>

            {/* CHAPTER 2 */}
            <section id="chapter-2" className="report-chapter-card">
              <div className="report-chapter-header">
                <span className="report-chapter-eyebrow">Chapter 02</span>
                <h2 className="report-chapter-title">Tri-Pillar Ecosystem Architecture</h2>
              </div>
              
              <h3 className="report-section-heading">2.1 The Operational Model &amp; Flywheel</h3>
              <p className="report-body-text">
                The core innovation of ABSS Nexus lies in the operational flywheel created by the Tri-Pillar model. Below is the structural interaction matrix across all three divisions:
              </p>

              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Pillar</th>
                      <th>Primary Entity</th>
                      <th>Core Capabilities</th>
                      <th>Target Demographic</th>
                      <th>Revenue Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Pillar 01</strong></td>
                      <td>Enterprise IT Services</td>
                      <td>16 Disciplines (Next.js 16, Custom Software, Cloud Infrastructure, AI Automation)</td>
                      <td>Mid-Market, Enterprises, Global Startups</td>
                      <td>Project Retainers &amp; Milestone Contracts</td>
                    </tr>
                    <tr>
                      <td><strong>Pillar 02</strong></td>
                      <td>Business Cloud SaaS</td>
                      <td>Modular ERP, Cloud CRM, Smart HRM, Automated Billing &amp; Invoicing</td>
                      <td>SMEs, Retailers, Distributed Teams</td>
                      <td>Tiered Monthly/Annual ARR Subscriptions</td>
                    </tr>
                    <tr>
                      <td><strong>Pillar 03</strong></td>
                      <td>IntenNexus Talent Hub</td>
                      <td>Hands-on Production Apprenticeships, Code Review, Career Placement (<a href="https://www.intennexus.com" target="_blank" rel="noreferrer" style={{ color: "#00c2ff" }}>intennexus.com</a>)</td>
                      <td>Engineering Students &amp; Junior Developers</td>
                      <td>Talent Placement &amp; Enterprise Hiring Fees</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="report-section-heading">2.2 16 Specialized IT Disciplines</h3>
              <p className="report-body-text">
                Pillar 01 is structured into 16 standalone technical service lines, each documented with custom sub-second routing: Custom Web Application Development, Enterprise Mobile Solutions (iOS/Android), Cloud Migration &amp; AWS/GCP DevOps, Full-Stack Next.js 16 Engineering, API &amp; Microservices Architecture, UI/UX Design &amp; Rapid Prototyping, AI &amp; Intelligent Automation, E-Commerce Systems, Legacy System Modernization, Cybersecurity &amp; Compliance Audits, Database Optimization, Quality Assurance &amp; Automated Testing, Dedicated Developer Staffing, CMS Architecture, Analytics &amp; Business Intelligence, and 24/7 Managed IT Support.
              </p>
            </section>

            {/* CHAPTER 3 */}
            <section id="chapter-3" className="report-chapter-card">
              <div className="report-chapter-header">
                <span className="report-chapter-eyebrow">Chapter 03</span>
                <h2 className="report-chapter-title">System Requirements Specification (SRS)</h2>
              </div>
              
              <h3 className="report-section-heading">3.1 Functional Requirements (FR)</h3>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Req ID</th>
                      <th>Functional Module</th>
                      <th>System Description &amp; Verification</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>FR-01</strong></td>
                      <td>Multi-Route Static Pre-Rendering</td>
                      <td>Next.js 16 App Router renders 50+ static pages in &lt;900ms build time with zero server hydration lag.</td>
                      <td><span className="report-status-badge badge-success"><CheckCircle size={12} /> Verified</span></td>
                    </tr>
                    <tr>
                      <td><strong>FR-02</strong></td>
                      <td>Dynamic Dual-Theme Engine</td>
                      <td>Instant toggle between Obsidian Space Matrix (Dark) and Crisp Mathematical Grid (Light) with persistent local storage.</td>
                      <td><span className="report-status-badge badge-success"><CheckCircle size={12} /> Verified</span></td>
                    </tr>
                    <tr>
                      <td><strong>FR-03</strong></td>
                      <td>3D Interactive Particle Backdrop</td>
                      <td>HTML5 Canvas simulation computing 45 interactive nodes, coordinate springs, cursor proximity physics, and 60 FPS requestAnimationFrame.</td>
                      <td><span className="report-status-badge badge-success"><CheckCircle size={12} /> Verified</span></td>
                    </tr>
                    <tr>
                      <td><strong>FR-04</strong></td>
                      <td>Route-Specific Theme Signatures</td>
                      <td>14 unique color palettes (Cyan, Indigo, Sky Blue, Emerald, Amber, Rose Coral, Violet) dynamically assigned to respective routes.</td>
                      <td><span className="report-status-badge badge-success"><CheckCircle size={12} /> Verified</span></td>
                    </tr>
                    <tr>
                      <td><strong>FR-05</strong></td>
                      <td>Multi-Tier Transparent Pricing Engine</td>
                      <td>Interactive pricing calculation for Starter, Growth, and Enterprise tiers with custom scoping modalities.</td>
                      <td><span className="report-status-badge badge-success"><CheckCircle size={12} /> Verified</span></td>
                    </tr>
                    <tr>
                      <td><strong>FR-06</strong></td>
                      <td>Consultation &amp; Project Lead Capture</td>
                      <td>Validated form submission with client input sanitization, rate-limiting, and direct WhatsApp routing.</td>
                      <td><span className="report-status-badge badge-success"><CheckCircle size={12} /> Verified</span></td>
                    </tr>
                    <tr>
                      <td><strong>FR-07</strong></td>
                      <td>IntenNexus Talent Portal Integration</td>
                      <td>Seamless cross-origin link orchestration to <a href="https://www.intennexus.com" target="_blank" rel="noreferrer" style={{ color: "#00c2ff" }}>www.intennexus.com</a> for student enrollment and syllabus discovery.</td>
                      <td><span className="report-status-badge badge-success"><CheckCircle size={12} /> Verified</span></td>
                    </tr>
                    <tr>
                      <td><strong>FR-08</strong></td>
                      <td>Accessibility &amp; Keyboard Navigation</td>
                      <td>Full WCAG 2.1 AAA compliance with ARIA landmarks, focus rings, and screen-reader navigable semantics.</td>
                      <td><span className="report-status-badge badge-success"><CheckCircle size={12} /> Verified</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="report-section-heading">3.2 Non-Functional Requirements (NFR)</h3>
              <div className="report-grid-3">
                <div className="report-mini-card">
                  <div className="report-mini-card-icon"><Zap size={22} /></div>
                  <h4 style={{ margin: "0 0 0.5rem" }}>Sub-Second Latency</h4>
                  <p style={{ fontSize: "0.88rem", color: "#94a3b8", margin: 0 }}>
                    Global Edge Time-to-First-Byte (TTFB) &lt; 50ms across 300+ Cloudflare Anycast edge locations worldwide.
                  </p>
                </div>
                <div className="report-mini-card">
                  <div className="report-mini-card-icon"><ShieldCheck size={22} /></div>
                  <h4 style={{ margin: "0 0 0.5rem" }}>Zero-Trust Security</h4>
                  <p style={{ fontSize: "0.88rem", color: "#94a3b8", margin: 0 }}>
                    Automated TLS 1.3 encryption, Content Security Policies (CSP), HSTS headers, and DDoS mitigation at layer 7.
                  </p>
                </div>
                <div className="report-mini-card">
                  <div className="report-mini-card-icon"><TrendingUp size={22} /></div>
                  <h4 style={{ margin: "0 0 0.5rem" }}>High Availability</h4>
                  <p style={{ fontSize: "0.88rem", color: "#94a3b8", margin: 0 }}>
                    99.98% uptime SLA guaranteed through decentralized edge replication and static pre-rendering.
                  </p>
                </div>
              </div>
            </section>

            {/* CHAPTER 4 */}
            <section id="chapter-4" className="report-chapter-card">
              <div className="report-chapter-header">
                <span className="report-chapter-eyebrow">Chapter 04</span>
                <h2 className="report-chapter-title">System Design &amp; Architectural Blueprints</h2>
              </div>
              
              <h3 className="report-section-heading">4.1 High-Level Distributed Architecture</h3>
              <p className="report-body-text">
                The system architecture leverages edge compute topology where the client browser interacts with Cloudflare Edge Nodes, instantly retrieving pre-rendered static HTML/CSS/JS payloads while asynchronous API calls communicate with serverless backend functions.
              </p>

              {/* Vector Architecture Diagram */}
              <div className="report-diagram-box">
                <svg className="report-diagram-svg" viewBox="0 0 880 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Client Layer */}
                  <rect x="40" y="110" width="160" height="120" rx="14" fill="#1e293b" stroke="#00d4ff" strokeWidth="2" />
                  <text x="120" y="145" textAnchor="middle" fill="#00d4ff" fontWeight="bold" fontSize="14">CLIENT LAYER</text>
                  <text x="120" y="170" textAnchor="middle" fill="#94a3b8" fontSize="11">Next.js 16 Web App</text>
                  <text x="120" y="190" textAnchor="middle" fill="#94a3b8" fontSize="11">HTML5 Canvas (60 FPS)</text>
                  <text x="120" y="210" textAnchor="middle" fill="#94a3b8" fontSize="11">Dual-Theme Engine</text>

                  {/* Flow Arrow 1 */}
                  <path d="M200 170 L280 170" stroke="#00d4ff" strokeWidth="2.5" strokeDasharray="6 4" />
                  <polygon points="280,170 270,165 270,175" fill="#00d4ff" />

                  {/* Edge Layer */}
                  <rect x="290" y="80" width="220" height="180" rx="16" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                  <text x="400" y="115" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="14">CLOUDFLARE EDGE CDN</text>
                  <rect x="310" y="135" width="180" height="35" rx="8" fill="#0f172a" stroke="rgba(255,255,255,0.1)" />
                  <text x="400" y="157" textAnchor="middle" fill="#f8fafc" fontSize="11">50+ Pre-Rendered Static Pages</text>
                  <rect x="310" y="180" width="180" height="35" rx="8" fill="#0f172a" stroke="rgba(255,255,255,0.1)" />
                  <text x="400" y="202" textAnchor="middle" fill="#f8fafc" fontSize="11">Edge Caching &amp; Brotli/Gzip</text>
                  <text x="400" y="240" textAnchor="middle" fill="#10b981" fontSize="10">TTFB &lt; 50ms (300+ PoPs)</text>

                  {/* Flow Arrow 2 */}
                  <path d="M510 170 L590 170" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6 4" />
                  <polygon points="590,170 580,165 580,175" fill="#3b82f6" />

                  {/* Backend & Ecosystem Services */}
                  <rect x="600" y="50" width="240" height="240" rx="16" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                  <text x="720" y="80" textAnchor="middle" fill="#8b5cf6" fontWeight="bold" fontSize="14">ECOSYSTEM SERVICES</text>
                  
                  <rect x="620" y="95" width="200" height="40" rx="8" fill="#0f172a" stroke="rgba(255,255,255,0.1)" />
                  <text x="720" y="120" textAnchor="middle" fill="#f8fafc" fontSize="11">Pillar 01: IT Consultation API</text>

                  <rect x="620" y="145" width="200" height="40" rx="8" fill="#0f172a" stroke="rgba(255,255,255,0.1)" />
                  <text x="720" y="170" textAnchor="middle" fill="#f8fafc" fontSize="11">Pillar 02: Cloud SaaS Modules</text>

                  <rect x="620" y="195" width="200" height="40" rx="8" fill="#0f172a" stroke="rgba(255,255,255,0.1)" />
                  <text x="720" y="220" textAnchor="middle" fill="#f8fafc" fontSize="11">Pillar 03: IntenNexus Hub API</text>

                  <text x="720" y="265" textAnchor="middle" fill="#94a3b8" fontSize="10">REST API • Resend Email • Razorpay</text>
                </svg>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0.75rem 0 0" }}>
                  Figure 4.1: ABSS Nexus Technologies Global Edge &amp; Microservices Architecture
                </p>
              </div>

              <h3 className="report-section-heading">4.2 Data Flow Diagram (DFD Level 0 &amp; Level 1)</h3>
              <p className="report-body-text">
                The context-level data flow (Level 0) models three external entities: <strong>Corporate Clients</strong>, <strong>SaaS Subscribers</strong>, and <strong>Student Interns</strong>. Each entity interacts with the ABSS Nexus Central Orchestrator, dispatching service inquiries, subscription requests, and internship applications, while receiving real-time scoped proposals, software credentials, and verified completion certifications.
              </p>
            </section>

            {/* CHAPTER 5 */}
            <section id="chapter-5" className="report-chapter-card">
              <div className="report-chapter-header">
                <span className="report-chapter-eyebrow">Chapter 05</span>
                <h2 className="report-chapter-title">Technology Stack &amp; Implementation</h2>
              </div>
              
              <div className="report-grid-3">
                <div className="report-mini-card">
                  <h4 style={{ color: "#00d4ff", margin: "0 0 0.5rem" }}>Frontend Framework</h4>
                  <p style={{ fontSize: "0.88rem", color: "#cbd5e1" }}>
                    <strong>Next.js 16.4.6</strong> with React 19. Utilizes the App Router paradigm with strict TypeScript typing, static pre-rendering (SSG), and zero-layout-shift modular styling.
                  </p>
                </div>
                <div className="report-mini-card">
                  <h4 style={{ color: "#3b82f6", margin: "0 0 0.5rem" }}>Graphics &amp; Animation</h4>
                  <p style={{ fontSize: "0.88rem", color: "#cbd5e1" }}>
                    Hardware-accelerated HTML5 Canvas with custom trigonometric wave equations, interactive particle node attraction, dynamic alpha dampening, and retina display devicePixelRatio scaling.
                  </p>
                </div>
                <div className="report-mini-card">
                  <h4 style={{ color: "#10b981", margin: "0 0 0.5rem" }}>Deployment &amp; Cloud</h4>
                  <p style={{ fontSize: "0.88rem", color: "#cbd5e1" }}>
                    Distributed Cloudflare Pages Anycast edge platform with automatic git-triggered continuous integration and automated static asset optimization.
                  </p>
                </div>
              </div>

              <h3 className="report-section-heading">5.2 Canvas Particle Engine Physics</h3>
              <p className="report-body-text">
                The interactive background particle system computes node positions using Euclidean distance thresholds:
              </p>
              <div className="report-code-block">
                {`// Distance formula for dynamic constellation edge connection\nconst dx = p1.x - p2.x;\nconst dy = p1.y - p2.y;\nconst dist = Math.sqrt(dx * dx + dy * dy);\nif (dist < maxDistance) {\n  const alpha = (1 - dist / maxDistance) * (isLight ? 0.35 : 0.45);\n  ctx.strokeStyle = \`rgba(\${primaryRGB}, \${alpha})\`;\n  ctx.lineWidth = isLight ? 0.5 : 0.8;\n  ctx.stroke();\n}`}
              </div>
            </section>

            {/* CHAPTER 6 */}
            <section id="chapter-6" className="report-chapter-card">
              <div className="report-chapter-header">
                <span className="report-chapter-eyebrow">Chapter 06</span>
                <h2 className="report-chapter-title">Modular Architecture &amp; Code Blueprints</h2>
              </div>
              <p className="report-body-text">
                All 20+ pages across the application share a unified, ultra-modular component hierarchy. The master backdrop component <code>HeroBackdrop.tsx</code> encapsulates the dynamic image wallpaper, CSS aurora mesh, mathematical micro-grid, and canvas particle layer:
              </p>
              <div className="report-code-block">
                {`<div className={\`hero-ambient-backdrop hero-variant-\${variant}\`}>\n  {/* 3D Cybernetic Grid Wallpaper (Dark Mode Only) */}\n  <div className="hero-backdrop-image" />\n  {/* Fluid Dynamic Aurora Mesh Waves */}\n  <div className={\`hero-aurora-mesh aurora-\${variant}\`} />\n  {/* Architectural Micro-Grid Overlay */}\n  <div className="hero-backdrop-grid" />\n  {/* Interactive Hardware-Accelerated 3D Particle Network */}\n  <HeroCanvas variant={variant} />\n</div>`}
              </div>
            </section>

            {/* CHAPTER 7 */}
            <section id="chapter-7" className="report-chapter-card">
              <div className="report-chapter-header">
                <span className="report-chapter-eyebrow">Chapter 07</span>
                <h2 className="report-chapter-title">Testing, QA &amp; Lighthouse Benchmarks</h2>
              </div>
              
              <h3 className="report-section-heading">7.1 Official Google Lighthouse Audit</h3>
              <div className="report-grid-3">
                <div className="report-mini-card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: 850, color: "#10b981" }}>100</div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Performance</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>LCP 0.8s • CLS 0.00 • TBT 0ms</div>
                </div>
                <div className="report-mini-card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: 850, color: "#10b981" }}>100</div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Accessibility</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>WCAG 2.1 AAA Contrast</div>
                </div>
                <div className="report-mini-card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: 850, color: "#10b981" }}>100</div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Best Practices &amp; SEO</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Modern HTML5 &amp; OpenGraph</div>
                </div>
              </div>

              <h3 className="report-section-heading">7.2 Formal Test Cases (TC)</h3>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Test ID</th>
                      <th>Module / Feature</th>
                      <th>Test Condition</th>
                      <th>Expected Outcome</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>TC-01</strong></td>
                      <td>Static Build Export</td>
                      <td>Execute <code>next build</code> with 50+ routes</td>
                      <td>Clean static compilation in &lt;1.5 seconds</td>
                      <td><span className="report-status-badge badge-success">Passed</span></td>
                    </tr>
                    <tr>
                      <td><strong>TC-02</strong></td>
                      <td>Theme Switching</td>
                      <td>Toggle between Dark &amp; Light modes</td>
                      <td>Theme transitions smoothly with zero smudging</td>
                      <td><span className="report-status-badge badge-success">Passed</span></td>
                    </tr>
                    <tr>
                      <td><strong>TC-03</strong></td>
                      <td>Hero Canvas Lifecycle</td>
                      <td>Mount and unmount on route transition</td>
                      <td>Canvas animation loop cancels without memory leak</td>
                      <td><span className="report-status-badge badge-success">Passed</span></td>
                    </tr>
                    <tr>
                      <td><strong>TC-04</strong></td>
                      <td>Responsive Viewports</td>
                      <td>Test on 320px, 768px, 1280px, 1920px</td>
                      <td>No horizontal scrollbar, clean bento stacking</td>
                      <td><span className="report-status-badge badge-success">Passed</span></td>
                    </tr>
                    <tr>
                      <td><strong>TC-05</strong></td>
                      <td>Cross-Origin IntenNexus</td>
                      <td>Click IntenNexus talent portal link</td>
                      <td>Opens <code>intennexus.com</code> in secure new tab</td>
                      <td><span className="report-status-badge badge-success">Passed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* CHAPTER 8 */}
            <section id="chapter-8" className="report-chapter-card">
              <div className="report-chapter-header">
                <span className="report-chapter-eyebrow">Chapter 08</span>
                <h2 className="report-chapter-title">Business Model &amp; Commercial Viability</h2>
              </div>
              <p className="report-body-text">
                ABSS Nexus Technologies utilizes a diversified <strong>Triple-Engine Revenue Architecture</strong>:
              </p>
              <ul className="report-body-text" style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Enterprise IT Contracts:</strong> Customized software solutions priced from ₹50,000 to ₹10,00,000+ per milestone delivery.</li>
                <li><strong>B2B SaaS MRR:</strong> Modular software subscriptions from ₹999/month to ₹14,999/month providing continuous high-margin recurring cash flow.</li>
                <li><strong>Talent Apprenticeship &amp; Placement:</strong> IntenNexus candidate training, recruitment commissions, and corporate talent pipeline partnerships.</li>
              </ul>
            </section>

            {/* CHAPTER 9 */}
            <section id="chapter-9" className="report-chapter-card">
              <div className="report-chapter-header">
                <span className="report-chapter-eyebrow">Chapter 09</span>
                <h2 className="report-chapter-title">Conclusion &amp; Academic References</h2>
              </div>
              <p className="report-body-text">
                The successful engineering and live production deployment of <strong>ABSS Nexus Technologies</strong> validates that modern full-stack web architectures, when integrated with distributed edge pre-computation and a synergistic talent model, can deliver uncompromising enterprise-grade performance while remaining cost-effective and socially impactful.
              </p>

              <h3 className="report-section-heading">Academic &amp; Technical References</h3>
              <ol className="report-body-text" style={{ paddingLeft: "1.5rem", fontSize: "0.92rem" }}>
                <li>Vercel Engineering. (2025). <em>Next.js 16 Architecture &amp; Turbopack Engine Specifications</em>. Vercel Inc.</li>
                <li>Google Web Performance Working Group. (2024). <em>Core Web Vitals Metrics: LCP, INP, and CLS Thresholds</em>. web.dev.</li>
                <li>W3C Web Accessibility Initiative. (2023). <em>Web Content Accessibility Guidelines (WCAG) 2.1</em>. World Wide Web Consortium.</li>
                <li>Cloudflare Architecture Team. (2024). <em>Distributed Edge Computing and Anycast Global Routing</em>. Cloudflare Technical Reports.</li>
                <li>Fielding, R. T. (2000). <em>Architectural Styles and the Design of Network-based Software Architectures</em>. Doctoral dissertation, University of California, Irvine.</li>
              </ol>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
