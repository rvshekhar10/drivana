/**
 * Adapter to transform XRMlite API asset format → our UI AssetListing format.
 * Handles the REAL API response shape:
 *   - attributes (not specs)
 *   - pricing[].pricing_type = "daily" | "weekly" | "monthly"
 *   - pricing[].amount (string like "2499.00")
 *   - pricing[].original_amount (string or null)
 *   - highlight_features (not features)
 *   - deposit (string like "5000.00")
 *   - excess_km_charge (string)
 */

import type { AssetListing } from "@/types/xrmlite";

/** XRMlite base URL — used to prefix relative /uploads/ paths */
const XRMLITE_BASE = "https://xrmlite.drivana.co.in";

/**
 * Resolve a media URL to an absolute URL that Next.js Image can load.
 * - Already absolute (https://...): return as-is
 * - /cars/... or /public/...: local Next.js public asset, return as-is
 * - /uploads/...: stored on XRMlite server, prefix with XRMLITE_BASE
 */
function resolveMediaUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) return `${XRMLITE_BASE}${url}`;
  // Local public asset (/cars/..., etc.)
  return url;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RawAsset = any;

/**
 * Convert a single raw API asset → AssetListing (UI shape).
 */
export function adaptAssetToListing(asset: RawAsset): AssetListing {
  const pricing = asset.pricing || [];
  const attrs = asset.attributes || asset.specs || {};

  // Extract pricing by type — handle both naming conventions
  const dailyPricing =
    pricing.find((p: RawAsset) => p.pricing_type === "daily" || p.period === "per_day");
  const weeklyPricing =
    pricing.find((p: RawAsset) => p.pricing_type === "weekly" || p.period === "per_week");
  const monthlyPricing =
    pricing.find((p: RawAsset) => p.pricing_type === "monthly" || p.period === "per_month");

  // Parse price (handles both string "2499.00" and number 2499)
  const parsePrice = (val: unknown): number => {
    if (typeof val === "number") return val;
    if (typeof val === "string") return parseFloat(val) || 0;
    return 0;
  };

  const pricePerDay = parsePrice(dailyPricing?.amount || dailyPricing?.price);
  const originalPrice = parsePrice(dailyPricing?.original_amount || dailyPricing?.original_price) || pricePerDay;
  const pricePerWeek = parsePrice(weeklyPricing?.amount || weeklyPricing?.price) || Math.round(pricePerDay * 7 * 0.85);
  const pricePerMonth = parsePrice(monthlyPricing?.amount || monthlyPricing?.price) || Math.round(pricePerDay * 30 * 0.8);
  const deposit = parsePrice(asset.deposit || dailyPricing?.deposit) || 5000;

  // Discount
  const discount =
    originalPrice > pricePerDay
      ? Math.round(((originalPrice - pricePerDay) / originalPrice) * 100)
      : 0;

  // Find featured image
  const media = asset.media || [];
  const featuredMedia = media.find((m: RawAsset) => m.is_featured === 1 || m.is_featured === true);
  const imageUrl = resolveMediaUrl(featuredMedia?.url || media[0]?.url || "");

  // Features — prefer highlight_features, fallback to features
  const features: string[] = asset.highlight_features || asset.features || [];

  // Category from attributes or asset fields
  const bodyType = attrs.body_type || "";
  const category = asset.category_name || formatBodyType(bodyType) || "Car";

  // Transmission & fuel
  const transmission = formatTransmission(attrs.transmission || attrs.transmission_type || "manual");
  const fuelType = formatFuel(attrs.fuel_type || attrs.fuel || "petrol");

  // KM limit from daily pricing or excess_km_charge
  const kmLimit = dailyPricing?.km_limit
    ? `${dailyPricing.km_limit} km/day`
    : attrs.km_limit || "250 km/day";
  const excessKmCharge = asset.excess_km_charge
    ? `₹${parsePrice(asset.excess_km_charge)}/km`
    : attrs.excess_km_charge || "₹8/km";

  return {
    id: asset.id,
    slug: asset.slug,
    name: asset.name,
    model: String(attrs.manufacturing_year || asset.model_year || asset.model_name || ""),
    image_url: imageUrl,
    media: media.map((m: RawAsset) => ({
      type: m.type || "image",
      url: resolveMediaUrl(m.url),
      alt: m.alt,
      featured: m.is_featured === 1 || m.is_featured === true,
    })),
    price_per_day: pricePerDay,
    price_per_week: pricePerWeek,
    price_per_month: pricePerMonth,
    original_price: originalPrice,
    discount,
    features,
    transmission,
    fuel_type: fuelType,
    deposit,
    rating: parsePrice(asset.rating) || 0,
    review_count: asset.review_count || 0,
    pickup_location: asset.location_name || asset.pickup_location || "",
    category,
    specs: {
      brand: attrs.brand || asset.brand_name || asset.name.split(" ")[0],
      model_name: attrs.model_name || asset.model_name || asset.name,
      manufacturing_year: attrs.manufacturing_year || Number(asset.model_year) || 2024,
      body_type: bodyType || category,
      fuel: fuelType,
      engine_capacity: attrs.engine_capacity_cc ? `${attrs.engine_capacity_cc} CC` : (attrs.engine_capacity || ""),
      transmission_type: transmission,
      seating_capacity: attrs.seating_capacity ? `${attrs.seating_capacity} Seater` : "5 Seater",
      baggage_capacity: attrs.luggage_capacity ? `${attrs.luggage_capacity} Luggage` : "2 Luggage",
      mileage: attrs.mileage || "",
      km_limit: kmLimit,
      excess_km_charge: excessKmCharge,
      air_conditioning: formatBool(attrs.air_conditioning),
      power_steering: formatBool(attrs.power_steering),
      power_windows: formatBool(attrs.power_windows),
      abs: formatBool(attrs.abs),
      airbags: typeof attrs.airbags === "string" ? attrs.airbags : (attrs.airbags ? "Yes" : undefined),
      infotainment: attrs.infotainment_screen || attrs.infotainment,
      rear_camera: formatBool(attrs.rear_parking_camera || attrs.rear_camera),
      keyless_entry: formatBool(attrs.keyless_entry),
    },
    description: asset.description || "",
    ideal_for: asset.ideal_for || [],
    nearby_destinations: asset.nearby_destinations || [],
    terms: asset.terms || [],
    city: asset.city_id ? String(asset.city_id) : undefined,
    status: asset.status,
  };
}

