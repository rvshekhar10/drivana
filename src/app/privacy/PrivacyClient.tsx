"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  MessageCircle,
  Database,
  ShieldCheck,
  UserX,
  Cookie,
  RefreshCw,
  Mail,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const dataCollected = [
  { data: "Full Name", purpose: "Identify you and create rental record" },
  { data: "Phone Number", purpose: "WhatsApp communication & booking updates" },
  { data: "Driving License", purpose: "Verify valid license to drive" },
  { data: "Aadhaar / Govt ID", purpose: "Identity verification for vehicle handover" },
  { data: "Pickup/Drop Location", purpose: "Arrange delivery and return" },
];

const sections = [
  {
    id: "collect",
    icon: Database,
    title: "What We Collect",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    id: "use",
    icon: Eye,
    title: "How We Use It",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp Communication",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    id: "sharing",
    icon: ShieldCheck,
    title: "Data Sharing",
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/20",
  },
  {
    id: "storage",
    icon: Lock,
    title: "Storage & Security",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    id: "rights",
    icon: UserX,
    title: "Your Rights",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & Analytics",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "Policy Changes",
    color: "text-teal-400",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
  },
];

export default function PrivacyClient() {
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
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
          >
            <Lock size={14} className="text-blue-400" />
            <span className="text-blue-400 text-xs sm:text-sm font-medium">
              Your data is safe with us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Privacy <span className="text-gold">Policy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-white/50 text-sm sm:text-base max-w-2xl mx-auto"
          >
            We respect your privacy. Here&apos;s exactly what we collect, why, and
            how we protect it. Written in plain language — no legal maze.
          </motion.p>
        </div>
      </section>

      {/* Key Promise — Highlighted */}
      <section className="px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl border border-gold/20 bg-gradient-to-r from-gold/5 via-gold/[0.02] to-gold/5 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} className="text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                Our Core Promise
              </h2>
              <p className="text-white/70 text-sm">
                We do <strong className="text-white">NOT</strong> sell your data
                to third parties. Ever. Your information is used only for rental
                verification and communication. Period.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 1: What We Collect — Table */}
      <section id="collect" className="px-4 sm:px-6 mb-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-blue-500/20 overflow-hidden"
          >
            <div className="bg-blue-500/10 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center">
                <Database size={18} className="text-blue-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                1. Information We Collect
              </h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-sm font-semibold text-blue-400">
                        Data
                      </th>
                      <th className="text-left py-3 text-sm font-semibold text-blue-400">
                        Why We Need It
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCollected.map((row) => (
                      <tr
                        key={row.data}
                        className="border-b border-white/5"
                      >
                        <td className="py-3 pr-4 text-white font-medium text-sm">
                          {row.data}
                        </td>
                        <td className="py-3 text-white/60 text-sm">
                          {row.purpose}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: How We Use It */}
      <section id="use" className="px-4 sm:px-6 mb-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-purple-500/20 overflow-hidden"
          >
            <div className="bg-purple-500/10 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center">
                <Eye size={18} className="text-purple-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                2. How We Use Your Data
              </h2>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[
                "Verify your identity before handing over the vehicle",
                "Communicate about your booking via WhatsApp and calls",
                "Maintain rental records for operational and legal purposes",
                "Contact you regarding refunds, damage claims, or disputes",
                "Send promotional offers (only with consent — opt out anytime)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={14}
                    className="text-purple-400 mt-1 shrink-0"
                  />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: WhatsApp */}
      <section id="whatsapp" className="px-4 sm:px-6 mb-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-green-500/20 overflow-hidden"
          >
            <div className="bg-green-500/10 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center">
                <MessageCircle size={18} className="text-green-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                3. WhatsApp Communication
              </h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                DRIVANA primarily communicates via WhatsApp for bookings,
                confirmations, and support. By initiating a conversation with us,
                you consent to receiving messages related to your rental.
              </p>
              <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4">
                <p className="text-white/60 text-sm">
                  <strong className="text-green-400">No bots.</strong> All
                  conversations are handled by our team personally. We don&apos;t
                  use automated messaging systems.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Data Sharing */}
      <section id="sharing" className="px-4 sm:px-6 mb-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gold/20 overflow-hidden"
          >
            <div className="bg-gold/10 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center">
                <ShieldCheck size={18} className="text-gold" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                4. Data Sharing
              </h2>
            </div>
            <div className="px-6 py-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
                    <XCircle size={14} className="text-red-400" />
                    We NEVER share with:
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Advertisers",
                      "Marketing agencies",
                      "Data brokers",
                      "Third-party apps",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-white/60 text-sm"
                      >
                        <XCircle size={12} className="text-red-400/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-gold" />
                    May share only with:
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Law enforcement (if legally required)",
                      "Insurance company (in case of accident claim)",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-white/60 text-sm"
                      >
                        <CheckCircle2 size={12} className="text-gold/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Storage & Security */}
      <section id="storage" className="px-4 sm:px-6 mb-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-cyan-500/20 overflow-hidden"
          >
            <div className="bg-cyan-500/10 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center">
                <Lock size={18} className="text-cyan-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                5. Data Storage & Security
              </h2>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[
                "Documents (DL, Aadhaar photos) are deleted within 30 days of rental completion.",
                "Basic rental records (name, phone, dates) are retained for operational purposes.",
                "We use reasonable security measures to protect data from unauthorized access.",
                "Data is stored on secure devices — not on public cloud servers.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={14}
                    className="text-cyan-400 mt-1 shrink-0"
                  />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Your Rights */}
      <section id="rights" className="px-4 sm:px-6 mb-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-emerald-500/20 overflow-hidden"
          >
            <div className="bg-emerald-500/10 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center">
                <UserX size={18} className="text-emerald-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                6. Your Rights
              </h2>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[
                "Request deletion of your personal data at any time.",
                "Opt out of promotional messages by replying \"STOP\" on WhatsApp.",
                "Request a copy of the data we hold about you.",
                "Ask us to correct any inaccurate information.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={14}
                    className="text-emerald-400 mt-1 shrink-0"
                  />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Cookies */}
      <section id="cookies" className="px-4 sm:px-6 mb-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-amber-500/20 overflow-hidden"
          >
            <div className="bg-amber-500/10 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center">
                <Cookie size={18} className="text-amber-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                7. Cookies & Analytics
              </h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Our website uses <strong className="text-white">Vercel Analytics</strong> to
                understand traffic patterns. We do not use:
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  "Third-party tracking cookies",
                  "Retargeting pixels",
                  "Personal data in analytics",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2"
                  >
                    <XCircle size={12} className="text-amber-400 shrink-0" />
                    <span className="text-white/60 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 8: Changes */}
      <section id="changes" className="px-4 sm:px-6 mb-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-teal-500/20 overflow-hidden"
          >
            <div className="bg-teal-500/10 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center">
                <RefreshCw size={18} className="text-teal-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                8. Changes to This Policy
              </h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-white/70 text-sm leading-relaxed">
                We may update this privacy policy from time to time. Changes will
                be posted on this page with an updated date. Continued use of our
                services after changes constitutes acceptance of the updated
                policy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact for Privacy */}
      <section className="px-4 sm:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Mail size={18} className="text-gold" />
            <h2 className="text-lg font-bold text-white">
              Privacy Questions?
            </h2>
          </div>
          <p className="text-white/60 text-sm mb-4">
            For any privacy-related questions, data deletion requests, or
            concerns:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/918252658488?text=Hi!%20I%20have%20a%20privacy-related%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 font-medium px-5 py-2.5 rounded-xl text-sm transition-all"
            >
              <MessageCircle size={15} />
              WhatsApp: +91 82526 58488
            </a>
            <a
              href="mailto:hello@drivana.in"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium px-5 py-2.5 rounded-xl text-sm transition-all"
            >
              <Mail size={15} />
              hello@drivana.in
            </a>
          </div>
          <p className="text-white/30 text-xs mt-4">
            Address: Bhoothnath Road, Patna, Bihar 800001
          </p>
        </motion.div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
