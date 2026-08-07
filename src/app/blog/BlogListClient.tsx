"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Tag,
  Filter,
  BookOpen,
  Calendar,
  ArrowRight,
  Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import type { CMSArticleSummary, CMSCollection, CMSTag } from "@/types/xrmlite";

interface BlogListClientProps {
  initialArticles?: CMSArticleSummary[];
  collections?: CMSCollection[];
  tags?: CMSTag[];
}

export default function BlogListClient({
  initialArticles = [],
  collections = [],
  tags = [],
}: BlogListClientProps) {
  const [activeCollection, setActiveCollection] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    let filtered = initialArticles || [];

    if (activeCollection) {
      filtered = filtered.filter(
        (a) => a.collection?.id === activeCollection
      );
    }

    if (activeTag) {
      filtered = filtered.filter((a) =>
        (a.tags || []).some((t) => t.slug === activeTag)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [initialArticles, activeCollection, activeTag, searchQuery]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-gold text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4"
          >
            Blog & Guides
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            Drive Smarter, <span className="text-gold">Travel Further</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-4 text-white/50 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Self-drive tips, road trip guides, and travel inspiration from Patna
            & Bihar.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 sm:top-20 z-40 bg-black/95 backdrop-blur-md border-b border-white/5 py-4 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-3">
          {/* Search */}
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
            />
          </div>

          {/* Collections */}
          {collections.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter size={14} className="text-white/40 shrink-0" />
              <button
                onClick={() => setActiveCollection(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCollection === null
                    ? "bg-gold text-black"
                    : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                }`}
              >
                All
              </button>
              {collections.map((col) => (
                <button
                  key={col.id}
                  onClick={() =>
                    setActiveCollection(
                      activeCollection === col.id ? null : col.id
                    )
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeCollection === col.id
                      ? "bg-gold text-black"
                      : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {col.name}
                </button>
              ))}
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto">
              <Tag size={14} className="text-white/40 shrink-0" />
              {tags.slice(0, 10).map((tag) => (
                <button
                  key={tag.id}
                  onClick={() =>
                    setActiveTag(activeTag === tag.slug ? null : tag.slug)
                  }
                  className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                    activeTag === tag.slug
                      ? "bg-gold/20 text-gold border border-gold/40"
                      : "bg-white/[0.03] text-white/50 hover:text-white/70 border border-white/[0.06]"
                  }`}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {filteredArticles.length > 0 ? (
            <>
              <p className="text-white/40 text-sm mb-8">
                {filteredArticles.length} article
                {filteredArticles.length !== 1 ? "s" : ""}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(206,150,61,0.06)]"
                  >
                    {/* Featured image */}
                    <Link href={`/blog/${article.slug}`} className="block">
                      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
                        {article.featured_image ? (
                          <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen
                              size={32}
                              className="text-white/10"
                            />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        {/* Collection badge */}
                        {article.collection && (
                          <div className="absolute top-3 left-3 bg-gold/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {article.collection.name}
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {formatDate(article.published_at)}
                        </span>
                        {article.reading_time && (
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {article.reading_time} min read
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <Link href={`/blog/${article.slug}`}>
                        <h2 className="text-base font-semibold text-white group-hover:text-gold transition-colors duration-300 line-clamp-2 leading-snug mb-2">
                          {article.title}
                        </h2>
                      </Link>

                      {/* Excerpt */}
                      <p className="text-white/40 text-sm line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      {(article.tags || []).length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {(article.tags || []).slice(0, 3).map((t) => (
                            <span
                              key={t.id}
                              className="text-[10px] text-white/40 bg-white/[0.04] px-2 py-0.5 rounded-full"
                            >
                              #{t.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read more */}
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-gold text-sm font-medium hover:gap-2.5 transition-all duration-200"
                      >
                        Read more
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          ) : (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <BookOpen size={28} className="text-white/30" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                No articles yet
              </h2>
              <p className="text-white/50 text-sm max-w-sm mx-auto">
                We&apos;re working on some great content. Check back soon for
                self-drive tips, travel guides, and more from Patna.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