/**
 * Convert an array of raw API assets → AssetListings.
 */
export function adaptAssetsToListings(assets: RawAsset[]): AssetListing[] {
  return (assets || []).map(adaptAssetToListing);
}

// --- Helpers ---

function formatBodyType(raw: string): string {
  const map: Record<string, string> = {
    "compact-suv": "SUV",
    suv: "SUV",
    hatchback: "Hatchback",
    sedan: "Sedan",
    muv: "MUV",
    mpv: "MPV",
    crossover: "Crossover",
  };
  return map[raw.toLowerCase()] || raw.charAt(0).toUpperCase() + raw.slice(1);
}

function formatTransmission(raw: string): string {
  if (!raw) return "Manual";
  const lower = raw.toLowerCase();
  if (lower === "automatic" || lower === "auto" || lower === "amt") return "Automatic";
  return "Manual";
}

function formatFuel(raw: string): string {
  if (!raw) return "Petrol";
  const lower = raw.toLowerCase();
  if (lower === "diesel") return "Diesel";
  if (lower === "cng") return "CNG";
  if (lower === "electric" || lower === "ev") return "Electric";
  return "Petrol";
}

function formatBool(val: unknown): string | undefined {
  if (val === true || val === "true" || val === "yes") return "Yes";
  if (val === false || val === "false" || val === "no" || val === "none") return undefined;
  if (typeof val === "string" && val.length > 0) return val;
  return undefined;
}
