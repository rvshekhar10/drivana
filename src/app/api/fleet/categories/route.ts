import { NextResponse } from "next/server";
import { getAssetCategories } from "@/lib/xrmlite";

export async function GET() {
  const result = await getAssetCategories();

  if (!result.success || !result.data || result.data.length === 0) {
    // Fallback categories derived from static data
    return NextResponse.json({
      success: true,
      data: [
        { id: 1, name: "SUV", slug: "suv" },
        { id: 2, name: "Hatchback", slug: "hatchback" },
        { id: 3, name: "Crossover", slug: "crossover" },
        { id: 4, name: "Sedan", slug: "sedan" },
      ],
      source: "static",
    });
  }

  return NextResponse.json({ ...result, source: "api" });
}
