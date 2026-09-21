import React from "react";
import Link from "next/link";
import BrandMark from "../ui/BrandMark";
import SocialIcons from "../ui/SocialIcons";
import { publishedProjects, siteContent } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Logo */}
        <div className="flex justify-center mb-12">
          <Link
            href="/"
            aria-label={`${siteContent.company.name} - home`}
            className="transition-transform hover:scale-105"
          >
            <BrandMark size="footer" />
          </Link>
        </div>

        {/* Tagline Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bolton font-normal leading-relaxed text-white">
            Helping you find the right property with{" "}
            <span className="text-[#B6AB99]">
              clarity, local insight, and dependable support.
            </span>
          </h2>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/15 mb-14" />

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">
          {/* Col 1: Navigation */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-5 text-[#EEEBE4]">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              {siteContent.navigation.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Legal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-5 text-[#EEEBE4]">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white transition-colors">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/accessibility-statement" className="hover:text-white transition-colors">
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Last Projects */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-5 text-[#EEEBE4]">
              Last Projects
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              {publishedProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-5 text-[#EEEBE4]">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-white/70 mb-5">
              <p>
                <a
                  href={siteContent.contact.phone.value.href}
                  className="hover:text-white transition-colors"
                >
                  {siteContent.contact.phone.value.display}
                </a>
              </p>
              <p className="leading-relaxed">
                {siteContent.contact.address.value}
              </p>
              <p className="text-xs text-white/50">
                Please call before visiting.
              </p>
            </div>
            <SocialIcons color="light" />
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} VM Brothers. All rights reserved.</p>
          <p>Surat, Gujarat</p>
        </div>
      </div>
    </footer>
  );
}
