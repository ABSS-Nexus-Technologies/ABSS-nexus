/**
 * ABSS Nexus Technologies - Global Hero Component Logic & Renderer
 * Compatible with Node.js build scripts and client-side Vanilla JavaScript.
 */

(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ABSS_Hero = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  /**
   * Generates accessible semantic HTML markup for a site hero section
   * @param {Object} config - Page-specific hero configuration
   * @returns {string} HTML markup
   */
  function renderHeroMarkup(config = {}) {
    const variantClass = config.variant ? `site-hero--${config.variant}` : "site-hero--page";
    const centeredClass = config.centered ? "site-hero--centered" : "";

    // Breadcrumb
    let breadcrumbHtml = "";
    if (config.breadcrumb && Array.isArray(config.breadcrumb)) {
      breadcrumbHtml = `
        <nav class="site-hero__breadcrumb" aria-label="Breadcrumb">
          ${config.breadcrumb.map((item, idx) => {
            if (item.current) {
              return `<span class="current" aria-current="page">${item.label}</span>`;
            }
            return `<a href="${item.href}">${item.label}</a><span class="separator" aria-hidden="true">/</span>`;
          }).join("\n          ")}
        </nav>`;
    }

    // Badge / Eyebrow
    let eyebrowHtml = "";
    if (config.badge) {
      eyebrowHtml = `
        <span class="site-hero__eyebrow">
          <span class="site-hero__pulse-dot" aria-hidden="true"></span>
          <span>${config.badge}</span>
        </span>`;
    }

    // Title & Accent
    let titleHtml = config.headline || "Engineering Digital Authority";
    if (config.headlineAccent) {
      titleHtml = titleHtml.replace(
        config.headlineAccent,
        `<span class="site-hero__title-accent">${config.headlineAccent}</span>`
      );
    }

    // CTAs
    let actionsHtml = "";
    const buttons = [];
    if (config.primaryCta) {
      buttons.push(`
        <a class="site-hero__btn site-hero__btn--primary" href="${config.primaryCta.href}">
          <span>${config.primaryCta.text}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>`);
    }
    if (config.secondaryCta) {
      buttons.push(`
        <a class="site-hero__btn site-hero__btn--secondary" href="${config.secondaryCta.href}">
          <span>${config.secondaryCta.text}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>`);
    }
    if (config.tertiaryCta) {
      buttons.push(`
        <a class="site-hero__btn site-hero__btn--secondary" href="${config.tertiaryCta.href}">
          <span>${config.tertiaryCta.text}</span>
        </a>`);
    }
    if (config.whatsappCta) {
      buttons.push(`
        <a class="site-hero__btn site-hero__btn--whatsapp" href="${config.whatsappCta.href}" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.3-.778.979-.954 1.18-.176.2-.352.226-.653.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.632-.929-2.235-.245-.588-.494-.509-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.722.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.43.25-.704.25-1.307.175-1.431-.075-.125-.276-.2-.577-.35zM12.04 2C6.51 2 2.03 6.48 2.03 12.01c0 1.97.57 3.81 1.57 5.37L2 22l4.78-1.54c1.51.92 3.27 1.45 5.26 1.45 5.53 0 10.01-4.48 10.01-10.01S17.57 2 12.04 2zm0 18.25c-1.74 0-3.36-.5-4.74-1.38l-.34-.22-2.83.91.93-2.76-.24-.37c-.98-1.5-1.53-3.27-1.53-5.12 0-4.56 3.71-8.27 8.27-8.27s8.27 3.71 8.27 8.27-3.71 8.27-8.27 8.27z"/></svg>
          <span>WhatsApp</span>
        </a>`);
    }
    if (buttons.length > 0) {
      actionsHtml = `
        <div class="site-hero__actions">
          ${buttons.join("\n          ")}
        </div>`;
    }

    // Portal Destination Pills
    let portalPillsHtml = "";
    if (config.portalPills && Array.isArray(config.portalPills)) {
      portalPillsHtml = `
        <div class="site-hero__destinations" aria-label="Quick page navigation">
          <span class="site-hero__destinations-label">Direct Portals:</span>
          ${config.portalPills.map(p => `
            <a href="${p.href}" class="site-hero__pill">
              <span aria-hidden="true">${p.emoji || "✦"}</span>
              <span>${p.label}</span>
            </a>
          `).join("")}
        </div>`;
    }

    // Trust Chips
    let trustChipsHtml = "";
    if (config.trustChips && Array.isArray(config.trustChips)) {
      trustChipsHtml = `
        <div class="site-hero__trust-chips" aria-label="Key highlights">
          ${config.trustChips.map(c => `
            <a href="${c.href}" class="site-hero__chip">
              <span aria-hidden="true">${c.emoji || "✓"}</span>
              <span>${c.label}</span>
            </a>
          `).join("")}
        </div>`;
    }

    // Social Proof
    let socialProofHtml = "";
    if (config.socialProof) {
      socialProofHtml = `
        <div class="site-hero__social-proof" aria-label="Client Trust rating">
          <div class="site-hero__avatars" aria-hidden="true">
            ${config.socialProof.avatars.map(a => `<span class="site-hero__avatar">${a}</span>`).join("")}
          </div>
          <div class="site-hero__proof-text">
            <strong>${config.socialProof.rating}</strong>
            <a href="${config.socialProof.href}" style="color: #0066cc; text-decoration: none; font-weight: 600;">${config.socialProof.subtext}</a>
          </div>
        </div>`;
    }

    // Visual Column
    let visualHtml = "";
    if (config.visualHtml) {
      visualHtml = `
        <div class="site-hero__visual">
          ${config.visualHtml}
        </div>`;
    }

    return `
      <section class="site-hero ${variantClass} ${centeredClass}" id="hero">
        <div class="site-hero__container">
          <div class="site-hero__grid">
            <div class="site-hero__content">
              ${breadcrumbHtml}
              ${eyebrowHtml}
              <h1 class="site-hero__title">${titleHtml}</h1>
              <p class="site-hero__description">${config.description || ""}</p>
              ${actionsHtml}
              ${portalPillsHtml}
              ${trustChipsHtml}
              ${socialProofHtml}
            </div>
            ${visualHtml}
          </div>
        </div>
      </section>`;
  }

  /**
   * Initializes client-side behaviors for the hero section
   */
  function initHero() {
    if (typeof document === "undefined") return;

    // Enhance interactive tabs inside hero preview mockups if present
    const tabs = document.querySelectorAll(".site-hero [data-hero-tab]");
    tabs.forEach(tab => {
      tab.addEventListener("click", function () {
        const targetView = this.getAttribute("data-hero-tab");
        const parent = this.closest(".site-hero__mockup-card");
        if (!parent) return;

        parent.querySelectorAll("[data-hero-tab]").forEach(t => t.classList.remove("active"));
        parent.querySelectorAll("[data-hero-view]").forEach(v => {
          v.hidden = true;
          v.classList.remove("active");
        });

        this.classList.add("active");
        const targetElement = parent.querySelector(`[data-hero-view="${targetView}"]`);
        if (targetElement) {
          targetElement.hidden = false;
          targetElement.classList.add("active");
        }
      });
    });
  }

  // Auto-init on DOMContentLoaded if in browser
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initHero);
    } else {
      initHero();
    }
  }

  return {
    render: renderHeroMarkup,
    init: initHero
  };
});
