const fs = require("fs");
const path = require("path");
const { renderHeader, renderFooter, generateServicePage } = require("./service-template-engine");

const rootDir = path.resolve(__dirname, "..");
const pagesDir = path.join(rootDir, "src", "pages");

// Definition of All 15 Services
const servicesData = [
  // 1. Website Development
  {
    slug: "website-development",
    name: "Website Development",
    serviceParamName: "Website Development",
    title: "Website Development Services | ABSS Nexus Technologies",
    metaDescription: "Custom responsive website development by ABSS Nexus Technologies. Fast edge rendering, clean architecture, and conversion-focused web engineering for modern brands.",
    badge: "Web Engineering &bull; Sub-Second Edge Speed",
    headline: "High-Performance Websites Engineered for Real Business Growth",
    description: "From custom multi-page business websites to responsive corporate platforms, ABSS Nexus Technologies designs and engineers high-speed web experiences built with clean architecture, accessible contrast, and high-conversion pathways.",
    techStack: ["HTML5 / Vanilla CSS", "JavaScript (ES6+)", "Cloudflare Pages", "Vite", "Core Web Vitals", "Responsive UI"],
    visualHtml: `
      <div class="mockup-browser-apple">
        <div class="mockup-browser-header">
          <div class="mockup-browser-dots"><span></span><span></span><span></span></div>
          <div class="mockup-browser-bar">https://abssnexus.in/services/website-development</div>
        </div>
        <div class="mockup-browser-body">
          <div style="height: 12px; width: 45%; background: var(--color-blue); border-radius: 4px; margin-bottom: 8px;"></div>
          <div style="height: 8px; width: 85%; background: var(--color-border); border-radius: 4px;"></div>
          <div style="height: 8px; width: 70%; background: var(--color-border); border-radius: 4px;"></div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px;">
            <div style="height: 48px; background: var(--color-light-gray); border-radius: 6px; border: 1px solid var(--color-border); padding: 6px;">
              <span style="font-size: 10px; font-weight: 700; color: var(--color-near-black);">Core Web Vitals</span>
              <div style="font-size: 9px; color: var(--color-blue); font-weight: 600;">99/100 Score</div>
            </div>
            <div style="height: 48px; background: var(--color-light-gray); border-radius: 6px; border: 1px solid var(--color-border); padding: 6px;">
              <span style="font-size: 10px; font-weight: 700; color: var(--color-near-black);">Load Speed</span>
              <div style="font-size: 9px; color: #34c759; font-weight: 600;">&lt; 0.8s Global</div>
            </div>
          </div>
        </div>
      </div>`,
    problems: [
      { title: "Slow & Bloated Legacy Sites", desc: "Outdated themes and excessive scripts create sluggish load times that frustrate mobile visitors and hurt search rankings." },
      { title: "Fragmented Mobile Experiences", desc: "Desktop designs that break or become unreadable on mobile screens lead to high bounce rates and lost leads." },
      { title: "Weak Inquiry Conversion", desc: "Cluttered layouts without clear calls to action or reliable contact forms fail to turn visitors into paying clients." }
    ],
    capabilities: [
      { title: "Custom Responsive Architecture", desc: "Semantic HTML5 and CSS tailored to your brand, tested across mobile, tablet, and widescreen displays." },
      { title: "Edge Performance Optimization", desc: "Asset minification, responsive image compression, and Cloudflare edge delivery for instant paint times." },
      { title: "Interactive Contact Pipelines", desc: "Validated lead capture forms connected with direct WhatsApp consultation pathways." },
      { title: "Clean SEO & Schema Integration", desc: "Proper heading hierarchy, canonical tags, OpenGraph previews, and structured JSON-LD schemas." },
      { title: "Cross-Browser Compatibility", desc: "Thorough testing across Chrome, Safari, Edge, and Firefox ensuring identical pixel rendering." },
      { title: "Ongoing Maintenance Support", desc: "Post-launch verification, code updates, and proactive link health checks." }
    ],
    faqs: [
      { q: "How long does a custom website development project take?", a: "Standard landing pages and starter websites are typically completed within 3 to 7 working days. Comprehensive multi-page corporate sites usually take 1 to 3 weeks depending on scope and content preparation." },
      { q: "Can you redesign or speed up our existing website?", a: "Yes. We frequently reconstruct legacy websites, optimizing bloated codebases for lightning-fast speeds while preserving existing search engine URLs and authority." },
      { q: "Is the website optimized for mobile phones?", a: "Every website we engineer is strictly mobile-first, ensuring smooth navigation, readable typography, and responsive touch controls on all devices." },
      { q: "What is required from our side to begin development?", a: "We begin with a focused kickoff discussion. Having your brand name, core service offerings, preferred visual examples, and any available logos helps accelerate project milestones." }
    ],
    relatedServices: [
      { title: "UI/UX Design & Prototyping", desc: "Figma wireframes and high-fidelity design systems.", url: "/services/ui-ux-design" },
      { title: "E-Commerce Development", desc: "Fast digital storefronts with streamlined checkout flows.", url: "/services/ecommerce-development" },
      { title: "Website Maintenance & Support", desc: "Proactive uptime monitoring and routine health audits.", url: "/services/website-maintenance" }
    ]
  },

  // 2. Software Development
  {
    slug: "software-development",
    name: "Software Development",
    serviceParamName: "Custom Software",
    title: "Custom Software Development | ABSS Nexus Technologies",
    metaDescription: "Bespoke custom software engineering by ABSS Nexus Technologies. Modular business software, secure databases, automated workflows, and high-performance system backends.",
    badge: "Custom Software &bull; Modular Architecture",
    headline: "Tailored Software Systems Engineered for Complex Business Workflows",
    description: "When off-the-shelf software fails to match your operational reality, ABSS Nexus Technologies engineers custom, modular web software platforms with robust relational databases, secure authentication, and scalable business logic.",
    techStack: ["Node.js", "TypeScript", "Cloudflare D1 SQL", "RESTful APIs", "Role-Based Auth", "Git"],
    visualHtml: `
      <div class="schematic-diagram">
        <div class="schematic-node">
          <span>Client Web Application</span>
          <span class="node-badge">User Interface</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>API Gateway &amp; Auth</span>
          <span class="node-badge">JWT Verified</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>Business Logic Engine</span>
          <span class="node-badge">Serverless</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>Cloudflare D1 Relational DB</span>
          <span class="node-badge">SQL Storage</span>
        </div>
      </div>`,
    problems: [
      { title: "Rigid Off-the-Shelf Tools", desc: "Generic SaaS products force your business into awkward workflows and charge escalating per-seat monthly fees." },
      { title: "Data Silos & Manual Entry", desc: "Copy-pasting data between disconnected spreadsheets creates clerical errors, delays, and security risks." },
      { title: "Scaling Bottlenecks", desc: "Spreadsheets and simple tools crash or lag when transaction volumes, customer records, or staff users grow." }
    ],
    capabilities: [
      { title: "Custom Management Platforms", desc: "Tailored control rooms organizing projects, clients, inventory, and internal workflow tasks." },
      { title: "Relational Database Engineering", desc: "High-integrity SQL schema design, normalized tables, and automated edge data persistence." },
      { title: "Role-Based Access Control (RBAC)", desc: "Multi-tier security ensuring staff, managers, and clients only access authorized functions." },
      { title: "Automated Workflow Engines", desc: "Automated status transitions, notification triggers, and data validation rules." },
      { title: "Telemetry & Audit Logging", desc: "Immutable activity logs tracking all critical database operations, updates, and user events." },
      { title: "Edge API Integration", desc: "RESTful JSON endpoints enabling seamless connectivity with external third-party software." }
    ],
    faqs: [
      { q: "What types of custom software do you build?", a: "We build business management portals, operational tracking dashboards, customer onboarding platforms, and custom workflow automation systems tailored to client requirements." },
      { q: "How do you ensure data security in custom software?", a: "We apply token-based authentication (JWT), sanitized parameterized SQL queries to prevent injections, rate-limiting, and strict role-based access control." },
      { q: "Can we scale the software as our business expands?", a: "Yes. Our modular architecture is built to accommodate new modules, tables, and API integrations without requiring a complete rewrite." },
      { q: "Do you provide documentation and training?", a: "Every custom software release includes administrative documentation and direct founder-led walkthroughs for your operating team." }
    ],
    relatedServices: [
      { title: "API Integration & Webhooks", desc: "Connect your software with CRMs, payment gateways, and tools.", url: "/services/api-integration" },
      { title: "SaaS Product Development", desc: "Transform internal software into commercial subscription products.", url: "/services/saas-development" },
      { title: "Cloud Computing & Architecture", desc: "Deploy your software to resilient, scalable serverless infrastructure.", url: "/services/cloud-computing" }
    ]
  },

  // 3. Mobile App Development
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    serviceParamName: "Mobile App Development",
    title: "Mobile App & PWA Development | ABSS Nexus Technologies",
    metaDescription: "Mobile app and progressive web application development by ABSS Nexus Technologies. Responsive cross-platform interfaces, offline caching, and native-grade web speeds.",
    badge: "Cross-Platform &bull; Progressive Web Apps",
    headline: "Responsive Mobile Applications & Progressive Web Platforms",
    description: "Deliver fast, reliable mobile experiences directly into your customers' hands. We build cross-platform mobile apps and Progressive Web Apps (PWAs) with touch-optimized interfaces, offline caching, and rapid loading speeds.",
    techStack: ["Progressive Web Apps", "React Native / Capacitor", "Touch Gestures", "Service Workers", "Offline Cache", "REST APIs"],
    visualHtml: `
      <div class="mockup-mobile-frame">
        <div class="mockup-mobile-notch"></div>
        <div class="mockup-mobile-screen">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="height: 10px; width: 60px; background: var(--color-blue); border-radius: 3px;"></div>
            <div style="width: 14px; height: 14px; border-radius: 50%; background: var(--color-border);"></div>
          </div>
          <div style="height: 38px; background: var(--color-light-gray); border-radius: 8px; border: 1px solid var(--color-border); padding: 6px; margin-top: 6px;">
            <div style="height: 6px; width: 50%; background: var(--color-near-black); border-radius: 2px;"></div>
            <div style="height: 6px; width: 80%; background: var(--color-secondary-text); border-radius: 2px; margin-top: 4px;"></div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 6px;">
            <div style="height: 42px; background: rgba(0,102,204,0.08); border-radius: 6px; border: 1px solid rgba(0,102,204,0.15);"></div>
            <div style="height: 42px; background: var(--color-light-gray); border-radius: 6px; border: 1px solid var(--color-border);"></div>
          </div>
          <div style="height: 24px; background: var(--color-blue); border-radius: 12px; margin-top: 8px;"></div>
        </div>
      </div>`,
    problems: [
      { title: "High Cost of Dual Native Apps", desc: "Building separate iOS and Android apps simultaneously requires duplicate budgets and double the maintenance overhead." },
      { title: "Slow Mobile Web Experiences", desc: "Desktop sites compressed onto mobile screens suffer from tiny touch targets, slow scrolling, and sluggish responses." },
      { title: "Loss of Connection Failures", desc: "Standard web pages fail completely when users face intermittent mobile connectivity or weak cellular networks." }
    ],
    capabilities: [
      { title: "Progressive Web App (PWA) Engineering", desc: "Installable app-like experiences without requiring app store downloads or commission fees." },
      { title: "Touch-First Interface Design", desc: "Ergonomic 48px+ tap targets, intuitive swipe gestures, and thumb-zone navigation controls." },
      { title: "Service Worker Caching", desc: "Smart asset and data caching allowing critical information to remain accessible offline." },
      { title: "Cross-Platform Codebases", desc: "Single maintainable codebase running reliably across Android, iOS, tablets, and desktop browsers." },
      { title: "API Integration & Real-Time Sync", desc: "Seamless background data synchronization with backend databases and customer accounts." },
      { title: "Fast Push Notification Ready", desc: "Architecture prepared for customer alerts, status updates, and re-engagement messaging." }
    ],
    faqs: [
      { q: "What is the advantage of a Progressive Web App (PWA)?", a: "PWAs can be installed directly from the browser onto user home screens, load almost instantly via service workers, and eliminate app store review delays and 30% revenue cuts." },
      { q: "Can PWAs send push notifications?", a: "Yes. Modern mobile browsers on Android and iOS (iOS 16.4+) fully support web push notifications for installed web apps." },
      { q: "Do you also support hybrid mobile app packaging?", a: "Yes. Using tools like Capacitor, we can package high-performance web applications into native binary builds ready for Google Play and Apple App Store." },
      { q: "How do you handle offline functionality?", a: "We configure service worker cache strategies (Cache-First for static assets, Network-First with fallback for data) to ensure smooth offline operation." }
    ],
    relatedServices: [
      { title: "UI/UX Design & Prototyping", desc: "Ergonomic mobile interfaces and high-fidelity Figma mockups.", url: "/services/ui-ux-design" },
      { title: "Website Development", desc: "Responsive high-speed business web engineering.", url: "/services/website-development" },
      { title: "API Integration", desc: "Fast RESTful endpoints connecting mobile clients to cloud data.", url: "/services/api-integration" }
    ]
  },

  // 4. UI/UX Design
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    serviceParamName: "UI/UX Design",
    title: "UI/UX Design & Prototyping | ABSS Nexus Technologies",
    metaDescription: "Human-centered UI/UX design and design systems by ABSS Nexus Technologies. High-fidelity Figma prototypes, intuitive user journeys, and clean typography guidelines.",
    badge: "User Experience &bull; Design Systems",
    headline: "Minimalist, Human-Centered UI/UX Design & Design Systems",
    description: "Transform complex digital workflows into clean, intuitive interfaces. Inspired by Apple's design philosophy, ABSS Nexus Technologies designs coherent design systems, frictionless user journeys, and interactive Figma prototypes.",
    techStack: ["Figma", "Design Systems", "Space Grotesk & Inter", "Wireframing", "WCAG AAA", "Design Tokens"],
    visualHtml: `
      <div style="background: var(--color-light-gray); border: 1px solid var(--color-border); border-radius: 12px; padding: 18px;">
        <div style="font-size: 11px; font-weight: 700; color: var(--color-secondary-text); margin-bottom: 10px; text-transform: uppercase;">Design Token System</div>
        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
          <div style="flex: 1; height: 32px; background: #0066CC; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 9px; font-weight: 600;">Action Blue</div>
          <div style="flex: 1; height: 32px; background: #F5F5F7; border: 1px solid #D2D2D7; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #1D1D1F; font-size: 9px; font-weight: 600;">Light Grey</div>
          <div style="flex: 1; height: 32px; background: #1D1D1F; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 9px; font-weight: 600;">Near Black</div>
        </div>
        <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: 8px; padding: 12px;">
          <span style="font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 700; color: #1D1D1F; display: block;">Space Grotesk (Headings)</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 11px; color: #6E6E73; margin-top: 4px; display: block;">Inter 400/500/600 (Clean body &amp; UI typography)</span>
        </div>
      </div>`,
    problems: [
      { title: "High User Drop-off & Confusion", desc: "Cluttered interfaces with inconsistent buttons and confusing menus frustrate visitors and drive them away." },
      { title: "Fragmented Brand Identity", desc: "Different pages and components using conflicting colors, fonts, and card styles dilute company credibility." },
      { title: "Friction in Developer Handoff", desc: "Design mockups without standardized spacing, tokens, and responsive states lead to broken frontend code." }
    ],
    capabilities: [
      { title: "Comprehensive Design Systems", desc: "Reusable token libraries establishing typography, harmonious palettes, spacing, and button variants." },
      { title: "Interactive Figma Prototyping", desc: "Clickable prototypes simulating real user journeys, modal transitions, and state changes." },
      { title: "User Flow & Information Architecture", desc: "Hierarchical sitemaps and wireframes structuring content for intuitive comprehension." },
      { title: "Accessible Contrast Auditing", desc: "Color combinations and font sizes adhering strictly to WCAG AAA/AA readability standards." },
      { title: "Component Library Preparation", desc: "Complete UI kits prepared for pixel-perfect implementation by frontend engineering teams." },
      { title: "Mobile & Responsive Breakpoints", desc: "Every component explicitly documented across desktop, tablet, and mobile dimensions." }
    ],
    faqs: [
      { q: "What design tools do you use for UI/UX?", a: "We work primarily in Figma, delivering organized vector component libraries, interactive prototypes, and inspectable code tokens." },
      { q: "Can we use your designs with our own developers?", a: "Absolutely. Our Figma files are organized with clear auto-layouts, tokens, and developer notes ready for any engineering team." },
      { q: "Do you follow accessibility guidelines?", a: "Yes. Every interface design is audited for WCAG AA/AAA contrast ratios, minimum touch target dimensions, and visible keyboard focus states." },
      { q: "How many design revisions are included?", a: "Our milestone process includes collaborative feedback rounds during wireframing, high-fidelity mockups, and final handoff." }
    ],
    relatedServices: [
      { title: "Website Development", desc: "Turn Figma prototypes into lightning-fast production websites.", url: "/services/website-development" },
      { title: "Mobile App Development", desc: "Touch-optimized interface design for mobile applications.", url: "/services/mobile-app-development" },
      { title: "SaaS Development", desc: "Multi-tenant dashboard design for complex software platforms.", url: "/services/saas-development" }
    ]
  },

  // 5. AI & Machine Learning
  {
    slug: "ai-machine-learning",
    name: "AI & Machine Learning",
    serviceParamName: "AI Integration",
    title: "AI & Machine Learning Solutions | ABSS Nexus Technologies",
    metaDescription: "Practical AI and machine learning integration by ABSS Nexus Technologies. Smart workflow automation, intelligent recommendation logic, and predictive analytics models.",
    badge: "Artificial Intelligence &bull; Practical Automation",
    headline: "Pragmatic AI & Machine Learning Integration for Business Acceleration",
    description: "Harness artificial intelligence to automate time-consuming manual workflows, analyze proprietary business data, and deliver intelligent customer experiences through secure, scalable API integrations.",
    techStack: ["OpenAI / Gemini APIs", "Python", "Vector Databases", "Embeddings", "REST Integrations", "Data Parsing"],
    visualHtml: `
      <div class="schematic-diagram">
        <div class="schematic-node">
          <span>Customer Request / Query</span>
          <span class="node-badge">Input</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>Vector Context &amp; RAG Pipeline</span>
          <span class="node-badge">Embeddings</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>LLM Inference Engine</span>
          <span class="node-badge">AI Model</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>Validated Business Output</span>
          <span class="node-badge">Automated</span>
        </div>
      </div>`,
    problems: [
      { title: "Manual Repetitive Data Work", desc: "Staff spending hours reading documents, categorizing inquiries, or manually answering standard client questions." },
      { title: "Unused Business Intelligence", desc: "Valuable customer interactions and records sitting dormant in databases without actionable analysis." },
      { title: "Unrealistic AI Complexity", desc: "Overpriced AI projects that promise miracles but deliver complex, unmaintainable models that fail in production." }
    ],
    capabilities: [
      { title: "Intelligent Workflow Automation", desc: "Extracting structured data from incoming emails, inquiries, and documents automatically." },
      { title: "Retrieval-Augmented Generation (RAG)", desc: "Grounding AI models with your private business documentation for accurate, hallucination-free answers." },
      { title: "Smart Customer Support Bots", desc: "Context-aware conversational assistants capable of resolving Tier-1 queries 24/7." },
      { title: "Content & Summary Generation", desc: "Automated report synthesis, product description drafts, and client communication summaries." },
      { title: "Secure API Architecture", desc: "Data privacy controls ensuring confidential business information is never leaked to public training sets." },
      { title: "Continuous Accuracy Monitoring", desc: "Logging inference responses, measuring accuracy, and refining prompt engineering pipelines." }
    ],
    faqs: [
      { q: "Is our business data safe when using AI models?", a: "Yes. We integrate enterprise API endpoints with strict zero-data-retention agreements, ensuring your proprietary information is never used to train public models." },
      { q: "Do we need huge datasets to start using AI?", a: "No. Modern foundation models can be enhanced with Retrieval-Augmented Generation (RAG) using your existing documents, FAQs, and product catalogs." },
      { q: "How can AI help a small or medium business?", a: "Practical AI can automate inquiry routing, draft routine client replies, summarize lengthy meeting transcripts, and validate document submissions instantly." },
      { q: "What is the typical timeline for an AI integration?", a: "A scoped prototype or intelligent workflow integration is typically implemented and tested within 1 to 3 weeks." }
    ],
    relatedServices: [
      { title: "Data Analytics & BI", desc: "Transform business data into actionable visual dashboards.", url: "/services/data-analytics-bi" },
      { title: "Custom Software Development", desc: "Integrate AI pipelines into custom web software systems.", url: "/services/software-development" },
      { title: "API Integration", desc: "Connect external AI engines with your existing CRM and database.", url: "/services/api-integration" }
    ]
  },

  // 6. Cloud Computing
  {
    slug: "cloud-computing",
    name: "Cloud Computing",
    serviceParamName: "Cloud Computing",
    title: "Cloud Computing & Edge Architecture | ABSS Nexus Technologies",
    metaDescription: "Edge cloud computing and serverless infrastructure by ABSS Nexus Technologies. Distributed database architecture, global CDN routing, and zero-downtime edge performance.",
    badge: "Cloud Architecture &bull; Serverless Edge",
    headline: "Serverless Cloud Infrastructure & Global Edge Deployment",
    description: "Eliminate expensive server maintenance and regional latency. ABSS Nexus Technologies architectures resilient cloud systems utilizing Cloudflare global edge networks, serverless functions, and distributed SQL databases.",
    techStack: ["Cloudflare Pages", "Workers Edge", "Cloudflare D1 SQL", "Serverless", "Edge CDN", "CI/CD"],
    visualHtml: `
      <div class="schematic-diagram">
        <div class="schematic-node">
          <span>Global Anycast CDN</span>
          <span class="node-badge">300+ Cities</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>Serverless Workers Functions</span>
          <span class="node-badge">&lt; 15ms Latency</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>Distributed D1 Relational DB</span>
          <span class="node-badge">Zero Maintenance</span>
        </div>
      </div>`,
    problems: [
      { title: "Server Maintenance Overhead", desc: "Managing physical or virtual Linux servers requires constant OS patches, security updates, and manual scaling." },
      { title: "Regional Latency & Slow APIs", desc: "Hosting an application on a single distant server creates sluggish response times for users in other regions." },
      { title: "Sudden Traffic Downtime", desc: "Traditional servers crash when unexpected spikes in traffic or concurrent user requests overwhelm memory." }
    ],
    capabilities: [
      { title: "Global Edge CDN Routing", desc: "Static assets cached and served from over 300 edge locations globally for sub-second delivery." },
      { title: "Serverless Compute Functions", desc: "Event-driven compute that executes in milliseconds without requiring persistent server management." },
      { title: "Distributed Relational Databases", desc: "Cloudflare D1 SQL integration providing ACID-compliant database storage close to end users." },
      { title: "Zero-Downtime Deployment", desc: "Automated git-integrated deployment pipelines with instant rollback protection." },
      { title: "Cost-Optimized Cloud Architecture", desc: "Pay only for actual execution time, drastically reducing monthly cloud infrastructure costs." },
      { title: "SSL & Edge Security Hardening", desc: "Automated modern TLS encryption, DDoS mitigation, and edge rate-limiting rules." }
    ],
    faqs: [
      { q: "Why do you recommend Cloudflare edge architecture?", a: "Cloudflare's serverless edge runs code in 300+ locations globally, eliminates Linux server patch maintenance, offers built-in DDoS protection, and drastically cuts hosting costs." },
      { q: "Can we migrate our existing database to serverless SQL?", a: "Yes. We migrate standard relational schemas (MySQL, PostgreSQL, SQLite) to Cloudflare D1 or cloud-managed SQL backends with zero data loss." },
      { q: "What is serverless compute?", a: "Serverless compute runs your backend code only when a request arrives, scaling up instantly during traffic spikes and scaling down to zero when idle." },
      { q: "How does edge deployment improve SEO?", a: "Serving pages from edge locations near users reduces Time to First Byte (TTFB) to under 50ms, directly improving Core Web Vitals and search rankings." }
    ],
    relatedServices: [
      { title: "Custom Software Development", desc: "Build backend applications optimized for serverless cloud execution.", url: "/services/software-development" },
      { title: "Cybersecurity & Hardening", desc: "Protect edge cloud systems with firewalls and security rules.", url: "/services/cybersecurity" },
      { title: "Website Maintenance & Support", desc: "Proactive uptime monitoring and cloud infrastructure health.", url: "/services/website-maintenance" }
    ]
  },

  // 7. Cybersecurity
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    serviceParamName: "Cybersecurity",
    title: "Web Cybersecurity & Hardening | ABSS Nexus Technologies",
    metaDescription: "Web application security and hardening by ABSS Nexus Technologies. Proactive vulnerability audits, rate-limiting rules, honeypot protection, and safe authentication.",
    badge: "Web Security &bull; Proactive Hardening",
    headline: "Rigorous Web Application Security & Defense-in-Depth Hardening",
    description: "Protect your web platforms, client data, and brand reputation. ABSS Nexus Technologies implements proactive defenses against OWASP vulnerabilities, bot spam, brute force attacks, and data tampering.",
    techStack: ["Content Security Policy", "OWASP Standards", "Honeypot Protection", "Rate Limiting", "JWT Encryption", "WAF Rules"],
    visualHtml: `
      <div style="background: var(--color-white); border: 1px solid var(--color-border); border-radius: 12px; padding: 20px; text-align: center;">
        <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(52, 199, 89, 0.1); color: #34c759; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <div style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-near-black);">Shield Active &bull; Defense Layered</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 14px; text-align: left;">
          <div style="background: var(--color-light-gray); padding: 8px; border-radius: 6px; font-size: 10px; color: var(--color-near-black);"><strong>CSP Headers:</strong> Enabled</div>
          <div style="background: var(--color-light-gray); padding: 8px; border-radius: 6px; font-size: 10px; color: var(--color-near-black);"><strong>X-Frame:</strong> DENY</div>
          <div style="background: var(--color-light-gray); padding: 8px; border-radius: 6px; font-size: 10px; color: var(--color-near-black);"><strong>Honeypot:</strong> Active</div>
          <div style="background: var(--color-light-gray); padding: 8px; border-radius: 6px; font-size: 10px; color: var(--color-near-black);"><strong>Rate Limit:</strong> 60/min</div>
        </div>
      </div>`,
    problems: [
      { title: "Form Spam & Bot Abuse", desc: "Automated malicious bots flooding contact forms with spam, phishing links, and fake inquiries." },
      { title: "Clickjacking & Framing Attacks", desc: "Unprotected web pages embedded inside malicious third-party frames to mislead users or steal clicks." },
      { title: "SQL Injection & Data Exposure", desc: "Unsanitized database queries and poorly configured endpoints exposing private client communications." }
    ],
    capabilities: [
      { title: "Security Headers Implementation", desc: "Strict Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy." },
      { title: "Honeypot Form Protection", desc: "Invisible trap fields catching automated bot spam without frustrating human users with CAPTCHAs." },
      { title: "Parameterized SQL Queries", desc: "Zero concatenation in SQL querying, eliminating SQL injection vulnerabilities completely." },
      { title: "Edge Rate-Limiting Controls", desc: "Restricting excessive repeated requests to prevent brute force login attempts and denial-of-service." },
      { title: "Token Authentication Hardening", desc: "Cryptographically signed JWT authorization with secure cookies and expiration controls." },
      { title: "Vulnerability Auditing & Review", desc: "Static code analysis identifying exposed credentials, unvalidated inputs, and legacy packages." }
    ],
    faqs: [
      { q: "How do you protect forms without annoying CAPTCHAs?", a: "We use invisible honeypot techniques and client-side behavior validation that trick automated spam bots while letting human visitors submit instantly." },
      { q: "What security headers are critical for websites?", a: "X-Frame-Options: DENY (prevents clickjacking), X-Content-Type-Options: nosniff (prevents MIME sniffing), and strict Referrer-Policy protect visitor privacy." },
      { q: "Can you audit an existing website for vulnerabilities?", a: "Yes. We perform thorough security reviews covering form endpoints, database inputs, third-party scripts, and SSL configuration." },
      { q: "What should we do if our website has been compromised?", a: "Contact us immediately for emergency containment, code cleanup, credential rotation, and migration to a hardened edge environment." }
    ],
    relatedServices: [
      { title: "Website Maintenance & Support", desc: "Continuous security patching and monthly vulnerability checks.", url: "/services/website-maintenance" },
      { title: "Cloud Computing & Architecture", desc: "Deploy to Cloudflare's secure DDoS-protected edge network.", url: "/services/cloud-computing" },
      { title: "Custom Software Development", desc: "Build applications with secure architecture from day one.", url: "/services/software-development" }
    ]
  },

  // 8. Data Analytics & Business Intelligence
  {
    slug: "data-analytics-bi",
    name: "Data Analytics & BI",
    serviceParamName: "Data Analytics",
    title: "Data Analytics & BI Dashboards | ABSS Nexus Technologies",
    metaDescription: "Data analytics and business intelligence dashboards by ABSS Nexus Technologies. Real-time KPI telemetry, custom conversion charts, and actionable performance tracking.",
    badge: "Business Intelligence &bull; Real-Time Telemetry",
    headline: "Actionable Data Analytics & Executive Intelligence Dashboards",
    description: "Convert raw business data into strategic decisions. ABSS Nexus Technologies designs real-time analytics dashboards, telemetry pipelines, and KPI tracking systems that provide clear visibility into operational performance.",
    techStack: ["Interactive Charts", "Cloudflare D1 SQL", "Event Telemetry", "GA4 / Analytics", "Node.js", "KPI Metrics"],
    visualHtml: `
      <div style="background: var(--color-white); border: 1px solid var(--color-border); border-radius: 12px; padding: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--color-near-black);">Operational Telemetry</span>
          <span style="font-size: 10px; color: #34c759; font-weight: 600;">&bull; Live Feed</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
          <div style="background: var(--color-light-gray); padding: 10px; border-radius: 8px;">
            <div style="font-size: 9px; color: var(--color-secondary-text);">Monthly Inquiries</div>
            <div style="font-size: 16px; font-weight: 700; color: var(--color-blue); margin-top: 2px;">+148%</div>
          </div>
          <div style="background: var(--color-light-gray); padding: 10px; border-radius: 8px;">
            <div style="font-size: 9px; color: var(--color-secondary-text);">Avg Response</div>
            <div style="font-size: 16px; font-weight: 700; color: #34c759; margin-top: 2px;">&lt; 15 min</div>
          </div>
        </div>
        <div style="height: 38px; background: rgba(0,102,204,0.06); border-radius: 6px; display: flex; align-items: flex-end; padding: 4px; gap: 6px;">
          <div style="flex: 1; height: 40%; background: var(--color-blue); border-radius: 2px;"></div>
          <div style="flex: 1; height: 60%; background: var(--color-blue); border-radius: 2px;"></div>
          <div style="flex: 1; height: 50%; background: var(--color-blue); border-radius: 2px;"></div>
          <div style="flex: 1; height: 85%; background: var(--color-blue); border-radius: 2px;"></div>
          <div style="flex: 1; height: 100%; background: var(--color-blue); border-radius: 2px;"></div>
        </div>
      </div>`,
    problems: [
      { title: "Flying Blind on Key Metrics", desc: "Business leaders lacking real-time insight into marketing inquiries, client retention rates, or operational delays." },
      { title: "Fragmented Manual Spreadsheets", desc: "Different departments maintaining conflicting spreadsheets with out-of-date numbers and broken formulas." },
      { title: "Overly Complex BI Platforms", desc: "Clunky enterprise tools that require specialized data engineers just to run a simple quarterly performance report." }
    ],
    capabilities: [
      { title: "Custom Executive Dashboards", desc: "Clean visual dashboards highlighting key metrics without overwhelming clutter or unnecessary complexity." },
      { title: "Real-Time Telemetry Logging", desc: "Tracking user signups, lead submissions, and system transactions as they occur." },
      { title: "High-Performance SQL Aggregations", desc: "Fast analytical SQL queries designed to return aggregated trends without slowing production databases." },
      { title: "Conversion Funnel Tracking", desc: "Pinpointing exactly where potential customers drop off in landing pages and checkout flows." },
      { title: "Automated Scheduled Reports", desc: "Consolidated performance summaries delivered directly to management inboxes on schedule." },
      { title: "Data Export & Compliance", desc: "One-click export to CSV/JSON format with strict permissions protecting sensitive records." }
    ],
    faqs: [
      { q: "How do custom dashboards compare to tools like PowerBI?", a: "Our custom dashboards are lightweight, load directly inside your browser or admin panel, require no per-user licensing fees, and integrate seamlessly with your database." },
      { q: "Can we track visitor conversions without invading privacy?", a: "Yes. We implement cookieless telemetry and privacy-preserving analytics that track aggregate performance without violating GDPR or data regulations." },
      { q: "Can the dashboard pull data from multiple sources?", a: "Yes. We engineer unified backend aggregation scripts that pull records from multiple databases, forms, and third-party APIs into one interface." },
      { q: "How often is the data refreshed?", a: "Depending on your preference, dashboards can display real-time event updates or scheduled periodic refreshes." }
    ],
    relatedServices: [
      { title: "Custom Software Development", desc: "Integrate custom BI dashboards directly into internal software.", url: "/services/software-development" },
      { title: "AI & Machine Learning", desc: "Use predictive models to uncover future trends in your data.", url: "/services/ai-machine-learning" },
      { title: "Cloud Computing & Architecture", desc: "Store and query analytical datasets on high-speed edge cloud storage.", url: "/services/cloud-computing" }
    ]
  },

  // 9. Digital Marketing & SEO
  {
    slug: "digital-marketing-seo",
    name: "Digital Marketing & SEO",
    serviceParamName: "Digital Marketing",
    title: "Technical SEO & Digital Growth | ABSS Nexus Technologies",
    metaDescription: "Technical SEO and organic search engineering by ABSS Nexus Technologies. Core Web Vitals acceleration, structured data schemas, and search-optimized site architecture.",
    badge: "Technical SEO &bull; Search Architecture",
    headline: "Technical SEO & Sustainable Organic Search Growth Engineering",
    description: "Earn sustainable search engine visibility. Rather than temporary tricks, ABSS Nexus Technologies engineers solid technical SEO foundations: sub-second Core Web Vitals, clean semantic HTML, structured JSON-LD schemas, and crawlable architecture.",
    techStack: ["Core Web Vitals", "Schema.org JSON-LD", "Search Console", "Canonical Standards", "Semantic HTML", "Sitemap XML"],
    visualHtml: `
      <div style="background: var(--color-white); border: 1px solid var(--color-border); border-radius: 12px; padding: 18px;">
        <div style="font-size: 11px; font-weight: 700; color: var(--color-blue); margin-bottom: 4px;">Google Search Result Simulator</div>
        <div style="font-size: 13px; font-weight: 600; color: #1a0dab; text-decoration: underline;">ABSS Nexus Technologies | High-Performance IT &amp; Web</div>
        <div style="font-size: 10px; color: #006621; margin-top: 2px;">https://abssnexus.in/services/website-development</div>
        <div style="font-size: 11px; color: var(--color-secondary-text); margin-top: 4px; line-height: 1.4;">
          Custom responsive website development with sub-second speeds, clean architecture, and conversion-focused web engineering...
        </div>
        <div style="display: flex; gap: 8px; margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--color-border);">
          <span style="font-size: 9px; font-weight: 700; color: #34c759;">LCP: 0.8s</span>
          <span style="font-size: 9px; font-weight: 700; color: #34c759;">FID: 12ms</span>
          <span style="font-size: 9px; font-weight: 700; color: #34c759;">CLS: 0.00</span>
        </div>
      </div>`,
    problems: [
      { title: "Invisible on Search Engines", desc: "Building a beautiful website that gets zero organic traffic because search engine crawlers cannot understand its structure." },
      { title: "Core Web Vitals Penalties", desc: "Slow loading speeds, unoptimized images, and layout shifts that trigger Google algorithmic ranking downgrades." },
      { title: "Duplicate Content & Canonical Errors", desc: "Multiple conflicting URLs for the same page causing search engines to split authority or deindex pages." }
    ],
    capabilities: [
      { title: "Core Web Vitals Optimization", desc: "Tuning LCP, INP, and CLS scores to the green 90+ zone, providing immediate search engine advantages." },
      { title: "Structured Data & Schema.org", desc: "Implementing Organization, Service, Breadcrumb, and FAQ schemas to trigger rich search results." },
      { title: "Clean Canonical Architecture", desc: "Self-referential canonical tags and clean URL structures preventing duplicate content penalties." },
      { title: "Automated Sitemap & Robots.txt", desc: "Strictly configured XML sitemaps guiding search crawlers to index priority pages efficiently." },
      { title: "Mobile Usability Remediation", desc: "Eliminating horizontal overflow, unreadable text scaling, and cramped clickable elements." },
      { title: "Search Console Diagnostic Auditing", desc: "Resolving indexing errors, 404 redirects, and mobile crawl warnings in Google Search Console." }
    ],
    faqs: [
      { q: "What is Technical SEO?", a: "Technical SEO focuses on website infrastructure: page speed, mobile responsiveness, semantic code, structured data schemas, and crawlability that search engines require to rank pages." },
      { q: "How long does it take for SEO changes to show results?", a: "Technical improvements like page speed and schema fix indexing errors in days. Organic ranking increases typically build steadily over 4 to 12 weeks as search engines re-crawl." },
      { q: "Do you guarantee #1 rankings on Google?", a: "No legitimate engineering firm can guarantee #1 placement. We guarantee transparent, verifiable compliance with Google's technical webmaster guidelines and Core Web Vitals standards." },
      { q: "Will our existing rankings drop during a website redesign?", a: "No. We implement precise 301 redirect mappings for all old URLs to ensure accumulated domain authority and search rankings are safely preserved." }
    ],
    relatedServices: [
      { title: "Website Development", desc: "Engineered from the ground up for lightning-fast Core Web Vitals.", url: "/services/website-development" },
      { title: "Data Analytics & BI", desc: "Track organic search conversions and user engagement metrics.", url: "/services/data-analytics-bi" },
      { title: "Website Maintenance & Support", desc: "Ongoing monthly SEO audits and link health validation.", url: "/services/website-maintenance" }
    ]
  },

  // 10. E-commerce Development
  {
    slug: "ecommerce-development",
    name: "E-Commerce Development",
    serviceParamName: "E-commerce Website",
    title: "E-Commerce Storefront Development | ABSS Nexus Technologies",
    metaDescription: "Custom e-commerce storefront development by ABSS Nexus Technologies. High-speed product catalogs, frictionless shopping carts, and direct WhatsApp order conversion paths.",
    badge: "Digital Commerce &bull; High Conversion",
    headline: "Fast, Streamlined E-Commerce Storefronts & Product Catalogs",
    description: "Sell products and services without heavy platform transaction cuts or sluggish checkout flows. ABSS Nexus Technologies engineers custom e-commerce experiences featuring responsive product grids, intuitive carts, and localized payment gateways.",
    techStack: ["Custom Shopping Cart", "WhatsApp Ordering", "Razorpay / Stripe", "Product Catalogs", "Responsive Grids", "Cloud D1"],
    visualHtml: `
      <div style="background: var(--color-white); border: 1px solid var(--color-border); border-radius: 12px; padding: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--color-near-black);">Storefront Demo</span>
          <span style="font-size: 10px; background: rgba(0,102,204,0.08); color: var(--color-blue); padding: 2px 8px; border-radius: 980px; font-weight: 600;">Cart (2 Items)</span>
        </div>
        <div style="background: var(--color-light-gray); border: 1px solid var(--color-border); border-radius: 8px; padding: 10px; display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
          <div style="width: 36px; height: 36px; background: #e0e0e0; border-radius: 6px;"></div>
          <div style="flex: 1;">
            <div style="font-size: 11px; font-weight: 600; color: var(--color-near-black);">Premium Starter Kit</div>
            <div style="font-size: 10px; color: var(--color-blue); font-weight: 700;">₹4,999</div>
          </div>
        </div>
        <div style="background: #25d366; color: white; border-radius: 8px; padding: 8px; text-align: center; font-size: 11px; font-weight: 600; cursor: pointer;">
          Instant WhatsApp Checkout &rarr;
        </div>
      </div>`,
    problems: [
      { title: "Exorbitant Platform Commissions", desc: "Monthly SaaS fees and 2-3% platform cuts on every sale eating deeply into profit margins." },
      { title: "Cart Abandonment on Slow Checkouts", desc: "Multi-page checkout forms asking for excessive information leading to 70%+ abandoned carts." },
      { title: "Sluggish Mobile Storefronts", desc: "Heavily templated e-commerce stores that load slowly on mobile phones, killing customer intent." }
    ],
    capabilities: [
      { title: "Fast Product Catalog Architecture", desc: "Instant filtering by category, search keywords, and price with zero lag." },
      { title: "Frictionless Shopping Cart Engine", desc: "Lightweight client-side cart retaining items seamlessly across browsing sessions." },
      { title: "WhatsApp Direct Order Conversion", desc: "One-click order transfer sending itemized order details directly to your sales WhatsApp." },
      { title: "Secure Payment Gateway Integration", desc: "Support for Razorpay, Stripe, and UPI payments with instant automated payment receipts." },
      { title: "Inventory & Order Control Room", desc: "Admin panels allowing non-technical staff to update prices, stock, and product images." },
      { title: "SEO-Optimized Product Pages", desc: "Structured Product schema tags enabling price and availability rich snippets in Google." }
    ],
    faqs: [
      { q: "How does the WhatsApp checkout work?", a: "When customers tap 'Order via WhatsApp', their cart contents, quantities, total price, and shipping details are pre-formatted into a message sent directly to your business WhatsApp." },
      { q: "Can we accept online card and UPI payments?", a: "Yes. We integrate verified payment gateways like Razorpay or Stripe to support UPI, credit cards, debit cards, and net banking." },
      { q: "Do you charge a commission on our sales?", a: "Never. You own the code and storefront completely. We charge only for development and optional maintenance; 100% of your revenue stays yours." },
      { q: "Can we add new products ourselves?", a: "Yes. We provide clean administrative portals or simple JSON data structures enabling you to add products and modify prices in seconds." }
    ],
    relatedServices: [
      { title: "Website Development", desc: "High-speed business platforms and corporate websites.", url: "/services/website-development" },
      { title: "UI/UX Design & Prototyping", desc: "Conversion-optimized shopping journeys and product cards.", url: "/services/ui-ux-design" },
      { title: "Digital Marketing & SEO", desc: "Drive organic search shoppers to your product catalog.", url: "/services/digital-marketing-seo" }
    ]
  },

  // 11. SaaS Development
  {
    slug: "saas-development",
    name: "SaaS Development",
    serviceParamName: "SaaS Development",
    title: "SaaS Product Development | ABSS Nexus Technologies",
    metaDescription: "End-to-end SaaS application engineering by ABSS Nexus Technologies. Multi-tenant database design, user role access, subscription workflows, and scalable cloud MVPs.",
    badge: "Cloud Software &bull; Subscription Systems",
    headline: "End-to-End SaaS Product Development & Subscription MVPs",
    description: "Launch your software-as-a-service venture with confidence. ABSS Nexus Technologies architects scalable SaaS MVPs featuring multi-tenant database isolation, automated subscription billing, user role permissions, and intuitive dashboards.",
    techStack: ["Multi-Tenant Architecture", "Stripe Subscriptions", "TypeScript", "Cloudflare D1 SQL", "Role Auth", "REST APIs"],
    visualHtml: `
      <div style="background: var(--color-white); border: 1px solid var(--color-border); border-radius: 12px; padding: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--color-near-black);">SaaS Multi-Tenant Hub</span>
          <span style="font-size: 10px; background: rgba(52,199,89,0.1); color: #34c759; padding: 2px 8px; border-radius: 980px; font-weight: 600;">99.98% Active</span>
        </div>
        <div style="background: var(--color-light-gray); border-radius: 8px; padding: 10px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 11px; font-weight: 600; color: var(--color-near-black);">Pro Monthly Plan</div>
            <div style="font-size: 9px; color: var(--color-secondary-text);">Auto-billing active</div>
          </div>
          <span style="font-size: 11px; font-weight: 700; color: var(--color-blue);">$49/mo</span>
        </div>
        <div style="font-size: 10px; color: var(--color-secondary-text); text-align: center; margin-top: 6px;">
          Role Permissions: Admin &bull; Member &bull; Viewer
        </div>
      </div>`,
    problems: [
      { title: "Slow MVP Development Cycles", desc: "Spending 12+ months building an over-engineered product before testing real market demand and paying users." },
      { title: "Complex Multi-Tenancy Architecture", desc: "Failing to properly isolate tenant data, leading to security vulnerabilities or catastrophic data leaks." },
      { title: "Subscription Billing Bugs", desc: "Clunky manual invoice chasing or poorly handled webhook failures causing accidental customer cancellations." }
    ],
    capabilities: [
      { title: "Rapid SaaS MVP Scoping", desc: "Defining and engineering the core value proposition in focused 3 to 6-week development sprints." },
      { title: "Multi-Tenant Database Isolation", desc: "Secure data separation ensuring customers never see or modify records belonging to other accounts." },
      { title: "Subscription Billing & Webhooks", desc: "Stripe and Razorpay subscription workflows with automated pro-rating, upgrades, and receipts." },
      { title: "Role-Based Team Permissions", desc: "Granular access controls allowing account owners to invite team members with specific rights." },
      { title: "Customer Onboarding Workflows", desc: "Frictionless signup flows, password resets, email verification, and guided product tours." },
      { title: "Founder Analytics Telemetry", desc: "Built-in metrics tracking monthly recurring revenue (MRR), active accounts, and user churn." }
    ],
    faqs: [
      { q: "How fast can you build a working SaaS MVP?", a: "Depending on feature complexity, we build and deploy production-ready SaaS MVPs within 3 to 6 weeks, allowing founders to validate real market demand swiftly." },
      { q: "How do you handle subscription renewals and cancellations?", a: "We engineer webhook listeners that catch billing events from Stripe or Razorpay, updating user access rights and sending payment confirmations automatically." },
      { q: "Who owns the intellectual property and code?", a: "You own 100% of the code, intellectual property, and database architecture from day one. There is zero vendor lock-in." },
      { q: "Can the SaaS application scale to thousands of users?", a: "Yes. By building on serverless cloud architecture with distributed edge SQL databases, the application scales horizontally without expensive server reconfigurations." }
    ],
    relatedServices: [
      { title: "Custom Software Development", desc: "Modular software architecture and relational database design.", url: "/services/software-development" },
      { title: "UI/UX Design & Prototyping", desc: "Design intuitive user dashboards and onboarding flows.", url: "/services/ui-ux-design" },
      { title: "Cloud Computing & Architecture", desc: "Resilient serverless infrastructure for SaaS platforms.", url: "/services/cloud-computing" }
    ]
  },

  // 12. API Integration
  {
    slug: "api-integration",
    name: "API Integration",
    serviceParamName: "API Integration",
    title: "API Integration & Connected Systems | ABSS Nexus Technologies",
    metaDescription: "Secure RESTful API integration and webhook engineering by ABSS Nexus Technologies. Connecting disparate business software, CRM tools, and payment gateways with speed.",
    badge: "Connected Systems &bull; RESTful Architecture",
    headline: "Seamless RESTful API Integration & Connected Business Systems",
    description: "Connect your digital tools into a unified, automated ecosystem. ABSS Nexus Technologies engineers secure API bridges, webhook handlers, and third-party integrations connecting your website to CRMs, payment providers, and communication channels.",
    techStack: ["RESTful APIs", "Webhooks", "JSON Payloads", "Cloudflare Workers", "Node.js", "Authentication"],
    visualHtml: `
      <div class="schematic-diagram">
        <div class="schematic-node">
          <span>Third-Party Tool (CRM / Payment)</span>
          <span class="node-badge">External API</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>Secure Webhook Gateway</span>
          <span class="node-badge">Verified Signature</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>ABSS Nexus System Backend</span>
          <span class="node-badge">200 OK</span>
        </div>
      </div>`,
    problems: [
      { title: "Disconnected Business Tools", desc: "Manually re-entering data between your website, CRM, billing tool, and spreadsheet creates daily errors." },
      { title: "Unreliable Webhook Failures", desc: "Third-party payment or lead notifications getting dropped due to fragile unmonitored webhook code." },
      { title: "Lack of API Documentation", desc: "Struggling to connect legacy software with modern web platforms due to missing API specifications." }
    ],
    capabilities: [
      { title: "Custom RESTful Endpoint Design", desc: "Clean JSON APIs adhering to industry standards with clear status codes and validation." },
      { title: "Secure Webhook Receivers", desc: "Idempotent webhook handlers with cryptographic signature verification preventing replay attacks." },
      { title: "Third-Party CRM Integration", desc: "Instant synchronization of website inquiries into HubSpot, Zoho, Google Sheets, or custom CRMs." },
      { title: "Payment & Billing Gateways", desc: "Connecting Razorpay, Stripe, or PayPal with instant transactional database updates." },
      { title: "WhatsApp & SMS Automation", desc: "Triggering automated confirmation messages and lead alerts via official messaging APIs." },
      { title: "API Health Monitoring & Retries", desc: "Automated retry logic and error logging ensuring temporary network drops never lose data." }
    ],
    faqs: [
      { q: "What third-party services can you integrate?", a: "We integrate CRMs (Zoho, HubSpot, Salesforce), payment gateways (Razorpay, Stripe, PayPal), communication APIs (WhatsApp, Twilio, SendGrid), and custom REST APIs." },
      { q: "How do you protect webhook endpoints from forged requests?", a: "We implement cryptographic HMAC signature verification on all incoming webhook payloads to confirm they originate genuinely from the verified provider." },
      { q: "Can you connect an old legacy database to a modern website?", a: "Yes. We engineer lightweight API bridges that safely query legacy databases and expose secure REST endpoints for your modern web applications." },
      { q: "What happens if an external API goes down temporarily?", a: "Our architecture includes automated exponential backoff retry queues and alert notifications to ensure transactions are reprocessed once connectivity recovers." }
    ],
    relatedServices: [
      { title: "Custom Software Development", desc: "Build tailored systems connected via secure internal APIs.", url: "/services/software-development" },
      { title: "Cloud Computing & Architecture", desc: "Host API endpoints on resilient serverless edge infrastructure.", url: "/services/cloud-computing" },
      { title: "Cybersecurity & Hardening", desc: "Protect API endpoints from unauthorized access and brute force.", url: "/services/cybersecurity" }
    ]
  },

  // 13. Software Testing & Quality Assurance
  {
    slug: "software-testing-qa",
    name: "Software Testing & QA",
    serviceParamName: "Quality Assurance",
    title: "Software Testing & QA Services | ABSS Nexus Technologies",
    metaDescription: "Quality assurance and automated software testing by ABSS Nexus Technologies. Cross-browser validation, link health tests, form validation, and regression test suites.",
    badge: "Quality Assurance &bull; Automated Audits",
    headline: "Rigorous Software Testing, Link Auditing & Quality Assurance",
    description: "Deliver zero-defect digital experiences. ABSS Nexus Technologies conducts comprehensive automated and manual testing covering cross-browser rendering, broken link detection, form validation stress tests, and regression prevention.",
    techStack: ["Automated Validation", "Cross-Browser Testing", "Link Auditing", "Syntax Verification", "WCAG Testing", "CI/CD Gates"],
    visualHtml: `
      <div style="background: var(--color-white); border: 1px solid var(--color-border); border-radius: 12px; padding: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--color-near-black);">Automated QA Test Suite</span>
          <span style="font-size: 10px; background: rgba(52,199,89,0.1); color: #34c759; padding: 2px 8px; border-radius: 980px; font-weight: 600;">100% Passed</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--color-near-black); background: var(--color-light-gray); padding: 6px 10px; border-radius: 4px;">
            <span>Local Link Integrity Check</span>
            <span style="color: #34c759; font-weight: 700;">PASS (0 Broken)</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--color-near-black); background: var(--color-light-gray); padding: 6px 10px; border-radius: 4px;">
            <span>CSS Syntax &amp; Brace Audit</span>
            <span style="color: #34c759; font-weight: 700;">PASS (0 Errors)</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--color-near-black); background: var(--color-light-gray); padding: 6px 10px; border-radius: 4px;">
            <span>Canonical &amp; Metadata Verification</span>
            <span style="color: #34c759; font-weight: 700;">PASS (100% Valid)</span>
          </div>
        </div>
      </div>`,
    problems: [
      { title: "Bugs Reaching Live Production", desc: "Finding out a critical form or button is broken only after angry customers complain or leads disappear." },
      { title: "Broken Links Damaging SEO", desc: "Dead internal links or missing anchor tags causing 404 errors that penalize search engine rankings." },
      { title: "Mobile Layout Disasters", desc: "Webpages that look acceptable on developers' wide screens but break or cause horizontal scroll on real phones." }
    ],
    capabilities: [
      { title: "Automated Link Integrity Testing", desc: "Automated scripts crawling all internal links and anchor hashes to ensure zero broken references." },
      { title: "Cross-Device & Browser Audits", desc: "Verifying pixel alignment and functionality across Chrome, Safari, Firefox, Edge, and iOS/Android." },
      { title: "Form Validation & Stress Testing", desc: "Testing edge cases: special characters, missing inputs, network drops, and honeypot traps." },
      { title: "Syntax & Brace Integrity Checks", desc: "Continuous automated audits ensuring no unclosed tags or syntax bugs slip into production bundles." },
      { title: "Accessibility (WCAG) Verification", desc: "Checking color contrast ratios, screen reader compatibility, and keyboard tab order navigation." },
      { title: "Pre-Deployment Regression Gates", desc: "Blocking production deployment automatically if any critical audit or test script fails." }
    ],
    faqs: [
      { q: "What is an automated regression test?", a: "Regression testing automatically verifies that new code edits or feature additions have not inadvertently broken existing working features or created dead links." },
      { q: "Do you test on real mobile hardware?", a: "Yes. We test interfaces on actual physical smartphones and tablets in addition to desktop browsers to verify touch gestures and scroll physics." },
      { q: "Can you audit our existing website for errors?", a: "Yes. We perform thorough quality assurance audits uncovering broken links, slow resources, form submission bugs, and SEO metadata issues." },
      { q: "How does testing prevent lost sales leads?", a: "By testing every inquiry form with automated simulated inputs and network drop simulations, we ensure lead pipelines operate reliably 24/7." }
    ],
    relatedServices: [
      { title: "Website Maintenance & Support", desc: "Ongoing monthly automated testing and link monitoring.", url: "/services/website-maintenance" },
      { title: "Website Development", desc: "Websites engineered and tested with zero broken links.", url: "/services/website-development" },
      { title: "Cybersecurity & Hardening", desc: "Security vulnerability testing and input sanitation.", url: "/services/cybersecurity" }
    ]
  },

  // 14. IT Consulting & Digital Transformation
  {
    slug: "it-consulting",
    name: "IT Consulting",
    serviceParamName: "IT Consulting",
    title: "IT Consulting & Digital Strategy | ABSS Nexus Technologies",
    metaDescription: "Strategic IT consulting and digital transformation by ABSS Nexus Technologies. Pragmatic software architecture evaluation, technology roadmaps, and agile execution.",
    badge: "Strategic Advisory &bull; Pragmatic Execution",
    headline: "Pragmatic IT Consulting & Strategic Digital Transformation",
    description: "Make confident technology decisions. ABSS Nexus Technologies provides direct, founder-led IT consulting: evaluating software architectures, defining cost-effective technology roadmaps, and guiding smooth digital modernization.",
    techStack: ["Technology Roadmaps", "Architecture Audits", "Stack Evaluation", "Cost Optimization", "Agile Execution", "SLA Strategy"],
    visualHtml: `
      <div class="schematic-diagram">
        <div class="schematic-node">
          <span>1. Operational Assessment</span>
          <span class="node-badge">Discovery</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>2. Architecture Blueprint</span>
          <span class="node-badge">Roadmap</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>3. Milestone Implementation</span>
          <span class="node-badge">Execution</span>
        </div>
        <div class="schematic-connector"></div>
        <div class="schematic-node">
          <span>4. Continuous Optimization</span>
          <span class="node-badge">Measured ROI</span>
        </div>
      </div>`,
    problems: [
      { title: "Overspending on Bloated Enterprise Tech", desc: "Paying tens of thousands for complex software suites when lean, targeted tools solve the problem better." },
      { title: "Unclear Project Roadmaps", desc: "Embarking on digital development projects without clear milestones, leading to blown budgets and missed deadlines." },
      { title: "Paralysis Over Tech Choices", desc: "Confusion over frameworks, hosting providers, databases, and vendors stalling vital business modernization." }
    ],
    capabilities: [
      { title: "Software Architecture Evaluation", desc: "Impartial review of your current tech stack identifying security vulnerabilities and cost inefficiencies." },
      { title: "Milestone-Based Technology Roadmaps", desc: "Structured phased delivery roadmaps prioritizing high-ROI features first." },
      { title: "Cloud Hosting Cost Reduction", desc: "Auditing cloud infrastructure to eliminate over-provisioned servers and slash monthly hosting bills." },
      { title: "Direct Founder-Led Consulting", desc: "Direct guidance from experienced software architects without layers of non-technical account managers." },
      { title: "Legacy System Modernization", desc: "Safely transitioning mission-critical operations from aging tools to modern web architecture." },
      { title: "Vendor & Tool Selection Advisory", desc: "Objective recommendations on third-party APIs, payment gateways, and software partnerships." }
    ],
    faqs: [
      { q: "How is ABSS Nexus Technologies consulting different from big agencies?", a: "We provide practical, founder-led engineering advice. We don't push bloated buzzwords or sell you systems you don't need; we recommend the simplest, fastest path to your goal." },
      { q: "Can you help us evaluate quotes from other software vendors?", a: "Yes. We review technical proposals, scopes of work, and architectures to verify whether pricing is fair and technical approaches are sound." },
      { q: "Do you assist during actual project implementation?", a: "Yes. In addition to strategy, our engineering team can execute the roadmap or oversee development milestones directly." },
      { q: "What size businesses do you consult for?", a: "We advise startups, small-to-medium businesses, educational institutions, and growing local enterprises seeking clear digital direction." }
    ],
    relatedServices: [
      { title: "Custom Software Development", desc: "Turn strategic architectural roadmaps into working software.", url: "/services/software-development" },
      { title: "Cloud Computing & Architecture", desc: "Migrate legacy systems to cost-effective serverless cloud.", url: "/services/cloud-computing" },
      { title: "Website Maintenance & Support", desc: "Long-term operational support and technical governance.", url: "/services/website-maintenance" }
    ]
  },

  // 15. Managed IT Support & Maintenance
  {
    slug: "website-maintenance",
    name: "Website Maintenance",
    serviceParamName: "Website Maintenance",
    title: "Managed IT Support & Maintenance | ABSS Nexus Technologies",
    metaDescription: "Proactive website maintenance and managed IT support by ABSS Nexus Technologies. Routine health checks, uptime monitoring, security patching, and fast content updates.",
    badge: "Proactive Care &bull; Managed IT Support",
    headline: "Proactive Website Maintenance & Managed Technical Support",
    description: "Keep your digital presence fast, secure, and always operational. ABSS Nexus Technologies delivers dedicated monthly maintenance: automated uptime monitoring, link health validation, security patches, and swift content updates.",
    techStack: ["Uptime Monitoring", "Automated Link Checks", "Security Patching", "SSL Verification", "Content Updates", "Priority Support"],
    visualHtml: `
      <div style="background: var(--color-white); border: 1px solid var(--color-border); border-radius: 12px; padding: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--color-near-black);">Managed Support Telemetry</span>
          <span style="font-size: 10px; color: #34c759; font-weight: 600;">&bull; Active SLA</span>
        </div>
        <div style="background: var(--color-light-gray); border-radius: 8px; padding: 10px; margin-bottom: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div>
            <div style="font-size: 9px; color: var(--color-secondary-text);">Monthly Uptime</div>
            <div style="font-size: 14px; font-weight: 700; color: #34c759;">99.98%</div>
          </div>
          <div>
            <div style="font-size: 9px; color: var(--color-secondary-text);">Link Health</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--color-blue);">100% OK</div>
          </div>
        </div>
        <div style="font-size: 10px; color: var(--color-secondary-text); text-align: center; margin-top: 6px;">
          Automated hourly health pings &bull; SSL Active
        </div>
      </div>`,
    problems: [
      { title: "Websites Abandoned After Launch", desc: "Websites launched and forgotten until sudden broken forms, expired domains, or broken links lose revenue." },
      { title: "Slow Turnaround for Simple Edits", desc: "Waiting weeks for old freelancers to update phone numbers, pricing packages, or team photos." },
      { title: "Security Vulnerabilities from Neglect", desc: "Unpatched dependencies and expired SSL certificates triggering browser security warnings to visitors." }
    ],
    capabilities: [
      { title: "Automated Uptime Monitoring", desc: "Automated pings checking site availability around the clock with instant emergency notifications." },
      { title: "Routine Link Health Audits", desc: "Regular scans detecting broken internal links, missing images, and dead anchor targets." },
      { title: "Swift Content & Price Updates", desc: "Fast execution of copy adjustments, team changes, pricing updates, and new blog posts." },
      { title: "Form Submission Verification", desc: "Periodic test submissions ensuring contact forms and WhatsApp paths receive leads cleanly." },
      { title: "SSL & Domain Expiry Protection", desc: "Proactive tracking of security certificate renewals and domain name expiration dates." },
      { title: "Priority Technical Support", desc: "Direct founder contact via WhatsApp and email for urgent troubleshooting requests." }
    ],
    faqs: [
      { q: "What is included in a monthly website maintenance package?", a: "Monthly maintenance covers regular link health checks, form validation testing, uptime monitoring, security updates, and priority content updates." },
      { q: "How quickly do you complete content updates?", a: "Routine text, image, or pricing adjustments are typically completed within 24 to 48 business hours upon request." },
      { q: "Can you maintain a website built by another company?", a: "Yes. We perform an initial code audit to resolve existing bugs, optimize loading speeds, and onboard the site to our proactive monitoring system." },
      { q: "Is there a long-term contract lock-in?", a: "No. Our maintenance agreements operate on transparent monthly milestones with no punitive cancellation penalties." }
    ],
    relatedServices: [
      { title: "Website Development", desc: "Bespoke high-performance web engineering.", url: "/services/website-development" },
      { title: "Cybersecurity & Hardening", desc: "Proactive defense against malware and brute force attacks.", url: "/services/cybersecurity" },
      { title: "Software Testing & QA", desc: "Automated regression testing and link integrity audits.", url: "/services/software-testing-qa" }
    ]
  }
];

// Generate All 15 Service Pages
servicesData.forEach((service) => {
  const fileName = `service-${service.slug}.html`;
  const filePath = path.join(pagesDir, fileName);
  const html = generateServicePage(service);
  fs.writeFileSync(filePath, html, "utf8");
  console.log(`Generated: src/pages/${fileName}`);
});

console.log("All 15 service pages successfully generated!");
