export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: 'website' | 'webapp' | 'ecommerce' | 'landing';
  categoryLabel: string;
  badge: string;
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
  {
    id: 'personal-portfolio',
    slug: 'personal-portfolio',
    title: 'Personal Portfolio Platform',
    category: 'website',
    categoryLabel: 'Portfolio • Live',
    badge: 'Production',
    urlPreview: 'shubham-portfolio-abss.netlify.app',
    image: '/assets/images/personal-portfolio.png',
    shortDesc: 'Modern responsive developer and designer portfolio with interactive project showcases, sleek layouts, and smooth animations.',
    fullDesc: 'Modern responsive developer and designer portfolio with interactive project showcases, sleek layouts, and sub-second page transitions.',
    client: 'Founder Portfolio Showcase',
    impactMetrics: [
      { label: 'PageSpeed Score', value: '100/100' },
      { label: 'Load Time', value: '<350ms' },
      { label: 'Conversion Lift', value: '+35%' }
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Netlify Edge'],
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
    id: 'analytics-dashboard',
    slug: 'cloud-analytics-dashboard',
    title: 'Cloud Analytics & Admin Dashboard',
    category: 'webapp',
    categoryLabel: 'Web App • Demonstration',
    badge: 'Demo Showcase',
    urlPreview: 'abssnexus.in/analytics/dashboard',
    image: '/assets/images/project-dashboard-ui.png',
    shortDesc: 'Enterprise administration panel featuring metrics telemetry, user management, interactive chart widgets, and real-time data status.',
    fullDesc: 'Enterprise administration panel featuring metrics telemetry, user management, interactive chart widgets, and real-time database synchronization.',
    client: 'FinEdge Labs & Enterprise Internal Tools',
    impactMetrics: [
      { label: 'Query Latency', value: '<45ms' },
      { label: 'Admin Efficiency', value: '3.2x faster' },
      { label: 'Uptime SLA', value: '99.95%' }
    ],
    technologies: ['TypeScript', 'REST APIs', 'Cloudflare D1', 'Tailwind CSS', 'Chart.js'],
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
    id: 'ecommerce-retail',
    slug: 'ecommerce-headless-storefront',
    title: 'E-Commerce Headless Storefront',
    category: 'ecommerce',
    categoryLabel: 'Storefront • Demonstration',
    badge: 'Case Study',
    urlPreview: 'abssnexus.in/storefront/retail',
    image: '/assets/images/project-ecommerce-demo.png',
    shortDesc: 'Streamlined shopping experience with responsive grid layouts, product showcase modals, intuitive carts, and conversion-optimized flow.',
    fullDesc: 'Streamlined shopping experience with responsive grid layouts, product showcase modals, intuitive carts, and conversion-optimized flow.',
    client: 'Heritage Crafts India & D2C Brands',
    impactMetrics: [
      { label: 'Inquiry Lift', value: '+42%' },
      { label: 'Cart Speed', value: '<250ms' },
      { label: 'Mobile Checkout', value: '1-Tap WhatsApp' }
    ],
    technologies: ['Next.js', 'Responsive UI', 'Product Catalog', 'Cart Engine', 'Razorpay'],
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
    id: 'fintech-gateway',
    slug: 'fintech-payment-gateway',
    title: 'Fintech Payment Gateway & Transaction Reconciliation',
    category: 'webapp',
    categoryLabel: 'Fintech • Architecture',
    badge: 'Enterprise Case Study',
    urlPreview: 'abssnexus.in/work/fintech-payment-gateway',
    image: '/assets/images/project-dashboard-ui.png',
    shortDesc: 'Mission-critical payment gateway integration with idempotent webhook processing, automated reconciliation, and instant dispute alerts.',
    fullDesc: 'Mission-critical payment gateway integration with idempotent webhook processing, automated reconciliation, and instant dispute alerts.',
    client: 'Fintech Infrastructure Series',
    impactMetrics: [
      { label: 'Discrepancy Rate', value: '0.00%' },
      { label: 'Webhook Processing', value: '<30ms' },
      { label: 'Audit Compliance', value: '100%' }
    ],
    technologies: ['Node.js', 'PostgreSQL', 'Cloudflare Workers', 'Razorpay API', 'Zod'],
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
    id: 'healthcare-telemedicine',
    slug: 'healthcare-telemedicine-platform',
    title: 'Healthcare Telemedicine & Doctor Scheduling Hub',
    category: 'webapp',
    categoryLabel: 'Healthcare • HIPAA-Ready',
    badge: 'Enterprise Case Study',
    urlPreview: 'abssnexus.in/work/healthcare-telemedicine',
    image: '/assets/images/personal-portfolio.png',
    shortDesc: 'Encrypted patient consultation platform with real-time doctor availability calendars, automated appointment reminders, and digital prescription archives.',
    fullDesc: 'Encrypted patient consultation platform with real-time doctor availability calendars, automated appointment reminders, and digital prescription archives.',
    client: 'Apex Health Systems & Clinical Practices',
    impactMetrics: [
      { label: 'No-Show Rate', value: '-65%' },
      { label: 'Booking Time', value: '<45 sec' },
      { label: 'Security Grade', value: 'A+' }
    ],
    technologies: ['Next.js', 'WebRTC', 'Cloudflare D1', 'Twilio API', 'TypeScript'],
    caseStudyUrl: '/work/healthcare-telemedicine-platform',
    overview: 'Built a compliant, streamlined patient scheduling and teleconsultation platform connecting doctors and patients seamlessly.',
    problem: 'Reception phone lines were overwhelmed with booking calls, resulting in frequent missed appointments and double-bookings.',
    solution: 'Developed an intuitive multi-specialty calendar booking portal with SMS/WhatsApp confirmations and encrypted digital document lockers.',
    keyOutcomes: [
      '65% drop in missed patient appointments',
      'Average booking completed in under 45 seconds',
      'Zero patient data exposure with end-to-end encryption'
    ]
  }
];

export const getProjectBySlug = (slug: string): ProjectItem | undefined => {
  return portfolioData.find((p) => p.slug === slug);
};
