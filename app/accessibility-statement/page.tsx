import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "VM Brothers commitment to an accessible and usable website experience.",
  alternates: { canonical: "/accessibility-statement" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      introduction="VM Brothers is committed to making this website usable by as many people as reasonably possible."
      sections={[
        {
          title: "Our approach",
          paragraphs: [
            "We aim to provide clear structure, readable contrast, keyboard-accessible controls, meaningful labels, responsive layouts, and reduced-motion support where animation is not essential.",
            "Accessibility is an ongoing effort. Content, browsers, devices, and assistive technologies vary, so some barriers may still occur.",
          ],
        },
        {
          title: "Feedback and assistance",
          paragraphs: [
            "If you experience difficulty using this website or need property information in another practical format, call or WhatsApp " +
              siteContent.contact.phone.value.display +
              ". Please describe the page or feature involved so we can assist you.",
          ],
        },
      ]}
    />
  );
}
