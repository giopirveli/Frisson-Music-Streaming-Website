import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "frontend/styles")],
  },
  images: {
    domains: ["frisson-music-app.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
