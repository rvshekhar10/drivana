import { NextResponse } from "next/server";
import { getAssetBrands } from "@/lib/xrmlite";

export async function GET() {
  const result = await getAssetBrands();

  if (!result.success || !result.data || result.data.length === 0) {
    // Fallback brands derived from static data
    return NextResponse.json({
      success: true,
      data: [
        { id: 1, name: "Nissan", slug: "nissan" },
        { id: 2, name: "Tata", slug: "tata" },
        { id: 3, name: "Maruti", slug: "maruti" },
        { id: 4, name: "Ford", slug: "ford" },
        { id: 5, name: "Honda", slug: "honda" },
        { id: 6, name: "Kia", slug: "kia" },
      ],
      source: "static",
    });
  }

  return NextResponse.json({ ...result, source: "api" });
}
