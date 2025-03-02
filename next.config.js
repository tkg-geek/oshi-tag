/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bqeehatmvsfqsjncoiud.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  env: {
    // EPSON Connect API設定
    EPSON_HOST: process.env.EPSON_HOST,
    EPSON_CLIENT_ID: process.env.EPSON_CLIENT_ID,
    EPSON_CLIENT_SECRET: process.env.EPSON_CLIENT_SECRET,
    EPSON_DEVICE: process.env.EPSON_DEVICE,
    EPSON_PRINT_MODE: process.env.EPSON_PRINT_MODE,
    EPSON_DEFAULT_MEDIA_SIZE: process.env.EPSON_DEFAULT_MEDIA_SIZE,
    EPSON_DEFAULT_MEDIA_TYPE: process.env.EPSON_DEFAULT_MEDIA_TYPE,
  },
  // ESLintの設定を追加
  eslint: {
    // 本番ビルド時にESLintエラーがあってもビルドを続行する
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
