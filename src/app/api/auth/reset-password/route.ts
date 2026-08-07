import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/lib/xrmlite";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "token and newPassword are required" } },
        { status: 400 }
      );
    }

    const result = await resetPassword({ token, newPassword });

    if (!result.success) {
      return NextResponse.json(result, { status: 422 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "Invalid request body" } },
      { status: 400 }
    );
  }
}
