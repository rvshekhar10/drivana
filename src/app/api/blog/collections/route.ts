import { NextResponse } from "next/server";
import { getCollections } from "@/lib/xrmlite";

export async function GET() {
  const result = await getCollections();
  return NextResponse.json(result);
}
