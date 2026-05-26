"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, IndianRupee, Car, Headphones, MapPin } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Well-Maintained Cars",
    description: "Every car is regularly serviced, sanitized, and inspected before handover.",
  },
  {
    icon: Clock,
    title: "Easy Booking",
    description: "Book in minutes via WhatsApp. No lengthy paperwork or hidden processes.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description: "What you see is what you pay. No hidden charges, no surprises.",
  },
  {
    icon: Car,
    title: "Flexible Duration",
    description: "Rent for a day, a week, or a month. Plans that fit your schedule.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Roadside assistance and customer support available 7 days a week, 9 AM to 9 PM.",
  },
  {
    icon: MapPin,
    title: "Doorstep Delivery",
    description: "Get the car delivered to your location in Patna. Convenience first.",
  },
];

export default function WhyDrivana() {
  return (
    <section id="why-us" className="py-16 sm:py-20 px-4 sm:px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

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
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            The Drivana Difference
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            We&apos;re not just a rental service - we&apos;re your trusted travel partner in Patna.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.04] hover:border-gold/30 hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                <feature.icon size={22} className="text-gold" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
