import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { siteContent } from "@/data/siteContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VM Brothers | Surat Real Estate & Property Guidance",
    template: "%s | VM Brothers",
  },
  description: siteContent.company.positioning,
  keywords: [
    "VM Brothers",
    "Surat real estate",
    "property in Surat",
    "Surat property consultant",
    "homes in Surat",
    "commercial property Surat",
    "Masma Orma property",
  ],
  openGraph: {
    title: "VM Brothers | Surat Real Estate & Property Guidance",
    description: siteContent.company.positioning,
    url: siteUrl,
    siteName: siteContent.company.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "VM Brothers | Surat Real Estate",
    description: siteContent.company.positioning,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/wp-content/uploads/2026/02/Gallient.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/wp-content/uploads/2026/02/F37BoltonArabic-VF.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning className="bg-[#F5F5F5] text-[#313131] antialiased selection:bg-[#B6AB99] selection:text-white">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
