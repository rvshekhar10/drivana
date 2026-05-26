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
} from "lucide-react";
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
  },
  {
    icon: Wrench,
    title: "Full Maintenance Support",
    description:
      "We handle all servicing, repairs, and mechanical issues. Your car stays in top shape.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Sparkles,
    title: "Cleanliness & Hygiene",
    description:
      "Professional cleaning after every rental. Interior sanitized, exterior washed - every time.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Shield,
    title: "Complete Inspection",
    description:
      "Thorough vehicle inspection before and after every trip. Take back only what you give.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: HandCoins,
    title: "Damage Protection",
    description:
      "We take care of vehicle damage repairs. No surprise costs - we handle it all.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: Clock,
    title: "Flexible Terms",
    description:
      "List your car when you want, take it back when you need. No long-term lock-in.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Share Your Details",
    description: "Tell us your name, phone number, and car model via WhatsApp.",
  },
  {
    step: "02",
    title: "Vehicle Inspection",
    description: "We inspect your car and document its current condition.",
  },
  {
    step: "03",
    title: "Start Earning",
    description: "Your car goes live on our platform. You earn weekly payouts.",
  },
  {
    step: "04",
    title: "Get It Back Anytime",
    description: "Need your car? Take it back in the same condition you gave it.",
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

      {/* Hero Section */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 relative">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <Car size={16} className="text-gold" />
              <span className="text-gold text-sm font-medium">
                Vehicle Partner Program
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Car is Sitting Idle?
              <br />
              <span className="text-gold">Start Earning with Drivana</span>
            </h1>

            <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              List your car on our self-drive platform. We handle everything - rentals, maintenance, cleaning, and repairs. You just earn.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#partner-form"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-[0_4px_30px_rgba(206,150,61,0.3)]"
              >
                List Your Car
                <ArrowRight size={18} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20list%20my%20car%20on%20Drivana.%20Please%20share%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 font-medium px-8 py-4 rounded-full text-base transition-all hover:border-gold/50 hover:text-gold"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-2xl mx-auto"
          >
            {[
              { value: "₹25K+", label: "Avg. Monthly Earning" },
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
            className="text-center mb-14"
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Why Partner With Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-5">
              We Take Care of Everything
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              You provide the car. We handle the rest - from finding renters to maintaining your vehicle.
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
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${benefit.bg} flex items-center justify-center mb-5`}
                >
                  <benefit.icon size={24} className={benefit.color} />
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

      {/* How It Works */}
      <section className="py-20 sm:py-28 px-4 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
              How Vehicle Onboarding Works
            </h2>
          </motion.div>

          <div className="space-y-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-5 sm:gap-6 p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="text-gold font-bold text-sm">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-20 sm:py-28 px-4 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Our Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-5">
              Take Back Only What You Give
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              We document your car&apos;s condition at onboarding. When you want it back, it&apos;ll be in the same - or better - shape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Full photo & video documentation at handover",
              "Regular servicing on schedule",
              "Interior deep-cleaned after every rental",
              "Damage repaired at our cost",
              "Insurance coverage during rentals",
              "24/7 breakdown support for renters",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                <span className="text-white/70 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
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
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                <Wallet size={26} className="text-gold" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                List Your Car Now
              </h2>
              <p className="text-white/50 text-sm">
                Fill in your details and we&apos;ll reach out on WhatsApp within an hour.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
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
                  <span className="px-3 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white/60 text-sm">
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
                    className="flex-1 px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
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
                  className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] shadow-[0_4px_20px_rgba(206,150,61,0.25)] mt-6"
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

      {/* Earning CTA */}
      <section className="py-16 px-4 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CalendarCheck size={32} className="text-gold mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Start Earning This Week
            </h3>
            <p className="text-white/50 text-base mb-6 max-w-lg mx-auto">
              Most partners start earning within 3-5 days of onboarding. Your idle car could be making money by next week.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20list%20my%20car%20on%20Drivana.%20Please%20share%20details%20about%20the%20partner%20program.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105"
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
