"use client";

// Analytics only runs in the browser.
// Import this file only in client components.

import { getAnalytics, isSupported } from "firebase/analytics";
import { app } from "./firebase";

let analyticsInstance: ReturnType<typeof getAnalytics> | null = null;

export async function initAnalytics() {
  if (typeof window === "undefined") return null;
  if (analyticsInstance) return analyticsInstance;

  const supported = await isSupported();
  if (supported) {
    analyticsInstance = getAnalytics(app);
  }
  return analyticsInstance;
}
