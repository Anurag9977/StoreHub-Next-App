import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "100MB",
    },
  },
  serverExternalPackages: ["node-appwrite"],
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "cloud.appwrite.io",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
