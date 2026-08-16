"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Star,
  Shield,
  Clock,
  MapPin,
  Calendar,
  Search,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCity } from "@/context/CityContext";

export default function Hero() {
  const { selectedCity, cities, openCityPicker } = useCity();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searching, setSearching] = useState(false);

  const minDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const handleExplore = () => {
    if (!startDate || !endDate) return;
    setSearching(true);
    // Navigate to fleet page with date params for availability filtering
    const params = new URLSearchParams({
      startDate,
      endDate,
      ...(selectedCity ? { cityId: String(selectedCity.id) } : {}),
    });
    window.location.href = `/fleet?${params.toString()}`;
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background */}
      <Image
        src="/drivana-hero-image.avif"
        alt="Self drive car rental - DRIVANA fleet"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Urgency badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Cars Available Now - Book Today
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight"
        >
          Self-Drive Cars
          <br />
          <span className="text-gold">
            {selectedCity ? `in ${selectedCity.name}` : "Starting ₹1,499/day"}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
        >
          No driver needed. Choose your city, pick your dates, and explore
          available cars with real-time pricing.
        </motion.p>

        {/* --- Search/Availability Form --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 max-w-3xl mx-auto"
        >
          <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* City Selector */}
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 text-left pl-1">
                  City
                </label>
                <button
                  onClick={openCityPicker}
                  className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-left hover:border-gold/30 transition-all"
                >
                  <MapPin size={15} className="text-gold shrink-0" />
                  <span className="text-white font-medium truncate">
                    {selectedCity?.name || "Select City"}
                  </span>
                  {cities.length > 1 && (
                    <ChevronDown size={14} className="text-white/40 ml-auto shrink-0" />
                  )}
                </button>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 text-left pl-1">
                  Pickup Date
                </label>
                <div className="relative">
                  <Calendar
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none"
                  />
                  <input
                    type="date"
                    min={minDate}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:border-gold/40 transition-all"
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 text-left pl-1">
                  Drop-off Date
                </label>
                <div className="relative">
                  <Calendar
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none"
                  />
                  <input
                    type="date"
                    min={startDate || minDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:border-gold/40 transition-all"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleExplore}
                  disabled={!startDate || !endDate || searching}
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-[0_4px_20px_rgba(206,150,61,0.3)]"
                >
                  {searching ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <Search size={16} />
                      Explore Cars
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick duration hint */}
            {startDate && endDate && new Date(endDate) > new Date(startDate) && (
              <p className="text-xs text-white/40 mt-3 text-center">
                {Math.ceil(
                  (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                    86400000
                )}{" "}
                day trip • Real-time availability & pricing on next page
              </p>
            )}
          </div>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/60"
        >
          <span className="flex items-center gap-1.5">
            <Shield size={14} className="text-gold" />
            Fully Insured
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-gold" />
            Instant Booking
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gold" />
            Doorstep Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-gold fill-gold" />
            4.4 Rated
          </span>
        </motion.div>

        {/* Direct fleet link for people who just want to browse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6"
        >
          <Link
            href="/fleet"
            className="text-sm text-white/40 hover:text-gold transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-gold/50"
          >
            Or browse all cars without dates →
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#fleet"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          aria-label="Scroll to fleet section"
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] text-white/30 uppercase tracking-wider">
            Scroll
          </span>
          <ChevronDown size={20} className="text-white/40" />
        </motion.a>
      </motion.div>
    </section>
  );
}
