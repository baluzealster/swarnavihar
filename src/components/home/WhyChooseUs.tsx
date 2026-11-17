import { reasons, visitChecklist } from "@/content/care";
import { Icon } from "@/components/ui/Icon";
import { Ph, Section, SectionHeading } from "@/components/ui/Layout";

/** Why families choose us: reasons backed by facts, plus the questions we'd ask any home. */
export function WhyChooseUs() {
  return (
    <Section id="why-swarnavihar" tone="mist" labelledBy="why-title">
      <SectionHeading
        id="why-title"
        align="split"
        title="Why families choose Swarnavihar"
        intro="What matters most to families is that their parent is safe, cared for and still close by. This is how we make sure of it."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {reasons.map((r) => (
          <Ph key={r.title} status={r.status} as="li" className="card-lift rounded-card bg-paper p-6 shadow-soft sm:p-7">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-cream ring-1 ring-brass/40">
              <Icon name={r.icon} className="size-7 text-brass-deep" />
            </span>
            <h3 className="mt-5 text-[1.3rem] leading-snug">{r.title}</h3>
            <p className="mt-2 text-muted">{r.detail}</p>
          </Ph>
        ))}
      </ul>

      <div className="mt-12 rounded-card border border-brass/30 bg-cream p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <h3 className="text-h3">Visiting other homes too?</h3>
            <p className="mt-3 text-muted">
              Ask every home these questions, including us. The answers tell you more than any brochure.
            </p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {visitChecklist.map((q) => (
              <li key={q} className="flex gap-3 border-t border-line py-3.5">
                <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />
                <span className="text-small">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
