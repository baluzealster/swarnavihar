import { checklist, h2, h3, note, p, ul } from "../blocks";
import { editorial, placeholder } from "../types";
import type { BlogPost } from "./types";

export const dementiaCareFamilies: BlogPost = {
  slug: "dementia-care-what-families-should-know",
  title: "Dementia care: what families should know",
  metaTitle: "Dementia Care: What Families Should Know | Swarnavihar",
  metaDescription:
    "Early signs of dementia, why a proper diagnosis matters, how needs change over time, practical tips for daily care, and when a dementia care home may help.",
  excerpt:
    "Dementia changes a parent slowly, and it changes the family too. Understanding what's happening, and what helps, makes the road easier for everyone.",
  category: "Health and care",
  published: "2026-11-16",
  scene: "verandah",
  shot: "A daughter holding her father's hand on a quiet verandah",
  keyPoints: [
    "Dementia isn't a normal part of ageing. Memory changes that affect daily life deserve a doctor's assessment.",
    "Some causes of confusion, such as infections, thyroid problems, low vitamin B12, depression and medicine side effects, are treatable.",
    "A calm routine, simple choices and patient communication help more than arguing or correcting.",
    "Look after yourself too. Carer exhaustion is real, and it's a sign to get more help, not a failure.",
  ],
  medicalReview: placeholder("Medical review by a Swarnavihar consulting doctor (psychiatrist or neurologist): name, qualification and date to be added before publishing."),
  body: [
    p("Perhaps your mother has started asking the same question several times an hour. Perhaps your father got lost driving to a place he's been to all his life. When a parent starts to change like this, families often feel worried, confused and sometimes frustrated, then guilty for feeling frustrated. All of that is normal."),
    p("This guide explains what dementia is, what to expect, and what helps. It's general information, not medical advice. Your parent's doctor is the best person to guide their care."),

    h2("What dementia is"),
    p("Dementia is not one disease. It's a word for a group of conditions that gradually affect memory, thinking, behaviour and the ability to manage everyday life. It happens because of changes in the brain, and it gets worse over time."),
    p("The most common causes include:"),
    ul(
      "Alzheimer's disease, the most common cause, which usually starts with memory loss",
      "Vascular dementia, linked to strokes and reduced blood flow to the brain",
      "Lewy body dementia, which can bring hallucinations, movement problems and fluctuating alertness",
      "Frontotemporal dementia, which often changes personality and behaviour first",
    ),
    p("Some forgetfulness is common as we get older: misplacing spectacles, or taking a moment to recall a name. Dementia is different because it steadily affects daily life."),

    h2("Early signs to look out for"),
    checklist(
      "Forgetting recent conversations or events, and repeating questions",
      "Getting lost in familiar places",
      "Difficulty with tasks they used to manage, like cooking, paying bills or using the phone",
      "Mixing up medicines",
      "Trouble finding words, or following a conversation",
      "Changes in mood or personality: more anxious, suspicious, withdrawn or irritable",
      "Poor judgement, such as unusual spending or falling for scams",
    ),

    h2("Why a proper diagnosis matters"),
    p("If you notice these changes, ask your parent's doctor for an assessment. A physician may refer them to a neurologist, a psychiatrist or a geriatrician."),
    p("A diagnosis matters for two reasons. First, some causes of memory problems can be treated: thyroid problems, low vitamin B12, depression, side effects of medicines, and infections. Second, if it is dementia, knowing the type helps the doctor choose treatment, and helps the family plan while your parent can still share their wishes."),
    note(
      "Sudden confusion is different",
      "If a parent becomes confused suddenly, over hours or a few days, it may be delirium, often caused by an infection, dehydration or a new medicine. This needs a doctor urgently, even if they already have dementia.",
      "warning",
    ),

    h2("How needs change over time"),
    p("Dementia is often described in stages. Everyone is different, but roughly:"),
    h3("Early stage"),
    p("Your parent is largely independent but forgetful. They may need reminders, help with money and medicines, and someone to check in daily. This is the time to talk about their wishes, finances and legal paperwork."),
    h3("Middle stage"),
    p("Usually the longest stage. They need help with more everyday tasks, and may become confused about time and place, get agitated in the evenings, wander, or not recognise people at times. Supervision becomes important, day and night."),
    h3("Later stage"),
    p("They need help with almost everything: eating, moving, toileting. Speech may become limited, and swallowing can become difficult. Care focuses on comfort, dignity, skin care and safe eating."),

    h2("Planning ahead while you can"),
    p("In the early stage, your parent can still take part in decisions about their future. It's worth using that time, gently, for a few practical conversations:"),
    ul(
      "What matters most to them if they need more care later: staying near family, their food, their faith",
      "Who should manage their bank accounts and pay bills if they no longer can",
      "Their wishes about hospital treatment and the end of life",
      "Where important papers are kept: property documents, insurance, pension, medical records",
    ),
    p("A lawyer can advise on documents such as a power of attorney, which must be made while your parent still has the capacity to understand it."),

    h2("Everyday tips that help"),
    ul(
      "Keep a steady routine: meals, bathing and rest at the same times each day.",
      "Offer simple choices (\"the blue shirt or the white one?\") rather than open questions.",
      "Speak calmly, in short sentences, face to face. Give them time to answer.",
      "Don't argue or correct. If your mother thinks it's 1985, step into her world rather than insisting on the date.",
      "Make the home easier: good lighting, clear paths, labels on doors, the gas knob protected.",
      "Keep them active with things they've always enjoyed: music, prayers, folding clothes, gardening.",
      "Make sure they carry identification with your phone number, in case they get lost.",
    ),
    h3("Understanding difficult behaviour"),
    p("Agitation, shouting or refusing care is often a way of communicating a need they can't put into words: pain, hunger, needing the toilet, being too hot or cold, or simply being frightened. Before reacting, look for the cause. Many families find that late afternoon and evening are hardest; this is sometimes called sundowning. Calm surroundings and fewer demands as the day ends can help."),

    h2("Looking after yourself"),
    p("Caring for someone with dementia is exhausting, especially at night. Many carers, often daughters and daughters-in-law, give up work, sleep and their own health. Signs you need more support include constant tiredness, feeling angry or hopeless, and your own health suffering. Sharing the care, with family, an attendant, day care or a care home, isn't giving up. It's how you keep going."),

    h2("When a dementia care home may help"),
    p("Families often consider residential care when:"),
    ul(
      "Their parent is no longer safe at home: wandering, falls, leaving the gas on",
      "Nights are disturbed, and the carer can't sleep",
      "The carer's own health is suffering",
      "Care needs have grown beyond what an attendant can manage",
    ),
    p("When you visit a home, ask how staff are trained in dementia, how they handle agitation without restraint, how they keep residents who wander safe, and how they keep a routine. A good home will want to know your parent's history and habits, because that's how they'll care for them well. You can read how we approach it on our [dementia care page](/service/dementia-care-in-pune/)."),

    note(
      "You're not alone in this",
      "If you're caring for a parent with dementia in Pune and want to talk through the options, call or WhatsApp us. Talking to us doesn't commit you to anything.",
    ),
  ],
  faqs: [
    { q: "Can dementia be cured?", a: editorial("Most types of dementia can't be cured, but some medicines can ease symptoms for a while, and good care makes a big difference to quality of life. Memory problems caused by treatable conditions, such as thyroid problems or low vitamin B12, can improve with treatment.") },
    { q: "Should we tell our parent their diagnosis?", a: editorial("Most people in the early stage want to know, and knowing gives them a chance to plan and share their wishes. How and when to tell them is worth discussing with their doctor.") },
    { q: "Is it normal for my father to accuse us of stealing?", a: editorial("It's common in dementia. When someone can't remember where they put something, the explanation that makes sense to them may be that someone took it. Reassure them, help them look, and keep spares of things that often go missing.") },
  ],
  related: ["/service/dementia-care-in-pune/", "/how-to-choose-the-right-old-age-home-in-pune/", "/medical-care/"],
};
