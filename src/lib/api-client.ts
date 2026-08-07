/**
 * Client-side API helper.
 * All calls go to our own Next.js API routes (/api/...) which proxy to XRMlite.
 * This keeps the API key server-side and gives us a consistent interface.
 */

import type {
  XRMApiResponse,
  AssetListing,
  AvailabilityResponse,
  PriceBreakdown,
  AuthResponse,
  Booking,
  Review,
  PublicReviewsResponse,
} from "@/types/xrmlite";

const BASE = "/api";

// --- Helpers ---

function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("xrm_token") : null;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

async function get<T>(path: string): Promise<XRMApiResponse<T>> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
}

async function post<T>(
  path: string,
  body: Record<string, unknown>
): Promise<XRMApiResponse<T>> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

// ===========================
// PUBLIC APIs
// ===========================

export async function fetchListings(options?: {
  city?: string;
  category?: number;
  brand?: number;
}): Promise<XRMApiResponse<AssetListing[]> & { source?: string }> {
  const params = new URLSearchParams();
  if (options?.city) params.set("city", options.city);
  if (options?.category) params.set("category", String(options.category));
  if (options?.brand) params.set("brand", String(options.brand));
  const query = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${BASE}/listings${query}`);
  return res.json();
}

export async function fetchListingBySlug(
  slug: string
): Promise<XRMApiResponse<AssetListing> & { source?: string }> {
  const res = await fetch(`${BASE}/listings/${slug}`);
  return res.json();
}

export async function fetchAvailability(
  assetId: number,
  startDate: string,
  endDate: string
): Promise<XRMApiResponse<AvailabilityResponse>> {
  return get<AvailabilityResponse>(
    `/availability?assetId=${assetId}&startDate=${startDate}&endDate=${endDate}`
  );
}

export async function fetchPriceQuote(
  assetId: number,
  startDate: string,
  endDate: string,
  couponCode?: string
): Promise<XRMApiResponse<PriceBreakdown>> {
  let url = `/price?assetId=${assetId}&startDate=${startDate}&endDate=${endDate}`;
  if (couponCode) url += `&couponCode=${encodeURIComponent(couponCode)}`;
  return get<PriceBreakdown>(url);
}

// ===========================
// AUTH
// ===========================

export async function register(data: {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  phone?: string;
}): Promise<XRMApiResponse<AuthResponse>> {
  const result = await post<AuthResponse>("/auth/register", data);
  if (result.success && result.data) {
    localStorage.setItem("xrm_token", result.data.accessToken);
    localStorage.setItem("xrm_refresh_token", result.data.refreshToken);
    localStorage.setItem("xrm_customer", JSON.stringify(result.data.customer));
  }
  return result;
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<XRMApiResponse<AuthResponse>> {
  const result = await post<AuthResponse>("/auth/login", data);
  if (result.success && result.data) {
    localStorage.setItem("xrm_token", result.data.accessToken);
    localStorage.setItem("xrm_refresh_token", result.data.refreshToken);
    localStorage.setItem("xrm_customer", JSON.stringify(result.data.customer));
  }
  return result;
}

export async function refreshAccessToken(): Promise<boolean> {
  const refreshTokenValue = localStorage.getItem("xrm_refresh_token");
  if (!refreshTokenValue) return false;

  const result = await post<{ accessToken: string; refreshToken: string }>(
    "/auth/refresh",
    { refreshToken: refreshTokenValue }
  );

  if (result.success && result.data) {
    localStorage.setItem("xrm_token", result.data.accessToken);
    localStorage.setItem("xrm_refresh_token", result.data.refreshToken);
    return true;
  }

  // Refresh failed — clear session
  logout();
  return false;
}

export function logout() {
  localStorage.removeItem("xrm_token");
  localStorage.removeItem("xrm_refresh_token");
  localStorage.removeItem("xrm_customer");
}

export function getStoredCustomer() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("xrm_customer");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("xrm_token");
}

// ===========================
// AUTHENTICATED APIs
// ===========================

export async function fetchMyBookings(): Promise<XRMApiResponse<Booking[]>> {
  return get<Booking[]>("/bookings");
}

export async function createBooking(data: {
  assetId: number;
  startDate: string;
  endDate: string;
  couponCode?: string;
  pickupLocation?: string;
  notes?: string;
}): Promise<XRMApiResponse<Booking>> {
  return post<Booking>("/bookings", data);
}

export async function cancelBooking(
  bookingId: number,
  reason?: string
): Promise<XRMApiResponse<Booking>> {
  return post<Booking>(`/bookings/${bookingId}/cancel`, { reason });
}

export async function submitReview(data: {
  bookingId: number;
  rating: number;
  title?: string;
  reviewText?: string;
}): Promise<XRMApiResponse<Review>> {
  return post<Review>("/reviews", data);
}

export async function fetchReviews(
  assetId: number
): Promise<XRMApiResponse<PublicReviewsResponse>> {
  return get<PublicReviewsResponse>(`/reviews?assetId=${assetId}`);
}

// ===========================
// EXTENDED AUTH
// ===========================

import type {
  CustomerProfile,
  CustomerAddress,
  CreateAddressRequest,
  CustomerSession,
  ProfileUpdateRequest,
} from "@/types/xrmlite";

import type { XRMCategory, XRMBrand } from "@/types/xrm-assets";

// ===========================
// FLEET FILTERS
// ===========================

export async function fetchCategories(): Promise<
  XRMApiResponse<XRMCategory[]> & { source?: string }
> {
  const res = await fetch(`${BASE}/fleet/categories`);
  return res.json();
}

export async function fetchBrands(): Promise<
  XRMApiResponse<XRMBrand[]> & { source?: string }
> {
  const res = await fetch(`${BASE}/fleet/brands`);
  return res.json();
}

// ===========================
// EXTENDED AUTH (continued)
// ===========================

export async function forgotPassword(
  email: string
): Promise<XRMApiResponse<{ message: string }>> {
  return post<{ message: string }>("/auth/forgot-password", { email });
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<XRMApiResponse<{ message: string }>> {
  return post<{ message: string }>("/auth/reset-password", {
    token,
    newPassword,
  });
}

/**
 * Server-side logout — revokes refresh token, then clears local storage.
 */
export async function serverLogout(): Promise<void> {
  const refreshTokenValue = localStorage.getItem("xrm_refresh_token");
  if (refreshTokenValue) {
    // Fire and forget — don't block on response
    post<{ message: string }>("/auth/logout", {
      refreshToken: refreshTokenValue,
    }).catch(() => {});
  }
  logout();
}

// ===========================
// ACCOUNT / PROFILE
// ===========================

export async function fetchProfile(): Promise<XRMApiResponse<CustomerProfile>> {
  return get<CustomerProfile>("/account/profile");
}

export async function updateProfile(
  data: ProfileUpdateRequest
): Promise<XRMApiResponse<CustomerProfile>> {
  const res = await fetch(`${BASE}/account/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<XRMApiResponse<{ message: string }>> {
  return post<{ message: string }>("/account/change-password", {
    currentPassword,
    newPassword,
  });
}

// ===========================
// ADDRESSES
// ===========================

export async function fetchAddresses(): Promise<
  XRMApiResponse<CustomerAddress[]>
> {
  return get<CustomerAddress[]>("/account/addresses");
}

export async function addAddress(
  data: CreateAddressRequest
): Promise<XRMApiResponse<CustomerAddress>> {
  return post<CustomerAddress>("/account/addresses", data as unknown as Record<string, unknown>);
}

export async function removeAddress(
  id: number
): Promise<XRMApiResponse<{ message: string }>> {
  const res = await fetch(`${BASE}/account/addresses/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
  return res.json();
}

// ===========================
// SESSIONS
// ===========================

export async function fetchSessions(): Promise<
  XRMApiResponse<CustomerSession[]>
> {
  return get<CustomerSession[]>("/account/sessions");
}

export async function revokeSessionById(
  id: number
): Promise<XRMApiResponse<{ message: string }>> {
  return post<{ message: string }>(`/account/sessions/${id}/revoke`, {});
}
