import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Skip type checking during build (handled by CI)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
