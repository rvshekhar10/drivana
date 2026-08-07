import { NextRequest, NextResponse } from "next/server";
import { getXRMListingBySlug } from "@/lib/xrmlite";
import { adaptAssetToListing } from "@/lib/asset-adapter";
import carsData from "@/data/cars.json";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Try XRMlite API first
  const result = await getXRMListingBySlug(slug);

  if (result.success && result.data) {
    const adapted = adaptAssetToListing(result.data);
    return NextResponse.json({
      success: true,
      data: adapted,
      source: "api",
    });
  }

  // Fallback to static data
  const staticCar = carsData.find((c) => c.slug === slug);
  if (staticCar) {
    return NextResponse.json({
      success: true,
      data: staticCar,
      source: "static",
    });
  }

  return NextResponse.json(
    { success: false, error: { code: "NOT_FOUND", message: "Car not found" } },
    { status: 404 }
  );
}
