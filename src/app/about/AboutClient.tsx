"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  MapPin,
  Sparkles,
  Shield,
  Users,
  Car,
  ArrowRight,
  Phone,
  Wrench,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const stats = [
  { value: "5+", label: "Cars in Fleet" },
  { value: "4.4", label: "Customer Rating" },
  { value: "Patna", label: "Serving Since 2025" },
  { value: "₹1,399", label: "Starting Price/Day" },
];

const timeline = [
  {
    year: "The Problem",
    title: "No Self-Drive Options in Patna",
    description:
      "You land at Patna airport. Open Zoomcar — nothing. Try Revv — unavailable. The only option? Overpriced cabs with drivers you don't need. We lived this frustration.",
  },
  {
    year: "The Idea",
    title: "What If Patna Had Its Own?",
    description:
      "What if visitors from Delhi, Mumbai, Bangalore could rent a clean car in Patna — just like they do back home? No app downloads. No surge pricing. Just WhatsApp and keys.",
  },
  {
    year: "The Launch",
    title: "DRIVANA Goes Live",
    description:
      "We started with a small fleet on Bhoothnath Road. Word spread. Visitors loved the freedom. Locals loved the convenience. The reviews started pouring in.",
  },
  {
    year: "Today",
    title: "Growing Every Day",
    description:
      "5 cars, 4.4-star rating, and a growing community of happy drivers. We're just getting started — more cars, more cities, same promise of freedom.",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "Clean Cars, Always",
    description:
      "Every car is sanitized, inspected, and photo-documented before handover. We obsess over the details so you don't have to worry.",
    gradient: "from-amber-500/20 to-yellow-500/5",
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    description:
      "No hidden charges. KM limits, fuel policy, deposit — everything is upfront before you book. The price you see is the price you pay.",
    gradient: "from-emerald-500/20 to-green-500/5",
  },
  {
    icon: Wrench,
    title: "On-Ground Support",
    description:
      "Breakdown in Patna? We're not a chatbot. Our team physically reaches you within city limits. One call and we're there.",
    gradient: "from-blue-500/20 to-cyan-500/5",
  },
  {
    icon: Users,
    title: "Built for Visitors",
    description:
      "We understand what metro-city travelers expect. Quick booking, clean interiors, no awkward negotiations. Just freedom.",
    gradient: "from-purple-500/20 to-pink-500/5",
  },
];

export default function AboutClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section — Parallax */}
      <section
        ref={heroRef}
        className="relative h-[70vh] sm:h-[80vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/drivana-hero-image.avif"
            alt="DRIVANA fleet in Patna"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-gold text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
          >
            Freedom Has a
            <br />
            <span className="text-gold">New Address</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-white/60 text-base sm:text-lg max-w-xl mx-auto"
          >
            Patna, Bihar.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 -mt-16 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-gold">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-white/50 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* The Problem → Solution Story */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              The Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              How DRIVANA Was Born
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent sm:-translate-x-px" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-start gap-6 mb-12 sm:mb-16 ${
                  index % 2 === 0
                    ? "sm:flex-row"
                    : "sm:flex-row-reverse sm:text-right"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1.5 sm:-translate-x-1.5 mt-2 ring-4 ring-black" />

                {/* Content */}
                <div
                  className={`ml-12 sm:ml-0 sm:w-1/2 ${
                    index % 2 === 0 ? "sm:pr-12" : "sm:pl-12"
                  }`}
                >
                  <span className="text-gold/60 text-xs font-mono tracking-wider uppercase">
                    {item.year}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve — Full-width visual */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gold/[0.03] to-black" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              Who We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Built for People Like You
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              If you&apos;re visiting Patna from a metro city and expect the same
              seamless car rental experience you get back home — we built this
              for you.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                emoji: "✈️",
                title: "Flying into Patna",
                desc: "From Delhi, Mumbai, Bangalore — land and drive within an hour.",
              },
              {
                emoji: "👨‍👩‍👧‍👦",
                title: "Visiting Family",
                desc: "Need a car for a week? Monthly plans with 20% off.",
              },
              {
                emoji: "💼",
                title: "Business Travelers",
                desc: "Client meetings across Patna? Drive on your own schedule.",
              },
              {
                emoji: "🎉",
                title: "Wedding Season",
                desc: "Need a car for the wedding week? We've got you covered.",
              },
              {
                emoji: "🏛️",
                title: "Tourists & Explorers",
                desc: "Rajgir, Nalanda, Bodh Gaya — explore Bihar at your pace.",
              },
              {
                emoji: "🎓",
                title: "Students & Locals",
                desc: "Budget-friendly Alto starting ₹1,399/day for daily needs.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-gold/20 hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <span className="text-2xl">{item.emoji}</span>
                <h3 className="text-white font-semibold mt-3 mb-1 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — Interactive Cards */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              Our Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              What Makes Us Different
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl border border-white/[0.08] overflow-hidden hover:border-gold/30 transition-all duration-500"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <value.icon size={24} className="text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gold transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-72 sm:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.5!2d85.1376!3d25.6093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBhoothnath+Road%2C+Patna%2C+Bihar!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DRIVANA Location - Bhoothnath Road, Patna"
              />
            </div>

            {/* Info */}
            <div>
              <span className="text-gold/70 text-xs font-medium tracking-[0.2em] uppercase">
                Find Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-4">
                Bhoothnath Road, Patna
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Our pickup location is centrally located and easily accessible
                from Patna Junction, Patna Airport, and all major areas. We also
                offer free doorstep delivery within city limits.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-gold" />
                  <span className="text-white/70 text-sm">
                    Bhoothnath Road, Patna, Bihar 800001
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gold" />
                  <a
                    href="tel:+918252658488"
                    className="text-white/70 text-sm hover:text-gold transition-colors"
                  >
                    +91 82526 58488
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Car size={16} className="text-gold" />
                  <span className="text-white/70 text-sm">
                    Open 9 AM – 9 PM, 7 days a week
                  </span>
                </div>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-medium text-sm mt-6 group"
              >
                Get Directions
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
