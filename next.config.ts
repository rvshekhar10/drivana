import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xrmlite.drivana.co.in",
      },
    ],
  },
  serverExternalPackages: ["@firebase/firestore"],
  // Env vars available server-side (API routes) — NOT exposed to browser
  env: {
    XRMLITE_API_URL: process.env.XRMLITE_API_URL || "https://xrmlite.drivana.co.in/api/v1",
  },
};

export default nextConfig;
