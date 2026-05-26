"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Camera, MessageCircle } from "lucide-react";
import Image from "next/image";

const WHATSAPP_NUMBER = "919205548488";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/[0.06] pt-16 sm:pt-20 px-4 sm:px-6"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/drivana-logo-patna.png"
              alt="DRIVANA Logo"
              width={160}
              height={45}
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Patna&apos;s trusted self-drive car rental service. Premium cars,
              transparent pricing, and hassle-free booking via WhatsApp.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/drivana.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-gold/50 hover:bg-gold/10 transition-all duration-200"
                aria-label="Follow us on Instagram"
              >
                <Camera size={16} className="text-white/60" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-gold/50 hover:bg-gold/10 transition-all duration-200"
                aria-label="Message us on WhatsApp"
              >
                <MessageCircle size={16} className="text-white/60" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  About Drivana
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/safety"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  Safety & Support
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/#testimonials"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Cars */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Popular Cars
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/cars/nissan-magnite-on-rent-patna"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  Nissan Magnite on Rent
                </a>
              </li>
              <li>
                <a
                  href="/cars/tata-tiago-on-rent-patna"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  Tata Tiago on Rent
                </a>
              </li>
              <li>
                <a
                  href="/cars/maruti-alto-on-rent-patna"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  Maruti Alto on Rent
                </a>
              </li>
              <li>
                <a
                  href="/cars/ford-freestyle-on-rent-patna"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  Ford Freestyle on Rent
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold/70 mt-0.5 shrink-0" />
                <span className="text-sm text-white/40">
                  Patna, Bihar 800026, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold/70 shrink-0" />
                <a
                  href="tel:+917079138350"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  +91 70791 38350
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold/70 shrink-0" />
                <a
                  href="mailto:drivanaofficial@gmail.com"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  drivanaofficial@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={16} className="text-gold/70 shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* SEO-rich content section */}
        <div className="mt-14 pt-8 border-t border-white/[0.06]">
          <div className="max-w-4xl">
            <h3 className="text-sm font-semibold text-white/60 mb-3">
              Self-Drive Car Rental in Patna, Bihar
            </h3>
            <p className="text-xs text-white/30 leading-relaxed">
              DRIVANA is Patna&apos;s leading self-drive car rental service
              offering well-maintained cars without a driver. Whether you need a
              car for a weekend trip to Rajgir, Nalanda, or Bodh Gaya, a wedding
              event, airport pickup, or daily commute - we have the perfect
              vehicle for you. Our fleet includes popular models like Nissan
              Magnite, Tata Tiago, Maruti Alto, and Ford Freestyle available from
              our Bhootnath Road pickup location. We serve all major areas in
              Patna including Boring Road, Kankarbagh, Bailey Road, Patliputra
              Colony, Danapur, Phulwari Sharif, and Rajendra Nagar. Prices start
              at just ₹1,399/day with discounts up to 33% off. Book your
              self-drive car rental in Patna today via WhatsApp for instant
              confirmation and doorstep delivery.
            </p>
          </div>
        </div>

        {/* Service areas for local SEO */}
        <div className="mt-6 pt-4 border-t border-white/[0.04]">
          <p className="text-xs text-white/20">
            <span className="text-white/30">Areas we serve:</span> Boring Road •
            Kankarbagh • Bailey Road • Patliputra Colony • Danapur • Phulwari
            Sharif • Rajendra Nagar • Ashiana Nagar • Anisabad • Gardanibagh •
            Jakkanpur • Mahendru • Kadamkuan • Bankipur • Exhibition Road •
            Fraser Road • Gandhi Maidan • Patna Junction • Patna Airport
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Drivana. All rights reserved. Built with ❤️ in India by{" "}
            <a
              href="https://purpul.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              PURPUL
            </a>
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-xs text-white/30 hover:text-gold transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-xs text-white/30 hover:text-gold transition-colors"
            >
              Terms & Conditions
            </a>
            <a
              href="/refund"
              className="text-xs text-white/30 hover:text-gold transition-colors"
            >
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
