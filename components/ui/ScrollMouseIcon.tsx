"use client";

import React from "react";

export default function ScrollMouseIcon({
  targetId = "intro-section",
  label = "Scroll to explore",
  className = "",
}: {
  targetId?: string;
  label?: string;
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        aria-label={label}
        className="group flex flex-col items-center gap-2 text-white text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
      >
        <div className="w-5 h-9 rounded-full border border-white/60 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white scroller-anim" />
        </div>
        <div className="relative overflow-hidden pt-1">
          <span className="block text-[10px] tracking-[0.2em] font-medium text-white/90 group-hover:text-white transition-colors duration-300">
            {label}
          </span>
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#EEEBE4] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
        </div>
      </a>
    </div>
  );
}
