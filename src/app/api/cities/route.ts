import { NextResponse } from "next/server";
import { getCities } from "@/lib/xrmlite";

export async function GET() {
  const result = await getCities();

  if (!result.success || !result.data || result.data.length === 0) {
    // Fallback: single default city
    return NextResponse.json({
      success: true,
      data: [
        { id: 1, name: "Patna", slug: "patna", state: "Bihar", state_code: "BR", country: "India", country_code: "IN" },
      ],
      source: "static",
    });
  }

  return NextResponse.json({ ...result, source: "api" });
}
