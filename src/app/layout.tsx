import type { Metadata } from 'next';
import Script from 'next/script';
import '@/src/styles/styles.css';
import '@/src/styles/theme-toggle.css';
import '@/src/styles/modern-bento.css';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import FloatingWhatsApp from '@/src/components/FloatingWhatsApp';

export const metadata: Metadata = {
  metadataBase: new URL('https://abssnexus.in'),
  title: {
    default: 'ABSS Nexus Technologies | Enterprise IT Services & Digital Solutions',
    template: '%s | ABSS Nexus Technologies',
  },
  description:
    'ABSS Nexus Technologies provides enterprise IT services, modern software development, cloud infrastructure, and intelligent automation systems.',
  keywords: [
    'Enterprise IT Services',
    'Custom Software Development',
    'Web Engineering',
    'Cloud Computing',
    'Next.js Development',
    'Jaipur IT Company',
    'MSME Digital Solutions',
    'UI/UX Design',
    'Mobile App Development'
  ],
  authors: [{ name: 'Shubham Kumar', url: 'https://abssnexus.in' }],
  creator: 'ABSS Nexus Technologies',
  publisher: 'ABSS Nexus Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://abssnexus.in/',
    siteName: 'ABSS Nexus Technologies',
    title: 'ABSS Nexus Technologies | Enterprise IT Services & Digital Solutions',
    description:
      'ABSS Nexus Technologies builds enterprise software, cloud applications, high-performance web platforms, and tailored digital solutions for growing businesses in India and worldwide.',
    images: [
      {
        url: '/assets/images/LogoGenerated.png',
        width: 1200,
        height: 630,
        alt: 'ABSS Nexus Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABSS Nexus Technologies | Enterprise IT Services & Digital Solutions',
    description:
      'ABSS Nexus Technologies builds enterprise software, cloud applications, high-performance web platforms, and tailored digital solutions.',
    images: ['/assets/images/LogoGenerated.png'],
    creator: '@abssnexus',
  },
  icons: {
    icon: [
      { url: '/assets/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/images/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ABSS Nexus Technologies',
    url: 'https://abssnexus.in/',
    logo: 'https://abssnexus.in/assets/images/LogoGenerated.png',
    description:
      'Enterprise IT services, custom software development, cloud infrastructure, and digital consulting.',
    email: 'abssnexus@gmail.com',
    telephone: '+91 8757928673',
    sameAs: [
      'https://instagram.com/abssnexus',
      'https://twitter.com/abssnexus',
      'https://facebook.com/abssnexus',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('abss_theme');
                  var theme = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark-theme');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="abss-bento-app">
        <div className="ambient-mesh-glow" aria-hidden="true" />
        <div className="ambient-grid-pattern" aria-hidden="true" />
        <div className="app-wrapper">
          <Header />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </div>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7TGL0VYJX2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7TGL0VYJX2', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          `}
        </Script>
      </body>
    </html>
  );
}
