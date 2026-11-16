/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/refund-policy",
        destination: "/terms-and-conditions#refund-policy",
        permanent: true,
      },
      {
        source: "/support-policy",
        destination: "/terms-and-conditions#support-policy",
        permanent: true,
      },
      {
        source: "/disclaimer",
        destination: "/terms-and-conditions#disclaimer",
        permanent: true,
      },
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/public/:path*",
        destination: "/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
