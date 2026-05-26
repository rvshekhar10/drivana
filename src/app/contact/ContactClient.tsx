"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Fastest response",
    value: "+91 92055 48488",
    href: "https://wa.me/919205548488?text=Hi%20DRIVANA!%20I%20have%20a%20question.",
    cta: "Message Now",
    color: "from-green-500/20 to-green-500/5",
    borderColor: "border-green-500/30",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    ctaBg: "bg-green-500 hover:bg-green-600",
    badge: "Responds in minutes",
  },
  {
    icon: Phone,
    title: "Call Us",
    subtitle: "Talk to a human",
    value: "+91 70791 38350",
    href: "tel:+917079138350",
    cta: "Call Now",
    color: "from-gold/20 to-gold/5",
    borderColor: "border-gold/30",
    iconBg: "bg-gold/20",
    iconColor: "text-gold",
    ctaBg: "bg-gold hover:bg-gold-light",
    badge: "9 AM – 9 PM",
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: "For detailed queries",
    value: "drivanaofficial@gmail.com",
    href: "mailto:drivanaofficial@gmail.com",
    cta: "Send Email",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    ctaBg: "bg-blue-500 hover:bg-blue-600",
    badge: "Within 24 hours",
  },
];

const faqs = [
  {
    q: "What's the fastest way to book?",
    a: "WhatsApp us with your preferred car, dates, and location. We confirm within minutes.",
  },
  {
    q: "Can I visit your office?",
    a: "Yes! We're at Bhootnath Road, Patna. Open 9 AM – 9 PM, 7 days a week.",
  },
  {
    q: "Do you offer doorstep delivery?",
    a: "Doorstep delivery within Patna city limits. Just mention your address when booking.",
  },
  {
    q: "What if I need help after hours?",
    a: "WhatsApp is monitored after business hours for emergencies. We'll respond ASAP.",
  },
];

export default function ContactClient() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/drivana-hero-image.avif"
          alt="Contact DRIVANA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-gold text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
          >
            We&apos;re One
            <br />
            <span className="text-gold">Message Away</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-white/60 text-base sm:text-lg max-w-md mx-auto"
          >
            WhatsApp us and get a response within minutes. No bots, no waiting.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods - Large Cards */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.title === "WhatsApp" ? "_blank" : undefined}
                rel={
                  method.title === "WhatsApp"
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl border ${method.borderColor} overflow-hidden group block hover:scale-[1.02] transition-all duration-300`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative z-10 p-6 sm:p-8 text-center">
                  {/* Badge */}
                  <span className="inline-block text-[10px] bg-white/10 text-white/50 px-2.5 py-1 rounded-full mb-4">
                    {method.badge}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${method.iconBg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <method.icon size={28} className={method.iconColor} />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-1">
                    {method.title}
                  </h2>
                  <p className="text-white/50 text-sm mb-3">
                    {method.subtitle}
                  </p>

                  {/* Value */}
                  <p className="text-white font-medium text-sm mb-5">
                    {method.value}
                  </p>

                  {/* CTA */}
                  <span
                    className={`inline-flex items-center gap-2 ${method.ctaBg} text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all`}
                  >
                    {method.cta}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Location + Map */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              Visit Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Our Location
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-5 gap-6 items-stretch"
          >
            {/* Map - takes 3 columns */}
            <div className="md:col-span-3 rounded-2xl overflow-hidden border border-white/10 min-h-[300px] sm:min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.5!2d85.1376!3d25.6093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBhoothnath+Road%2C+Patna%2C+Bihar!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DRIVANA Location - Bhootnath Road, Patna"
                className="w-full h-full"
              />
            </div>

            {/* Info Card - takes 2 columns */}
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gold mb-6">
                  DRIVANA Pickup Point
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Address</p>
                      <p className="text-white/60 text-sm mt-0.5">
                        Bhootnath Road, Patna,
                        <br />
                        Bihar 800026, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Hours</p>
                      <p className="text-white/60 text-sm mt-0.5">
                        9:00 AM - 9:00 PM
                        <br />
                        Open 7 days a week
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Send size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        Doorstep Delivery
                      </p>
                      <p className="text-white/60 text-sm mt-0.5">
                        Free within Patna city limits.
                        <br />
                        Airport pickup available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Bhoothnath+Road+Patna+Bihar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold/10 hover:bg-gold border border-gold/30 hover:border-gold text-gold hover:text-black font-semibold py-3 rounded-xl text-sm transition-all duration-300 mt-6 w-full"
              >
                <MapPin size={16} />
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent p-8 sm:p-12"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageCircle size={22} className="text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Ready to Book?
                    </h2>
                    <p className="text-green-400/70 text-sm">
                      The fastest way to get a car
                    </p>
                  </div>
                </div>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-5">
                  Just send us a WhatsApp message with your preferred car, dates,
                  and pickup location. We&apos;ll confirm availability and have
                  you driving within hours.
                </p>

                <div className="space-y-2.5">
                  <h3 className="text-white font-medium text-sm">
                    Include in your message:
                  </h3>
                  {[
                    "Car preference (Magnite, Tiago, Alto, Freestyle)",
                    "Rental dates & times",
                    "Pickup location or delivery address",
                    "Any special requirements",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="text-green-400 mt-0.5 shrink-0"
                      />
                      <span className="text-white/60 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="md:w-56 shrink-0 text-center">
                <a
                  href="https://wa.me/919205548488?text=Hi%20DRIVANA!%20I%20want%20to%20book%20a%20self-drive%20car%20in%20Patna.%0A%0ACar:%20%0ADates:%20%0APickup:%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Book Now
                </a>
                <p className="text-white/30 text-xs mt-3">
                  Pre-filled message template
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick FAQs */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              Quick <span className="text-gold">Answers</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-gold/20 transition-all duration-300"
              >
                <p className="text-white font-medium text-sm mb-2">{faq.q}</p>
                <p className="text-white/50 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Trust Line */}
      <section className="py-12 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-white/40 text-sm">
            We respond to every message personally. No automated replies, no
            chatbots - just real people who care about your experience in Patna.
          </p>
        </motion.div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
