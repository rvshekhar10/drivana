"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  Loader2,
  Calendar,
  CheckCircle,
  Zap,
  Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BookingModal from "@/components/BookingModal";
import QuickBookModal from "@/components/QuickBookModal";
import { useListings } from "@/hooks/useListings";
import { fetchCategories } from "@/lib/api-client";
import { useCity } from "@/context/CityContext";

type SortOption = "price-low" | "price-high" | "rating";

interface AvailabilityInfo {
  available: boolean;
  bookingAmount?: number;
  balanceAtPickup?: number;
  days?: number;
}

export default function FleetClient() {
  const { selectedCity, openCityPicker } = useCity();
  const { listings, loading } = useListings({ cityId: selectedCity?.id });
  const searchParams = useSearchParams();

  // Read dates from URL (passed from hero search)
  const urlStartDate = searchParams.get("startDate") || "";
  const urlEndDate = searchParams.get("endDate") || "";
  const hasDateFilter = !!(urlStartDate && urlEndDate);

  // Availability state per asset
  const [availability, setAvailability] = useState<Record<number, AvailabilityInfo>>({});
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("price-low");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [modalCar, setModalCar] = useState<{
    name: string;
    model: string;
    price: number;
  } | null>(null);
  const [quickBookCar, setQuickBookCar] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Local date form state (for direct fleet page visitors)
  const [localStartDate, setLocalStartDate] = useState(urlStartDate);
  const [localEndDate, setLocalEndDate] = useState(urlEndDate);

  const handleLocalSearch = () => {
    if (!localStartDate || !localEndDate) return;
    const params = new URLSearchParams({
      startDate: localStartDate,
      endDate: localEndDate,
      ...(selectedCity ? { cityId: String(selectedCity.id) } : {}),
    });
    window.location.href = `/fleet?${params.toString()}`;
  };

  // Fetch categories from API
  useEffect(() => {
    fetchCategories().then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setCategories(res.data.map((c) => c.name));
      } else {
        // Derive from listings data
        const unique = [...new Set(listings.map((l) => l.category))].filter(Boolean);
        setCategories(unique);
      }
    });
  }, [listings]);

  // Check availability for each car when dates are in URL
  useEffect(() => {
    if (!hasDateFilter || listings.length === 0) return;

    async function checkAll() {
      setCheckingAvailability(true);
      const results: Record<number, AvailabilityInfo> = {};

      await Promise.all(
        listings.map(async (car) => {
          try {
            const res = await fetch(
              `/api/availability?assetId=${car.id}&startDate=${urlStartDate}&endDate=${urlEndDate}`
            );
            const data = await res.json();
            if (data.success && data.data) {
              results[car.id] = {
                available: data.data.available,
                bookingAmount: data.data.pricing?.bookingAmount,
                balanceAtPickup: data.data.pricing?.balanceAtPickup,
                days: data.data.pricing?.days,
              };
            } else {
              results[car.id] = { available: true };
            }
          } catch {
            results[car.id] = { available: true };
          }
        })
      );

      setAvailability(results);
      setCheckingAvailability(false);
    }

    checkAll();
  }, [hasDateFilter, urlStartDate, urlEndDate, listings]);

  const filteredCars = useMemo(
    () =>
      listings
        .filter(
          (car) => filterCategory === "all" || car.category === filterCategory
        )
        .sort((a, b) => {
          if (sortBy === "price-low") return a.price_per_day - b.price_per_day;
          if (sortBy === "price-high") return b.price_per_day - a.price_per_day;
          return b.rating - a.rating;
        }),
    [listings, filterCategory, sortBy]
  );

  // Deduplicated list for comparison table
  const uniqueCars = useMemo(() => {
    const seen = new Set<string>();
    return listings.filter((car) => {
      if (seen.has(car.name)) return false;
      seen.add(car.name);
      return true;
    });
  }, [listings]);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero — compact, integrated with search */}
      <section className="relative pt-20 sm:pt-24 pb-4 sm:pb-6 overflow-hidden">
        <Image
          src="/drivana-hero-image.avif"
          alt="DRIVANA self-drive car fleet"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Title */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            >
              Choose Your <span className="text-gold">Ride</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-white/50 text-sm sm:text-base"
            >
              {listings.length} cars available
              {selectedCity ? ` in ${selectedCity.name}` : ""}
              {hasDateFilter && (
                <span className="text-gold/80 ml-1">
                  • {new Date(urlStartDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} → {new Date(urlEndDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              )}
            </motion.p>
          </div>

          {/* Search Form — inside hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-3 items-end">
              {/* City */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1 pl-1">City</label>
                <button
                  onClick={openCityPicker}
                  className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm hover:border-gold/30 transition-all"
                >
                  <MapPin size={13} className="text-gold shrink-0" />
                  <span className="text-white font-medium truncate">{selectedCity?.name || "Select"}</span>
                </button>
              </div>
              {/* Pickup */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1 pl-1">Pickup</label>
                <input
                  type="date"
                  min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                  value={localStartDate}
                  onChange={(e) => setLocalStartDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold/40"
                />
              </div>
              {/* Drop-off */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1 pl-1">Drop-off</label>
                <input
                  type="date"
                  min={localStartDate || new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                  value={localEndDate}
                  onChange={(e) => setLocalEndDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold/40"
                />
              </div>
              {/* Search */}
              <button
                onClick={handleLocalSearch}
                disabled={!localStartDate || !localEndDate}
                className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-40 text-black font-bold py-2.5 rounded-lg text-sm transition-all"
              >
                <Search size={14} />
                Check Availability
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Sort — tight below hero */}
      <section className="sticky top-16 sm:top-20 z-40 bg-black/95 backdrop-blur-md border-b border-white/5 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <Filter size={14} className="text-white/40 shrink-0" />
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                filterCategory === "all"
                  ? "bg-gold text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
              }`}
            >
              All Cars
            </button>
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
                {cat}
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
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-gold/60" />
            </div>
          )}

          {!loading && (
            <>
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
                    className="group relative flex flex-col bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(206,150,61,0.08)] h-full"
                  >
                    {/* Discount Badge */}
                    {car.discount > 0 && (
                      <div className="absolute top-4 left-4 z-10 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {car.discount}% OFF
                      </div>
                    )}

                    {/* Availability Badge (when dates are selected) */}
                    {hasDateFilter && availability[car.id] && (
                      <div
                        className={`absolute top-4 z-10 backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-full ${
                          car.discount > 0 ? "left-4 top-11" : "left-4"
                        } ${
                          availability[car.id].available
                            ? "bg-green-500/90 text-white"
                            : "bg-red-500/90 text-white"
                        }`}
                      >
                        {availability[car.id].available ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle size={10} />
                            Available
                          </span>
                        ) : (
                          "Unavailable"
                        )}
                      </div>
                    )}

                    {/* Image */}
                    <Link href={`/cars/${car.slug}`} className="block">
                      <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
                        <Image
                          src={car.image_url}
                          alt={`${car.name} ${car.model} on rent`}
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

                    {/* Content — flex-1 pushes buttons to bottom */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h2 className="text-lg sm:text-xl font-semibold text-white group-hover:text-gold transition-colors duration-300 line-clamp-1">
                            {car.name}
                          </h2>
                          <p className="text-white/40 text-sm mt-0.5">
                            {car.model} Model
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-gold/10 border border-gold/20 px-2 py-1 rounded-lg shrink-0">
                          <Star size={12} className="text-gold fill-gold" />
                          <span className="text-gold text-xs font-semibold">
                            {car.rating || "New"}
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
                          {car.discount > 0 && (
                            <span className="text-green-400/70 text-xs font-medium">
                              {car.discount}% off
                            </span>
                          )}
                        </div>
                        {/* Booking amount when dates selected */}
                        {hasDateFilter && availability[car.id]?.available && availability[car.id]?.bookingAmount && (
                          <div className="flex items-center gap-2 mt-2 bg-gold/5 border border-gold/20 rounded-lg px-2.5 py-1.5">
                            <Calendar size={11} className="text-gold" />
                            <span className="text-xs text-gold font-medium">
                              Book now: ₹{availability[car.id].bookingAmount!.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-white/40">
                              ({availability[car.id].days} days)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4 min-h-[3.25rem]">
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
                        <span className="text-xs text-white/40 line-clamp-1">
                          {car.pickup_location}
                        </span>
                      </div>

                      {/* Spacer — pushes CTAs to bottom */}
                      <div className="mt-auto" />

                      {/* CTAs — always at bottom */}
                      <div className="flex gap-3">
                        <Link
                          href={`/cars/${car.slug}${hasDateFilter ? `?startDate=${urlStartDate}&endDate=${urlEndDate}` : ""}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold/50 text-white/70 hover:text-white font-medium py-3 rounded-xl text-sm transition-all duration-300"
                        >
                          View Details
                        </Link>
                        {hasDateFilter && availability[car.id]?.available ? (
                          <button
                            onClick={() =>
                              setQuickBookCar({ id: car.id, name: car.name })
                            }
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold py-3 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02]"
                          >
                            <Zap size={14} />
                            Quick Book
                          </button>
                        ) : (
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
                        )}
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
            </>
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
                {uniqueCars.map((car) => (
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
                      {car.specs?.engine_capacity || "-"}
                    </td>
                    <td className="py-4 px-5 text-white/60 text-sm">
                      {car.specs?.km_limit?.split(",")[0] || "-"}
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

      {/* Booking Modal (WhatsApp) */}
      {modalCar && (
        <BookingModal
          isOpen={!!modalCar}
          onClose={() => setModalCar(null)}
          carName={modalCar.name}
          carModel={modalCar.model}
          pricePerDay={modalCar.price}
        />
      )}

      {/* Quick Book Modal (Two-Phase) */}
      {quickBookCar && hasDateFilter && (
        <QuickBookModal
          isOpen={!!quickBookCar}
          onClose={() => setQuickBookCar(null)}
          assetId={quickBookCar.id}
          carName={quickBookCar.name}
          startDate={urlStartDate}
          endDate={urlEndDate}
        />
      )}
    </main>
  );
}
