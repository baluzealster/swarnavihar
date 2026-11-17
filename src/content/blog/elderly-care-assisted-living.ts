import type { Block } from "../blocks";
import { h2, h3, note, p, ul } from "../blocks";
import { editorial } from "../types";
import type { BlogPost } from "./types";

const compare: Block = {
  type: "compare",
  columns: ["Attendant at home", "Assisted living"],
  rows: [
    { label: "Where your parent lives", a: "In their own home, with familiar surroundings.", b: "In a care home, with their own things around them." },
    { label: "Company", a: "Mostly the attendant and family. Loneliness can be a problem.", b: "Other residents and staff through the day." },
    { label: "Nights", a: "Needs a second attendant, or one who sleeps over.", b: "Staff on duty through the night." },
    { label: "When the attendant is on leave", a: "The family has to cover or find a replacement.", b: "The home arranges cover." },
    { label: "Medical support", a: "Visiting nurse or doctor arranged separately.", b: "Depends on the home. Ask whether nurses are on every shift." },
    { label: "Supervision", a: "Hard to know how care is going when you're at work.", b: "A team, with someone in charge you can talk to." },
  ],
};

export const elderlyCareAssistedLiving: BlogPost = {
  slug: "understanding-elderly-care-and-assisted-living",
  title: "Understanding elderly care and assisted living",
  metaTitle: "Elderly Care and Assisted Living, Explained | Swarnavihar",
  metaDescription:
    "What elderly care and assisted living mean in India, signs a parent needs more help, assisted living vs a home attendant, and how to talk about it.",
  excerpt:
    "Elderly care isn't one thing. It runs from a little help at home to nursing around the clock. Assisted living sits in the middle: daily help with personal care, while your parent keeps their independence.",
  category: "Choosing care",
  published: "2026-11-16",
  scene: "tea",
  shot: "Two residents sharing morning tea on a sunny verandah",
  keyPoints: [
    "Elderly care ranges from occasional help at home to round-the-clock nursing. Match it to what your parent needs.",
    "Assisted living means daily help with personal care, such as bathing, dressing and medicines, while keeping as much independence as possible.",
    "Struggling with everyday tasks, missed medicines, falls and loneliness are common signs that more support is needed.",
    "Talk with your parent early, before a crisis forces a rushed decision.",
  ],
  body: [
    p("When families first start looking for help for a parent, the words can be confusing: elderly care, senior care, assisted living, nursing home, old age home. They overlap, and different places use them differently. This guide explains what they usually mean, so you can work out what your parent actually needs."),

    h2("What elderly care covers"),
    p("Elderly care simply means support for older people who can no longer manage everything on their own. It helps to think of it as a ladder, from a little help to a lot:"),
    ul(
      "Help at home: a family member or a part-time helper with cooking, shopping and cleaning.",
      "A home attendant: someone who helps with bathing, dressing and moving around, for part or all of the day.",
      "Assisted living: a care home where help with daily personal care is part of everyday life.",
      "Nursing care: a home with nurses on every shift, for parents with medical needs that must be managed daily.",
      "Specialised care: for dementia, for people who are bedridden, for recovery after hospital, or for the end of life.",
    ),
    p("Most people move up the ladder gradually, and some move back down after an illness. The aim is the right amount of help: enough to be safe and comfortable, not so much that a parent loses abilities they still have."),

    h2("What assisted living means"),
    p("Doctors and therapists often talk about \"activities of daily living\": the basic tasks we all do to look after ourselves."),
    ul(
      "Bathing and personal hygiene",
      "Dressing",
      "Eating",
      "Using the toilet, and continence",
      "Moving about: getting out of bed, walking, getting up from a chair",
    ),
    p("There are also everyday tasks that need planning and memory, such as taking medicines correctly, cooking, handling money and keeping appointments."),
    p("Assisted living is for people who need help with some of these, but not constant medical care. In an assisted living home, staff help with exactly the tasks your parent finds hard, and encourage them to keep doing the rest. Meals, laundry and housekeeping are taken care of, and there's company and something to do during the day."),
    p("It isn't a hospital, and it isn't meant to feel like one. For parents who need daily nursing as well, look for a home with nurses on every shift. Many homes provide both. See our [assisted living service](/service/assisted-living-care/) for how it works with us."),

    h2("Signs your parent may need more support"),
    p("The need for help usually creeps up. These are some of the signs families mention most often:"),
    ul(
      "They're struggling to bathe, dress or cook, or have stopped doing these things",
      "Medicines are missed, doubled up, or left in the packet",
      "They've had a fall, or are unsteady on their feet",
      "They're eating poorly or losing weight",
      "The house is less clean than usual, or bills are unpaid",
      "They seem lonely, low or withdrawn, especially after losing a spouse",
      "They're becoming forgetful or confused, or getting lost",
    ),
    p("One sign on its own may not mean much. Several together, or a sudden change, are worth talking to their doctor about. Sudden confusion in particular can be caused by an infection or a medicine and needs prompt medical attention."),

    h2("Home attendant or assisted living?"),
    p("Many families in India start with an attendant at home, and for some parents that works well. As needs grow, the practical differences become clearer:"),
    compare,
    p("Neither is right for everyone. A parent who is mostly independent and has family nearby may do well at home with some help. A parent who needs help through the night, has fallen, or is often alone during the day may be safer, and happier, in assisted living."),

    h2("Talking to your parent about it"),
    p("This is often the hardest part. A few things tend to help:"),
    ul(
      "Start the conversation early, before a fall or a hospital stay forces a rushed decision.",
      "Talk about the things that have become hard for them, rather than announcing a plan.",
      "Listen for what they're afraid of: losing independence, being forgotten, the cost. Answer those fears directly.",
      "Visit homes together, and let them ask their own questions.",
      "If they're unsure, ask whether the home offers a short stay first.",
    ),
    h3("When there's disagreement in the family"),
    p("Brothers and sisters often see things differently, especially when one lives nearby and another lives abroad. It helps to agree on the facts first: what your parent needs help with now, what the doctor says, and who can realistically provide it. Then talk about options."),

    note(
      "Planning ahead",
      "Needs change over time. When you choose a home, ask what happens if your parent later needs more care. A home that can provide nursing or dementia care later may spare your parent a second move.",
    ),

    h2("Where to go from here"),
    p("If you think your parent may need assisted living, our guide to [choosing the right old age home in Pune](/how-to-choose-the-right-old-age-home-in-pune/) covers what to look for. Or come and see one of [our homes](/branches/) and ask us anything."),
  ],
  faqs: [
    { q: "Is assisted living the same as a nursing home?", a: editorial("Not quite. Assisted living focuses on help with daily personal care; a nursing home adds nurses on every shift for medical needs. Many homes offer both, so ask what each one is set up to provide.") },
    { q: "Will my parent lose their independence in assisted living?", a: editorial("A good home does the opposite: it helps only with what your parent finds hard, and encourages them to keep doing everything else for themselves.") },
  ],
  related: ["/service/assisted-living-care/", "/how-to-choose-the-right-old-age-home-in-pune/", "/admission/"],
};
