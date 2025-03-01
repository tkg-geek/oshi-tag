import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ビルド時の型チェックをスキップ
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLintのチェックもスキップ
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["bqeehatmvsfqsjncoiud.supabase.co"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
