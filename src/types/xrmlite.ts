// ===========================
// XRMlite API Type Definitions
// ===========================

// --- Generic API Response ---
export interface XRMApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// --- Asset / Listing Types ---
export interface AssetMedia {
  type: "image" | "video";
  url: string;
  alt?: string;
  featured?: boolean;
}

export interface AssetSpecs {
  brand: string;
  model_name: string;
  manufacturing_year: number;
  body_type: string;
  fuel: string;
  engine_capacity: string;
  transmission_type: string;
  seating_capacity: string;
  baggage_capacity: string;
  mileage: string;
  km_limit: string;
  excess_km_charge: string;
  air_conditioning?: string;
  power_steering?: string;
  power_windows?: string;
  abs?: string;
  airbags?: string;
  infotainment?: string;
  rear_camera?: string;
  keyless_entry?: string;
}

export interface AssetListing {
  id: number;
  slug: string;
  name: string;
  model: string;
  image_url: string;
  media: AssetMedia[];
  price_per_day: number;
  price_per_week: number;
  price_per_month: number;
  original_price: number;
  discount: number;
  features: string[];
  transmission: string;
  fuel_type: string;
  deposit: number;
  rating: number;
  review_count: number;
  pickup_location: string;
  category: string;
  specs: AssetSpecs;
  description: string;
  ideal_for: string[];
  nearby_destinations: string[];
  terms: string[];
  city?: string;
  status?: string;
}

// --- Availability ---
export interface AvailabilityRequest {
  assetId: number;
  startDate: string; // ISO date "YYYY-MM-DD"
  endDate: string;   // ISO date "YYYY-MM-DD"
}

export interface AvailabilitySlot {
  date: string;
  available: boolean;
}

export interface AvailabilityResponse {
  available: boolean;
  slots?: AvailabilitySlot[];
  conflicting_dates?: string[];
}

// --- Pricing ---
export interface PriceRequest {
  assetId: number;
  startDate: string;
  endDate: string;
  couponCode?: string;
}

export interface PriceBreakdown {
  // Fields from real XRMlite API
  pricingPeriod?: string;
  unitPrice?: number;
  totalUnits?: number;
  subtotal: number;
  discountAmount?: number;
  couponDiscount?: number;
  taxAmount?: number;
  totalAmount?: number;
  depositAmount?: number;
  kmLimit?: string;
  excessKmCharge?: string;
  // Legacy/computed fields for backward compat
  base_price: number;
  duration_days: number;
  daily_rate: number;
  discount_amount: number;
  coupon_discount: number;
  tax: number;
  total: number;
  deposit: number;
  coupon_applied?: string;
}

// --- Customer / Auth ---
export interface CustomerRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  phone?: string;
}

export interface CustomerLoginRequest {
  email: string;
  password: string;
}

export interface CustomerProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string | null;
  display_name: string;
  avatar_url: string | null;
  phone?: string;
  status: "unverified" | "active" | "suspended";
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  customer: CustomerProfile;
}

// --- Booking ---
export interface BookingRequest {
  assetId: number;
  startDate: string;
  endDate: string;
  couponCode?: string;
  pickupLocation?: string;
  notes?: string;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

export interface Booking {
  id: number;
  booking_number?: string;
  asset_id: number;
  customer_id: number;
  start_date: string;
  end_date: string;
  status: BookingStatus;
  total_amount: number;
  deposit_amount: number;
  coupon_code?: string;
  pickup_location?: string;
  notes?: string;
  cancel_reason?: string;
  created_at: string;
  updated_at: string;
  asset?: AssetListing;
}

// --- Reviews ---
export interface ReviewRequest {
  bookingId: number;
  rating: number; // 1-5
  title?: string;
  reviewText?: string;
  // Legacy compat
  comment?: string;
}

export interface Review {
  id: number;
  booking_id: number;
  customer_id: number;
  asset_id: number;
  rating: number;
  title: string | null;
  review_text: string | null;
  comment: string | null;
  customer_name?: string;
  created_at: string;
}

export interface ReviewSummary {
  average_rating: number;
  total_reviews: number;
  rating_breakdown: Record<string, number>; // "5": 3, "4": 2, etc.
}

export interface PublicReviewsResponse {
  reviews: Review[];
  summary: ReviewSummary;
}

// ===========================
// CMS / Blog Types
// ===========================

export interface CMSCollection {
  id: number;
  name: string;
  slug: string;
  description?: string;
  article_count?: number;
}

export interface CMSTag {
  id: number;
  name: string;
  slug: string;
  article_count?: number;
}

export interface CMSTocItem {
  id: string;
  text: string;
  level: number; // 1-6 (h1-h6)
}

export interface CMSArticleSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
  reading_time?: number; // minutes
  author_name?: string;
  author_avatar?: string;
  collection?: CMSCollection;
  tags: CMSTag[];
}

export interface CMSArticle extends CMSArticleSummary {
  content_html: string;
  toc: CMSTocItem[];
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_image?: string;
  related_articles?: CMSArticleSummary[];
  updated_at?: string;
}

// ===========================
// Customer Profile & Account Types
// ===========================

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// --- Addresses ---
export interface CustomerAddress {
  id: number;
  label: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  is_default: boolean;
  created_at: string;
}

export interface CreateAddressRequest {
  label: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault?: boolean;
}

// --- Sessions ---
export interface CustomerSession {
  id: number;
  device_name?: string;
  ip_address?: string;
  user_agent?: string;
  last_active_at: string;
  created_at: string;
  is_current: boolean;
}
