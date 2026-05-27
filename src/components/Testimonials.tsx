"use client";

import { motion } from "framer-motion";
import { Star, Quote, MapPin, Car } from "lucide-react";

const testimonials = [
  {
    name: "Ankit Sharma",
    from: "Delhi → Patna",
    rating: 5,
    text: "Flew in from Delhi for my cousin's wedding in Danapur. Booked the Magnite on WhatsApp while still at the airport - car was delivered to my hotel within an hour. Drove the family around for 4 days without any hassle. Way better than dealing with local cab drivers.",
    car: "Nissan Magnite",
    trip: "Wedding in Danapur",
    duration: "4 days",
  },
  {
    name: "Priya Menon",
    from: "Bangalore → Patna",
    rating: 5,
    text: "I'm used to Zoomcar in Bangalore, so I was skeptical about Patna. But Drivana surprised me - the Tiago was brand new, spotless interior, and the WhatsApp booking was smoother than any app. Drove to Rajgir and Nalanda over the weekend. Absolutely loved the freedom.",
    car: "Tata Tiago",
    trip: "Rajgir & Nalanda trip",
    duration: "3 days",
  },
  {
    name: "Vikram Jha",
    from: "Mumbai → Patna",
    rating: 5,
    text: "Had a week of client meetings across Patna - Boring Road, Patliputra, Danapur. The Alto was perfect for city driving. Fuel efficient, easy to park, and at ₹1,499/day it was cheaper than taking autos everywhere. Will book again next quarter.",
    car: "Maruti Alto",
    trip: "Business meetings",
    duration: "7 days",
  },
  {
    name: "Sneha Gupta",
    from: "Hyderabad → Patna",
    rating: 5,
    text: "Came home to Patna for Chhath Puja. Needed a car to visit relatives across the city and drive to Gaya. The Freestyle handled the highway beautifully - great ground clearance for Bihar roads. Deposit was returned within 24 hours. Very professional.",
    car: "Ford Freestyle",
    trip: "Chhath Puja family visit",
    duration: "5 days",
  },
  {
    name: "Rohit Verma",
    from: "Pune → Patna",
    rating: 5,
    text: "First time renting self-drive in Patna. Was nervous about the process but the team made it so easy - verified my DL on WhatsApp, delivered the Tiago to my doorstep, and even gave me tips on parking spots near Patna Junction. Felt like a local service, not a rental company.",
    car: "Tata Tiago",
    trip: "Personal visit",
    duration: "2 days",
  },
  {
    name: "Deepak Kumar",
    from: "Patna (Local)",
    rating: 5,
    text: "My car was in service for 2 weeks. Rented the Alto on monthly plan - 20% discount made it very affordable. Used it for daily office commute on Bailey Road. Clean car, no issues, deposit back same day I returned it. Drivana is filling a real gap in Patna.",
    car: "Maruti Alto",
    trip: "Daily commute (car in service)",
    duration: "14 days",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Customer Stories
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight"
          >
            Real People, Real Trips
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            From Delhi, Mumbai, Bangalore & Hyderabad - visitors who drove their
            way through Patna with Drivana.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-gold/20 transition-all duration-300 relative flex flex-col"
            >
              <Quote
                size={28}
                className="text-gold/10 absolute top-5 right-5"
              />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-gold fill-gold"
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-white/70 text-sm leading-relaxed mb-5 flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Trip details */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 text-[11px] text-gold/70 bg-gold/5 border border-gold/10 px-2 py-1 rounded-full">
                  <Car size={10} />
                  {testimonial.car}
                </span>
                <span className="text-[11px] text-white/40 bg-white/5 px-2 py-1 rounded-full">
                  {testimonial.duration}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div>
                  <p className="text-white font-medium text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5 flex items-center gap-1">
                    <MapPin size={10} />
                    {testimonial.from}
                  </p>
                </div>
                <span className="text-[10px] text-white/30 bg-white/5 px-2.5 py-1 rounded-full">
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
