"use client";

import { motion } from "framer-motion";
import {
  RotateCcw,
  Shield,
  AlertTriangle,
  XCircle,
  Clock,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  IndianRupee,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const cancellationTable = [
  {
    when: "24+ hours before pickup",
    refund: "Full refund",
    fee: "No fee",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    when: "12–24 hours before pickup",
    refund: "Partial refund",
    fee: "50% of 1 day's rental",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    when: "Less than 12 hours / No-show",
    refund: "No refund on rental",
    fee: "Full day charged",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

const deductions = [
  {
    icon: AlertTriangle,
    title: "New Scratches or Dents",
    description: "Repair cost as assessed at a local service center.",
    color: "text-amber-400",
  },
  {
    icon: XCircle,
    title: "Broken Parts",
    description: "Replacement cost of the damaged component.",
    color: "text-red-400",
  },
  {
    icon: Sparkles,
    title: "Excessive Cleaning",
    description: "₹300–₹500 for heavy dirt, pet hair, smoke smell, or food stains.",
    color: "text-purple-400",
  },
  {
    icon: IndianRupee,
    title: "Missing Fuel",
    description: "Fuel cost at prevailing rates + ₹100 convenience charge.",
    color: "text-cyan-400",
  },
];

const timeline = [
  {
    step: "1",
    title: "Vehicle Return",
    description: "Return the car at the agreed time. We inspect it together.",
    time: "Day 0",
  },
  {
    step: "2",
    title: "Inspection",
    description: "We check exterior, interior, fuel level, and odometer.",
    time: "Same day",
  },
  {
    step: "3",
    title: "Assessment",
    description: "If deductions apply, you're informed with exact amount and reason.",
    time: "Within hours",
  },
  {
    step: "4",
    title: "Refund Processed",
    description: "Full or adjusted deposit sent via UPI or bank transfer.",
    time: "24–48 hours",
  },
];

export default function RefundClient() {
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
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6"
          >
            <RotateCcw size={14} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs sm:text-sm font-medium">
              Transparent & Fair
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Refund <span className="text-gold">Policy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-white/50 text-sm sm:text-base max-w-2xl mx-auto"
          >
            No surprises, no hidden deductions. Here&apos;s exactly how refunds
            work - you&apos;ll know the outcome before it happens.
          </motion.p>
        </div>
      </section>

      {/* Deposit Amounts */}
      <section className="px-4 sm:px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 to-gold/[0.02] p-6 text-center">
              <Shield size={24} className="text-gold mx-auto mb-3" />
              <p className="text-3xl font-bold text-gold">₹3,000</p>
              <p className="text-white/60 text-sm mt-1">Maruti Alto</p>
              <p className="text-white/30 text-xs mt-2">Refundable deposit</p>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 to-gold/[0.02] p-6 text-center">
              <Shield size={24} className="text-gold mx-auto mb-3" />
              <p className="text-3xl font-bold text-gold">₹5,000</p>
              <p className="text-white/60 text-sm mt-1">
                Magnite, Tiago & Freestyle
              </p>
              <p className="text-white/30 text-xs mt-2">Refundable deposit</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Refund Timeline - Visual Steps */}
      <section className="px-4 sm:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-3">
              Refund Process
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-4 gap-4">
            {timeline.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Connector */}
                {index < timeline.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/30 to-transparent" />
                )}

                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold font-bold text-xl">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  {step.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed mb-2">
                  {step.description}
                </p>
                <span className="text-gold/60 text-[10px] font-mono uppercase tracking-wider">
                  {step.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cancellation Table */}
      <section className="px-4 sm:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="bg-white/[0.03] px-6 py-4 flex items-center gap-3 border-b border-white/10">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <XCircle size={18} className="text-amber-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Cancellation Refunds
              </h2>
            </div>

            <div className="divide-y divide-white/5">
              {cancellationTable.map((row) => (
                <div
                  key={row.when}
                  className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-2"
                >
                  <div className="flex-1">
                    <p className="text-white/80 text-sm font-medium">
                      {row.when}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-semibold ${row.color} ${row.bg} px-3 py-1 rounded-full`}
                    >
                      {row.refund}
                    </span>
                    <span className="text-white/40 text-xs">{row.fee}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-emerald-500/5 border-t border-emerald-500/10">
              <p className="text-emerald-400/80 text-sm flex items-center gap-2">
                <CheckCircle2 size={14} />
                Security deposit is always refunded regardless of cancellation
                timing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Damage Deductions */}
      <section className="px-4 sm:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-amber-400/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              What May Be Deducted
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-3">
              Possible Deductions
            </h2>
            <p className="text-white/40 text-sm mt-2 max-w-lg mx-auto">
              Deductions only apply if the car is returned with damage or in
              unclean condition. Pre-existing damage is documented before
              handover.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {deductions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-amber-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <item.icon size={18} className={item.color} />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pre-existing damage note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-start gap-3"
          >
            <CheckCircle2
              size={16}
              className="text-emerald-400 mt-0.5 shrink-0"
            />
            <p className="text-white/70 text-sm">
              <strong className="text-emerald-400">Fair policy:</strong>{" "}
              Pre-existing damage is photo-documented before handover. You will
              never be charged for something that was already there.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Refund Method & Timeline */}
      <section className="px-4 sm:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-cyan-500/20 overflow-hidden"
          >
            <div className="bg-cyan-500/10 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center">
                <Clock size={18} className="text-cyan-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Refund Timeline & Method
              </h2>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[
                {
                  label: "Security deposit",
                  value: "24–48 hours after vehicle return and inspection",
                },
                {
                  label: "Cancellation refund",
                  value: "Within 48 hours of cancellation confirmation",
                },
                {
                  label: "Refund method",
                  value:
                    "Same method as payment (UPI or bank transfer). Cash deposits refunded via UPI.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-cyan-400 font-medium text-sm sm:w-48 shrink-0">
                    {item.label}
                  </span>
                  <span className="text-white/70 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disputes */}
      <section className="px-4 sm:px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={18} className="text-gold" />
              <h2 className="text-lg font-bold text-white">
                Disagree with a Deduction?
              </h2>
            </div>
            <p className="text-white/60 text-sm mb-5">
              If you disagree with any deduction, reach out within 7 days of the
              refund. We&apos;ll review the inspection photos together and
              resolve it fairly. We aim for zero disputes - transparency is our
              foundation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919205548488?text=Hi!%20I%20have%20a%20question%20about%20a%20deduction%20from%20my%20deposit."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 font-medium px-5 py-3 rounded-xl text-sm transition-all"
              >
                <MessageCircle size={16} />
                Raise on WhatsApp
              </a>
              <a
                href="mailto:drivanaofficial@gmail.com?subject=Deposit%20Deduction%20Query"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium px-5 py-3 rounded-xl text-sm transition-all"
              >
                <ArrowRight size={14} />
                Email: drivanaofficial@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TL;DR */}
      <section className="px-4 sm:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-gold mb-4">
            TL;DR - Refund Summary
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Deposit refunded in 24–48 hours",
              "No deductions if car returned clean & undamaged",
              "Pre-existing damage is documented - you won't be blamed",
              "Free cancellation 24+ hours before",
              "Disputes resolved within 7 days",
              "Refund via UPI or bank transfer",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-gold shrink-0" />
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
