import { checklist, h2, note, p, ul } from "../blocks";
import { editorial } from "../types";
import type { BlogPost } from "./types";

export const checkBeforeAdmitting: BlogPost = {
  slug: "what-to-check-before-admitting-a-parent-to-an-old-age-home",
  title: "What to check before admitting a parent to an old age home",
  metaTitle: "Checklist: Before Admitting a Parent to an Old Age Home",
  metaDescription:
    "A practical checklist for families: the agreement, fees, staffing, medical care, safety, hygiene, food, visiting and what to hand over on admission day.",
  excerpt:
    "You've found a home that feels right. Before admission day, use this checklist to make sure there are no surprises, for you or for your parent.",
  category: "Choosing care",
  published: "2026-11-16",
  scene: "daily",
  shot: "A daughter reading through papers with a care home manager",
  keyPoints: [
    "Read the agreement carefully, especially fees, deposits, notice periods and what happens if health changes.",
    "Confirm staffing at night, the doctor's visits and the emergency plan in writing.",
    "Check safety and hygiene with your own eyes, not just from the brochure.",
    "Prepare medical records and a one-page \"about my parent\" note for the staff.",
  ],
  body: [
    p("Choosing a home is one decision. Admission is another. This checklist is for the stage after you've found a home you like: it helps you confirm the details, avoid surprises, and give your parent the best possible start. You might like to print it or keep it open on your phone during your final visit."),

    h2("The agreement"),
    p("Ask for the agreement before admission day, and read it at home without being rushed."),
    checklist(
      "The monthly fee, and exactly what it includes",
      "What is charged extra: medicines, diapers and dressings, doctor and specialist visits, physiotherapy, tests, ambulance, hospital stays",
      "The deposit: how much, and when and how it's refunded",
      "How much notice either side must give, and whether any fee is kept",
      "How often fees can rise, and by how much",
      "What happens to fees while your parent is in hospital",
      "What happens if your parent's care needs increase, or become more than the home can manage",
      "Who the home will contact in an emergency, and in what order",
    ),

    h2("Staff and medical care"),
    checklist(
      "How many nurses and attendants are on duty at night",
      "The nurses' qualifications",
      "How often the doctor visits, and how a doctor is reached at night",
      "Whether your parent's own doctor can still see them",
      "Who writes the care plan, and when it will be reviewed with you",
      "How medicines are stored, given and recorded",
      "Which hospital your parent would be taken to in an emergency, and how you'd be told",
    ),

    h2("Safety"),
    checklist(
      "Grab rails in bathrooms and non-slip floors",
      "Call bells within reach of the bed and in the bathroom",
      "A lift or a ground-floor room, if your parent can't manage stairs",
      "Fire safety equipment and clear exits",
      "Secure entrances, if your parent may wander",
      "How falls are prevented, and what happens after one",
    ),

    h2("Hygiene and comfort"),
    checklist(
      "Clean bathrooms and toilets (check more than one)",
      "How often bed linen and clothes are washed",
      "Ventilation, daylight and a comfortable temperature",
      "Whether the room has space for your parent's own things",
    ),

    h2("Food"),
    checklist(
      "A typical week's menu",
      "Whether special diets are provided: diabetic, soft, low-salt, Jain or others your parent follows",
      "Who helps residents who eat slowly or need feeding",
      "Whether drinking water is offered regularly through the day",
    ),

    h2("Daily life and staying in touch"),
    checklist(
      "Visiting hours, and whether you can join a meal",
      "Activities offered each week",
      "How and how often you'll get updates about your parent",
      "Whether your parent can go out for a family event or a festival",
      "How their money and valuables are handled",
    ),

    h2("Warning signs on a visit"),
    p("Most homes are run by people who care. But a few things should make you pause and ask more questions before you go ahead:"),
    ul(
      "Residents left in bed or in nightclothes in the middle of the day",
      "A strong smell of urine that doesn't clear",
      "Staff who talk about residents in front of them, or speak to them harshly",
      "Doors you're not allowed through, or rooms you can't see",
      "Vague answers about night staff, the doctor, or what happens in an emergency",
      "Pressure to pay or sign the same day",
    ),
    p("One of these on its own may have a simple explanation, so ask. Several together are a reason to keep looking."),

    h2("Your parent's wishes and rights"),
    p("Moving into a home doesn't mean your parent stops making decisions. Ask how the home involves residents in everyday choices: what to wear, when to bathe, what to eat, whether to join an activity. Ask how they handle a resident who refuses medicines or care. And ask how you, or your parent, can raise a concern, and who will listen."),
    p("If your parent has made their wishes known about hospital treatment or the end of life, share them with the home and their doctor, and make sure they're written in the care file."),

    h2("Talk to your parent"),
    p("As far as their health allows, make sure your parent understands where they're going and why, and has had a say. Ask them what would help them settle: a favourite chair, photographs, their own bedsheet, a radio. These small things make a strange room feel like theirs."),

    h2("What to hand over on admission day"),
    checklist(
      "A current list of medicines and doses, plus a week's supply",
      "Recent prescriptions, test reports and hospital discharge summaries",
      "Contact details for their regular doctor and specialists",
      "Identity and address documents the home asks for",
      "A one-page note about your parent: their routine, food likes and dislikes, what calms them, their prayers, what they like to be called",
      "Clothes labelled with their name, spectacles, hearing aid, dentures, walking aid",
    ),

    note(
      "The first few weeks",
      "Most people take a few weeks to settle. Visit often at first, but keep visits calm and short if goodbyes are upsetting. Ask the staff how your parent is eating, sleeping and getting on, and tell them anything you notice.",
    ),

    p("If you're considering Swarnavihar, bring this list on your visit and ask us anything on it. See [how admission works](/admission/) or [send us a question](/contact/)."),
  ],
  faqs: [
    { q: "Should we sign the agreement on the day of admission?", a: editorial("Better not. Ask for it a few days before, read it at home, and ask about anything that isn't clear. A good home will be happy to explain.") },
    { q: "What should we do if our parent is unhappy after moving in?", a: editorial("Give it a few weeks: unsettledness at first is common. Talk to the staff about what's bothering them, since many problems have simple fixes. If concerns continue, raise them with the manager, and check what the agreement says about notice.") },
  ],
  related: ["/how-to-choose-the-right-old-age-home-in-pune/", "/understanding-old-age-home-charges-in-pune/", "/admission/"],
};
