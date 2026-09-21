"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CreativeButton from "./CreativeButton";
import BrandMark from "./BrandMark";
import TextRevealFromY from "../animations/TextRevealFromY";
import useReducedMotion from "../hooks/useReducedMotion";
import { siteContent } from "@/data/siteContent";

const backgroundImages = siteContent.assets.representative.approach;

export default function DeliberateApproach({
  title = "Property Guidance Built Around You",
  description = `${siteContent.company.name} helps clients discover and evaluate suitable residential and commercial property opportunities with local market context, transparent communication, and dependable support from site visit to booking.`,
  ctaText = "Explore Projects",
  ctaHref = "/projects",
}: {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative isolate w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden py-24 my-16">
      {/* Slideshow background */}
      {backgroundImages.map((src, idx) => (
        <div
          key={src}
          aria-hidden={currentIdx !== idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out -z-10 ${
            currentIdx === idx ? "opacity-100 scale-105" : "opacity-0 scale-100"
          } transition-transform duration-7000`}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-10 text-white z-10">
        {/* Title & Divider */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-gallient font-normal tracking-wide text-white">
            {title}
          </h2>
          <div className="w-24 h-[1px] bg-[#B6AB99]" />
        </div>

        {/* Monogram Icon */}
        <div className="my-2 opacity-90">
          <BrandMark size="monogram" />
        </div>

        {/* Description */}
        <div className="max-w-3xl">
          <TextRevealFromY>
            <p className="text-base md:text-lg lg:text-xl font-bolton font-light leading-relaxed text-white/90">
              {description}
            </p>
          </TextRevealFromY>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <CreativeButton
            href={ctaHref}
            variant="outline"
            showIcon={true}
            className="!px-8 !py-3.5"
          >
            {ctaText}
          </CreativeButton>
        </div>
      </div>
    </section>
  );
}
