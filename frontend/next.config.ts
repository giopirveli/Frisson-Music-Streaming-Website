import { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname, // existing
  reactStrictMode: true,
  output: "export", // ✅ enables static export
  images: {
    unoptimized: true, // ✅ disables Image Optimization API
  },
  // other settings...
};

export default nextConfig;
