import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "@/lib/xrmlite";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection");
  const tag = searchParams.get("tag");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const result = await getArticles({
    collection: collection ? Number(collection) : undefined,
    tag: tag || undefined,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result);
}
