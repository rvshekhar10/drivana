"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Car,
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Timer,
  Star,
  X,
  Hash,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { fetchMyBookings, cancelBooking, submitReview } from "@/lib/api-client";
import type { Booking, BookingStatus } from "@/types/xrmlite";

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  pending: { label: "Pending", color: "text-amber-400 bg-amber-400/10 border-amber-400/20", icon: Clock },
  confirmed: { label: "Confirmed", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: CheckCircle2 },
  active: { label: "Active", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: Timer },
  completed: { label: "Completed", color: "text-white/60 bg-white/5 border-white/10", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "text-red-400 bg-red-400/10 border-red-400/20", icon: XCircle },
};

export default function MyBookingsClient() {
  const { isLoggedIn, loading: authLoading, openLoginModal } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<number | null>(null);

  // Review modal state
  const [reviewBookingId, setReviewBookingId] = useState<number | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    async function loadBookings() {
      setLoading(true);
      const result = await fetchMyBookings();
      if (result.success && result.data) {
        setBookings(result.data);
      } else {
        setError(result.error?.message || "Failed to load bookings");
      }
      setLoading(false);
    }

    loadBookings();
  }, [isLoggedIn, authLoading]);

  const handleCancel = async (bookingId: number) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setCancelling(bookingId);
    const result = await cancelBooking(bookingId);
    if (result.success) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "cancelled" as BookingStatus } : b
        )
      );
    }
    setCancelling(null);
  };

  const handleSubmitReview = async () => {
    if (!reviewBookingId) return;
    setReviewLoading(true);
    const result = await submitReview({
      bookingId: reviewBookingId,
      rating: reviewRating,
      title: reviewTitle || undefined,
      reviewText: reviewText || undefined,
    });
    setReviewLoading(false);
    if (result.success) {
      setReviewSuccess(true);
      setTimeout(() => {
        setReviewBookingId(null);
        setReviewSuccess(false);
        setReviewRating(5);
        setReviewTitle("");
        setReviewText("");
      }, 1500);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold">My Bookings</h1>
            <p className="text-white/50 mt-2 text-sm">
              Track and manage your car rentals
            </p>
          </motion.div>

          {/* Not logged in */}
          {!authLoading && !isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Car size={28} className="text-gold" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Login to view your bookings
              </h2>
              <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">
                Sign in to see your upcoming and past car rentals
              </p>
              <button
                onClick={openLoginModal}
                className="bg-gold hover:bg-gold-light text-black font-bold px-8 py-3 rounded-xl text-sm transition-all"
              >
                Login / Sign Up
              </button>
            </motion.div>
          )}

          {/* Loading */}
          {loading && isLoggedIn && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-gold/60" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
              <AlertCircle size={18} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && isLoggedIn && bookings.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Calendar size={28} className="text-white/40" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                No bookings yet
              </h2>
              <p className="text-white/50 text-sm mb-6">
                Book your first self-drive car from our fleet
              </p>
              <a
                href="/fleet"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-8 py-3 rounded-xl text-sm transition-all"
              >
                <Car size={16} />
                Browse Fleet
              </a>
            </motion.div>
          )}

          {/* Bookings list */}
          {!loading && bookings.length > 0 && (
            <div className="space-y-4">
              {bookings.map((booking, index) => {
                const statusConfig = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;
                const StatusIcon = statusConfig.icon;
                const canCancel = booking.status === "pending" || booking.status === "confirmed";
                const canReview = booking.status === "completed";

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 hover:border-white/10 transition-all cursor-pointer"
                    onClick={() => window.location.href = `/my-bookings/${booking.id}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Left: Booking info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-white">
                            {booking.asset?.name || `Booking #${booking.id}`}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}
                          >
                            <StatusIcon size={12} />
                            {statusConfig.label}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-gold/60" />
                            {formatDate(booking.start_date)} →{" "}
                            {formatDate(booking.end_date)}
                          </span>
                          {booking.booking_number && (
                            <span className="flex items-center gap-1 text-white/30 text-xs">
                              <Hash size={11} />
                              {booking.booking_number}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Amount + Actions */}
                      <div className="text-right space-y-2">
                        <p className="text-xl font-bold text-gold">
                          ₹{booking.total_amount?.toLocaleString() || "—"}
                        </p>
                        <p className="text-xs text-white/30">
                          Booked {formatDate(booking.created_at)}
                        </p>

                        <div className="flex gap-2 justify-end mt-2">
                          {canCancel && (
                            <button
                              onClick={() => handleCancel(booking.id)}
                              disabled={cancelling === booking.id}
                              className="text-xs text-red-400/70 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                            >
                              {cancelling === booking.id ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                "Cancel"
                              )}
                            </button>
                          )}
                          {canReview && (
                            <button
                              onClick={() => setReviewBookingId(booking.id)}
                              className="text-xs text-gold/70 hover:text-gold border border-gold/20 hover:border-gold/40 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
                            >
                              <Star size={11} />
                              Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewBookingId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setReviewBookingId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6"
            >
              <button
                onClick={() => setReviewBookingId(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Close review modal"
              >
                <X size={16} className="text-white/60" />
              </button>

              {reviewSuccess ? (
                <div className="text-center py-6">
                  <CheckCircle2 size={40} className="text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white">Thank you!</h3>
                  <p className="text-white/50 text-sm mt-1">Your review has been submitted.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Rate Your Experience
                  </h3>
                  <p className="text-white/50 text-sm mb-6">
                    How was your ride? Your feedback helps us improve.
                  </p>

                  {/* Star rating */}
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1"
                      >
                        <Star
                          size={28}
                          className={`transition-colors ${
                            star <= reviewRating
                              ? "text-gold fill-gold"
                              : "text-white/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Title */}
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Review title (optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 mb-3"
                  />

                  {/* Review text */}
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us about your experience..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 resize-none mb-4"
                  />

                  <button
                    onClick={handleSubmitReview}
                    disabled={reviewLoading}
                    className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-50 text-black font-bold py-3.5 rounded-xl text-sm transition-all"
                  >
                    {reviewLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <Star size={14} />
                        Submit Review
                      </>
                    )}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
