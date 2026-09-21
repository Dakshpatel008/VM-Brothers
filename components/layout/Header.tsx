"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CreativeButton from "../ui/CreativeButton";
import BrandMark from "../ui/BrandMark";
import SocialIcons from "../ui/SocialIcons";
import { siteContent } from "@/data/siteContent";

const navLinks = siteContent.navigation;

export default function Header({
  theme = "transparent",
}: {
  theme?: "transparent" | "solid" | "dark";
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#1a1a1a]/85 backdrop-blur-md py-4 border-b border-white/10 shadow-lg"
            : theme === "solid" || theme === "dark"
            ? "bg-[#1a1a1a] py-6"
            : "bg-gradient-to-b from-black/60 to-transparent py-6"
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 hover:text-white transition-colors duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B6AB99] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Center: Logo */}
          <Link
            href="/"
            aria-label={`${siteContent.company.name} - home`}
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center transition-transform duration-300 hover:scale-105"
          >
            <BrandMark size="header" />
          </Link>

          {/* Right: Contact Button & Social (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            <CreativeButton href="/contact#enquiry" variant="outline" className="!px-6 !py-2.5">
              Contact Us
            </CreativeButton>
            <SocialIcons color="light" />
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="absolute right-6 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center gap-1.5 text-white lg:hidden md:right-12"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span
              className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
        className={`fixed inset-0 bg-[#1a1a1a] z-40 lg:hidden flex flex-col justify-between px-8 py-24 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-6"
        }`}
      >
        <div className="flex flex-col gap-6 pt-12">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-gallient text-white hover:text-[#B6AB99] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
          <CreativeButton
            href="/contact#enquiry"
            variant="outline"
            className="w-full text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </CreativeButton>
          <div className="flex justify-between items-center text-xs text-white/60">
            <a
              href={siteContent.contact.phone.value.href}
              className="transition-colors hover:text-white"
            >
              {siteContent.contact.phone.value.display}
            </a>
            <SocialIcons color="light" />
          </div>
        </div>
      </div>
    </>
  );
}
