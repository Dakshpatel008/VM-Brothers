import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How VM Brothers collects and uses information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const contactLine =
    "For a privacy request, call or WhatsApp " +
    siteContent.contact.phone.value.display +
    ". Our current contact location is " +
    siteContent.contact.address.value +
    ". Please call before visiting.";

  return (
    <LegalPage
      title="Privacy Policy"
      introduction="This policy explains how VM Brothers handles personal information when you use this website or contact us about a property."
      sections={[
        {
          title: "Information we collect",
          paragraphs: [
            "When you submit an enquiry, we may collect your name, phone number, optional email address, property preferences, preferred location, budget range, and message.",
            "Our hosting and security providers may also process basic technical information such as an IP address, browser type, device information, timestamps, and server logs.",
          ],
        },
        {
          title: "How we use information",
          paragraphs: [
            "We use enquiry information to respond to you, understand your requirements, arrange site visits, provide relevant property information, maintain service records, protect the website, and meet applicable legal obligations.",
            "We do not sell personal information. Information may be shared with service providers that support website hosting, communication, or enquiry management, and with project parties when needed to respond to a specific request. We may also disclose information where required by law.",
          ],
        },
        {
          title: "Retention and security",
          paragraphs: [
            "We retain information only for as long as reasonably needed for the purposes described above, legitimate business records, dispute resolution, and legal requirements. We use reasonable safeguards, but no internet transmission or storage method is completely secure.",
          ],
        },
        {
          title: "Your choices",
          paragraphs: [
            "You may ask us to correct or delete information you submitted, or ask us to stop promotional communication, subject to applicable legal and record-keeping requirements.",
          ],
        },
        { title: "Contact us", paragraphs: [contactLine] },
      ]}
    />
  );
}
