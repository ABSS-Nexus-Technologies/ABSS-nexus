import { MetadataRoute } from 'next';
import { servicesData } from '@/src/lib/data/services';
import { portfolioData } from '@/src/lib/data/work';
import { blogPosts } from '@/src/lib/data/blog';
import { careerRoles } from '@/src/lib/data/careers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abssnexus.in';
  const lastModified = new Date();

  // Canonical Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/solutions`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/industries`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // 16 Service Detail routes
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Portfolio case study routes
  const workRoutes: MetadataRoute.Sitemap = portfolioData.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Blog post routes
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // Career routes
  const careerRouteList: MetadataRoute.Sitemap = careerRoles.map((c) => ({
    url: `${baseUrl}/careers/${c.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...blogRoutes, ...careerRouteList];
}
