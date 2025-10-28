import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "frontend/styles")],
  },
  outputFileTracingRoot: __dirname,
  reactStrictMode: true,
  output: "export",
  images: {
    domains: ["frisson-music-app.s3.eu-north-1.amazonaws.com"], // whitelist external host
    unoptimized: true, // disables Next.js Image Optimization
  },
};

export default nextConfig;
