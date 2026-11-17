import { admissionFaqs } from "./admission";
import { faqs as homeFaqs } from "./care";
import { editorial, placeholder, sourced, type Fact } from "./types";

/**
 * The family FAQ page. Answers about how care works in general are "editorial"; answers
 * about Swarnavihar itself are "sourced" (old site) or "placeholder" (owner to confirm).
 * Only confirmed answers go into FAQPage structured data.
 */
export const faqPage = {
  path: "/faq/",
  h1: "Questions families ask us",
  metaTitle: "Old Age Home FAQs for Families | Swarnavihar Pune",
  metaDescription:
    "Honest answers on choosing a home, admission, fees, daily life, medical care, dementia, visiting and settling in, for families in Pune looking at elderly care.",
  lede:
    "Moving a parent into care brings up a lot of questions, practical and emotional. Here are the ones we hear most often. If yours isn't here, call or WhatsApp us.",
};

type Q = { q: string; a: Fact<string> };

const pick = (list: Q[], q: string) => {
  const found = list.find((f) => f.q === q);
  if (!found) throw new Error(`FAQ not found: ${q}`);
  return found;
};

export const faqGroups: { id: string; title: string; items: Q[] }[] = [
  {
    id: "deciding",
    title: "Deciding on a home",
    items: [
      { q: "Is it wrong to move my parent into an old age home?", a: editorial("No. Many families feel guilty, especially in India, where we're brought up to care for parents ourselves. But when a parent needs help through the night, nursing, or more supervision than a working household can give, a good home can be the most caring choice. You're still their son or daughter: you visit, you decide, you stay involved.") },
      pick(homeFaqs, "How do we choose the right old age home in Pune?"),
      { q: "How do we talk to our parent about it?", a: editorial("Start early, before a crisis forces a quick decision. Talk about what's become hard for them and what they'd like, rather than announcing a plan. Visit homes together, and if they're unsure, ask about a short stay first.") },
      pick(homeFaqs, "What's the difference between an old age home and assisted living?"),
    ],
  },
  {
    id: "admission-fees",
    title: "Admission and fees",
    items: [
      pick(admissionFaqs, "How do we get an exact figure for our parent?"),
      pick(admissionFaqs, "Is there a security deposit?"),
      pick(admissionFaqs, "Are medicines included in the monthly fee?"),
      pick(admissionFaqs, "How quickly can my parent move in?"),
      pick(admissionFaqs, "Can my parent come for a short stay first?"),
    ],
  },
  {
    id: "daily-life",
    title: "Daily life",
    items: [
      { q: "What will my parent do all day?", a: sourced("There are daily activities: board games, crosswords and sudoku, gentle exercise, meditation, drawing, painting and music, and festivals celebrated together. Residents choose what they join.") },
      { q: "What food is served?", a: placeholder("Menu, timings and special diets to be confirmed by the owner.") },
      { q: "Can my parent bring their own things?", a: placeholder("What residents can bring (furniture, TV, photographs) to be confirmed by the owner.") },
      { q: "Who helps with bathing and dressing?", a: sourced("Attendants help with bathing, grooming, dressing, eating and toileting, with privacy and at your parent's pace.") },
    ],
  },
  {
    id: "medical",
    title: "Medical care",
    items: [
      { q: "Is a nurse on duty at night?", a: sourced("Yes. Nursing care is available 24 hours a day in our homes.") },
      { q: "Can a doctor see my parent at the home?", a: sourced("Yes. Doctors from our visiting panel examine residents at the home and review their treatment.") },
      pick(homeFaqs, "What happens in a medical emergency?"),
      { q: "Can you care for someone on oxygen, BiPAP or a feeding tube?", a: sourced("Yes. Oxygen, BiPAP and suction, and Ryle's tube and PEG feeding, are managed under the supervision of doctors and nurses.") },
      { q: "Will my parent still need to go to hospital sometimes?", a: editorial("Possibly. A care home isn't a hospital. Specialist appointments, scans, surgery and intensive care happen in hospital. A good home helps arrange these and keeps you informed.") },
    ],
  },
  {
    id: "dementia",
    title: "Dementia",
    items: [
      pick(homeFaqs, "Do you accept residents with dementia?"),
      { q: "My mother gets confused in the evenings. Is that normal?", a: editorial("It's common in dementia, and is sometimes called sundowning. A calm routine, good lighting as the day ends and fewer demands in the evening often help. Sudden new confusion can also be a sign of infection or a medicine side effect, so tell her doctor.") },
      { q: "What if my father tries to leave the home?", a: placeholder("How each home keeps residents who wander safe, to be confirmed by the owner.") },
    ],
  },
  {
    id: "family",
    title: "Visiting and staying in touch",
    items: [
      pick(homeFaqs, "Can we visit whenever we like?"),
      { q: "How will we know how our parent is doing?", a: placeholder("How and how often families get updates (calls, WhatsApp, care reviews), to be confirmed by the owner.") },
      { q: "We live abroad. Can we still manage our parent's care?", a: placeholder("How the homes work with families outside Pune or outside India (video calls, a local contact, payments), to be confirmed by the owner.") },
      { q: "Can my parent come home for a festival or a family event?", a: placeholder("Leave and outings policy to be confirmed by the owner.") },
    ],
  },
];

/** Every FAQ on the page, in order. */
export const allFamilyFaqs = () => faqGroups.flatMap((g) => g.items);
