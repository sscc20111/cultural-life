// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "culture.seoul.go.kr",
      },
      {
        protocol: "https",
        hostname: "www.kopis.or.kr",
      },
      {
        protocol: "http",
        hostname: "www.kopis.or.kr",
      },
    ],
  },
};

export default nextConfig;