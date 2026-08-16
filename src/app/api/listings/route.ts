import { NextRequest, NextResponse } from "next/server";
import { getXRMListings } from "@/lib/xrmlite";
import { adaptAssetsToListings } from "@/lib/asset-adapter";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || undefined;
  const cityId = searchParams.get("cityId");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  const result = await getXRMListings({
    city,
    cityId: cityId ? Number(cityId) : undefined,
    category: category ? Number(category) : undefined,
    brand: brand ? Number(brand) : undefined,
  });

  if (result.success && result.data && result.data.length > 0) {
    let assets = result.data;

    // Client-side city filter (safety net if API doesn't filter)
    if (cityId) {
      const cid = Number(cityId);
      const filtered = assets.filter((a) => a.city_id === cid);
      // Only apply filter if it produces results (API might not have city_id field)
      if (filtered.length > 0 || assets.every((a) => a.city_id != null)) {
        assets = filtered;
      }
    }

    const adapted = adaptAssetsToListings(assets);
    return NextResponse.json({
      success: true,
      data: adapted,
      source: "api",
    });
  }

  return NextResponse.json({
    success: true,
    data: [],
    source: "api",
  });
}
