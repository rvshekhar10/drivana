import { MetadataRoute } from "next";
import carsData from "@/data/cars.json";
import { getArticles } from "@/lib/xrmlite";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.drivana.co.in";

  const carPages = carsData.map((car) => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
    images: car.media
      .filter((m) => m.type === "image")
      .map((m) => `${baseUrl}${m.url}`),
  }));

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
    // CMS unavailable — skip blog pages in sitemap
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
      images: [`${baseUrl}/drivana-hero-image.avif`],
    },
    {
      url: `${baseUrl}/fleet`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.95,
      images: carsData.map((car) => `${baseUrl}${car.image_url}`),
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
