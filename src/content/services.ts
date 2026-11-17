import { placeholder, type Fact } from "./types";
import type { IconName } from "./care";

export type ServiceGroup = "living" | "medical" | "recovery";

export interface Service {
  slug: string;
  title: string;
  /** One line written for a worried son or daughter, not a search engine. */
  summary: string;
  group: ServiceGroup;
  /** Line icon shown before the service in menus. */
  icon: IconName;
  /** Whether the business actually provides it — owner to confirm (fact sheet Q5). */
  offered: Fact<boolean>;
  /** URL already exists on the old site and must be kept. */
  existingUrl?: boolean;
}

const s = (slug: string, title: string, summary: string, group: ServiceGroup, icon: IconName, existingUrl = false): Service => ({
  slug, title, summary, group, icon, existingUrl, offered: placeholder(true),
});

export const services: Service[] = [
  s("old-age-home-in-pune", "Residential old age home", "A room of their own, meals, company and someone on hand day and night.", "living", "home"),
  s("assisted-living-care", "Assisted living", "Help with bathing, dressing and medicines, while they keep their routines.", "living", "hand", true),
  s("24-7-elderly-care-in-pune", "Round-the-clock elderly care", "Attendants and nurses through the night, not just in the day.", "living", "clock"),
  s("geriatric-care-in-pune", "Geriatric care", "Care planned around the health needs that come with age.", "living", "users", true),
  s("nursing-care-in-pune", "Nursing care", "Vitals, wound care, injections and medicines handled by trained nurses.", "medical", "nurse"),
  s("bedridden-patient-care-in-pune", "Bedridden patient care", "Turning, hygiene and pressure-sore prevention, done gently and on time.", "medical", "bed"),
  s("dementia-care-in-pune", "Dementia and Alzheimer's care", "A calm, safe routine with staff who know how to respond to confusion.", "medical", "brain", true),
  s("parkinsons-care-in-pune", "Parkinson's care", "Medicines on schedule, help with movement, and fall prevention.", "medical", "cane"),
  s("tracheostomy-care-in-pune", "Tracheostomy care", "Suctioning and tube care by nurses trained for it.", "medical", "lungs"),
  s("feeding-tube-care-in-pune", "Feeding tube care", "Ryle's tube and PEG feeding, prepared and given safely.", "medical", "tube"),
  s("coma-patient-care-in-pune", "Coma patient care", "Complete nursing care for residents who cannot respond.", "medical", "pulse"),
  s("hospice-palliative-care-in-pune", "Palliative and hospice care", "Comfort, dignity and pain relief, with the family close by.", "medical", "heart", true),
  s("post-stroke-rehabilitation-in-pune", "Post-stroke rehabilitation", "Daily therapy to rebuild movement, speech and confidence.", "recovery", "stroke"),
  s("paralysis-care-centre-in-pune", "Paralysis care", "Positioning, physiotherapy and everyday help after paralysis.", "recovery", "wheelchair", true),
  s("physiotherapy-rehabilitation-in-pune", "Physiotherapy and rehabilitation", "Exercises and therapy to keep them moving and steady on their feet.", "recovery", "walk"),
  s("post-operative-care-in-pune", "Recovery after a hospital stay", "Nursing and therapy between hospital discharge and going home.", "recovery", "bandage", true),
];

export const serviceGroups: { key: ServiceGroup; title: string; whenToChoose: string }[] = [
  { key: "living", title: "Everyday living", whenToChoose: "They're largely independent but shouldn't be living alone." },
  { key: "medical", title: "Medical and nursing care", whenToChoose: "They need nursing, or a long-term condition managed every day." },
  { key: "recovery", title: "Recovery and rehabilitation", whenToChoose: "They're coming out of hospital, or recovering from a stroke or surgery." },
];

export const serviceHref = (sv: Service) => `/service/${sv.slug}/`;
