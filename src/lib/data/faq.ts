export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqList: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What kinds of websites and digital solutions does ABSS Nexus Technologies build?',
    answer: 'We build professional business websites, modern landing pages, personal portfolios, institutional portals, and custom web applications. Each project is customized for speed, clean UI/UX, and mobile responsiveness.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How long does an average website or software project take to launch?',
    answer: 'Landing pages and starter websites typically take between 3 to 7 business days. Full multi-page business websites and custom portals generally require 1 to 3 weeks depending on scope, content preparation, and custom features.',
    category: 'Process'
  },
  {
    id: 'faq-3',
    question: 'Can you redesign or speed up an existing website without losing SEO rankings?',
    answer: 'Yes. We frequently modernize outdated websites, reconstruct bloated codebases for faster loading speeds, optimize mobile responsiveness, and enhance conversion elements while strictly preserving existing canonical URLs and search rankings.',
    category: 'Services'
  },
  {
    id: 'faq-4',
    question: 'Who owns the code and intellectual property once the project is finished?',
    answer: 'You retain 100% full ownership of all custom code, assets, database architectures, and design files upon milestone delivery. We provide full repository access and deployment documentation with zero proprietary lock-in.',
    category: 'Legal'
  },
  {
    id: 'faq-5',
    question: 'How are project payments and milestone stages structured?',
    answer: 'We believe in total financial transparency. Projects are split into structured milestones: an initial kickoff deposit, mid-point prototype review, and final settlement upon staging approval before production launch.',
    category: 'Pricing'
  },
  {
    id: 'faq-6',
    question: 'Do you provide ongoing technical support and maintenance after deployment?',
    answer: 'Yes. We offer managed monthly maintenance plans that cover 24/7 uptime monitoring, daily backups, security and dependency updates, speed audits, and dedicated engineering hours for content updates.',
    category: 'Support'
  }
];
