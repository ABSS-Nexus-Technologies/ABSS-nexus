export interface SolutionItem {
  id: string;
  hash: string;
  category: 'Enterprise Architecture' | 'Integration & Growth';
  title: string;
  tagline: string;
  description: string;
  features: string[];
  metrics: string;
}

export const solutionsData: SolutionItem[] = [
  {
    id: 'automation',
    hash: 'automation',
    category: 'Enterprise Architecture',
    title: 'Business Process Automation',
    tagline: 'Custom workflow engines & queue automation',
    description: 'Eliminate manual paperwork, redundant data entry, and communication lag with bespoke queue handlers, automated document generation, and direct CRM integrations.',
    features: ['Workflow Orchestration', 'Document Auto-Generation', 'Audit Log Trail', 'Trigger-based Notifications'],
    metrics: '70% reduction in manual cycle times'
  },
  {
    id: 'platforms',
    hash: 'platforms',
    category: 'Enterprise Architecture',
    title: 'Custom Software Platforms',
    tagline: 'Tailored relational databases & admin controls',
    description: 'Purpose-built software platforms designed to mirror your unique operational model with granular role permissions, real-time analytics, and zero software lock-in.',
    features: ['Custom Admin Dashboards', 'Role-Based Access Control', 'Cloudflare D1 Storage', 'High-Concurrency Backends'],
    metrics: '99.9% operational availability'
  },
  {
    id: 'cloud',
    hash: 'cloud',
    category: 'Enterprise Architecture',
    title: 'Cloud Adoption & Modernization',
    tagline: 'Serverless edge networks & zero downtime',
    description: 'Transition from expensive, fragile dedicated servers to globally distributed serverless edge networks that scale seamlessly with traffic demands.',
    features: ['Global CDN Caching', 'Automated CI/CD Pipelines', 'Zero-Downtime Rollouts', 'Disaster Recovery'],
    metrics: 'Up to 60% cloud cost reduction'
  },
  {
    id: 'api',
    hash: 'api',
    category: 'Integration & Growth',
    title: 'Connected Systems & APIs',
    tagline: 'Secure REST bridges & CRM synchronization',
    description: 'Unify isolated third-party tools, accounting software, and external supplier APIs into a coherent, real-time data ecosystem.',
    features: ['Idempotent Webhooks', 'Data Normalization Layer', 'Rate Limiting & Queuing', 'Encrypted Payload Delivery'],
    metrics: '<50ms average middleware latency'
  },
  {
    id: 'conversion',
    hash: 'conversion',
    category: 'Integration & Growth',
    title: 'High-Conversion Experiences',
    tagline: 'Sub-second performance & instant inquiries',
    description: 'Engineer consumer and business touchpoints optimized for frictionless inquiry flows, rapid mobile loading speeds, and verified conversion patterns.',
    features: ['Sub-Second TTFB', 'One-Tap WhatsApp Paths', 'Mobile Viewport Perfection', 'Accessibility Compliance'],
    metrics: '+42% increase in qualified inquiries'
  },
  {
    id: 'strategy',
    hash: 'strategy',
    category: 'Integration & Growth',
    title: 'Strategic Digital Transformation',
    tagline: 'Architecture audits & phased delivery roadmaps',
    description: 'Founder-level technology consulting providing technical due diligence, modernization blueprints, and step-by-step roadmaps without disrupting active operations.',
    features: ['Legacy Codebase Auditing', 'Tech Debt Remediation', 'Cost & Capacity Forecasting', 'Vendor Selection Oversight'],
    metrics: 'Zero unplanned migration downtime'
  }
];
