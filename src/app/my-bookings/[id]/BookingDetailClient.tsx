"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Car,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  MessageSquare,
  FileText,
  Shield,
  AlertTriangle,
  Truck,
  CreditCard,
  Phone,
  Star,
  Navigation,
  Loader2,
  Hash,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { fetchMyBookings } from "@/lib/api-client";
import type { Booking } from "@/types/xrmlite";

// --- Timeline Steps ---
interface TimelineStep {
  id: string;
  label: string;
  description: string;
  icon: typeof CheckCircle2;
  status: "completed" | "active" | "upcoming";
}

function getTimeline(bookingStatus: string): TimelineStep[] {
  const steps: TimelineStep[] = [
    { id: "booked", label: "Booking Made", description: "Payment received", icon: CreditCard, status: "upcoming" },
    { id: "confirmed", label: "Confirmed", description: "Verified by team", icon: CheckCircle2, status: "upcoming" },
    { id: "pickup", label: "Pickup", description: "Collect your car", icon: Car, status: "upcoming" },
    { id: "active", label: "On Trip", description: "Enjoy your ride", icon: Navigation, status: "upcoming" },
    { id: "returned", label: "Returned", description: "Car handed back", icon: Truck, status: "upcoming" },
    { id: "completed", label: "Completed", description: "Settlement done", icon: Star, status: "upcoming" },
  ];

  const statusMap: Record<string, number> = {
    pending: 0,
    confirmed: 1,
    active: 3,
    completed: 5,
    cancelled: -1,
  };

  const activeIdx = statusMap[bookingStatus] ?? 0;
  return steps.map((step, i) => ({
    ...step,
    status: i < activeIdx ? "completed" : i === activeIdx ? "active" : "upcoming",
  }));
}

// --- Tab types ---
type TabId = "overview" | "pickup" | "contracts" | "messages" | "support" | "transactions";

const TABS: { id: TabId; label: string; icon: typeof Car }[] = [
  { id: "overview", label: "Overview", icon: Car },
  { id: "pickup", label: "Pickup & Return", icon: MapPin },
  { id: "contracts", label: "Contracts", icon: FileText },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "support", label: "Support & SOS", icon: Shield },
  { id: "transactions", label: "Transactions", icon: CreditCard },
];

