"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth as firebaseAuth } from "@/lib/firebase";
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

// --- Auth Method ---
type AuthMethod = "firebase" | "xrmlite" | null;

interface AuthContextType {
  // Firebase user (phone OTP)
  user: User | null;
  // XRMlite customer (email/password)
  customer: CustomerProfile | null;
  // Unified
  isLoggedIn: boolean;
  displayName: string | null;
  authMethod: AuthMethod;
  loading: boolean;
  // Actions
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
  // Modal
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoginModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  customer: null,
  isLoggedIn: false,
  displayName: null,
  authMethod: null,
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
  const [user, setUser] = useState<User | null>(null);
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [authMethod, setAuthMethod] = useState<AuthMethod>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // --- Restore session on mount ---
  useEffect(() => {
    // 1. Check XRMlite session (localStorage)
    if (checkApiAuth()) {
      const stored = getStoredCustomer();
      if (stored) {
        setCustomer(stored);
        setAuthMethod("xrmlite");
      }
    }

    // 2. Firebase listener
    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser && !checkApiAuth()) {
        setAuthMethod("firebase");
      }
      setLoading(false);
    });

    // If no firebase callback fires quickly, stop loading
    const timeout = setTimeout(() => setLoading(false), 2000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  // --- Token refresh for XRMlite ---
  useEffect(() => {
    if (authMethod !== "xrmlite") return;

    // Refresh token every 50 minutes (tokens expire in 60 min)
    const interval = setInterval(async () => {
      const success = await refreshAccessToken();
      if (!success) {
        setCustomer(null);
        setAuthMethod(null);
      }
    }, 50 * 60 * 1000);

    return () => clearInterval(interval);
  }, [authMethod]);

  // --- Derived state ---
  const isLoggedIn = !!(user || customer);
  const displayName =
    authMethod === "xrmlite"
      ? customer?.display_name || customer?.first_name || null
      : user?.displayName || user?.phoneNumber || null;

  // --- Actions ---
  const logout = useCallback(async () => {
    if (authMethod === "firebase" || user) {
      await signOut(firebaseAuth);
      setUser(null);
    }
    if (authMethod === "xrmlite" || customer) {
      await apiServerLogout();
      setCustomer(null);
    }
    setAuthMethod(null);
  }, [authMethod, user, customer]);

  const refreshProfile = useCallback(async () => {
    if (authMethod !== "xrmlite") return;
    const result = await fetchProfile();
    if (result.success && result.data) {
      setCustomer(result.data);
      localStorage.setItem("xrm_customer", JSON.stringify(result.data));
    }
  }, [authMethod]);

  const loginWithEmail = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string }> => {
      const result = await apiLogin({ email, password });
      if (result.success && result.data) {
        setCustomer(result.data.customer);
        setAuthMethod("xrmlite");
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
        setAuthMethod("xrmlite");
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
        user,
        customer,
        isLoggedIn,
        displayName,
        authMethod,
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
