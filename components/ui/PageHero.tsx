import Image from "next/image";
import TextRevealFromY from "@/components/animations/TextRevealFromY";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}

export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#1A1A1A] px-6 pb-28 pt-52 text-center text-white md:px-12 md:pb-36 md:pt-60">
      <div className="absolute inset-0 -z-10 bg-black/50">
        <Image src={image} alt="" fill priority className="object-cover object-bottom opacity-25" sizes="100vw" />
      </div>
      <div className="z-10 mx-auto flex w-full max-w-4xl min-w-0 flex-col items-center gap-6">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#B6AB99]">{eyebrow}</span>
        <h1 className="w-full text-balance font-gallient text-[clamp(2.4rem,11vw,4.5rem)] leading-[1.05] text-white">{title}</h1>
        <div className="my-2 h-px w-24 bg-[#B6AB99]" />
        <TextRevealFromY><p className="max-w-2xl font-bolton text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-xl">{description}</p></TextRevealFromY>
        <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/65 backdrop-blur-sm">Representative imagery</span>
      </div>
    </section>
  );
}
