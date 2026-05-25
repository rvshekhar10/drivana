"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Star,
  MapPin,
  Settings,
  Fuel,
  Calendar,
  Shield,
  CheckCircle2,
  Navigation,
  Clock,
  Gauge,
} from "lucide-react";
import BookingModal from "@/components/BookingModal";
import CarGallery, { MediaItem } from "@/components/CarGallery";

const WHATSAPP_NUMBER = "918252658488";

interface CarSpecs {
  brand: string;
  model_name: string;
  manufacturing_year: number;
  body_type: string;
  fuel: string;
  engine_capacity: string;
  transmission_type: string;
  seating_capacity: string;
  baggage_capacity: string;
  mileage: string;
  air_conditioning: string;
  power_steering: string;
  power_windows: string;
  abs: string;
  airbags: string;
  infotainment: string;
  rear_camera: string;
  keyless_entry: string;
}

interface Car {
  id: number;
  slug: string;
  name: string;
  model: string;
  image_url: string;
  media: MediaItem[];
  price_per_day: number;
  price_per_week: number;
  price_per_month: number;
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
  specs: CarSpecs;
  description: string;
  ideal_for: string[];
  nearby_destinations: string[];
}

interface Props {
  car: Car;
  otherCars: Car[];
}

export default function CarDetailClient({ car, otherCars }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20book%20the%20${encodeURIComponent(car.name)}%20(${car.model})%20at%20₹${car.price_per_day}/day.%20Please%20confirm%20availability.`;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/#fleet"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            Back to Fleet
          </Link>
          <Link href="/" className="text-xl font-bold">
            <span className="text-gold">DRIV</span>
            <span className="text-white">ANA</span>
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold px-4 py-2 rounded-full text-sm transition-all duration-200"
          >
            <MessageCircle size={14} />
            Book Now
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb for SEO */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-white/40">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/#fleet" className="hover:text-gold transition-colors">
                Self Drive Cars
              </Link>
            </li>
            <li>/</li>
            <li className="text-gold">{car.name} on Rent in Patna</li>
          </ol>
        </nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Image & Details */}
          <div className="lg:col-span-2">
            {/* Car Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Discount badge */}
              {car.discount > 0 && (
                <div className="mb-3 inline-block bg-green-500/90 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  {car.discount}% OFF
                </div>
              )}
              <CarGallery media={car.media} carName={car.name} />
              {/* Location bar */}
              <div className="mt-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center gap-2">
                <MapPin size={14} className="text-gold" />
                <span className="text-sm text-white/60">
                  {car.pickup_location}
                </span>
              </div>
            </motion.div>

            {/* Quick Specs Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <Gauge size={20} className="text-gold" />
                <div>
                  <p className="text-xs text-white/40">Mileage</p>
                  <p className="text-sm font-medium text-white">{car.specs.mileage}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <Settings size={20} className="text-gold" />
                <div>
                  <p className="text-xs text-white/40">Transmission</p>
                  <p className="text-sm font-medium text-white">{car.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <Fuel size={20} className="text-gold" />
                <div>
                  <p className="text-xs text-white/40">Engine</p>
                  <p className="text-sm font-medium text-white">{car.specs.engine_capacity}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <Calendar size={20} className="text-gold" />
                <div>
                  <p className="text-xs text-white/40">Year</p>
                  <p className="text-sm font-medium text-white">{car.model}</p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <h2 className="text-lg font-semibold text-white mb-3">
                About {car.name} {car.model}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {car.description}
              </p>
            </motion.section>

            {/* Ideal For */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8"
            >
              <h2 className="text-lg font-semibold text-white mb-3">
                Ideal For
              </h2>
              <div className="flex flex-wrap gap-2">
                {car.ideal_for.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-sm text-white/60 bg-gold/5 border border-gold/20 px-3 py-1.5 rounded-full"
                  >
                    <CheckCircle2 size={12} className="text-gold" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Specifications Table */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                Specifications
              </h2>
              <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(car.specs).map(([key, value], index) => (
                      <tr
                        key={key}
                        className={`${
                          index % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-3 text-sm text-white/50 capitalize w-1/2 border-r border-white/[0.04]">
                          {key.replace(/_/g, " ")}
                        </td>
                        <td className="px-4 sm:px-6 py-3 text-sm text-white font-medium">
                          {String(value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* Key Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8"
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                  >
                    <CheckCircle2 size={16} className="text-gold shrink-0" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Nearby Destinations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                Popular Destinations from Patna
              </h2>
              <p className="text-white/40 text-sm mb-4">
                Take the {car.name} on a road trip to these popular destinations:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.nearby_destinations.map((dest) => (
                  <div
                    key={dest}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                  >
                    <Navigation size={14} className="text-gold shrink-0" />
                    <span className="text-sm text-white/60">{dest}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column - Pricing & Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Pricing Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                {/* Car Name & Rating */}
                <div className="mb-4">
                  <h1 className="text-2xl font-bold text-white">{car.name}</h1>
                  <p className="text-white/40 text-sm mt-1">
                    {car.model} • {car.category}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(car.rating)
                              ? "text-gold fill-gold"
                              : "text-white/20"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gold font-semibold">
                      {car.rating}
                    </span>
                    <span className="text-xs text-white/40">
                      ({car.review_count} reviews)
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t border-white/[0.06] pt-4 mb-4">
                  <h3 className="text-sm font-medium text-white/60 mb-3">
                    Rental Pricing
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gold/5 border border-gold/20">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gold" />
                        <span className="text-sm text-white/80">Per Day</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gold">
                          ₹{car.price_per_day.toLocaleString()}
                        </span>
                        {car.original_price > car.price_per_day && (
                          <span className="text-xs text-white/30 line-through ml-2">
                            ₹{car.original_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-white/40" />
                        <span className="text-sm text-white/60">Per Week</span>
                      </div>
                      <span className="text-sm font-semibold text-white">
                        ₹{car.price_per_week.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-white/40" />
                        <span className="text-sm text-white/60">Per Month</span>
                      </div>
                      <span className="text-sm font-semibold text-white">
                        ₹{car.price_per_month.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deposit */}
                <div className="p-3 rounded-xl border border-white/[0.06] mb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-white/40" />
                      <span className="text-sm text-white/60">
                        Security Deposit
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      ₹{car.deposit.toLocaleString()} onwards
                    </span>
                  </div>
                  <p className="text-xs text-white/30 mt-2 leading-relaxed">
                    Damage repairs & cleaning charges (if any) will be deducted. We provide only clean vehicles.
                  </p>
                </div>

                {/* CTA Buttons */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold py-4 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  <MessageCircle size={18} />
                  Book on WhatsApp
                </button>
                <a
                  href="tel:+918252658488"
                  className="w-full inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold/50 text-white/80 hover:text-white font-medium py-3 rounded-xl text-sm transition-all duration-200 mt-3"
                >
                  <Phone size={16} />
                  Call to Book
                </a>

                <p className="text-xs text-white/30 text-center mt-4">
                  Pay at pickup • Deposit starting ₹5,000 • Clean car guaranteed
                </p>
              </motion.div>

              {/* Dealer Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <h3 className="text-sm font-medium text-white/60 mb-4">
                  Pickup Location
                </h3>
                {/* Map placeholder */}
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/[0.06] mb-4 bg-white/[0.02]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.5!2d85.1376!3d25.6093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM2JzMzLjUiTiA4NcKwMDgnMTUuNCJF!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Drivana pickup location - Bhoothnath Road, Patna"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium">
                      {car.pickup_location}
                    </p>
                    <p className="text-xs text-white/40 mt-1">
                      Dealer Timings: 09:00 AM - 09:00 PM
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <h3 className="text-sm font-medium text-white/60 mb-4">
                  Why Book with DRIVANA?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-gold shrink-0" />
                    <span className="text-sm text-white/60">
                      Transparent pricing, no hidden charges
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-gold shrink-0" />
                    <span className="text-sm text-white/60">
                      Clean cars guaranteed every time
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-gold shrink-0" />
                    <span className="text-sm text-white/60">
                      Security deposit from ₹5,000
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-gold shrink-0" />
                    <span className="text-sm text-white/60">
                      Free cancellation (24hrs before)
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-gold shrink-0" />
                    <span className="text-sm text-white/60">
                      Doorstep delivery in Patna
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-12 border-t border-white/[0.06]"
        >
          <h2 className="text-2xl font-bold text-white mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCars.map((otherCar) => (
              <Link
                key={otherCar.id}
                href={`/cars/${otherCar.slug}`}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-gold/30 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={otherCar.image_url}
                    alt={`${otherCar.name} on rent in Patna`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-gold transition-colors">
                    {otherCar.name}
                  </h3>
                  <p className="text-xs text-white/40 mt-1">
                    {otherCar.model} • {otherCar.category}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-gold font-bold">
                      ₹{otherCar.price_per_day.toLocaleString()}
                      <span className="text-white/40 text-xs font-normal">
                        /day
                      </span>
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-gold fill-gold" />
                      <span className="text-xs text-white/60">
                        {otherCar.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SEO Content Block */}
        <section className="mt-16 pt-8 border-t border-white/[0.06]">
          <h2 className="text-lg font-semibold text-white/70 mb-3">
            Rent {car.name} in Patna - Self Drive Without Driver
          </h2>
          <p className="text-xs text-white/30 leading-relaxed max-w-4xl">
            Looking to rent a {car.name} in Patna without a driver? DRIVANA
            offers the {car.name} {car.model} on self-drive rental starting at
            just ₹{car.price_per_day}/day. Pick up from our convenient{" "}
            {car.pickup_location} location. Whether you need a {car.category.toLowerCase()}{" "}
            for a day trip, weekly rental, or monthly hire, we have flexible
            plans to suit your needs. Our {car.name} comes with{" "}
            {car.specs.transmission_type} transmission, {car.specs.engine_capacity}{" "}
            engine, and is well-maintained with regular servicing. Book via
            WhatsApp for instant confirmation. Available for outstation trips to
            Rajgir, Nalanda, Bodh Gaya, Varanasi, and more. Serving all areas of
            Patna including Boring Road, Kankarbagh, Bailey Road, Patliputra,
            Danapur, and Bhoothnath Road.
          </p>
        </section>
      </div>

      {/* Mobile Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-lg font-bold text-gold">
              ₹{car.price_per_day.toLocaleString()}
              <span className="text-white/40 text-xs font-normal">/day</span>
            </p>
            {car.original_price > car.price_per_day && (
              <p className="text-xs text-white/30 line-through">
                ₹{car.original_price.toLocaleString()}/day
              </p>
            )}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200"
          >
            <MessageCircle size={16} />
            Book Now
          </button>
        </div>
      </div>

      {/* Bottom padding for mobile CTA */}
      <div className="h-20 lg:hidden" />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        carName={car.name}
        carModel={car.model}
        pricePerDay={car.price_per_day}
      />
    </main>
  );
}
