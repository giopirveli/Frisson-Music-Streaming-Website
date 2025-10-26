import { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname, // existing
  reactStrictMode: true,
  output: "export", // ✅ enables static export
  // other settings...
};

export default nextConfig;
