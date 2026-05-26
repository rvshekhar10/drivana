"use client";

import { motion } from "framer-motion";
import {
  FileText,
  UserCheck,
  CreditCard,
  XCircle,
  Shield,
  Gauge,
  Fuel,
  RotateCcw,
  Wrench,
  Ban,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const sections = [
  {
    id: "eligibility",
    icon: UserCheck,
    title: "Eligibility",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    items: [
      "You must be at least 18 years of age.",
      "A valid Indian Driving License (original) is mandatory at the time of pickup.",
      "A government-issued photo ID (Aadhaar Card, Passport, or Voter ID) is required for verification.",
      "International visitors must carry a valid International Driving Permit (IDP) along with their passport.",
      "The person whose documents are verified is the only authorized driver.",
    ],
  },
  {
    id: "booking",
    icon: CreditCard,
    title: "Booking & Payment",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    items: [
      "Bookings are confirmed only after document verification and security deposit payment.",
      "Payment can be made via UPI, bank transfer, or cash at the time of pickup.",
      "Rental charges are calculated on a 24-hour basis from the time of pickup.",
      "Late returns will be charged on a pro-rata basis (hourly rate applicable after a 30-minute grace period).",
      "Weekly rentals get 15% discount. Monthly rentals get 20% discount on the daily rate.",
    ],
  },
  {
    id: "cancellation",
    icon: XCircle,
    title: "Cancellation Policy",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    items: [
      "24+ hours before pickup: Full refund, no cancellation fee.",
      "12–24 hours before pickup: 50% of one day's rental charged as cancellation fee.",
      "Less than 12 hours / No-show: Full day's rental charged.",
      "Security deposit paid in advance is always refunded regardless of cancellation timing.",
    ],
  },
  {
    id: "deposit",
    icon: Shield,
    title: "Security Deposit",
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/20",
    items: [
      "Maruti Alto: ₹3,000 refundable deposit.",
      "All other vehicles (Magnite, Tiago, Freestyle): ₹5,000 refundable deposit.",
      "Deposit is refunded within 24–48 hours of vehicle return after inspection.",
      "Deductions may apply for damages, excessive dirt/stains, or missing fuel.",
      "If repair costs exceed the deposit, you are liable for the difference.",
    ],
  },
  {
    id: "km-limits",
    icon: Gauge,
    title: "Kilometre Limits",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    items: [
      "Maruti Alto: 200 km/day, 1200 km/week. Excess: ₹7/km.",
      "Tata Tiago: 250 km/day, 1500 km/week, 3000 km/month. Excess: ₹8/km.",
      "Nissan Magnite: 250 km/day, 1200 km/week, 3000 km/month. Excess: ₹8/km.",
      "Ford Freestyle: 200 km/day, 1200 km/week. Excess: ₹9/km.",
      "For outstation trips, inform us at the time of booking. Additional KM packages may be available.",
    ],
  },
  {
    id: "fuel",
    icon: Fuel,
    title: "Fuel Policy",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    items: [
      "Fuel is NOT included in the rental price.",
      "The car is handed over with a noted fuel level. You must return it at the same level.",
      "If the fuel level is lower upon return, the difference will be deducted at prevailing fuel rates + ₹100 convenience charge.",
    ],
  },
  {
    id: "return",
    icon: RotateCcw,
    title: "Vehicle Return Conditions",
    color: "text-teal-400",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
    items: [
      "Return the vehicle at the agreed time and location. A 30-minute grace period is allowed.",
      "The car must be returned in a reasonably clean condition (interior and exterior).",
      "Excessive dirt, stains, pet hair, or smoke smell may result in a cleaning fee of ₹300–₹500.",
      "Any new damage (scratches, dents, broken parts) will be assessed and repair costs deducted from the deposit.",
    ],
  },
  {
    id: "breakdown",
    icon: Wrench,
    title: "Breakdown & Support",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    items: [
      "On-ground breakdown support is available within Patna city limits.",
      "For breakdowns outside city limits, we will assist remotely and coordinate with local mechanics.",
      "Mechanical failures due to normal use are covered by DRIVANA at no cost to you.",
      "Damage caused by negligence, rash driving, or misuse is the renter's responsibility.",
    ],
  },
  {
    id: "prohibited",
    icon: Ban,
    title: "Prohibited Use",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    items: [
      "The vehicle must not be used for racing, off-roading, or any illegal activity.",
      "Sub-letting or allowing unauthorized persons to drive is strictly prohibited.",
      "Driving under the influence of alcohol or drugs is prohibited and will result in immediate termination.",
      "Traffic violations and challans incurred during the rental period are the renter's responsibility.",
    ],
  },
  {
    id: "liability",
    icon: AlertTriangle,
    title: "Liability",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    items: [
      "DRIVANA is not liable for any loss of personal belongings left in the vehicle.",
      "In case of an accident, the renter must inform DRIVANA immediately and file a police report if required.",
      "The renter is responsible for all fines, tolls, and parking charges incurred during the rental period.",
      "DRIVANA reserves the right to terminate the rental immediately if terms are violated.",
    ],
  },
];

export default function TermsClient() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 mb-6"
          >
            <FileText size={14} className="text-gold" />
            <span className="text-gold text-xs sm:text-sm font-medium">
              Last updated: May 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Terms & <span className="text-gold">Conditions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-white/50 text-sm sm:text-base max-w-2xl mx-auto"
          >
            By renting a vehicle from DRIVANA, you agree to the following terms.
            We keep things simple and transparent — no legal jargon.
          </motion.p>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-xs text-white/50 hover:text-gold bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold/30 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              {section.title}
            </a>
          ))}
        </motion.div>
      </section>

      {/* Sections */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.03 }}
              className={`rounded-2xl border ${section.borderColor} overflow-hidden scroll-mt-24`}
            >
              {/* Section Header */}
              <div className={`${section.bgColor} px-6 py-4 flex items-center gap-3`}>
                <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center">
                  <section.icon size={18} className={section.color} />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {sectionIndex + 1}. {section.title}
                </h2>
              </div>

              {/* Section Content */}
              <div className="px-6 py-5 space-y-3 bg-white/[0.01]">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={14}
                      className={`${section.color} mt-1 shrink-0 opacity-70`}
                    />
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Summary Card */}
      <section className="px-4 sm:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-gold mb-4">
            TL;DR — The Quick Version
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Valid DL + Aadhaar required",
              "Deposit: ₹3K (Alto) / ₹5K (others)",
              "Fuel not included",
              "200-250 km/day limit",
              "Free cancellation 24hrs before",
              "Return clean, same fuel level",
              "No drunk driving or sub-letting",
              "Breakdown support in Patna city",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-gold shrink-0" />
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Questions CTA */}
      <section className="px-4 sm:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-white/50 text-sm mb-4">
            Have questions about any of these terms?
          </p>
          <a
            href="https://wa.me/918252658488?text=Hi!%20I%20have%20a%20question%20about%20your%20rental%20terms."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold/30 text-white/80 hover:text-gold font-medium px-6 py-3 rounded-full text-sm transition-all duration-200"
          >
            <MessageCircle size={16} />
            Ask us on WhatsApp
          </a>
        </motion.div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
