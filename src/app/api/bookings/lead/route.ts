import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.XRMLITE_API_URL || "https://xrmlite.drivana.co.in/api/v1";
const API_KEY = process.env.XRMLITE_API_KEY || "";

/**
 * POST /api/bookings/lead — Push a WhatsApp booking lead to XRMlite.
 * No customer auth required — this is a guest lead capture.
 * Fire-and-forget from the client; we don't block on success.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward to XRMlite booking engine as a lead/guest booking
    const res = await fetch(`${API_BASE_URL}/bookings/public/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        assetName: body.carName,
        assetModel: body.carModel,
        customerName: body.name,
        customerPhone: body.phone,
        startDate: body.pickupDate,
        endDate: body.dropoffDate,
        pickupTime: body.pickupTime,
        notes: body.message,
        source: "whatsapp_widget",
        pricePerDay: body.pricePerDay,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    // Don't fail the user flow — this is best-effort tracking
    return NextResponse.json({ success: false, tracked: false });
  }
}
