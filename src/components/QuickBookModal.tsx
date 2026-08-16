"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  CreditCard,
  Shield,
  Clock,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface QuickBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetId: number;
  carName: string;
  startDate: string;
  endDate: string;
}

interface PricingInfo {
  days: number;
  pricingType: string;
  ratePerUnit: number;
  originalRate: number;
  subtotal: number;
  deposit: number;
  bookingPercentage: number;
  bookingAmount: number;
  balanceAtPickup: number;
  excessKmCharge: number;
  kmLimit: string;
  currency: string;
}

type Step = "checking" | "available" | "holding" | "ready" | "success" | "unavailable" | "error";

export default function QuickBookModal({
  isOpen,
  onClose,
  assetId,
  carName,
  startDate,
  endDate,
}: QuickBookModalProps) {
  const { isLoggedIn, openLoginModal } = useAuth();

  const [step, setStep] = useState<Step>("checking");
  const [pricing, setPricing] = useState<PricingInfo | null>(null);
  const [holdId, setHoldId] = useState<number | null>(null);
  const [holdExpires, setHoldExpires] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  // Phase 1: Check availability on mount
  useEffect(() => {
    if (!isOpen) return;
    setStep("checking");
    setError("");
    setPricing(null);
    setHoldId(null);

    async function check() {
      try {
        const res = await fetch(
          `/api/availability?assetId=${assetId}&startDate=${startDate}&endDate=${endDate}`
        );
        const data = await res.json();

        if (data.success && data.data) {
          if (data.data.available) {
            setPricing(data.data.pricing);
            setStep("available");
          } else {
            setError(data.data.reason || "This car is not available for the selected dates.");
            setStep("unavailable");
          }
        } else {
          setError("Could not check availability. Please try again.");
          setStep("error");
        }
      } catch {
        setError("Connection error. Please try again.");
        setStep("error");
      }
    }

    check();
  }, [isOpen, assetId, startDate, endDate]);

  // Countdown timer for hold
  useEffect(() => {
    if (!holdExpires) return;
    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((new Date(holdExpires).getTime() - Date.now()) / 1000)
      );
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setStep("error");
        setError("Hold expired. Please try again.");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [holdExpires]);

  // Phase 2: Create hold
  const handleConfirmBooking = useCallback(async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    setStep("holding");

    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId, startDate, endDate, lock: true }),
      });
      const data = await res.json();

      if (data.success && data.data?.available) {
        setHoldId(data.data.holdId);
        setHoldExpires(data.data.holdExpiresAt);
        setPricing(data.data.pricing || pricing);
        setStep("ready");
      } else if (data.data && !data.data.available) {
        setError(data.data.reason || "Car is no longer available.");
        setStep("unavailable");
      } else {
        setError("Could not secure your booking. Please try again.");
        setStep("error");
      }
    } catch {
      setError("Connection error. Please try again.");
      setStep("error");
    }
  }, [isLoggedIn, openLoginModal, assetId, startDate, endDate, pricing]);

  // Phase 3: Confirm payment (calls booking API)
  const [bookingNumber, setBookingNumber] = useState<string | null>(null);

  const handlePayNow = useCallback(async () => {
    if (!pricing) return;

    setStep("holding"); // Reuse as "processing" visual

    try {
      const token = localStorage.getItem("xrm_token");
      if (!token) {
        openLoginModal();
        setStep("ready");
        return;
      }

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          assetId,
          startDate,
          endDate,
          startTime: "09:00",
          endTime: "09:00",
          holdId: holdId || undefined,
          source: "website",
        }),
      });
      const data = await res.json();

      if (data.success && data.data) {
        setBookingNumber(data.data.booking_number || `#${data.data.id}`);
        setStep("success" as Step);
      } else if (data.error?.code === "UNAUTHENTICATED") {
        openLoginModal();
        setStep("ready");
      } else if (data.error?.code === "INTERNAL_ERROR") {
        setError("The booking service is temporarily unavailable. Please try again in a moment or book via WhatsApp.");
        setStep("error");
      } else {
        setError(data.error?.message || "Booking failed. The car may no longer be available.");
        setStep("error");
      }
    } catch {
      setError("Connection error. Please try again.");
      setStep("error");
    }
  }, [holdId, pricing, assetId, startDate, endDate, openLoginModal]);

  const formatMin = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

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
            <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Quick Book
                  </h2>
                  <p className="text-xs text-white/40 mt-0.5">
                    {carName} • {new Date(startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} → {new Date(endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"
                  aria-label="Close"
                >
                  <X size={16} className="text-white/60" />
                </button>
              </div>

              <div className="p-5">
                {/* Checking */}
                {step === "checking" && (
                  <div className="text-center py-8">
                    <Loader2 size={32} className="animate-spin text-gold mx-auto mb-3" />
                    <p className="text-white/60 text-sm">Checking availability...</p>
                  </div>
                )}

                {/* Available — show pricing */}
                {step === "available" && pricing && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                      <CheckCircle size={16} className="text-green-400" />
                      <span className="text-green-400 text-sm font-medium">
                        Available for your dates!
                      </span>
                    </div>

                    {/* Pricing breakdown */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-2.5">
                      <div className="flex justify-between text-sm text-white/60">
                        <span>₹{pricing.ratePerUnit.toLocaleString()} × {pricing.days} {pricing.pricingType === "daily" ? "days" : pricing.pricingType}</span>
                        <span>₹{pricing.subtotal.toLocaleString()}</span>
                      </div>
                      {pricing.originalRate > pricing.ratePerUnit && (
                        <div className="flex justify-between text-sm text-green-400">
                          <span>Discount (was ₹{pricing.originalRate.toLocaleString()})</span>
                          <span>-₹{((pricing.originalRate - pricing.ratePerUnit) * pricing.days).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="border-t border-white/10 pt-2">
                        <div className="flex justify-between text-white font-semibold">
                          <span>Total rental</span>
                          <span>₹{pricing.subtotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pay now highlight */}
                    <div className="bg-gold/5 border border-gold/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/70 flex items-center gap-2">
                          <Zap size={14} className="text-gold" />
                          Pay now to confirm ({pricing.bookingPercentage}%)
                        </span>
                        <span className="text-xl font-bold text-gold">
                          ₹{pricing.bookingAmount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-white/40">
                        Balance ₹{pricing.balanceAtPickup.toLocaleString()} + ₹{pricing.deposit.toLocaleString()} deposit at pickup
                      </p>
                    </div>

                    {/* KM limit info */}
                    <p className="text-xs text-white/30 flex items-center gap-1.5">
                      <Shield size={11} />
                      {pricing.kmLimit} • Excess ₹{pricing.excessKmCharge}/km • Fuel not included
                    </p>

                    {/* Action */}
                    <button
                      onClick={handleConfirmBooking}
                      className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold py-4 rounded-xl text-sm transition-all hover:scale-[1.02]"
                    >
                      <CreditCard size={16} />
                      {isLoggedIn
                        ? `Pay ₹${pricing.bookingAmount.toLocaleString()} & Book`
                        : "Login & Book"}
                    </button>
                  </div>
                )}

                {/* Holding */}
                {step === "holding" && (
                  <div className="text-center py-8">
                    <Loader2 size={32} className="animate-spin text-gold mx-auto mb-3" />
                    <p className="text-white/60 text-sm">Securing your booking...</p>
                    <p className="text-white/30 text-xs mt-1">Creating a 10-minute hold</p>
                  </div>
                )}

                {/* Ready — hold secured */}
                {step === "ready" && pricing && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-xl p-3">
                      <Shield size={16} className="text-gold" />
                      <div className="flex-1">
                        <span className="text-gold text-sm font-medium">
                          Car held for you!
                        </span>
                        <p className="text-white/40 text-xs">
                          Complete payment within{" "}
                          <span className="text-white font-mono">{formatMin(countdown)}</span>
                        </p>
                      </div>
                      <Clock size={14} className="text-gold/60" />
                    </div>

                    {/* Summary */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/60">Booking amount</span>
                        <span className="text-xl font-bold text-gold">
                          ₹{pricing.bookingAmount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-white/30">
                        {pricing.days} days • Balance ₹{pricing.balanceAtPickup.toLocaleString()} at pickup
                      </p>
                    </div>

                    <button
                      onClick={handlePayNow}
                      className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold py-4 rounded-xl text-sm transition-all hover:scale-[1.02]"
                    >
                      <CreditCard size={16} />
                      Confirm & Pay ₹{pricing.bookingAmount.toLocaleString()}
                    </button>

                    <p className="text-center text-[10px] text-white/20">
                      Hold ID: {holdId} • Expires in {formatMin(countdown)}
                    </p>
                  </div>
                )}

                {/* Unavailable */}
                {step === "unavailable" && (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle size={24} className="text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Not Available</h3>
                    <p className="text-white/50 text-sm mb-6 max-w-xs mx-auto">{error}</p>
                    <button
                      onClick={onClose}
                      className="text-gold text-sm font-medium hover:text-gold-light"
                    >
                      Try different dates
                    </button>
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
                    <p className="text-white/50 text-sm mb-1">
                      {carName} is reserved for you.
                    </p>
                    {bookingNumber && (
                      <p className="text-gold font-mono text-sm font-medium mb-6">
                        {bookingNumber}
                      </p>
                    )}
                    <p className="text-white/40 text-xs mb-6 max-w-xs mx-auto">
                      The asset is now blocked for your dates. Pay the remaining balance + deposit at pickup.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <a
                        href="/my-bookings"
                        className="bg-gold hover:bg-gold-light text-black font-bold px-6 py-3 rounded-xl text-sm transition-all"
                      >
                        View My Bookings
                      </a>
                      <button
                        onClick={onClose}
                        className="border border-white/20 text-white/70 px-6 py-3 rounded-xl text-sm hover:text-white transition-all"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}

                {/* Error */}
                {step === "error" && (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle size={24} className="text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
                    <p className="text-white/50 text-sm mb-6">{error}</p>
                    <button
                      onClick={onClose}
                      className="text-gold text-sm font-medium hover:text-gold-light"
                    >
                      Close
                    </button>
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
