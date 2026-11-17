import { editorial, placeholder, sourced, type Fact } from "./types";

/**
 * Medical care information. Capabilities listed as "sourced" are stated on the old
 * /facilities/ and /about/ pages; anything about processes (emergencies, hospitals,
 * the resident's own doctor) is a placeholder until the owner confirms it.
 * We describe what the homes do, never outcomes, and never claim hospital-level care.
 */
export const medicalPage = {
  path: "/medical-care/",
  h1: "Medical care in our homes",
  metaTitle: "Medical and Nursing Care for Elders in Pune | Swarnavihar",
  metaDescription:
    "Nursing on every shift, regular doctor visits, oxygen and BiPAP, tube feeding, physiotherapy and tests at the home. How medical care works at Swarnavihar.",
  lede:
    "Many of our residents live with long-term conditions, and some come to us straight from hospital. Here is the medical support in our homes, how it works day to day, and where its limits are.",
};

export interface MedicalArea {
  id: string;
  title: string;
  intro: string;
  items: Fact<string>[];
}

export const medicalAreas: MedicalArea[] = [
  {
    id: "nursing",
    title: "Nursing, day and night",
    intro: "Nurses are on duty around the clock. They are usually the first to notice when something isn't right.",
    items: [
      sourced("Giving medicines on time and recording every dose"),
      sourced("Checking vital signs: blood pressure, pulse, temperature, oxygen and blood sugar"),
      sourced("Wound care, pressure-area care and dressings"),
      sourced("Continence and catheter care, hygiene and infection control"),
      sourced("Recording medical history and operating medical equipment"),
      placeholder("Nurses' qualifications (for example GNM or BSc Nursing) and night-time staffing, to be confirmed by the owner"),
    ],
  },
  {
    id: "doctors",
    title: "Doctors who visit",
    intro: "A panel of doctors examines residents, reviews their history and adjusts treatment.",
    items: [
      sourced("Regular visits from consulting physicians"),
      sourced("Specialists on the visiting panel: a psychiatrist, a neurologist, an orthopaedic surgeon and a dermatologist"),
      placeholder("How often the physician visits each home, and how quickly a doctor can be reached at night (owner to confirm)"),
      placeholder("Whether your parent's own doctor can continue to see them (owner to confirm)"),
    ],
  },
  {
    id: "equipment",
    title: "Breathing support and feeding",
    intro: "For residents whose breathing or swallowing needs extra help, under the supervision of doctors and nurses.",
    items: [
      sourced("Oxygen therapy"),
      sourced("BiPAP (non-invasive ventilation), for example for COPD"),
      sourced("Suction"),
      sourced("Ryle's tube (nasal) feeding and PEG feeding for residents who can't swallow or eat safely"),
    ],
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy",
    intro: "Therapy inside the home, so your parent doesn't have to travel to a clinic.",
    items: [
      sourced("For neurological conditions such as stroke and Parkinson's"),
      sourced("For bone, joint and muscle problems, including recovery after fractures and surgery"),
      sourced("For heart and breathing conditions"),
      placeholder("How many sessions a week, and whether they are included in the monthly fee (owner to confirm)"),
    ],
  },
  {
    id: "tests",
    title: "Tests and medicines",
    intro: "Many routine tests don't need a trip to hospital.",
    items: [
      sourced("Blood samples collected at the home"),
      sourced("Mobile X-rays at the home"),
      sourced("Medicines supplied through partner pharmacies and diagnostic centres"),
      placeholder("How medicines are paid for: included or billed at cost (owner to confirm)"),
    ],
  },
];

export const emergencies: Fact<string>[] = [
  sourced("An ambulance service responds to medical emergencies."),
  placeholder("What happens step by step: who responds first, when the doctor is called, and when your parent is moved to hospital (owner to confirm)."),
  placeholder("Which hospitals near each home residents are usually taken to, and whether families can choose (owner to confirm)."),
  placeholder("How and how quickly families are told (owner to confirm)."),
];

/** Plain statement of limits: a residential home is not a hospital. */
export const limits = placeholder(
  "Swarnavihar is a residential care home, not a hospital. Residents who need intensive care, surgery or a ventilator are treated in hospital, and we help arrange the transfer and take them back when they're ready. (Owner to confirm the exact limits, for example tracheostomy and dialysis.)",
);

export const medicalDisclaimer = editorial(
  "This page describes the care available in our homes. It isn't medical advice: your parent's doctor is the best guide to what they need.",
);
