"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

interface TextRevealFromYProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function TextRevealFromY({
  children,
  className = "",
  delay = 0,
  duration = 1.4,
}: TextRevealFromYProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const split = new SplitType(textRef.current, {
      types: "lines",
      lineClass: "line-inner",
    });

    if (split.lines) {
      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.className = "overflow-hidden block";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      const anim = gsap.from(split.lines, {
        y: "100%",
        duration: duration,
        stagger: 0.02,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      return () => {
        anim.kill();
        split.revert();
      };
    }
  }, [delay, duration]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
