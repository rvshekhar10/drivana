import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/my-bookings"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/cars/", "/blog/"],
      },
    ],
    sitemap: "https://www.drivana.co.in/sitemap.xml",
    host: "https://www.drivana.co.in",
  };
}
