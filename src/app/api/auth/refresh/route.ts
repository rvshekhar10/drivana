import { NextRequest, NextResponse } from "next/server";
import { refreshToken } from "@/lib/xrmlite";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken: token } = body;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION",
            message: "refreshToken is required",
          },
        },
        { status: 400 }
      );
    }

    const result = await refreshToken(token);

    if (!result.success) {
      return NextResponse.json(result, { status: 401 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { code: "INVALID_BODY", message: "Invalid request body" },
      },
      { status: 400 }
    );
  }
}
