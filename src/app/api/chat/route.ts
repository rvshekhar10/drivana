import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.XRMLITE_API_URL || "https://xrmlite.drivana.co.in/api/v1";
const API_KEY = process.env.XRMLITE_API_KEY || "";

/**
 * POST /api/chat — Send message to AI chatbot
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "message is required" } },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_BASE_URL}/chatbot/public/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ message, sessionId }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "NETWORK_ERROR", message: "Failed to reach chatbot" } },
      { status: 500 }
    );
  }
}
