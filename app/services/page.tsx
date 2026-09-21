import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import CreativeButton from "@/components/ui/CreativeButton";
import { siteContent } from "@/data/siteContent";

export default function ServicesPage() {
  return <><Header theme="solid" /><main className="min-h-screen pt-24"><PageHero eyebrow="Property Support" title="Our Services" description="Practical support for residential and commercial property decisions, from the first conversation through the applicable transaction steps." image={siteContent.assets.representative.pageHeroes.services} />
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"><div className="mx-auto mb-16 max-w-3xl text-center"><h2 className="font-gallient text-4xl md:text-5xl">Local Guidance. Clear Next Steps.</h2><p className="mt-6 font-light leading-relaxed text-[#313131]/70">Whether you are looking for a home, evaluating a commercial opportunity, or arranging a site visit, VM Brothers helps keep the process focused and understandable.</p></div><div className="grid gap-6 md:grid-cols-2">{siteContent.services.map((service, i) => <article key={service.id} className="rounded-2xl border border-[#313131]/10 bg-[#EAE6DF]/55 p-8 md:p-10"><span className="text-xs tracking-[0.2em] text-[#B6AB99]">0{i+1}</span><h3 className="mt-5 font-gallient text-3xl">{service.title}</h3><p className="mt-5 font-light leading-relaxed text-[#313131]/70">{service.description}</p></article>)}</div><div className="mt-14 text-center"><CreativeButton href="/contact" variant="accent" showIcon>Discuss Your Requirements</CreativeButton></div></section>
  </main><Footer /></>;
}
