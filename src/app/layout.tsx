import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// アプリのベースURLを取得
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const baseUrlWithProtocol = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;

export const metadata: Metadata = {
  title: "推しTag - 推し活を記録・共有・印刷",
  description: "NFCタグと印刷・OGP技術を活用した推し活支援サービス",
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL(baseUrlWithProtocol),
  openGraph: {
    title: "推しTag - 推し活を記録・共有・印刷",
    description: "NFCタグと印刷・OGP技術を活用した推し活支援サービス",
    images: [
      {
        url: "/oshi-tag_ogp.png",
        width: 1200,
        height: 630,
        alt: "推しTag",
      },
    ],
    type: "website",
    siteName: "推しTag",
  },
  twitter: {
    card: "summary_large_image",
    title: "推しTag - 推し活を記録・共有・印刷",
    description: "NFCタグと印刷・OGP技術を活用した推し活支援サービス",
    images: ["/oshi-tag_ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
