import { careTeam, medicalSupport } from "@/content/care";
import { Icon } from "@/components/ui/Icon";
import { Ph, Section, SectionHeading } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { photos } from "@/content/photos";

const strip = [
  { photo: photos.nursingBipap, caption: "Breathing support, supervised by nurses" },
  { photo: photos.physioBed, caption: "Physiotherapy at the bedside" },
  { photo: photos.ambulance, caption: "Our own ambulance on call" },
];

export function MedicalCare() {
  return (
    <Section id="medical" tone="sage" labelledBy="medical-title">
      <SectionHeading
        id="medical-title"
        align="split"
        title="Medical and nursing support, without moving to a hospital"
        intro="Most of what your parent needs day to day is handled inside the home, by people who know them. When a hospital is needed, we arrange the transfer."
      />
      <ul className="grid gap-px overflow-hidden rounded-card border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
        {medicalSupport.map((m) => (
          <Ph key={m.title} status={m.status} as="li" className="bg-sage p-6 lg:p-7">
            <Icon name={m.icon} className="size-8 text-brass-light" />
            <h3 className="mt-5 font-sans text-[1.125rem] font-bold leading-snug">{m.title}</h3>
            <p className="mt-2 text-small text-on-sage">{m.detail}</p>
          </Ph>
        ))}
      </ul>
      <ul className="mt-10 grid gap-5 sm:grid-cols-3">
        {strip.map((x) => (
          <li key={x.caption} className="group">
            <PhotoFrame photo={x.photo} scene="medical" shot={x.caption} ratio="4/3" zoom className="rounded-card" sizes="(min-width: 640px) 33vw, 100vw" />
            <p className="mt-3 text-small text-on-sage">{x.caption}</p>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <h3 className="text-h3">Who looks after your parent</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {careTeam.map((m) => (
            <li key={m.role} className="rounded-card border border-paper/15 p-5">
              <span className="block font-bold text-paper">{m.role}</span>
              <Ph status={m.name.status} className="mt-1 block text-small">{m.name.value}</Ph>
              <span className="mt-2 block text-small text-on-sage">{m.detail}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-read text-on-sage">
          Not sure whether we can manage your parent's condition? Send us their discharge summary and we will tell you plainly whether we can care for them.
        </p>
        <ButtonLink href="#enquire" variant="light" className="shrink-0">Ask our doctor</ButtonLink>
      </div>
    </Section>
  );
}
