"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

interface ScrollTextRevealProps {
  children: React.ReactNode;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
}

export default function ScrollTextReveal({
  children,
  activeColor = "#313131",
  inactiveColor = "#B6AB99",
  className = "",
  start = "top bottom-=40%",
  end = "bottom bottom-=30%",
  scrub = 4,
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // prefers-reduced-motion check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (textRef.current) {
        textRef.current.style.color = activeColor;
      }
      return;
    }

    const split = new SplitType(textRef.current, {
      types: "lines,words",
    });

    const targets = split.lines || split.words || textRef.current;

    const anim = gsap.fromTo(
      targets,
      {
        color: inactiveColor,
      },
      {
        color: activeColor,
        stagger: 0.05,
        ease: "power1.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: start,
          end: end,
          scrub: scrub,
        },
      }
    );

    return () => {
      anim.kill();
      split.revert();
    };
  }, [activeColor, inactiveColor, start, end, scrub]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div
        ref={textRef}
        style={{ color: inactiveColor }}
        className="w-full transition-colors duration-200"
      >
        {children}
      </div>
    </div>
  );
}
