"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { setupRecaptcha, sendOtp, verifyOtp } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

type Step = "phone" | "otp" | "success";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuth();
  const [step, setStep] = useState<Step>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recaptchaRef = useRef<any>(null);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isLoginModalOpen) {
      setTimeout(() => {
        setStep("phone");
        setPhoneNumber("");
        setOtp(["", "", "", "", "", ""]);
        setError("");
        setConfirmationResult(null);
      }, 300);
    }
  }, [isLoginModalOpen]);

  // Setup recaptcha when modal opens
  useEffect(() => {
    if (isLoginModalOpen && !recaptchaRef.current) {
      setupRecaptcha("recaptcha-container").then((verifier) => {
        recaptchaRef.current = verifier;
      }).catch(() => {
        // Recaptcha already initialized
      });
    }
  }, [isLoginModalOpen]);

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
      // Handle paste
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
        setTimeout(() => {
          closeLoginModal();
        }, 1500);
      }
    } catch {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-submit when all 6 digits are entered
  useEffect(() => {
    if (otp.every((d) => d !== "") && step === "otp") {
      handleVerifyOtp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <>
      {/* Invisible recaptcha container */}
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
                {/* Phone Step */}
                {step === "phone" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                      <Phone size={22} className="text-gold" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Login to DRIVANA
                    </h2>
                    <p className="text-white/50 text-sm mb-8">
                      Enter your phone number to receive a verification code
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-white/70 mb-2"
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
                              setPhoneNumber(e.target.value.replace(/\D/g, ""))
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

                    <p className="text-white/30 text-xs mt-6 text-center">
                      By continuing, you agree to our{" "}
                      <a href="/terms" className="text-gold/60 hover:text-gold">
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

                {/* OTP Step */}
                {step === "otp" && (
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
                          setStep("phone");
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

                {/* Success Step */}
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
