"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";

import ProjectCard from "./ProjectCard";
import type { VmProject } from "@/data/siteContent";
import useReducedMotion from "../hooks/useReducedMotion";

export default function ProjectCarousel({ projects }: { projects: VmProject[] }) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-visible">
      {/* Swiper slider */}
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        speed={prefersReducedMotion ? 0 : 500}
        autoplay={
          prefersReducedMotion
            ? false
            : {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        breakpoints={{
          640: {
            slidesPerView: 1.2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
        }}
        className="!overflow-visible py-4"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.slug}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Nav Arrows */}
      <div className="flex items-center justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous Slide"
          className="w-12 h-12 rounded-full border border-[#313131]/30 flex items-center justify-center text-[#313131] hover:bg-[#313131] hover:text-white transition-all duration-300"
        >
          <svg className="w-5 h-5 fill-current rotate-180" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next Slide"
          className="w-12 h-12 rounded-full border border-[#313131]/30 flex items-center justify-center text-[#313131] hover:bg-[#313131] hover:text-white transition-all duration-300"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
