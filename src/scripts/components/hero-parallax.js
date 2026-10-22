/**
 * ABSS Nexus Technologies — Interactive Hero Parallax Controller
 * Subtle pointer-tracking parallax for the laptop, smartphone and floating metric badges.
 * Features:
 * - Smooth lerp damping with requestAnimationFrame
 * - Automatic neutral resting state when pointer leaves hero
 * - Passive scroll-based depth shift
 * - Completely disabled when prefers-reduced-motion is active
 * - Disabled on touch-only devices (pointer: coarse / hover: none)
 * - Zero external dependencies, pure CSS transforms
 */
(function initHeroParallax() {
  function setupParallax() {
    const heroSection = document.getElementById("hero");
    if (!heroSection) return;

    const workspace = heroSection.querySelector(".hero-device-workspace");
    if (!workspace) return;

    const laptop = workspace.querySelector(".hero-laptop");
    const phone = workspace.querySelector(".hero-phone");
    const badgeTop = workspace.querySelector(".hero-badge-float--top-right");
    const badgeBottom = workspace.querySelector(".hero-badge-float--bottom-left");

    // Check user preferences and device capabilities
    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia && window.matchMedia("(hover: none) or (pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchDevice) {
      // Keep static Apple-like resting perspective
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovered = false;
    let isAnimating = false;
    let scrollOffset = 0;

    function onMouseMove(e) {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Normalize to [-1, 1] range
      targetX = Math.max(-1, Math.min(1, x / (rect.width * 0.45)));
      targetY = Math.max(-1, Math.min(1, y / (rect.height * 0.45)));

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(tick);
      }
    }

    function onMouseEnter() {
      isHovered = true;
    }

    function onMouseLeave() {
      isHovered = false;
      targetX = 0;
      targetY = 0;
    }

    function onScroll() {
      const rect = heroSection.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        // Subtle depth shift during scroll
        scrollOffset = -window.scrollY * 0.035;
        if (!isAnimating) {
          isAnimating = true;
          requestAnimationFrame(tick);
        }
      }
    }

    function tick() {
      // Smooth lerp damping factor
      const factor = 0.08;
      mouseX += (targetX - mouseX) * factor;
      mouseY += (targetY - mouseY) * factor;

      // 1. Laptop: subtle 3D tilt
      if (laptop) {
        const rotY = -3 + mouseX * 4.5; // -7.5deg to +1.5deg
        const rotX = 2 - mouseY * 3.5;  // -1.5deg to +5.5deg
        const transY = scrollOffset + mouseY * -4;
        laptop.style.transform = `perspective(1000px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) translateY(${transY.toFixed(2)}px)`;
      }

      // 2. Phone: foreground layer with slightly greater parallax multiplier
      if (phone) {
        const rotY = 2 + mouseX * 6;
        const rotX = 1 - mouseY * 4.5;
        const transX = mouseX * 8;
        const transY = scrollOffset * 1.25 + mouseY * -10;
        phone.style.transform = `perspective(1000px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 15px)`;
      }

      // 3. Top Badge: subtle counter-shift
      if (badgeTop) {
        const transX = mouseX * -6;
        const transY = mouseY * -8 + scrollOffset * 0.5;
        badgeTop.style.transform = `translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0)`;
      }

      // 4. Bottom Badge: subtle counter-shift
      if (badgeBottom) {
        const transX = mouseX * 6;
        const transY = mouseY * -6 + scrollOffset * 0.5;
        badgeBottom.style.transform = `translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0)`;
      }

      // Continue tick loop while moving or hovered
      const dist = Math.abs(targetX - mouseX) + Math.abs(targetY - mouseY);
      if (dist > 0.001 || isHovered) {
        requestAnimationFrame(tick);
      } else {
        isAnimating = false;
        // Clean resting transforms
        if (!isHovered && laptop) {
          laptop.style.transform = `perspective(1000px) rotateY(-3deg) rotateX(2deg) translateY(${scrollOffset.toFixed(2)}px)`;
        }
        if (!isHovered && phone) {
          phone.style.transform = `perspective(1000px) rotate(2deg) translateY(${(scrollOffset * 1.25).toFixed(2)}px)`;
        }
      }
    }

    heroSection.addEventListener("mousemove", onMouseMove, { passive: true });
    heroSection.addEventListener("mouseenter", onMouseEnter, { passive: true });
    heroSection.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupParallax);
  } else {
    setupParallax();
  }
})();
