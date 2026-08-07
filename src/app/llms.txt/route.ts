import { NextResponse } from "next/server";
import { getCMSRawContent } from "@/lib/xrmlite";

/**
 * llms.txt — AI search discoverability file.
 * Proxies from XRMlite CMS or provides a default.
 * Accessible at /llms.txt
 */
export async function GET() {
  const result = await getCMSRawContent("llms.txt");

  if (!result.ok || !result.content.trim()) {
    // Default llms.txt for DRIVANA
    const defaultContent = `# DRIVANA
> Self-drive car rental platform in Patna, Bihar, India.

## About
DRIVANA offers self-drive car rentals starting ₹1,499/day in Patna. Cars include Nissan Magnite, Tata Tiago, Maruti Alto, and Ford Freestyle. Pickup from Bhootnath Road or doorstep delivery within city limits.

## Services
- Self-drive car rental (daily, weekly, monthly)
- Doorstep delivery & pickup
- Outstation trips (Rajgir, Bodh Gaya, Varanasi, Ranchi)
- Wedding & event car rentals

## Contact
- Website: https://www.drivana.co.in
- WhatsApp: +91 70791 38350
- Location: 162 MIG, Bhootnath Road, Patna 800026

## Links
- Fleet: https://www.drivana.co.in/fleet
- Blog: https://www.drivana.co.in/blog
- How It Works: https://www.drivana.co.in/how-it-works
- Contact: https://www.drivana.co.in/contact
`;

    return new NextResponse(defaultContent, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  return new NextResponse(result.content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
