import { FAQ } from "@/components/ui/faq-tabs";
import { siteContent } from "@/data/siteContent";

export default function FAQDemo() {
  return (
    <FAQ
      id="faq"
      title="Property Questions, Answered"
      subtitle="Frequently Asked Questions"
      categories={{ general: "General", visits: "Site Visits", pricing: "Pricing" }}
      faqData={{
        general: siteContent.faqs.slice(0, 2),
        visits: [siteContent.faqs[2]],
        pricing: [siteContent.faqs[3]],
      }}
    />
  );
}
