"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "918252658488";

export default function CTABanner() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Ready to Hit the Road?
        </h2>
        <p className="text-white/60 mt-4 text-sm sm:text-base max-w-xl mx-auto">
          Book your self-drive car in Patna in under 5 minutes. Message us on
          WhatsApp and get instant confirmation.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20book%20a%20self-drive%20car%20in%20Patna.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold px-8 py-4 rounded-full text-sm sm:text-base transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <MessageCircle size={18} />
            Book on WhatsApp Now
          </a>
          <a
            href="tel:+918252658488"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-gold/50 text-white/80 hover:text-white font-medium px-8 py-4 rounded-full text-sm sm:text-base transition-all duration-200"
          >
            <Phone size={18} />
            Call Us Directly
          </a>
        </div>

        <p className="mt-6 text-xs text-white/30">
          Available 7 days a week • 9 AM to 9 PM • Instant response guaranteed
        </p>
      </motion.div>
    </section>
  );
}
