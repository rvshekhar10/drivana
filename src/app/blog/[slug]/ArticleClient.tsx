"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  BookOpen,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import type { CMSArticle } from "@/types/xrmlite";

interface ArticleClientProps {
  article: CMSArticle;
}

export default function ArticleClient({ article }: ArticleClientProps) {
  const [tocOpen, setTocOpen] = useState(false);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const handleShare = async () => {
    const url = `https://www.drivana.co.in/blog/${article.slug}`;
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-gold transition-colors">
              Blog
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/60 truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="px-4 sm:px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Collection badge */}
            {article.collection && (
              <Link
                href={`/blog?collection=${article.collection.id}`}
                className="inline-block text-gold text-xs font-medium tracking-wider uppercase mb-4 hover:text-gold-light transition-colors"
              >
                {article.collection.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
              {article.author_name && (
                <div className="flex items-center gap-2">
                  {article.author_avatar ? (
                    <Image
                      src={article.author_avatar}
                      alt={article.author_name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-gold text-xs font-bold">
                        {article.author_name[0]}
                      </span>
                    </div>
                  )}
                  <span className="text-white/70">{article.author_name}</span>
                </div>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(article.published_at)}
              </span>
              {article.reading_time && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {article.reading_time} min read
                </span>
              )}
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-gold transition-colors ml-auto"
              >
                <Share2 size={13} />
                Share
              </button>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-white/50 bg-white/[0.04] hover:bg-gold/10 hover:text-gold border border-white/[0.06] hover:border-gold/20 px-2.5 py-1 rounded-full transition-all"
                  >
                    <Tag size={10} />
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          {/* Featured Image */}
          {article.featured_image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative h-[300px] sm:h-[400px] md:h-[480px] rounded-2xl overflow-hidden mb-10"
            >
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </motion.div>
          )}
        </div>
      </header>

      {/* Content Area */}
      <div className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Table of Contents (sidebar on desktop) */}
          {article.toc.length > 0 && (
            <aside className="lg:w-64 shrink-0 lg:sticky lg:top-24 lg:self-start">
              {/* Mobile TOC toggle */}
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="lg:hidden w-full flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 mb-4"
              >
                <span className="flex items-center gap-2 text-sm text-white/70">
                  <BookOpen size={14} className="text-gold" />
                  Table of Contents
                </span>
                <ChevronRight
                  size={14}
                  className={`text-white/40 transition-transform ${
                    tocOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* TOC list */}
              <nav
                className={`space-y-1 ${
                  tocOpen ? "block" : "hidden"
                } lg:block bg-white/[0.02] border border-white/[0.06] rounded-xl p-4`}
              >
                <p className="hidden lg:block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Contents
                </p>
                {article.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm text-white/50 hover:text-gold transition-colors py-1 ${
                      item.level === 2
                        ? "pl-0"
                        : item.level === 3
                        ? "pl-4"
                        : "pl-8"
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </aside>
          )}

          {/* Article Body */}
          <article className="flex-1 min-w-0">
            <div
              className="prose prose-invert prose-gold max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-5
                prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-li:text-white/70
                prose-img:rounded-xl prose-img:border prose-img:border-white/10
                prose-blockquote:border-gold/40 prose-blockquote:text-white/60
                prose-code:text-gold/80 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl"
              dangerouslySetInnerHTML={{ __html: article.content_html }}
            />
          </article>
        </div>
      </div>

      {/* Related Articles */}
      {article.related_articles && article.related_articles.length > 0 && (
        <section className="py-16 px-4 sm:px-6 border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.related_articles.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-gold/30 transition-all"
                >
                  <div className="relative h-36 bg-gradient-to-br from-white/5 to-transparent">
                    {related.featured_image ? (
                      <Image
                        src={related.featured_image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen size={24} className="text-white/10" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-white group-hover:text-gold transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      Read more <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to blog */}
      <div className="px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-gold text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back to all articles
          </Link>
        </div>
      </div>

      <CTABanner />
      <Footer />
    </main>
  );
}
