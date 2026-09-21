import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import CreativeButton from "@/components/ui/CreativeButton";
import BrandMark from "@/components/ui/BrandMark";
import ScrollTextReveal from "@/components/animations/ScrollTextReveal";
import { siteContent } from "@/data/siteContent";

export default function AboutUsPage() {
  return <><Header theme="solid" /><main className="min-h-screen pt-24">
    <PageHero eyebrow="Surat Real Estate" title="About VM Brothers" description="Property guidance built on clarity, trust, and a practical understanding of Surat's evolving real-estate market." image={siteContent.assets.representative.pageHeroes.about} />
    <section className="mx-auto max-w-5xl px-6 py-24 text-center md:px-12 md:py-32"><ScrollTextReveal className="font-gallient text-2xl leading-relaxed sm:text-3xl md:text-4xl">VM Brothers helps clients discover, evaluate, and move forward with suitable residential and commercial property opportunities across Surat.</ScrollTextReveal><p className="mx-auto mt-8 max-w-3xl font-light leading-relaxed text-[#313131]/75">The company&apos;s approach brings together property discovery, site visits, current market guidance, booking support, documentation coordination, and applicable post-booking assistance—all with transparent communication at the center.</p></section>
    <section className="bg-[#1A1A1A] px-6 py-24 text-white md:px-12"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center"><div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 lg:col-span-5"><BrandMark size="monogram" className="scale-150" /></div><div className="lg:col-span-7"><span className="text-xs uppercase tracking-[0.3em] text-[#B6AB99]">Leadership</span><h2 className="mt-5 font-gallient text-4xl md:text-6xl">{siteContent.company.founder.name}</h2><p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#B6AB99]">{siteContent.company.founder.title}</p><p className="mt-7 max-w-2xl font-light leading-relaxed text-white/75">{siteContent.company.founder.bio} His public leadership message emphasizes helping families make clearer property decisions and building lasting relationships with customers and project partners.</p><div className="mt-9"><CreativeButton href="/contact" variant="outline" showIcon>Talk to Our Team</CreativeButton></div></div></div></section>
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"><div className="mb-12 text-center"><span className="text-xs uppercase tracking-[0.3em] text-[#B6AB99]">What Guides Us</span><h2 className="mt-4 font-gallient text-4xl md:text-5xl">Values in Every Conversation</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{siteContent.values.map((value, i) => <div key={value} className="rounded-2xl border border-[#313131]/10 bg-[#EAE6DF]/50 p-7"><span className="text-xs text-[#B6AB99]">0{i+1}</span><h3 className="mt-4 font-gallient text-2xl">{value}</h3></div>)}</div></section>
  </main><Footer /></>;
}
