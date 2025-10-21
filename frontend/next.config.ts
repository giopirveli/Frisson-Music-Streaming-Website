// next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname, // <-- fix here
  reactStrictMode: true,
  // other settings...
};

export default nextConfig;
