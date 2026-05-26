"use client";

import { motion } from "framer-motion";
import { Navigation, Clock, MapPin } from "lucide-react";

const destinations = [
  {
    name: "Rajgir",
    distance: "102 km",
    time: "~2.5 hrs",
    description: "Hot springs, Nalanda ruins, Gridhakuta hill",
  },
  {
    name: "Bodh Gaya",
    distance: "115 km",
    time: "~3 hrs",
    description: "Mahabodhi Temple, Buddhist pilgrimage",
  },
  {
    name: "Nalanda",
    distance: "95 km",
    time: "~2 hrs",
    description: "Ancient university ruins, UNESCO site",
  },
  {
    name: "Varanasi",
    distance: "250 km",
    time: "~5 hrs",
    description: "Ghats, temples, spiritual capital",
  },
  {
    name: "Ranchi",
    distance: "325 km",
    time: "~6 hrs",
    description: "Waterfalls, hill station vibes",
  },
  {
    name: "Muzaffarpur",
    distance: "80 km",
    time: "~2 hrs",
    description: "Litchi gardens, Baba Garib Nath temple",
  },
];

export default function Destinations() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.015] to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Road Trips from Patna
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            Where Will You Drive?
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Rent a car and explore Bihar & beyond. Outstation trips allowed on
            all vehicles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-gold/20 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                <Navigation size={16} className="text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-white font-semibold group-hover:text-gold transition-colors">
                    {dest.name}
                  </h3>
                  <span className="text-gold/60 text-xs font-mono shrink-0">
                    {dest.distance}
                  </span>
                </div>
                <p className="text-white/40 text-xs mt-0.5 flex items-center gap-1">
                  <Clock size={10} />
                  {dest.time} drive
                </p>
                <p className="text-white/50 text-sm mt-1.5">
                  {dest.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-white/30 mt-8"
        >
          <MapPin size={12} className="inline mr-1" />
          All trips start from Bhootnath Road, Patna. Inform us about
          outstation plans while booking.
        </motion.p>
      </div>
    </section>
  );
}
