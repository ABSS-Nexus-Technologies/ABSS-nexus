export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'Web Engineering' | 'Software & Cloud' | 'Data, QA & Support';
  badge: string;
  shortDesc: string;
  fullDesc: string;
  timeline: string;
  icon: string;
  features: string[];
  technologies: string[];
  challenges: { title: string; desc: string }[];
  deliverables: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'website-development',
    slug: 'website-development',
    title: 'Custom Website Development',
    category: 'Web Engineering',
    badge: 'Flagship • ⏱ 5-10 Days',
    shortDesc: 'High-speed business & corporate platforms built with clean architecture and modern edge rendering.',
    fullDesc: 'From bespoke multi-page corporate websites to high-speed marketing platforms, ABSS Nexus Technologies engineers tailored web applications built with clean semantic code, accessible contrast, and high-conversion pathways.',
    timeline: '5-10 Days',
    icon: 'code',
    features: ['Responsive Layouts', 'API Integrations', 'Edge Performance', 'SEO Architecture'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Core Web Vitals'],
    challenges: [
      { title: 'Slow Loading & Poor Core Web Vitals', desc: 'Outdated websites lose up to 40% of potential leads due to sub-optimal mobile loading speeds and heavy render blocking assets.' },
      { title: 'Inconsistent Mobile Experience', desc: 'Websites that fail to adapt smoothly to modern smartphones produce high bounce rates and hurt organic search rank.' },
      { title: 'Lack of Scalable Architecture', desc: 'Monolithic templates break as business offerings expand or traffic spikes occur.' }
    ],
    deliverables: ['Responsive multi-page platform', 'Sub-second edge loading architecture', 'Full SEO metadata & schema markup', 'Direct CMS or database integration', 'Interactive contact workflows']
  },
  {
    id: 'software-development',
    slug: 'software-development',
    title: 'Custom Software Development',
    category: 'Software & Cloud',
    badge: 'Full Stack • Scalable',
    shortDesc: 'Custom business management platforms, admin dashboards, and internal workflow software.',
    fullDesc: 'Custom business management platforms, real-time analytics portals, and intuitive admin dashboards engineered for data-heavy workflows and operational velocity.',
    timeline: '2-4 Weeks',
    icon: 'layers',
    features: ['Telemetry & Data', 'Cloud D1 Storage', 'Role Auth', 'Speed Benchmarks'],
    technologies: ['TypeScript', 'Node.js', 'Cloudflare Workers', 'PostgreSQL / D1', 'Tailwind CSS', 'REST / GraphQL'],
    challenges: [
      { title: 'Fragmented Internal Tools', desc: 'Running operations across disjointed spreadsheets creates data silos and human entry errors.' },
      { title: 'Inflexible Off-the-Shelf SaaS', desc: 'Standard subscription software forces businesses to change their workflows to fit rigid software constraints.' },
      { title: 'Security & Access Control Gaps', desc: 'Lack of granular role-based permissions leaves sensitive customer and financial records vulnerable.' }
    ],
    deliverables: ['Custom administrative control hub', 'Role-based access permissions', 'Automated queue and task handlers', 'Real-time telemetry dashboards', 'Comprehensive developer documentation']
  },
  {
    id: 'mobile-app-development',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    category: 'Software & Cloud',
    badge: 'Mobile • iOS & Android',
    shortDesc: 'Cross-platform iOS and Android mobile solutions with native feel and real-time synchronization.',
    fullDesc: 'High-performance mobile applications engineered with responsive native-feel interfaces, reliable offline caching, and real-time backend synchronization.',
    timeline: '3-6 Weeks',
    icon: 'smartphone',
    features: ['Cross-Platform', 'Offline Sync', 'Native Feel', 'Push Alerts'],
    technologies: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'REST APIs', 'WebSockets'],
    challenges: [
      { title: 'High Double-Development Costs', desc: 'Building separate iOS and Android native codebases doubles engineering, QA, and maintenance costs.' },
      { title: 'Poor Offline Resilience', desc: 'Apps that crash or show blank screens without stable internet lose user trust immediately.' },
      { title: 'Cumbersome App Store Submissions', desc: 'Navigating Apple and Google review guidelines without experienced oversight causes prolonged delays.' }
    ],
    deliverables: ['Production-ready iOS and Android binaries', 'Offline-first SQLite/waterfall cache', 'Push notification pipeline', 'App Store and Play Store compliance setup', 'Live analytics telemetry']
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    title: 'UI/UX Design & Prototyping',
    category: 'Web Engineering',
    badge: 'User Experience • Figma',
    shortDesc: 'Human-centered user journeys, design systems, and high-fidelity Figma prototypes.',
    fullDesc: 'Human-centered user journeys, modular design systems, and interactive Figma prototypes that transform complex operational requirements into elegant, frictionless digital experiences.',
    timeline: '1-2 Weeks',
    icon: 'figma',
    features: ['Wireframing', 'Design Systems', 'User Journeys', 'Figma Handoff'],
    technologies: ['Figma', 'Tokens Studio', 'WCAG 2.1 AA', 'Interactive Prototyping', 'Component Kits'],
    challenges: [
      { title: 'High Abandonment on Complex Forms', desc: 'Unclear visual hierarchy and cluttered user interfaces drive visitors away before completing checkout or inquiries.' },
      { title: 'Inconsistent Brand Representation', desc: 'Incompatible typography, colors, and button styles between web, mobile, and social media erode credibility.' },
      { title: 'Engineering Handoff Confusion', desc: 'Designs without documented component states and responsive break points slow down frontend delivery.' }
    ],
    deliverables: ['Interactive click-through Figma prototype', 'Modular design token system', 'User flow wireframes and site maps', 'Responsive mobile and desktop specifications', 'Accessibility audit compliance checklist']
  },
  {
    id: 'ai-machine-learning',
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning Solutions',
    category: 'Data, QA & Support',
    badge: 'Intelligence • Automation',
    shortDesc: 'Intelligent automation, natural language workflows, and predictive analytics embedded into core apps.',
    fullDesc: 'Custom intelligent workflows, natural language processing, LLM fine-tuning, and predictive analytics embedded directly into your core business applications.',
    timeline: '2-4 Weeks',
    icon: 'cpu',
    features: ['LLM Integration', 'Smart Chatbots', 'Data Prediction', 'Automation'],
    technologies: ['Python', 'OpenAI API', 'LangChain', 'LlamaIndex', 'TensorFlow', 'Vector Databases'],
    challenges: [
      { title: 'Manual Repetitive Operations', desc: 'Knowledge workers spend thousands of hours manually classifying support tickets, summarising documents, and routing messages.' },
      { title: 'Underutilized Enterprise Data', desc: 'Decades of proprietary company documents remain trapped in unstructured PDFs and unsearchable databases.' },
      { title: 'Generic Hallucinatory AI Tools', desc: 'Standard consumer chatbots produce incorrect answers without grounding in company-specific facts.' }
    ],
    deliverables: ['Custom RAG (Retrieval-Augmented Generation) pipeline', 'Domain-specific intelligent chatbot agent', 'Document classification and extraction service', 'Predictive modeling algorithms', 'Secure API gateway with token controls']
  },
  {
    id: 'cloud-computing',
    slug: 'cloud-computing',
    title: 'Cloud Computing & DevOps',
    category: 'Software & Cloud',
    badge: 'Infrastructure • CI/CD',
    shortDesc: 'Serverless edge infrastructure, automated CI/CD pipelines, and zero-downtime deployments.',
    fullDesc: 'Enterprise cloud infrastructure design, automated CI/CD deployment pipelines, serverless edge networks, and container orchestration configured for high availability and zero downtime.',
    timeline: '1-3 Weeks',
    icon: 'cloud',
    features: ['Edge Servers', 'CI/CD Pipelines', 'Zero Downtime', 'Cost Optimization'],
    technologies: ['Cloudflare', 'AWS', 'Docker', 'GitHub Actions', 'Terraform', 'Kubernetes'],
    challenges: [
      { title: 'Unreliable Manual Releases', desc: 'Deploying updates via FTP or manual SSH leads to downtime, broken dependencies, and human error.' },
      { title: 'Runaway Cloud Invoices', desc: 'Over-provisioned servers and unoptimized database instances waste substantial monthly budgets.' },
      { title: 'Single Points of Failure', desc: 'Traditional single-server hosting goes offline entirely during hardware incidents or network spikes.' }
    ],
    deliverables: ['Automated multi-stage GitHub Actions CI/CD', 'Serverless edge routing with Cloudflare', 'Docker containerized runtime environments', 'Cloud infrastructure cost audit & reduction', 'Automated backup & disaster recovery runbooks']
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Cybersecurity & Edge Hardening',
    category: 'Data, QA & Support',
    badge: 'Security • Zero Trust',
    shortDesc: 'Comprehensive vulnerability assessments, penetration testing, and edge security hardening.',
    fullDesc: 'Comprehensive vulnerability assessments, penetration testing, edge WAF rule configurations, and zero-trust access policies protecting company systems from modern digital threats.',
    timeline: '1-2 Weeks',
    icon: 'shield-check',
    features: ['Vulnerability Audits', 'WAF Protection', 'DDoS Mitigation', 'Data Isolation'],
    technologies: ['OWASP Top 10', 'Cloudflare WAF', 'SSL/TLS 1.3', 'Zod Input Sanitization', 'Sentry', 'RBAC'],
    challenges: [
      { title: 'Automated Bot & DDoS Attacks', desc: 'Malicious bots scrape content, abuse contact forms, and attempt credential stuffing attacks continuously.' },
      { title: 'Injection & Data Leaks', desc: 'Unsanitized user inputs leave backends vulnerable to SQL injection, XSS, and unauthorized data extraction.' },
      { title: 'Compliance & Audit Failures', desc: 'Missing security headers, unencrypted transmission, and loose storage configurations fail enterprise vendor audits.' }
    ],
    deliverables: ['OWASP-aligned security vulnerability audit', 'Cloudflare WAF and rate limiting rules', 'Strict CSP, HSTS, and XSS response headers', 'Input sanitization and validation layer', 'Incident response and containment protocols']
  },
  {
    id: 'data-analytics-bi',
    slug: 'data-analytics-bi',
    title: 'Data Analytics & Business Intelligence',
    category: 'Data, QA & Support',
    badge: 'BI • Real-Time',
    shortDesc: 'Interactive analytics dashboards, telemetry pipelines, and executive reporting systems.',
    fullDesc: 'Transform raw company records into actionable executive intelligence with custom telemetry pipelines, automated scheduled summaries, and interactive business intelligence dashboards.',
    timeline: '2-3 Weeks',
    icon: 'bar-chart',
    features: ['Interactive Charts', 'Real-Time Telemetry', 'KPI Dashboards', 'Automated Reports'],
    technologies: ['Apache Superset', 'Metabase', 'PostgreSQL', 'Python Pandas', 'Chart.js', 'Cloudflare D1'],
    challenges: [
      { title: 'Delayed Decision Making', desc: 'Waiting until end-of-month accounting to discover sales dips or operational bottlenecks hurts business growth.' },
      { title: 'Unreliable Manual Reporting', desc: 'Compiling reports by copy-pasting numbers between spreadsheets introduces transcription mistakes.' },
      { title: 'Lack of Role-Specific Visibility', desc: 'Executives, sales leaders, and support teams require different views of identical underlying facts.' }
    ],
    deliverables: ['Centralized data warehouse pipeline', 'Custom interactive executive dashboard', 'Automated email / WhatsApp KPI alerts', 'Customer cohort & retention analytics', 'Self-service query interface']
  },
  {
    id: 'ecommerce-development',
    slug: 'ecommerce-development',
    title: 'E-Commerce Storefront Development',
    category: 'Web Engineering',
    badge: 'Retail • High Conversion',
    shortDesc: 'High-converting online storefronts, modern catalogs, and instant payment integrations.',
    fullDesc: 'Engineered for speed and conversions, our e-commerce platforms feature lightweight product grids, frictionless cart checkout paths, and seamless payment gateway integrations.',
    timeline: '2-4 Weeks',
    icon: 'shopping-cart',
    features: ['Product Catalogs', 'Frictionless Cart', 'Payment Gateways', 'Inventory Sync'],
    technologies: ['Next.js', 'Shopify Storefront API', 'Razorpay', 'Stripe', 'Cloudflare D1', 'Tailwind CSS'],
    challenges: [
      { title: 'High Cart Abandonment', desc: 'Clunky multi-step checkouts and slow loading product pages cause up to 70% of potential buyers to drop off.' },
      { title: 'Payment Gateway Dropouts', desc: 'Failed transactions and unclear status callbacks result in lost sales and frustrated shoppers.' },
      { title: 'Inventory Discrepancies', desc: 'Selling out-of-stock items due to un-synchronized inventory destroys customer trust.' }
    ],
    deliverables: ['Custom headless e-commerce storefront', 'Razorpay and Stripe webhook integrations', 'Mobile-first cart and instant checkout', 'Automated order receipt and invoice generator', 'Inventory tracking and low-stock alerts']
  },
  {
    id: 'saas-development',
    slug: 'saas-development',
    title: 'SaaS Platform Development',
    category: 'Software & Cloud',
    badge: 'SaaS • Multi-Tenant',
    shortDesc: 'Scalable subscription platforms, multi-tenant databases, and self-serve client portals.',
    fullDesc: 'End-to-end architecture and engineering for modern software-as-a-service applications, including multi-tenant databases, subscription billing tiers, and administrative controls.',
    timeline: '4-8 Weeks',
    icon: 'box',
    features: ['Multi-Tenancy', 'Subscription Billing', 'Onboarding Flows', 'API Ecosystem'],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe Billing', 'Redis'],
    challenges: [
      { title: 'Complex Multi-Tenant Isolation', desc: 'Ensuring that customer data never bleeds across organizational boundaries requires rigorous data architecture.' },
      { title: 'Subscription Lifecycle Logic', desc: 'Handling upgrades, downgrades, failed renewals, and grace periods is difficult to implement reliably.' },
      { title: 'Scaling Beyond Initial Capacity', desc: 'Architectures that work for 100 users often degrade rapidly when 10,000 active sessions connect.' }
    ],
    deliverables: ['Multi-tenant partitioned database architecture', 'Subscription billing and invoice automation', 'Self-service team onboarding and invitation flow', 'Granular audit logs and usage telemetry', 'Public developer API and webhook delivery system']
  },
  {
    id: 'api-integration',
    slug: 'api-integration',
    title: 'API Integration & Middleware Engineering',
    category: 'Software & Cloud',
    badge: 'APIs • Connectivity',
    shortDesc: 'Secure RESTful and GraphQL bridges connecting CRMs, payment processors, and ERPs.',
    fullDesc: 'Connect third-party enterprise tools, CRMs, logistics systems, and payment gateways into unified, automated workflows with resilient middleware and guaranteed delivery.',
    timeline: '1-2 Weeks',
    icon: 'git-merge',
    features: ['REST & GraphQL', 'Webhook Handlers', 'Retry Queues', 'Data Normalization'],
    technologies: ['Node.js', 'TypeScript', 'Cloudflare Workers', 'Redis / Upstash', 'REST', 'WebSockets'],
    challenges: [
      { title: 'Fragmented Third-Party Services', desc: 'Operating between CRM, ERP, and payment platforms manually wastes dozens of hours weekly.' },
      { title: 'Lost Webhooks & Duplicate Events', desc: 'Unreliable endpoint receivers drop payment confirmations or process customer orders multiple times.' },
      { title: 'Rate Limiting & Throttling', desc: 'Spikes in volume crash integrations when upstream API rate limits are exceeded without queuing.' }
    ],
    deliverables: ['Resilient middleware bridge with retry queues', 'Idempotent webhook processing endpoints', 'Data payload transformation and validation', 'Comprehensive API monitoring and alerting', 'Swagger / OpenAPI 3.0 documentation']
  },
  {
    id: 'digital-marketing-seo',
    slug: 'digital-marketing-seo',
    title: 'Digital Marketing & Technical SEO',
    category: 'Web Engineering',
    badge: 'Growth • Organic Visibility',
    shortDesc: 'Technical SEO audits, semantic schema markup, and organic search ranking acceleration.',
    fullDesc: 'Drive high-intent commercial traffic to your platform through technical search engine optimization, automated schema markup, sub-second indexing speeds, and content strategies.',
    timeline: 'Ongoing / 2 Weeks Audit',
    icon: 'trending-up',
    features: ['Technical SEO Audit', 'Schema Markup', 'Core Web Vitals', 'Keyword Strategy'],
    technologies: ['Schema.org JSON-LD', 'Google Search Console', 'Ahrefs', 'Next.js Dynamic Sitemap', 'Robots.txt'],
    challenges: [
      { title: 'Invisible in Local & Global Search', desc: 'Websites without semantic structure and fast load times remain buried past page 3 on Google.' },
      { title: 'High Paid Ads Dependence', desc: 'Relying exclusively on pay-per-click advertising drains marketing budgets without compounding asset value.' },
      { title: 'Broken Canonical & Crawl Errors', desc: 'Duplicate URLs and crawl loops prevent search engines from discovering your high-value pages.' }
    ],
    deliverables: ['Comprehensive technical SEO audit and fix plan', 'Dynamic XML sitemap and automated indexing pipeline', 'Rich snippet JSON-LD structured data implementation', 'Core Web Vitals optimization report', 'Content cluster and keyword targeting blueprint']
  },
  {
    id: 'software-testing-qa',
    slug: 'software-testing-qa',
    title: 'Software Testing & Quality Assurance',
    category: 'Data, QA & Support',
    badge: 'QA • End-to-End',
    shortDesc: 'Automated test suites, cross-browser verification, and performance regression checks.',
    fullDesc: 'Ensure defect-free software deployments with comprehensive testing pipelines, including automated end-to-end tests, unit test suites, load benchmarking, and device compatibility audits.',
    timeline: '1-3 Weeks',
    icon: 'check-circle',
    features: ['End-to-End Testing', 'Regression Audits', 'Load Benchmarks', 'Cross-Device QA'],
    technologies: ['Playwright', 'Jest', 'Vitest', 'k6 Load Testing', 'GitHub Actions', 'Lighthouse CI'],
    challenges: [
      { title: 'Undetected Production Bugs', desc: 'Releasing code without automated test coverage causes critical bugs that frustrate paying customers.' },
      { title: 'Time-Consuming Manual QA', desc: 'Testing every button and form manually before each release delays sprint deadlines by days.' },
      { title: 'Silent Checkout Breakages', desc: 'Changes in third-party scripts can quietly break checkout forms without alerting engineering teams.' }
    ],
    deliverables: ['Automated Playwright end-to-end test suites', 'Continuous integration test runner in GitHub Actions', 'Cross-browser and mobile device verification matrix', 'Load and stress testing performance benchmarks', 'Defect tracking and resolution scorecard']
  },
  {
    id: 'it-consulting',
    slug: 'it-consulting',
    title: 'IT Consulting & Technology Strategy',
    category: 'Data, QA & Support',
    badge: 'Strategy • Architecture',
    shortDesc: 'Technology stack audits, modernization roadmaps, and founder-level technical advisory.',
    fullDesc: 'Make confident engineering decisions with strategic technical advisory. We audit legacy systems, recommend modern cloud architectures, and chart phased delivery roadmaps.',
    timeline: '1-2 Weeks Advisory',
    icon: 'compass',
    features: ['Architecture Audits', 'Stack Selection', 'Cost Forecasting', 'Execution Roadmaps'],
    technologies: ['Cloud Architecture', 'Security Protocols', 'Modern Web Standards', 'Microservices', 'Budget Modeling'],
    challenges: [
      { title: 'Costly Architectural Mistakes', desc: 'Selecting the wrong technology stack early leads to painful, multi-million dollar rewrites later.' },
      { title: 'Vendor Lock-In Traps', desc: 'Proprietary platforms often hike pricing drastically once your business is dependent upon them.' },
      { title: 'Technical Debt Accumulation', desc: 'Quick hacks and unstructured codebases eventually grind engineering progress to a halt.' }
    ],
    deliverables: ['Full technology stack audit and risk assessment', 'Target-state architecture blueprint', 'Phased modernization roadmap with budget estimates', 'Vendor evaluation and anti-lock-in guidelines', 'Bi-weekly strategic founder advisory sessions']
  },
  {
    id: 'website-maintenance',
    slug: 'website-maintenance',
    title: 'Website Maintenance & Security Patching',
    category: 'Web Engineering',
    badge: 'Maintenance • Proactive',
    shortDesc: 'Proactive updates, daily backups, vulnerability patching, and uptime monitoring.',
    fullDesc: 'Keep your web properties secure, updated, and lightning-fast around the clock with our managed maintenance plans covering dependency updates, daily backups, and emergency fixes.',
    timeline: 'Monthly SLA',
    icon: 'tool',
    features: ['Daily Backups', 'Security Patches', 'Speed Audits', 'Emergency Fixes'],
    technologies: ['Automated Backups', 'Cloudflare Edge', 'Sentry Monitoring', 'Dependency Bots', 'SSL Renewal'],
    challenges: [
      { title: 'Silent Outages & Lost Leads', desc: 'Websites that go down over weekends or holidays lose valuable customer inquiries unnoticed.' },
      { title: 'Outdated Vulnerable Dependencies', desc: 'Unpatched packages and expired SSL certificates create easy attack vectors for bad actors.' },
      { title: 'Gradual Speed Degradation', desc: 'Unoptimized images and accumulated scripts slow down site speed over time without routine audits.' }
    ],
    deliverables: ['24/7 uptime monitoring with 15-minute response', 'Automated daily cloud backups and verification', 'Bi-weekly security and dependency patch releases', 'Monthly performance scorecard and Core Web Vitals audit', 'Dedicated engineering hours for content and feature updates']
  },
  {
    id: 'managed-it-support',
    slug: 'managed-it-support',
    title: 'Managed IT Support & Infrastructure Services',
    category: 'Data, QA & Support',
    badge: 'Support • 24/7 SLA',
    shortDesc: '24/7 technical monitoring, infrastructure management, and dedicated engineering support.',
    fullDesc: 'Continuous cloud infrastructure monitoring, rapid incident response SLAs, multi-cloud server patching, and dedicated engineering support for mission-critical operations.',
    timeline: 'Ongoing SLA',
    icon: 'headphones',
    features: ['24/7 Monitoring', 'Incident Response SLA', 'Security Patches', 'Dedicated Engineers'],
    technologies: ['Cloudflare Enterprise', 'AWS CloudWatch', 'PagerDuty', 'Linux / Docker', 'Zero Trust Access'],
    challenges: [
      { title: 'Lack of Internal DevOps Staff', desc: 'Hiring full-time cloud and security engineers for 24/7 coverage is cost-prohibitive for growing businesses.' },
      { title: 'Slow Incident Resolution', desc: 'When outages occur, waiting hours for junior support staff results in severe commercial losses.' },
      { title: 'Inconsistent System Telemetry', desc: 'Operating without centralized server logs leaves teams blind to growing bottlenecks before crashes occur.' }
    ],
    deliverables: ['Guaranteed SLA incident response times', 'Centralized telemetry and server health dashboards', 'Multi-cloud automated failover configuration', 'Quarterly disaster recovery drill verification', 'Dedicated Slack / WhatsApp engineering hotline']
  }
];

export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  return servicesData.find((s) => s.slug === slug);
};
