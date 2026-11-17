import { editorial, placeholder, sourced, type Fact, type FactStatus } from "./types";
import type { Scene } from "@/components/ui/Illustration";

/** Headline numbers — all placeholders until the owner confirms (fact sheet item 4). */
export const stats: { value: Fact<string>; label: string }[] = [
  { value: placeholder("10+"), label: "years caring for Pune's elders" },
  { value: placeholder("1,800+"), label: "families have trusted us" },
  { value: sourced("6"), label: "homes in Pune and Bengaluru" },
  { value: placeholder("8"), label: "doctors on our visiting panel" },
];

/** Medical support — sourced from the old /facilities/ page. */
export const medicalSupport: { icon: IconName; title: string; detail: string; status: FactStatus }[] = [
  { icon: "nurse", title: "Nurses on every shift", detail: "Vitals, medicines, wound and continence care, day and night.", status: "sourced" },
  { icon: "stethoscope", title: "Regular doctor visits", detail: "Physicians review each resident and adjust treatment.", status: "sourced" },
  { icon: "lungs", title: "Oxygen, BiPAP and suction", detail: "For COPD and other breathing conditions, under supervision.", status: "sourced" },
  { icon: "tube", title: "Ryle's tube and PEG feeding", detail: "For residents who cannot eat or swallow safely.", status: "sourced" },
  { icon: "walk", title: "In-house physiotherapy", detail: "For stroke, Parkinson's, fractures and general mobility.", status: "sourced" },
  { icon: "flask", title: "Tests without a hospital trip", detail: "Blood samples and X-rays taken at the home through partner labs.", status: "sourced" },
  { icon: "pill", title: "Pharmacy partner", detail: "Medicines delivered and managed for each resident.", status: "sourced" },
  { icon: "ambulance", title: "Ambulance on call", detail: "For emergencies and hospital transfers.", status: "sourced" },
];

/** Facilities — sourced from the old site; room details are placeholders. */
export const facilities: { title: string; items: string[]; photo: string; scene: Scene; status: FactStatus }[] = [
  {
    title: "Rooms",
    items: ["Private and twin-sharing rooms", "Plenty of daylight and fresh air", "Hospital beds where care needs them"],
    photo: "A sunlit twin-sharing room, beds made, a resident's photo frame on the side table",
    scene: "room",
    status: "placeholder",
  },
  {
    title: "Food",
    items: ["Freshly cooked, home-style meals", "Diets for diabetes and soft food", "Tea and snacks morning and evening"],
    photo: "Lunch being served at the dining table: dal, rice, sabzi, chapati",
    scene: "meal",
    status: "placeholder",
  },
  {
    title: "Daily living",
    items: ["Laundry and housekeeping every day", "Help with bathing and dressing", "Attendants on call"],
    photo: "An attendant helping a resident with a morning walk in the corridor",
    scene: "daily",
    status: "sourced",
  },
  {
    title: "Days worth looking forward to",
    items: ["Bhajans, music and festivals", "Games, puzzles and newspaper reading", "Meditation and gentle exercise"],
    photo: "Residents singing together during a Ganesh Chaturthi celebration",
    scene: "festival",
    status: "sourced",
  },
];

/**
 * Homepage facilities: one icon and one plain line each (owner request, 17 Nov 2026).
 * Non-medical only; medical support has its own band. Wording comes from the old
 * /facilities/ page (sourced); room types are still to be confirmed.
 */
export const homeFacilities: { icon: IconName; title: string; detail: string; status: FactStatus }[] = [
  { icon: "bed", title: "Comfortable rooms", detail: "Private and twin-sharing rooms with daylight and fresh air.", status: "placeholder" },
  { icon: "meal", title: "Home-style meals", detail: "Nutritious meals cooked every day, with help to eat when needed.", status: "sourced" },
  { icon: "hand", title: "Help with daily living", detail: "Bathing, grooming, dressing and toileting, done with privacy.", status: "sourced" },
  { icon: "laundry", title: "Laundry and housekeeping", detail: "Clothes washed on schedule; rooms and common areas kept clean.", status: "sourced" },
  { icon: "puzzle", title: "Games and mind exercises", detail: "Board games, crosswords and sudoku to keep minds active.", status: "sourced" },
  { icon: "music", title: "Music, bhajans and festivals", detail: "Singing, drawing and painting, and festivals celebrated together.", status: "sourced" },
  { icon: "lotus", title: "Exercise and meditation", detail: "Gentle physical exercise and meditation sessions.", status: "sourced" },
  { icon: "shield", title: "Safe and secure", detail: "Security, so residents are protected from intruders.", status: "sourced" },
];

/** Clinical team — role cards until the owner shares names with consent. */
export const careTeam: { role: string; name: Fact<string>; detail: string }[] = [
  { role: "Consulting physician", name: placeholder("Dr. A. Placeholder, MD Medicine"), detail: "Regular resident reviews and treatment plans" },
  { role: "Consulting psychiatrist", name: placeholder("Dr. B. Placeholder, MD Psychiatry"), detail: "Dementia, depression and behaviour support" },
  { role: "Physiotherapist", name: placeholder("C. Placeholder, MPT"), detail: "Rehabilitation and mobility programmes" },
  { role: "Nursing lead", name: placeholder("D. Placeholder, BSc Nursing"), detail: "Runs nursing shifts and care plans" },
];

