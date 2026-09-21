"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { siteContent } from "@/data/siteContent";

export default function HomeIntro({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState("loading");

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const title = titleRef.current!;
    const media = root.querySelector<HTMLElement>("[data-intro-media]")!;
    const video = media.querySelector("video")!;
    const shade = media.querySelector<HTMLElement>("[data-intro-shade]")!;
    const content = root.querySelector<HTMLElement>("[data-intro-content]")!;
    const header = root.querySelector("header")!;
    const scroll = root.querySelector<HTMLElement>("[data-intro-scroll]")!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeline: gsap.core.Timeline | undefined;
    const letterAnimations: Animation[] = [];
    let cancelled = false;
    let finished = false;
    let started = false;
    let fontsReady = false;
    let readinessTimer: number | undefined = undefined;
    const previousOverflow = document.body.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    let locked = false;

    const blockScroll = (event: Event) => {
      if (!locked) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    const unlock = () => {
      if (!locked) return;
      locked = false;
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.scrollbarGutter = previousGutter;
    };
    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      timeline?.kill();
      letterAnimations.forEach((animation) => animation.cancel());
      window.clearTimeout(readinessTimer);
      gsap.set([media, shade, video, header, scroll, ...content.children], { clearProps: "all" });
      unlock();
      setPhase("complete");
    };

    const run = () => {
      if (cancelled || finished || started) return;
      started = true;
      window.clearTimeout(readinessTimer);
      const bounds = media.getBoundingClientRect();
      const titleBounds = title.getBoundingClientRect();
      const gap = title.querySelector<HTMLElement>("[data-intro-gap]")!.getBoundingClientRect();
      const height = titleBounds.height;
      const width = height * 16 / 9;
      const center = gap.left + gap.width / 2 - bounds.left;
      const top = titleBounds.top - bounds.top;
      const bottom = Math.max(0, bounds.height - top - height);
      const closed = `inset(${top}px ${bounds.width - center}px ${bottom}px ${center}px)`;
      const open = `inset(${top}px ${Math.max(0, bounds.width - center - width / 2)}px ${bottom}px ${Math.max(0, center - width / 2)}px)`;
      gsap.set(media, { clipPath: closed });
      gsap.set(shade, { opacity: 0 });
      gsap.set(video, { opacity: 1 });
      gsap.set([header, scroll], { opacity: 0 });
      gsap.set(content.children, { opacity: 0, transform: "translateY(8px)" });

      // Native transform animations keep the opening smooth during page startup.
      // Their completion starts the remaining sequence, so a busy JS thread
      // cannot advance the video reveal ahead of the lettering.
      timeline = gsap.timeline({ paused: true, onComplete: finish });
      title.querySelectorAll("[data-intro-word]").forEach((word) => {
        Array.from(word.children).forEach((letter, index) => {
          letterAnimations.push(letter.animate(
            [{ transform: "translate3d(0, 160%, 0)" }, { transform: "translate3d(0, 0, 0)" }],
            { duration: 500, delay: index * 40, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "both" },
          ));
        });
      });
      Promise.all(letterAnimations.map((animation) => animation.finished)).then(() => {
        if (!cancelled && !finished) timeline?.play();
      }).catch(() => { /* Cancellation is expected on resize or navigation. */ });
      timeline.addLabel("small", 0.4)
        .to(media, { clipPath: open, duration: 0.9, ease: "power4.inOut" }, "small");
      title.querySelectorAll("[data-intro-word]").forEach((word, index) => {
        timeline!.to(word, { x: (index === 0 ? -1 : 1) * (width / 2 + 25), duration: 0.9, ease: "power4.inOut" }, "small");
      });
      timeline.addLabel("expand", "+=0.2")
        .to(media, { clipPath: "inset(0px 0px 0px 0px)", duration: 0.9, ease: "power3.inOut" }, "expand")
        .to(title, { opacity: 0, duration: 0.3, ease: "power2.out" }, "expand+=0.2")
        .to(shade, { opacity: 1, duration: 0.3, ease: "power2.out" }, "expand+=0.6")
        .to(video, { opacity: 0.9, duration: 0.3, ease: "power2.out" }, "expand+=0.6")
        .call(() => { unlock(); setPhase("revealing"); }, [], "expand+=0.6")
        .to(content.children, { opacity: 1, transform: "translateY(0px)", duration: 0.3, stagger: 0.05, ease: "power3.out" }, "expand+=0.6")
        .to(header, { opacity: 1, duration: 0.3, ease: "power3.out" }, "expand+=0.7")
        .to(scroll, { opacity: 1, duration: 0.3, ease: "power3.out" }, "expand+=0.9");
    };
    const tryRun = () => {
      if (fontsReady && video.readyState >= 2) run();
    };
    const onMotionChange = () => { if (motion.matches) finish(); };

    if (motion.matches) {
      finish();
      return;
    }
    locked = true;
    document.documentElement.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", blockScroll, { capture: true, passive: false });
    window.addEventListener("touchmove", blockScroll, { capture: true, passive: false });
    window.addEventListener("resize", finish);
    motion.addEventListener("change", onMotionChange);
    video.addEventListener("loadeddata", tryRun);
    video.addEventListener("error", finish);
    readinessTimer = window.setTimeout(run, 3000);
    document.fonts.ready.then(() => { fontsReady = true; tryRun(); });
    video.play().catch(finish);

    return () => {
      cancelled = true;
      timeline?.kill();
      letterAnimations.forEach((animation) => animation.cancel());
      window.clearTimeout(readinessTimer);
      unlock();
      window.removeEventListener("wheel", blockScroll, true);
      window.removeEventListener("touchmove", blockScroll, true);
      window.removeEventListener("resize", finish);
      motion.removeEventListener("change", onMotionChange);
      video.removeEventListener("loadeddata", tryRun);
      video.removeEventListener("error", finish);
      gsap.set([media, shade, video, title, header, scroll, ...content.children, ...title.querySelectorAll("[data-intro-word]")], { clearProps: "all" });
    };
  }, []);

  return (
    <div ref={rootRef} className="home-intro" data-intro={phase}>
      {phase !== "complete" && (
        <div className="pointer-events-none fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden" aria-hidden="true">
          <div ref={titleRef} className="intro-title whitespace-nowrap font-gallient text-[clamp(36px,5.5vw,90px)] leading-none tracking-wide text-[#1a1a1a]">
            {siteContent.company.name.split(" ").map((word, index) => (
              <span key={index}>
                {index > 0 && <span data-intro-gap="" className="inline-block w-[0.45em]" />}
                <span data-intro-word="" className="-my-[0.3em] inline-block overflow-hidden py-[0.3em] align-top">
                  {word.split("").map((char, charIndex) => <span key={charIndex} className="intro-char inline-block">{char}</span>)}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
      <div inert={phase === "loading"}>{children}</div>
    </div>
  );
}
