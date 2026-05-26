"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Settings,
  Fuel,
  MapPin,
  MessageCircle,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BookingModal from "@/components/BookingModal";
import carsData from "@/data/cars.json";

type SortOption = "price-low" | "price-high" | "rating";
type FilterCategory = "all" | "SUV" | "Hatchback" | "Crossover";

export default function FleetClient() {
  const [sortBy, setSortBy] = useState<SortOption>("price-low");
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");
  const [modalCar, setModalCar] = useState<{
    name: string;
    model: string;
    price: number;
  } | null>(null);

  const categories: FilterCategory[] = ["all", "SUV", "Hatchback", "Crossover"];

  const filteredCars = carsData
    .filter(
      (car) => filterCategory === "all" || car.category === filterCategory
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price_per_day - b.price_per_day;
      if (sortBy === "price-high") return b.price_per_day - a.price_per_day;
      return b.rating - a.rating;
    });

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[45vh] sm:h-[55vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/drivana-hero-image.avif"
          alt="DRIVANA self-drive car fleet in Patna"
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
            Our Fleet
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            Choose Your <span className="text-gold">Ride</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-white/60 text-base sm:text-lg max-w-lg mx-auto"
          >
            {carsData.length} cars available from ₹1,399/day. All pickup from
            Bhootnath Road, Patna.
          </motion.p>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="sticky top-16 sm:top-20 z-40 bg-black/95 backdrop-blur-md border-b border-white/5 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <Filter size={14} className="text-white/40 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  filterCategory === cat
                    ? "bg-gold text-black"
                    : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat === "all" ? "All Cars" : cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} className="text-white/40" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-gold/50 appearance-none cursor-pointer"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Results count */}
          <p className="text-white/40 text-sm mb-6">
            Showing {filteredCars.length} car
            {filteredCars.length !== 1 ? "s" : ""}
            {filterCategory !== "all" && ` in ${filterCategory}`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCars.map((car, index) => (
              <motion.article
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)]"
              >
                {/* Discount Badge */}
                {car.discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {car.discount}% OFF
                  </div>
                )}

                {/* Image */}
                <Link href={`/cars/${car.slug}`} className="block">
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
                    <Image
                      src={car.image_url}
                      alt={`${car.name} ${car.model} on rent in Patna`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                      <span className="text-white/80 text-xs font-medium">
                        {car.category}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-white group-hover:text-gold transition-colors duration-300">
                        {car.name}
                      </h2>
                      <p className="text-white/40 text-sm mt-0.5">
                        {car.model} Model
                      </p>
                    </div>
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
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-white/30 text-xs">
                        ₹{car.price_per_week.toLocaleString()}/week
                      </span>
                      <span className="text-green-400/70 text-xs font-medium">
                        15% off
                      </span>
                    </div>
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
                        className="text-xs text-white/50 bg-white/5 px-2.5 py-1.5 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 mb-5">
                    <MapPin size={12} className="text-gold/60" />
                    <span className="text-xs text-white/40">
                      {car.pickup_location}
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3">
                    <Link
                      href={`/cars/${car.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold/50 text-white/70 hover:text-white font-medium py-3 rounded-xl text-sm transition-all duration-300"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() =>
                        setModalCar({
                          name: car.name,
                          model: car.model,
                          price: car.price_per_day,
                        })
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gold/10 hover:bg-gold border border-gold/30 hover:border-gold text-gold hover:text-black font-semibold py-3 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02]"
                    >
                      <MessageCircle size={16} />
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty state */}
          {filteredCars.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">
                No cars found in this category.
              </p>
              <button
                onClick={() => setFilterCategory("all")}
                className="mt-4 text-gold hover:text-gold-light text-sm font-medium"
              >
                Show all cars
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              Compare
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-3">
              Quick Comparison
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto rounded-2xl border border-white/10"
          >
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="text-left py-4 px-5 text-sm font-semibold text-gold">
                    Car
                  </th>
                  <th className="text-left py-4 px-5 text-sm font-semibold text-gold">
                    Price/Day
                  </th>
                  <th className="text-left py-4 px-5 text-sm font-semibold text-gold">
                    Type
                  </th>
                  <th className="text-left py-4 px-5 text-sm font-semibold text-gold">
                    Engine
                  </th>
                  <th className="text-left py-4 px-5 text-sm font-semibold text-gold">
                    KM Limit
                  </th>
                  <th className="text-left py-4 px-5 text-sm font-semibold text-gold">
                    Deposit
                  </th>
                </tr>
              </thead>
              <tbody>
                {carsData
                  .filter(
                    (car, index, self) =>
                      self.findIndex((c) => c.name === car.name) === index
                  )
                  .map((car) => (
                    <tr
                      key={car.id}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 px-5">
                        <Link
                          href={`/cars/${car.slug}`}
                          className="text-white font-medium text-sm hover:text-gold transition-colors"
                        >
                          {car.name}
                        </Link>
                        <p className="text-white/40 text-xs">{car.model}</p>
                      </td>
                      <td className="py-4 px-5 text-gold font-semibold text-sm">
                        ₹{car.price_per_day.toLocaleString()}
                      </td>
                      <td className="py-4 px-5 text-white/60 text-sm">
                        {car.category}
                      </td>
                      <td className="py-4 px-5 text-white/60 text-sm">
                        {car.specs.engine_capacity}
                      </td>
                      <td className="py-4 px-5 text-white/60 text-sm">
                        {car.specs.km_limit.split(",")[0]}
                      </td>
                      <td className="py-4 px-5 text-white/60 text-sm">
                        ₹{car.deposit.toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-white/25 leading-relaxed">
            DRIVANA offers the best self-drive car rental fleet in Patna, Bihar.
            Our vehicles include the Nissan Magnite (compact SUV, 999cc), Tata
            Tiago (2025 model hatchback, 1199cc), Maruti Alto (budget-friendly,
            796cc), and Ford Freestyle (crossover, 1498cc). All cars are
            available for daily, weekly, and monthly rentals with 15% off on
            weekly and 20% off on monthly bookings. Pickup from Bhootnath Road,
            Patna with doorstep delivery within city limits. Whether
            you&apos;re visiting from Delhi, Mumbai, or Bangalore - we have the
            perfect self-drive car for your Patna trip.
          </p>
        </div>
      </section>

      <CTABanner />
      <Footer />
      <WhatsAppFloat />

      {/* Booking Modal */}
      {modalCar && (
        <BookingModal
          isOpen={!!modalCar}
          onClose={() => setModalCar(null)}
          carName={modalCar.name}
          carModel={modalCar.model}
          pricePerDay={modalCar.price}
        />
      )}
    </main>
  );
}
