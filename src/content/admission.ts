import { editorial, placeholder, type Fact, type FactStatus } from "./types";

/**
 * Admission and fees page. No prices are published until the owner provides real ranges
 * (fact sheet item 9): the page explains what affects the cost instead, which is what
 * families searching "old age home charges in Pune" need first.
 */
export const admissionPage = {
  path: "/admission/",
  h1: "Admission, care levels and fees",
  metaTitle: "Admission Process, Care Levels and Fees | Swarnavihar",
  metaDescription:
    "How admission works at Swarnavihar's Pune old age homes, the levels of care, what affects the monthly fee and what to bring. Ask for a written estimate.",
  lede:
    "How your parent moves in, from the first call to the first week, and how the monthly fee is worked out from the room and the level of care they need.",
};

/**
 * "Packages": the levels of care families can choose between. Who each level suits is
 * general guidance; whether Swarnavihar offers it, and at what price, is the owner's to
 * confirm, so prices stay out until real ranges exist.
 */
export const careLevels: { title: string; suits: string; typically: string[]; price: Fact<string> }[] = [
  {
    title: "Residential care",
    suits: "Parents who are largely independent but shouldn't be living alone.",
    typically: ["Room and meals", "Company and daily activities", "Someone on hand day and night", "Help with medicines"],
    price: placeholder("Monthly range to be provided by the owner"),
  },
  {
    title: "Assisted living",
    suits: "Parents who need help each day with bathing, dressing, eating or moving around.",
    typically: ["Everything in residential care", "Daily help with personal care", "Support to walk and move safely"],
    price: placeholder("Monthly range to be provided by the owner"),
  },
  {
    title: "Nursing care",
    suits: "Parents with conditions that need a nurse every day: injections, wounds, catheters, oxygen.",
    typically: ["Everything in assisted living", "Nursing procedures and close monitoring", "More frequent doctor review"],
    price: placeholder("Monthly range to be provided by the owner"),
  },
  {
    title: "Specialised care",
    suits: "Parents living with dementia, who are bedridden, on tube feeding or BiPAP, or recovering after hospital.",
    typically: ["A care plan for the condition", "More staff time, day and night", "Equipment such as air mattresses or BiPAP"],
    price: placeholder("Monthly range to be provided by the owner"),
  },
];

/** General drivers of cost in residential elder care. Not a claim about our prices. */
export const costFactors: { title: string; detail: string; status: FactStatus }[] = [
  { title: "Type of room", detail: "A private room costs more than a twin-sharing room.", status: "editorial" },
  { title: "Level of care", detail: "A parent who is largely independent needs less staff time than one who needs help with every meal, or is bedridden.", status: "editorial" },
  { title: "Nursing and medical equipment", detail: "Oxygen, BiPAP, suction, catheters and feeding tubes all need more nursing time and supplies.", status: "editorial" },
  { title: "Therapy", detail: "How many physiotherapy sessions your parent needs each week.", status: "editorial" },
  { title: "Medicines and consumables", detail: "Medicines, diapers and dressings are often charged at cost, separately from the monthly fee.", status: "editorial" },
  { title: "Hospital visits", detail: "Specialist consultations, tests outside the home and ambulance trips are usually extra.", status: "editorial" },
];

/** What the monthly fee covers at Swarnavihar: all to be confirmed by the owner. */
export const included: Fact<string>[] = [
  placeholder("Room, furniture and housekeeping"),
  placeholder("All meals, with special diets"),
  placeholder("Nursing care on every shift"),
  placeholder("Regular doctor visits"),
  placeholder("Laundry"),
  placeholder("Help with bathing, dressing and personal care"),
];

export const priceNote = placeholder(
  "Monthly price ranges for each room type and level of care, to be provided by the owner. Until then, families get a written estimate after the care assessment.",
);

export const documents: Fact<string>[] = [
  editorial("A current list of medicines and doses"),
  editorial("Recent prescriptions, test reports and any hospital discharge summaries"),
  editorial("Your parent's regular doctor's contact details"),
  placeholder("Identity and address proof for your parent and the family member responsible (owner to confirm)"),
  placeholder("Passport-size photographs (owner to confirm)"),
];

export const admissionFaqs: { q: string; a: Fact<string> }[] = [
  { q: "How much does an old age home cost in Pune?", a: editorial("It varies widely between homes and between residents in the same home, mainly with the type of room and how much nursing care is needed. Ask every home you consider for a written estimate that lists what is included and what is charged extra, so you can compare like with like.") },
  { q: "How do we get an exact figure for our parent?", a: editorial("Tell us about your parent's health and daily needs, ideally with recent medical reports. After the care assessment we give you a written estimate.") },
  { q: "Is there a security deposit?", a: placeholder("To be confirmed by the owner: deposit amount and refund terms.") },
  { q: "Are medicines included in the monthly fee?", a: placeholder("To be confirmed by the owner.") },
  { q: "Can my parent come for a short stay first?", a: placeholder("Short-stay and respite policy to be confirmed.") },
  { q: "How quickly can my parent move in?", a: placeholder("To be confirmed: typical time from first call to admission, and urgent admissions after hospital discharge.") },
];
