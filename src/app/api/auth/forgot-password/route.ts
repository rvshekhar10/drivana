import { NextRequest, NextResponse } from "next/server";
import { forgotPassword } from "@/lib/xrmlite";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "email is required" } },
        { status: 400 }
      );
    }

    const result = await forgotPassword({ email });
    // Always return 200 to prevent email enumeration
    return NextResponse.json({ success: true, data: { message: "If the email exists, a reset link has been sent." } });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "Invalid request body" } },
      { status: 400 }
    );
  }
}
