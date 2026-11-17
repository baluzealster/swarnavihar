import { homeFacilities } from "@/content/care";
import { Icon } from "@/components/ui/Icon";
import { Ph, Section, SectionHeading } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { isLive } from "@/lib/routes";

/** Facilities at a glance: one icon and one plain line each. Detail lives on /facilities/. */
export function Facilities() {
  return (
    <Section id="facilities" labelledBy="facilities-title">
      <SectionHeading
        id="facilities-title"
        align="split"
        title="Facilities and accommodation"
        intro="A home first, a care facility second: comfortable rooms, proper meals and days worth looking forward to."
      />
      <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {homeFacilities.map((f) => (
          <Ph key={f.title} status={f.status} as="li" className="card-lift flex flex-col rounded-card bg-paper p-5 shadow-soft sm:p-6">
            <span aria-hidden="true" className="inline-flex size-14 items-center justify-center rounded-full bg-cream ring-1 ring-brass/40">
              <Icon name={f.icon} className="size-7 text-brass-deep" />
            </span>
            <h3 className="mt-4 text-[1.2rem] leading-snug">{f.title}</h3>
            <p className="mt-1.5 text-small text-muted">{f.detail}</p>
          </Ph>
        ))}
      </ul>
      {isLive("/facilities/") && (
        <div className="mt-10">
          <ButtonLink href="/facilities/" variant="outline">See all facilities</ButtonLink>
        </div>
      )}
    </Section>
  );
}
