export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  serviceSlug: string;
  serviceName: string;
  category: 'website' | 'webapp' | 'ecommerce' | 'mobile' | 'cloud' | 'security' | 'ai' | 'analytics';
  categoryLabel: string;
  badge: string;
  featured?: boolean;
  urlPreview: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  client: string;
  impactMetrics: { label: string; value: string }[];
  technologies: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  overview: string;
  problem: string;
  solution: string;
  keyOutcomes: string[];
}

export const portfolioData: ProjectItem[] = [
  // =========================================================================
  // 1. CUSTOM WEBSITE DEVELOPMENT (website-development)
  // =========================================================================
  {
    id: 'personal-portfolio',
    slug: 'personal-portfolio',
    title: 'Personal Portfolio & Engineering Showcase Platform',
    serviceSlug: 'website-development',
    serviceName: 'Custom Website Development',
    category: 'website',
    categoryLabel: 'Portfolio • Live',
    badge: 'Production Live',
    featured: true,
    urlPreview: 'shubham-portfolio-abss.netlify.app',
    image: '/assets/images/projects/personal-portfolio.svg',
    shortDesc: 'Modern responsive developer and designer portfolio with interactive project showcases, sleek layouts, and sub-second page transitions.',
    fullDesc: 'Modern responsive developer and designer portfolio with interactive project showcases, sleek layouts, and sub-second page transitions.',
    client: 'Founder Portfolio Showcase',
    impactMetrics: [
      { label: 'PageSpeed Score', value: '100/100' },
      { label: 'Load Time', value: '<350ms' },
      { label: 'Conversion Lift', value: '+35%' }
    ],
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'Netlify Edge'],
    liveUrl: 'https://shubham-portfolio-abss.netlify.app/',
    caseStudyUrl: '/work/personal-portfolio',
    overview: 'Engineered a sleek, responsive portfolio platform tailored to demonstrate technical depth and aesthetic precision across desktop and handheld screens.',
    problem: 'Standard developer templates were sluggish, loaded dozens of bloated third-party trackers, and failed to communicate multi-disciplinary engineering skills.',
    solution: 'Designed and coded a bespoke, zero-dependency layout featuring micro-interactions, dark mode elegance, and ultra-fast mobile rendering.',
    keyOutcomes: [
      'Zero layout shift (CLS 0.00)',
      'Sub-second First Contentful Paint globally',
      'Seamless multi-device accessibility compliance'
    ]
  },
  {
    id: 'global-freight-corporate-portal',
    slug: 'global-freight-corporate-portal',
    title: 'Nexus Global Freight & Logistics Corporate Portal',
    serviceSlug: 'website-development',
    serviceName: 'Custom Website Development',
    category: 'website',
    categoryLabel: 'Corporate Web • Live',
    badge: 'Enterprise Deployment',
    urlPreview: 'nexus-logistics.abssnexus.in',
    image: '/assets/images/projects/global-freight.svg',
    shortDesc: 'High-speed multilingual enterprise portal featuring live consignment tracking, dynamic volume shipping quote calculators, and automated lead capture.',
    fullDesc: 'High-speed multilingual enterprise portal featuring live consignment tracking, dynamic volume shipping quote calculators, and automated lead capture.',
    client: 'Nexus Worldwide Freight & Logistics Corp',
    impactMetrics: [
      { label: 'Inquiry Rate', value: '+68%' },
      { label: 'Global CDN Speed', value: '180ms' },
      { label: 'Bounce Rate', value: '-44%' }
    ],
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Cloudflare Edge', 'REST APIs'],
    caseStudyUrl: '/work/global-freight-corporate-portal',
    overview: 'Architected a flagship corporate platform for an international freight forwarding brand handling 180+ global shipping routes.',
    problem: 'The legacy corporate website took over 6 seconds to load internationally, lacked mobile container tracking, and dropped dozens of quote requests daily.',
    solution: 'Built an edge-rendered Next.js web application with localized currency conversion, container tracking widgets, and direct CRM quote routing.',
    keyOutcomes: [
      '68% increase in inbound sea/air freight quote inquiries',
      'Average international TTFB under 180ms via Cloudflare edge routing',
      '100% mobile-optimized container status tracking'
    ]
  },

  // =========================================================================
  // 2. CUSTOM SOFTWARE DEVELOPMENT (software-development)
  // =========================================================================
  {
    id: 'cloud-analytics-dashboard',
    slug: 'cloud-analytics-dashboard',
    title: 'Cloud Analytics & Internal Operations Control Hub',
    serviceSlug: 'software-development',
    serviceName: 'Custom Software Development',
    category: 'webapp',
    categoryLabel: 'Custom Software • Demo',
    badge: 'Enterprise Platform',
    featured: true,
    urlPreview: 'abssnexus.in/analytics/dashboard',
    image: '/assets/images/projects/cloud-analytics.svg',
    shortDesc: 'Enterprise administration panel featuring metrics telemetry, user management, interactive chart widgets, and real-time database synchronization.',
    fullDesc: 'Enterprise administration panel featuring metrics telemetry, user management, interactive chart widgets, and real-time database synchronization.',
    client: 'FinEdge Labs & Enterprise Internal Tools',
    impactMetrics: [
      { label: 'Query Latency', value: '<45ms' },
      { label: 'Admin Velocity', value: '3.2x faster' },
      { label: 'Uptime SLA', value: '99.98%' }
    ],
    technologies: ['TypeScript', 'Node.js', 'Cloudflare D1', 'Tailwind CSS', 'Chart.js'],
    caseStudyUrl: '/work/cloud-analytics-dashboard',
    overview: 'Built a consolidated operations control center for SaaS founders needing real-time visibility into revenue, user activations, and queue health.',
    problem: 'Disjointed operational spreadsheets caused data staleness and prevented fast incident identification.',
    solution: 'Architected a modular edge-hosted dashboard integrating relational databases with reactive charting components and granular role access controls.',
    keyOutcomes: [
      'Consolidated 5 disparate tracking systems into one view',
      'Real-time automated webhook verification',
      'Instant search and filter across 100,000+ records'
    ]
  },
  {
    id: 'warehouse-supply-chain-erp',
    slug: 'warehouse-supply-chain-erp',
    title: 'Multi-Warehouse Supply Chain & Inventory ERP',
    serviceSlug: 'software-development',
    serviceName: 'Custom Software Development',
    category: 'webapp',
    categoryLabel: 'Custom ERP • Production',
    badge: 'Production Enterprise',
    urlPreview: 'erp.apexlogistics-hub.com',
    image: '/assets/images/projects/warehouse-erp.svg',
    shortDesc: 'Custom inventory management system tracking 50,000+ SKUs across 6 distribution hubs with real-time barcode scanning, batch lot verification, and reorder triggers.',
    fullDesc: 'Custom inventory management system tracking 50,000+ SKUs across 6 distribution hubs with real-time barcode scanning, batch lot verification, and automated reorder triggers.',
    client: 'Apex Industrial Distribution & Supply Corp',
    impactMetrics: [
      { label: 'Picking Accuracy', value: '99.8%' },
      { label: 'Stockout Rate', value: '-74%' },
      { label: 'Daily Orders', value: '45,000+' }
    ],
    technologies: ['Node.js', 'PostgreSQL', 'TypeScript', 'PWA Barcode', 'Redis', 'WebSockets'],
    caseStudyUrl: '/work/warehouse-supply-chain-erp',
    overview: 'Engineered an end-to-end cloud ERP replacing fragmented legacy desktop software for a high-velocity industrial hardware distributor.',
    problem: 'Manual inventory counts resulted in frequent stockouts, double-allocated warehouse bins, and delayed pallet dispatch.',
    solution: 'Delivered a reactive web and PWA software system supporting handheld barcode scanners, automated PO generation, and cross-hub inventory transfers.',
    keyOutcomes: [
      'Inventory reconciliation time reduced from 3 days to 45 minutes',
      'Picking and packing errors dropped below 0.2%',
      'Seamless synchronization between 6 regional distribution hubs'
    ]
  },
  {
    id: 'healthcare-telemedicine',
    slug: 'healthcare-telemedicine-platform',
    title: 'Healthcare Telemedicine & Doctor Scheduling Hub',
    serviceSlug: 'software-development',
    serviceName: 'Custom Software Development',
    category: 'webapp',
    categoryLabel: 'Healthcare • HIPAA-Ready',
    badge: 'Enterprise Case Study',
    urlPreview: 'carepulse.abssnexus.in',
    image: '/assets/images/projects/telemedicine-hub.svg',
    shortDesc: 'Encrypted patient consultation platform with real-time doctor availability calendars, automated appointment reminders, and digital prescription archives.',
    fullDesc: 'Encrypted patient consultation platform with real-time doctor availability calendars, automated appointment reminders, and digital prescription archives.',
    client: 'Apex Health Systems & Clinical Practices',
    impactMetrics: [
      { label: 'No-Show Rate', value: '-65%' },
      { label: 'Booking Time', value: '<45 sec' },
      { label: 'Security Grade', value: 'A+' }
    ],
    technologies: ['Next.js 16', 'WebRTC', 'Cloudflare D1', 'Twilio API', 'TypeScript'],
    caseStudyUrl: '/work/healthcare-telemedicine-platform',
    overview: 'Built a compliant, streamlined patient scheduling and teleconsultation platform connecting doctors and patients seamlessly.',
    problem: 'Reception phone lines were overwhelmed with booking calls, resulting in frequent missed appointments and double-bookings.',
    solution: 'Developed an intuitive multi-specialty calendar booking portal with SMS/WhatsApp confirmations and encrypted digital document lockers.',
    keyOutcomes: [
      '65% drop in missed patient appointments',
      'Average booking completed in under 45 seconds',
      'Zero patient data exposure with end-to-end encryption'
    ]
  },

  // =========================================================================
  // 3. MOBILE APP DEVELOPMENT (mobile-app-development)
  // =========================================================================
  {
    id: 'fitpulse-mobile-fitness-app',
    slug: 'fitpulse-mobile-fitness-app',
    title: 'FitPulse - On-Demand Fitness & HIIT Coaching App',
    serviceSlug: 'mobile-app-development',
    serviceName: 'Mobile App Development',
    category: 'mobile',
    categoryLabel: 'Mobile App • iOS & Android',
    badge: 'Production Live',
    featured: true,
    urlPreview: 'fitpulse.app.link',
    image: '/assets/images/projects/fitpulse-mobile.svg',
    shortDesc: 'Cross-platform iOS and Android fitness app featuring offline workout video caching, real-time Bluetooth heart rate monitor synchronization, and recurring subscriptions.',
    fullDesc: 'Cross-platform iOS and Android fitness app featuring offline workout video caching, real-time Bluetooth heart rate monitor synchronization, and recurring subscriptions.',
    client: 'FitPulse Health Technologies Inc',
    impactMetrics: [
      { label: 'App Store Rating', value: '4.8/5' },
      { label: 'Active Users', value: '85,000+' },
      { label: 'Offline Playback', value: '100%' }
    ],
    technologies: ['React Native', 'TypeScript', 'Firebase', 'BLE Heart Rate Sync', 'Stripe Mobile SDK'],
    caseStudyUrl: '/work/fitpulse-mobile-fitness-app',
    overview: 'Developed an on-demand training app allowing fitness enthusiasts to stream 4K workout videos, track biometric heart zones, and compete on social leaderboards.',
    problem: 'High cellular bandwidth usage caused gym streaming buffers, leading to subscription cancellations.',
    solution: 'Implemented encrypted background video caching, smart video pre-fetching, and low-latency Bluetooth Low Energy (BLE) sensor drivers.',
    keyOutcomes: [
      'Achieved a 4.8-star rating across both Apple App Store and Google Play',
      'Zero-buffer workout playback even in underground gym environments',
      'Integrated in-app purchases and subscription renewals with Stripe'
    ]
  },
  {
    id: 'urbanride-fleet-driver-app',
    slug: 'urbanride-fleet-driver-app',
    title: 'UrbanRide - B2B Fleet Dispatch & Driver Telematics App',
    serviceSlug: 'mobile-app-development',
    serviceName: 'Mobile App Development',
    category: 'mobile',
    categoryLabel: 'Mobile App • Logistics',
    badge: 'Commercial Fleet',
    urlPreview: 'driver.urbanride-fleet.io',
    image: '/assets/images/projects/urbanride-driver.svg',
    shortDesc: 'Native-feel mobile dispatch app for 1,200 commercial delivery drivers featuring live GPS routing, offline signature capture for proof-of-delivery, and push alerts.',
    fullDesc: 'Native-feel mobile dispatch app for 1,200 commercial delivery drivers featuring live GPS routing, offline signature capture for proof-of-delivery, and push alerts.',
    client: 'UrbanRide Mobility & Logistics Network',
    impactMetrics: [
      { label: 'Dispatch Latency', value: '<15 sec' },
      { label: 'Driver Adoption', value: '96%' },
      { label: 'Fuel Cost Savings', value: '-18%' }
    ],
    technologies: ['Flutter', 'Dart', 'WebSockets', 'Google Maps SDK', 'SQLite Cache', 'Push Notifications'],
    caseStudyUrl: '/work/urbanride-fleet-driver-app',
    overview: 'Engineered a specialized driver mobile terminal coordinating route sequencing, automated gate clearance, and proof-of-delivery documentation.',
    problem: 'Drivers frequently encountered cellular dead zones in rural distribution corridors, causing lost dispatch status updates and invoice disputes.',
    solution: 'Designed an offline-first SQLite synchronization queue that automatically uploads digital signatures and geocoded timestamps when connection restores.',
    keyOutcomes: [
      '1,200+ active commercial drivers operating daily without data loss',
      '18% fuel reduction through dynamic traffic-aware route optimization',
      'Instant billing generation upon electronic proof-of-delivery capture'
    ]
  },

  // =========================================================================
  // 4. UI/UX DESIGN & PROTOTYPING (ui-ux-design)
  // =========================================================================
  {
    id: 'finflow-wealth-design-system',
    slug: 'finflow-wealth-design-system',
    title: 'FinFlow - Wealth Management & Neobank Design System',
    serviceSlug: 'ui-ux-design',
    serviceName: 'UI/UX Design & Prototyping',
    category: 'website',
    categoryLabel: 'Design System • Figma',
    badge: 'Figma Showcase',
    urlPreview: 'figma.com/@abssnexus/finflow-tokens',
    image: '/assets/images/projects/finflow-tokens.svg',
    shortDesc: 'Comprehensive atomic design system containing 280+ accessible components, interactive micro-animations, and complete dark-mode specifications for investment banking.',
    fullDesc: 'Comprehensive atomic design system containing 280+ accessible components, interactive micro-animations, and complete dark-mode specifications for investment banking.',
    client: 'FinFlow Digital Capital Group',
    impactMetrics: [
      { label: 'Dev Handoff Speed', value: '+55%' },
      { label: 'Accessibility Score', value: '100% WCAG' },
      { label: 'Component Variants', value: '280+' }
    ],
    technologies: ['Figma', 'Tokens Studio', 'WCAG 2.1 AA', 'Interactive Prototyping', 'Component Kit'],
    caseStudyUrl: '/work/finflow-wealth-design-system',
    overview: 'Created an institutional-grade design system standardizing typography, interactive states, charting colors, and responsive layouts across 4 wealth management products.',
    problem: 'Three separate product engineering teams used conflicting component libraries, resulting in visual inconsistency and prolonged sprint handoffs.',
    solution: 'Constructed an atomic design token architecture with automated JSON export directly compatible with Tailwind CSS and React component kits.',
    keyOutcomes: [
      'Frontend development velocity increased by 55%',
      'Eliminated visual regressions across dark and light financial themes',
      '100% pass on WCAG 2.1 AA contrast and screen-reader accessibility audits'
    ]
  },
  {
    id: 'mediconnect-clinical-patient-ux',
    slug: 'mediconnect-clinical-patient-ux',
    title: 'MediConnect - Clinical Hospital Patient Portal UX Redesign',
    serviceSlug: 'ui-ux-design',
    serviceName: 'UI/UX Design & Prototyping',
    category: 'webapp',
    categoryLabel: 'UX Research • Prototype',
    badge: 'Clinical UX Study',
    urlPreview: 'mediconnect-ux.abssnexus.in',
    image: '/assets/images/projects/mediconnect-ux.svg',
    shortDesc: 'User research-led UX overhaul simplifying complex hospital admissions, doctor appointments, and lab report downloads into a clear 3-step accessible user journey.',
    fullDesc: 'User research-led UX overhaul simplifying complex hospital admissions, doctor appointments, and lab report downloads into a clear 3-step accessible user journey.',
    client: 'St. Jude Regional Healthcare System',
    impactMetrics: [
      { label: 'Form Drop-off Rate', value: '-58%' },
      { label: 'Senior Usability Score', value: '94/100' },
      { label: 'Booking Completion', value: '+82%' }
    ],
    technologies: ['Figma', 'User Research', 'Usability Audits', 'Wireframing', 'Heuristic Evaluation'],
    caseStudyUrl: '/work/mediconnect-clinical-patient-ux',
    overview: 'Conducted user interviews with 40+ patients and hospital staff to redesign a confusing 11-step outpatient registration workflow into an effortless digital journey.',
    problem: 'Elderly patients abandoned the digital booking portal due to small typography, ambiguous button labels, and confusing insurance upload forms.',
    solution: 'Engineered a progressive disclosure flow featuring high-contrast typography, large touch targets (48px+), and plain-language medical guidance.',
    keyOutcomes: [
      '58% reduction in registration form abandonment',
      'Elderly satisfaction rating jumped from 41% to 94%',
      'Reception telephone inquiries dropped by 35% within 60 days'
    ]
  },

  // =========================================================================
  // 5. AI & MACHINE LEARNING SOLUTIONS (ai-machine-learning)
  // =========================================================================
  {
    id: 'documind-rag-enterprise-search',
    slug: 'documind-rag-enterprise-search',
    title: 'DocuMind - Enterprise RAG Document Intelligence Engine',
    serviceSlug: 'ai-machine-learning',
    serviceName: 'AI & Machine Learning Solutions',
    category: 'ai',
    categoryLabel: 'AI Engine • RAG',
    badge: 'AI Production',
    featured: true,
    urlPreview: 'documind.nexus-ai.internal',
    image: '/assets/images/projects/documind-rag.svg',
    shortDesc: 'Grounded Retrieval-Augmented Generation (RAG) platform indexing 500,000+ contracts, tax filings, and compliance reports with cryptographic citation grounding.',
    fullDesc: 'Grounded Retrieval-Augmented Generation (RAG) platform indexing 500,000+ contracts, tax filings, and compliance reports with cryptographic citation grounding.',
    client: 'Lexis & Associates Legal & Financial Services',
    impactMetrics: [
      { label: 'Query Speed', value: '<1.2s' },
      { label: 'Hallucination Rate', value: '0.00%' },
      { label: 'Analyst Time Saved', value: '650 hrs/mo' }
    ],
    technologies: ['Python', 'LangChain', 'OpenAI API', 'Pinecone Vector DB', 'FastAPI', 'Next.js 16'],
    caseStudyUrl: '/work/documind-rag-enterprise-search',
    overview: 'Engineered an enterprise internal AI knowledge assistant allowing corporate attorneys and financial auditors to extract clause data in seconds.',
    problem: 'Auditors spent up to 14 hours per client manually searching through legacy PDF repositories and regulatory filings to verify compliance clauses.',
    solution: 'Implemented hybrid vector and keyword search (BM25 + Dense Embeddings) coupled with strict citation grounding that highlights original PDF pages.',
    keyOutcomes: [
      'Document audit cycle reduced from 14 hours to 8 minutes',
      'Zero hallucination policy verified across 10,000 test legal queries',
      'Strict role-based encryption ensuring sensitive documents remain compartmentalized'
    ]
  },
  {
    id: 'predictchurn-ml-retention-engine',
    slug: 'predictchurn-ml-retention-engine',
    title: 'PredictChurn - Predictive Customer Retention & LTV Machine Learning Engine',
    serviceSlug: 'ai-machine-learning',
    serviceName: 'AI & Machine Learning Solutions',
    category: 'ai',
    categoryLabel: 'Predictive ML • SaaS',
    badge: 'Production ML',
    urlPreview: 'ml-retention.abssnexus.in',
    image: '/assets/images/projects/predictchurn-ml.svg',
    shortDesc: 'Production predictive machine learning pipeline evaluating user telemetry and event frequencies to alert customer success teams of at-risk subscription accounts 45 days ahead.',
    fullDesc: 'Production predictive machine learning pipeline evaluating user telemetry and event frequencies to alert customer success teams of at-risk subscription accounts 45 days ahead.',
    client: 'CloudScale SaaS Network',
    impactMetrics: [
      { label: 'Prediction Accuracy', value: '91.4%' },
      { label: 'Retention Lift', value: '+28%' },
      { label: 'Lead Time', value: '45 Days' }
    ],
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'PostgreSQL', 'Docker', 'REST API'],
    caseStudyUrl: '/work/predictchurn-ml-retention-engine',
    overview: 'Built an automated machine learning classification model detecting subtle behavioral drop-offs across 45,000 B2B enterprise subscribers.',
    problem: 'SaaS account cancellations typically arrived as a surprise at contract renewal time when it was too late to address grievances.',
    solution: 'Trained and deployed a regularized gradient boosting pipeline tracking feature usage velocity, ticket frequency, and login cadence with explainable SHAP values.',
    keyOutcomes: [
      '91.4% accuracy in flagging accounts intending to downgrade or churn',
      'Customer success saved $380,000 in annual recurring revenue in Q1',
      'Automated daily webhook integration into HubSpot CRM customer records'
    ]
  },

  // =========================================================================
  // 6. CLOUD COMPUTING & DEVOPS (cloud-computing)
  // =========================================================================
  {
    id: 'cloudscale-kubernetes-edge-failover',
    slug: 'cloudscale-kubernetes-edge-failover',
    title: 'CloudScale - Multi-Region Kubernetes & Edge Failover Infrastructure',
    serviceSlug: 'cloud-computing',
    serviceName: 'Cloud Computing & DevOps',
    category: 'cloud',
    categoryLabel: 'DevOps • Multi-Cloud',
    badge: 'Enterprise DevOps',
    urlPreview: 'infra.streambyte-media.net',
    image: '/assets/images/projects/cloudscale-k8s.svg',
    shortDesc: 'Multi-region containerized cloud infrastructure with automated traffic shifting, zero-downtime rolling deploys, and automated disaster recovery failover between AWS regions.',
    fullDesc: 'Multi-region containerized cloud infrastructure with automated traffic shifting, zero-downtime rolling deploys, and automated disaster recovery failover between AWS regions.',
    client: 'StreamByte Media & Video Delivery Network',
    impactMetrics: [
      { label: 'Monthly Requests', value: '120M+' },
      { label: 'Availability SLA', value: '99.995%' },
      { label: 'Deploy Pipeline', value: '4 Minutes' }
    ],
    technologies: ['AWS EKS', 'Kubernetes', 'Cloudflare Edge', 'Terraform', 'GitHub Actions', 'Prometheus'],
    caseStudyUrl: '/work/cloudscale-kubernetes-edge-failover',
    overview: 'Designed resilient cloud infrastructure orchestrating microservices across multiple AWS availability zones with automatic edge traffic failover.',
    problem: 'Single-region container crashes during traffic surges previously took video streaming services offline for up to 45 minutes.',
    solution: 'Authored declarative Terraform infrastructure-as-code deploying self-healing Kubernetes clusters with automated health-check DNS routing.',
    keyOutcomes: [
      'Zero customer-facing downtime during production cluster upgrades',
      'Full disaster recovery cutover completed in under 20 seconds',
      'Continuous automated preview environments for every developer PR'
    ]
  },
  {
    id: 'serverless-event-architecture',
    slug: 'serverless-event-architecture',
    title: 'ServerlessFin - High-Throughput Event Streaming Cloud Platform',
    serviceSlug: 'cloud-computing',
    serviceName: 'Cloud Computing & DevOps',
    category: 'cloud',
    categoryLabel: 'Serverless • Cloudflare',
    badge: 'Cost Optimization',
    urlPreview: 'events.quickpay-finance.io',
    image: '/assets/images/projects/serverless-fin.svg',
    shortDesc: 'Serverless event-driven architecture processing real-time ledger updates and transaction webhooks at massive concurrency while eliminating monthly idle server costs.',
    fullDesc: 'Serverless event-driven architecture processing real-time ledger updates and transaction webhooks at massive concurrency while eliminating monthly idle server costs.',
    client: 'QuickPay Financial Technologies',
    impactMetrics: [
      { label: 'Cloud Bill Cut', value: '-64%' },
      { label: 'Peak Concurrency', value: '18,000 req/s' },
      { label: 'Cold Start Latency', value: '<20ms' }
    ],
    technologies: ['Cloudflare Workers', 'AWS Lambda', 'Upstash Redis', 'Terraform', 'Docker'],
    caseStudyUrl: '/work/serverless-event-architecture',
    overview: 'Re-architected an over-provisioned cluster of idle virtual machines into an on-demand serverless micro-worker fleet.',
    problem: 'The client spent \$4,800 monthly on idle AWS EC2 instances that only experienced high traffic bursts during 3 banking clearing windows per day.',
    solution: 'Migrated API ingestion endpoints to Cloudflare Workers and asynchronous event queues, auto-scaling instantly from 0 to 18,000 requests per second.',
    keyOutcomes: [
      '64% reduction in monthly cloud infrastructure hosting expenditure',
      'Zero maintenance overhead with fully managed serverless runtimes',
      'Sub-20ms cold-start execution times globally'
    ]
  },

  // =========================================================================
  // 7. CYBERSECURITY & EDGE HARDENING (cybersecurity)
  // =========================================================================
  {
    id: 'vaultshield-zero-trust-waf-hardening',
    slug: 'vaultshield-zero-trust-waf-hardening',
    title: 'VaultShield - Zero-Trust API Gateway & OWASP Edge WAF Hardening',
    serviceSlug: 'cybersecurity',
    serviceName: 'Cybersecurity & Edge Hardening',
    category: 'security',
    categoryLabel: 'Cybersecurity • Zero Trust',
    badge: 'Security Audited',
    featured: true,
    urlPreview: 'shield.securecapital-bank.com',
    image: '/assets/images/projects/vaultshield-waf.svg',
    shortDesc: 'Enterprise edge security layer with automated IP reputation scoring, mutual TLS authentication, bot challenge gates, and strict CSP/HSTS header enforcement.',
    fullDesc: 'Enterprise edge security layer with automated IP reputation scoring, mutual TLS authentication, bot challenge gates, and strict CSP/HSTS header enforcement.',
    client: 'SecureCapital Digital Banking Group',
    impactMetrics: [
      { label: 'Blocked Attacks', value: '4.2M/day' },
      { label: 'False Positives', value: '<0.01%' },
      { label: 'Security Grade', value: 'A+ SSL Labs' }
    ],
    technologies: ['Cloudflare WAF', 'mTLS', 'OWASP Top 10', 'Rate Limiting', 'Zod', 'Zero Trust Access'],
    caseStudyUrl: '/work/vaultshield-zero-trust-waf-hardening',
    overview: 'Implemented hardened perimeter security shielding sensitive banking APIs from credential stuffing, distributed denial of service (DDoS), and SQL injection.',
    problem: 'Automated bot networks hammered user login endpoints with 4 million malicious credential stuffing attempts daily, degrading server performance.',
    solution: 'Configured managed Cloudflare WAF rulesets, cryptographic Turnstile challenges, and strict IP rate-limiting per customer token.',
    keyOutcomes: [
      'Blocked 100% of automated credential stuffing assaults without impacting real users',
      'Achieved A+ rating on Qualys SSL Labs security audit',
      'Eliminated unauthorized API endpoint discovery with mutual TLS enforcement'
    ]
  },
  {
    id: 'secureaudit-hipaa-penetration-testing',
    slug: 'secureaudit-hipaa-penetration-testing',
    title: 'SecureAudit - Healthcare HIPAA Vulnerability Assessment & Hardening',
    serviceSlug: 'cybersecurity',
    serviceName: 'Cybersecurity & Edge Hardening',
    category: 'security',
    categoryLabel: 'Penetration Testing • HIPAA',
    badge: 'Audit Verified',
    urlPreview: 'security.metrohealth-diag.org',
    image: '/assets/images/projects/secureaudit-hipaa.svg',
    shortDesc: 'End-to-end black-box and white-box penetration test uncovering data leakage risks in telemedicine APIs, followed by full database encryption at rest and role authorization hardening.',
    fullDesc: 'End-to-end black-box and white-box penetration test uncovering data leakage risks in telemedicine APIs, followed by full database encryption at rest and role authorization hardening.',
    client: 'MetroHealth Regional Diagnostics',
    impactMetrics: [
      { label: 'Critical CVEs Fixed', value: '14 Patched' },
      { label: 'Audit Compliance', value: '100% Passed' },
      { label: 'Incident Risk', value: '-88%' }
    ],
    technologies: ['Burp Suite', 'OWASP ZAP', 'AES-256 Encryption', 'RBAC', 'HIPAA Audit Protocols'],
    caseStudyUrl: '/work/secureaudit-hipaa-penetration-testing',
    overview: 'Conducted rigorous offensive penetration testing across clinical web and mobile portals prior to official government healthcare accreditation.',
    problem: 'Third-party vendor audit revealed unvalidated redirect risks and missing cryptographic salting on patient diagnostic archives.',
    solution: 'Remediated all 14 identified vulnerabilities, deployed AES-256 field-level encryption for diagnostic records, and established an automated CI security scanner.',
    keyOutcomes: [
      'Passed official regulatory HIPAA security assessment with zero non-conformances',
      'Prevented medical record exposure risks through strict role-based access control (RBAC)',
      'Delivered developer security training runbook preventing future code injection bugs'
    ]
  },

  // =========================================================================
  // 8. DATA ANALYTICS & BUSINESS INTELLIGENCE (data-analytics-bi)
  // =========================================================================
  {
    id: 'revops-360-executive-bi-dashboard',
    slug: 'revops-360-executive-bi-dashboard',
    title: 'RevOps 360 - Real-Time Executive KPI & Revenue Intelligence Dashboard',
    serviceSlug: 'data-analytics-bi',
    serviceName: 'Data Analytics & Business Intelligence',
    category: 'analytics',
    categoryLabel: 'BI Dashboard • Real-Time',
    badge: 'Executive BI',
    urlPreview: 'bi.apex-growth.internal',
    image: '/assets/images/projects/revops-bi.svg',
    shortDesc: 'Unified executive intelligence suite centralizing sales, marketing ad spend, and recurring customer subscriptions into drill-down interactive cohort charts.',
    fullDesc: 'Unified executive intelligence suite centralizing sales, marketing ad spend, and recurring customer subscriptions into drill-down interactive cohort charts.',
    client: 'Apex Growth Ventures & D2C Brands',
    impactMetrics: [
      { label: 'Reporting Speed', value: 'Real-Time' },
      { label: 'Reconciliation Error', value: '0.00%' },
      { label: 'Executive Adoption', value: '100%' }
    ],
    technologies: ['Apache Superset', 'PostgreSQL', 'Python Pandas', 'Stripe API', 'Chart.js', 'Cloudflare D1'],
    caseStudyUrl: '/work/revops-360-executive-bi-dashboard',
    overview: 'Constructed an executive command dashboard providing founders and board members with instant visibility into blended CAC, LTV, and churn rates.',
    problem: 'Leadership had to wait 12 days after month-end for accounting to manually compile revenue and ad performance spreadsheets.',
    solution: 'Built automated ETL pipelines extracting transactions from Stripe, Meta Ads, and Shopify into an analytical data warehouse with live telemetry charts.',
    keyOutcomes: [
      'Eliminated 40+ hours of monthly manual financial data entry',
      'Real-time cash flow and subscription renewal forecasts updated hourly',
      'Granular cohort retention curves highlighting top-performing customer tiers'
    ]
  },
  {
    id: 'supplychain-sensor-telemetry-bi',
    slug: 'supplychain-sensor-telemetry-bi',
    title: 'ColdChain BI - IoT Sensor Telemetry & Real-Time Logistics Analytics',
    serviceSlug: 'data-analytics-bi',
    serviceName: 'Data Analytics & Business Intelligence',
    category: 'analytics',
    categoryLabel: 'IoT Analytics • Real-Time',
    badge: 'IoT Telemetry',
    urlPreview: 'iot.biopharma-coldchain.net',
    image: '/assets/images/projects/coldchain-bi.svg',
    shortDesc: 'Real-time temperature, humidity, and location telemetry tracking dashboard for refrigerated pharmaceutical transport with automated WhatsApp excursions alerts.',
    fullDesc: 'Real-time temperature, humidity, and location telemetry tracking dashboard for refrigerated pharmaceutical transport with automated WhatsApp excursions alerts.',
    client: 'BioPharma Cold Chain Distributors',
    impactMetrics: [
      { label: 'Events Handled', value: '10,000/sec' },
      { label: 'Spoilage Saved', value: '$420,000' },
      { label: 'Alert Latency', value: '<2 Seconds' }
    ],
    technologies: ['Cloudflare D1', 'MQTT / WebSockets', 'Chart.js', 'PostgreSQL', 'Twilio Alerts'],
    caseStudyUrl: '/work/supplychain-sensor-telemetry-bi',
    overview: 'Engineered an IoT telemetry platform monitoring temperature-sensitive vaccines and biological medicines across 140 refrigerated trucks.',
    problem: 'Refrigeration breakdowns during cross-country transport went unnoticed until delivery, causing hundreds of thousands of dollars in spoiled product.',
    solution: 'Connected cellular GPS/temperature sensors to an edge event ingestion pipeline that triggers automated voice/WhatsApp alerts within 2 seconds of temperature variance.',
    keyOutcomes: [
      'Prevented \$420,000 in medication spoilage during the first 6 months of operation',
      'Automated regulatory temperature logs required by national health authorities',
      'Live geographic map showing real-time fleet positions and cooling health'
    ]
  },

  // =========================================================================
  // 9. E-COMMERCE STOREFRONT DEVELOPMENT (ecommerce-development)
  // =========================================================================
  {
    id: 'ecommerce-retail',
    slug: 'ecommerce-headless-storefront',
    title: 'Heritage Crafts - Headless D2C Commerce & 1-Tap WhatsApp Storefront',
    serviceSlug: 'ecommerce-development',
    serviceName: 'E-Commerce Storefront Development',
    category: 'ecommerce',
    categoryLabel: 'Storefront • Demonstration',
    badge: 'Case Study',
    featured: true,
    urlPreview: 'abssnexus.in/storefront/retail',
    image: '/assets/images/projects/heritage-crafts.svg',
    shortDesc: 'Streamlined shopping experience with responsive grid layouts, product showcase modals, intuitive carts, and conversion-optimized checkout.',
    fullDesc: 'Streamlined shopping experience with responsive grid layouts, product showcase modals, intuitive carts, and conversion-optimized flow.',
    client: 'Heritage Crafts India & D2C Brands',
    impactMetrics: [
      { label: 'Inquiry Lift', value: '+42%' },
      { label: 'Cart Speed', value: '<250ms' },
      { label: 'Mobile Checkout', value: '1-Tap WhatsApp' }
    ],
    technologies: ['Next.js 16', 'Responsive UI', 'Product Catalog', 'Cart Engine', 'Razorpay'],
    caseStudyUrl: '/work/ecommerce-headless-storefront',
    overview: 'Engineered an ultra-fast headless e-commerce experience designed specifically to eliminate cart drop-offs on Indian mobile networks.',
    problem: 'Traditional monolithic storefronts were burdened with hundreds of uncompressed vendor plugins, causing 6-second load delays on mobile.',
    solution: 'Built a lightweight, static-first storefront with asynchronous cart state, instant modal previews, and automated WhatsApp order routing.',
    keyOutcomes: [
      '42% increase in completed product inquiries within 30 days',
      'Smooth checkout path on 3G/4G bandwidth',
      'Zero monthly plugin subscription overhead'
    ]
  },
  {
    id: 'luxeaura-fashion-ecommerce-store',
    slug: 'luxeaura-fashion-ecommerce-store',
    title: 'LuxeAura - High-Volume Fashion & Cosmetics Omnichannel Store',
    serviceSlug: 'ecommerce-development',
    serviceName: 'E-Commerce Storefront Development',
    category: 'ecommerce',
    categoryLabel: 'Headless Commerce • Shopify API',
    badge: 'High Conversion',
    urlPreview: 'shop.luxeaura-couture.com',
    image: '/assets/images/projects/luxeaura-fashion.svg',
    shortDesc: 'Headless high-fashion apparel and beauty storefront featuring sub-100ms instant search, dynamic size recommender modal, and multi-currency localized checkout.',
    fullDesc: 'Headless high-fashion apparel and beauty storefront featuring sub-100ms instant search, dynamic size recommender modal, and multi-currency localized checkout.',
    client: 'LuxeAura Retail Brands Pvt Ltd',
    impactMetrics: [
      { label: 'Conversion Rate', value: '4.8%' },
      { label: 'Search Speed', value: '<80ms' },
      { label: 'Cart Abandonment', value: '-32%' }
    ],
    technologies: ['Next.js 16', 'Shopify Storefront API', 'Razorpay', 'Tailwind CSS', 'Algolia Search'],
    caseStudyUrl: '/work/luxeaura-fashion-ecommerce-store',
    overview: 'Built an editorial luxury e-commerce experience combining magazine-style lookbooks with frictionless 1-page checkout for high-end fashion shoppers.',
    problem: 'High return rates due to inaccurate customer sizing and slow faceted filtering frustrated mobile apparel shoppers.',
    solution: 'Implemented sub-80ms client-side Algolia search, an interactive 3D model size guide, and streamlined Razorpay payment gateway integration.',
    keyOutcomes: [
      'Conversion rate climbed from 1.9% to 4.8% on mobile traffic',
      'Sizing return requests dropped by 34%',
      'Average order value (AOV) increased by 22% with smart bundle cross-sells'
    ]
  },

  // =========================================================================
  // 10. SAAS PLATFORM DEVELOPMENT (saas-development)
  // =========================================================================
  {
    id: 'taskmatrix-multitenant-project-saas',
    slug: 'taskmatrix-multitenant-project-saas',
    title: 'TaskMatrix - Multi-Tenant Team Project & Resource Management SaaS',
    serviceSlug: 'saas-development',
    serviceName: 'SaaS Platform Development',
    category: 'webapp',
    categoryLabel: 'SaaS • Multi-Tenant',
    badge: 'Production SaaS',
    featured: true,
    urlPreview: 'app.taskmatrix.io',
    image: '/assets/images/projects/taskmatrix-saas.svg',
    shortDesc: 'Turnkey enterprise project management SaaS with isolated organizational tenants, automated tiered Stripe billing, interactive Kanban drag-and-drop boards, and team audit logs.',
    fullDesc: 'Turnkey enterprise project management SaaS with isolated organizational tenants, automated tiered Stripe billing, interactive Kanban drag-and-drop boards, and team audit logs.',
    client: 'AgileSprint Technologies Inc',
    impactMetrics: [
      { label: 'Active Workspaces', value: '4,500+' },
      { label: 'Monthly MRR Growth', value: '+24%' },
      { label: 'API Latency', value: '32ms' }
    ],
    technologies: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Stripe Billing', 'Tailwind CSS', 'Redis'],
    caseStudyUrl: '/work/taskmatrix-multitenant-project-saas',
    overview: 'Architected a collaborative productivity SaaS application scaling effortlessly across thousands of distributed product and engineering teams.',
    problem: 'Off-the-shelf project tools lacked granular organization workspace segregation and custom billing tiers for agency clients.',
    solution: 'Engineered a schema-partitioned PostgreSQL database ensuring absolute data isolation between tenants, paired with Stripe automated subscription metering.',
    keyOutcomes: [
      'Scaled to 4,500 active company workspaces with zero cross-tenant data leaks',
      'Automated seat-based subscription billing, upgrades, and invoice generation',
      'Sub-35ms response times across all Kanban board drag-and-drop state changes'
    ]
  },
  {
    id: 'billsync-gst-invoicing-saas',
    slug: 'billsync-gst-invoicing-saas',
    title: 'BillSync - Automated Invoicing & Indian GST E-Way Bill SaaS',
    serviceSlug: 'saas-development',
    serviceName: 'SaaS Platform Development',
    category: 'webapp',
    categoryLabel: 'Fintech SaaS • Compliance',
    badge: 'Indian MSME SaaS',
    urlPreview: 'billsync.in',
    image: '/assets/images/projects/billsync-saas.svg',
    shortDesc: 'Cloud billing engine tailored for Indian manufacturers and traders, automating GST tax invoices, QR-code verified e-invoicing, and instant WhatsApp billing receipts.',
    fullDesc: 'Cloud billing engine tailored for Indian manufacturers and traders, automating GST tax invoices, QR-code verified e-invoicing, and instant WhatsApp billing receipts.',
    client: 'BharatTrade MSME Solutions Network',
    impactMetrics: [
      { label: 'Invoices Generated', value: '350,000+' },
      { label: 'Compliance Score', value: '100%' },
      { label: 'Generation Speed', value: '<1.5s' }
    ],
    technologies: ['Next.js 16', 'Node.js', 'Cloudflare D1', 'NIC GST API', 'PDFKit', 'WhatsApp Cloud API'],
    caseStudyUrl: '/work/billsync-gst-invoicing-saas',
    overview: 'Created an intuitive cloud accounting application simplifying government e-invoicing and transport e-way bill generation for non-technical business owners.',
    problem: 'Small business owners struggled with government portal timeouts, formatting errors, and manual PDF sending, leading to shipment delays.',
    solution: 'Built a 2-click invoice creator that connects to government GST APIs, generates QR-encoded PDFs, and delivers bills directly to customers via WhatsApp.',
    keyOutcomes: [
      'Processed over 350,000 compliant GST tax invoices with zero government rejections',
      'Cut billing administrative time for warehouse dispatchers by 85%',
      'Instant automated WhatsApp delivery with 99.2% read rates'
    ]
  },

  // =========================================================================
  // 11. API INTEGRATION & MIDDLEWARE ENGINEERING (api-integration)
  // =========================================================================
  {
    id: 'fintech-gateway',
    slug: 'fintech-payment-gateway',
    title: 'Fintech Payment Gateway & Transaction Reconciliation Engine',
    serviceSlug: 'api-integration',
    serviceName: 'API Integration & Middleware Engineering',
    category: 'webapp',
    categoryLabel: 'Fintech • Architecture',
    badge: 'Enterprise Case Study',
    featured: true,
    urlPreview: 'abssnexus.in/work/fintech-payment-gateway',
    image: '/assets/images/projects/fintech-gateway.svg',
    shortDesc: 'Mission-critical payment gateway integration with idempotent webhook processing, automated reconciliation, and instant dispute alerts.',
    fullDesc: 'Mission-critical payment gateway integration with idempotent webhook processing, automated reconciliation, and instant dispute alerts.',
    client: 'Fintech Infrastructure Series',
    impactMetrics: [
      { label: 'Discrepancy Rate', value: '0.00%' },
      { label: 'Webhook Processing', value: '<30ms' },
      { label: 'Audit Compliance', value: '100%' }
    ],
    technologies: ['Node.js', 'PostgreSQL', 'Cloudflare Workers', 'Razorpay API', 'Zod', 'Redis'],
    caseStudyUrl: '/work/fintech-payment-gateway',
    overview: 'Engineered a zero-loss transaction reconciliation engine capable of handling high-volume concurrent webhook callbacks.',
    problem: 'Intermittent network failures during checkout occasionally resulted in paid orders failing to register in the customer portal.',
    solution: 'Designed an idempotent event queue with cryptographic signature verification and dual-entry ledger reconciliation.',
    keyOutcomes: [
      '100% automated settlement reconciliation',
      'Zero duplicate order processing events',
      'Instant Slack & email alert on payment state anomalies'
    ]
  },
  {
    id: 'omnisync-crm-erp-logistics-middleware',
    slug: 'omnisync-crm-erp-logistics-middleware',
    title: 'OmniSync - Unified CRM, ERP & Logistics Omnichannel Middleware',
    serviceSlug: 'api-integration',
    serviceName: 'API Integration & Middleware Engineering',
    category: 'cloud',
    categoryLabel: 'Middleware • Cloudflare',
    badge: 'Enterprise Middleware',
    urlPreview: 'middleware.apex-consumer.io',
    image: '/assets/images/projects/omnisync-middleware.svg',
    shortDesc: 'High-concurrency middleware bridge connecting HubSpot CRM, SAP ERP, and Shiprocket dispatch endpoints with guaranteed idempotency, automatic retry queues, and dead-letter alerts.',
    fullDesc: 'High-concurrency middleware bridge connecting HubSpot CRM, SAP ERP, and Shiprocket dispatch endpoints with guaranteed idempotency, automatic retry queues, and dead-letter alerts.',
    client: 'Apex Global Consumer Goods Corp',
    impactMetrics: [
      { label: 'Daily Events', value: '1.2M Synced' },
      { label: 'Webhook Loss Rate', value: '0.00%' },
      { label: 'Sync Latency', value: '<120ms' }
    ],
    technologies: ['Cloudflare Workers', 'TypeScript', 'Redis / Upstash', 'HubSpot API', 'SAP RFC', 'Shiprocket API'],
    caseStudyUrl: '/work/omnisync-crm-erp-logistics-middleware',
    overview: 'Engineered an event-driven middleware bridge ensuring customer orders from digital sales channels automatically route to ERP warehousing and courier dispatch.',
    problem: 'Rate limit bans and payload formatting mismatches between SAP and third-party APIs caused lost orders and 2-day dispatch delays.',
    solution: 'Constructed an asynchronous message queue on Cloudflare Workers and Upstash Redis with payload normalization, rate-limit throttling, and automatic retries.',
    keyOutcomes: [
      'Successfully synchronized 1.2 million daily cross-platform events with zero dropped orders',
      'Order-to-dispatch latency reduced from 4 hours to under 3 minutes',
      'Comprehensive real-time health dashboard surfacing API partner latencies'
    ]
  },

  // =========================================================================
  // 12. DIGITAL MARKETING & TECHNICAL SEO (digital-marketing-seo)
  // =========================================================================
  {
    id: 'seo-accelerator-edtech-organic-growth',
    slug: 'seo-accelerator-edtech-organic-growth',
    title: 'SEOAccelerator - National EdTech Platform Organic Search Domination',
    serviceSlug: 'digital-marketing-seo',
    serviceName: 'Digital Marketing & Technical SEO',
    category: 'website',
    categoryLabel: 'Technical SEO • Growth',
    badge: 'Search Domination',
    urlPreview: 'skillbridge.edu.in',
    image: '/assets/images/projects/seo-accelerator.svg',
    shortDesc: 'Complete technical SEO audit and program execution for an online learning platform, implementing structured educational course schemas, sub-second indexing, and automated sitemaps.',
    fullDesc: 'Complete technical SEO audit and program execution for an online learning platform, implementing structured educational course schemas, sub-second indexing, and automated sitemaps.',
    client: 'NextGen Academy & SkillBridge India',
    impactMetrics: [
      { label: 'Organic Traffic', value: '+340%' },
      { label: 'Top 3 Keywords', value: '140+' },
      { label: 'Core Web Vitals', value: '99/100' }
    ],
    technologies: ['Schema.org JSON-LD', 'Next.js Dynamic Sitemap', 'Google Search Console', 'Ahrefs', 'Core Web Vitals'],
    caseStudyUrl: '/work/seo-accelerator-edtech-organic-growth',
    overview: 'Executed an aggressive technical SEO modernization program transforming an educational portal into a dominant organic search traffic magnet.',
    problem: 'Duplicate content URLs, missing course schema metadata, and bloated client-side JavaScript kept high-value certification pages buried on page 4 of Google.',
    solution: 'Migrated course pages to server-rendered Next.js, added rich Course and FAQ schema markup, and built a dynamic sitemap auto-notifying search engine bots.',
    keyOutcomes: [
      '340% increase in monthly organic search visitors within 90 days',
      'Achieved #1 ranking for 140+ high-intent commercial educational search terms',
      'Lowered customer acquisition cost (CAC) by 62% by substituting paid Google Ads'
    ]
  },
  {
    id: 'localrank-dental-multi-location-seo',
    slug: 'localrank-dental-multi-location-seo',
    title: 'LocalRank 360 - Multi-Location Healthcare Clinics Search & Lead Engine',
    serviceSlug: 'digital-marketing-seo',
    serviceName: 'Digital Marketing & Technical SEO',
    category: 'website',
    categoryLabel: 'Local SEO • Multi-Location',
    badge: 'Local Search Lead',
    urlPreview: 'smilecare-dental.in',
    image: '/assets/images/projects/localrank-seo.svg',
    shortDesc: 'Local SEO and Google Maps optimization framework creating 14 fast, geo-targeted localized clinic landing pages with verified medical doctor review schemas.',
    fullDesc: 'Local SEO and Google Maps optimization framework creating 14 fast, geo-targeted localized clinic landing pages with verified medical doctor review schemas.',
    client: 'SmileCare Dental Hospital Chain (14 Regional Centers)',
    impactMetrics: [
      { label: 'Consultations', value: '+210%' },
      { label: 'Google 3-Pack', value: '12 Centers' },
      { label: 'Cost Per Lead', value: '-52%' }
    ],
    technologies: ['Google Business Profile API', 'Local Schema', 'Geo-Targeted Landers', 'Next.js 16', 'NAP Consistency'],
    caseStudyUrl: '/work/localrank-dental-multi-location-seo',
    overview: 'Engineered a hyper-local search discovery engine capturing high-intent patients searching for dental implants and orthodontic consultations in their specific neighborhood.',
    problem: '14 clinic branches suffered from fragmented address listings, mismatched phone numbers, and zero localized website landing pages.',
    solution: 'Generated 14 individual location microsites with embedded Google Maps coordinates, automated doctor credential schemas, and centralized review management.',
    keyOutcomes: [
      '12 out of 14 clinics achieved permanent Google Maps 3-Pack placement for target search queries',
      '210% increase in confirmed monthly online dental appointments',
      'Strict Name, Address, and Phone (NAP) synchronization across 40+ national medical directories'
    ]
  },

  // =========================================================================
  // 13. SOFTWARE TESTING & QUALITY ASSURANCE (software-testing-qa)
  // =========================================================================
  {
    id: 'qualityshield-playwright-e2e-testing',
    slug: 'qualityshield-playwright-e2e-testing',
    title: 'QualityShield - Automated Playwright E2E & Visual Regression Test Suite',
    serviceSlug: 'software-testing-qa',
    serviceName: 'Software Testing & Quality Assurance',
    category: 'webapp',
    categoryLabel: 'Automated QA • Playwright',
    badge: 'CI/CD Test Runner',
    urlPreview: 'ci.fintech-transactions.com',
    image: '/assets/images/projects/qualityshield-qa.svg',
    shortDesc: 'Enterprise automated QA pipeline running parallel headless browser tests across Chromium, Firefox, and WebKit on every GitHub pull request before production deployment.',
    fullDesc: 'Enterprise automated QA pipeline running parallel headless browser tests across Chromium, Firefox, and WebKit on every GitHub pull request before production deployment.',
    client: 'FinTech Global Transactions Platform',
    impactMetrics: [
      { label: 'Test Scenarios', value: '480+ Automated' },
      { label: 'Regression Catch Rate', value: '99.4%' },
      { label: 'QA Sprint Time', value: '15 Minutes' }
    ],
    technologies: ['Playwright', 'TypeScript', 'GitHub Actions', 'Lighthouse CI', 'Pixelmatch Visual Diff'],
    caseStudyUrl: '/work/qualityshield-playwright-e2e-testing',
    overview: 'Designed a comprehensive automated test framework ensuring zero checkout regressions or payment flow breakages during rapid engineering sprints.',
    problem: 'Manual quality assurance testing before each weekly release consumed 3 full developer days and consistently missed edge-case mobile safari bugs.',
    solution: 'Built a 480-scenario Playwright test harness running in parallel on GitHub Actions runners with screenshot diffs and automated synthetic test cards.',
    keyOutcomes: [
      'Full cross-browser test suite executes in under 15 minutes per release',
      'Prevented 34 critical payment flow bugs from ever reaching production users',
      'Automated visual regression testing catching unintended CSS changes before merge'
    ]
  },
  {
    id: 'loadbench-concurrency-stress-testing',
    slug: 'loadbench-concurrency-stress-testing',
    title: 'LoadBench - High-Concurrency Flash Sale Stress & Load Benchmark',
    serviceSlug: 'software-testing-qa',
    serviceName: 'Software Testing & Quality Assurance',
    category: 'cloud',
    categoryLabel: 'Load Testing • k6',
    badge: 'Stress Verified',
    urlPreview: 'loadtest.megadeals-retail.com',
    image: '/assets/images/projects/loadbench-qa.svg',
    shortDesc: 'Realistic load and stress benchmarking simulation identifying database connection bottlenecks and caching thresholds ahead of major commercial shopping festivals.',
    fullDesc: 'Realistic load and stress benchmarking simulation identifying database connection bottlenecks and caching thresholds ahead of major commercial shopping festivals.',
    client: 'MegaDeals E-Commerce Network',
    impactMetrics: [
      { label: 'Simulated Users', value: '30,000 Concurrent' },
      { label: 'P99 Response Time', value: '140ms' },
      { label: 'Festival Downtime', value: '0 Seconds' }
    ],
    technologies: ['k6 Distributed Load Testing', 'Docker', 'AWS Grafana', 'Prometheus', 'PostgreSQL Tuning'],
    caseStudyUrl: '/work/loadbench-concurrency-stress-testing',
    overview: 'Executed comprehensive stress, soak, and spike load simulations to ensure online storefronts survived intense Diwali and Black Friday checkout spikes.',
    problem: 'During the previous year’s holiday flash sale, the checkout server crashed within 4 minutes, causing \$180,000 in abandoned shopping carts.',
    solution: 'Scripted distributed k6 load generators simulating 30,000 simultaneous users searching, adding to cart, and checking out, pinpointing database connection exhaustion.',
    keyOutcomes: [
      'Successfully sustained 30,000 concurrent active shoppers with 0 seconds of downtime',
      'Optimized database connection pooling and Redis caching, cutting P99 latency to 140ms',
      'Delivered emergency traffic throttling and queue runbooks for devops staff'
    ]
  },

  // =========================================================================
  // 14. IT CONSULTING & TECHNOLOGY STRATEGY (it-consulting)
  // =========================================================================
  {
    id: 'legacymodernize-banking-architecture-roadmap',
    slug: 'legacymodernize-banking-architecture-roadmap',
    title: 'LegacyModernize - Core Monolith to Microservices Banking Strategy',
    serviceSlug: 'it-consulting',
    serviceName: 'IT Consulting & Technology Strategy',
    category: 'webapp',
    categoryLabel: 'Strategy • Architecture',
    badge: 'Enterprise Advisory',
    urlPreview: 'modernize.prism-bank.co',
    image: '/assets/images/projects/legacymodernize-banking.svg',
    shortDesc: 'Founder-level technical consulting engagement providing architectural audit, security risk scorecard, and phased microservices decoupling roadmap for a legacy banking platform.',
    fullDesc: 'Founder-level technical consulting engagement providing architectural audit, security risk scorecard, and phased microservices decoupling roadmap for a legacy banking platform.',
    client: 'Prism Cooperative Commercial Bank',
    impactMetrics: [
      { label: 'Modernization Savings', value: '$1.2M Saved' },
      { label: 'Phased Timeline', value: '18 Months' },
      { label: 'Zero Disruption', value: '100% SLA' }
    ],
    technologies: ['Cloud Architecture', 'Event-Driven Systems', 'Apache Kafka', 'Docker', 'Target-State Blueprint'],
    caseStudyUrl: '/work/legacymodernize-banking-architecture-roadmap',
    overview: 'Provided executive-level technology advisory to board members navigating the migration of a 14-year-old on-premise banking monolith to modern secure cloud infrastructure.',
    problem: 'Legacy server hardware was approaching end-of-life, making compliance updates risky and preventing integration with modern mobile banking APIs.',
    solution: 'Created an 18-month strangler-fig migration roadmap, decoupling customer accounts and ledger services into independent event-driven microservices.',
    keyOutcomes: [
      'Saved \$1.2M in consulting vendor fees through objective architectural auditing',
      'Established zero-downtime coexistence between legacy core databases and modern APIs',
      'Delivered comprehensive board-level technology risk and compliance presentations'
    ]
  },
  {
    id: 'fintechgov-startup-architecture-advisory',
    slug: 'fintechgov-startup-architecture-advisory',
    title: 'FintechGov - Startup Cloud Compliance & Seed-to-Scale Advisory',
    serviceSlug: 'it-consulting',
    serviceName: 'IT Consulting & Technology Strategy',
    category: 'cloud',
    categoryLabel: 'CTO Advisory • Seed to Scale',
    badge: 'Founder Advisory',
    urlPreview: 'advisory.payswift-fintech.io',
    image: '/assets/images/projects/fintechgov-advisory.svg',
    shortDesc: 'Strategic CTO-as-a-service technical consulting advising founders on scalable cloud choices, PCI-DSS compliance readiness, and team hiring roadmaps.',
    fullDesc: 'Strategic CTO-as-a-service technical consulting advising founders on scalable cloud choices, PCI-DSS compliance readiness, and team hiring roadmaps.',
    client: 'PaySwift Mobility Series A Startup',
    impactMetrics: [
      { label: 'Runway Extended', value: '+14 Months' },
      { label: 'Series A Raised', value: '$2.4M' },
      { label: 'Audit Score', value: '100% Passed' }
    ],
    technologies: ['AWS Multi-AZ', 'Security Compliance', 'Budget Forecasting', 'Vendor Anti-Lockin', 'Team Hiring Specs'],
    caseStudyUrl: '/work/fintechgov-startup-architecture-advisory',
    overview: 'Acted as fractional Chief Technology Officer guiding early-stage fintech founders through technical investor diligence and architecture selection.',
    problem: 'Founders received conflicting advice from external agencies proposing expensive proprietary stacks that would drain their pre-seed runway.',
    solution: 'Architected a lean, open-standard cloud stack utilizing serverless edge primitives, avoiding proprietary vendor lock-in traps and modeling operational spend.',
    keyOutcomes: [
      'Extended startup operational runway by 14 months through cloud cost discipline',
      'Passed rigorous technical due diligence, directly enabling a \$2.4M Series A equity raise',
      'Drafted senior engineering job descriptions and conducted technical candidate screenings'
    ]
  },

  // =========================================================================
  // 15. WEBSITE MAINTENANCE & SECURITY PATCHING (website-maintenance)
  // =========================================================================
  {
    id: 'carepulse-hospital-web-maintenance-sla',
    slug: 'carepulse-hospital-web-maintenance-sla',
    title: 'CarePulse - 24/7 Managed Hospital Network Web Maintenance & Uptime SLA',
    serviceSlug: 'website-maintenance',
    serviceName: 'Website Maintenance & Security Patching',
    category: 'website',
    categoryLabel: 'Maintenance • 24/7 SLA',
    badge: 'Managed SLA',
    urlPreview: 'status.carepulse-hospitals.org',
    image: '/assets/images/projects/carepulse-maintenance.svg',
    shortDesc: 'Proactive 24/7 managed maintenance program delivering daily encrypted backups, weekly CVE dependency security patches, and instant emergency uptime response.',
    fullDesc: 'Proactive 24/7 managed maintenance program delivering daily encrypted backups, weekly CVE dependency security patches, and instant emergency uptime response.',
    client: 'CarePulse Multispecialty Hospitals (5 Regional Campuses)',
    impactMetrics: [
      { label: 'Verified Uptime', value: '99.99%' },
      { label: 'Emergency SLA', value: '<12 Minutes' },
      { label: 'Recovery Time', value: '4 Minutes' }
    ],
    technologies: ['Automated Cloud Backups', 'Cloudflare Edge', 'Sentry Monitoring', 'Dependency Patching', 'SSL Renewal'],
    caseStudyUrl: '/work/carepulse-hospital-web-maintenance-sla',
    overview: 'Delivered round-the-clock managed maintenance and proactive security engineering safeguarding patient portals across 5 hospital campus websites.',
    problem: 'Unmonitored third-party WordPress plugin vulnerabilities caused occasional weekend outages and security warning banners on Google Chrome.',
    solution: 'Instituted automated hourly uptime polling, headless staging regression tests before any package updates, and off-site encrypted disaster recovery snapshots.',
    keyOutcomes: [
      'Guaranteed 99.99% verified uptime across 365 consecutive operational days',
      'Zero security incidents or malicious script injections over 2 years of active service',
      'Automated disaster recovery drill verified quarterly with complete restore in under 4 minutes'
    ]
  },
  {
    id: 'brandguard-publisher-speed-maintenance',
    slug: 'brandguard-publisher-speed-maintenance',
    title: 'BrandGuard - High-Traffic Media Publisher Performance & Patching Operations',
    serviceSlug: 'website-maintenance',
    serviceName: 'Website Maintenance & Security Patching',
    category: 'website',
    categoryLabel: 'Speed Maintenance • Media',
    badge: 'Proactive Operations',
    urlPreview: 'ops.dailytech-chronicle.com',
    image: '/assets/images/projects/brandguard-speed.svg',
    shortDesc: 'Ongoing performance and vulnerability management service guaranteeing sub-second article loading, zero broken links, automated SSL renewals, and image compression pipelines.',
    fullDesc: 'Ongoing performance and vulnerability management service guaranteeing sub-second article loading, zero broken links, automated SSL renewals, and image compression pipelines.',
    client: 'The Daily Tech Chronicle (4M Monthly Readers)',
    impactMetrics: [
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'Ad Script Latency', value: '-45%' },
      { label: 'Outage Incidents', value: '0 in 12 Mos' }
    ],
    technologies: ['Next.js Optimization', 'Cloudflare Cache Purge', 'Core Web Vitals', 'SSL Bot', 'Broken Link Scanners'],
    caseStudyUrl: '/work/brandguard-publisher-speed-maintenance',
    overview: 'Managed ongoing technical maintenance for a high-volume digital news magazine receiving up to 500,000 daily page impressions during breaking news cycles.',
    problem: 'Accumulation of unoptimized sponsor advertising scripts and uncompressed editorial photos caused mobile page speed scores to plummet to 42/100.',
    solution: 'Deployed automated WebP image transformation pipelines, script deferral policies, and scheduled weekly dependency auditing.',
    keyOutcomes: [
      'Maintained 98/100 mobile Google Lighthouse performance score continuously',
      'Reduced mobile data payload by 52%, cutting CDN bandwidth bills in half',
      'Zero downtime during high-profile breaking news spikes with automatic edge cache warming'
    ]
  },

  // =========================================================================
  // 16. MANAGED IT SUPPORT & INFRASTRUCTURE SERVICES (managed-it-support)
  // =========================================================================
  {
    id: 'enterprisecare-247-cloud-infrastructure-support',
    slug: 'enterprisecare-247-cloud-infrastructure-support',
    title: 'EnterpriseCare - 24/7 Mission-Critical Cloud Infrastructure NOC & Incident SLA',
    serviceSlug: 'managed-it-support',
    serviceName: 'Managed IT Support & Infrastructure Services',
    category: 'cloud',
    categoryLabel: 'Managed NOC • 24/7 Support',
    badge: '24/7 Enterprise SLA',
    urlPreview: 'noc.apex-payments.net',
    image: '/assets/images/projects/enterprisecare-noc.svg',
    shortDesc: 'Round-the-clock dedicated NOC and devops engineering team monitoring multi-cloud server clusters, handling real-time database failover, and providing dedicated WhatsApp escalation.',
    fullDesc: 'Round-the-clock dedicated NOC and devops engineering team monitoring multi-cloud server clusters, handling real-time database failover, and providing dedicated WhatsApp escalation.',
    client: 'Apex Global Financial Payments & B2B SaaS',
    impactMetrics: [
      { label: 'P1 Incident SLA', value: '<15 Minutes' },
      { label: 'Automated Failover', value: '<30 Seconds' },
      { label: 'System Availability', value: '99.98%' }
    ],
    technologies: ['Cloudflare Enterprise', 'AWS CloudWatch', 'PagerDuty', 'Linux / Docker', 'Zero Trust Access', 'Prometheus'],
    caseStudyUrl: '/work/enterprisecare-247-cloud-infrastructure-support',
    overview: 'Provided outsourced 24/7 level-3 infrastructure engineering support for a fintech platform processing thousands of payments around the clock.',
    problem: 'Internal engineering team suffered from on-call burnout from waking up to midnight false alerts, resulting in turnover and delayed roadmap features.',
    solution: 'Assumed full 24/7 NOC monitoring responsibility with certified devops engineers triaging server telemetry, tuning alert thresholds, and executing automated runbooks.',
    keyOutcomes: [
      'Guaranteed sub-15 minute response time for critical Priority-1 infrastructure alerts',
      'Eliminated 92% of non-actionable noise through intelligent PagerDuty alert grouping',
      'Client internal engineers achieved 100% undisturbed nights and weekends'
    ]
  },
  {
    id: 'securedesk-hybrid-workforce-it-support',
    slug: 'securedesk-hybrid-workforce-it-support',
    title: 'SecureDesk - Hybrid Workforce IT Operations & Remote Device Management Support',
    serviceSlug: 'managed-it-support',
    serviceName: 'Managed IT Support & Infrastructure Services',
    category: 'security',
    categoryLabel: 'IT Helpdesk • Remote Team',
    badge: 'Managed IT Helpdesk',
    urlPreview: 'helpdesk.cognitivewave-labs.com',
    image: '/assets/images/projects/securedesk-support.svg',
    shortDesc: 'Managed workplace IT operations managing secure single sign-on (SSO), remote endpoint patch deployment, and rapid user onboarding for a globally distributed engineering team.',
    fullDesc: 'Managed workplace IT operations managing secure single sign-on (SSO), remote endpoint patch deployment, and rapid user onboarding for a globally distributed engineering team.',
    client: 'CognitiveWave AI & Engineering Labs (250 Staff)',
    impactMetrics: [
      { label: 'Ticket Resolution', value: '<35 Minutes' },
      { label: 'Device Compliance', value: '100%' },
      { label: 'Employee Onboarding', value: '1 Day' }
    ],
    technologies: ['Zero Trust Access', 'Okta SSO', 'MDM Policy', 'Automated Patching', 'Slack Helpdesk Bot', 'Zendesk'],
    caseStudyUrl: '/work/securedesk-hybrid-workforce-it-support',
    overview: 'Managed IT support and zero-trust device management operations supporting 250 remote software engineers and data scientists across 4 continents.',
    problem: 'New engineer laptop provisioning took over 8 days, while ex-employee account deactivations were delayed, posing serious data security vulnerabilities.',
    solution: 'Deployed centralized Mobile Device Management (MDM) with automated Okta SSO provisioning, self-service software portals, and instant 1-click offboarding.',
    keyOutcomes: [
      'Reduced new employee IT setup time from 8 days to under 24 hours',
      'Instant offboarding revocation eliminating unauthorized residual access risks',
      'Average support ticket resolution time lowered to under 35 minutes via dedicated Slack bot'
    ]
  }
];

export const getProjectBySlug = (slug: string): ProjectItem | undefined => {
  return portfolioData.find((p) => p.slug === slug);
};

export const getProjectsByService = (serviceSlug: string): ProjectItem[] => {
  return portfolioData.filter((p) => p.serviceSlug === serviceSlug);
};


export const getFeaturedProjects = (): ProjectItem[] => {
  return portfolioData.filter((p) => p.featured);
};
