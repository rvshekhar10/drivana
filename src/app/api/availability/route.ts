import { NextRequest, NextResponse } from "next/server";
import { checkAvailability } from "@/lib/xrmlite";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get("assetId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

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

  const result = await checkAvailability(
    Number(assetId),
    startDate,
    endDate
  );

  if (!result.success) {
    return NextResponse.json(result, { status: 422 });
  }

  return NextResponse.json(result);
}
