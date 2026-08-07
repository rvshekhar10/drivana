import { NextRequest, NextResponse } from "next/server";
import { changePassword } from "@/lib/xrmlite";

function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}

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
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "currentPassword and newPassword are required" } },
        { status: 400 }
      );
    }

    const result = await changePassword(token, { currentPassword, newPassword });
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
