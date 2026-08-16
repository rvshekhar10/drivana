import { MetadataRoute } from "next";
import { getArticles, getXRMListings } from "@/lib/xrmlite";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.drivana.co.in";

  // Fetch cars from API
  let carPages: MetadataRoute.Sitemap = [];
  try {
    const carsRes = await getXRMListings();
    if (carsRes.success && carsRes.data) {
      carPages = carsRes.data.map((asset) => {
        const featured = asset.media?.find((m) => m.is_featured);
        return {
          url: `${baseUrl}/cars/${asset.slug}`,
          lastModified: new Date(asset.updated_at || asset.created_at || Date.now()),
          changeFrequency: "weekly" as const,
          priority: 0.9,
          ...(featured ? { images: [`${baseUrl}${featured.url}`] } : {}),
        };
      });
    }
  } catch {
    // API unavailable
  }

  // Fetch blog articles for sitemap
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const articlesRes = await getArticles({ limit: 100 });
    if (articlesRes.success && articlesRes.data) {
      blogPages = articlesRes.data.map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.published_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        ...(article.featured_image
          ? { images: [article.featured_image] }
          : {}),
      }));
    }
  } catch {
    // CMS unavailable
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/fleet`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/safety`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
  ];

  return [...staticPages, ...carPages, ...blogPages];
}
