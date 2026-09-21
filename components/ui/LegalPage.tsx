import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export default function LegalPage({
  title,
  introduction,
  sections,
}: {
  title: string;
  introduction: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Header theme="solid" />
      <main className="min-h-screen px-6 pb-24 pt-40 md:px-12 md:pb-32">
        <article className="mx-auto max-w-4xl">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B6AB99]">VM Brothers</span>
          <h1 className="mt-5 font-gallient text-5xl leading-tight md:text-7xl">{title}</h1>
          <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-[#313131]/70">{introduction}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#313131]/45">Effective 10 September 2026</p>

          <div className="mt-16 divide-y divide-[#313131]/15 border-y border-[#313131]/15">
            {sections.map((section) => (
              <section key={section.title} className="py-9">
                <h2 className="font-gallient text-3xl">{section.title}</h2>
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="font-light leading-relaxed text-[#313131]/70">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
