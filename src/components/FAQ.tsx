"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What documents do I need to rent a self-drive car in Patna?",
    answer:
      "You need a valid driving license, Aadhaar card (or any government-issued ID proof), and a security deposit starting from ₹5,000. The verification process is quick and can be done via WhatsApp itself.",
  },
  {
    question: "What is the minimum rental duration?",
    answer:
      "The minimum rental duration is 24 hours. We also offer attractive weekly and monthly packages at discounted rates - perfect for extended trips or temporary needs.",
  },
  {
    question: "Is fuel included in the rental price?",
    answer:
      "No, fuel is not included in the rental price. You receive the car with a certain fuel level and are expected to return it at the same level. This keeps our pricing transparent and fair.",
  },
  {
    question: "Do you provide doorstep delivery in Patna?",
    answer:
      "Yes! We offer doorstep delivery and pickup within Patna city limits including areas like Boring Road, Kankarbagh, Bailey Road, Patliputra, and more. For locations outside the city, a nominal delivery charge may apply.",
  },
  {
    question: "What happens if the car breaks down during my rental?",
    answer:
      "We provide 24/7 roadside assistance. In case of any mechanical issue, call us immediately and we will arrange a replacement vehicle or on-spot repair at no extra cost to you.",
  },
  {
    question: "Can I take the car for outstation trips from Patna?",
    answer:
      "Absolutely! Outstation trips to destinations like Rajgir, Nalanda, Bodh Gaya, Varanasi, and Ranchi are allowed. Just inform us about your travel plan while booking. Per-km charges may apply beyond the included daily limit.",
  },
  {
    question: "What is the security deposit amount?",
    answer:
      "The security deposit starts from ₹5,000 and varies depending on the vehicle type. It is refundable upon safe return of the vehicle in clean condition. Note: Any damage repairs or extra cleaning charges will be deducted from the deposit. We provide only clean, well-maintained vehicles — please return them in the same condition. Payment can be made via UPI, bank transfer, or cash.",
  },
  {
    question: "Is there a km limit per day?",
    answer:
      "Yes, most of our plans include a generous daily km limit (typically 200-300 km/day). Extra kilometers are charged at a nominal per-km rate. Unlimited km packages are also available for select vehicles.",
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
      className="py-20 sm:py-28 px-4 sm:px-6"
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
