"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Check } from "lucide-react";
import { useCity } from "@/context/CityContext";

export default function CityPickerModal() {
  const { cities, selectedCity, showCityPicker, setCity, closeCityPicker } =
    useCity();
  const [search, setSearch] = useState("");

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(search.toLowerCase()) ||
      (city.state || "").toLowerCase().includes(search.toLowerCase())
  );

  // Group by state
  const grouped = filteredCities.reduce<Record<string, typeof filteredCities>>(
    (acc, city) => {
      const state = city.state || "Other";
      if (!acc[state]) acc[state] = [];
      acc[state].push(city);
      return acc;
    },
    {}
  );

  return (
    <AnimatePresence>
      {showCityPicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={closeCityPicker}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 pb-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <MapPin size={22} className="text-gold" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Select Your City
              </h2>
              <p className="text-white/50 text-sm mt-1.5">
                Choose where you want to rent a self-drive car
              </p>
            </div>

            {/* Search */}
            {cities.length > 5 && (
              <div className="px-6 pb-3">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search city or state..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* City List */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {Object.entries(grouped).map(([state, stateCities]) => (
                <div key={state} className="mb-4 last:mb-0">
                  {Object.keys(grouped).length > 1 && (
                    <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-2 px-1">
                      {state}
                    </p>
                  )}
                  <div className="space-y-1">
                    {stateCities.map((city) => {
                      const isSelected = selectedCity?.id === city.id;
                      return (
                        <button
                          key={city.id}
                          onClick={() => setCity(city)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                            isSelected
                              ? "bg-gold/10 border border-gold/30"
                              : "hover:bg-white/5 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin
                              size={16}
                              className={
                                isSelected ? "text-gold" : "text-white/30"
                              }
                            />
                            <div>
                              <p
                                className={`text-sm font-medium ${
                                  isSelected ? "text-gold" : "text-white"
                                }`}
                              >
                                {city.name}
                              </p>
                              {city.state && (
                                <p className="text-[11px] text-white/40">
                                  {city.state}
                                </p>
                              )}
                            </div>
                          </div>
                          {isSelected && (
                            <Check size={16} className="text-gold" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {filteredCities.length === 0 && (
                <p className="text-center text-white/40 text-sm py-8">
                  No cities found for &quot;{search}&quot;
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
