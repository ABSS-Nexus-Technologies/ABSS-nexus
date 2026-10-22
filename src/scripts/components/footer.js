/**
 * ABSS Nexus Technologies - Global Shared Footer Component Logic & Renderer
 * Compatible with Node.js build scripts and client-side Vanilla JavaScript.
 */

(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ABSS_Footer = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  /**
   * Generates accessible semantic HTML markup for the global site footer
   * @returns {string} HTML markup
   */
  function renderFooterMarkup() {
    const year = new Date().getFullYear();

    return `    <footer class="site-footer footer" role="contentinfo">
      <div class="site-footer__container container">
        <div class="site-footer__grid footer-grid">
          <!-- Column 1: Brand & Operational Status -->
          <div class="site-footer__brand footer-brand">
            <a href="/" aria-label="ABSS Nexus Technologies home">
              <img class="site-footer__logo" src="/public/assets/images/LogoGenerated.png" alt="ABSS Nexus Technologies logo" width="160" height="38" />
            </a>
            <p class="site-footer__brand-title footer-brand-title">ABSS Nexus Technologies</p>
            <p class="site-footer__brand-desc">Building high-performance digital solutions for businesses, startups, institutions, and growing brands.</p>
            <strong class="site-footer__tagline">Innovate &bull; Solve &bull; Elevate</strong>
            <div>
              <span class="site-footer__status footer-system-status">
                <span class="site-footer__status-pulse live-pulse-dot" aria-hidden="true"></span>
                <span>All Systems Operational &bull; Edge Active</span>
              </span>
            </div>
          </div>

          <!-- Column 2: Company & Ecosystem -->
          <div class="site-footer__col footer-column">
            <h3 class="site-footer__col-title">Company &amp; Resources</h3>
            <a class="site-footer__link" href="/">Home</a>
            <a class="site-footer__link" href="/about">About Us</a>
            <a class="site-footer__link" href="/careers">Careers</a>
            <a class="site-footer__link" href="/internships">Internships</a>
            <a class="site-footer__link" href="/blog">Engineering Blog</a>
            <a class="site-footer__link" href="/faq">FAQ &amp; Help</a>
            <a class="site-footer__link" href="/solutions">Solutions</a>
            <a class="site-footer__link" href="/industries">Industries</a>
            <a class="site-footer__link" href="/services">Services</a>
            <a class="site-footer__link" href="/work">Our Work</a>
            <a class="site-footer__link" href="/pricing">Pricing</a>
            <a class="site-footer__link" href="/contact">Contact</a>
          </div>

          <!-- Column 3: Specialized IT Services -->
          <div class="site-footer__col footer-column">
            <h3 class="site-footer__col-title">Our Services</h3>
            <a class="site-footer__link" href="/services/website-development">Website Development</a>
            <a class="site-footer__link" href="/services/software-development">Software Development</a>
            <a class="site-footer__link" href="/services/mobile-app-development">Mobile App Development</a>
            <a class="site-footer__link" href="/services/ui-ux-design">UI/UX Design</a>
            <a class="site-footer__link" href="/services/cloud-computing">Cloud Computing</a>
            <a class="site-footer__link" href="/services/ecommerce-development">E-Commerce Development</a>
            <a class="site-footer__link" href="/services/ai-machine-learning">AI &amp; Machine Learning</a>
            <a class="site-footer__link" href="/services/cybersecurity">Cybersecurity</a>
            <a class="site-footer__link" href="/services/website-maintenance">Website Maintenance</a>
          </div>

          <!-- Column 4: Contact & Leadership Verification -->
          <div class="site-footer__col site-footer__contact footer-column footer-contact">
            <h3 class="site-footer__col-title">Contact Info</h3>
            <a class="site-footer__link" href="tel:+918757928673">Phone: +91 87579 28673</a>
            <a class="site-footer__link" href="mailto:abssnexus@gmail.com">Email: abssnexus@gmail.com</a>
            <span class="site-footer__contact-item">Location: Jaipur, Rajasthan</span>
            <span class="site-footer__contact-item">Shubham Kumar &mdash; Founder, ABSS Nexus Technologies</span>
          </div>
        </div>

        <!-- Lower Bar: Socials & Master 7-Policy Legal Suite -->
        <div class="site-footer__bottom footer-lower">
          <div class="site-footer__socials footer-socials" aria-label="Social media profiles">
            <a class="site-footer__social-link" href="https://www.instagram.com/abssnexus/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            <a class="site-footer__social-link" href="https://www.facebook.com/profile.php?id=61592563923350" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            <a class="site-footer__social-link" href="https://x.com/abssnexus" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">X / Twitter</a>
          </div>

          <nav class="site-footer__legal footer-legal" aria-label="Legal and policy links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
            <a href="/cookie-policy">Cookie Policy</a>
            <a href="/disclaimer">Disclaimer</a>
            <a href="/refund-policy">Refund Policy</a>
            <a href="/support-policy">Support Policy</a>
            <a href="/sitemap">Sitemap</a>
          </nav>
        </div>

        <!-- Copyright Line -->
        <div class="site-footer__copy footer-copy">
          <p>&copy; <span class="site-footer__year">${year}</span> ABSS Nexus Technologies. All Rights Reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Direct Floating WhatsApp Channel -->
    <a class="floating-whatsapp" href="https://wa.me/918757928673" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.4 28.8l6.6-1.7A12.7 12.7 0 1 0 16 3.2Zm0 22.9c-2 0-3.9-.6-5.6-1.6l-.4-.2-3.9 1 1-3.8-.3-.4a10.3 10.3 0 1 1 9.2 5Z" />
        <path d="M21.7 18.6c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.1.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z" />
      </svg>
      <span>WhatsApp</span>
    </a>`;
  }

  /**
   * Initializes client-side behaviors for the footer (dynamic copyright year)
   */
  function initFooter() {
    if (typeof document === "undefined") return;

    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll(".site-footer__year, #footer-current-year");
    yearElements.forEach(el => {
      el.textContent = String(currentYear);
    });
  }

  // Auto-init on DOMContentLoaded if in browser
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initFooter);
    } else {
      initFooter();
    }
  }

  return {
    render: renderFooterMarkup,
    init: initFooter
  };
});
