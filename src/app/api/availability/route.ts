import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.XRMLITE_API_URL || "https://xrmlite.drivana.co.in/api/v1";
const API_KEY = process.env.XRMLITE_API_KEY || "";

/**
 * GET /api/availability — Phase 1: Explore availability (no lock)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get("assetId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const startTime = searchParams.get("startTime") || "09:00";
  const endTime = searchParams.get("endTime") || "09:00";

  if (!assetId || !startDate || !endDate) {
    return NextResponse.json(
      { success: false, error: { code: "VALIDATION", message: "assetId, startDate, and endDate are required" } },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams({
      assetId,
      startDate,
      endDate,
      startTime,
      endTime,
    });
    const res = await fetch(
      `${API_BASE_URL}/assets/public/check-availability?${params.toString()}`,
      { headers: { "x-api-key": API_KEY } }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "NETWORK_ERROR", message: "Failed to check availability" } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/availability — Phase 2: Create hold (10-min lock before payment)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { assetId, startDate, endDate, startTime, endTime } = body;

    if (!assetId || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "assetId, startDate, and endDate are required" } },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${API_BASE_URL}/assets/public/check-availability`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          assetId: Number(assetId),
          startDate,
          endDate,
          startTime: startTime || "09:00",
          endTime: endTime || "09:00",
          lock: true,
        }),
      }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "NETWORK_ERROR", message: "Failed to create hold" } },
      { status: 500 }
    );
  }
}
