import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about VM Brothers, its leadership, and its client-first property guidance in Surat.",
  alternates: { canonical: "/about-us" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
