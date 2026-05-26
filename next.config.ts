import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  serverExternalPackages: ["@firebase/firestore"],
};

export default nextConfig;
