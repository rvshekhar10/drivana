"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  Shield,
  Wrench,
  Phone,
  CheckCircle2,
  Car,
  Camera,
  Fuel,
  AlertTriangle,
  HeartPulse,
  MapPin,
  Clock,
  Eye,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const safetyPillars = [
  {
    icon: Wrench,
    title: "Regular Servicing",
    stat: "Every 5,000 km",
    description:
      "Every vehicle is serviced per manufacturer schedules. Engine oil, brakes, tyres, coolant - all checked and maintained.",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Sparkles,
    title: "Deep Sanitization",
    stat: "Before every rental",
    description:
      "Seats, steering, dashboard, door handles - everything sanitized. You get a car that looks and smells fresh.",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Shield,
    title: "Full Insurance",
    stat: "Comprehensive cover",
    description:
      "All vehicles carry valid comprehensive insurance - third-party liability, theft, fire, and natural disaster coverage.",
    color: "from-gold/20 to-gold/5",
    borderColor: "border-gold/20",
    iconColor: "text-gold",
  },
  {
    icon: HeartPulse,
    title: "On-Ground Support",
    stat: "Within Patna city",
    description:
      "Not a chatbot. Our team physically reaches you for breakdowns within Patna city limits. One call and we're there.",
    color: "from-red-500/20 to-red-500/5",
    borderColor: "border-red-500/20",
    iconColor: "text-red-400",
  },
];

const inspectionChecklist = {
  before: [
    "Exterior photos documenting existing condition",
    "Interior cleanliness verified",
    "Fuel level noted and recorded",
    "Odometer reading documented",
    "Tyre pressure checked",
    "AC, lights, wipers tested",
    "All documents (RC, insurance) placed in car",
    "Existing scratches/dents marked on checklist",
  ],
  after: [
    "Exterior inspection for new damage",
    "Interior condition & cleanliness check",
    "Fuel level compared to handover",
    "Odometer reading for KM calculation",
    "Under-body quick visual check",
    "Photos taken for records",
    "Deposit refund processed (24-48 hrs)",
  ],
};

const safetyTips = [
  {
    icon: Eye,
    tip: "Familiarize yourself with the car's controls before driving off.",
  },
  {
    icon: MapPin,
    tip: "New to Patna? Use Google Maps - some roads can be narrow and busy.",
  },
  {
    icon: Fuel,
    tip: "Note nearby petrol pumps before heading outstation.",
  },
  {
    icon: Phone,
    tip: "Save our number - call us first if anything feels off with the car.",
  },
  {
    icon: AlertTriangle,
    tip: "Avoid waterlogged areas during monsoon season (July-September).",
  },
  {
    icon: Car,
    tip: "Park in well-lit areas and always lock the car when unattended.",
  },
];

export default function SafetyClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <Image
          src="/drivana-hero-image.avif"
          alt="DRIVANA safety and support"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <Shield size={14} />
            Your Safety is Non-Negotiable
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
          >
            Drive with
            <br />
            <span className="text-gold">Confidence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-white/60 text-base sm:text-lg max-w-xl mx-auto"
          >
            Serviced cars. Full insurance. Real humans on the ground when you
            need them.
          </motion.p>
        </motion.div>
      </section>

      {/* 4 Safety Pillars */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              Our Commitment
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              4 Pillars of Safety
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {safetyPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl border ${pillar.borderColor} overflow-hidden group hover:border-gold/30 transition-all duration-500`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative z-10 p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <pillar.icon size={24} className={pillar.iconColor} />
                    </div>
                    <span className="text-xs bg-white/10 text-white/50 px-3 py-1 rounded-full">
                      {pillar.stat}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Breakdown Support - Highlighted Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent p-8 sm:p-12"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Wrench size={22} className="text-red-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Breakdown? We&apos;re There.
                  </h2>
                </div>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                  Unlike app-based services where you&apos;re left talking to a
                  chatbot, DRIVANA provides real, human, on-ground support. Flat
                  tyre, dead battery, engine trouble - our team physically
                  reaches you within Patna city limits.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Physical team reaches you in Patna",
                    "Mechanical failures covered at no cost",
                    "Replacement vehicle if can't fix on-spot",
                    "Remote guidance for outstation issues",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="text-red-400 mt-0.5 shrink-0"
                      />
                      <span className="text-white/60 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency CTA */}
              <div className="md:w-64 shrink-0">
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-3">
                    Emergency Line
                  </p>
                  <a
                    href="tel:+917079138350"
                    className="block text-2xl font-bold text-white hover:text-gold transition-colors mb-4"
                  >
                    70791 38350
                  </a>
                  <a
                    href="https://wa.me/919205548488?text=EMERGENCY:%20I%20need%20help%20with%20my%20rental%20car"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all w-full justify-center"
                  >
                    <MessageCircle size={16} />
                    WhatsApp SOS
                  </a>
                  <p className="text-white/30 text-xs mt-3">
                    24 hours daily
                    <br />
                    WhatsApp monitored after hours
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vehicle Inspection Protocol */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              Transparency
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Vehicle Inspection Protocol
            </h2>
            <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm">
              Every rental includes a documented inspection - so there are never
              disputes about pre-existing damage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Before Handover */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Camera size={18} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Before Handover
                  </h3>
                  <p className="text-emerald-400/70 text-xs">
                    What we check & document
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {inspectionChecklist.before.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-emerald-400 mt-0.5 shrink-0"
                    />
                    <span className="text-white/70 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* After Return */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Eye size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    After Return
                  </h3>
                  <p className="text-blue-400/70 text-xs">
                    What we inspect on return
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {inspectionChecklist.after.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-blue-400 mt-0.5 shrink-0"
                    />
                    <span className="text-white/70 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insurance Details */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <Shield size={22} className="text-gold" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Insurance Coverage
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-medium mb-2">What&apos;s Covered</h3>
                <ul className="space-y-2">
                  {[
                    "Third-party liability (mandatory by law)",
                    "Comprehensive vehicle coverage",
                    "Theft & fire protection",
                    "Natural disaster damage",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="text-gold mt-0.5 shrink-0"
                      />
                      <span className="text-white/60 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">
                  What&apos;s NOT Covered
                </h3>
                <ul className="space-y-2">
                  {[
                    "Damage from drunk driving",
                    "Negligence or rash driving",
                    "Unauthorized driver operating the car",
                    "Using vehicle for illegal activities",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <AlertTriangle
                        size={14}
                        className="text-amber-400 mt-0.5 shrink-0"
                      />
                      <span className="text-white/60 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-white/40 text-xs mt-5 border-t border-white/10 pt-4">
              In case of an accident, inform DRIVANA immediately. We&apos;ll
              guide you through the insurance claim process step by step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Safety Tips - Interactive Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              Pro Tips
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Safety Tips for Your Drive
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {safetyTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start gap-3 p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-gold/20 hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <tip.icon size={16} className="text-gold" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {tip.tip}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-16 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-5 py-2 mb-6">
            <Shield size={16} className="text-gold" />
            <span className="text-gold text-sm font-medium">Our Promise</span>
          </div>
          <p className="text-xl sm:text-2xl text-white/80 leading-relaxed font-light italic">
            &ldquo;We treat every car like it&apos;s going to our own family
            member. If we wouldn&apos;t feel safe putting our parents in it, it
            doesn&apos;t go to you.&rdquo;
          </p>
          <p className="text-white/40 text-sm mt-4">- Team DRIVANA, Patna</p>
        </motion.div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
