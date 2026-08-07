"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
  Tag,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  fetchAvailability,
  fetchPriceQuote,
  createBooking,
} from "@/lib/api-client";
import type { PriceBreakdown } from "@/types/xrmlite";

interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  assetId: number;
  carName: string;
  carModel: string;
  pricePerDay: number;
}

type Step = "dates" | "price" | "confirm" | "success" | "error";

export default function BookingFlow({
  isOpen,
  onClose,
  assetId,
  carName,
  carModel,
  pricePerDay,
}: BookingFlowProps) {
  const { isLoggedIn, openLoginModal } = useAuth();

  const [step, setStep] = useState<Step>("dates");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [priceData, setPriceData] = useState<PriceBreakdown | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("dates");
        setStartDate("");
        setEndDate("");
        setCouponCode("");
        setNotes("");
        setError("");
        setPriceData(null);
        setIsAvailable(null);
      }, 300);
    }
  }, [isOpen]);

  // Min date is tomorrow
  const minDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const handleCheckAvailability = async () => {
    if (!startDate || !endDate) {
      setError("Please select both dates");
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      setError("Drop-off date must be after pickup date");
      return;
    }

    setLoading(true);
    setError("");

    const result = await fetchAvailability(assetId, startDate, endDate);

    if (result.success && result.data) {
      setIsAvailable(result.data.available);
      if (result.data.available) {
        // Fetch price quote
        const priceResult = await fetchPriceQuote(
          assetId,
          startDate,
          endDate,
          couponCode || undefined
        );
        if (priceResult.success && priceResult.data) {
          setPriceData(priceResult.data);
          setStep("price");
        } else {
          // If price API fails, calculate locally
          const days = Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
              86400000
          );
          const totalAmount = pricePerDay * days;
          setPriceData({
            pricingPeriod: "per_day",
            unitPrice: pricePerDay,
            totalUnits: days,
            subtotal: totalAmount,
            discountAmount: 0,
            couponDiscount: 0,
            taxAmount: 0,
            totalAmount,
            depositAmount: 5000,
            base_price: pricePerDay,
            duration_days: days,
            daily_rate: pricePerDay,
            discount_amount: 0,
            coupon_discount: 0,
            tax: 0,
            total: totalAmount,
            deposit: 5000,
          });
          setStep("price");
        }
      } else {
        setError(
          "This car is not available for the selected dates. Please try different dates."
        );
      }
    } else {
      // API may not be configured yet — allow booking flow with local pricing
      const days = Math.ceil(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          86400000
      );
      const totalAmount = pricePerDay * days;
      setPriceData({
        pricingPeriod: "per_day",
        unitPrice: pricePerDay,
        totalUnits: days,
        subtotal: totalAmount,
        discountAmount: 0,
        couponDiscount: 0,
        taxAmount: 0,
        totalAmount,
        depositAmount: 5000,
        kmLimit: "250 km/day",
        excessKmCharge: "₹8/km",
        base_price: pricePerDay,
        duration_days: days,
        daily_rate: pricePerDay,
        discount_amount: 0,
        coupon_discount: 0,
        tax: 0,
        total: totalAmount,
        deposit: 5000,
      });
      setIsAvailable(true);
      setStep("price");
    }

    setLoading(false);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setLoading(true);
    const priceResult = await fetchPriceQuote(
      assetId,
      startDate,
      endDate,
      couponCode
    );
    if (priceResult.success && priceResult.data) {
      setPriceData(priceResult.data);
    }
    setLoading(false);
  };

  const handleConfirmBooking = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    setStep("confirm");
    setLoading(true);
    setError("");

    const result = await createBooking({
      assetId,
      startDate,
      endDate,
      couponCode: couponCode || undefined,
      notes: notes || undefined,
    });

    setLoading(false);

    if (result.success) {
      setStep("success");
    } else {
      setError(result.error?.message || "Booking failed. Please try again.");
      setStep("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Book {carName}
                  </h2>
                  <p className="text-xs text-white/40 mt-0.5">
                    {carModel} • ₹{pricePerDay.toLocaleString()}/day
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Close booking flow"
                >
                  <X size={16} className="text-white/60" />
                </button>
              </div>

              <div className="p-5">
                {/* Step 1: Date Selection */}
                {step === "dates" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1.5">
                          Pickup Date *
                        </label>
                        <div className="relative">
                          <Calendar
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                          />
                          <input
                            type="date"
                            min={minDate}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-sm text-white focus:outline-none focus:border-gold/50"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1.5">
                          Drop-off Date *
                        </label>
                        <div className="relative">
                          <Calendar
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                          />
                          <input
                            type="date"
                            min={startDate || minDate}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-sm text-white focus:outline-none focus:border-gold/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick duration estimate */}
                    {startDate && endDate && new Date(endDate) > new Date(startDate) && (
                      <div className="bg-gold/5 border border-gold/20 rounded-xl p-3 text-center">
                        <p className="text-sm text-white/70">
                          {Math.ceil(
                            (new Date(endDate).getTime() -
                              new Date(startDate).getTime()) /
                              86400000
                          )}{" "}
                          days • Estimated ₹
                          {(
                            pricePerDay *
                            Math.ceil(
                              (new Date(endDate).getTime() -
                                new Date(startDate).getTime()) /
                                86400000
                            )
                          ).toLocaleString()}
                        </p>
                      </div>
                    )}

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1.5">
                        Notes (optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="E.g., doorstep delivery, outstation trip..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 resize-none"
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle size={14} />
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleCheckAvailability}
                      disabled={loading || !startDate || !endDate}
                      className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-50 text-black font-bold py-3.5 rounded-xl text-sm transition-all"
                    >
                      {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          Check Availability & Price
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Step 2: Price Breakdown */}
                {step === "price" && priceData && (
                  <div className="space-y-4">
                    {/* Availability badge */}
                    {isAvailable && (
                      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                        <CheckCircle size={16} className="text-green-400" />
                        <span className="text-green-400 text-sm font-medium">
                          Available for your dates!
                        </span>
                      </div>
                    )}

                    {/* Price breakdown */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <CreditCard size={14} className="text-gold" />
                        Price Breakdown
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-white/60">
                          <span>
                            ₹{(priceData.unitPrice || priceData.daily_rate).toLocaleString()} × {priceData.totalUnits || priceData.duration_days} {priceData.pricingPeriod === "per_week" ? "weeks" : priceData.pricingPeriod === "per_month" ? "months" : "days"}
                          </span>
                          <span>₹{priceData.subtotal.toLocaleString()}</span>
                        </div>
                        {(priceData.discountAmount || priceData.discount_amount) > 0 && (
                          <div className="flex justify-between text-green-400">
                            <span>Discount</span>
                            <span>-₹{(priceData.discountAmount || priceData.discount_amount).toLocaleString()}</span>
                          </div>
                        )}
                        {(priceData.couponDiscount || priceData.coupon_discount) > 0 && (
                          <div className="flex justify-between text-green-400">
                            <span>Coupon{priceData.coupon_applied ? ` (${priceData.coupon_applied})` : ""}</span>
                            <span>-₹{(priceData.couponDiscount || priceData.coupon_discount).toLocaleString()}</span>
                          </div>
                        )}
                        {(priceData.taxAmount || priceData.tax) > 0 && (
                          <div className="flex justify-between text-white/40">
                            <span>Tax</span>
                            <span>₹{(priceData.taxAmount || priceData.tax).toLocaleString()}</span>
                          </div>
                        )}
                        <div className="border-t border-white/10 pt-2 flex justify-between text-white font-semibold">
                          <span>Total</span>
                          <span className="text-gold">
                            ₹{(priceData.totalAmount || priceData.total).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-white/40 text-xs">
                          <span>Security deposit (refundable)</span>
                          <span>₹{(priceData.depositAmount || priceData.deposit).toLocaleString()}</span>
                        </div>
                        {priceData.kmLimit && (
                          <div className="flex justify-between text-white/30 text-xs">
                            <span>KM limit</span>
                            <span>{priceData.kmLimit}{priceData.excessKmCharge ? ` (${priceData.excessKmCharge} excess)` : ""}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Coupon input */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag
                          size={14}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                        />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) =>
                            setCouponCode(e.target.value.toUpperCase())
                          }
                          placeholder="Coupon code"
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                        />
                      </div>
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode || loading}
                        className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 hover:text-gold hover:border-gold/30 disabled:opacity-50 transition-all"
                      >
                        Apply
                      </button>
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm">{error}</p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep("dates")}
                        className="flex-1 py-3 border border-white/20 rounded-xl text-sm text-white/70 hover:text-white transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleConfirmBooking}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold py-3 rounded-xl text-sm transition-all"
                      >
                        {loading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : !isLoggedIn ? (
                          "Login & Book"
                        ) : (
                          <>
                            Confirm Booking
                            <CheckCircle size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Loading/Confirm */}
                {step === "confirm" && (
                  <div className="text-center py-8">
                    <Loader2
                      size={32}
                      className="animate-spin text-gold mx-auto mb-4"
                    />
                    <p className="text-white/60 text-sm">
                      Creating your booking...
                    </p>
                  </div>
                )}

                {/* Success */}
                {step === "success" && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Booking Confirmed!
                    </h3>
                    <p className="text-white/50 text-sm mb-6">
                      Your {carName} is reserved for {startDate} to {endDate}.
                      <br />
                      We&apos;ll send you a confirmation shortly.
                    </p>
                    <button
                      onClick={onClose}
                      className="bg-gold hover:bg-gold-light text-black font-bold px-8 py-3 rounded-xl text-sm transition-all"
                    >
                      Done
                    </button>
                  </div>
                )}

                {/* Error */}
                {step === "error" && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle size={32} className="text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Booking Failed
                    </h3>
                    <p className="text-white/50 text-sm mb-6">{error}</p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => setStep("price")}
                        className="border border-white/20 text-white/70 px-6 py-3 rounded-xl text-sm transition-all hover:text-white"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={onClose}
                        className="bg-white/10 text-white px-6 py-3 rounded-xl text-sm transition-all hover:bg-white/20"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
