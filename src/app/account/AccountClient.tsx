"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Smartphone,
  Lock,
  Loader2,
  Save,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
  LogOut,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  fetchProfile,
  updateProfile,
  changePassword,
  fetchAddresses,
  addAddress,
  removeAddress,
  fetchSessions,
  revokeSessionById,
} from "@/lib/api-client";
import type {
  CustomerProfile,
  CustomerAddress,
  CustomerSession,
} from "@/types/xrmlite";

type Tab = "profile" | "addresses" | "sessions" | "security";

export default function AccountClient() {
  const { isLoggedIn, loading: authLoading, openLoginModal, refreshProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [sessions, setSessions] = useState<CustomerSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Profile form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  // Password form
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  // Address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrLabel, setAddrLabel] = useState("");
  const [addrLine1, setAddrLine1] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [addrPostal, setAddrPostal] = useState("");

  useEffect(() => {
    if (authLoading || !isLoggedIn) {
      setLoading(false);
      return;
    }
    loadProfile();
  }, [isLoggedIn, authLoading]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (activeTab === "addresses") loadAddresses();
    if (activeTab === "sessions") loadSessions();
  }, [activeTab, isLoggedIn]);

  async function loadProfile() {
    setLoading(true);
    const result = await fetchProfile();
    if (result.success && result.data) {
      setProfile(result.data);
      setFirstName(result.data.first_name || "");
      setLastName(result.data.last_name || "");
      setPhone(result.data.phone || "");
    }
    setLoading(false);
  }

  async function loadAddresses() {
    const result = await fetchAddresses();
    if (result.success && result.data) setAddresses(result.data);
  }

  async function loadSessions() {
    const result = await fetchSessions();
    if (result.success && result.data) setSessions(result.data);
  }

  function showMsg(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  async function handleSaveProfile() {
    setSaving(true);
    const result = await updateProfile({
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      phone: phone || undefined,
    });
    setSaving(false);
    if (result.success) {
      showMsg("success", "Profile updated");
      refreshProfile();
    } else {
      showMsg("error", result.error?.message || "Failed to update");
    }
  }

  async function handleChangePassword() {
    if (!currentPwd || !newPwd) {
      showMsg("error", "Please fill in both fields");
      return;
    }
    if (newPwd.length < 6) {
      showMsg("error", "New password must be at least 6 characters");
      return;
    }
    setSaving(true);
    const result = await changePassword(currentPwd, newPwd);
    setSaving(false);
    if (result.success) {
      showMsg("success", "Password changed successfully");
      setCurrentPwd("");
      setNewPwd("");
    } else {
      showMsg("error", result.error?.message || "Failed to change password");
    }
  }

  async function handleAddAddress() {
    if (!addrLabel || !addrLine1 || !addrCity || !addrState || !addrPostal) {
      showMsg("error", "Please fill all required fields");
      return;
    }
    setSaving(true);
    const result = await addAddress({
      label: addrLabel,
      addressLine1: addrLine1,
      city: addrCity,
      state: addrState,
      country: "India",
      postalCode: addrPostal,
      isDefault: addresses.length === 0,
    });
    setSaving(false);
    if (result.success) {
      showMsg("success", "Address added");
      setShowAddressForm(false);
      setAddrLabel("");
      setAddrLine1("");
      setAddrCity("");
      setAddrState("");
      setAddrPostal("");
      loadAddresses();
    } else {
      showMsg("error", result.error?.message || "Failed to add address");
    }
  }

  async function handleDeleteAddress(id: number) {
    const result = await removeAddress(id);
    if (result.success) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      showMsg("success", "Address removed");
    }
  }

  async function handleRevokeSession(id: number) {
    const result = await revokeSessionById(id);
    if (result.success) {
      setSessions((prev) => prev.filter((s) => s.id !== id));
      showMsg("success", "Session revoked");
    }
  }

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "sessions", label: "Sessions", icon: Smartphone },
    { id: "security", label: "Security", icon: Lock },
  ];

  // Not logged in
  if (!authLoading && !isLoggedIn) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-28 pb-16 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <User size={28} className="text-gold" />
          </div>
          <h1 className="text-2xl font-bold mb-2">My Account</h1>
          <p className="text-white/50 text-sm mb-6">Login to manage your account</p>
          <button
            onClick={openLoginModal}
            className="bg-gold hover:bg-gold-light text-black font-bold px-8 py-3 rounded-xl text-sm transition-all"
          >
            Login / Sign Up
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold">My Account</h1>
            {profile && (
              <p className="text-white/50 text-sm mt-1">
                {profile.email}
              </p>
            )}
          </motion.div>

          {/* Toast */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-center gap-2 mb-6 p-3 rounded-xl text-sm border ${
                message.type === "success"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {message.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
              {message.text}
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 bg-white/[0.03] rounded-xl p-1 mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gold text-black"
                    : "text-white/60 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 size={24} className="animate-spin text-gold/60" />
            </div>
          )}

          {/* Profile Tab */}
          {!loading && activeTab === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 max-w-md">
              <div>
                <label className="block text-xs text-white/50 mb-1.5">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Email</label>
                <input
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white/40 cursor-not-allowed"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-50 text-black font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save Changes
              </button>
            </motion.div>
          )}

          {/* Addresses Tab */}
          {!loading && activeTab === "addresses" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-start justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {addr.label}
                      {addr.is_default && (
                        <span className="ml-2 text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      {addr.address_line_1}, {addr.city}, {addr.state} {addr.postal_code}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="text-white/30 hover:text-red-400 transition-colors p-1"
                    aria-label="Remove address"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {addresses.length === 0 && !showAddressForm && (
                <p className="text-white/40 text-sm py-6 text-center">No saved addresses yet.</p>
              )}

              {showAddressForm ? (
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={addrLabel}
                      onChange={(e) => setAddrLabel(e.target.value)}
                      placeholder="Label (Home, Office...)"
                      className="col-span-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                    />
                    <input
                      type="text"
                      value={addrLine1}
                      onChange={(e) => setAddrLine1(e.target.value)}
                      placeholder="Address line 1"
                      className="col-span-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                    />
                    <input
                      type="text"
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      placeholder="City"
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                    />
                    <input
                      type="text"
                      value={addrState}
                      onChange={(e) => setAddrState(e.target.value)}
                      placeholder="State"
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                    />
                    <input
                      type="text"
                      value={addrPostal}
                      onChange={(e) => setAddrPostal(e.target.value)}
                      placeholder="PIN Code"
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddAddress}
                      disabled={saving}
                      className="flex items-center gap-2 bg-gold text-black font-bold px-4 py-2.5 rounded-lg text-sm transition-all disabled:opacity-50"
                    >
                      {saving ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                      Save
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="px-4 py-2.5 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:text-gold-light transition-colors"
                >
                  <Plus size={14} />
                  Add Address
                </button>
              )}
            </motion.div>
          )}

          {/* Sessions Tab */}
          {!loading && activeTab === "sessions" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {sessions.length === 0 && (
                <p className="text-white/40 text-sm py-6 text-center">No active sessions found.</p>
              )}
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                      <Smartphone size={16} className="text-white/40" />
                    </div>
                    <div>
                      <p className="text-sm text-white">
                        {session.device_name || "Unknown Device"}
                        {session.is_current && (
                          <span className="ml-2 text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-white/40 mt-0.5">
                        {session.ip_address || "—"} • Last active{" "}
                        {new Date(session.last_active_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                  {!session.is_current && (
                    <button
                      onClick={() => handleRevokeSession(session.id)}
                      className="text-xs text-red-400/70 hover:text-red-400 flex items-center gap-1 transition-colors"
                    >
                      <LogOut size={12} />
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* Security Tab */}
          {!loading && activeTab === "security" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md space-y-5">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Current Password</label>
                <input
                  type="password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">New Password</label>
                <input
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                />
              </div>
              <button
                onClick={handleChangePassword}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-50 text-black font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
                Update Password
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
