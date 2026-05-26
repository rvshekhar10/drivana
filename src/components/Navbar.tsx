"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X, Phone, ChevronDown, Car, Shield, HelpCircle, MapPin, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "919205548488";

const navLinks = [
  {
    label: "Fleet",
    href: "/fleet",
    description: "Browse all cars & prices",
    icon: Car,
  },
  {
    label: "How It Works",
    href: "/how-it-works",
    description: "4-step booking process",
    icon: Info,
  },
  {
    label: "Safety",
    href: "/safety",
    description: "Insurance & breakdown support",
    icon: Shield,
  },
  {
    label: "About",
    href: "/about",
    description: "Our story & mission",
    icon: MapPin,
  },
  {
    label: "Contact",
    href: "/contact",
    description: "WhatsApp, call, or visit",
    icon: Phone,
  },
];

const moreLinks = [
  { label: "FAQ", href: "/#faq" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close more dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => setMoreOpen(false);
    if (moreOpen) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [moreOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="DRIVANA Home">
            <Image
              src="/drivana-logo-patna.png"
              alt="DRIVANA - Self Drive Car Rental Patna"
              width={160}
              height={44}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm text-white/80 hover:text-gold font-medium transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMoreOpen(!moreOpen);
                }}
                className="flex items-center gap-1 px-4 py-2 text-sm text-white/80 hover:text-gold font-medium transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                More
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="py-2">
                      <Link
                        href="/contact"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-gold hover:bg-white/5 transition-colors"
                      >
                        <Phone size={14} className="text-gold/60" />
                        Contact Us
                      </Link>
                      {moreLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-gold hover:bg-white/5 transition-colors"
                        >
                          <HelpCircle size={14} className="text-white/30" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+917079138350"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <Phone size={14} className="text-gold" />
              <span>70791 38350</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20book%20a%20self-drive%20car%20in%20Patna.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-5 py-2.5 rounded-full text-sm transition-all duration-200 hover:scale-105 shadow-[0_2px_15px_rgba(212,175,55,0.25)]"
            >
              <MessageCircle size={15} />
              Book Now
            </a>
          </div>

          {/* Mobile: CTA + Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20book%20a%20self-drive%20car%20in%20Patna.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gold text-black font-bold px-4 py-2 rounded-full text-xs"
            >
              <MessageCircle size={13} />
              Book
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={22} className="text-white" />
              ) : (
                <Menu size={22} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 bg-black/98 backdrop-blur-lg lg:hidden z-40 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="px-6 py-8"
            >
              {/* Main Links */}
              <div className="space-y-1 mb-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <link.icon size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {link.label}
                        </p>
                        <p className="text-white/40 text-xs mt-0.5">
                          {link.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-6" />

              {/* Secondary Links */}
              <div className="space-y-1 mb-8">
                <p className="text-white/30 text-xs uppercase tracking-wider px-4 mb-3">
                  More
                </p>
                {moreLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-white/60 hover:text-gold text-sm transition-colors rounded-lg hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-6" />

              {/* Contact CTAs */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20book%20a%20self-drive%20car%20in%20Patna.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold py-4 rounded-xl text-base transition-all w-full"
                >
                  <MessageCircle size={18} />
                  Book on WhatsApp
                </a>
                <a
                  href="tel:+917079138350"
                  className="flex items-center justify-center gap-2 border border-white/20 text-white/80 font-medium py-3.5 rounded-xl text-sm transition-all w-full hover:border-gold/50"
                >
                  <Phone size={16} className="text-gold" />
                  Call +91 70791 38350
                </a>
              </div>

              {/* Location */}
              <div className="mt-8 flex items-center gap-2 px-4">
                <MapPin size={14} className="text-gold/50" />
                <span className="text-white/30 text-xs">
                  Bhootnath Road, Patna • 9 AM – 9 PM
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
