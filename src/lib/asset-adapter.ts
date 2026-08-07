/**
 * Adapter to transform XRMlite API asset format → our UI AssetListing format.
 * This keeps all existing components (CarCard, FleetClient, CarDetailClient) working
 * without modification while consuming the real API shape.
 */

import type { XRMAsset } from "@/types/xrm-assets";
import type { AssetListing } from "@/types/xrmlite";

/**
 * Convert a single XRMAsset (API shape) → AssetListing (UI shape).
 */
export function adaptAssetToListing(asset: XRMAsset): AssetListing {
  // Extract pricing by period
  const dailyPricing = asset.pricing.find((p) => p.period === "per_day");
  const weeklyPricing = asset.pricing.find((p) => p.period === "per_week");
  const monthlyPricing = asset.pricing.find((p) => p.period === "per_month");

  // Find featured image
  const featuredMedia = asset.media.find((m) => m.is_featured);
  const imageUrl = featuredMedia?.url || asset.media[0]?.url || "";

  // Calculate discount
  const pricePerDay = dailyPricing?.price || 0;
  const originalPrice = dailyPricing?.original_price || pricePerDay;
  const discount =
    originalPrice > pricePerDay
      ? Math.round(((originalPrice - pricePerDay) / originalPrice) * 100)
      : 0;

  // Map specs
  const specs = asset.specs || {};

  return {
    id: asset.id,
    slug: asset.slug,
    name: asset.name,
    model: String(asset.model_year),
    image_url: imageUrl,
    media: asset.media.map((m) => ({
      type: m.type,
      url: m.url,
      alt: m.alt,
      featured: m.is_featured,
    })),
    price_per_day: pricePerDay,
    price_per_week: weeklyPricing?.price || Math.round(pricePerDay * 7 * 0.85),
    price_per_month: monthlyPricing?.price || Math.round(pricePerDay * 30 * 0.8),
    original_price: originalPrice,
    discount,
    features: asset.features || [],
    transmission: specs.transmission_type || "Manual",
    fuel_type: specs.fuel || "Petrol",
    deposit: dailyPricing?.deposit || 5000,
    rating: asset.rating || 0,
    review_count: asset.review_count || 0,
    pickup_location: asset.pickup_location || `${asset.city}`,
    category: asset.category_name || specs.body_type || "Car",
    specs: {
      brand: specs.brand || asset.brand_name || asset.name.split(" ")[0],
      model_name: specs.model_name || asset.model_name || asset.name,
      manufacturing_year: specs.manufacturing_year || Number(asset.model_year) || 2024,
      body_type: specs.body_type || asset.category_name || "Car",
      fuel: specs.fuel || "Petrol",
      engine_capacity: specs.engine_capacity || "",
      transmission_type: specs.transmission_type || "Manual",
      seating_capacity: specs.seating_capacity || "5 Seater",
      baggage_capacity: specs.baggage_capacity || "2 Luggage",
      mileage: specs.mileage || "",
      km_limit: specs.km_limit || dailyPricing?.km_limit || "250 km/day",
      excess_km_charge: specs.excess_km_charge || "₹8/km",
      air_conditioning: specs.air_conditioning,
      power_steering: specs.power_steering,
      power_windows: specs.power_windows,
      abs: specs.abs,
      airbags: specs.airbags,
      infotainment: specs.infotainment,
      rear_camera: specs.rear_camera,
      keyless_entry: specs.keyless_entry,
    },
    description: asset.description || "",
    ideal_for: asset.ideal_for || [],
    nearby_destinations: asset.nearby_destinations || [],
    terms: asset.terms || [],
    city: asset.city,
    status: asset.status,
  };
}

/**
 * Convert an array of XRMAssets → AssetListings.
 */
export function adaptAssetsToListings(assets: XRMAsset[]): AssetListing[] {
  return assets.map(adaptAssetToListing);
}
