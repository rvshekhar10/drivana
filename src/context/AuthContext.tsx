"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  login as apiLogin,
  register as apiRegister,
  serverLogout as apiServerLogout,
  getStoredCustomer,
  isAuthenticated as checkApiAuth,
  refreshAccessToken,
  fetchProfile,
} from "@/lib/api-client";
import type { CustomerProfile } from "@/types/xrmlite";

interface AuthContextType {
  customer: CustomerProfile | null;
  isLoggedIn: boolean;
  displayName: string | null;
  loading: boolean;
  logout: () => Promise<void>;
  loginWithEmail: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  registerWithEmail: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    phone?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoginModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType>({
  customer: null,
  isLoggedIn: false,
  displayName: null,
  loading: true,
  logout: async () => {},
  loginWithEmail: async () => ({ success: false }),
  registerWithEmail: async () => ({ success: false }),
  refreshProfile: async () => {},
  openLoginModal: () => {},
  closeLoginModal: () => {},
  isLoginModalOpen: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Restore session on mount
  useEffect(() => {
    if (checkApiAuth()) {
      const stored = getStoredCustomer();
      if (stored) {
        setCustomer(stored);
      }
    }
    setLoading(false);
  }, []);

  // Token refresh every 50 minutes
  useEffect(() => {
    if (!customer) return;

    const interval = setInterval(async () => {
      const success = await refreshAccessToken();
      if (!success) {
        setCustomer(null);
      }
    }, 50 * 60 * 1000);

    return () => clearInterval(interval);
  }, [customer]);

  // Derived state
  const isLoggedIn = !!customer;
  const displayName = customer?.display_name || customer?.first_name || null;

  // Actions
  const logout = useCallback(async () => {
    await apiServerLogout();
    setCustomer(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    const result = await fetchProfile();
    if (result.success && result.data) {
      setCustomer(result.data);
      localStorage.setItem("xrm_customer", JSON.stringify(result.data));
    }
  }, []);

  const loginWithEmail = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string }> => {
      const result = await apiLogin({ email, password });
      if (result.success && result.data) {
        setCustomer(result.data.customer);
        return { success: true };
      }
      return {
        success: false,
        error: result.error?.message || "Login failed",
      };
    },
    []
  );

  const registerWithEmail = useCallback(
    async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName?: string;
      phone?: string;
    }): Promise<{ success: boolean; error?: string }> => {
      const result = await apiRegister(data);
      if (result.success && result.data) {
        setCustomer(result.data.customer);
        return { success: true };
      }
      return {
        success: false,
        error: result.error?.message || "Registration failed",
      };
    },
    []
  );

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        customer,
        isLoggedIn,
        displayName,
        loading,
        logout,
        loginWithEmail,
        registerWithEmail,
        refreshProfile,
        openLoginModal,
        closeLoginModal,
        isLoginModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
