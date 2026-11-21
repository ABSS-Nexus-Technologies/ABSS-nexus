"use client";

import React from "react";
import Link from "next/link";
import {
  ALL_LOGO_VARIANTS,
  SITE_NAME,
  CorporateSealLogo,
} from "@/src/components/BrandLogos";
import HeroBackdrop from "@/src/components/HeroBackdrop";

const LOGO_FILES: Record<number, string> = {
  1: "1-lettermark",
  2: "2-wordmark",
  3: "3-pictorial",
  4: "4-abstract",
  5: "5-mascot",
  6: "6-combination-main",
  7: "7-emblem",
};

export default function BrandLogosPage() {
  return (
    <div className="bento-page-wrapper" style={{ paddingBlock: "5rem 6rem", position: "relative", overflow: "hidden" }}>
      <HeroBackdrop variant="brand" />
      <div className="bento-container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "760px",
            marginInline: "auto",
            marginBottom: "3.5rem",
          }}
        >
          <span
            className="bento-badge"
            style={{
              marginBottom: "1rem",
              background: "rgba(0, 212, 255, 0.12)",
              color: "var(--brand-cyan)",
              borderColor: "rgba(0, 212, 255, 0.35)",
            }}
          >
            ⚡ Official Brand Assets &amp; Guidelines v2.0
          </span>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              fontFamily: "var(--font-heading)",
            }}
          >
            {SITE_NAME} Brand Identity
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            The official master brand mark for <strong>{SITE_NAME}</strong> features the <strong>3D Cyber Infinity Loop</strong> with dual cyan &amp; coral neural traces, paired with the signature corporate lockup. Active across all production platforms, client portals, and official documentation.
          </p>
        </div>

        {/* Master Official Production Logo Showcase */}
        <div
          className="bento-card"
          style={{
            marginBottom: "3.5rem",
            padding: "2.5rem 2rem",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(6, 9, 19, 0.98))",
            border: "1px solid rgba(0, 212, 255, 0.35)",
            borderRadius: "24px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 212, 255, 0.15)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "1.75rem" }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--brand-cyan)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>
                Official Primary Lockup
              </span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, margin: "0.25rem 0 0", color: "#ffffff" }}>
                Official 3D Cyber Infinity Master Logo
              </h2>
            </div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "5px 14px", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.4)", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              ● Production Active
            </span>
          </div>

          {/* Dual Theme Side-by-Side Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            {/* Light Mode Preview */}
            <div style={{ background: "#ffffff", borderRadius: "16px", padding: "2.5rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
                Light Theme Master Lockup
              </span>
              <img
                src="/assets/images/logo/abss-nexus-official-logo.png"
                alt="ABSS Nexus Technologies Official Logo Light"
                style={{ width: "100%", maxWidth: "340px", height: "auto", objectFit: "contain" }}
              />
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>
                Navy #0F172A • Coral #EF4444 • Slate #475569
              </span>
            </div>

            {/* Dark Mode Preview */}
            <div style={{ background: "#090d16", borderRadius: "16px", padding: "2.5rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8" }}>
                Dark Theme Master Lockup
              </span>
              <img
                src="/assets/images/logo/abss-nexus-official-logo-dark.png"
                alt="ABSS Nexus Technologies Official Logo Dark"
                style={{ width: "100%", maxWidth: "340px", height: "auto", objectFit: "contain" }}
              />
              <span style={{ fontSize: "0.78rem", color: "#94a3b8", fontFamily: "var(--font-mono)" }}>
                White #F8FAFC • Coral #EF4444 • Cool Silver #94A3B8
              </span>
            </div>
          </div>

          {/* Quick Asset Download Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600, marginRight: "6px" }}>
              Export Master Assets:
            </span>
            <a
              href="/assets/images/logo/abss-nexus-official-logo.png"
              download="abss-nexus-official-logo.png"
              className="bento-btn-glass"
              style={{ padding: "6px 14px", fontSize: "0.75rem" }}
            >
              Full Logo (PNG)
            </a>
            <a
              href="/assets/images/logo/abss-nexus-official-logo-dark.png"
              download="abss-nexus-official-logo-dark.png"
              className="bento-btn-glass"
              style={{ padding: "6px 14px", fontSize: "0.75rem" }}
            >
              Full Dark Logo (PNG)
            </a>
            <a
              href="/assets/images/logo/abss-nexus-symbol.png"
              download="abss-nexus-symbol.png"
              className="bento-btn-glass"
              style={{ padding: "6px 14px", fontSize: "0.75rem" }}
            >
              3D Symbol Only (PNG)
            </a>
            <a
              href="/favicon.png"
              download="abss-nexus-favicon.png"
              className="bento-btn-glass"
              style={{ padding: "6px 14px", fontSize: "0.75rem" }}
            >
              Favicon Icon
            </a>
          </div>
        </div>

        {/* 3D Mockup Banner */}
        <div
          className="bento-card"
          style={{
            marginBottom: "3.5rem",
            padding: "2rem",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(6, 9, 19, 0.95))",
            border: "1px solid rgba(0, 212, 255, 0.25)",
            borderRadius: "24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--brand-cyan)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}
            >
              Architectural Concept
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.75rem",
                fontWeight: 800,
                margin: "0.5rem 0 1rem",
                color: "#ffffff",
              }}
            >
              3D Corporate Headquarters Signage
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              Brushed aerospace titanium &amp; electric cyan halo-backlit 3D &ldquo;A&rdquo; Orbital sign mounted on obsidian slate acoustic panels with executive embossed metallic business cards.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <span className="bento-chip">Titanium Finish</span>
              <span className="bento-chip">Cyan LED Halo</span>
              <span className="bento-chip">Executive Stationery</span>
            </div>
          </div>
          <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <img
              src="/assets/images/abss-nexus-3d-branding-mockup.jpg"
              alt="3D Corporate Branding Showcase"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>

        {/* 7 Logo Types Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "2rem",
            marginBottom: "3.5rem",
          }}
        >
          {ALL_LOGO_VARIANTS.map(({ number, type, description, Component }) => (
            <article
              key={number}
              className="bento-card"
              style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.25rem",
                borderRadius: "20px",
                borderColor:
                  number === 6 ? "var(--brand-cyan)" : "rgba(255, 255, 255, 0.08)",
                boxShadow:
                  number === 6
                    ? "0 0 35px -10px rgba(0, 212, 255, 0.35)"
                    : "none",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.25rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--brand-cyan)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    TYPE 0{number}
                  </span>
                  {number === 6 && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        background: "rgba(0, 212, 255, 0.15)",
                        border: "1px solid rgba(0, 212, 255, 0.4)",
                        color: "var(--brand-cyan)",
                        textTransform: "uppercase",
                      }}
                    >
                      Active Main Logo
                    </span>
                  )}
                </div>

                {/* Preview Box */}
                {number === 2 || number === 6 ? (
                  <div
                    style={{
                      display: "grid",
                      gap: "0.75rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        placeItems: "center",
                        padding: "1rem",
                        borderRadius: "12px",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Component size={number === 2 ? 42 : 40} theme="light" />
                    </div>
                    <div
                      style={{
                        display: "grid",
                        placeItems: "center",
                        padding: "1rem",
                        borderRadius: "12px",
                        background: "#090D18",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                      }}
                    >
                      <Component size={number === 2 ? 42 : 40} theme="dark" />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      minHeight: "130px",
                      display: "grid",
                      placeItems: "center",
                      padding: "1.25rem",
                      borderRadius: "12px",
                      background: "#090D18",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <Component size={72} />
                  </div>
                )}

                <h2
                  style={{
                    margin: "0 0 0.5rem",
                    fontSize: "1.25rem",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  {type}
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.92rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {description}
                </p>
              </div>

              {/* Download Buttons */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                {(["png", "jpg", "svg"] as const).map((ext) => {
                  const base = LOGO_FILES[number];
                  return (
                    <a
                      key={ext}
                      href={`/logos/${base}.${ext}`}
                      download={`${base}.${ext}`}
                      style={{
                        padding: "0.35rem 0.75rem",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        borderRadius: "6px",
                        textDecoration: "none",
                        background: "rgba(0, 212, 255, 0.12)",
                        border: "1px solid rgba(0, 212, 255, 0.3)",
                        color: "var(--brand-cyan)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {ext}
                    </a>
                  );
                })}
                {(number === 2 || number === 6) && (
                  <>
                    <a
                      href={`/logos/${LOGO_FILES[number]}-dark.png`}
                      download={`${LOGO_FILES[number]}-dark.png`}
                      style={{
                        padding: "0.35rem 0.75rem",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        borderRadius: "6px",
                        textDecoration: "none",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#FFFFFF",
                      }}
                    >
                      Dark PNG
                    </a>
                    <a
                      href={`/logos/${LOGO_FILES[number]}-dark.jpg`}
                      download={`${LOGO_FILES[number]}-dark.jpg`}
                      style={{
                        padding: "0.35rem 0.75rem",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        borderRadius: "6px",
                        textDecoration: "none",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#FFFFFF",
                      }}
                    >
                      Dark JPG
                    </a>
                  </>
                )}
              </div>
            </article>
          ))}

          {/* 8. Corporate Seal Card */}
          <article
            className="bento-card"
            style={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.25rem",
              borderRadius: "20px",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--brand-cyan)",
                    letterSpacing: "0.05em",
                  }}
                >
                  TYPE 08 • LEGAL
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    background: "rgba(22, 43, 122, 0.2)",
                    border: "1px solid rgba(22, 43, 122, 0.5)",
                    color: "#93c5fd",
                    textTransform: "uppercase",
                  }}
                >
                  Govt / Legal Seal
                </span>
              </div>

              <div
                style={{
                  minHeight: "130px",
                  display: "grid",
                  placeItems: "center",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  marginBottom: "1.25rem",
                }}
              >
                <CorporateSealLogo size={85} />
              </div>

              <h2
                style={{
                  margin: "0 0 0.5rem",
                  fontSize: "1.25rem",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                Official Corporate Seal
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.92rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
              >
                Official royal-blue ink seal with curved typography &ldquo;• ABSS NEXUS TECHNOLOGIES •&rdquo; and &ldquo;CORPORATE SEAL • ESTD 2026&rdquo;.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                paddingTop: "1rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <a
                href="/logos/8-corporate-seal.png"
                download="8-corporate-seal.png"
                style={{
                  padding: "0.35rem 0.75rem",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  borderRadius: "6px",
                  textDecoration: "none",
                  background: "rgba(0, 212, 255, 0.12)",
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                  color: "var(--brand-cyan)",
                }}
              >
                PNG
              </a>
              <a
                href="/logos/8-corporate-seal.jpg"
                download="8-corporate-seal.jpg"
                style={{
                  padding: "0.35rem 0.75rem",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  borderRadius: "6px",
                  textDecoration: "none",
                  background: "rgba(0, 212, 255, 0.12)",
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                  color: "var(--brand-cyan)",
                }}
              >
                JPG
              </a>
              <a
                href="/logos/8-corporate-seal.svg"
                download="8-corporate-seal.svg"
                style={{
                  padding: "0.35rem 0.75rem",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  borderRadius: "6px",
                  textDecoration: "none",
                  background: "rgba(0, 212, 255, 0.12)",
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                  color: "var(--brand-cyan)",
                }}
              >
                SVG
              </a>
            </div>
          </article>
        </div>

        {/* Back to Home Button */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/"
            className="bento-btn-primary"
            style={{ textDecoration: "none", display: "inline-flex" }}
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
