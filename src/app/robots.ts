import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/cars/",
      },
    ],
    sitemap: "https://www.drivana.co.in/sitemap.xml",
    host: "https://www.drivana.co.in",
  };
}
