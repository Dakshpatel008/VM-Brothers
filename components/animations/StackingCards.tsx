"use client";

// Stacking interaction inspired by Olivier Larose: https://www.youtube.com/@olivierlarose1
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import type { VmProject } from "@/data/siteContent";

const cardColors = ["#DED8CF", "#CEC3B3", "#B6AB99", "#292826"];

export default function StackingCards({ projects }: { projects: readonly VmProject[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative bg-[#1A1A1A] pb-24 text-white">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-24 md:px-12 md:pt-32">
        <span className="text-xs uppercase tracking-[0.3em] text-[#B6AB99]">Current Portfolio</span>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl font-gallient text-4xl text-white md:text-6xl">Properties that stay in perspective.</h2>
          <Link href="/projects" className="w-fit border-b border-white/35 pb-1 text-xs uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white">
            View all projects
          </Link>
        </div>
      </div>

      <div ref={container} className="relative">
        {projects.map((project, index) => (
          <StackingCard
            key={project.slug}
            project={project}
            index={index}
            progress={scrollYProgress}
            range={[index * (1 / projects.length), 1]}
            targetScale={1 - (projects.length - index) * 0.05}
            color={cardColors[index % cardColors.length]}
            dark={index % cardColors.length === cardColors.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function StackingCard({
  project,
  index,
  progress,
  range,
  targetScale,
  color,
  dark,
}: {
  project: VmProject;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  color: string;
  dark: boolean;
}) {
  const card = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: card,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(progress, range, [1, targetScale]);
  const lift = useTransform(progress, range, [0, -48]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const cardTransform = useMotionTemplate`translate3d(0, ${lift}px, 0) scale(${scale})`;
  const imageTransform = useMotionTemplate`translate3d(0, 0, 0) scale(${imageScale})`;

  return (
    <div
      ref={card}
      style={{ zIndex: index + 1 }}
      className={reduceMotion ? "px-4 py-4 md:px-12" : "sticky top-0 flex h-[100svh] items-center justify-center px-4"}
    >
      <motion.article
        style={{
          backgroundColor: color,
          top: `calc(-5svh + ${index * 25}px)`,
          transform: reduceMotion ? "none" : cardTransform,
        }}
        className={`relative flex h-[78svh] min-h-[500px] w-full max-w-6xl origin-top flex-col overflow-hidden rounded-2xl p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)] will-change-transform md:p-10 ${dark ? "text-white" : "text-[#242321]"}`}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className={`text-[10px] uppercase tracking-[0.22em] ${dark ? "text-white/55" : "text-[#313131]/55"}`}>Project 0{index + 1}</span>
            <h3 className="mt-2 font-gallient text-3xl leading-tight md:text-5xl">{project.name}</h3>
          </div>
          <span className={`hidden rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.18em] sm:inline-block ${dark ? "border-white/20 text-white/65" : "border-[#313131]/15 text-[#313131]/60"}`}>
            {project.propertyType}
          </span>
        </div>

        <div className="mt-6 grid min-h-0 flex-1 gap-6 lg:grid-cols-[0.85fr_1.4fr] lg:gap-10">
          <div className="flex flex-col justify-between">
            <div>
              <p className={`text-xs uppercase tracking-[0.18em] ${dark ? "text-white/60" : "text-[#313131]/60"}`}>{project.location}</p>
              <p className={`mt-4 text-sm font-light leading-relaxed md:text-base ${dark ? "text-white/75" : "text-[#313131]/70"}`}>{project.summary}</p>
            </div>
            <span className={`mt-5 w-fit border-b pb-1 text-xs uppercase tracking-[0.18em] ${dark ? "border-white/35 text-white" : "border-[#313131]/35 text-[#313131]"}`}>
              View project
            </span>
          </div>

          <div className="relative min-h-[180px] overflow-hidden rounded-xl lg:min-h-[230px]">
            <motion.div style={{ transform: reduceMotion ? "none" : imageTransform }} className="absolute inset-0 will-change-transform">
              <Image src={project.heroImage} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
            </motion.div>
            {project.imageIsRepresentative && (
              <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-[8px] uppercase tracking-[0.16em] text-white/70">Representative imagery</span>
            )}
          </div>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.name}`}
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-offset-[-4px]"
        />
      </motion.article>
    </div>
  );
}
