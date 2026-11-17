import type { Scene } from "@/components/ui/Illustration";
import type { AreaKey } from "./branches";
import { placeholder, sourced, type Fact } from "./types";

/**
 * Location landing pages. Every paragraph here is written for its own area. Shared blocks
 * (services, facilities, medical support) come from the common content files instead.
 * Directions only repeat landmarks already in each home's address: no travel times or
 * distances until the owner confirms them.
 */
export interface LocationPage {
  area: AreaKey;
  path: string;
  /** Short name used in breadcrumbs and links. */
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  intro: string[];
  areasServed: { name: string; note: string }[];
  findingUs: { branchId: string; landmarks: string }[];
  /** Heading over the home cards, when the default would be inaccurate. */
  homesTitle?: string;
  faqs: { q: string; a: Fact<string> }[];
  whatsappMessage: string;
  heroScene: Scene;
}

export const locationPages: LocationPage[] = [
  {
    area: "baner",
    path: "/old-age-home-baner-pune/",
    name: "Baner",
    h1: "Old age homes in Baner, Pune",
    metaTitle: "Old Age Home in Baner, Pune | Ananda & Achyutha Nivas",
    metaDescription:
      "Two Swarnavihar homes on the Pashan–Sus Road for families in Baner, Balewadi, Pashan and Sus. Nursing, doctor visits and physiotherapy. Visit before you decide.",
    lede:
      "Two homes on the Pashan–Sus Road, Ananda Nivas in Baner and Achyutha Nivas in Sus, for families who want their parent close by in west Pune.",
    intro: [
      "Many families in Baner and Balewadi moved here for work, and their parents moved with them or came later. When a parent needs more help than a busy household can give, the hardest part is often distance: a good home on the other side of the city means visiting only on weekends.",
      "Both of our homes in this part of Pune sit on the Pashan–Sus Road, a short drive apart, so you can see both before choosing the one that suits your parent.",
    ],
    areasServed: [
      { name: "Baner", note: "Ananda Nivas is in Baner itself, behind the 52 Green Woods apartments." },
      { name: "Balewadi", note: "Next door to Baner, so Ananda Nivas is usually the nearer home." },
      { name: "Pashan", note: "Both homes are on the Pashan–Sus Road that starts here." },
      { name: "Sus", note: "Achyutha Nivas is in Ravi Nagar, Sus." },
    ],
    findingUs: [
      { branchId: "baner", landmarks: "Constellation Building on the Pashan–Sus Road, behind the 52 Green Woods apartments." },
      { branchId: "sus", landmarks: "In Ravi Nagar on the Pashan–Sus Road, near the Hyundai service centre." },
    ],
    faqs: [
      { q: "Which of the two homes should we visit first?", a: sourced("If you live in Baner or Balewadi, start with Ananda Nivas. If you're in Sus or further out on the Pashan–Sus Road, Achyutha Nivas is closer. Tell us where you are and we'll suggest one.") },
      { q: "Do both homes offer the same care?", a: placeholder("To be confirmed by the owner: which services each of the two homes provides.") },
      { q: "Can we see both homes on the same day?", a: placeholder("Yes. Tell us when you'd like to come and we'll arrange both visits. (Owner to confirm.)") },
      { q: "Is there parking for visitors?", a: placeholder("Parking arrangements to be confirmed for each home.") },
    ],
    whatsappMessage: "Hello, I'd like to know about your homes in Baner and Sus.",
    homesTitle: "Our two homes on the Pashan–Sus Road",
    heroScene: "verandah",
  },
  {
    area: "wakad",
    path: "/old-age-home-wakad-pune/",
    name: "Wakad",
    h1: "Old age home and senior citizen care in Wakad, Pune",
    metaTitle: "Senior Citizen Care & Old Age Home in Wakad | Swarnavihar",
    metaDescription:
      "Senior citizen care at Akshaya Nivas, Chowdhary Park, Wakad, for families in Wakad, Hinjewadi and Pimple Saudagar. Nursing, doctor visits and physiotherapy.",
    lede:
      "Akshaya Nivas is our home in Chowdhary Park, Wakad, close to Hinjewadi and Pimple Saudagar on the Pimpri-Chinchwad side of the city.",
    intro: [
      "Wakad has grown around the Hinjewadi IT park, and many families here work long hours with commutes to match. A parent who needs daily help, or who is recovering after a hospital stay, can be hard to look after at home when everyone is out from morning to evening.",
      "Akshaya Nivas is close enough that you can drop in on the way back from work rather than planning a trip across the city. Nurses are on duty on every shift, and a doctor visits regularly, so you aren't the only one keeping an eye on things.",
    ],
    areasServed: [
      { name: "Wakad", note: "Akshaya Nivas is in Chowdhary Park, behind Sentosa Elysium." },
      { name: "Hinjewadi", note: "For families working at the IT park and living nearby." },
      { name: "Pimple Saudagar", note: "A short drive from Wakad, on the same side of the city." },
    ],
    findingUs: [
      { branchId: "wakad", landmarks: "Laxmi Sadan Building in Chowdhary Park, behind the Sentosa Elysium apartments." },
    ],
    faqs: [
      { q: "Can we visit in the evening after work?", a: placeholder("Visiting hours for Akshaya Nivas to be confirmed by the owner.") },
      { q: "Does Akshaya Nivas take residents straight from hospital?", a: placeholder("To be confirmed: post-hospital admissions at this home and what the team needs from the discharge summary.") },
      { q: "Is there a doctor on call at night?", a: placeholder("To be confirmed: night-time doctor cover for Akshaya Nivas.") },
      { q: "We live in Hinjewadi. Is Wakad the nearest home?", a: sourced("Yes. Akshaya Nivas in Wakad is our closest home to Hinjewadi.") },
    ],
    whatsappMessage: "Hello, I'd like to know about Akshaya Nivas in Wakad.",
    heroScene: "tea",
  },
  {
    area: "sinhgad-road",
    path: "/old-age-home-sinhgad-road-pune/",
    name: "Sinhgad Road",
    h1: "Old age home on Sinhgad Road, Pune",
    metaTitle: "Old Age Home on Sinhgad Road, Pune | Amulya Nivas",
    metaDescription:
      "Amulya Nivas in Vadgaon Budruk, near Navale Bridge, for families on Sinhgad Road, in Dhayari and Kothrud. Nursing, doctor visits and physiotherapy.",
    lede:
      "Amulya Nivas is in Vadgaon Budruk, near Navale Bridge, for families along Sinhgad Road and in Dhayari and Kothrud in south-west Pune.",
    intro: [
      "Sinhgad Road is home to many long-settled Pune families, with parents who have lived in the same neighbourhood for decades. Moving them across the city, away from their temple, their market and their friends, can make a hard change harder.",
      "Amulya Nivas keeps them in familiar surroundings. It is in Kudale Pravesh Baug off Narayan Baug Road, near Navale Bridge on the Katraj bypass, so it is also easy to reach for family coming from other parts of the city.",
    ],
    areasServed: [
      { name: "Vadgaon Budruk", note: "Amulya Nivas is here, off Narayan Baug Road." },
      { name: "Dhayari", note: "Further along Sinhgad Road, and our nearest home for Dhayari families." },
      { name: "Kothrud", note: "Our nearest home for families in Kothrud." },
    ],
    findingUs: [
      { branchId: "sinhgad-road", landmarks: "Kudale Pravesh Baug, Narayan Baug Road, near Navale Bridge on the Katraj bypass, Vadgaon Budruk." },
    ],
    faqs: [
      { q: "Can my parent keep seeing their own family doctor?", a: placeholder("To be confirmed: whether residents' own doctors can visit or be consulted.") },
      { q: "Which hospital would my parent go to in an emergency?", a: placeholder("To be confirmed by the owner: the hospitals Amulya Nivas transfers residents to, and how families are informed.") },
      { q: "Can we bring our parent's own furniture or photographs?", a: placeholder("To be confirmed: what residents can bring from home.") },
      { q: "Is Amulya Nivas the nearest home for Kothrud?", a: sourced("Yes. Amulya Nivas on Sinhgad Road is our nearest home for families in Kothrud.") },
    ],
    whatsappMessage: "Hello, I'd like to know about Amulya Nivas on Sinhgad Road.",
    heroScene: "festival",
  },
  {
    area: "pimple-nilakh",
    path: "/old-age-home-pimple-nilakh-pune/",
    name: "Pimple Nilakh",
    h1: "Old age home in Pimple Nilakh, Pune",
    metaTitle: "Old Age Home in Pimple Nilakh, Pune | Near Aundh & Sangvi",
    metaDescription:
      "Swarnavihar's Pimple Nilakh home, for families in Pimple Nilakh, Aundh and Sangvi. Nursing on every shift, doctor visits and physiotherapy.",
    lede:
      "Our Pimple Nilakh home looks after parents from Pimple Nilakh, Aundh and Sangvi, close enough for the family to stay part of everyday life.",
    intro: [
      "Families in Pimple Nilakh, Aundh and Sangvi usually want two things at once: their parent cared for properly, and not so far away that every visit becomes an occasion. A home in the neighbourhood means grandchildren can drop by after school, and a forgotten pair of spectacles is a ten-minute errand, not a day out.",
      "Like all Swarnavihar homes, it is in a residential neighbourhood rather than a hospital setting, with nurses on every shift and regular doctor visits.",
    ],
    areasServed: [
      { name: "Pimple Nilakh", note: "The home is in Pimple Nilakh itself." },
      { name: "Aundh", note: "Our nearest home for families in Aundh." },
      { name: "Sangvi", note: "Our nearest home for families in Sangvi." },
    ],
    findingUs: [{ branchId: "pimple-nilakh", landmarks: "Address and landmarks to be confirmed by the owner." }],
    faqs: [
      { q: "When can we visit the Pimple Nilakh home?", a: placeholder("Visiting hours to be confirmed by the owner.") },
      { q: "Does the Pimple Nilakh home care for residents with dementia?", a: placeholder("To be confirmed: the level of dementia care at this home.") },
      { q: "Is there a lift, or are rooms on the ground floor?", a: placeholder("To be confirmed: building access and ground-floor rooms.") },
      { q: "We live in Aundh. Is this our nearest home?", a: sourced("Yes. For Aundh, Pimple Nilakh is our nearest home.") },
    ],
    whatsappMessage: "Hello, I'd like to know about your Pimple Nilakh home.",
    heroScene: "room",
  },
];

export const locationByArea = (area: AreaKey) => locationPages.find((l) => l.area === area)!;
