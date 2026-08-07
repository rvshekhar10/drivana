"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Phone,
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { setupRecaptcha, sendOtp, verifyOtp } from "@/lib/auth";
import { forgotPassword } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";

type AuthTab = "phone" | "email";
type Step = "input" | "otp" | "register" | "forgot" | "forgot-sent" | "success";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, loginWithEmail, registerWithEmail } =
    useAuth();

  const [activeTab, setActiveTab] = useState<AuthTab>("email");
  const [step, setStep] = useState<Step>("input");

  // Phone OTP state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recaptchaRef = useRef<any>(null);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Email state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Shared state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset state when modal closes
  useEffect(() => {
    if (!isLoginModalOpen) {
      setTimeout(() => {
        setStep("input");
        setPhoneNumber("");
        setOtp(["", "", "", "", "", ""]);
        setError("");
        setConfirmationResult(null);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setRegPhone("");
        setIsRegisterMode(false);
        setShowPassword(false);
      }, 300);
    }
  }, [isLoginModalOpen]);

  // Setup recaptcha when modal opens and phone tab is active
  useEffect(() => {
    if (isLoginModalOpen && activeTab === "phone" && !recaptchaRef.current) {
      setupRecaptcha("recaptcha-container")
        .then((verifier) => {
          recaptchaRef.current = verifier;
        })
        .catch(() => {});
    }
  }, [isLoginModalOpen, activeTab]);

  // --- Phone OTP handlers ---
  const handleSendOtp = async () => {
    setError("");
    const cleaned = phoneNumber.replace(/\s/g, "");
    if (cleaned.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      if (!recaptchaRef.current) {
        recaptchaRef.current = await setupRecaptcha("recaptcha-container");
      }
      const result = await sendOtp(`+91${cleaned}`, recaptchaRef.current);
      setConfirmationResult(result);
      setStep("otp");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      if (firebaseError.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) newOtp[index + i] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      otpInputsRef.current[nextIndex]?.focus();
      return;
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      if (confirmationResult) {
        await verifyOtp(confirmationResult, otpString);
        setStep("success");
        setTimeout(() => closeLoginModal(), 1500);
      }
    } catch {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-submit OTP
  useEffect(() => {
    if (otp.every((d) => d !== "") && step === "otp") {
      handleVerifyOtp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  // --- Email handlers ---
  const handleEmailLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    const result = await loginWithEmail(email, password);
    setLoading(false);

    if (result.success) {
      setStep("success");
      setTimeout(() => closeLoginModal(), 1500);
    } else {
      setError(result.error || "Login failed");
    }
  };

  const handleEmailRegister = async () => {
    setError("");
    if (!email || !password || !firstName) {
      setError("Please fill in all required fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await registerWithEmail({
      email,
      password,
      firstName,
      lastName: lastName || undefined,
      phone: regPhone ? `+91${regPhone.replace(/\s/g, "")}` : undefined,
    });
    setLoading(false);

    if (result.success) {
      setStep("success");
      setTimeout(() => closeLoginModal(), 1500);
    } else {
      setError(result.error || "Registration failed");
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setLoading(true);
    await forgotPassword(email);
    setLoading(false);
    setStep("forgot-sent");
  };

  return (
    <>
      <div id="recaptcha-container" />

      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeLoginModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={closeLoginModal}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
                aria-label="Close login modal"
              >
                <X size={18} className="text-white/60" />
              </button>

              <div className="p-8">
                {/* Forgot Password Step */}
                {step === "forgot" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Reset Password
                    </h2>
                    <p className="text-white/50 text-sm mb-6">
                      Enter your email and we&apos;ll send you a reset link.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <div className="relative">
                          <Mail
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleForgotPassword();
                            }}
                            placeholder="you@example.com"
                            className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 text-sm"
                            autoFocus
                          />
                        </div>
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                      )}

                      <button
                        onClick={handleForgotPassword}
                        disabled={loading || !email}
                        className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-50 text-black font-bold py-3.5 rounded-xl text-sm transition-all"
                      >
                        {loading ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <>
                            Send Reset Link
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setStep("input");
                          setError("");
                        }}
                        className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition-colors"
                      >
                        ← Back to login
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Forgot Password Sent */}
                {step === "forgot-sent" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <Mail size={28} className="text-gold" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Check Your Email
                    </h2>
                    <p className="text-white/50 text-sm mb-6 max-w-xs mx-auto">
                      If an account exists for <span className="text-white/70">{email}</span>, we&apos;ve sent a password reset link.
                    </p>
                    <button
                      onClick={() => {
                        setStep("input");
                        setError("");
                      }}
                      className="text-gold hover:text-gold-light text-sm font-medium"
                    >
                      Back to login
                    </button>
                  </motion.div>
                )}

                {/* Success Step (shared) */}
                {step === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Welcome to DRIVANA!
                    </h2>
                    <p className="text-white/50 text-sm">
                      You&apos;re now logged in
                    </p>
                  </motion.div>
                )}

                {/* OTP Step (phone tab) */}
                {step === "otp" && activeTab === "phone" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Verify OTP
                    </h2>
                    <p className="text-white/50 text-sm mb-8">
                      Enter the 6-digit code sent to{" "}
                      <span className="text-white/80">+91 {phoneNumber}</span>
                    </p>

                    <div className="space-y-4">
                      <div className="flex gap-2 justify-center">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              otpInputsRef.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-12 h-14 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                            autoFocus={index === 0}
                          />
                        ))}
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm text-center">
                          {error}
                        </p>
                      )}

                      <button
                        onClick={handleVerifyOtp}
                        disabled={loading || otp.join("").length !== 6}
                        className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl text-sm transition-all"
                      >
                        {loading ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <>
                            Verify & Login
                            <CheckCircle size={16} />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setStep("input");
                          setOtp(["", "", "", "", "", ""]);
                          setError("");
                        }}
                        className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition-colors"
                      >
                        ← Change phone number
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Input Step */}
                {step === "input" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {isRegisterMode ? "Create Account" : "Login to DRIVANA"}
                    </h2>
                    <p className="text-white/50 text-sm mb-6">
                      {isRegisterMode
                        ? "Sign up to book cars and track your rides"
                        : "Sign in to access your bookings"}
                    </p>

                    {/* Tab Switcher */}
                    {!isRegisterMode && (
                      <div className="flex bg-white/5 rounded-lg p-1 mb-6">
                        <button
                          onClick={() => {
                            setActiveTab("email");
                            setError("");
                          }}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                            activeTab === "email"
                              ? "bg-gold text-black"
                              : "text-white/60 hover:text-white/80"
                          }`}
                        >
                          <Mail size={14} />
                          Email
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab("phone");
                            setError("");
                          }}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                            activeTab === "phone"
                              ? "bg-gold text-black"
                              : "text-white/60 hover:text-white/80"
                          }`}
                        >
                          <Phone size={14} />
                          Phone OTP
                        </button>
                      </div>
                    )}

                    {/* Email Login/Register Form */}
                    {(activeTab === "email" || isRegisterMode) && (
                      <div className="space-y-4">
                        {isRegisterMode && (
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label
                                htmlFor="firstName"
                                className="block text-xs font-medium text-white/60 mb-1.5"
                              >
                                First Name *
                              </label>
                              <div className="relative">
                                <User
                                  size={14}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                                />
                                <input
                                  id="firstName"
                                  type="text"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  placeholder="Rahul"
                                  className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 text-sm"
                                  autoFocus
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="lastName"
                                className="block text-xs font-medium text-white/60 mb-1.5"
                              >
                                Last Name
                              </label>
                              <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Kumar"
                                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 text-sm"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-medium text-white/60 mb-1.5"
                          >
                            Email *
                          </label>
                          <div className="relative">
                            <Mail
                              size={14}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                            />
                            <input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 text-sm"
                              autoFocus={!isRegisterMode}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="block text-xs font-medium text-white/60 mb-1.5"
                          >
                            Password *
                          </label>
                          <div className="relative">
                            <input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !isRegisterMode)
                                  handleEmailLogin();
                              }}
                              placeholder="••••••••"
                              className="w-full px-3 py-3 pr-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                            >
                              {showPassword ? (
                                <EyeOff size={14} />
                              ) : (
                                <Eye size={14} />
                              )}
                            </button>
                          </div>
                        </div>

                        {isRegisterMode && (
                          <div>
                            <label
                              htmlFor="regPhone"
                              className="block text-xs font-medium text-white/60 mb-1.5"
                            >
                              Phone (optional)
                            </label>
                            <div className="flex items-center gap-2">
                              <span className="flex items-center gap-1 px-2 py-3 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs">
                                +91
                              </span>
                              <input
                                id="regPhone"
                                type="tel"
                                inputMode="numeric"
                                maxLength={10}
                                value={regPhone}
                                onChange={(e) =>
                                  setRegPhone(
                                    e.target.value.replace(/\D/g, "")
                                  )
                                }
                                placeholder="98765 43210"
                                className="flex-1 px-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 text-sm"
                              />
                            </div>
                          </div>
                        )}

                        {error && (
                          <p className="text-red-400 text-sm">{error}</p>
                        )}

                        <button
                          onClick={
                            isRegisterMode
                              ? handleEmailRegister
                              : handleEmailLogin
                          }
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl text-sm transition-all"
                        >
                          {loading ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <>
                              {isRegisterMode ? "Create Account" : "Login"}
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>

                        <p className="text-center text-sm text-white/40">
                          {isRegisterMode ? (
                            <>
                              Already have an account?{" "}
                              <button
                                onClick={() => {
                                  setIsRegisterMode(false);
                                  setError("");
                                }}
                                className="text-gold hover:text-gold-light font-medium"
                              >
                                Login
                              </button>
                            </>
                          ) : (
                            <>
                              Don&apos;t have an account?{" "}
                              <button
                                onClick={() => {
                                  setIsRegisterMode(true);
                                  setError("");
                                }}
                                className="text-gold hover:text-gold-light font-medium"
                              >
                                Sign up
                              </button>
                            </>
                          )}
                        </p>

                        {!isRegisterMode && (
                          <p className="text-center">
                            <button
                              onClick={() => setStep("forgot")}
                              className="text-xs text-white/30 hover:text-white/60 transition-colors"
                            >
                              Forgot password?
                            </button>
                          </p>
                        )}
                      </div>
                    )}

                    {/* Phone OTP Form */}
                    {activeTab === "phone" && !isRegisterMode && (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-medium text-white/60 mb-1.5"
                          >
                            Phone Number
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 px-3 py-3 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm">
                              🇮🇳 +91
                            </span>
                            <input
                              id="phone"
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              value={phoneNumber}
                              onChange={(e) =>
                                setPhoneNumber(
                                  e.target.value.replace(/\D/g, "")
                                )
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSendOtp();
                              }}
                              placeholder="98765 43210"
                              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all text-base tracking-wide"
                              autoFocus
                            />
                          </div>
                        </div>

                        {error && (
                          <p className="text-red-400 text-sm">{error}</p>
                        )}

                        <button
                          onClick={handleSendOtp}
                          disabled={loading || phoneNumber.length !== 10}
                          className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl text-sm transition-all"
                        >
                          {loading ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <>
                              Send OTP
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    <p className="text-white/30 text-xs mt-6 text-center">
                      By continuing, you agree to our{" "}
                      <a
                        href="/terms"
                        className="text-gold/60 hover:text-gold"
                      >
                        Terms
                      </a>{" "}
                      &{" "}
                      <a
                        href="/privacy"
                        className="text-gold/60 hover:text-gold"
                      >
                        Privacy Policy
                      </a>
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
