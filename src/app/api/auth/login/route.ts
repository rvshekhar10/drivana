import { NextRequest, NextResponse } from "next/server";
import { loginCustomer } from "@/lib/xrmlite";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION",
            message: "email and password are required",
          },
        },
        { status: 400 }
      );
    }

    const result = await loginCustomer({ email, password });

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
