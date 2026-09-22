import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeIntro from "@/components/ui/HomeIntro";
import CreativeButton from "@/components/ui/CreativeButton";
import ScrollMouseIcon from "@/components/ui/ScrollMouseIcon";
import ScrollTextReveal from "@/components/animations/ScrollTextReveal";
import TextRevealFromY from "@/components/animations/TextRevealFromY";
import StackingCards from "@/components/animations/StackingCards";
import DeliberateApproach from "@/components/ui/DeliberateApproach";
import HorizontalServices from "@/components/ui/HorizontalServices";
import FAQDemo from "@/components/ui/demo";
import { publishedProjects, siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <HomeIntro><Header /><main className="min-h-screen">
      <section className="relative isolate flex h-[100svh] min-h-[640px] w-full flex-col items-center justify-between overflow-hidden bg-[#f5f5f5] p-5 text-white sm:p-6 md:min-h-[700px] md:p-12">
        <div data-intro-media="" className="absolute inset-0 -z-10 bg-black"><video src={siteContent.assets.heroVideo.path} autoPlay muted loop playsInline className="h-full w-full object-cover opacity-90" /><div className="absolute inset-0 bg-black/30" /><div data-intro-shade="" className="absolute inset-0 bg-black/[0.285714] backdrop-blur-[1px]" /></div>
        <div className="h-20" />
        <div data-intro-content="" className="z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-7 text-center md:gap-8">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-white/90 sm:text-xs md:text-sm"><span>Residential</span><span className="h-1.5 w-1.5 rounded-full bg-[#B6AB99]" /><span>Commercial</span><span className="h-1.5 w-1.5 rounded-full bg-[#B6AB99]" /><span>Surat</span></div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">{siteContent.company.tagline}</p>
          <h1 className="font-gallient text-[clamp(3.2rem,12vw,7rem)] leading-[0.9] text-white">VM Brothers</h1>
          <div className="h-px w-40 bg-white/40" />
          <p className="max-w-xl text-sm font-light leading-relaxed text-white/85 sm:text-lg">Find the right property with local market guidance, transparent communication, and support from discovery to booking.</p>
          <div className="flex flex-wrap justify-center gap-4"><CreativeButton href="/projects" variant="outline" showIcon>Explore Projects</CreativeButton><CreativeButton href="/contact#enquiry" variant="outline">Book a Site Visit</CreativeButton></div>
        </div><div data-intro-scroll=""><ScrollMouseIcon targetId="intro-section" label="Scroll to explore" /></div>
      </section>

      <section id="intro-section" className="mx-auto max-w-6xl px-6 py-24 text-center md:px-12 md:py-36">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#B6AB99]">About VM Brothers</span>
        <ScrollTextReveal className="mx-auto mt-8 max-w-5xl text-center font-gallient text-2xl leading-[1.35] tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">Clear property choices begin with local understanding, honest communication, and guidance shaped around what each client actually needs.</ScrollTextReveal>
        <TextRevealFromY><p className="mx-auto mt-8 max-w-3xl text-base font-light leading-relaxed text-[#313131]/75">{siteContent.company.positioning} We assist with property discovery, site visits, market context, booking, documentation coordination, and applicable post-booking support.</p></TextRevealFromY>
      </section>

      <StackingCards projects={publishedProjects} />

      <HorizontalServices />

      <DeliberateApproach title="A Clearer Way to Navigate Real Estate" description="From understanding your requirements and shortlisting suitable properties to arranging site visits and supporting the booking process, VM Brothers keeps each step focused, practical, and transparent." ctaText="How We Work" ctaHref="/how-we-work" />

      <section className="bg-[#1A1A1A] px-6 py-24 text-white md:px-12"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6"><span className="text-xs uppercase tracking-[0.3em] text-[#B6AB99]">Founder & CEO</span><h2 className="mt-5 font-gallient text-4xl leading-tight md:text-6xl">Guidance grounded in trust.</h2><p className="mt-7 font-light leading-relaxed text-white/75">{siteContent.company.founder.bio}</p><p className="mt-6 font-gallient text-xl">{siteContent.company.founder.name}</p><p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#B6AB99]">{siteContent.company.founder.title}</p><div className="mt-9"><CreativeButton href="/about-us" variant="outline" showIcon>About VM Brothers</CreativeButton></div></div>
        <div className="relative h-[430px] overflow-hidden rounded-2xl lg:col-span-6 lg:h-[580px]"><Image src={siteContent.assets.representative.founder} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /><span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-white/70">Representative imagery</span></div>
      </div></section>

      <section className="bg-[#EAE6DF]/55 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9B8D78]">Local Market Focus</span>
          <h2 className="mt-4 font-gallient text-4xl md:text-5xl">Serving Surat and Its Growth Corridors</h2>
          <p className="mx-auto mt-6 max-w-3xl font-light leading-relaxed text-[#313131]/70">Explore current property opportunities across Surat and active corridors represented in the VM Brothers portfolio.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {siteContent.serviceAreas.map((area) => <span key={area} className="rounded-full border border-[#313131]/15 bg-[#F5F5F5] px-5 py-2 text-xs uppercase tracking-[0.16em]">{area}</span>)}
          </div>
        </div>
      </section>

      <FAQDemo />
    </main><Footer /></HomeIntro>
  );
}
