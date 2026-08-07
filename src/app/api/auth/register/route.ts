import { NextRequest, NextResponse } from "next/server";
import { registerCustomer } from "@/lib/xrmlite";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, phone } = body;

    if (!email || !password || !firstName) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION",
            message: "email, password, and firstName are required",
          },
        },
        { status: 400 }
      );
    }

    const result = await registerCustomer({
      email,
      password,
      firstName,
      lastName,
      phone,
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 422 });
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