export default function BookingDetailClient() {
  const params = useParams();
  const bookingId = params.id as string;
  const { isLoggedIn, loading: authLoading, openLoginModal } = useAuth();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  useEffect(() => {
    if (authLoading || !isLoggedIn) {
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      const result = await fetchMyBookings();
      if (result.success && result.data) {
        const found = result.data.find((b) => String(b.id) === bookingId);
        if (found) setBooking(found);
      }
      setLoading(false);
    }
    load();
  }, [isLoggedIn, authLoading, bookingId]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  // Not logged in
  if (!authLoading && !isLoggedIn) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-28 pb-16 px-4 text-center">
          <p className="text-white/50 mb-4">Login to view booking details</p>
          <button onClick={openLoginModal} className="bg-gold text-black font-bold px-6 py-3 rounded-xl text-sm">
            Login
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-28 flex justify-center"><Loader2 size={28} className="animate-spin text-gold/60" /></div>
        <Footer />
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-28 pb-16 px-4 text-center">
          <p className="text-white/50 mb-4">Booking not found</p>
          <Link href="/my-bookings" className="text-gold text-sm">← Back to bookings</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const timeline = getTimeline(booking.status);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back + Header */}
          <Link href="/my-bookings" className="inline-flex items-center gap-2 text-white/50 hover:text-gold text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to My Bookings
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {booking.asset?.name || `Booking #${booking.id}`}
                </h1>
                <div className="flex items-center gap-3 mt-2 text-sm text-white/50">
                  {booking.booking_number && (
                    <span className="flex items-center gap-1"><Hash size={13} />{booking.booking_number}</span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-gold/60" />
                    {formatDate(booking.start_date)} → {formatDate(booking.end_date)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gold">₹{booking.total_amount?.toLocaleString() || "—"}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full mt-1 ${
                  booking.status === "confirmed" ? "bg-blue-400/10 text-blue-400 border border-blue-400/20" :
                  booking.status === "active" ? "bg-green-400/10 text-green-400 border border-green-400/20" :
                  booking.status === "completed" ? "bg-white/5 text-white/60 border border-white/10" :
                  booking.status === "cancelled" ? "bg-red-400/10 text-red-400 border border-red-400/20" :
                  "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                }`}>
                  <Clock size={10} />
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 mb-8"
          >
            <div className="flex items-center overflow-x-auto gap-0">
              {timeline.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[70px]">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      step.status === "completed" ? "bg-green-500/20 text-green-400" :
                      step.status === "active" ? "bg-gold/20 text-gold ring-2 ring-gold/40" :
                      "bg-white/5 text-white/20"
                    }`}>
                      {step.status === "completed" ? <CheckCircle2 size={16} /> :
                       step.status === "active" ? <step.icon size={16} /> :
                       <Circle size={14} />}
                    </div>
                    <p className={`text-[10px] mt-1.5 text-center leading-tight ${
                      step.status === "active" ? "text-gold font-medium" :
                      step.status === "completed" ? "text-white/60" : "text-white/30"
                    }`}>{step.label}</p>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className={`h-0.5 w-8 sm:w-12 ${
                      step.status === "completed" ? "bg-green-500/40" : "bg-white/[0.06]"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white/[0.03] rounded-xl p-1 mb-6 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id ? "bg-gold text-black" : "text-white/60 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {/* Overview */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard icon={Car} title="Vehicle" value={booking.asset?.name || "—"} sub={`${booking.asset?.model || ""} Model`} />
                <InfoCard icon={Calendar} title="Duration" value={`${Math.ceil((new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / 86400000)} days`} sub={`${formatDate(booking.start_date)} → ${formatDate(booking.end_date)}`} />
                <InfoCard icon={MapPin} title="Pickup Location" value={booking.pickup_location || booking.asset?.pickup_location || "Bhootnath Road"} sub="Self pickup • 09:00 AM" />
                <InfoCard icon={CreditCard} title="Amount Paid" value={`₹${booking.total_amount?.toLocaleString() || "—"}`} sub={`Deposit: ₹${booking.deposit_amount?.toLocaleString() || "—"}`} />
              </div>
            )}

            {/* Pickup & Return */}
            {activeTab === "pickup" && (
              <div className="space-y-4">
                <SectionCard icon={MapPin} title="Pickup Details">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Location</span>
                      <span className="text-white">{booking.pickup_location || "Bhootnath Road, Patna"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Date & Time</span>
                      <span className="text-white">{formatDate(booking.start_date)} • 09:00 AM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Status</span>
                      <span className="text-amber-400">Awaiting pickup</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-white/5 border border-white/10 text-white/70 py-2.5 rounded-xl text-sm hover:border-gold/30 transition-all flex items-center justify-center gap-2">
                    <Navigation size={14} />
                    Get Directions
                  </button>
                </SectionCard>

                <SectionCard icon={Truck} title="Return Details">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Return Date</span>
                      <span className="text-white">{formatDate(booking.end_date)} • 09:00 AM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Return Location</span>
                      <span className="text-white">Same as pickup</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Inspection</span>
                      <span className="text-white/40">Pending at return</span>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard icon={Car} title="Asset Inspection">
                  <p className="text-sm text-white/40 mb-3">Inspection report will be available once you collect the car.</p>
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-xs text-white/30 text-center">
                    Fuel level, mileage, condition photos will appear here
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Contracts */}
            {activeTab === "contracts" && (
              <div className="space-y-4">
                <SectionCard icon={FileText} title="Rental Agreement">
                  <p className="text-sm text-white/50 mb-4">Your rental contract will be generated once the booking is confirmed.</p>
                  <div className="bg-white/[0.03] border border-dashed border-white/10 rounded-xl p-8 text-center">
                    <FileText size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-sm text-white/30">Contract pending</p>
                    <p className="text-xs text-white/20 mt-1">Available after confirmation</p>
                  </div>
                </SectionCard>

                <SectionCard icon={Shield} title="Terms & Conditions">
                  <ul className="space-y-2 text-sm text-white/50">
                    {(booking.asset?.terms || ["Security deposit refundable on proper return.", "Original ID + DL photocopy required.", "Fuel not included."]).map((term, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight size={12} className="text-gold/60 mt-0.5 shrink-0" />
                        {term}
                      </li>
                    ))}
                  </ul>
                </SectionCard>
              </div>
            )}

            {/* Messages */}
            {activeTab === "messages" && (
              <SectionCard icon={MessageSquare} title="Messages">
                <p className="text-sm text-white/50 mb-4">Communicate with the DRIVANA team about this booking.</p>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 min-h-[200px] flex flex-col items-center justify-center text-center">
                  <MessageSquare size={32} className="text-white/10 mb-3" />
                  <p className="text-sm text-white/30">No messages yet</p>
                  <p className="text-xs text-white/20 mt-1">Messages from the team will appear here</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40"
                    disabled
                  />
                  <button disabled className="bg-gold/30 text-black/50 font-bold px-4 py-2.5 rounded-xl text-sm cursor-not-allowed">
                    Send
                  </button>
                </div>
                <p className="text-[10px] text-white/20 mt-2">Messaging will be enabled once API is connected</p>
              </SectionCard>
            )}

            {/* Support & SOS */}
            {activeTab === "support" && (
              <div className="space-y-4">
                <SectionCard icon={Shield} title="DRIVANA Support">
                  <p className="text-sm text-white/50 mb-4">Get help with your booking anytime during your rental period.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a href="tel:+917079138350" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-gold/30 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Phone size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Call Support</p>
                        <p className="text-xs text-white/40">+91 70791 38350</p>
                      </div>
                    </a>
                    <a href="https://wa.me/919205548488" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-green-500/30 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <MessageSquare size={16} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">WhatsApp</p>
                        <p className="text-xs text-white/40">Instant response</p>
                      </div>
                    </a>
                  </div>
                </SectionCard>

                <SectionCard icon={AlertTriangle} title="SOS — Emergency">
                  <p className="text-sm text-white/50 mb-4">For breakdowns, accidents, or urgent issues during your trip.</p>
                  <button className="w-full bg-red-500/10 border border-red-500/30 text-red-400 font-semibold py-4 rounded-xl text-sm hover:bg-red-500/20 transition-all flex items-center justify-center gap-2">
                    <AlertTriangle size={16} />
                    Raise SOS Request
                  </button>
                  <p className="text-xs text-white/30 text-center mt-2">Our team will contact you within 5 minutes</p>
                </SectionCard>
              </div>
            )}

            {/* Transactions */}
            {activeTab === "transactions" && (
              <SectionCard icon={CreditCard} title="Transactions & Payments">
                <div className="space-y-3">
                  <TransactionRow label="Booking Payment" amount={booking.total_amount || 0} type="paid" date={booking.created_at} />
                  <TransactionRow label="Security Deposit" amount={booking.deposit_amount || 0} type="pending" date="" />
                  <TransactionRow label="Balance at Pickup" amount={0} type="upcoming" date="" />
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Refund Status</span>
                    <span className="text-white/30">No refunds yet</span>
                  </div>
                </div>
              </SectionCard>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

// --- Reusable Components ---

function InfoCard({ icon: Icon, title, value, sub }: { icon: typeof Car; title: string; value: string; sub: string }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-gold/60" />
        <span className="text-xs text-white/40">{title}</span>
      </div>
      <p className="text-base font-semibold text-white">{value}</p>
      <p className="text-xs text-white/40 mt-0.5">{sub}</p>
    </div>
  );
}

function SectionCard({ icon: Icon, title, children }: { icon: typeof Car; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
      <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
        <Icon size={16} className="text-gold" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function TransactionRow({ label, amount, type, date }: { label: string; amount: number; type: "paid" | "pending" | "upcoming" | "refunded"; date: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm text-white">{label}</p>
        {date && <p className="text-[10px] text-white/30">{new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>}
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${
          type === "paid" ? "text-green-400" :
          type === "refunded" ? "text-blue-400" :
          type === "pending" ? "text-amber-400" : "text-white/30"
        }`}>
          {type === "refunded" ? "+" : type === "upcoming" ? "" : "-"}₹{amount.toLocaleString()}
        </p>
        <p className="text-[10px] text-white/30 capitalize">{type}</p>
      </div>
    </div>
  );
}
