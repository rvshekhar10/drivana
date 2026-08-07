import { Metadata } from "next";
import { getArticles, getCollections, getTags } from "@/lib/xrmlite";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog - Self Drive Car Tips, Travel Guides & Patna Updates",
  description:
    "Read the latest from DRIVANA — self-drive car rental tips, road trip guides from Patna, travel itineraries to Rajgir, Bodh Gaya & more. Expert advice for hassle-free car rentals in Bihar.",
  keywords: [
    "drivana blog",
    "self drive car tips patna",
    "road trip guides bihar",
    "patna travel blog",
    "car rental tips india",
    "self drive travel guide",
    "rajgir road trip",
    "bodh gaya travel",
  ],
  openGraph: {
    title: "Blog | DRIVANA - Self Drive Car Rental Patna",
    description:
      "Tips, guides, and updates for self-drive car rentals in Patna, Bihar.",
    url: "https://www.drivana.co.in/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://www.drivana.co.in/blog",
  },
};

export default async function BlogPage() {
  // Fetch data server-side for SEO — wrapped in try-catch for build safety
  let articles: Awaited<ReturnType<typeof getArticles>>["data"] = [];
  let collections: Awaited<ReturnType<typeof getCollections>>["data"] = [];
  let tags: Awaited<ReturnType<typeof getTags>>["data"] = [];

  try {
    const [articlesRes, collectionsRes, tagsRes] = await Promise.all([
      getArticles({ limit: 20 }),
      getCollections(),
      getTags(),
    ]);

    articles = articlesRes.data || [];
    collections = collectionsRes.data || [];
    tags = tagsRes.data || [];
  } catch {
    // API unavailable at build time — render empty state
  }

  return (
    <BlogListClient
      initialArticles={articles || []}
      collections={collections || []}
      tags={tags || []}
    />
  );
}
