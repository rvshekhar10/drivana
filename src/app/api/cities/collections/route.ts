import { NextResponse } from "next/server";
import { getCityCollections } from "@/lib/xrmlite";

export async function GET() {
  const result = await getCityCollections();
  return NextResponse.json(result.success ? result : { success: true, data: [] });
}
