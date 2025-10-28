import { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname, // existing
  reactStrictMode: true,
  output: "export", // ✅ enables static export
  images: {
    unoptimized: true, // ✅ disables Image Optimization API
  },
  images: {
    domains: ["frisson-music-app.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
