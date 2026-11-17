import { checklist, h2, h3, note, p, ul } from "../blocks";
import { editorial, placeholder } from "../types";
import type { BlogPost } from "./types";

export const postHospitalizationCare: BlogPost = {
  slug: "post-hospitalization-care-for-senior-citizens",
  title: "Post-hospitalization care for senior citizens",
  metaTitle: "Post-Hospitalization Care for Senior Citizens | Swarnavihar",
  metaDescription:
    "The weeks after hospital are a risky time for older people. What to ask before discharge, setting up home, warning signs, and when short-term care helps.",
  excerpt:
    "Coming home from hospital is a relief, but the next few weeks are when many older people struggle. A little planning makes recovery safer and smoother.",
  category: "Health and care",
  published: "2026-11-16",
  scene: "recovery",
  shot: "A physiotherapist helping an older man walk with a frame",
  keyPoints: [
    "Older people often leave hospital weaker than before, on new medicines, and at higher risk of falls and confusion.",
    "Before discharge, get the summary, the medicine list, follow-up dates and the warning signs in writing.",
    "Set up the home before they arrive: bed, toilet, lighting and a clear path.",
    "If home can't safely provide the care needed yet, a short stay in a care home can bridge the gap.",
  ],
  medicalReview: placeholder("Medical review by a Swarnavihar consulting physician: name, qualification and date to be added before publishing."),
  body: [
    p("When a parent is discharged from hospital, the family's first feeling is usually relief. But for older people, the weeks after a hospital stay can be fragile. Days in bed weaken muscles quickly. New medicines can cause dizziness or confusion. And the home that was fine before may now have hazards: a high bed, a slippery bathroom, stairs."),
    p("This guide explains how to plan for a safe recovery. It's general information, not medical advice. Always follow the instructions of your parent's doctors."),

    h2("Why the first weeks matter"),
    ul(
      "Weakness: muscle strength and balance can drop noticeably after even a short stay in bed.",
      "Falls: weakness, new medicines and an unfamiliar routine make falls more likely.",
      "Confusion: many older people are confused for days or weeks after an illness or an operation (delirium).",
      "Medicines: new prescriptions, changed doses and stopped medicines are easy to mix up.",
      "Eating and drinking: appetite is often poor, which slows healing.",
      "Readmission: some problems, if missed, lead back to hospital.",
    ),

    h2("Before you leave hospital"),
    p("Ask the ward team for the following, and keep everything together in one folder:"),
    checklist(
      "The discharge summary: diagnosis, treatment given, and any procedures",
      "A complete medicine list: what's new, what's changed, what's stopped, and for how long",
      "Follow-up appointments and tests, with dates",
      "Wound, catheter or drain care instructions, if any",
      "Diet advice, including whether food needs to be soft or drinks thickened",
      "Physiotherapy advice: what your parent can and can't do yet",
      "The warning signs to watch for, and who to call",
      "Any equipment they'll need: walker, commode, hospital bed, oxygen",
    ),
    p("If something isn't clear, ask before you leave. It's much harder to get answers once you're home."),

    h2("Getting home ready"),
    ul(
      "If possible, set up a bedroom on the ground floor, close to a toilet.",
      "Check the bed height: they should be able to sit with feet flat on the floor.",
      "Put a commode or urinal by the bed for nights.",
      "Clear the path from bed to toilet, remove loose rugs, and add night lights.",
      "Fit grab rails in the bathroom, and use a shower chair.",
      "Keep the phone, water, spectacles and medicines within reach.",
    ),

    h2("The first few days"),
    h3("Medicines"),
    p("Go through the discharge list against the medicines at home, and put away anything that's been stopped. A weekly pill organiser helps. If you're unsure about any medicine, ask the doctor or pharmacist."),
    h3("Moving safely"),
    p("Encourage gentle, regular movement as advised: sitting out of bed for meals, short walks with support. Staying in bed \"to rest\" usually slows recovery. A physiotherapist can plan exercises to rebuild strength and balance."),
    h3("Food and fluids"),
    p("Small, frequent meals and regular drinks help. Protein (dal, eggs, paneer, curd) supports healing. If they're eating very little, tell the doctor."),
    h3("Sleep and confusion"),
    p("Keep a regular routine, daylight during the day and dim lights at night. Spectacles and hearing aids help people stay oriented. Familiar faces and voices are reassuring."),

    note(
      "Call the doctor, or go to hospital, if you notice",
      "A fever; breathlessness or chest pain; new or worsening confusion or drowsiness; a wound that becomes red, hot, swollen or starts to discharge; passing very little urine; a painful, swollen calf; a fall; or not eating or drinking. In an emergency, call an ambulance.",
      "warning",
    ),

    h2("Organising care as a family"),
    p("Recovery goes more smoothly when everyone knows who is doing what. A few simple habits help:"),
    ul(
      "Choose one family member as the main contact for doctors, so messages don't get lost.",
      "Keep a notebook by the bed: medicines given, meals, sleep, bowel movements, and anything unusual.",
      "Put follow-up appointments and tests in a shared calendar, with who will take your parent.",
      "Take the discharge folder and the notebook to every appointment.",
      "If an attendant is helping, show them the warning signs and who to call.",
    ),

    h2("Avoiding a return to hospital"),
    p("Some readmissions can't be avoided. Others can, with steady attention to the basics:"),
    ul(
      "Give medicines exactly as prescribed, and finish any course of antibiotics.",
      "Keep every follow-up appointment, even if your parent seems well.",
      "Keep them drinking enough water through the day, unless the doctor has limited fluids.",
      "Keep them moving a little every day, as the physiotherapist advises.",
      "Ask the doctor whether any vaccines are due, such as flu and pneumonia vaccines.",
      "Act early on warning signs, rather than waiting to see if they pass.",
    ),

    h2("When a short stay in a care home helps"),
    p("Sometimes home isn't ready, or the family can't provide the level of care needed straight away. A short stay in a care home with nurses can bridge that gap. It's worth considering when:"),
    ul(
      "Your parent needs nursing care: wound dressings, a catheter, tube feeding, oxygen or injections",
      "They need help getting to the toilet at night, and no one can be up with them",
      "They need daily physiotherapy to get back on their feet",
      "The main carer works, lives far away, or is unwell themselves",
      "The home needs changes before it's safe",
    ),
    p("Recovery in a care home isn't a step backwards. For many people it's a safe place to regain strength before going home. Ask the home how they'll set goals with you, and how they'll help your parent prepare to return home."),
    p("You can read how this works with us on our page about [recovery after a hospital stay](/service/post-operative-care-in-pune/), and about the [medical care in our homes](/medical-care/)."),
  ],
  faqs: [
    { q: "How long does recovery take after a hospital stay?", a: editorial("It varies with age, the illness and how active the person was before. Many older people take weeks rather than days to get back to their previous strength, and regular physiotherapy helps.") },
    { q: "Is confusion after surgery normal in older people?", a: editorial("It's common, and often improves over days or weeks, but it should always be reported to the doctor because it can also signal an infection, dehydration or a problem with medicines.") },
  ],
  related: ["/service/post-operative-care-in-pune/", "/medical-care/", "/bedridden-patient-care-at-home-vs-residential-care/"],
};