export interface Testimonial {
  quote: Fact<string>;
  name: Fact<string>;
  relation: string;
  branch: string;
}

/** The brief forbids invented reviews. These slots stay empty until families give written consent. */
export const testimonials: Testimonial[] = [
  {
    quote: placeholder("A family's own words about their parent's care will go here once they have given written consent. We will not publish invented reviews."),
    name: placeholder("Family name"),
    relation: "Son of a resident",
    branch: "Baner",
  },
  {
    quote: placeholder("Review awaiting consent."),
    name: placeholder("Family name"),
    relation: "Daughter of a resident",
    branch: "Wakad",
  },
  {
    quote: placeholder("Review awaiting consent."),
    name: placeholder("Family name"),
    relation: "Nephew of a resident",
    branch: "Sinhgad Road",
  },
];

/** Why families choose Swarnavihar — each reason carries the status of the fact behind it. */
export const reasons: { icon: IconName; title: string; detail: string; status: FactStatus }[] = [
  { icon: "pin", title: "Close to where you live", detail: "Homes in Baner, Sus, Wakad, Sinhgad Road and Pimple Nilakh, so a visit fits into a weekday evening.", status: "sourced" },
  { icon: "home", title: "A home, not a ward", detail: "Private and twin-sharing rooms with daylight, in ordinary residential neighbourhoods.", status: "sourced" },
  { icon: "nurse", title: "Nursing day and night", detail: "Nurses on every shift for medicines, vitals, wound and continence care.", status: "sourced" },
  { icon: "stethoscope", title: "Doctors who visit regularly", detail: "A physician and a psychiatrist review residents and adjust treatment.", status: "sourced" },
  { icon: "walk", title: "Therapy without travelling", detail: "Physiotherapy inside the home for stroke, Parkinson's and fractures.", status: "sourced" },
  { icon: "message", title: "You're kept informed", detail: "Regular updates on your parent's health and day, by phone or WhatsApp.", status: "placeholder" },
];

/** Genuinely useful guidance — not a claim about us, so no fact status needed. */
export const visitChecklist = [
  "Ask how many nurses and attendants are on duty at night, not just in the day.",
  "Ask to see a written care plan, and who updates it.",
  "Find out what happens in an emergency at 2 a.m., and which hospital they go to.",
  "Look at a resident's room, not only the show room.",
  "Ask what is included in the monthly fee and what is charged extra.",
  "Stay for a meal.",
];

export const admissionSteps: { title: string; detail: Fact<string> }[] = [
  { title: "Call or WhatsApp", detail: placeholder("Tell us about your parent. We'll suggest the nearest home with space.") },
  { title: "Visit the home", detail: placeholder("See the rooms and meet the people who would care for your parent.") },
  { title: "Care assessment", detail: placeholder("Our doctor reviews medical records and agrees a care plan with you.") },
  { title: "Move in", detail: placeholder("We help your parent settle in and keep you updated.") },
];

export const faqs: { q: string; a: Fact<string> }[] = [
  { q: "How much does it cost each month?", a: placeholder("It depends on the room and on how much nursing your parent needs. Call us with their medical details and we'll give you a written estimate.") },
  { q: "Can we visit whenever we like?", a: placeholder("Visiting hours to be confirmed by each home.") },
  { q: "What happens in a medical emergency?", a: placeholder("The nurse on duty responds first, the doctor is called, and our ambulance partner transfers your parent to the nearest hospital you have chosen.") },
  { q: "Can my parent come for a short stay first?", a: placeholder("Short-stay and respite policy to be confirmed.") },
  { q: "Do you accept residents with dementia?", a: placeholder("Yes. To be confirmed per home, along with the level of dementia care each home provides.") },
  { q: "How do we choose the right old age home in Pune?", a: editorial("Visit more than one, and go at different times of day. Ask how many nurses and attendants are on duty at night, see a resident's room rather than a show room, ask what happens in a 2 a.m. emergency, and get a written list of what the monthly fee includes. A home near where you live usually matters more than families expect, because you'll visit more often.") },
  { q: "What's the difference between an old age home and assisted living?", a: editorial("The words overlap in India. Generally, an old age home offers a room, meals, company and help on hand, while assisted living adds daily personal care such as bathing, dressing and medicines. Parents who need nursing every day, for example after a stroke or when bedridden, need a home with nurses on every shift.") },
];

export type IconName =
  | "phone" | "whatsapp" | "pin" | "check" | "menu" | "close" | "plus" | "nurse" | "stethoscope"
  | "lungs" | "tube" | "walk" | "flask" | "pill" | "ambulance" | "directions" | "quote"
  | "home" | "heart" | "users" | "calendar" | "chevron-left" | "chevron-right" | "expand" | "message" | "pause" | "play"
  | "hand" | "clock" | "bed" | "brain" | "cane" | "pulse" | "stroke" | "wheelchair" | "bandage"
  | "meal" | "laundry" | "puzzle" | "music" | "lotus" | "shield";
