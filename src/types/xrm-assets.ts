/**
 * XRMlite Asset API types — matches the actual /assets/public/* response format.
 * These are the raw shapes from the API before transformation to our UI types.
 */

// --- Media ---
export interface XRMAssetMedia {
  url: string;
  alt?: string;
  is_featured: boolean;
  type: "image" | "video";
}

// --- Pricing ---
export type XRMPricingPeriod = "per_day" | "per_week" | "per_month";

export interface XRMAssetPricing {
  period: XRMPricingPeriod;
  price: number;
  original_price?: number;
  deposit: number;
  km_limit?: string;
}

// --- Specs (JSON field) ---
export interface XRMAssetSpecs {
  brand?: string;
  model_name?: string;
  manufacturing_year?: number;
  body_type?: string;
  fuel?: string;
  engine_capacity?: string;
  transmission_type?: string;
  seating_capacity?: string;
  baggage_capacity?: string;
  mileage?: string;
  km_limit?: string;
  excess_km_charge?: string;
  air_conditioning?: string;
  power_steering?: string;
  power_windows?: string;
  abs?: string;
  airbags?: string;
  infotainment?: string;
  rear_camera?: string;
  keyless_entry?: string;
  [key: string]: unknown;
}

// --- Full Asset from API ---
export interface XRMAsset {
  id: number;
  name: string;
  slug: string;
  model_name: string;
  model_year: number | string;
  city: string;
  description: string;
  specs: XRMAssetSpecs;
  features: string[];
  terms: string[];
  ideal_for: string[];
  media: XRMAssetMedia[];
  pricing: XRMAssetPricing[];
  rating: number;
  review_count: number;
  // Optional fields
  category_id?: number;
  category_name?: string;
  brand_id?: number;
  brand_name?: string;
  pickup_location?: string;
  nearby_destinations?: string[];
  status?: string;
}

// --- Categories ---
export interface XRMCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  asset_count?: number;
}

// --- Brands ---
export interface XRMBrand {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  asset_count?: number;
}
