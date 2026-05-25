"use client";

import { motion } from "framer-motion";
import { MessageCircle, FileCheck, CarFront, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Message Us on WhatsApp",
    description:
      "Send us a message with your preferred car, dates, and pickup location. We respond within minutes.",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Quick Verification",
    description:
      "Share your driving license and Aadhaar card. No lengthy paperwork — just a quick photo verification.",
  },
  {
    icon: CarFront,
    step: "03",
    title: "Get Your Car",
    description:
      "We deliver the sanitized, fully-fueled car to your doorstep in Patna. Or pick it up from our location.",
  },
  {
    icon: ThumbsUp,
    step: "04",
    title: "Drive & Return",
    description:
      "Enjoy your ride! Return the car at the agreed time. We handle the rest. It's that simple.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28 px-4 sm:px-6 relative"
      aria-labelledby="how-it-works-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Simple Process
          </span>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight"
          >
            How It Works
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Renting a self-drive car in Patna has never been easier. Four simple
            steps and you&apos;re on the road.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative text-center group"
            >
              {/* Connector line (hidden on mobile, visible on lg) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/30 to-transparent" />
              )}

              <div className="w-20 h-20 mx-auto rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-300">
                <step.icon size={28} className="text-gold" />
              </div>

              <span className="text-gold/50 text-xs font-mono tracking-wider">
                STEP {step.step}
              </span>
              <h3 className="text-lg font-semibold text-white mt-2 mb-2">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
