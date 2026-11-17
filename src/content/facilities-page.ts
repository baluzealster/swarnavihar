import type { Scene } from "@/components/ui/Illustration";
import { placeholder, sourced, type Fact } from "./types";

/**
 * Facilities and amenities. Everything listed here comes from the old /facilities/ page
 * (status "sourced") unless marked placeholder. Room sizes, visiting hours, lifts, CCTV
 * and wheelchair access aren't stated anywhere yet, so they stay placeholders.
 */
export const facilitiesPage = {
  path: "/facilities/",
  h1: "Facilities and amenities",
  metaTitle: "Facilities at Our Old Age Homes in Pune | Swarnavihar",
  metaDescription:
    "Rooms, home-style food, laundry, activities, nursing, oxygen and BiPAP, physiotherapy and tests at the home: what daily life looks like at Swarnavihar.",
  lede:
    "What your parent's day-to-day life looks like with us: where they sleep and eat, who helps them, what there is to do, and the medical support close at hand.",
};

export interface FacilityGroup {
  id: string;
  title: string;
  intro: string;
  items: Fact<string>[];
  scene: Scene;
  shot: string;
}

export const facilityGroups: FacilityGroup[] = [
  {
    id: "rooms",
    title: "Rooms",
    intro: "A room should feel like their own, with their photographs, their shawl and their things around them.",
    items: [
      placeholder("Private and twin-sharing rooms (types and availability vary by home; owner to confirm)"),
      placeholder("Attached bathrooms with grab rails (owner to confirm per home)"),
      placeholder("Hospital beds and air mattresses for residents who need them (owner to confirm)"),
      placeholder("Families may bring familiar furniture, photographs and belongings (owner to confirm what's allowed)"),
    ],
    scene: "room",
    shot: "A sunlit twin-sharing room with a family photograph on the side table",
  },
  {
    id: "food",
    title: "Food",
    intro: "Good food matters to health and to happiness, so meals are part of the care, not an afterthought.",
    items: [
      sourced("Nutritious meals prepared for residents every day"),
      placeholder("Home-style vegetarian meals, with tea and snacks morning and evening (owner to confirm menu and timings)"),
      placeholder("Diets for diabetes, soft and pureed food, and low-salt meals when a doctor advises them (owner to confirm)"),
      sourced("Help with eating and drinking for residents who need it"),
    ],
    scene: "meal",
    shot: "Lunch at the dining table: dal, rice, sabzi and chapati",
  },
  {
    id: "daily-living",
    title: "Help with daily living",
    intro: "Attendants are on call for the everyday tasks that have become hard, done patiently and with privacy.",
    items: [
      sourced("Bathing, grooming and dressing"),
      sourced("Help with toileting and continence care"),
      sourced("Turning and repositioning in bed to prevent bedsores"),
      sourced("Laundry: residents' clothes washed and dried on a regular schedule"),
      sourced("Housekeeping of rooms and common areas"),
    ],
    scene: "daily",
    shot: "An attendant walking with a resident along a bright corridor",
  },
  {
    id: "activities",
    title: "Activities",
    intro: "A day with something to look forward to: company, music, a game, a festival.",
    items: [
      sourced("Indoor games such as board games"),
      sourced("Crosswords, sudoku and other mental exercises"),
      sourced("Gentle physical exercise and meditation"),
      sourced("Drawing, painting and music, including bhajans"),
      sourced("Festivals celebrated together"),
    ],
    scene: "festival",
    shot: "Residents singing together at a festival celebration",
  },
];

/** Medical support available in the homes: summary here, detail on /medical-care/. */
export const medicalSummary: Fact<string>[] = [
  sourced("Nursing care 24 hours a day: medicines, vital signs, wound and pressure-area care"),
  sourced("Regular doctor visits from a panel of physicians and specialists"),
  sourced("Oxygen, BiPAP and suction under doctor and nurse supervision"),
  sourced("Ryle's tube (nasal) and PEG feeding"),
  sourced("Physiotherapy inside the home"),
  sourced("Blood tests and mobile X-rays at the home, through partner labs"),
  sourced("Medicines supplied through partner pharmacies"),
  sourced("Ambulance service for emergencies"),
];

/** Safety and access: none of this is on the old site yet. */
export const safety: Fact<string>[] = [
  placeholder("Lift or ground-floor rooms (to be confirmed for each home)"),
  placeholder("Wheelchair access to entrances, rooms and bathrooms (to be confirmed)"),
  placeholder("Call bells in rooms (to be confirmed)"),
  placeholder("CCTV in common areas and entrances, never in rooms or bathrooms (to be confirmed)"),
  placeholder("Fire safety equipment and evacuation plan (to be confirmed)"),
  sourced("Security, with residents protected from intruders"),
  placeholder("Secure entrances so residents who may wander are kept safe (to be confirmed for each home)"),
];

export const visiting = placeholder(
  "Visiting hours and how families can join meals or festivals, to be confirmed for each home.",
);
