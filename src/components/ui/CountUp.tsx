"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a headline number up from zero when it scrolls into view ("1,800+" keeps its
 * comma and suffix). The final value is in the HTML from the start, so search engines,
 * screen readers and no-JS visitors always get the real number. Off under reduced motion.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || !Number.isFinite(target) || target < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen: leave it
    const [, pre, , post] = match;
    const fmt = (n: number) => pre + n.toLocaleString("en-IN") + post;
    setShown(fmt(0));
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        setShown(k < 1 ? fmt(Math.round(target * eased)) : value);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true" className="tabular-nums">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
