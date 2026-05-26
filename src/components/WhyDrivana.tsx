"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, IndianRupee, Car, Wrench, MapPin } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Clean & Maintained",
    description: "Sanitized, serviced, and inspected before every handover.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    description: "WhatsApp us and get confirmed in minutes. No app needed.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description: "No hidden charges. KM limits, fuel, deposit — all upfront.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: Car,
    title: "Flexible Plans",
    description: "Daily, weekly (15% off), or monthly (20% off) rentals.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Wrench,
    title: "On-Ground Support",
    description: "Real humans reach you for breakdowns within Patna city.",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    icon: MapPin,
    title: "Doorstep Delivery",
    description: "Free delivery within Patna. Airport pickup available.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

export default function WhyDrivana() {
  return (
    <section id="why-us" className="py-16 sm:py-20 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            The Drivana Difference
          </h2>
          <p className="text-white/50 mt-4 max-w-md mx-auto text-sm sm:text-base">
            Built for visitors from metro cities who expect quality.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="group p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-gold/25 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={20} className={feature.color} />
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5">
                {feature.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Link to Safety page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/safety"
            className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm font-medium transition-colors group"
          >
            Learn about our safety & support
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
