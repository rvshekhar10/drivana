import { NextRequest, NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/xrmlite";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);

  if (!result.success || !result.data) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "Article not found" } },
      { status: 404 }
    );
  }

  return NextResponse.json(result);
}
