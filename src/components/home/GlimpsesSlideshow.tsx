"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/content/photos";
import { Icon } from "@/components/ui/Icon";

const INTERVAL = 2000;

/**
 * "Glimpses of Swarnavihar": the first section of the homepage. A full-width slideshow of real
 * photos, shown clearly, one at a time, crossfading every 2 seconds, with a control bar
 * (caption, dots, pause, "See all photos") on a dark strip along the bottom.
 * Autoplay stops with Pause, off screen, in a hidden tab, while the controls have keyboard
 * focus, and never under prefers-reduced-motion. Only photos already shown plus the next one
 * are mounted, so the first paint downloads just one image.
 */
export function GlimpsesSlideshow() {
  const n = heroSlides.length;
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const [focused, setFocused] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const active = !userPaused && !reduced && visible && !tabHidden && !focused;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    if (rootRef.current) io.observe(rootRef.current);
    // Fetch the second photo once the page has settled, so it's ready for the first change.
    const warm = window.setTimeout(() => setMounted((m) => new Set(m).add(1)), 1200);
    return () => {
      mq.removeEventListener("change", onMq);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      window.clearTimeout(warm);
    };
  }, []);

  // Keep the current and next photos mounted.
  useEffect(() => {
    setMounted((m) => (m.has(index) && m.has((index + 1) % n) ? m : new Set(m).add(index).add((index + 1) % n)));
  }, [index, n]);

  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % n), INTERVAL);
    return () => window.clearTimeout(t);
  }, [active, index, n]);

  const slide = heroSlides[index];
  /** The chosen photo is always rendered at once (a dot can jump to one not yet mounted). */
  const show = (i: number) => i === index || mounted.has(i);

  return (
    <section
      ref={rootRef}
      aria-label="Glimpses of Swarnavihar"
      className="relative isolate overflow-hidden bg-[#16241c]"
    >
      <div className="relative h-[clamp(16rem,50vw,38rem)]">
      {heroSlides.map((s, i) =>
        show(i) ? (
          <div
            key={s.photo.src}
            data-hero-slide={i}
            data-active={i === index ? "true" : undefined}
            aria-hidden={i === index ? undefined : true}
            className="absolute inset-0 -z-10 transition-opacity duration-700 ease-in-out motion-reduce:transition-none"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <Image
              src={s.photo.src}
              alt={s.photo.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: s.photo.focus ?? "50% 45%" }}
            />
          </div>
        ) : null,
      )}
      {/* Soft shade under the bar only (from tablet up, where the bar sits on the photo). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-[linear-gradient(0deg,rgb(22_36_28/0.55),transparent)] md:block" />
      </div>

      {/* Phones: the bar sits under the photo so the whole photo shows; tablet and up: on it. */}
      <div className="bg-[#16241c] md:absolute md:inset-x-0 md:bottom-0 md:bg-[#16241c]/85">
        <div
          role="group"
          aria-label="Slideshow controls"
          onFocus={() => setFocused(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}
          className="mx-auto flex w-full max-w-site flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 sm:px-8"
        >
          <p aria-live={active ? "off" : "polite"} className="min-w-0 basis-full text-on-sage md:flex-1 md:basis-auto">
            <span className="font-serif text-[1.05rem] text-brass-light">Glimpses of Swarnavihar</span>
            <span aria-hidden="true" className="mx-2 text-on-sage/60">·</span>
            <span className="text-small">{slide.caption}</span>
          </p>
          <div className="-ml-1.5 flex items-center gap-1 md:ml-0">
            {heroSlides.map((s, i) => (
              <button
                key={s.photo.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1} of ${n}: ${s.caption}`}
                aria-current={i === index ? "true" : undefined}
                className="group inline-flex size-6 items-center justify-center rounded-full"
              >
                <span className={`block h-2 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-brass-light" : "w-2 bg-paper/50 group-hover:bg-paper/80"}`} />
              </button>
            ))}
          </div>
          {!reduced && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? "Play the slideshow" : "Pause the slideshow"}
              className="inline-flex size-10 items-center justify-center rounded-full border border-paper/40 text-paper hover:bg-white/15"
            >
              <Icon name={userPaused ? "play" : "pause"} className="size-4" />
            </button>
          )}
          <Link href="/gallery/" className="ml-auto text-small font-bold text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper md:ml-0">
            See all photos
          </Link>
        </div>
      </div>
    </section>
  );
}
