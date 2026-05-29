"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What documents do I need to rent a self-drive car in Patna?",
    answer:
      "You need a valid driving license, Aadhaar card (or any government-issued ID proof), and a security deposit (₹3,000 for Alto, ₹5,000 for other cars). Alternatively, no deposit is required if you submit your original passport as security. The verification process is quick and can be done via WhatsApp itself.",
  },
  {
    question: "What is the minimum rental duration?",
    answer:
      "The minimum rental duration is 24 hours. We also offer attractive weekly and monthly packages at discounted rates - perfect for extended trips or temporary needs.",
  },
  {
    question: "Is fuel included in the rental price?",
    answer:
      "No, fuel is not included in any of our rental plans. You receive the car with a certain fuel level and are expected to return it at the same level. This keeps our pricing transparent and fair.",
  },
  {
    question: "Do you provide doorstep delivery in Patna?",
    answer:
      "Yes! We offer doorstep delivery and pickup within Patna city limits including areas like Boring Road, Kankarbagh, Bailey Road, Patliputra, and more. For locations outside the city, a nominal delivery charge may apply.",
  },
  {
    question: "What happens if the car breaks down during my rental?",
    answer:
      "Within Patna city limits, our team physically reaches you and handles the issue at no extra cost. For breakdowns outside the city, we will try our best to assist you remotely — any mechanic or towing charges will be on you. Replacement vehicle is subject to availability.",
  },
  {
    question: "Can I take the car for outstation trips from Patna?",
    answer:
      "Absolutely! Outstation trips to destinations like Rajgir, Nalanda, Bodh Gaya, Varanasi, and Ranchi are allowed. Just inform us about your travel plan while booking. Per-km charges may apply beyond the included daily limit.",
  },
  {
    question: "What is the security deposit amount?",
    answer:
      "The security deposit is ₹3,000 for Alto and ₹5,000 for Tiago, Magnite, and Freestyle. No deposit is needed if you submit your original passport as security. It is refundable once the vehicle is returned in proper condition. Damage repairs and cleaning charges (if any) will be deducted. You need to submit an original ID proof and a photocopy of your driving license. Payment can be made via UPI, bank transfer, or cash.",
  },
  {
    question: "Is there a km limit per day?",
    answer:
      "Yes. Km limits vary by vehicle: Alto has 200 km/day (1200 km/week, ₹7/km extra), Tiago has 250 km/day (1500 km/week, 3000 km/month, ₹8/km extra), Magnite has 250 km/day (1200 km/week, 3000 km/month, ₹8/km extra), and Freestyle has 200 km/day (1200 km/week, ₹9/km extra). Fuel is not included in any plan.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Free cancellation up to 24 hours before the pickup time. Cancellations within 24 hours may attract a nominal fee. We understand plans change - reach out to us on WhatsApp and we'll work it out.",
  },
];

function FAQItem({
  faq,
  index,
}: {
  faq: { question: string; answer: string };
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border border-white/[0.06] rounded-xl overflow-hidden hover:border-gold/20 transition-colors duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-medium text-white/90 pr-4">
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          className={`text-gold shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5 sm:pb-6" : "max-h-0"
        }`}
      >
        <p className="px-5 sm:px-6 text-sm text-white/50 leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Got Questions?
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Everything you need to know about renting a self-drive car in Patna
            with Drivana.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
