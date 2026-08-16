/**
 * XRMlite API Client
 *
 * Server-side utility for communicating with the XRMlite backend.
 * All calls go through Next.js API routes to keep the API key secret.
 *
 * Base URL: https://xrmlite.drivana.co.in/api/v1
 * Auth: x-api-key header for platform-level access
 *       Authorization: Bearer <jwt> for customer-level access
 */

import type {
  XRMApiResponse,
  AssetListing,
  AvailabilityResponse,
  PriceBreakdown,
  AuthResponse,
  CustomerRegisterRequest,
  CustomerLoginRequest,
  Booking,
  BookingRequest,
  ReviewRequest,
  Review,
  PublicReviewsResponse,
} from "@/types/xrmlite";

// --- Configuration ---
const API_BASE_URL =
  process.env.XRMLITE_API_URL || "https://xrmlite.drivana.co.in/api/v1";
const API_KEY = process.env.XRMLITE_API_KEY || "";

// --- Internal Helpers ---

function buildHeaders(customerToken?: string): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": API_KEY,
  };
  if (customerToken) {
    headers["Authorization"] = `Bearer ${customerToken}`;
  }
  return headers;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<XRMApiResponse<T>> {
  const url = `${API_BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...buildHeaders(),
        ...(options.headers as Record<string, string>),
      },
    });
    const json = await res.json();
    return json as XRMApiResponse<T>;
  } catch (error) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to reach XRMlite API",
      },
    };
  }
}

async function authenticatedRequest<T>(
  path: string,
  token: string,
  options: RequestInit = {}
): Promise<XRMApiResponse<T>> {
  return request<T>(path, {
    ...options,
    headers: {
      ...(options.headers as Record<string, string>),
      Authorization: `Bearer ${token}`,
    },
  });
}

// ===========================
// PUBLIC API (no customer auth)
// ===========================

/**
 * Fetch asset listings - optionally filtered by city.
 */
export async function getListings(
  city?: string
): Promise<XRMApiResponse<AssetListing[]>> {
  const params = new URLSearchParams();
  if (city) params.set("city", city);
  const query = params.toString() ? `?${params.toString()}` : "";
  return request<AssetListing[]>(`/assets/public/listings${query}`);
}

/**
 * Fetch a single asset by slug.
 */
export async function getListingBySlug(
  slug: string
): Promise<XRMApiResponse<AssetListing>> {
  return request<AssetListing>(`/assets/public/listings/${slug}`);
}

/**
 * Check availability for an asset in a given date range.
 */
export async function checkAvailability(
  assetId: number,
  startDate: string,
  endDate: string
): Promise<XRMApiResponse<AvailabilityResponse>> {
  const params = new URLSearchParams({
    assetId: String(assetId),
    startDate,
    endDate,
  });
  return request<AvailabilityResponse>(
    `/bookings/public/availability?${params.toString()}`
  );
}

/**
 * Get a price quote for a booking.
 */
export async function getPriceQuote(
  assetId: number,
  startDate: string,
  endDate: string,
  couponCode?: string
): Promise<XRMApiResponse<PriceBreakdown>> {
  const params = new URLSearchParams({
    assetId: String(assetId),
    startDate,
    endDate,
  });
  if (couponCode) params.set("couponCode", couponCode);
  return request<PriceBreakdown>(
    `/bookings/public/price?${params.toString()}`
  );
}

// ===========================
// AUTH
// ===========================

/**
 * Register a new customer account.
 */
export async function registerCustomer(
  data: CustomerRegisterRequest
): Promise<XRMApiResponse<AuthResponse>> {
  return request<AuthResponse>("/customers/public/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Login with email + password.
 */
export async function loginCustomer(
  data: CustomerLoginRequest
): Promise<XRMApiResponse<AuthResponse>> {
  return request<AuthResponse>("/customers/public/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Refresh an expired access token.
 */
export async function refreshToken(
  refreshTokenValue: string
): Promise<XRMApiResponse<{ accessToken: string; refreshToken: string }>> {
  return request<{ accessToken: string; refreshToken: string }>(
    "/customers/public/refresh-token",
    {
      method: "POST",
      body: JSON.stringify({ refreshToken: refreshTokenValue }),
    }
  );
}

// ===========================
// AUTHENTICATED (customer token)
// ===========================

/**
 * Create a booking (requires customer JWT).
 */
export async function createBooking(
  token: string,
  data: BookingRequest
): Promise<XRMApiResponse<Booking>> {
  return authenticatedRequest<Booking>("/bookings/public/book", token, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Get customer's bookings.
 */
export async function getMyBookings(
  token: string
): Promise<XRMApiResponse<Booking[]>> {
  return authenticatedRequest<Booking[]>(
    "/bookings/public/my-bookings",
    token
  );
}

/**
 * Cancel a pending/confirmed booking.
 */
export async function cancelBooking(
  token: string,
  bookingId: number,
  reason?: string
): Promise<XRMApiResponse<Booking>> {
  return authenticatedRequest<Booking>(
    `/bookings/public/cancel/${bookingId}`,
    token,
    {
      method: "POST",
      body: JSON.stringify({ reason }),
    }
  );
}

/**
 * Submit a review for a completed booking.
 */
export async function submitReview(
  token: string,
  data: ReviewRequest
): Promise<XRMApiResponse<Review>> {
  return authenticatedRequest<Review>("/bookings/public/reviews", token, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Get public reviews for a specific asset (with rating summary).
 */
export async function getAssetReviews(
  assetId: number
): Promise<XRMApiResponse<PublicReviewsResponse>> {
  return request<PublicReviewsResponse>(`/bookings/public/reviews/${assetId}`);
}

// ===========================
// CMS / Blog
// ===========================

import type {
  CMSArticleSummary,
  CMSArticle,
  CMSCollection,
  CMSTag,
} from "@/types/xrmlite";

/**
 * Fetch published articles, optionally filtered by collection or tag.
 */
export async function getArticles(options?: {
  collection?: number;
  tag?: string;
  page?: number;
  limit?: number;
}): Promise<XRMApiResponse<CMSArticleSummary[]>> {
  const params = new URLSearchParams();
  if (options?.collection) params.set("collection", String(options.collection));
  if (options?.tag) params.set("tag", options.tag);
  if (options?.page) params.set("page", String(options.page));
  if (options?.limit) params.set("limit", String(options.limit));
  const query = params.toString() ? `?${params.toString()}` : "";
  return request<CMSArticleSummary[]>(`/cms/public/articles${query}`);
}

/**
 * Fetch a single article by slug (full content with HTML, TOC, SEO).
 */
export async function getArticleBySlug(
  slug: string
): Promise<XRMApiResponse<CMSArticle>> {
  return request<CMSArticle>(`/cms/public/articles/${slug}`);
}

/**
 * Fetch all collections (Blog, Press Releases, Case Studies, etc.).
 */
export async function getCollections(): Promise<XRMApiResponse<CMSCollection[]>> {
  return request<CMSCollection[]>("/cms/public/collections");
}

/**
 * Fetch all tags for filtering.
 */
export async function getTags(): Promise<XRMApiResponse<CMSTag[]>> {
  return request<CMSTag[]>("/cms/public/tags");
}

/**
 * Fetch raw content from CMS endpoints (sitemap, feed, robots, llms.txt).
 * Returns the raw response text rather than JSON.
 */
export async function getCMSRawContent(
  path: string
): Promise<{ ok: boolean; content: string; contentType: string }> {
  const url = `${API_BASE_URL}/cms/public/${path}`;
  try {
    const res = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const content = await res.text();
    return {
      ok: res.ok,
      content,
      contentType: res.headers.get("content-type") || "text/plain",
    };
  } catch {
    return { ok: false, content: "", contentType: "text/plain" };
  }
}

// ===========================
// CUSTOMER AUTH (extended)
// ===========================

import type {
  ProfileUpdateRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  CustomerProfile,
  CustomerAddress,
  CreateAddressRequest,
  CustomerSession,
} from "@/types/xrmlite";

/**
 * Forgot password — sends reset token to email.
 */
export async function forgotPassword(
  data: ForgotPasswordRequest
): Promise<XRMApiResponse<{ message: string }>> {
  return request<{ message: string }>("/customers/public/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Reset password with token. Revokes all sessions.
 */
export async function resetPassword(
  data: ResetPasswordRequest
): Promise<XRMApiResponse<{ message: string }>> {
  return request<{ message: string }>("/customers/public/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Logout — revoke refresh token on server.
 */
export async function logoutCustomer(
  refreshTokenValue: string
): Promise<XRMApiResponse<{ message: string }>> {
  return request<{ message: string }>("/customers/public/logout", {
    method: "POST",
    body: JSON.stringify({ refreshToken: refreshTokenValue }),
  });
}

// ===========================
// CUSTOMER PROFILE (auth required)
// ===========================

/**
 * Get current customer profile.
 */
export async function getProfile(
  token: string
): Promise<XRMApiResponse<CustomerProfile>> {
  return authenticatedRequest<CustomerProfile>(
    "/customers/public/me",
    token
  );
}

/**
 * Update customer profile.
 */
export async function updateProfile(
  token: string,
  data: ProfileUpdateRequest
): Promise<XRMApiResponse<CustomerProfile>> {
  return authenticatedRequest<CustomerProfile>(
    "/customers/public/me",
    token,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

/**
 * Change password (requires current password).
 */
export async function changePassword(
  token: string,
  data: ChangePasswordRequest
): Promise<XRMApiResponse<{ message: string }>> {
  return authenticatedRequest<{ message: string }>(
    "/customers/public/me/change-password",
    token,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

// ===========================
// ADDRESSES (auth required)
// ===========================

/**
 * List saved addresses.
 */
export async function getAddresses(
  token: string
): Promise<XRMApiResponse<CustomerAddress[]>> {
  return authenticatedRequest<CustomerAddress[]>(
    "/customers/public/me/addresses",
    token
  );
}

/**
 * Add a new address.
 */
export async function createAddress(
  token: string,
  data: CreateAddressRequest
): Promise<XRMApiResponse<CustomerAddress>> {
  return authenticatedRequest<CustomerAddress>(
    "/customers/public/me/addresses",
    token,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

/**
 * Delete an address.
 */
export async function deleteAddress(
  token: string,
  addressId: number
): Promise<XRMApiResponse<{ message: string }>> {
  return authenticatedRequest<{ message: string }>(
    `/customers/public/me/addresses/${addressId}`,
    token,
    { method: "DELETE" }
  );
}

// ===========================
// SESSIONS (auth required)
// ===========================

/**
 * List active sessions.
 */
export async function getSessions(
  token: string
): Promise<XRMApiResponse<CustomerSession[]>> {
  return authenticatedRequest<CustomerSession[]>(
    "/customers/public/me/sessions",
    token
  );
}

/**
 * Revoke a specific session.
 */
export async function revokeSession(
  token: string,
  sessionId: number
): Promise<XRMApiResponse<{ message: string }>> {
  return authenticatedRequest<{ message: string }>(
    `/customers/public/me/sessions/${sessionId}/revoke`,
    token,
    { method: "POST" }
  );
}

// ===========================
// ASSETS (real API format)
// ===========================

import type { XRMAsset, XRMCategory, XRMBrand } from "@/types/xrm-assets";

/**
 * Fetch asset listings with the real XRMlite format.
 * Supports filtering by city (name), cityId, category ID, brand ID.
 */
export async function getXRMListings(options?: {
  city?: string;
  cityId?: number;
  category?: number;
  brand?: number;
}): Promise<XRMApiResponse<XRMAsset[]>> {
  const params = new URLSearchParams();
  if (options?.cityId) params.set("cityId", String(options.cityId));
  else if (options?.city) params.set("city", options.city);
  if (options?.category) params.set("typeId", String(options.category));
  if (options?.brand) params.set("brand", String(options.brand));
  const query = params.toString() ? `?${params.toString()}` : "";
  return request<XRMAsset[]>(`/assets/public/listings${query}`);
}

/**
 * Fetch a single asset by slug (full gallery, all pricing plans).
 */
export async function getXRMListingBySlug(
  slug: string
): Promise<XRMApiResponse<XRMAsset>> {
  return request<XRMAsset>(`/assets/public/listings/${slug}`);
}

/**
 * Fetch asset categories (SUV, Sedan, Hatchback, etc.) for filter UI.
 */
export async function getAssetCategories(): Promise<XRMApiResponse<XRMCategory[]>> {
  return request<XRMCategory[]>("/assets/public/categories");
}

/**
 * Fetch brands for filter UI.
 */
export async function getAssetBrands(): Promise<XRMApiResponse<XRMBrand[]>> {
  return request<XRMBrand[]>("/assets/public/brands");
}

// ===========================
// SERVICE CITIES
// ===========================

import type { ServiceCity, CityCollection } from "@/types/xrmlite";

/**
 * Get all active service cities.
 */
export async function getCities(): Promise<XRMApiResponse<ServiceCity[]>> {
  return request<ServiceCity[]>("/assets/public/cities");
}

/**
 * Get city collections (e.g. "Metro Cities", "South India").
 */
export async function getCityCollections(): Promise<XRMApiResponse<CityCollection[]>> {
  return request<CityCollection[]>("/assets/public/city-collections");
}
