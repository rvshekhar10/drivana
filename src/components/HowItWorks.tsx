"use client";

import { motion } from "framer-motion";
import { MessageCircle, FileCheck, CarFront, ThumbsUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "WhatsApp Us",
    description: "Send car preference, dates & location. We respond in minutes.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Quick Verify",
    description: "Share DL & Aadhaar photos. Pay deposit. Done in 5 minutes.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: CarFront,
    step: "03",
    title: "Get Your Car",
    description: "Pickup from Bhoothnath Road or free doorstep delivery.",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    icon: ThumbsUp,
    step: "04",
    title: "Drive & Return",
    description: "Enjoy the freedom. Return on time. Deposit back in 24-48 hrs.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 px-4 sm:px-6 relative"
      aria-labelledby="how-it-works-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.015] to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-14"
        >
          <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Simple Process
          </span>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight"
          >
            Book in 4 Steps
          </h2>
          <p className="text-white/50 mt-4 max-w-md mx-auto text-sm sm:text-base">
            No app. No sign-up. Just WhatsApp and you&apos;re driving.
          </p>
        </motion.div>

        {/* Steps - Horizontal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-5 sm:p-6 rounded-2xl border ${step.border} ${step.bg} group hover:scale-[1.02] transition-all duration-300`}
            >
              {/* Step number */}
              <span className="text-white/10 text-4xl font-bold absolute top-4 right-4 font-mono">
                {step.step}
              </span>

              <div className={`w-12 h-12 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon size={22} className={step.color} />
              </div>

              <h3 className="text-base font-semibold text-white mb-1.5">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Learn More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-gold/70 hover:text-gold text-sm font-medium transition-colors group"
          >
            See detailed process, documents & policies
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
