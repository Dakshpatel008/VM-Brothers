import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the VM Brothers website and property information.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      introduction="By using this website, you agree to these terms. If you do not agree, please stop using the website."
      sections={[
        {
          title: "Website information",
          paragraphs: [
            "This website provides general information about VM Brothers, its services, and property opportunities. It does not constitute legal, financial, tax, investment, or other professional advice, and an enquiry does not create a binding agreement.",
            "Property prices, offers, specifications, approvals, inventory, possession timelines, and availability may change. You should obtain current project documentation and independently verify material information before booking or purchasing.",
          ],
        },
        {
          title: "Project roles and transactions",
          paragraphs: [
            "VM Brothers may act in a sales, marketing, advisory, or coordination capacity depending on the project. The relevant project documentation and transaction agreement determine the responsibilities of each party.",
            "Any booking, payment, cancellation, refund, construction, or possession term is governed by the applicable written documents agreed with the relevant project party.",
          ],
        },
        {
          title: "Acceptable use and intellectual property",
          paragraphs: [
            "You must not misuse the website, attempt unauthorized access, interfere with its operation, submit unlawful content, or use automated methods that place an unreasonable load on the service.",
            "The website design, text, brand elements, and original materials are protected by applicable intellectual-property laws. Third-party project names and materials remain the property of their respective owners.",
          ],
        },
        {
          title: "Availability and liability",
          paragraphs: [
            "We aim to keep the website useful and accurate but do not guarantee uninterrupted availability or that every item is complete, current, or error-free. To the extent permitted by law, VM Brothers is not liable for indirect or consequential loss resulting from use of this informational website.",
          ],
        },
        {
          title: "Law and contact",
          paragraphs: ["These terms are governed by applicable laws of India. For questions, contact VM Brothers at " + siteContent.contact.phone.value.display + "."],
        },
      ]}
    />
  );
}
