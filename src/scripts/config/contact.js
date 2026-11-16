/**
 * ABSS Nexus Technologies — Official Contact & Communications Configuration
 * Centralized, verified source of truth for company phone, WhatsApp, email, and location.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ABSS_CONFIG = root.ABSS_CONFIG || {};
    root.ABSS_CONFIG.contact = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  return {
    brandName: "ABSS Nexus Technologies",
    phoneDisplay: "+91 76888 99205",
    phoneCallable: "+917688899205",
    whatsappNumber: "917688899205",
    whatsappUrl: "https://wa.me/917688899205",
    email: "abssnexus@gmail.com",
    address: "Jaipur, Rajasthan, India",
    inquiryRoute: "/contact#project-inquiry",
    servicesRoute: "/services",
    solutionsRoute: "/solutions"
  };
});
