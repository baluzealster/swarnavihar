import type { Scene } from "@/components/ui/Illustration";
import type { ServiceGroup } from "./services";
import { editorial, placeholder, sourced, type Fact, type FactStatus } from "./types";

/**
 * Full service pages. Each answers: what is it, who needs it, what care is provided,
 * what facilities are available, what families should consider, and how admission works.
 *
 * Writing rules:
 * - General medical information is kept to widely accepted basics and points families to their doctor.
 * - Anything about what Swarnavihar itself provides carries a status: "sourced" (stated on the old site)
 *   or "placeholder" (owner to confirm). Nothing promises outcomes.
 */
export interface CareItem {
  title: string;
  detail: string;
  status: FactStatus;
}

export interface ServicePage {
  slug: string;
  /** Short name for breadcrumbs, links and schema serviceType. */
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  what: string[];
  whoIntro: string;
  who: string[];
  care: CareItem[];
  facilities: CareItem[];
  consider: string[];
  documents: string[];
  faqs: { q: string; a: Fact<string> }[];
  related: string[];
  scene: Scene;
  need: ServiceGroup;
}

export const servicePages: ServicePage[] = [
  {
    slug: "assisted-living-care",
    name: "Assisted living",
    h1: "Assisted living for seniors in Pune",
    metaTitle: "Assisted Living for Seniors in Pune | Swarnavihar",
    metaDescription:
      "Assisted living in Pune: help with bathing, dressing, meals and medicines, with nurses on every shift, so your parent keeps their routines and company.",
    lede:
      "For parents who are still largely themselves, but shouldn't be managing alone: help with the daily tasks that have become hard, and company through the day.",
    what: [
      "Assisted living is everyday support for older people who don't need a hospital, but find bathing, dressing, cooking or keeping track of medicines difficult or unsafe on their own.",
      "In a residential home, it means a room of their own or a shared room, meals prepared for them, help with personal care when they want it, and someone on hand day and night, while they keep doing as much as they can for themselves.",
    ],
    whoIntro: "Families usually start looking at assisted living when a parent:",
    who: [
      "Lives alone, or is alone at home for most of the day",
      "Has had a fall, or is unsteady on their feet",
      "Forgets or mixes up medicines",
      "Is eating poorly or skipping meals",
      "Seems lonely or low since losing a spouse or friends",
    ],
    care: [
      { title: "Help with personal care", detail: "Bathing, dressing and grooming, with privacy and at their pace.", status: "sourced" },
      { title: "Medicines given and recorded", detail: "Nurses give every dose and keep a record.", status: "sourced" },
      { title: "Meals", detail: "Regular meals, with diets suited to diabetes or other conditions.", status: "placeholder" },
      { title: "Company and activities", detail: "Music and bhajans, newspaper reading, games and gentle exercise.", status: "sourced" },
      { title: "Help moving around safely", detail: "Support with walking and getting in and out of bed, to prevent falls.", status: "placeholder" },
      { title: "Updates for the family", detail: "Regular news about how your parent is doing.", status: "placeholder" },
    ],
    facilities: [
      { title: "Nurses on every shift", detail: "So help is there if their health changes.", status: "sourced" },
      { title: "Regular doctor visits", detail: "A physician reviews each resident.", status: "sourced" },
      { title: "Physiotherapy", detail: "To keep them moving and steady on their feet.", status: "sourced" },
      { title: "Private and twin-sharing rooms", detail: "Room types and availability vary by home.", status: "placeholder" },
    ],
    consider: [
      "Ask what help is included every day, and what is charged extra.",
      "Ask whether your parent can keep their own routines: waking time, prayers, walks.",
      "See the common areas at a busy time of day, not only the rooms.",
      "Ask what happens if their needs increase later. Can they stay in the same home?",
      "Ask how visits, outings and phone calls with family work.",
    ],
    documents: [
      "A current list of medicines and doses",
      "Recent prescriptions and test reports",
      "Your parent's regular doctor's contact details",
      "Identity and address proof (owner to confirm what's needed)",
    ],
    faqs: [
      { q: "Is assisted living the same as an old age home?", a: editorial("The terms overlap. Assisted living usually means an old age home that also helps with daily personal care, such as bathing, dressing and medicines, rather than only providing a room and meals.") },
      { q: "Can my parent move to more nursing care later in the same home?", a: placeholder("To be confirmed by the owner: whether residents can stay in the same home as their care needs increase.") },
      { q: "Can my parent go out for walks or visit family?", a: placeholder("To be confirmed: outings, leave and visiting arrangements.") },
      { q: "Is there a nurse at night?", a: sourced("Yes. A nurse is on duty through the night as well as the day, so help is there if your parent's health changes.") },
    ],
    related: ["nursing-care-in-pune", "physiotherapy-rehabilitation-in-pune"],
    scene: "tea",
    need: "living",
  },
  {
    slug: "dementia-care-in-pune",
    name: "Dementia care",
    h1: "Dementia and Alzheimer's care in Pune",
    metaTitle: "Dementia & Alzheimer's Care in Pune | Swarnavihar",
    metaDescription:
      "Dementia and Alzheimer's care in Pune: a calm routine, supervised medicines, nursing and psychiatrist review. What to look for and how admission works.",
    lede:
      "When memory loss means your parent is no longer safe at home, a calm routine with people who understand dementia can make each day easier, for them and for you.",
    what: [
      "Dementia is a group of conditions that gradually affect memory, thinking, behaviour and the ability to manage everyday life. Alzheimer's disease is the most common cause; others include vascular dementia, which often follows strokes.",
      "Dementia care in a residential home means looking after the whole person: keeping a predictable routine, helping with the tasks they can no longer manage, keeping them safe, and protecting their dignity as the condition progresses.",
    ],
    whoIntro: "Families usually start looking for dementia care when they notice things like these:",
    who: [
      "Getting lost in familiar places, or wandering out of the house, especially at night",
      "Missing medicines, or taking them twice",
      "Leaving the gas on, or doors unlocked",
      "Not recognising family members some of the time",
      "Restlessness, anger or confusion that gets worse towards evening",
      "A family carer who is exhausted and not sleeping",
    ],
    care: [
      { title: "A steady daily routine", detail: "Meals, medicines, bathing and rest at the same times each day, which reduces confusion and distress.", status: "placeholder" },
      { title: "Medicines given and recorded", detail: "Nurses give every dose and keep a record, so nothing is missed or doubled.", status: "sourced" },
      { title: "Help with personal care", detail: "Bathing, dressing, toileting and eating, done patiently and with privacy.", status: "sourced" },
      { title: "Psychiatrist review", detail: "A consulting psychiatrist reviews residents with dementia, depression or behaviour changes.", status: "sourced" },
      { title: "Activities that suit the stage", detail: "Music and bhajans, simple puzzles, newspaper reading and gentle exercise.", status: "sourced" },
      { title: "Watching food and water intake", detail: "People with dementia often forget to eat or drink, so staff keep an eye on both.", status: "placeholder" },
    ],
    facilities: [
      { title: "Nursing on every shift", detail: "Day and night.", status: "sourced" },
      { title: "Regular doctor visits", detail: "A physician reviews each resident.", status: "sourced" },
      { title: "Secure entrances", detail: "To stop residents who wander from leaving unnoticed.", status: "placeholder" },
      { title: "Private and twin-sharing rooms", detail: "With daylight; families can bring familiar things from home.", status: "placeholder" },
    ],
    consider: [
      "Ask whether the home accepts residents at your parent's stage of dementia, and what happens if their needs increase later.",
      "Ask how staff handle agitation or aggression, and when sedative medicines are used.",
      "Ask whether the same carers look after your parent each day. Familiar faces matter.",
      "Check how the home stops residents from wandering out.",
      "Bring familiar things: photographs, a shawl, their own pillow. They help a new place feel like home.",
    ],
    documents: [
      "Any diagnosis or notes from a neurologist or psychiatrist",
      "An up-to-date list of medicines and doses",
      "Recent blood test reports, if you have them",
      "A short note about their routine, likes and dislikes, and what calms them",
    ],
    faqs: [
      { q: "Is dementia the same as Alzheimer's?", a: sourced("No. Dementia is the general term for a decline in memory and thinking that affects daily life. Alzheimer's disease is the most common cause, but there are others, such as vascular dementia.") },
      { q: "Can you care for a parent who wanders at night?", a: placeholder("To be confirmed by the owner: night supervision and secure entrances at each home.") },
      { q: "Will my parent be given sedatives?", a: placeholder("To be confirmed: the home's approach to sedative medicines, which should only be prescribed by a doctor after other approaches have been tried.") },
      { q: "Can we visit often? Won't it unsettle them?", a: placeholder("To be confirmed: visiting arrangements for residents with dementia.") },
    ],
    related: ["bedridden-patient-care-in-pune", "nursing-care-in-pune"],
    scene: "tea",
    need: "medical",
  },
  {
    slug: "bedridden-patient-care-in-pune",
    name: "Bedridden patient care",
    h1: "Bedridden patient care in Pune",
    metaTitle: "Bedridden Patient Care in Pune | Swarnavihar",
    metaDescription:
      "Care for bedridden parents in Pune: regular turning, skin and pressure-sore care, feeding support including Ryle's tube and PEG, and nursing day and night.",
    lede:
      "Looking after a parent who can't get out of bed is round-the-clock work. In our homes, trained nurses and attendants share it, so you can be their son or daughter again.",
    what: [
      "Bedridden care is for people who can't get out of bed, or only with full help, because of a stroke, advanced dementia, a fracture, frailty or a serious illness.",
      "Lying in bed for long periods brings its own risks: pressure sores, chest infections, stiff joints, constipation, urine infections and dehydration. Good bedridden care is mostly about preventing these, every day, without gaps.",
    ],
    whoIntro: "Bedridden care may be the right choice when:",
    who: [
      "Your parent needs turning and changing several times a day and night",
      "Pressure sores have started, or keep coming back",
      "They need a Ryle's tube or PEG feeding",
      "They have come home from hospital and can't yet sit up or walk",
      "The family carer is physically worn out from lifting",
    ],
    care: [
      { title: "Regular turning", detail: "Changing position at regular intervals, day and night, to protect the skin.", status: "sourced" },
      { title: "Skin and pressure-area care", detail: "Daily skin checks and pressure-area care by nurses.", status: "sourced" },
      { title: "Continence and hygiene care", detail: "Bed baths, diaper and catheter care, oral hygiene.", status: "sourced" },
      { title: "Feeding support", detail: "Help with eating, or Ryle's tube and PEG feeds for those who can't swallow safely.", status: "sourced" },
      { title: "Passive movement and physiotherapy", detail: "To keep joints from stiffening and to help breathing.", status: "sourced" },
      { title: "Watching for warning signs", detail: "Fever, breathlessness or new skin damage reported to the doctor.", status: "placeholder" },
    ],
    facilities: [
      { title: "Nursing on every shift", detail: "Day and night.", status: "sourced" },
      { title: "Oxygen and suction", detail: "Available under medical supervision.", status: "sourced" },
      { title: "Hospital beds and air mattresses", detail: "Pressure-relieving mattresses for residents at risk.", status: "placeholder" },
      { title: "Ambulance on call", detail: "For emergencies and hospital visits.", status: "sourced" },
    ],
    consider: [
      "Ask how often residents are turned at night, and who checks that it was done.",
      "Ask whether air mattresses are available, and whether there is an extra charge.",
      "Ask what happens if a pressure sore appears: who treats it, and how you'll be told.",
      "Find out how often the doctor sees bedridden residents.",
      "Check how many attendants are on duty at night for the number of residents.",
    ],
    documents: [
      "The latest discharge summary, if your parent has been in hospital",
      "A list of current medicines",
      "Notes on feeding: diet, tube type and feed schedule",
      "Details of any existing pressure sores and how they are being treated",
    ],
    faqs: [
      { q: "How often should a bedridden person be turned?", a: sourced("Usually every few hours, day and night, though the right interval depends on the person's skin and condition. Their doctor or nurse will advise.") },
      { q: "Can you look after a parent with a feeding tube?", a: sourced("Yes. Our nurses give Ryle's tube and PEG feeds for residents who can't eat or swallow safely.") },
      { q: "Do you have air mattresses?", a: placeholder("To be confirmed: availability and any charge for air mattresses.") },
      { q: "What does bedridden care cost?", a: placeholder("It depends on the room and the level of nursing needed. Call us with your parent's details for a written estimate. (Owner to confirm pricing approach.)") },
    ],
    related: ["nursing-care-in-pune", "post-stroke-rehabilitation-in-pune"],
    scene: "room",
    need: "medical",
  },
  {
    slug: "nursing-care-in-pune",
    name: "Nursing care",
    h1: "Nursing care for the elderly in Pune",
    metaTitle: "Nursing Care for Elderly in Pune | Swarnavihar",
    metaDescription:
      "Nursing care for elders in Pune: medicines, wound and catheter care, oxygen and BiPAP, feeding tubes, and a close watch on long-term conditions.",
    lede:
      "For parents whose health needs daily attention from a trained nurse, not just a helping hand, with a doctor who visits regularly.",
    what: [
      "Nursing care is the medical side of looking after an older person: giving medicines and injections, dressing wounds, managing catheters and feeding tubes, and keeping a close watch on conditions like diabetes, high blood pressure, heart failure and COPD.",
      "In a residential home, nursing care means a nurse is on duty around the clock, notices changes early and knows when to call the doctor.",
    ],
    whoIntro: "Your parent may need nursing care if they:",
    who: [
      "Take many medicines, or need insulin or other injections",
      "Have a wound, a catheter or a feeding tube that needs daily care",
      "Use oxygen or a BiPAP machine",
      "Have a long-term condition that keeps flaring up",
      "Have been in and out of hospital in the past year",
    ],
    care: [
      { title: "Medicines and injections", detail: "Given on time and recorded.", status: "sourced" },
      { title: "Vital signs", detail: "Blood pressure, pulse, temperature, oxygen and sugar checked and recorded.", status: "sourced" },
      { title: "Wound and catheter care", detail: "Dressings, catheter care and infection control.", status: "sourced" },
      { title: "Breathing support", detail: "Oxygen, BiPAP and suction under medical supervision.", status: "sourced" },
      { title: "Feeding tubes", detail: "Ryle's tube and PEG feeding.", status: "sourced" },
      { title: "Escalation to the doctor", detail: "Clear steps for when a nurse calls the doctor or arranges a hospital transfer.", status: "placeholder" },
    ],
    facilities: [
      { title: "Nurses on every shift", detail: "Day and night.", status: "sourced" },
      { title: "Regular physician visits", detail: "Treatment reviewed and adjusted.", status: "sourced" },
      { title: "Tests at the home", detail: "Blood samples and X-rays through partner labs.", status: "sourced" },
      { title: "Pharmacy partner", detail: "Medicines supplied and managed.", status: "sourced" },
    ],
    consider: [
      "Ask what qualifications the nurses hold (for example GNM or BSc Nursing).",
      "Ask how many nurses are on duty at night, and for how many residents.",
      "Ask to see how medicines are recorded.",
      "Find out how quickly a doctor can be reached, and which hospital your parent would go to.",
      "Ask how you'll be told about changes in your parent's health.",
    ],
    documents: [
      "A current list of medicines and doses",
      "Recent prescriptions and test reports",
      "Discharge summaries from any recent hospital stays",
      "Your parent's regular doctor's contact details",
    ],
    faqs: [
      { q: "Is a nurse on duty at night?", a: sourced("Yes. Our homes have nursing care around the clock.") },
      { q: "Can you manage insulin and blood sugar checks?", a: placeholder("To be confirmed by the owner: insulin injections and blood sugar monitoring.") },
      { q: "Can my parent come here on oxygen or BiPAP?", a: sourced("Yes. Oxygen, BiPAP and suction are available under the supervision of doctors and nurses.") },
      { q: "What happens in a medical emergency?", a: placeholder("To be confirmed by the owner: the emergency process, transfer hospitals and how families are informed.") },
    ],
    related: ["bedridden-patient-care-in-pune", "post-operative-care-in-pune"],
    scene: "medical",
    need: "medical",
  },
  {
    slug: "post-stroke-rehabilitation-in-pune",
    name: "Post-stroke rehabilitation",
    h1: "Post-stroke rehabilitation in Pune",
    metaTitle: "Post-Stroke Rehabilitation & Care in Pune | Swarnavihar",
    metaDescription:
      "Care after a stroke in Pune: physiotherapy, help with everyday tasks, safe feeding and medicines on time, in a home close to your family.",
    lede:
      "The months after a stroke matter. Regular therapy and the right support can help your parent regain what they can, safely.",
    what: [
      "A stroke happens when the blood supply to part of the brain is cut off or a blood vessel bursts. Depending on the part of the brain affected, it can cause weakness on one side of the body, difficulty speaking or swallowing, poor balance, memory problems or low mood.",
      "Rehabilitation helps people relearn skills and adapt to what has changed. Much of the recovery usually happens in the first few months, but improvement can continue for much longer with regular practice.",
    ],
    whoIntro: "Post-stroke care in a residential home can help when your parent:",
    who: [
      "Has been discharged from hospital but can't yet manage safely at home",
      "Needs daily physiotherapy that is hard to arrange at home",
      "Has trouble swallowing, or is on a Ryle's tube",
      "Needs help to walk, get to the toilet or dress",
      "Is low in mood or frustrated by what they can no longer do",
    ],
    care: [
      { title: "Physiotherapy", detail: "Exercises for strength, balance and walking, and to prevent stiffness and shoulder pain.", status: "sourced" },
      { title: "Help that builds independence", detail: "Attendants help with daily tasks while encouraging your parent to do what they can.", status: "placeholder" },
      { title: "Safe eating and feeding", detail: "Help at mealtimes, and Ryle's tube or PEG feeding where swallowing isn't safe.", status: "sourced" },
      { title: "Medicines on time", detail: "Blood pressure, diabetes and blood-thinning medicines given as prescribed.", status: "sourced" },
      { title: "Mood support", detail: "Psychiatrist review for low mood or anxiety after a stroke.", status: "sourced" },
      { title: "Speech and occupational therapy", detail: "Arranged where needed.", status: "placeholder" },
    ],
    facilities: [
      { title: "In-house physiotherapy", detail: "No travelling for therapy.", status: "sourced" },
      { title: "Nursing on every shift", detail: "Day and night.", status: "sourced" },
      { title: "Regular doctor visits", detail: "Treatment reviewed and adjusted.", status: "sourced" },
      { title: "Ambulance on call", detail: "For follow-up appointments and emergencies.", status: "sourced" },
    ],
    consider: [
      "Ask how many physiotherapy sessions a week your parent will get, and how long each lasts.",
      "Ask whether goals are set and reviewed with you, for example walking to the dining table.",
      "Ask whether speech or swallowing therapy can be arranged if needed.",
      "If the plan is for your parent to come home, ask how the home will help you prepare.",
      "Ask how you'll be kept up to date on progress.",
    ],
    documents: [
      "The hospital discharge summary",
      "CT or MRI reports",
      "A list of current medicines",
      "Any notes from the hospital physiotherapist or speech therapist",
    ],
    faqs: [
      { q: "How long does recovery after a stroke take?", a: sourced("It varies a great deal. Much of the improvement usually comes in the first few months, but many people keep making progress for longer with regular therapy. Your parent's doctor is the best guide.") },
      { q: "How often is physiotherapy given?", a: placeholder("To be confirmed by the owner: physiotherapy sessions per week for post-stroke residents.") },
      { q: "Can my parent stay for a few months and then come home?", a: placeholder("To be confirmed: short-stay and step-down arrangements.") },
      { q: "Do you provide speech therapy?", a: placeholder("To be confirmed: whether speech and occupational therapy can be arranged.") },
    ],
    related: ["physiotherapy-rehabilitation-in-pune", "bedridden-patient-care-in-pune"],
    scene: "recovery",
    need: "recovery",
  },
  {
    slug: "physiotherapy-rehabilitation-in-pune",
    name: "Physiotherapy and rehabilitation",
    h1: "Physiotherapy and rehabilitation for elders in Pune",
    metaTitle: "Elderly Physiotherapy & Rehabilitation in Pune | Swarnavihar",
    metaDescription:
      "In-house physiotherapy for older people in Pune: after strokes and fractures, for Parkinson's and arthritis, chest physiotherapy, and fall prevention.",
    lede:
      "Staying steady on their feet keeps older people independent for longer. Our physiotherapists work with residents inside the home, so therapy doesn't depend on someone driving them to a clinic.",
    what: [
      "Physiotherapy uses exercise, movement and hands-on treatment to improve strength, balance, mobility and breathing, and to ease pain.",
      "For older people it is often the difference between walking to the dining table and staying in bed. It helps after strokes, fractures and joint replacements, with conditions like Parkinson's and arthritis, and for anyone who has become weak after illness.",
    ],
    whoIntro: "Physiotherapy can help your parent if they:",
    who: [
      "Have had a fall, or are afraid of falling",
      "Are recovering from a hip fracture or a knee or hip replacement",
      "Have had a stroke, or have Parkinson's disease",
      "Have become weak after a long illness or hospital stay",
      "Have chest problems such as COPD, or a chest infection",
    ],
    care: [
      { title: "Assessment and a plan", detail: "The physiotherapist assesses your parent and sets an exercise plan.", status: "placeholder" },
      { title: "Strength and balance exercises", detail: "To make walking and standing safer.", status: "sourced" },
      { title: "Walking practice", detail: "With a walker or stick where needed.", status: "sourced" },
      { title: "Manual therapy and pain relief", detail: "Hands-on treatment to ease pain and stiffness.", status: "sourced" },
      { title: "Chest physiotherapy", detail: "For COPD and chest infections.", status: "sourced" },
      { title: "Neurological rehabilitation", detail: "For stroke and Parkinson's disease.", status: "sourced" },
    ],
    facilities: [
      { title: "Physiotherapy inside the home", detail: "No travel to a clinic.", status: "sourced" },
      { title: "Exercise equipment", detail: "Walking rails and aids.", status: "placeholder" },
      { title: "Nursing on every shift", detail: "Day and night.", status: "sourced" },
      { title: "Regular doctor visits", detail: "Treatment reviewed and adjusted.", status: "sourced" },
    ],
    consider: [
      "Ask what qualifications the physiotherapists hold (BPT or MPT).",
      "Ask how often your parent will have sessions, and whether attendants help them practise in between.",
      "Ask how progress is measured and shared with you.",
      "If your parent had surgery, share the surgeon's instructions on what movements to avoid.",
    ],
    documents: [
      "Surgery or discharge notes, including any movement restrictions",
      "X-ray or scan reports",
      "A list of current medicines",
      "Notes from any previous physiotherapy",
    ],
    faqs: [
      { q: "Can physiotherapy help with fear of falling?", a: sourced("Often, yes. Balance and strength exercises can make walking safer, and practising with a physiotherapist helps people regain confidence. Their doctor can advise on what's right for them.") },
      { q: "Do you treat people with Parkinson's disease?", a: sourced("Yes. Our physiotherapy includes neurological conditions such as Parkinson's disease.") },
      { q: "How many sessions a week will my parent have?", a: placeholder("To be confirmed by the owner: physiotherapy frequency.") },
      { q: "Can my parent come only for physiotherapy, without staying?", a: placeholder("To be confirmed: whether physiotherapy is offered to non-residents.") },
    ],
    related: ["post-stroke-rehabilitation-in-pune", "post-operative-care-in-pune"],
    scene: "recovery",
    need: "recovery",
  },
  {
    slug: "post-operative-care-in-pune",
    name: "Recovery after a hospital stay",
    h1: "Recovery after a hospital stay or surgery",
    metaTitle: "Post-Hospital & Post-Operative Care in Pune | Swarnavihar",
    metaDescription:
      "Care in Pune between hospital discharge and going home: wound care, medicines, physiotherapy and nursing for older people after surgery or illness.",
    lede:
      "Discharged from hospital, but not ready to manage at home? A stay with us gives your parent nursing, physiotherapy and rest while they get their strength back.",
    what: [
      "Older people are often discharged from hospital before they can safely look after themselves: after surgery such as a hip fracture repair or joint replacement, after pneumonia or a heart problem, or after time in intensive care.",
      "Post-hospital care bridges that gap. It covers the nursing the hospital started, the therapy that rebuilds strength, and a close watch so that problems are spotted early.",
    ],
    whoIntro: "Consider post-hospital care when your parent:",
    who: [
      "Is being discharged with wounds, drains or a catheter that need daily care",
      "Can't yet walk or get to the toilet without help",
      "Has many new medicines to start",
      "Lives alone, or with someone who can't provide the care they need",
      "Has been readmitted to hospital before after going home too soon",
    ],
    care: [
      { title: "Wound and dressing care", detail: "Following the surgeon's instructions.", status: "sourced" },
      { title: "Medicines and injections", detail: "New and existing medicines given and recorded.", status: "sourced" },
      { title: "Physiotherapy", detail: "To rebuild strength and get your parent walking again.", status: "sourced" },
      { title: "Nutrition", detail: "Freshly cooked meals, with diets the doctor recommends.", status: "placeholder" },
      { title: "Watching for warning signs", detail: "Fever, wound problems, breathlessness or confusion reported to the doctor.", status: "placeholder" },
      { title: "Follow-up appointments", detail: "Ambulance transport for hospital check-ups.", status: "sourced" },
    ],
    facilities: [
      { title: "Nursing on every shift", detail: "Day and night.", status: "sourced" },
      { title: "Regular doctor visits", detail: "Treatment reviewed and adjusted.", status: "sourced" },
      { title: "Tests at the home", detail: "Blood samples and X-rays through partner labs.", status: "sourced" },
      { title: "In-house physiotherapy", detail: "No travel for therapy.", status: "sourced" },
    ],
    consider: [
      "Share the full discharge summary with the home before admission, so they can check they can provide everything it asks for.",
      "Ask how the home coordinates with your parent's surgeon or hospital doctor.",
      "Ask about short stays: the minimum stay and how charges work.",
      "Plan the move home early. Ask what equipment or help your parent will need.",
    ],
    documents: [
      "The hospital discharge summary",
      "Surgeon's instructions, including wound care and movement restrictions",
      "A list of medicines, with start and stop dates",
      "Dates of follow-up appointments",
    ],
    faqs: [
      { q: "Can my parent come to you straight from hospital?", a: placeholder("To be confirmed by the owner: direct admissions from hospital and what the team needs to know first.") },
      { q: "How long do people usually stay?", a: placeholder("To be confirmed: typical length of post-hospital stays and the minimum stay.") },
      { q: "Can you take my parent to follow-up appointments?", a: sourced("Yes. We have an ambulance on call for hospital visits and emergencies.") },
      { q: "Is this the same as post-operative care?", a: sourced("Yes. Post-operative care is recovery after surgery. We use the wider term because many older people need the same support after illness, not just operations.") },
    ],
    related: ["physiotherapy-rehabilitation-in-pune", "nursing-care-in-pune"],
    scene: "medical",
    need: "recovery",
  },
  {
    slug: "paralysis-care-centre-in-pune",
    name: "Paralysis care",
    h1: "Paralysis care in Pune",
    metaTitle: "Paralysis Care Centre in Pune | Swarnavihar",
    metaDescription:
      "Care for elders living with paralysis after a stroke or injury: positioning, skin care, physiotherapy and help with every daily task, close to home in Pune.",
    lede:
      "When a stroke or an injury has taken away movement on one side or more, your parent needs patient, skilled help every day, and a team that keeps working to protect what they can still do.",
    what: [
      "Paralysis is the loss of the ability to move some or all of the body, and sometimes of feeling too. In older people it is most often caused by a stroke, which can affect one side of the body (hemiplegia). Spinal cord injuries, other brain injuries and some neurological illnesses can also cause it.",
      "Paralysis care means helping with everything the person can no longer do for themselves, preventing the complications of limited movement, and supporting rehabilitation so they keep or regain as much independence as possible. How much recovery is possible depends on the cause and the person; their doctors are the best guide.",
    ],
    whoIntro: "Paralysis care may suit your parent if they:",
    who: [
      "Have weakness or paralysis on one side after a stroke",
      "Can't get out of bed or walk without help",
      "Need help with eating, washing, dressing and the toilet",
      "Are at risk of bedsores or stiff joints",
      "Need daily physiotherapy that is hard to arrange at home",
    ],
    care: [
      { title: "Repositioning and skin care", detail: "Turning in bed and checking pressure areas, day and night, to prevent bedsores.", status: "sourced" },
      { title: "Help with every daily task", detail: "Bathing, grooming, dressing, eating and toileting, done patiently.", status: "sourced" },
      { title: "Physiotherapy", detail: "Exercises to keep joints moving, build strength and practise sitting, standing and walking where possible.", status: "sourced" },
      { title: "Safe eating and drinking", detail: "Help with meals, and Ryle's tube or PEG feeding for residents who can't swallow safely.", status: "sourced" },
      { title: "Nursing care", detail: "Medicines, catheter and continence care, and watching for infections.", status: "sourced" },
      { title: "Speech and swallowing therapy", detail: "Whether a speech therapist visits the homes is to be confirmed by the owner.", status: "placeholder" },
    ],
    facilities: [
      { title: "Nurses on every shift", detail: "Day and night.", status: "sourced" },
      { title: "Visiting doctors", detail: "Including a neurologist and an orthopaedic surgeon on the panel.", status: "sourced" },
      { title: "Hospital beds and air mattresses", detail: "Availability at each home to be confirmed.", status: "placeholder" },
      { title: "Wheelchairs and walking aids", detail: "Availability at each home to be confirmed.", status: "placeholder" },
    ],
    consider: [
      "Ask how often physiotherapy happens each week, and who sets the goals.",
      "Ask how turning is done at night, and how pressure areas are checked.",
      "Ask how they help residents who can't speak clearly to communicate.",
      "Ask how your parent will be moved safely between bed, chair and bathroom.",
      "Ask how you'll be told about progress or setbacks.",
    ],
    documents: [
      "Hospital discharge summary and scan reports",
      "A current list of medicines and doses",
      "Physiotherapy notes, if therapy has already started",
      "Your parent's regular doctor's contact details",
    ],
    faqs: [
      { q: "Will my parent walk again after a stroke?", a: editorial("It depends on the stroke and on the person. Many people regain some movement, especially in the first months, with regular therapy. Their neurologist and physiotherapist can give the best guidance for your parent.") },
      { q: "Is there physiotherapy every day?", a: placeholder("To be confirmed by the owner: physiotherapy sessions per week and whether they are included.") },
      { q: "Can you care for someone who is fully bedridden?", a: sourced("Yes. Attendants help with every daily task, including turning and repositioning to prevent bedsores, and nurses are on duty around the clock.") },
    ],
    related: ["post-stroke-rehabilitation-in-pune", "bedridden-patient-care-in-pune"],
    scene: "recovery",
    need: "recovery",
  },
  {
    slug: "hospice-palliative-care-in-pune",
    name: "Palliative and hospice care",
    h1: "Palliative and hospice care in Pune",
    metaTitle: "Palliative and Hospice Care in Pune | Swarnavihar",
    metaDescription:
      "Comfort, dignity and pain relief for elders with serious illness, with nursing day and night and the family close by. How palliative care works with us.",
    lede:
      "When an illness can no longer be stopped, care turns to comfort: easing pain and other symptoms, keeping your parent clean and peaceful, and making room for the family to be together.",
    what: [
      "Palliative care is care for people living with a serious illness, focused on relieving pain and other symptoms and supporting the whole person, physically, emotionally and spiritually. It can be given alongside other treatment, at any stage of an illness.",
      "Hospice care is palliative care in the last months, weeks or days of life, when treatment aimed at stopping the illness has ended. The aim is comfort and dignity, for your parent and for the family.",
    ],
    whoIntro: "Families usually ask about palliative or hospice care when a parent:",
    who: [
      "Has advanced cancer, heart, lung or kidney failure, or advanced dementia",
      "Has been told treatment can no longer control their illness",
      "Is in pain, breathless or uncomfortable much of the time",
      "Needs nursing care that the family can't provide at home",
      "Has said they don't want more hospital stays",
    ],
    care: [
      { title: "Pain and symptom relief", detail: "Medicines for pain, breathlessness, nausea and restlessness, given as the doctor prescribes.", status: "sourced" },
      { title: "Nursing day and night", detail: "Round-the-clock nursing so that changes are noticed and comfort is kept up.", status: "sourced" },
      { title: "Personal care with dignity", detail: "Gentle washing, mouth care, turning and skin care.", status: "sourced" },
      { title: "Emotional and spiritual support", detail: "Time to talk, prayers and rituals that matter to your parent and family.", status: "sourced" },
      { title: "Family welcome", detail: "Families able to stay close in the last days. Arrangements to be confirmed by the owner.", status: "placeholder" },
      { title: "Working with your parent's doctors", detail: "How the home coordinates with treating specialists, to be confirmed by the owner.", status: "placeholder" },
    ],
    facilities: [
      { title: "Nurses on every shift", detail: "Day and night.", status: "sourced" },
      { title: "Visiting doctors", detail: "Who review comfort and medicines regularly.", status: "sourced" },
      { title: "Oxygen and suction", detail: "Under the supervision of doctors and nurses.", status: "sourced" },
      { title: "Air mattresses and hospital beds", detail: "Availability at each home to be confirmed.", status: "placeholder" },
    ],
    consider: [
      "Ask how pain is assessed, especially if your parent can't describe it.",
      "Ask whether a doctor can be reached at night if symptoms get worse.",
      "Ask whether family can stay late or overnight in the last days.",
      "Talk with your parent and their doctors about their wishes for hospital treatment, and share them with the home.",
      "Ask how the home supports families after a death.",
    ],
    documents: [
      "Recent medical summaries and the treating doctor's contact",
      "A current list of medicines, including pain relief",
      "Any written wishes about treatment and the end of life",
      "Contact details for family members to call, day and night",
    ],
    faqs: [
      { q: "Does palliative care mean giving up?", a: editorial("No. It means making comfort and quality of life the priority. Palliative care can run alongside other treatment, and many people live better, and sometimes longer, with good symptom control.") },
      { q: "Can my parent stay with you until the end?", a: placeholder("To be confirmed by the owner: end-of-life care at the homes, and when a hospital transfer would be suggested.") },
      { q: "Can we be with our parent at any time?", a: placeholder("To be confirmed by the owner: visiting and overnight stays for families in the last days.") },
    ],
    related: ["nursing-care-in-pune", "bedridden-patient-care-in-pune"],
    scene: "verandah",
    need: "medical",
  },
  {
    slug: "geriatric-care-in-pune",
    name: "Geriatric care",
    h1: "Geriatric care in Pune",
    metaTitle: "Geriatric Care for Elders in Pune | Swarnavihar",
    metaDescription:
      "Care planned around the health needs that come with age: medicines, long-term conditions, mobility, memory, mood and food, with nurses and visiting doctors.",
    lede:
      "Getting older often means several health problems at once, many medicines, and a body and mind that need more looking after. Geriatric care brings all of it together in one plan.",
    what: [
      "Geriatrics is the branch of medicine that looks after older people. Geriatric care means care that sees the whole person rather than one illness at a time: their conditions, their medicines, how well they move and think, their mood, their eating, and what matters to them.",
      "In a residential home it means nurses and doctors who review all of this regularly, spot problems such as falls, confusion or weight loss early, and keep the care plan up to date as needs change.",
    ],
    whoIntro: "Geriatric care may suit your parent if they:",
    who: [
      "Live with several long-term conditions, such as diabetes, blood pressure and arthritis",
      "Take many medicines and find them hard to manage",
      "Have had falls, or are unsteady",
      "Are becoming forgetful, low in mood or withdrawn",
      "Are eating less or losing weight",
    ],
    care: [
      { title: "Regular health assessments", detail: "Nurses monitor vital signs and doctors review each resident's health.", status: "sourced" },
      { title: "Medicines managed", detail: "Given on time, recorded, and reviewed by the doctor.", status: "sourced" },
      { title: "Long-term conditions", detail: "Diabetes, blood pressure, heart and lung conditions watched closely.", status: "sourced" },
      { title: "Keeping active", detail: "Physiotherapy, gentle exercise and daily activities.", status: "sourced" },
      { title: "Nutrition", detail: "Meals that suit dietary needs, and help with eating where needed.", status: "sourced" },
      { title: "Memory and mood", detail: "A consulting psychiatrist on the visiting panel for memory problems and depression.", status: "sourced" },
    ],
    facilities: [
      { title: "Nurses on every shift", detail: "Day and night.", status: "sourced" },
      { title: "A visiting panel of doctors", detail: "Physicians, a psychiatrist, a neurologist, an orthopaedic surgeon and a dermatologist.", status: "sourced" },
      { title: "Tests at the home", detail: "Blood tests and mobile X-rays through partner labs.", status: "sourced" },
      { title: "Pharmacy partner", detail: "Medicines supplied and managed.", status: "sourced" },
    ],
    consider: [
      "Ask how often each resident's medicines are reviewed by a doctor.",
      "Ask how they prevent falls, and what happens after one.",
      "Ask how they notice changes in memory, mood or eating.",
      "Ask how often the care plan is reviewed, and whether you're involved.",
      "Ask how they work with your parent's existing specialists.",
    ],
    documents: [
      "A current list of medicines and doses",
      "Recent prescriptions and test reports",
      "Contact details for your parent's doctors and specialists",
      "Any recent hospital discharge summaries",
    ],
    faqs: [
      { q: "What's the difference between geriatric care and nursing care?", a: editorial("They overlap. Nursing care focuses on medical tasks such as medicines, wounds and catheters. Geriatric care is the wider plan for an older person's health: all their conditions, medicines, mobility, memory, mood and nutrition together.") },
      { q: "Will our parent's existing doctors still be involved?", a: placeholder("To be confirmed by the owner: how the homes work with residents' own doctors and specialists.") },
      { q: "Can you help with a parent who takes many medicines?", a: sourced("Yes. Nurses give every dose on time and keep a record, and the visiting doctor reviews each resident's treatment.") },
    ],
    related: ["nursing-care-in-pune", "dementia-care-in-pune"],
    scene: "medical",
    need: "medical",
  },
];

export const servicePageBySlug = (slug: string) => servicePages.find((s) => s.slug === slug);
