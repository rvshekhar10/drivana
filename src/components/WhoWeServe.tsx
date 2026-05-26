"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Heart,
  Briefcase,
  PartyPopper,
  Landmark,
  GraduationCap,
} from "lucide-react";

const personas = [
  {
    icon: Plane,
    title: "Flying into Patna",
    description: "From Delhi, Mumbai and all major cities - land and drive within an hour.",
    gradient: "from-sky-500/20 to-blue-600/20",
    iconColor: "text-sky-400",
    borderColor: "border-sky-500/20",
    highlight: true,
  },
  {
    icon: Heart,
    title: "Visiting Family",
    description: "Need a car for a week? Monthly plans with 20% off.",
    gradient: "from-pink-500/20 to-rose-600/20",
    iconColor: "text-pink-400",
    borderColor: "border-pink-500/20",
    highlight: false,
  },
  {
    icon: Briefcase,
    title: "Business Travelers",
    description: "Client meetings across Patna? Drive on your own schedule.",
    gradient: "from-amber-500/20 to-orange-600/20",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    highlight: false,
  },
  {
    icon: PartyPopper,
    title: "Wedding Season",
    description: "Need a car for the wedding week? We've got you covered.",
    gradient: "from-purple-500/20 to-violet-600/20",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    highlight: false,
  },
  {
    icon: Landmark,
    title: "Tourists & Explorers",
    description: "Rajgir, Nalanda, Bodh Gaya - explore Bihar at your pace.",
    gradient: "from-emerald-500/20 to-teal-600/20",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    highlight: false,
  },
  {
    icon: GraduationCap,
    title: "Students & Locals",
    description: "Budget-friendly Alto starting ₹1,399/day for daily needs.",
    gradient: "from-gold/20 to-gold-dark/20",
    iconColor: "text-gold",
    borderColor: "border-gold/20",
    highlight: false,
  },
];

export default function WhoWeServe() {
  return (
    <section className="py-20 sm:py-28 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
            Who We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-5">
            Built for People Like You
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re visiting Patna from a metro city or need a car for daily use - we built this for you.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative rounded-2xl border ${persona.borderColor} bg-white/[0.02] backdrop-blur-sm p-6 sm:p-7 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 hover:scale-[1.02] hover:shadow-lg`}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <persona.icon size={24} className={persona.iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-white transition-colors">
                  {persona.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                  {persona.description}
                </p>
              </div>

              {/* Subtle shine effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/[0.05] to-transparent rotate-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
