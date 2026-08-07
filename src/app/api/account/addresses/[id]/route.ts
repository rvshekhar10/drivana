import { NextRequest, NextResponse } from "next/server";
import { deleteAddress } from "@/lib/xrmlite";

function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = extractToken(request);
  if (!token) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Login required" } },
      { status: 401 }
    );
  }

  const { id } = await params;
  const result = await deleteAddress(token, Number(id));

  if (!result.success) {
    return NextResponse.json(result, { status: 422 });
  }
  return NextResponse.json(result);
}
