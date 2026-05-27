"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star, Shield, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Hero Image */}
      <Image
        src="/drivana-hero-image.avif"
        alt="Self drive car rental in Patna - DRIVANA fleet"
        fill
        className="object-cover"
        priority
        quality={85}
      />

      {/* Overlay - lighter so image is more visible */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient overlays for depth */}
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
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight"
        >
          Self-Drive Cars
          <br />
          <span className="text-gold">Starting ₹1,499</span>/day
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
        >
          No driver needed. Pick up from <strong className="text-white">Bhootnath Road, Patna</strong>.
          Drive anywhere - Rajgir, Bodh Gaya, Varanasi & more.
        </motion.p>

        {/* Trust strip - Indian consumers need reassurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/60"
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

        {/* CTA Buttons - bigger, bolder, more urgency */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#fleet"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-10 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-[0_4px_30px_rgba(206,150,61,0.4)]"
          >
            View Cars & Prices
          </a>
          <a
            href="https://wa.me/919205548488?text=Hi!%20I%20want%20to%20book%20a%20self-drive%20car%20in%20Patna."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-10 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Now
          </a>
        </motion.div>

        {/* Social proof counter - reframed for credibility */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 inline-flex items-center gap-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-4"
        >
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-white">5+</p>
            <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">Cars Ready</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-white">₹1,499</p>
            <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">Starting Price</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-white">Patna</p>
            <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">Pickup Location</p>
          </div>
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
          <span className="text-[10px] text-white/30 uppercase tracking-wider">Scroll</span>
          <ChevronDown size={20} className="text-white/40" />
        </motion.a>
      </motion.div>
    </section>
  );
}
