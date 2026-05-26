"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Settings, Fuel, Star, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BookingModal from "./BookingModal";

interface Car {
  id: number;
  slug: string;
  name: string;
  model: string;
  image_url: string;
  price_per_day: number;
  original_price: number;
  discount: number;
  features: string[];
  transmission: string;
  fuel_type: string;
  deposit: number;
  rating: number;
  review_count: number;
  pickup_location: string;
  category: string;
}

interface CarCardProps {
  car: Car;
  index: number;
}

export default function CarCard({ car, index }: CarCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)]"
      >
        {/* Discount Badge */}
        {car.discount > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {car.discount}% OFF
          </div>
        )}

        {/* Image Container */}
        <Link href={`/cars/${car.slug}`} className="block">
          <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
            <Image
              src={car.image_url}
              alt={`${car.name} ${car.model} on rent in Patna - ₹${car.price_per_day}/day self drive`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
              <span className="text-white/80 text-xs font-medium">
                {car.category}
              </span>
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Car Name & Model */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-gold transition-colors duration-300">
                {car.name}
              </h3>
              <p className="text-white/40 text-sm mt-0.5">{car.model} Model</p>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1 bg-gold/10 border border-gold/20 px-2 py-1 rounded-lg">
              <Star size={12} className="text-gold fill-gold" />
              <span className="text-gold text-xs font-semibold">
                {car.rating}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-3 mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gold">
                ₹{car.price_per_day.toLocaleString()}
              </span>
              <span className="text-white/40 text-sm">/day</span>
              {car.original_price > car.price_per_day && (
                <span className="text-white/30 text-sm line-through">
                  ₹{car.original_price.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-white/30 text-xs mt-1">
              Deposit: ₹{car.deposit.toLocaleString()}
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-2.5 py-1.5 rounded-full">
              <Settings size={11} className="text-gold/70" />
              {car.transmission}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-2.5 py-1.5 rounded-full">
              <Fuel size={11} className="text-gold/70" />
              {car.fuel_type}
            </span>
            {car.features.slice(0, 2).map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-2.5 py-1.5 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Pickup location */}
          <div className="flex items-center gap-1.5 mb-5">
            <MapPin size={12} className="text-gold/60" />
            <span className="text-xs text-white/40">{car.pickup_location}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Link
              href={`/cars/${car.slug}`}
              className="flex-1 inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold/50 text-white/70 hover:text-white font-medium py-3 rounded-xl text-sm transition-all duration-300"
            >
              View Details
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gold/10 hover:bg-gold border border-gold/30 hover:border-gold text-gold hover:text-black font-semibold py-3 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle size={16} />
              Book Now
            </button>
          </div>
        </div>
      </motion.article>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        carName={car.name}
        carModel={car.model}
        pricePerDay={car.price_per_day}
      />
    </>
  );
}
