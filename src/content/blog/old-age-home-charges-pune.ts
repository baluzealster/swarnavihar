import type { Block } from "../blocks";
import { checklist, h2, h3, note, p, ul } from "../blocks";
import { editorial } from "../types";
import type { BlogPost } from "./types";

const worksheet: Block = {
  type: "compare",
  columns: ["Home A", "Home B"],
  rows: [
    { label: "Monthly fee (room and care level quoted)", a: "", b: "" },
    { label: "Medicines (estimate per month)", a: "", b: "" },
    { label: "Diapers, dressings, other supplies", a: "", b: "" },
    { label: "Physiotherapy sessions", a: "", b: "" },
    { label: "Doctor and specialist visits", a: "", b: "" },
    { label: "Personal attendant, if needed", a: "", b: "" },
    { label: "Realistic monthly total", a: "", b: "" },
    { label: "Deposit, and when it's refunded", a: "", b: "" },
    { label: "Notice period", a: "", b: "" },
    { label: "Last fee increase, and how often", a: "", b: "" },
  ],
};

export const oldAgeHomeChargesPune: BlogPost = {
  slug: "understanding-old-age-home-charges-in-pune",
  title: "Understanding old age home charges in Pune",
  metaTitle: "Old Age Home Charges in Pune: What You'll Pay For",
  metaDescription:
    "What old age home charges in Pune usually cover, what costs extra, why fees vary so much, and how to compare homes fairly using a simple worksheet.",
  excerpt:
    "Two homes quoting the same monthly fee can end up costing very different amounts. Here's what the charges usually cover, what's extra, and how to compare fairly.",
  category: "Costs and admission",
  published: "2026-11-16",
  scene: "gate",
  shot: "A family discussing a written estimate at a table",
  keyPoints: [
    "Fees depend mostly on the room and the level of care your parent needs.",
    "Medicines, diapers and dressings, physiotherapy, specialist visits and hospital trips are often charged on top.",
    "Compare a realistic monthly total, not the headline fee.",
    "Read the terms on deposits, notice periods, increases and hospital stays before you sign.",
  ],
  body: [
    p("\"How much does it cost?\" is usually the first question families ask, and one of the hardest to get a straight answer to. In Pune, as elsewhere, old age home charges vary widely, from charitable homes run by trusts to homes with private rooms and nursing around the clock. Even within one home, two residents can pay quite different amounts."),
    p("This guide doesn't quote a single figure, because any number without knowing your parent's needs would be misleading. Instead it explains what you're paying for, so you can understand any quote and compare homes fairly."),

    h2("What usually decides the monthly fee"),
    h3("The room"),
    p("A private room costs more than a twin-sharing room. An attached bathroom, a balcony or more space can add to the price."),
    h3("The level of care"),
    p("This is usually the biggest factor. A parent who is largely independent needs much less staff time than one who needs help with every meal, is living with advanced dementia, or is bedridden. Most homes group care into levels: something like residential, assisted living, nursing, and specialised care."),
    h3("Medical needs and equipment"),
    p("Oxygen, BiPAP, suction, catheters, tube feeding and frequent dressings all need more nursing time and supplies."),
    h3("Where the home is"),
    p("Property and staff costs differ across the city, and that shows in fees."),

    h2("What's often included"),
    p("Every home is different, so always ask. Commonly included items are:"),
    ul(
      "The room, furniture and housekeeping",
      "Meals and tea",
      "Help with daily living, at the level agreed",
      "Nursing care, for homes that provide it",
      "Laundry",
      "Routine doctor visits (in some homes)",
    ),

    h2("What's often charged extra"),
    ul(
      "Medicines, usually at cost",
      "Diapers, under-pads, dressings, catheters and other consumables",
      "Nutritional supplements and special feeds",
      "Physiotherapy sessions beyond any included number",
      "Specialist consultations and visits",
      "Blood tests and X-rays",
      "Ambulance trips and hospital stays",
      "A dedicated one-to-one attendant, if your parent needs one",
      "Personal items: toiletries, haircuts, clothes",
    ),
    p("For a parent with significant care needs, the extras can add a meaningful amount every month. That's why the headline fee alone isn't a fair comparison."),

    h2("One-time charges and the fine print"),
    checklist(
      "Admission or registration fee: is there one, and is it refundable?",
      "Security deposit: how much, and when exactly is it returned?",
      "Notice period: how much notice is needed to leave, and is any fee kept?",
      "Fee increases: how often, and by how much in the last few years?",
      "Hospital stays: do you keep paying the full fee while your parent is in hospital?",
      "Change in care level: how is the fee reviewed if needs increase?",
    ),

    h2("How to compare homes fairly"),
    p("Ask each home for a written, itemised estimate based on your parent's actual needs, ideally after they've seen recent medical reports. Then fill in a simple worksheet like this one for each home you're considering:"),
    worksheet,
    p("The \"realistic monthly total\" is the number to compare. A home with a slightly higher fee that includes more can turn out cheaper, and less stressful, than one with a low fee and many extras."),

    note(
      "Be cautious if",
      "a home won't give you a written estimate, can't tell you what's extra, or asks for a large non-refundable payment before you've seen the agreement.",
      "warning",
    ),

    h2("Planning for the cost as a family"),
    p("Care is often needed for years, not months, so it helps to plan beyond the first invoice. A few conversations now can prevent hard ones later."),
    ul(
      "Agree among brothers and sisters who contributes what, and write it down, even informally.",
      "Look at what your parent's own pension, rent or savings can cover each month.",
      "Keep some money aside for hospital stays and new equipment, which often come without warning.",
      "Expect the fee to change if your parent's needs change, and ask the home how that's decided.",
      "Keep every invoice and receipt in one place. It makes it easier to see what you're spending and to discuss tax treatment with your accountant.",
    ),
    p("If your parent is able to take part, include them. Many older people worry about being a burden; knowing that the costs are planned and shared can be a real relief to them."),

    h2("Questions to ask about any quote"),
    checklist(
      "Is this fee for my parent's actual care level, or a starting price?",
      "What would make the fee go up next month?",
      "Which extras did most residents at this level pay for last month?",
      "Is anything charged per visit or per use that I haven't been told about?",
      "Can I see a sample invoice for a resident with similar needs (with personal details removed)?",
    ),

    h2("Comparing with care at home"),
    p("Families often compare a home's fee with the cost of caring at home. For a fair comparison, add up everything home care really involves: attendants for day and night, cover when they're on leave, a visiting nurse, doctor visits, equipment such as a hospital bed and air mattress, supplies, food, and the time family members spend managing it all. For parents with high care needs, the gap is often smaller than it first looks."),

    h2("How Swarnavihar works out fees"),
    p("We don't publish a single price, because it depends on the room and on how much care your parent needs. After a conversation and a look at their medical reports, we give you a written estimate that shows what's included and what isn't. You can read more about our [admission process, care levels and fees](/admission/), or [ask us for an estimate](/contact/)."),
  ],
  faqs: [
    { q: "Why won't homes give a price over the phone?", a: editorial("Because the fee depends on your parent's care needs, which are hard to judge in a short call. A home can usually give a rough idea, but a fair figure comes after they understand your parent's health.") },
    { q: "Do we pay the full fee while our parent is in hospital?", a: editorial("It depends on the home. Many keep the room and charge some or all of the fee. Ask before you sign, so there are no surprises.") },
    { q: "Are cheaper homes worse?", a: editorial("Not necessarily, and expensive isn't always better. Compare what's actually provided: staffing at night, nursing, the doctor's visits, food and hygiene. Then compare the realistic monthly total.") },
  ],
  related: ["/admission/", "/what-to-check-before-admitting-a-parent-to-an-old-age-home/", "/how-to-choose-the-right-old-age-home-in-pune/"],
};
