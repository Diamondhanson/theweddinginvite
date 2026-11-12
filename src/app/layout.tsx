import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import { weddingConfig } from "@/data/wedding-config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

// Absolute base so share-preview image URLs resolve. Set NEXT_PUBLIC_SITE_URL to your real domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: weddingConfig.siteTitle,
  description: weddingConfig.siteDescription,
  openGraph: {
    title: weddingConfig.siteTitle,
    description: weddingConfig.siteDescription,
    type: "website",
    siteName: "Diamond & Gold 2027",
  },
  twitter: {
    card: "summary_large_image",
    title: weddingConfig.siteTitle,
    description: weddingConfig.siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#3c2821",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${pinyon.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
