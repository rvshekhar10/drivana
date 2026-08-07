import { NextRequest, NextResponse } from "next/server";
import { getMyBookings, createBooking } from "@/lib/xrmlite";

function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}

/**
 * GET /api/bookings — list customer's bookings
 */
export async function GET(request: NextRequest) {
  const token = extractToken(request);
  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHENTICATED", message: "Login required" },
      },
      { status: 401 }
    );
  }

  const result = await getMyBookings(token);

  if (!result.success) {
    const status = result.error?.code === "UNAUTHENTICATED" ? 401 : 500;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}

/**
 * POST /api/bookings — create a new booking
 */
export async function POST(request: NextRequest) {
  const token = extractToken(request);
  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHENTICATED", message: "Login required" },
      },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { assetId, startDate, endDate, couponCode, notes } = body;

    if (!assetId || !startDate || !endDate) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION",
            message: "assetId, startDate, and endDate are required",
          },
        },
        { status: 400 }
      );
    }

    const result = await createBooking(token, {
      assetId: Number(assetId),
      startDate,
      endDate,
      couponCode,
      notes,
    });

    if (!result.success) {
      const status =
        result.error?.code === "CONFLICT" ? 409 :
        result.error?.code === "UNAUTHENTICATED" ? 401 : 422;
      return NextResponse.json(result, { status });
    }

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { code: "INVALID_BODY", message: "Invalid request body" },
      },
      { status: 400 }
    );
  }
}
