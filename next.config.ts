import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xrmlite.drivana.co.in",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      // Allow any https image source for flexibility
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  serverExternalPackages: ["@firebase/firestore"],
  env: {
    XRMLITE_API_URL: process.env.XRMLITE_API_URL || "https://xrmlite.drivana.co.in/api/v1",
  },
};

export default nextConfig;
