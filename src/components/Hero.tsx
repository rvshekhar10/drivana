"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block text-gold/80 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-6">
            Self-Drive Car Rental • Patna, Bihar
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight"
        >
          Drive Your <span className="text-gold">Freedom</span>
          <br />
          in Patna
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Premium self-drive cars starting at just{" "}
          <strong className="text-white">₹1,399/day</strong>. No driver needed,
          no hassle — just you, the road, and complete freedom. Book instantly
          via WhatsApp.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-6 flex items-center justify-center gap-4 text-sm text-white/50"
        >
          <span className="flex items-center gap-1">
            <Star size={14} className="text-gold fill-gold" />
            <Star size={14} className="text-gold fill-gold" />
            <Star size={14} className="text-gold fill-gold" />
            <Star size={14} className="text-gold fill-gold" />
            <Star size={14} className="text-gold fill-gold" />
          </span>
          <span>Trusted by 150+ happy customers in Patna</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#fleet"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold px-8 py-4 rounded-full text-sm sm:text-base transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            Explore Our Fleet
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-gold/50 text-white/80 hover:text-white font-medium px-8 py-4 rounded-full text-sm sm:text-base transition-all duration-200"
          >
            How It Works
          </a>
        </motion.div>

        {/* Quick trust markers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-14 grid grid-cols-3 gap-4 max-w-md mx-auto"
        >
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gold">150+</p>
            <p className="text-xs text-white/40 mt-1">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gold">5+</p>
            <p className="text-xs text-white/40 mt-1">Cars Available</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gold">24/7</p>
            <p className="text-xs text-white/40 mt-1">Support</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#fleet"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          aria-label="Scroll to fleet section"
        >
          <ChevronDown size={24} className="text-white/30" />
        </motion.a>
      </motion.div>
    </section>
  );
}
