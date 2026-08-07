import { NextResponse } from "next/server";
import { getCMSRawContent } from "@/lib/xrmlite";

/**
 * JSON Feed (RSS alternative) — proxies from XRMlite CMS.
 * Accessible at /feed.json
 */
export async function GET() {
  const result = await getCMSRawContent("feed.json");

  if (!result.ok) {
    // Return a minimal valid JSON Feed if CMS is unavailable
    return NextResponse.json(
      {
        version: "https://jsonfeed.org/version/1.1",
        title: "DRIVANA Blog",
        home_page_url: "https://www.drivana.co.in",
        feed_url: "https://www.drivana.co.in/feed.json",
        description:
          "Self-drive car rental tips, travel guides, and updates from Patna, Bihar.",
        items: [],
      },
      {
        headers: {
          "Content-Type": "application/feed+json; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      }
    );
  }

  return new NextResponse(result.content, {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
