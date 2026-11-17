import type { Block } from "../blocks";
import { checklist, h2, h3, note, p, ul } from "../blocks";
import { editorial, placeholder } from "../types";
import type { BlogPost } from "./types";

const compare: Block = {
  type: "compare",
  columns: ["Caring at home", "Residential care"],
  rows: [
    { label: "Turning at night", a: "Needs an attendant awake through the night, every night.", b: "Night staff turn residents on a schedule." },
    { label: "Noticing problems early", a: "Depends on the attendant and on visiting nurses.", b: "Nurses on duty can spot fever, breathing changes or skin damage early." },
    { label: "Equipment", a: "You buy or rent a hospital bed, air mattress, commode, suction and more.", b: "Usually available in the home. Ask what's included." },
    { label: "Cover for leave and illness", a: "Falls to the family.", b: "The home arranges it." },
    { label: "Family life", a: "Your parent is with you, but care can take over the household.", b: "Visits become time together, not caregiving." },
    { label: "Familiar surroundings", a: "Their own home, their own room.", b: "A new place, made familiar with their own things." },
  ],
};

export const bedriddenHomeVsResidential: BlogPost = {
  slug: "bedridden-patient-care-at-home-vs-residential-care",
  title: "Bedridden patient care at home vs. in a residential facility",
  metaTitle: "Bedridden Patient Care: At Home or in a Care Home?",
  metaDescription:
    "What caring for a bedridden parent involves, the complications to watch for, and an honest comparison of care at home and in a residential care home.",
  excerpt:
    "Looking after a parent who can't get out of bed is round-the-clock work. Here's what good care involves, and how to decide whether home or a care facility is the right place for it.",
  category: "Health and care",
  published: "2026-11-16",
  scene: "room",
  shot: "A nurse adjusting pillows for a resident resting in a hospital bed",
  keyPoints: [
    "Good bedridden care means regular turning, skin checks, safe feeding, continence care and keeping the mind engaged.",
    "Pressure sores, chest infections, urine infections and stiff joints are the main risks, and most can be reduced with consistent care.",
    "Home care works when you have reliable trained attendants, nursing support and backup for nights and leave.",
    "A residential facility may be safer when needs are complex, nights are hard to cover, or family carers are exhausted.",
  ],
  medicalReview: placeholder("Medical review by a Swarnavihar consulting doctor or nursing lead: name, qualification and date to be added before publishing."),
  body: [
    p("A parent may become bedridden after a stroke, a fracture, a long illness or in the later stages of dementia. Sometimes it's temporary; sometimes it isn't. Either way, families suddenly find themselves responsible for care that nurses are trained for, often with little warning."),
    p("This guide explains what good care involves, and compares caring at home with care in a residential facility. It's general information, not medical advice. Your parent's doctor should guide their care plan."),

    h2("What good bedridden care involves"),
    h3("Turning and positioning"),
    p("Lying in one position puts constant pressure on the skin over bony areas: the lower back, hips, heels, elbows and the back of the head. Regular repositioning, often every two hours, or as the doctor or nurse advises, relieves that pressure. This continues through the night. Pillows between the knees and under the calves, and an air mattress, help further."),
    h3("Skin care"),
    p("Skin should be checked every day for redness that doesn't fade, blisters or broken skin, and kept clean and dry. Early redness is a warning sign: tell the nurse or doctor the same day."),
    h3("Eating and drinking safely"),
    p("Your parent should sit as upright as possible while eating and for a while afterwards, to reduce the risk of food going into the lungs. Watch for coughing or a wet-sounding voice during meals; these can be signs of swallowing problems that a doctor should assess. Some people need soft food, thickened drinks, or tube feeding."),
    h3("Continence and hygiene"),
    p("Prompt changing, gentle cleaning and good catheter care (if they have one) protect the skin and reduce infections. Mouth care matters too, especially for people who aren't eating normally."),
    h3("Movement and breathing"),
    p("Gentle exercises, done by a physiotherapist or under their guidance, help prevent stiff joints and keep up strength. Breathing exercises and sitting up help keep the lungs clear."),
    h3("The person, not just the body"),
    p("Being confined to bed is lonely and frightening. Conversation, music, prayers, the newspaper read aloud, and visits from grandchildren matter as much as the physical care."),

    h2("Complications to watch for"),
    ul(
      "Pressure sores (bedsores)",
      "Chest infections, including pneumonia from food or saliva entering the lungs",
      "Urine infections, especially with a catheter",
      "Stiff joints and muscle wasting",
      "Blood clots in the legs",
      "Constipation and dehydration",
      "Low mood and depression",
    ),
    note(
      "Call the doctor promptly if you notice",
      "Fever; faster or difficult breathing; new confusion or drowsiness; a red, swollen or painful calf; skin that's broken or blackened; very little urine; or refusing food and drink. If your parent is struggling to breathe or is unresponsive, call an ambulance.",
      "warning",
    ),

    h2("Caring at home"),
    p("Many families want to care for a parent at home, and with the right support it can work well. You'll usually need:"),
    checklist(
      "A hospital bed (so the head can be raised) and an air mattress",
      "Trained attendants, typically two shifts to cover day and night",
      "A visiting nurse for procedures such as dressings, catheter care or injections",
      "A doctor who can visit, or who you can reach quickly",
      "Physiotherapy at home",
      "A commode, a wheelchair, and supplies such as diapers, under-pads and dressings",
      "A plan for when an attendant is ill, on leave or leaves without notice",
    ),
    p("The hardest part is usually reliability, especially at night and when attendants are on leave. It's also very hard for a family member to supervise care while working."),

    h2("Care in a residential facility"),
    p("In a care home set up for bedridden residents, nurses and attendants work in shifts, so turning, feeding and checks continue through the night. Problems such as fever or skin damage are more likely to be noticed early, and equipment is usually on hand."),
    p("The trade-off is a move away from home. That can be eased by bringing familiar things, visiting often, and choosing a home close to family."),

    h2("Comparing the two"),
    compare,

    h2("Questions to ask either way"),
    ul(
      "Who will turn my parent at 3 a.m., and how will I know it's happened?",
      "Who checks the skin every day, and what happens if there's redness?",
      "How is feeding done safely, and who decides if the diet needs to change?",
      "What happens if my parent develops a fever at night?",
      "What will the total monthly cost be, including attendants, nurses, supplies and equipment?",
    ),

    h2("If you're the main carer"),
    p("Caring for a bedridden parent is physically heavy work, and lifting and turning someone without training can injure your back. Ask a nurse or physiotherapist to show you safe ways to move your parent, and use slide sheets or a second person for turning. Broken nights add up quickly. If you're exhausted, irritable or unwell yourself, that's a sign the care needs to be shared, not that you're failing."),

    h2("Making the decision"),
    p("There's no single right answer. Home care can be the best choice when you have dependable help and your parent's needs are stable. Residential care often makes sense when needs are complex, nights can't be covered, or the family carer is exhausted. And it doesn't have to be permanent: some parents recover enough to return home after a period of care."),
    p("If you'd like to understand how we care for bedridden residents, see our [bedridden patient care page](/service/bedridden-patient-care-in-pune/), or call us to talk it through."),
  ],
  faqs: [
    { q: "How often should a bedridden person be turned?", a: editorial("Often every two hours, but it depends on their skin, their mattress and their condition. Ask their doctor or nurse for a schedule that suits them, and keep it going through the night.") },
    { q: "Can bedsores be prevented completely?", a: editorial("Not always, especially in people who are very frail, but regular turning, a good mattress, clean dry skin and good nutrition prevent most of them. Treat any early redness seriously.") },
  ],
  related: ["/service/bedridden-patient-care-in-pune/", "/service/nursing-care-in-pune/", "/post-hospitalization-care-for-senior-citizens/"],
};
