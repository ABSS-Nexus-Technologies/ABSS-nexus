export interface CareerRole {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}

export const careerRoles: CareerRole[] = [
  {
    slug: 'senior-fullstack-engineer',
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Jaipur, Rajasthan / Remote (India)',
    type: 'Full-Time',
    experience: '3+ Years',
    overview: 'Lead the architecture and implementation of scalable web applications, serverless edge workers, and client portals using modern TypeScript and React ecosystems.',
    responsibilities: [
      'Design and deploy resilient, high-performance web applications and REST APIs',
      'Architect relational database schemas using Cloudflare D1 and PostgreSQL',
      'Optimize frontend bundles for sub-second Core Web Vitals performance',
      'Collaborate directly with founders and clients to translate product roadmaps into code'
    ],
    requirements: [
      '3+ years of professional experience with React, Next.js, TypeScript, and Node.js',
      'Demonstrated mastery of modern CSS, responsive layouts, and accessibility standards',
      'Solid understanding of cloud edge architectures (Cloudflare Workers, serverless functions)',
      'Clear, proactive written and verbal communication skills'
    ],
    perks: [
      'Competitive compensation with performance bonuses',
      'Flexible remote-friendly work environment',
      'Direct founder mentorship and technical autonomy',
      'Latest hardware and productivity tool allowances'
    ]
  },
  {
    slug: 'lead-ui-ux-designer',
    title: 'Lead UI/UX Designer',
    department: 'Design',
    location: 'Jaipur, Rajasthan / Hybrid',
    type: 'Full-Time',
    experience: '2+ Years',
    overview: 'Own the end-to-end design lifecycle for enterprise client applications, marketing web properties, and internal product design systems in Figma.',
    responsibilities: [
      'Create high-fidelity wireframes, interactive Figma prototypes, and design specs',
      'Develop and maintain comprehensive design systems with reusable tokens',
      'Conduct user testing sessions to identify and resolve interaction bottlenecks',
      'Work closely with engineers to ensure pixel-perfect, accessible component delivery'
    ],
    requirements: [
      '2+ years designing modern SaaS dashboards, web apps, and digital platforms',
      'Expertise in Figma (auto-layout, components, variants, variables, prototyping)',
      'Deep understanding of WCAG accessibility guidelines and typography rules',
      'A strong design portfolio showcasing clean visual hierarchy and usability'
    ],
    perks: [
      'Creative freedom to establish and evolve brand guidelines',
      'Modern workspace with high-resolution displays',
      'Conference and design course sponsorship',
      'Flexible hours focused on deliverables rather than time clocks'
    ]
  },
  {
    slug: 'cloud-devops-architect',
    title: 'Cloud & DevOps Architect',
    department: 'Infrastructure',
    location: 'Remote (India)',
    type: 'Full-Time',
    experience: '3+ Years',
    overview: 'Design, secure, and automate global edge networks, multi-stage CI/CD pipelines, containerized microservices, and 24/7 telemetry monitoring.',
    responsibilities: [
      'Manage and optimize Cloudflare edge routing, WAF rules, and worker distributions',
      'Build automated GitHub Actions CI/CD workflows for multi-environment staging',
      'Implement zero-trust security postures, automated audits, and disaster recovery drills',
      'Monitor application latency and error rates with Sentry and CloudWatch'
    ],
    requirements: [
      '3+ years working with cloud infrastructure (AWS, Cloudflare, Docker, Linux)',
      'Experience scripting with Bash, Python, or TypeScript',
      'Strong grasp of SSL/TLS, DNS records, CSP headers, and network protocols',
      'Proven background in incident response and high-availability SLA operations'
    ],
    perks: [
      'Industry-leading remote compensation package',
      'Cloud certification sponsorship (AWS, Cloudflare, Linux Foundation)',
      'Health insurance and wellness allowances',
      'Collaborative, engineering-first culture with zero bureaucracy'
    ]
  }
];

export const getCareerBySlug = (slug: string): CareerRole | undefined => {
  return careerRoles.find((c) => c.slug === slug);
};
