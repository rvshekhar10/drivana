import { NextRequest, NextResponse } from "next/server";
import { submitReview, getAssetReviews } from "@/lib/xrmlite";

function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}

/**
 * GET /api/reviews?assetId=1 — get public reviews + rating summary for an asset
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get("assetId");

  if (!assetId) {
    return NextResponse.json(
      { success: false, error: { code: "VALIDATION", message: "assetId is required" } },
      { status: 400 }
    );
  }

  const result = await getAssetReviews(Number(assetId));
  return NextResponse.json(result);
}

/**
 * POST /api/reviews — submit a review for a completed booking (authenticated)
 */
export async function POST(request: NextRequest) {
  const token = extractToken(request);
  if (!token) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Login required" } },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { bookingId, rating, title, reviewText, comment } = body;

    if (!bookingId || !rating) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "bookingId and rating are required" } },
        { status: 400 }
      );
    }

    const result = await submitReview(token, {
      bookingId: Number(bookingId),
      rating: Number(rating),
      title: title || undefined,
      reviewText: reviewText || comment || undefined,
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 422 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "Invalid request body" } },
      { status: 400 }
    );
  }
}
