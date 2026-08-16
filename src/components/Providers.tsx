"use client";

import { ReactNode, useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CityProvider } from "@/context/CityContext";
import LoginModal from "@/components/LoginModal";
import CityPickerModal from "@/components/CityPickerModal";
import ClickTracker from "@/components/ClickTracker";
import { initAnalytics } from "@/lib/analytics";

export default function Providers({ children }: { children: ReactNode }) {
  // Initialize Firebase Analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <CityProvider>
      <AuthProvider>
        {children}
        <LoginModal />
        <CityPickerModal />
        <ClickTracker />
      </AuthProvider>
    </CityProvider>
  );
}
