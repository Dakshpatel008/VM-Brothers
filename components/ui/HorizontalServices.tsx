"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";
import { siteContent } from "@/data/siteContent";
import styles from "./HorizontalServices.module.css";

const images: Record<string, string> = {
  residential: "/Residential properties.jpg",
  commercial: "/commericial properties.jpg",
  "buy-sell-rent": "/commericial properties.jpg",
  "site-visits": "/Residential properties.jpg",
  "market-guidance": "/Market & Pricing Guidance.jpg",
  booking: "/Booking and Documentattion.jpg",
};

export default function HorizontalServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const viewport = viewportRef.current!;
    const track = trackRef.current!;
    const media = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-height: 600px)");
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      section.removeAttribute("data-pinned");
      section.style.removeProperty("height");
      if (!media.matches) return;

      section.dataset.pinned = "true";
      const distance = track.scrollWidth - viewport.clientWidth;
      section.style.height = `${viewport.clientHeight + distance}px`;
      const animation = animate(track, {
        transform: ["translateX(0px)", `translateX(-${distance}px)`],
      }, { ease: "linear" });
      const stop = scroll(animation, { target: section, offset: ["start start", "end end"] });
      cleanup = () => {
        stop();
        animation.cancel();
        track.style.removeProperty("transform");
      };
    };

    const observer = new ResizeObserver(setup);
    observer.observe(viewport);
    media.addEventListener("change", setup);
    setup();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", setup);
      cleanup();
      section.removeAttribute("data-pinned");
      section.style.removeProperty("height");
    };
  }, []);

  return (
    <section ref={sectionRef} id="home-services" aria-labelledby="services-heading" className={styles.section}>
      <div ref={viewportRef} className={styles.viewport}>
        <div className={styles.heading}>
          <span>Our Services</span>
          <h2 id="services-heading">Support for Every Property Journey</h2>
        </div>
        <ul ref={trackRef} className={styles.track}>
          {siteContent.services.slice(0, 6).map((service, index) => (
            <li key={service.id} className={styles.slide}>
              <div className={styles.copy}>
                <span className={styles.number}>0{index + 1} <span>/ 06</span></span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className={styles.image}>
                <Image src={images[service.id]} alt="" fill sizes="(max-width: 767px) 90vw, 55vw" className="object-cover" />
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.hint} aria-hidden="true">Scroll to explore <span>⟶</span></p>
      </div>
    </section>
  );
}
