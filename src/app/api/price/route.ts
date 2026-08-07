import { NextRequest, NextResponse } from "next/server";
import { getPriceQuote } from "@/lib/xrmlite";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get("assetId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const couponCode = searchParams.get("couponCode") || undefined;

  if (!assetId || !startDate || !endDate) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION",
          message: "assetId, startDate, and endDate are required",
        },
      },
      { status: 400 }
    );
  }

  const result = await getPriceQuote(
    Number(assetId),
    startDate,
    endDate,
    couponCode
  );

  if (!result.success) {
    return NextResponse.json(result, { status: 422 });
  }

  return NextResponse.json(result);
}
