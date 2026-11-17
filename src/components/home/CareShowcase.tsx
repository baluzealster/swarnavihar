import Link from "next/link";
import { serviceGroups, services, serviceHref } from "@/content/services";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Section, SectionHeading } from "@/components/ui/Layout";
import { isLive } from "@/lib/routes";

const scenes = { living: "tea", medical: "medical", recovery: "recovery" } as const;

const shots: Record<string, string> = {
  living: "two residents sharing morning tea on a sunny bench",
  medical: "a nurse checking a resident's blood pressure, both smiling",
  recovery: "a physiotherapist guiding a resident through walking exercises",
};

export function CareShowcase() {
  return (
    <Section id="care" labelledBy="care-title">
      <SectionHeading
        id="care-title"
        align="split"
        title="Our care services"
        intro="Start from what your parent needs today. Each service page explains what the day looks like, who looks after them, and what it involves."
      />
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-8">
        {serviceGroups.map((g) => {
          const list = services.filter((s) => s.group === g.key);
          return (
            <article key={g.key} className="group card-lift grid content-start overflow-hidden rounded-card bg-paper shadow-soft md:grid-cols-[0.85fr_1.15fr] lg:grid-cols-1">
              <PhotoFrame ratio="3/2" scene={scenes[g.key]} shot={shots[g.key]} zoom className="rounded-none! md:h-full lg:h-auto" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 40vw, 100vw" />
              <div className="p-6 sm:p-7">
              <div>
                <span aria-hidden="true" className="mb-4 block h-0.5 w-10 bg-brass" />
                <h3 className="text-h3">{g.title}</h3>
                <p className="mt-2 text-small text-muted">{g.whenToChoose}</p>
              </div>
              <ul className="mt-4">
                {list.map((s) => (
                  <li key={s.slug} className="border-b border-line last:border-b-0">
                    {isLive(serviceHref(s)) ? (
                      <Link
                        href={serviceHref(s)}
                        className="group flex items-center justify-between gap-4 py-3 font-medium text-ink no-underline hover:text-sage"
                      >
                        <span className="group-hover:underline">{s.title}</span>
                        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 text-brass-deep transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 3 5 5-5 5" /></svg>
                      </Link>
                    ) : (
                      <span className="block py-3 font-medium text-ink">{s.title}</span>
                    )}
                  </li>
                ))}
              </ul>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
