"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One site-wide scroll reveal: every element marked `data-reveal` that starts below the fold
 * fades up as it enters the screen, once. Elements already visible are left alone, so the
 * first screen is never hidden or delayed. `data-reveal-delay="120"` staggers siblings.
 * Does nothing under prefers-reduced-motion or without IntersectionObserver.
 */
export function ScrollReveal() {
  const path = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.reveal-in)"));
    const fold = window.innerHeight;
    const pending = els.filter((el) => el.getBoundingClientRect().top > fold - 40);
    pending.forEach((el) => el.classList.add("reveal-pending"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const delay = el.dataset.revealDelay;
          if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.classList.add("reveal-in");
          el.classList.remove("reveal-pending");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0 },
    );
    pending.forEach((el) => io.observe(el));

    // Never leave anything hidden: e.g. jumping to #enquire or printing.
    const reveal = () => pending.forEach((el) => { el.classList.add("reveal-in"); el.classList.remove("reveal-pending"); });
    window.addEventListener("beforeprint", reveal);
    window.addEventListener("hashchange", reveal);
    return () => {
      io.disconnect();
      window.removeEventListener("beforeprint", reveal);
      window.removeEventListener("hashchange", reveal);
    };
  }, [path]);

  return null;
}
