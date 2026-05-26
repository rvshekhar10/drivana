"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Kumar",
    location: "Patna",
    rating: 5,
    text: "Booked a Creta for a weekend trip to Rajgir. Car was spotless, well-maintained, and delivered right to my doorstep. Will definitely use Drivana again!",
    trip: "Weekend trip to Rajgir",
  },
  {
    name: "Priya Singh",
    location: "Boring Road, Patna",
    rating: 5,
    text: "The WhatsApp booking process is so convenient. Got the car within an hour of messaging. Transparent pricing with no hidden charges. Highly recommended!",
    trip: "City commute",
  },
  {
    name: "Amit Verma",
    location: "Kankarbagh, Patna",
    rating: 5,
    text: "Rented a Fortuner for my cousin's wedding. The car was in premium condition. Drivana made the whole experience stress-free. Best car rental in Patna!",
    trip: "Wedding event",
  },
  {
    name: "Sneha Gupta",
    location: "Bailey Road, Patna",
    rating: 4,
    text: "Used Drivana for a month-long rental while my car was in service. Great rates for long-term rentals and the Swift was fuel-efficient. Smooth experience overall.",
    trip: "Monthly rental",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Customer Reviews
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight"
          >
            Trusted by Patna&apos;s Drivers
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Don&apos;t just take our word for it - hear from our happy customers
            across Patna.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-gold/20 transition-all duration-500 relative"
            >
              <Quote
                size={32}
                className="text-gold/10 absolute top-6 right-6"
              />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-gold fill-gold"
                  />
                ))}
                {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                  <Star key={`empty-${i}`} size={16} className="text-white/20" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-5">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {testimonial.location}
                  </p>
                </div>
                <span className="text-xs text-gold/60 bg-gold/5 px-3 py-1 rounded-full border border-gold/10">
                  {testimonial.trip}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
