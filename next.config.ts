import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    tsconfigPath: "./tsconfig.build.json",
  },
};

export default nextConfig;
