import { NextRequest, NextResponse } from "next/server";
import { getAddresses, createAddress } from "@/lib/xrmlite";

function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}

export async function GET(request: NextRequest) {
  const token = extractToken(request);
  if (!token) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Login required" } },
      { status: 401 }
    );
  }

  const result = await getAddresses(token);
  if (!result.success) {
    return NextResponse.json(result, { status: result.error?.code === "UNAUTHENTICATED" ? 401 : 500 });
  }
  return NextResponse.json(result);
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
    const result = await createAddress(token, body);
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
