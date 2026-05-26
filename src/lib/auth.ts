/* eslint-disable @typescript-eslint/no-explicit-any */
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";

// RecaptchaVerifier is exported at runtime but Firebase 12 ships without
// bundled .d.ts files in some environments. We import it dynamically.
let RecaptchaVerifierClass: any = null;

async function getRecaptchaVerifier() {
  if (!RecaptchaVerifierClass) {
    const mod = await import("firebase/auth");
    RecaptchaVerifierClass = (mod as any).RecaptchaVerifier;
  }
  return RecaptchaVerifierClass;
}

/**
 * Initialize an invisible reCAPTCHA verifier on a given element.
 * Call this once when the component mounts.
 */
export async function setupRecaptcha(elementId: string) {
  const RV = await getRecaptchaVerifier();
  const verifier = new RV(auth, elementId, { size: "invisible" });
  return verifier;
}

/**
 * Send an OTP to the given phone number.
 * @param phoneNumber - Full phone number with country code, e.g. "+919876543210"
 * @param recaptchaVerifier - The RecaptchaVerifier instance
 * @returns ConfirmationResult to verify the OTP later
 */
export async function sendOtp(phoneNumber: string, recaptchaVerifier: any) {
  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    recaptchaVerifier
  );
  return confirmationResult;
}

/**
 * Verify the OTP code entered by the user.
 * @param confirmationResult - Returned from sendOtp
 * @param otp - The 6-digit code the user received
 */
export async function verifyOtp(confirmationResult: any, otp: string) {
  const result = await confirmationResult.confirm(otp);
  return result.user;
}
