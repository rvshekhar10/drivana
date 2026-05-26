"use client";

import { ReactNode, useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";
import ClickTracker from "@/components/ClickTracker";
import { initAnalytics } from "@/lib/analytics";

export default function Providers({ children }: { children: ReactNode }) {
  // Initialize Firebase Analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <AuthProvider>
      {children}
      <LoginModal />
      <ClickTracker />
    </AuthProvider>
  );
}
