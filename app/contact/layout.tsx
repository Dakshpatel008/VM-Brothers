import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact VM Brothers about property options, enquiries, and site visits in Surat.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
