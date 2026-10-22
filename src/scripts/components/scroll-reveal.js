/**
 * ABSS Nexus Technologies — Lightweight Scroll-Reveal Controller
 * Progressive enhancement: Reveals elements smoothly as they enter the viewport.
 * Features:
 * - Pure IntersectionObserver with zero dependencies
 * - Reveals each element once to avoid distracting re-animations
 * - Completely disabled when prefers-reduced-motion is active
 * - Safe fallback: All content remains visible if script fails or is disabled
 */
/**
 * ABSS Nexus Technologies — Lightweight Universal Scroll-Reveal Controller
 * Progressive enhancement: Reveals elements smoothly as they enter the viewport.
 * Features:
 * - Pure IntersectionObserver with zero dependencies
 * - Auto-discovers cards, headers, grids, and CTAs across all pages
 * - Smooth staggered cascade for above-the-fold elements
 * - Completely disabled when prefers-reduced-motion is active
 * - Safe fallback: All content remains visible if script fails or is disabled
 */
(function initScrollReveal() {
  if (window.__abssScrollRevealInitialized) return;
  window.__abssScrollRevealInitialized = true;

  function setupObserver() {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animSelector = [
      ".reveal-on-scroll",
      ".section-heading",
      ".section-header",
      ".cinematic-service-card",
      ".service-card",
      ".project-card",
      ".work-card",
      ".case-study-card",
      ".industry-showcase-card",
      ".solution-showcase-card",
      ".testimonial-card",
      ".package-card",
      ".pricing-card",
      ".package-grid article",
      ".bento-service-card",
      ".agency-stat-card",
      ".metric-card",
      ".stat-card",
      ".process-card",
      ".process-step",
      ".step-card",
      ".faq-item",
      ".career-card",
      ".blog-card",
      ".contact-method-card",
      ".contact-form-wrapper",
      ".contact-card",
      ".program-card",
      ".portal-card",
      ".feature-card",
      ".radiant-cta-box",
      ".cta-box"
    ].join(", ");

    const animTargets = Array.from(document.querySelectorAll(animSelector));
    if (!animTargets.length) return;

    const heroEl = document.querySelector(".site-hero, .page-hero, .portal-hero");
    const activeTargets = animTargets.filter((el) => {
      if (heroEl && heroEl.contains(el) && !el.classList.contains("reveal-on-scroll")) {
        return false;
      }
      return true;
    });

    if (!activeTargets.length) return;

    activeTargets.forEach((el) => {
      if (!el.classList.contains("reveal-on-scroll")) {
        el.classList.add("reveal-on-scroll");
      }

      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter((c) => c.classList.contains("reveal-on-scroll"));
        if (siblings.length > 1) {
          const index = siblings.indexOf(el);
          const delayClass = `reveal-delay-${Math.min((index % 6) + 1, 6)}`;
          if (!el.className.includes("reveal-delay-")) {
            el.classList.add(delayClass);
          }
        }
      }
    });

    // Signal that JS scroll reveal is active
    document.documentElement.classList.add("has-scroll-reveal");
    document.documentElement.classList.add("reveal-animations-ready");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08
      }
    );

    const inViewport = [];
    const outOfViewport = [];

    activeTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        inViewport.push(el);
      } else {
        outOfViewport.push(el);
        observer.observe(el);
      }
    });

    inViewport.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add("is-revealed");
      }, 50 + idx * 45);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupObserver);
  } else {
    setupObserver();
  }
})();
