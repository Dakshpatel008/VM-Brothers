import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Information about cookies and similar technologies on the VM Brothers website.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      introduction="This policy describes how cookies and similar browser technologies may be used on the VM Brothers website."
      sections={[
        {
          title: "What cookies are",
          paragraphs: [
            "Cookies are small text files stored by a browser. Similar technologies include local storage and other identifiers used to remember choices, maintain security, or understand technical performance.",
          ],
        },
        {
          title: "How this website uses them",
          paragraphs: [
            "The website may use strictly necessary technologies required for core functions, security, preferences, and reliable delivery. At present, we do not intentionally use advertising cookies or publish third-party analytics tracking through this website.",
            "If optional analytics or marketing technologies are introduced, this policy and any required consent controls should be updated before they are enabled.",
          ],
        },
        {
          title: "Managing cookies",
          paragraphs: [
            "Most browsers let you view, block, or delete cookies through their settings. Blocking necessary technologies may affect how some website features work.",
          ],
        },
        {
          title: "Questions",
          paragraphs: ["For questions about this policy, contact VM Brothers at " + siteContent.contact.phone.value.display + "."],
        },
      ]}
    />
  );
}
