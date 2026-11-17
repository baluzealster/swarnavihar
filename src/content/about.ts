import { editorial, placeholder, sourced, type Fact } from "./types";

/**
 * About Swarnavihar and our care philosophy.
 *
 * Sources: the old /about/ and /facilities/ pages (status "sourced": owner to confirm).
 * Not on the old site, so placeholders: founding year, founders, how it began, resident
 * numbers, registrations. Doctors are described by specialty only; names are published
 * only with each doctor's written consent.
 */
export const aboutPage = {
  path: "/about/",
  h1: "About Swarnavihar",
  metaTitle: "About Swarnavihar Old Age Homes, Pune",
  metaDescription:
    "Who we are, how we care for your parents, and the people who look after them: Swarnavihar's old age homes in Pune and Bengaluru.",
  lede:
    "Swarnavihar runs old age homes in ordinary neighbourhoods of Pune and Bengaluru, where older parents get help with daily life, nursing care and regular doctor visits, without having to live in a hospital.",
};

export const whoWeAre: Fact<string>[] = [
  sourced(
    "Swarnavihar (also known as Swarnavihar Retirement Homes) looks after older people who can no longer manage safely on their own: some need a little help each day, some need nursing around the clock, and some are living with dementia or are bedridden.",
  ),
  sourced(
    "Our homes are in Baner, Sus, Wakad, Sinhgad Road and Pimple Nilakh in Pune, and Gottigere in Bengaluru. Each is a residential building in a neighbourhood, not a hospital ward, so that families can visit easily and residents can live as normally as their health allows.",
  ),
];

/** The owner's own story: not on the old site. */
export const ourStory = placeholder(
  "How Swarnavihar began, who started it and when, and why. To be written with the owner: the founding year and founders' story aren't published anywhere yet.",
);

export interface Principle {
  title: string;
  detail: string;
  /** "sourced" where the old site states this value; "placeholder" where the owner must confirm it reflects practice. */
  status: "sourced" | "placeholder";
}

/** Our care philosophy. Each line is a commitment the owner signs off before launch. */
export const philosophy: Principle[] = [
  {
    title: "Kindness first",
    detail: "Compassion, patience and kindness in every task, especially the small, private ones like bathing, dressing and helping someone to the toilet.",
    status: "sourced",
  },
  {
    title: "A person, not a diagnosis",
    detail: "We want to know who your parent was before they needed care: their work, their food, their prayers, the songs they like. Care is planned around that person.",
    status: "placeholder",
  },
  {
    title: "Their routine, where possible",
    detail: "Waking time, tea, the newspaper, an evening walk. Keeping familiar habits helps people settle, and matters even more for someone with dementia.",
    status: "placeholder",
  },
  {
    title: "Safe, without taking away their freedom",
    detail: "A secure building and staff who keep watch, while residents still choose how to spend their day.",
    status: "sourced",
  },
  {
    title: "Medical care that's watched closely",
    detail: "Nurses on every shift and doctors who visit regularly, so that changes in health are noticed early rather than at a crisis.",
    status: "sourced",
  },
  {
    title: "Families stay close",
    detail: "Homes near where you live, regular news about your parent, and a welcome whenever you visit.",
    status: "placeholder",
  },
  {
    title: "Honest about what we can do",
    detail: "We'll tell you plainly if your parent's needs are beyond what a home can safely provide, and help you find the right place, even if it isn't us.",
    status: "placeholder",
  },
  {
    title: "Promises kept",
    detail: "Integrity isn't negotiable: what we agree with you is what we do.",
    status: "sourced",
  },
];

/** Specialties on the visiting panel, from the old /about/ page. No names without consent. */
export const panelSpecialties = sourced([
  "Physicians (MD Medicine), including diabetologists",
  "A psychiatrist (MD Psychiatry)",
  "A neurologist (DM Neurology)",
  "An orthopaedic surgeon (MS Orthopaedics)",
  "A dermatologist",
  "Physiotherapists",
]);

export const teamNote = editorial(
  "We publish our doctors' names and photographs only with their written consent. Ask us and we'll tell you who visits your parent's home.",
);

/** Things families should be able to check. Hidden from the page until real details exist. */
export const registrations = placeholder("Registrations and licences held by each home, to be provided by the owner.");
