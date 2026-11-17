import { admissionSteps } from "@/content/care";
import { Ph, Section, SectionHeading } from "@/components/ui/Layout";

/** A real four-step sequence, so numbering is meaningful here. */
export function Admission() {
  return (
    <Section id="admission" tone="mist" labelledBy="admission-title">
      <SectionHeading id="admission-title" title="How admission works" intro="From your first call to the day your parent moves in." />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {admissionSteps.map((step, i) => (
          <li key={step.title} className="border-t-2 border-sage pt-5">
            <span aria-hidden="true" className="block font-serif text-[2.5rem] leading-none text-brass-deep">{i + 1}</span>
            <h3 className="mt-4 text-[1.3rem]">{step.title}</h3>
            <Ph status={step.detail.status} as="p" className="mt-2 text-small text-muted">{step.detail.value}</Ph>
          </li>
        ))}
      </ol>
    </Section>
  );
}
