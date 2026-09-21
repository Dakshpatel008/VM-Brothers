import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore VM Brothers property discovery, site-visit, transaction, and documentation support in Surat.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
