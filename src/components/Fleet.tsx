"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CarCard from "./CarCard";
import carsData from "@/data/cars.json";

export default function Fleet() {
  // Show only 3 cars on homepage (deduplicated - skip second Alto)
  const displayCars = carsData.filter((car) => car.id !== 4).slice(0, 3);

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
          className="text-center mb-12 sm:mb-14"
        >
          <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Our Fleet
          </span>
          <h2
            id="fleet-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight"
          >
            Self-Drive Cars in Patna
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Well-maintained, sanitized cars from ₹1,399/day. Pickup from
            Bhoothnath Road or free doorstep delivery.
          </p>
        </motion.div>

        {/* Car Grid - 3 featured cars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayCars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold/30 text-white/80 hover:text-gold font-medium px-8 py-3.5 rounded-full text-sm transition-all duration-200 group"
          >
            View All {carsData.length} Cars & Compare Prices
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
