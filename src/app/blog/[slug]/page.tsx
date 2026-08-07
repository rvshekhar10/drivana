import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/xrmlite";
import ArticleClient from "./ArticleClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);

  if (!result.success || !result.data) {
    return { title: "Article Not Found" };
  }

  const article = result.data;
  const title = article.meta_title || `${article.title} | DRIVANA Blog`;
  const description =
    article.meta_description || article.excerpt;

  return {
    title,
    description,
    keywords: article.tags.map((t) => t.name),
    openGraph: {
      title: article.meta_title || article.title,
      description,
      url: `https://www.drivana.co.in/blog/${article.slug}`,
      type: "article",
      publishedTime: article.published_at,
      modifiedTime: article.updated_at || article.published_at,
      authors: article.author_name ? [article.author_name] : undefined,
      images: article.og_image || article.featured_image
        ? [{ url: (article.og_image || article.featured_image)! }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta_title || article.title,
      description,
      images: article.og_image || article.featured_image
        ? [(article.og_image || article.featured_image)!]
        : undefined,
    },
    alternates: {
      canonical:
        article.canonical_url || `https://www.drivana.co.in/blog/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const article = result.data;

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image || article.og_image,
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    author: {
      "@type": "Person",
      name: article.author_name || "DRIVANA",
    },
    publisher: {
      "@type": "Organization",
      name: "DRIVANA",
      logo: {
        "@type": "ImageObject",
        url: "https://www.drivana.co.in/drivana-logo-patna.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.drivana.co.in/blog/${article.slug}`,
    },
    keywords: article.tags.map((t) => t.name).join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleClient article={article} />
    </>
  );
}
