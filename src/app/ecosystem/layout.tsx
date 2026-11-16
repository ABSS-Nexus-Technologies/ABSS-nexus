import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Conglomerate Ecosystem & Ventures | ABSS Nexus Technologies',
  description:
    'Discover the ABSS Nexus Technologies corporate ecosystem: Global IT Services, Proprietary Business SaaS (ABSS ERP, CRM & HRM), and the IntenNexus talent incubator.',
  keywords: [
    'ABSS Nexus Technologies',
    'ABSS Ecosystem',
    'ABSS ERP',
    'ABSS CRM',
    'ABSS HRM',
    'IntenNexus',
    'Business SaaS India',
    'Enterprise IT Services'
  ],
};

export default function EcosystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
