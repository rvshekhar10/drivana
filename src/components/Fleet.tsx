"use client";

import { motion } from "framer-motion";
import CarCard from "./CarCard";
import carsData from "@/data/cars.json";

export default function Fleet() {
  return (
    <section
      id="fleet"
      className="py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="fleet-heading"
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
            Our Fleet
          </span>
          <h2
            id="fleet-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight"
          >
            Self-Drive Cars Available in Patna
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Well-maintained, sanitized cars ready for your next adventure.
            Pickup from Bhoothnath Road, Patna. Discounts up to 33% off.
          </p>
        </motion.div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {carsData.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>

        {/* Additional SEO text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-xs text-white/30 mt-12 max-w-2xl mx-auto"
        >
          All cars are available for daily, weekly, and monthly rentals. Prices
          are inclusive of basic insurance. Doorstep delivery available across
          Patna. Contact us on WhatsApp for custom quotes and availability.
        </motion.p>
      </div>
    </section>
  );
}
