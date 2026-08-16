"use client";

import { useEffect, useState } from "react";
import { Star, User } from "lucide-react";
import { fetchReviews } from "@/lib/api-client";
import type { Review, ReviewSummary } from "@/types/xrmlite";

interface AssetReviewsProps {
  assetId: number;
  assetName: string;
}

export default function AssetReviews({ assetId, assetName }: AssetReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      setLoading(true);
      const result = await fetchReviews(assetId);
      if (result.success && result.data) {
        setReviews(result.data.reviews || []);
        // Handle both API naming conventions (average vs average_rating, total vs total_reviews)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = result.data.summary as any;
        if (raw) {
          setSummary({
            average_rating: raw.average_rating ?? raw.average ?? 0,
            total_reviews: raw.total_reviews ?? raw.total ?? 0,
            rating_breakdown: raw.rating_breakdown || {},
          });
        }
      }
      setLoading(false);
    }
    loadReviews();
  }, [assetId]);

  if (loading) return null;
  if (reviews.length === 0 && !summary) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="py-12 border-t border-white/[0.06]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Reviews
          </h2>
          <p className="text-white/40 text-sm mt-1">
            What customers say about the {assetName}
          </p>
        </div>

        {/* Rating summary */}
        {summary && (
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-gold fill-gold" />
              <span className="text-2xl font-bold text-white">
                {summary.average_rating?.toFixed(1) ?? "0.0"}
              </span>
            </div>
            <p className="text-xs text-white/40 mt-0.5">
              {summary.total_reviews} review{summary.total_reviews !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>

      {/* Rating breakdown bar */}
      {summary && summary.rating_breakdown && (
        <div className="space-y-1.5 mb-8 max-w-xs">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = summary.rating_breakdown[String(star)] || 0;
            const pct = summary.total_reviews > 0 ? (count / summary.total_reviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="text-white/50 w-3">{star}</span>
                <Star size={10} className="text-gold/60" />
                <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold/70 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-white/30 w-5 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Review cards */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <User size={14} className="text-gold/70" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {review.customer_name || "Customer"}
                  </p>
                  <p className="text-[10px] text-white/30">
                    {formatDate(review.created_at)}
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < review.rating
                        ? "text-gold fill-gold"
                        : "text-white/10"
                    }
                  />
                ))}
              </div>
            </div>

            {review.title && (
              <p className="text-sm font-medium text-white/90 mb-1">
                {review.title}
              </p>
            )}
            {(review.review_text || review.comment) && (
              <p className="text-sm text-white/50 leading-relaxed">
                {review.review_text || review.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
