"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  MessageCircle,
  FileCheck,
  CarFront,
  ThumbsUp,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Fuel,
  Gauge,
  Shield,
  Clock,
  MapPin,
  CreditCard,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Message Us on WhatsApp",
    subtitle: "Takes 2 minutes",
    description:
      "Send a message to +91 82526 58488 with your preferred car, rental dates, and pickup location. We respond within minutes - no app downloads, no sign-ups.",
    details: [
      "Choose your car: Magnite, Tiago, Alto, or Freestyle",
      "Tell us your dates and times",
      "Mention if you need doorstep delivery",
    ],
    color: "from-green-500/20 to-green-500/5",
    borderColor: "border-green-500/30",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "Quick Verification",
    subtitle: "Takes 5 minutes",
    description:
      "Share photos of your Driving License and Aadhaar Card on WhatsApp. We verify in minutes - no office visits, no paperwork.",
    details: [
      "Valid Indian Driving License (original at pickup)",
      "Aadhaar Card or Government Photo ID",
      "Security deposit: ₹3,000 (Alto) or ₹5,000 (others)",
    ],
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    number: "03",
    icon: CarFront,
    title: "Get Your Car",
    subtitle: "Same day possible",
    description:
      "Pick up from Bhoothnath Road, Patna - or we deliver to your doorstep for free within city limits. We walk you through the car and hand over the keys.",
    details: [
      "Free doorstep delivery within Patna city",
      "Car walkthrough & existing damage documentation",
      "Fuel level noted, odometer reading recorded",
    ],
    color: "from-gold/20 to-gold/5",
    borderColor: "border-gold/30",
    iconBg: "bg-gold/20",
    iconColor: "text-gold",
  },
  {
    number: "04",
    icon: ThumbsUp,
    title: "Drive & Return",
    subtitle: "Freedom is yours",
    description:
      "Drive anywhere - city, outstation, wherever the road takes you. Return at the agreed time, we inspect, and refund your deposit within 24-48 hours.",
    details: [
      "Drive within KM limits or pay nominal excess",
      "Return with same fuel level",
      "Deposit refunded after inspection (24-48 hrs)",
    ],
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
];

const pricingInfo = [
  {
    icon: CreditCard,
    title: "Security Deposit",
    items: ["₹3,000 for Maruti Alto", "₹5,000 for all other cars", "Refundable within 24-48 hours"],
  },
  {
    icon: Gauge,
    title: "KM Limits",
    items: ["200-250 km/day depending on car", "₹7-9/km for excess kilometres", "Outstation packages available"],
  },
  {
    icon: Fuel,
    title: "Fuel Policy",
    items: ["Fuel NOT included in rental", "Return at same fuel level", "Shortfall deducted from deposit"],
  },
  {
    icon: Clock,
    title: "Timing & Returns",
    items: ["24-hour rental cycle", "30-minute grace period", "Late returns charged hourly"],
  },
];

export default function HowItWorksClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src="/drivana-hero-image.avif"
            alt="Self drive car rental process in Patna"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-gold text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4"
          >
            Simple Process
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
          >
            Book in <span className="text-gold">4 Steps</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-white/60 text-base sm:text-lg max-w-lg mx-auto"
          >
            No app. No sign-up. Just WhatsApp us and drive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown size={24} className="text-gold/50 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps - Large immersive cards */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={`relative rounded-3xl border ${step.borderColor} overflow-hidden group`}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Step number + icon */}
                  <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${step.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon size={28} className={step.iconColor} />
                    </div>
                    <span className="text-white/20 text-4xl sm:text-5xl font-bold font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        {step.title}
                      </h2>
                      <span className="text-xs bg-white/10 text-white/50 px-2.5 py-1 rounded-full">
                        {step.subtitle}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {/* Detail checklist */}
                    <div className="space-y-2.5">
                      {step.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-start gap-2.5"
                        >
                          <CheckCircle2
                            size={16}
                            className={`${step.iconColor} mt-0.5 shrink-0`}
                          />
                          <span className="text-white/70 text-sm">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector arrow between steps */}
              {index < steps.length - 1 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
                  <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center">
                    <ArrowDown size={16} className="text-gold" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* What You Need to Know - Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              Good to Know
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Pricing & Policies
            </h2>
            <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm">
              Everything is transparent. No surprises, no hidden fees.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {pricingInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-gold/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <info.icon size={18} className="text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {info.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {info.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-white/60"
                    >
                      <span className="text-gold mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8"
          >
            <div className="flex items-start gap-3 mb-5">
              <AlertCircle size={22} className="text-amber-400 shrink-0 mt-0.5" />
              <h2 className="text-xl font-semibold text-white">
                Important Reminders
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Original Driving License required at pickup (photocopy won't work)",
                "Fuel is not included - return at the same level you received",
                "Traffic challans during rental are your responsibility",
                "Inform us before taking the car outside Bihar",
                "No sub-letting - only verified driver can operate the vehicle",
                "On-ground breakdown support available within Patna city limits",
              ].map((note, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold text-sm mt-0.5">
                    {i + 1}.
                  </span>
                  <span className="text-white/70 text-sm">{note}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Start Booking */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to <span className="text-gold">Get Started?</span>
          </h2>
          <p className="text-white/60 mt-4 text-sm sm:text-base max-w-lg mx-auto">
            The whole process takes under 10 minutes. Send us a WhatsApp message
            right now and you could be driving by today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/918252658488?text=Hi!%20I%20want%20to%20book%20a%20self-drive%20car%20in%20Patna.%20Please%20share%20availability."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle size={20} />
              Start on WhatsApp
            </a>
            <a
              href="/#fleet"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-gold/50 text-white/80 hover:text-white font-medium px-8 py-4 rounded-full text-base transition-all duration-200"
            >
              Browse Cars First
            </a>
          </div>
        </motion.div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
