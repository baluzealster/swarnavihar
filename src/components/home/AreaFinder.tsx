"use client";

import { useState } from "react";
import { areas, branchesIn, mapsSearchUrl, type AreaKey } from "@/content/branches";
import { whatsappLink } from "@/content/site";
import { Nameplate } from "@/components/ui/Nameplate";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Ph } from "@/components/ui/Layout";
import { ScheduleVisitLink } from "@/components/ui/ScheduleVisitLink";

const puneAreas = areas.filter((a) => a.key !== "bengaluru");

/** Hero: "Which part of Pune are you in?" → the nearest house, with one-tap contact. */
export function AreaFinder() {
  const [area, setArea] = useState<AreaKey>("baner");
  const [changed, setChanged] = useState(false);
  const homes = branchesIn(area);

  return (
    <div className="rounded-card border border-line bg-paper p-5 sm:p-7">
      <h2 id="finder-title" className="text-[1.375rem] leading-snug sm:text-[1.5rem]">Which part of Pune are you in?</h2>
      <div role="group" aria-labelledby="finder-title" className="mt-4 flex flex-wrap gap-2.5">
        {puneAreas.map((a) => {
          const on = a.key === area;
          return (
            <button
              key={a.key}
              type="button"
              aria-pressed={on}
              onClick={() => { setArea(a.key); setChanged(true); }}
              className={
                "min-h-12 rounded-full border-[1.5px] px-4 text-left text-[1.0625rem] font-medium leading-tight transition-colors " +
                (on ? "border-sage bg-sage text-paper" : "border-line-strong bg-cream text-ink hover:border-sage")
              }
            >
              {a.chip}
              <span className="sr-only"> and nearby</span>
            </button>
          );
        })}
      </div>

      <div key={area} aria-live="polite" className={"mt-6 border-t border-line pt-6 " + (changed ? "reveal" : "")}>
        <p className="mb-4 text-small text-muted">
          {homes.length > 1 ? "Your nearest homes" : "Your nearest home"}, for families in {areas.find((a) => a.key === area)!.covers.join(", ")}
        </p>
        <ul className="grid gap-5">
          {homes.map((b) => (
            <li key={b.id}>
              <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-5">
                <Nameplate branch={b} size="sm" />
                <Ph status={b.address.status} as="p" className="text-small leading-snug text-muted">{b.address.value}</Ph>
              </div>
              <div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <ScheduleVisitLink branch={b.id} houseName={b.house.value} size="sm">Schedule a visit</ScheduleVisitLink>
                  <Ph status={b.phone.status}>
                    <a href={`tel:${b.phone.value.tel}`} aria-label={`Call ${b.house.value}`} className={buttonClass("outline", "sm")}>
                      <Icon name="phone" className="size-[1.1rem]" /> Call
                    </a>
                  </Ph>
                  <a href={mapsSearchUrl(b)} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${b.house.value}`} className={buttonClass("quiet", "sm")}>
                    <Icon name="directions" className="size-[1.1rem]" /> Directions
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-small text-muted">
        Looking in Bengaluru? <a href="#homes" className="font-bold text-sage">See our Gottigere home</a>, or{" "}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-bold text-sage">ask us on WhatsApp</a>.
      </p>
    </div>
  );
}
