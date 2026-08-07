import { NextRequest, NextResponse } from "next/server";
import { getXRMListings } from "@/lib/xrmlite";
import { adaptAssetsToListings } from "@/lib/asset-adapter";
import carsData from "@/data/cars.json";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || undefined;
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  const result = await getXRMListings({
    city,
    category: category ? Number(category) : undefined,
    brand: brand ? Number(brand) : undefined,
  });

  // If API returns data, adapt it to our UI format
  if (result.success && result.data && result.data.length > 0) {
    const adapted = adaptAssetsToListings(result.data);
    return NextResponse.json({
      success: true,
      data: adapted,
      source: "api",
    });
  }

  // Fallback to static data if API returns empty or fails
  return NextResponse.json({
    success: true,
    data: carsData,
    source: "static",
  });
}
