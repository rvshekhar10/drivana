"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Wallet,
  Shield,
  Sparkles,
  Wrench,
  CalendarCheck,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  IndianRupee,
  Clock,
  HandCoins,
  TrendingUp,
  Eye,
  FileCheck,
  Fuel,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const WHATSAPP_NUMBER = "919205548488";

const benefits = [
  {
    icon: IndianRupee,
    title: "Weekly Payouts",
    description:
      "Regular income from your idle car. Get paid every week directly to your bank account.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Wrench,
    title: "Full Maintenance Support",
    description:
      "We handle all servicing, repairs, and mechanical issues. Your car stays in top shape.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Sparkles,
    title: "Cleanliness & Hygiene",
    description:
      "Professional cleaning after every rental. Interior sanitized, exterior washed — every time.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Shield,
    title: "Complete Inspection",
    description:
      "Thorough vehicle inspection before and after every trip. Take back only what you give.",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    icon: HandCoins,
    title: "Damage Protection",
    description:
      "We take care of vehicle damage repairs. No surprise costs — we handle it all.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: Clock,
    title: "Flexible Terms",
    description:
      "List your car when you want, take it back when you need. No long-term lock-in.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Share Your Details",
    description:
      "Tell us your name, phone number, and car model via WhatsApp. We'll respond within an hour.",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "Vehicle Inspection",
    description:
      "We inspect your car, document its condition with photos & video, and agree on terms.",
    icon: Eye,
  },
  {
    step: "03",
    title: "Go Live & Earn",
    description:
      "Your car goes live on our platform. Bookings start coming in. You earn weekly payouts.",
    icon: TrendingUp,
  },
  {
    step: "04",
    title: "Get It Back Anytime",
    description:
      "Need your car? Take it back in the same condition you gave it. No questions asked.",
    icon: Car,
  },
];

const promises = [
  {
    icon: FileCheck,
    text: "Full photo & video documentation at handover",
  },
  {
    icon: Wrench,
    text: "Regular servicing on schedule",
  },
  {
    icon: Sparkles,
    text: "Interior deep-cleaned after every rental",
  },
  {
    icon: Shield,
    text: "Damage repaired at our cost",
  },
  {
    icon: Car,
    text: "Insurance coverage during rentals",
  },
  {
    icon: Fuel,
    text: "Fuel level maintained as received",
  },
];

