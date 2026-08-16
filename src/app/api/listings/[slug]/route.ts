import { NextRequest, NextResponse } from "next/server";
import { getXRMListingBySlug } from "@/lib/xrmlite";
import { adaptAssetToListing } from "@/lib/asset-adapter";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Try XRMlite API
  const result = await getXRMListingBySlug(slug);

  if (result.success && result.data) {
    const adapted = adaptAssetToListing(result.data);
    return NextResponse.json({
      success: true,
      data: adapted,
      source: "api",
    });
  }

  return NextResponse.json(
    { success: false, error: { code: "NOT_FOUND", message: "Car not found" } },
    { status: 404 }
  );
}
