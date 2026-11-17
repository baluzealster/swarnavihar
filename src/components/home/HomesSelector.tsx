"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { areas, branchesIn, mapsSearchUrl, type AreaKey } from "@/content/branches";
import { whatsappLink } from "@/content/site";
import { Nameplate } from "@/components/ui/Nameplate";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Ph } from "@/components/ui/Layout";
import { ScheduleVisitLink } from "@/components/ui/ScheduleVisitLink";

/** Branch / location selector — WAI-ARIA tabs with arrow-key navigation. */
export function HomesSelector() {
  const [active, setActive] = useState<AreaKey>("baner");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;
    if (e.key in keys) next = (index + keys[e.key] + areas.length) % areas.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = areas.length - 1;
    if (next === null) return;
    e.preventDefault();
    const key = areas[next].key;
    setActive(key);
    tabRefs.current[key]?.focus();
  };

  const area = areas.find((a) => a.key === active)!;
  const homes = branchesIn(active);

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-12">
      <div
        role="tablist"
        aria-label="Choose an area"
        aria-orientation="vertical"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible"
      >
        {areas.map((a, i) => {
          const on = a.key === active;
          return (
            <button
              key={a.key}
              ref={(el) => { tabRefs.current[a.key] = el; }}
              role="tab"
              id={`tab-${a.key}`}
              aria-selected={on}
              aria-controls={`panel-${a.key}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(a.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={
                "shrink-0 rounded-full border-[1.5px] px-5 py-2.5 text-left transition-colors lg:rounded-none lg:border-0 lg:border-l-[3px] lg:px-5 lg:py-4 " +
                (on
                  ? "border-sage bg-sage text-paper lg:bg-paper lg:text-sage"
                  : "border-line-strong bg-paper text-ink hover:border-sage lg:border-transparent lg:bg-transparent lg:hover:bg-paper/60")
              }
            >
              <span className="block font-serif text-[1.2rem] leading-tight lg:text-[1.35rem]">{a.label}</span>
              <span className={"hidden text-[0.9375rem] lg:block " + (on ? "text-muted" : "text-muted")}>
                {a.covers.join(", ")}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        key={active}
        className="reveal rounded-card bg-paper p-5 sm:p-8"
      >
        <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-small text-muted">For families in {area.covers.join(", ")}</p>
            <ul className="mt-5 grid gap-8">
              {homes.map((b) => (
                <li key={b.id}>
                  <Nameplate branch={b} />
                  <Ph status={b.address.status} as="p" className="mt-4 max-w-read">{b.address.value}</Ph>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <ScheduleVisitLink branch={b.id} houseName={b.house.value} />
                    <Ph status={b.phone.status}>
                      <a href={`tel:${b.phone.value.tel}`} className={buttonClass("outline")}>
                        <Icon name="phone" className="size-5" /> {b.phone.value.display}
                      </a>
                    </Ph>
                    <a href={mapsSearchUrl(b)} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${b.house.value}`} className={buttonClass("quiet")}>
                      <Icon name="directions" className="size-5" /> Directions
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-small text-muted">
              {area.href ? (
                <Link href={area.href} className="font-bold text-sage">Read about our {area.label} {homes.length > 1 ? "homes" : "home"}</Link>
              ) : (
                <a href={whatsappLink(`Hello, I'd like to know about your ${area.label} home.`)} target="_blank" rel="noopener noreferrer" className="font-bold text-sage">
                  Ask about our {area.label} home on WhatsApp
                </a>
              )}
            </p>
          </div>
          <PhotoFrame ratio="4/3" scene="gate" shot={`the front gate and nameplate of ${homes[0].house.value}`} sizes="(min-width: 1280px) 30vw, 100vw" />
        </div>
      </div>
    </div>
  );
}
