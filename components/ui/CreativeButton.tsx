"use client";

import React from "react";
import Link from "next/link";

interface CreativeButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "accent" | "dark" | "white" | "outline";
  showIcon?: boolean;
  className?: string;
}

export default function CreativeButton({
  href,
  onClick,
  children,
  variant = "accent",
  showIcon = false,
  className = "",
}: CreativeButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 px-7 py-3 text-xs tracking-widest uppercase font-medium rounded-full overflow-hidden transition-all duration-300 z-10 group";

  let styleClasses = "border border-[#313131] text-[#313131] hover:text-white";
  let afterBg = "after:bg-[#B6AB99]";

  if (variant === "dark") {
    styleClasses = "bg-[#313131] border border-[#313131] text-white hover:text-white";
    afterBg = "after:bg-[#B6AB99]";
  } else if (variant === "white") {
    styleClasses = "border border-white/40 text-white hover:text-[#313131]";
    afterBg = "after:bg-white";
  } else if (variant === "outline") {
    styleClasses = "border border-white/60 text-white hover:text-white hover:border-[#B6AB99]";
    afterBg = "after:bg-[#B6AB99]";
  }

  const wipeEffect =
    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0 after:transition-all after:duration-300 after:ease-out group-hover:after:h-full after:-z-10";

  const content = (
    <>
      {showIcon && (
        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block flex-shrink-0 transition-transform duration-300 group-hover:scale-125" />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${baseClasses} ${styleClasses} ${afterBg} ${wipeEffect} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${styleClasses} ${afterBg} ${wipeEffect} ${className}`}
    >
      {content}
    </button>
  );
}
