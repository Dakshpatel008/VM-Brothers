"use client";

import { useId, useState, type ComponentPropsWithoutRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import useReducedMotion from "@/components/hooks/useReducedMotion";
import type { FaqItem } from "@/data/siteContent";

interface FAQProps extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  title?: string;
  subtitle?: string;
  categories: Readonly<Record<string, string>>;
  faqData: Readonly<Record<string, readonly FaqItem[]>>;
}

const easeOut = [0.23, 1, 0.32, 1] as const;

export function FAQ({ title = "FAQs", subtitle = "Frequently Asked Questions", categories, faqData, className, ...props }: FAQProps) {
  const id = useId();
  const keys = Object.keys(categories).filter((key) => faqData[key]?.length);
  const [selectedCategory, setSelectedCategory] = useState(keys[0]);
  const [keyboard, setKeyboard] = useState(false);
  const reducedMotion = useReducedMotion();
  const selected = keys.includes(selectedCategory) ? selectedCategory : keys[0];
  const instant = reducedMotion || keyboard;
  if (!selected) return null;

  return (
    <section aria-labelledby={`${id}-heading`} className={cn("relative overflow-hidden bg-[#F5F5F5] px-6 py-24 text-[#313131] md:px-12 md:py-32", className)} {...props}>
      <div className="relative mx-auto max-w-5xl">
        <div aria-hidden="true" className="pointer-events-none absolute -top-64 left-1/2 h-96 w-full max-w-xl -translate-x-1/2 rounded-full bg-gradient-to-r from-[#B6AB99]/15 to-[#EAE6DF]/30 blur-3xl" />
        <div className="relative mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#766954]">{subtitle}</p>
          <h2 id={`${id}-heading`} className="mt-4 font-gallient text-4xl leading-tight md:text-5xl">{title}</h2>
        </div>
        <div role="tablist" aria-label="FAQ categories" className="relative flex flex-wrap justify-center gap-3">
          {keys.map((key, index) => (
            <button key={key} type="button" role="tab" id={`${id}-tab-${key}`}
              aria-selected={selected === key} aria-controls={`${id}-panel-${key}`} tabIndex={selected === key ? 0 : -1}
              onClick={(event) => { setKeyboard(event.detail === 0); setSelectedCategory(key); }}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight") next = (index + 1) % keys.length;
                else if (event.key === "ArrowLeft") next = (index - 1 + keys.length) % keys.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = keys.length - 1;
                else return;
                event.preventDefault();
                setKeyboard(true);
                setSelectedCategory(keys[next]);
                event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
              }}
              className={cn("relative min-h-11 overflow-hidden rounded-md border px-5 py-3 text-sm transition-colors duration-200", selected === key ? "border-[#313131] text-white" : "border-[#313131]/20 text-[#313131]/75 hover:border-[#313131]/50 hover:text-[#313131]")}
            >
              <span className="relative z-10">{categories[key]}</span>
              <AnimatePresence initial={false}>
                {selected === key && <motion.span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#313131] to-[#4C4842]"
                  initial={{ transform: instant ? "translateY(0%)" : "translateY(100%)" }} animate={{ transform: "translateY(0%)" }} exit={{ transform: "translateY(100%)" }} transition={{ duration: instant ? 0 : 0.2, ease: easeOut }} />}
              </AnimatePresence>
            </button>
          ))}
        </div>
        <div className="relative mx-auto mt-10 max-w-3xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={selected} role="tabpanel" id={`${id}-panel-${selected}`} aria-labelledby={`${id}-tab-${selected}`} tabIndex={0}
              initial={{ opacity: 0, transform: instant ? "none" : "translateY(8px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }} exit={{ opacity: 0, transform: instant ? "none" : "translateY(8px)" }} transition={{ duration: instant ? 0 : 0.2, ease: easeOut }} className="space-y-4 rounded-xl">
              {faqData[selected].map((faq) => <FAQItem key={faq.question} {...faq} reducedMotion={reducedMotion} />)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, reducedMotion }: FaqItem & { reducedMotion: boolean }) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const duration = reducedMotion || keyboard ? 0 : 0.2;
  return (
    <div className={cn("rounded-xl border border-[#313131]/15 transition-colors duration-200", isOpen ? "bg-[#EAE6DF]/60" : "bg-white/60")}>
      <h3>
        <button type="button" id={`${id}-question`} aria-expanded={isOpen} aria-controls={`${id}-answer`}
          onClick={(event) => { setKeyboard(event.detail === 0); setIsOpen((open) => !open); }}
          className="flex min-h-16 w-full items-center justify-between gap-5 rounded-xl p-5 text-left sm:p-6">
          <span className="font-gallient text-xl leading-snug sm:text-2xl">{question}</span>
          <motion.span aria-hidden="true" animate={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }} transition={{ duration, ease: easeOut }} className="shrink-0">
            <Plus className="h-5 w-5" />
          </motion.span>
        </button>
      </h3>
      <motion.div id={`${id}-answer`} role="region" aria-labelledby={`${id}-question`} aria-hidden={!isOpen} inert={!isOpen}
        initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration, ease: easeOut }} className="overflow-hidden">
        <p className="px-5 pb-5 text-sm font-light leading-relaxed text-[#313131]/80 sm:px-6 sm:pb-6">{answer}</p>
      </motion.div>
    </div>
  );
}
