import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  outputFileTracingRoot: __dirname,

  sassOptions: {
    includePaths: [path.join(__dirname, "frontend/styles")],
  },

  images: {
    domains: ["frisson-music-app.s3.eu-north-1.amazonaws.com"], // whitelist external host
    unoptimized: true, // disables Next.js image optimization (required for static export)
  },

  // Optional Netlify adapter config if using edge functions:
  experimental: {
    // leave empty or set proper object types if needed
  },
};

export default nextConfig;