export default function PartnerClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I want to list my car on Drivana.\n\nName: ${name}\nPhone: ${phone}\nCar Model: ${carModel}\n\nPlease share more details about the vehicle onboarding process.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/drivana-hero-image.avif"
          alt="List your car on Drivana - Vehicle Partner Program"
          fill
          className="object-cover"
          priority
          quality={85}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Vehicle Partner Program
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Car is Sitting Idle?
              <br />
              <span className="text-gold">Start Earning with Drivana</span>
            </h1>

            <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              List your car on Patna&apos;s trusted self-drive platform. We handle rentals, maintenance, cleaning, and repairs. You just earn.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#partner-form"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-[0_4px_30px_rgba(206,150,61,0.4)]"
              >
                List Your Car
                <ArrowRight size={18} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20list%20my%20car%20on%20Drivana.%20Please%20share%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-8 py-4 rounded-full text-base transition-all hover:border-gold/50 hover:text-gold backdrop-blur-sm"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            {[
              { value: "₹45K", label: "Max. Monthly Earning" },
              { value: "Weekly", label: "Payouts" },
              { value: "100%", label: "Maintenance Covered" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gold">
                  {stat.value}
                </p>
                <p className="text-white/40 text-xs sm:text-sm mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Why Partner With Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-5">
              We Take Care of Everything
            </h2>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
              You provide the car. We handle the rest — from finding renters to maintaining your vehicle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative rounded-2xl border ${benefit.border} bg-white/[0.02] p-7 sm:p-8 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/15 hover:scale-[1.02]`}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${benefit.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon size={26} className={benefit.color} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Visual Timeline */}
      <section className="py-20 sm:py-28 px-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">
              How Vehicle Onboarding Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start gap-5 p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group"
              >
                {/* Step number badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gold flex items-center justify-center shadow-lg">
                  <span className="text-black font-bold text-xs">
                    {item.step}
                  </span>
                </div>

                <div className="shrink-0 w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <item.icon size={22} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-20 sm:py-28 px-4 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
                Our Promise
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-5">
                Take Back Only
                <br />
                What You Give
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                We document your car&apos;s condition at onboarding with photos and video. When you want it back, it&apos;ll be in the same — or better — shape. That&apos;s our guarantee.
              </p>

              <a
                href="#partner-form"
                className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors"
              >
                Get Started
                <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Right - Checklist */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              {promises.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle size={18} className="text-emerald-400" />
                  </div>
                  <span className="text-white/70 text-sm font-medium">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Earnings Breakdown */}
      <section className="py-20 sm:py-28 px-4 border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Earning Potential
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-5">
              How Much Can You Earn?
            </h2>
            <p className="text-white/50 text-base max-w-lg mx-auto">
              Earnings depend on your car model, condition, and demand. Here&apos;s a rough estimate.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                label: "Hatchback",
                example: "Alto, Tiago, Swift",
                earning: "₹27,000",
                period: "/month",
              },
              {
                label: "Sedan / Crossover",
                example: "Dzire, Freestyle, Amaze",
                earning: "₹40,000",
                period: "/month",
              },
              {
                label: "SUV / Premium",
                example: "Magnite, Creta, Seltos",
                earning: "₹45,000",
                period: "/month",
              },
            ].map((tier, index) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                  {tier.label}
                </p>
                <p className="text-white/50 text-sm mb-3">Earn upto</p>
                <p className="text-3xl sm:text-4xl font-bold text-gold mb-1">
                  {tier.earning}
                </p>
                <p className="text-white/30 text-sm">{tier.period}</p>
                <p className="text-white/40 text-xs mt-3">{tier.example}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-white/30 text-xs text-center mt-6">
            * Estimates based on full monthly bookings. Actual earnings depend on demand and availability.
          </p>
        </div>
      </section>

      {/* CTA Form Section */}
      <section
        id="partner-form"
        className="py-20 sm:py-28 px-4 border-t border-white/[0.04]"
      >
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5">
                <Wallet size={28} className="text-gold" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                List Your Car Now
              </h2>
              <p className="text-white/50 text-sm">
                Fill in your details and we&apos;ll reach out on WhatsApp within an hour.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8"
            >
              <div>
                <label
                  htmlFor="partner-name"
                  className="block text-sm font-medium text-white/70 mb-2"
                >
                  Your Name
                </label>
                <input
                  id="partner-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ravi Kumar"
                  className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="partner-phone"
                  className="block text-sm font-medium text-white/70 mb-2"
                >
                  Phone Number
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-white/60 text-sm">
                    +91
                  </span>
                  <input
                    id="partner-phone"
                    type="tel"
                    inputMode="numeric"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="98765 43210"
                    className="flex-1 px-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="partner-car"
                  className="block text-sm font-medium text-white/70 mb-2"
                >
                  Car Model & Year
                </label>
                <input
                  id="partner-car"
                  type="text"
                  required
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  placeholder="e.g. Maruti Swift 2020"
                  className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] shadow-[0_4px_20px_rgba(206,150,61,0.3)] mt-2"
              >
                <MessageCircle size={18} />
                Send Details on WhatsApp
              </button>
            </form>

            <p className="text-white/30 text-xs text-center mt-5">
              We&apos;ll message you on WhatsApp to discuss next steps. No spam, ever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CalendarCheck size={36} className="text-gold mx-auto mb-5" />
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start Earning This Week
            </h3>
            <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
              Most partners start earning within 3-5 days of onboarding. Your idle car could be making money by next week.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20list%20my%20car%20on%20Drivana.%20Please%20share%20details%20about%20the%20partner%20program.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-10 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-[0_4px_30px_rgba(206,150,61,0.3)]"
            >
              <MessageCircle size={18} />
              Chat with Us Now
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
