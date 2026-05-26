"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Calendar, User, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "919205548488";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
  carModel: string;
  pricePerDay: number;
}

export default function BookingModal({
  isOpen,
  onClose,
  carName,
  carModel,
  pricePerDay,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "09:00",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = [
      `Hi! I'd like to book a self-drive car.`,
      ``,
      `*Car:* ${carName} (${carModel})`,
      `*Price:* ₹${pricePerDay}/day`,
      ``,
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
      `*Pickup Date:* ${formData.pickupDate}`,
      `*Pickup Time:* ${formData.pickupTime}`,
      `*Drop-off Date:* ${formData.dropoffDate}`,
      formData.message ? `*Note:* ${formData.message}` : "",
      ``,
      `Please confirm availability. Thank you!`,
    ]
      .filter(Boolean)
      .join("\n");

    const encodedText = encodeURIComponent(text);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`,
      "_blank"
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Book {carName}
                  </h2>
                  <p className="text-xs text-white/40 mt-0.5">
                    {carModel} • ₹{pricePerDay.toLocaleString()}/day
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Close booking form"
                >
                  <X size={16} className="text-white/60" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-sm text-white/60 mb-1.5"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                    />
                    <input
                      id="booking-name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-sm text-white/60 mb-1.5"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                    />
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Dates Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="booking-pickup"
                      className="block text-sm text-white/60 mb-1.5"
                    >
                      Pickup Date *
                    </label>
                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                      />
                      <input
                        id="booking-pickup"
                        type="date"
                        required
                        value={formData.pickupDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pickupDate: e.target.value,
                          })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="booking-dropoff"
                      className="block text-sm text-white/60 mb-1.5"
                    >
                      Drop-off Date *
                    </label>
                    <div className="relative">
                      <Calendar
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                      />
                      <input
                        id="booking-dropoff"
                        type="date"
                        required
                        value={formData.dropoffDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dropoffDate: e.target.value,
                          })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Pickup Time */}
                <div>
                  <label
                    htmlFor="booking-time"
                    className="block text-sm text-white/60 mb-1.5"
                  >
                    Pickup Time
                  </label>
                  <select
                    id="booking-time"
                    value={formData.pickupTime}
                    onChange={(e) =>
                      setFormData({ ...formData, pickupTime: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors appearance-none"
                  >
                    <option value="06:00">06:00 AM</option>
                    <option value="07:00">07:00 AM</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="21:00">09:00 PM</option>
                  </select>
                </div>

                {/* Additional Message */}
                <div>
                  <label
                    htmlFor="booking-message"
                    className="block text-sm text-white/60 mb-1.5"
                  >
                    Additional Notes (optional)
                  </label>
                  <textarea
                    id="booking-message"
                    rows={2}
                    placeholder="E.g., Need doorstep delivery, outstation trip to Rajgir..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold py-4 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(206,150,61,0.3)]"
                >
                  <MessageCircle size={18} />
                  Send Booking Request via WhatsApp
                </button>

                <p className="text-xs text-white/30 text-center">
                  This will open WhatsApp with your booking details pre-filled.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
