import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.XRMLITE_API_URL || "https://xrmlite.drivana.co.in/api/v1";
const API_KEY = process.env.XRMLITE_API_KEY || "";

/**
 * GET /api/chat/:sessionId — Get conversation history
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  try {
    const res = await fetch(
      `${API_BASE_URL}/chatbot/public/chat/${sessionId}`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "NETWORK_ERROR", message: "Failed to reach chatbot" } },
      { status: 500 }
    );
  }
}
