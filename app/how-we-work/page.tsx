import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import CreativeButton from "@/components/ui/CreativeButton";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "How We Work",
  description: "See how VM Brothers supports property discovery, site visits, and booking coordination in Surat.",
  alternates: { canonical: "/how-we-work" },
};

export default function HowWeWorkPage() {
  return (
    <>
      <Header theme="solid" />
      <main className="min-h-screen">
        <PageHero
          eyebrow="A Clear Process"
          title="How We Work"
          description="A property journey organized around your requirements, relevant options, transparent communication, and practical support."
          image={siteContent.assets.representative.pageHeroes.workflow}
        />
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32">
          <div className="space-y-6">
            {siteContent.workflow.map((step) => (
              <article key={step.id} className="grid gap-5 rounded-2xl border border-[#313131]/10 bg-[#EAE6DF]/50 p-8 md:grid-cols-[100px_1fr] md:p-10">
                <span className="font-gallient text-4xl text-[#B6AB99]">{step.id}</span>
                <div>
                  <h2 className="font-gallient text-3xl">{step.title}</h2>
                  <p className="mt-4 font-light leading-relaxed text-[#313131]/70">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <CreativeButton href="/contact#enquiry" variant="accent" showIcon>Book a Site Visit</CreativeButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
