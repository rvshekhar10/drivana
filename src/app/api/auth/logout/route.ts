import { NextRequest, NextResponse } from "next/server";
import { logoutCustomer } from "@/lib/xrmlite";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "refreshToken is required" } },
        { status: 400 }
      );
    }

    const result = await logoutCustomer(refreshToken);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "Invalid request body" } },
      { status: 400 }
    );
  }
}
