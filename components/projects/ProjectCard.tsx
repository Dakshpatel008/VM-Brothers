import React from "react";
import Image from "next/image";
import CreativeButton from "../ui/CreativeButton";
import type { VmProject } from "@/data/siteContent";

export default function ProjectCard({ project }: { project: VmProject }) {
  return (
    <article className="group isolate relative w-full h-[480px] md:h-[580px] rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.25)] flex flex-col justify-between p-6 md:p-10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 bg-[#222]">
        <Image
          src={project.heroImage}
          alt=""
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
      </div>

      {/* Top Badge */}
      <div className="flex justify-end">
        <span className="inline-block px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-medium bg-black/40 text-white/90 backdrop-blur-sm border border-white/10">
          {project.propertyType}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-gallient text-white leading-tight">
          {project.name}
        </h3>
        <p className="text-xs md:text-sm text-white/75 font-bolton tracking-wide">
          {project.location}
        </p>

        <div className="pt-2 flex items-center justify-between">
          <CreativeButton
            href={`/projects/${project.slug}`}
            variant="outline"
            showIcon={true}
            className="!px-6 !py-2.5"
          >
            View project
          </CreativeButton>
          {project.imageIsRepresentative && (
            <span className="text-[9px] uppercase tracking-[0.16em] text-white/60">Representative imagery</span>
          )}
        </div>
      </div>
    </article>
  );
}
