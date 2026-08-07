import { NextResponse } from "next/server";
import { getTags } from "@/lib/xrmlite";

export async function GET() {
  const result = await getTags();
  return NextResponse.json(result);
}
