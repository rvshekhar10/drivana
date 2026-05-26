"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Menu, X, Phone } from "lucide-react";
import Image from "next/image";

const WHATSAPP_NUMBER = "918252658488";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Fleet", href: "#fleet" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Why Us", href: "#why-us" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

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
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo — bigger and more prominent */}
          <a href="/" className="flex items-center gap-2" aria-label="DRIVANA Home">
            <Image
              src="/drivana-logo-patna.png"
              alt="DRIVANA - Self Drive Car Rental Patna"
              width={180}
              height={50}
              className="h-11 sm:h-13 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/80 hover:text-gold font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918252658488"
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-gold text-sm font-medium transition-colors"
            >
              <Phone size={14} />
              <span className="hidden xl:inline">82526 58488</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20book%20a%20self-drive%20car%20in%20Patna.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 hover:scale-105 shadow-[0_2px_15px_rgba(212,175,55,0.3)]"
            >
              <MessageCircle size={16} />
              Book Now
            </a>
          </div>

          {/* Mobile: Phone + Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:+918252658488"
              className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center"
              aria-label="Call us"
            >
              <Phone size={16} className="text-gold" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden pb-6 border-t border-white/5"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/80 hover:text-gold transition-colors px-2 py-1.5 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20book%20a%20self-drive%20car%20in%20Patna.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-5 py-3.5 rounded-full text-sm transition-all duration-200 mt-2"
              >
                <MessageCircle size={16} />
                Book on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
