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
    unoptimized: true,
    domains: [
      "bqeehatmvsfqsjncoiud.supabase.co",
      "iasdhtntosavctuuwvgh.supabase.co",
      "supabase.co"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '**',
      }
    ],
  },
};

export default nextConfig;
