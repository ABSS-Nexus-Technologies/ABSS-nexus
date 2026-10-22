/**
 * ABSS Nexus Technologies - Global Hero System Configurations
 * Maps each route / page category to its verified hero content, CTAs, and visual variant.
 */

(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ABSS_HERO_CONFIG = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  return {
    // 1. Homepage Marketing Hero
    home: {
      variant: "marketing",
      badge: "Engineering the Future • Accepting Projects 2026",
      headline: "Engineering the Future of Digital Intelligence & High-Performance Web",
      headlineAccent: "Digital Intelligence",
      description: "ABSS Nexus Technologies engineers custom responsive websites, scalable web applications, and modern UI/UX design. We help startups, institutions, and growing businesses build digital authority with speed, reliability, and precision.",
      primaryCta: { text: "Start a Project", href: "/contact#project-inquiry" },
      secondaryCta: { text: "Explore Our Work", href: "/work" },
      tertiaryCta: { text: "All 15 Services", href: "/services" },
      whatsappCta: { text: "WhatsApp", href: "https://wa.me/918757928673" },
      portalPills: [
        { label: "15 IT Services", href: "/services", emoji: "⚡" },
        { label: "Client Work", href: "/work", emoji: "💼" },
        { label: "Solutions", href: "/solutions", emoji: "🧩" },
        { label: "Industries", href: "/industries", emoji: "🏢" },
        { label: "Internships", href: "/internships", emoji: "🎓" },
        { label: "Pricing", href: "/pricing", emoji: "🏷️" }
      ],
      trustChips: [
        { label: "Founder-Led Advisory", href: "/about", emoji: "👨‍💻" },
        { label: "Sub-Second Performance", href: "/services/website-development", emoji: "⚡" },
        { label: "Edge Cloud & D1", href: "/services/cloud-computing", emoji: "☁️" }
      ],
      socialProof: {
        avatars: ["AS", "PM", "VP"],
        rating: "4.9/5 Rating from Business Owners",
        subtext: "50+ High-Performance Websites Shipped →",
        href: "/work"
      }
    },

    // 2. Company Overview Pages
    about: {
      variant: "page",
      badge: "About ABSS Nexus",
      headline: "Engineering Digital Excellence with Precision & Purpose",
      description: "Founded by Shubham Kumar, ABSS Nexus Technologies is a high-performance web engineering agency and developer development ecosystem based in Jaipur, Rajasthan.",
      primaryCta: { text: "Meet the Team", href: "/about#team" },
      secondaryCta: { text: "Explore Work", href: "/work" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "About Us", current: true }]
    },

    services: {
      variant: "page",
      badge: "Full-Stack Capabilities",
      headline: "Comprehensive IT & Web Engineering Services",
      description: "Explore our full catalog of 15 specialized digital services, from responsive business storefronts to cloud architecture and intelligent automated systems.",
      primaryCta: { text: "Request a Quote", href: "/contact#project-inquiry" },
      secondaryCta: { text: "View Pricing", href: "/pricing" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "Services", current: true }]
    },

    solutions: {
      variant: "page",
      badge: "Targeted Solutions",
      headline: "Tailored Business Solutions for Every Growth Stage",
      description: "From early-stage MVP launches to enterprise process automation, we solve real commercial challenges with pragmatic technology.",
      primaryCta: { text: "Consult an Engineer", href: "/contact#project-inquiry" },
      secondaryCta: { text: "Explore Industries", href: "/industries" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "Solutions", current: true }]
    },

    industries: {
      variant: "page",
      badge: "Domain Expertise",
      headline: "Specialized Digital Platforms for Key Industry Sectors",
      description: "Proven architectures customized for Higher Education, SaaS startups, Healthcare practices, and Commercial Retail.",
      primaryCta: { text: "Discuss Your Industry", href: "/contact#project-inquiry" },
      secondaryCta: { text: "View Case Studies", href: "/work" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "Industries", current: true }]
    },

    work: {
      variant: "page",
      badge: "Portfolio & Case Studies",
      headline: "Engineered for Measurable Impact & Clean Performance",
      description: "A showcase of verified production platforms, headless storefronts, and cloud systems delivered by ABSS Nexus Technologies.",
      primaryCta: { text: "Start Your Project", href: "/contact#project-inquiry" },
      secondaryCta: { text: "Review Services", href: "/services" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "Our Work", current: true }]
    },

    careers: {
      variant: "page",
      badge: "Join Our Team",
      headline: "Build High-Speed Systems with Passionate Craftsmen",
      description: "Work on production-scale web platforms, edge computing architectures, and innovative client systems in a collaborative engineering culture.",
      primaryCta: { text: "View Open Roles", href: "/careers#openings" },
      secondaryCta: { text: "Internship Programs", href: "/internships" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "Careers", current: true }]
    },

    blog: {
      variant: "page",
      badge: "Engineering Blog",
      headline: "Technical Insights, Architecture Guides & Web Trends",
      description: "Deep dives into Core Web Vitals, Edge computing, Cloudflare D1 databases, and Apple-inspired design systems.",
      primaryCta: { text: "Explore Articles", href: "/blog#articles" },
      secondaryCta: { text: "Client Case Studies", href: "/work" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "Blog", current: true }]
    },

    contact: {
      variant: "page",
      badge: "Get in Touch",
      headline: "Start a Conversation About Your Next Project",
      description: "Connect directly with our engineering leadership to discuss timelines, technical scope, and transparent pricing.",
      primaryCta: { text: "Direct WhatsApp", href: "https://wa.me/918757928673" },
      secondaryCta: { text: "View Pricing", href: "/pricing" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "Contact", current: true }]
    },

    pricing: {
      variant: "page",
      badge: "Transparent Investment",
      headline: "Predictable, High-Value Engineering Packages",
      description: "Clear deliverables, zero hidden fees, and flexible milestone-based contracts for startups and growing enterprises.",
      primaryCta: { text: "Get Custom Estimate", href: "/contact#project-inquiry" },
      secondaryCta: { text: "Review Catalog", href: "/services" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "Pricing", current: true }]
    },

    faq: {
      variant: "page",
      badge: "Frequently Asked Questions",
      headline: "Clear Answers to Common Project & Technical Questions",
      description: "Learn about our development timeline, intellectual property ownership, technology stack, and ongoing support.",
      primaryCta: { text: "Ask Another Question", href: "/contact#project-inquiry" },
      secondaryCta: { text: "Explore Services", href: "/services" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "FAQ", current: true }]
    },

    // 3. Internship Hub
    internships: {
      variant: "page",
      badge: "Developer Apprenticeship 2026",
      headline: "Real-World Engineering Internships with Direct Mentorship",
      description: "Gain hands-on experience building production software, mastering Git workflows, and shipping live edge applications under senior review.",
      primaryCta: { text: "Explore Programs", href: "/internships/programs" },
      secondaryCta: { text: "How It Works", href: "/internships/how-it-works" },
      breadcrumb: [{ label: "Home", href: "/" }, { label: "Internships", current: true }]
    },

    // 4. Utility & Auth Pages
    auth: {
      variant: "compact",
      badge: "Secure Portal",
      headline: "Developer & Client Access",
      description: "Sign in to access your project dashboard, review sprint tasks, and verify certificates."
    },

    legal: {
      variant: "compact",
      badge: "Legal & Compliance",
      headline: "Policies, Commitments & Governance",
      description: "Transparent terms, privacy safeguards, and service standards governing all ABSS Nexus client engagements."
    },

    notFound: {
      variant: "compact",
      badge: "404 Error",
      headline: "Page Not Found",
      description: "The page or resource you requested is unavailable or has moved.",
      primaryCta: { text: "Return Home", href: "/" },
      secondaryCta: { text: "Browse Services", href: "/services" }
    }
  };
});
