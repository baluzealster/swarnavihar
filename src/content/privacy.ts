import { h2, p, ul, note, type Block } from "./blocks";
import { placeholder, sourced } from "./types";

/**
 * Privacy policy. Written from what the site actually does (src/lib/leads, SiteTracking,
 * Turnstile, WhatsApp links), so it can't promise something the code doesn't do.
 * The legal entity, grievance officer, retention period and a lawyer's review are
 * placeholders: production builds stay blocked until they're filled in.
 */
export const privacyPage = {
  path: "/privacy-policy/",
  h1: "Privacy policy",
  metaTitle: "Privacy Policy | Swarnavihar Old Age Homes",
  metaDescription:
    "How Swarnavihar Old Age Homes collects, uses and protects the details you share through our website forms, and how to ask us to see, correct or delete them.",
  lede: "What we collect when you use this website, why, who handles it for us, and how to ask us to change or delete it.",
};

export const legalEntity = placeholder("Legal name and registered address of the business that runs Swarnavihar Old Age Homes (owner to confirm; the old site footer says \"Swarnavihar Retirement Homes\").");
export const grievanceOfficer = placeholder("Name and email of the person who handles privacy requests and complaints (owner to provide).");
export const retention = placeholder("How long enquiries are kept before deletion, for example 24 months after the last contact (owner to decide).");
export const contactEmail = sourced("svoldagehomes@gmail.com");
export const effectiveDate = placeholder("Effective date: to be set on launch.");
export const legalReview = placeholder("This policy must be reviewed by a lawyer before the site goes live.");

export const privacyBody: Block[] = [
  h2("Who we are"),
  p("This website belongs to Swarnavihar Old Age Homes, which runs residential care homes in Pune and Bengaluru. In this policy, \"we\" and \"us\" mean Swarnavihar. The legal entity and its address are given at the end of this page."),

  h2("What we collect, and why"),
  p("We only collect what you choose to send us, and only to reply to you about care."),
  ul(
    "**When you fill in a form** (to schedule a visit, ask for a call back, ask a question or send a message): your name, mobile number, email address if you give it, the home you're interested in, the kind of care you're asking about, a preferred visit date, and your message.",
    "**Where you came from:** the page you sent the form from, and campaign tags in the link (for example, that you clicked an advert). This tells us which pages and adverts help families find us.",
    "**A reference number** we create for your enquiry, and the date and time it arrived.",
  ),
  p("We use these details to contact you about your enquiry: to arrange a visit, call you back, or answer your question. We don't sell them, and we don't use them for unrelated marketing."),
  note(
    "Please don't send medical records through the website",
    "Our forms ask only for a short note. Health details are better shared when we talk, or in person, so we can ask only for what we need.",
  ),

  h2("Information collected automatically"),
  ul(
    "**Spam protection:** to stop automated spam, our forms use Cloudflare Turnstile, which checks that a real person is using the form. Our server also sees your internet (IP) address for a short time to limit repeated submissions; we don't store it with your enquiry.",
    "**Website statistics:** if enabled, Google Analytics records how the site is used: pages visited, the type of device, and actions such as sending a form or tapping a WhatsApp button. We set it to shorten (anonymise) IP addresses, and we never send your name, number, email or message to Google Analytics. It uses cookies; you can block or delete them in your browser settings.",
  ),

  h2("WhatsApp and phone calls"),
  p("If you tap a WhatsApp button, WhatsApp opens with a message ready for you to send. Whatever you send then goes through WhatsApp (owned by Meta) and is covered by WhatsApp's own privacy policy. Phone calls are handled by your phone provider."),

  h2("Who handles your details for us"),
  p("We use a small number of service providers to run the website and handle enquiries. They process your details only to provide their service to us:"),
  ul(
    "**Vercel:** hosts the website",
    "**Google:** stores enquiries in a private Google Sheet that only our team can open, and sends our enquiry notification emails (Gmail)",
    "**Cloudflare:** spam protection on our forms",
    "**Google Analytics:** website statistics, if enabled",
  ),
  p("Some of these providers may store data outside India. We choose providers that protect data to recognised standards."),

  h2("How long we keep your details"),
  p("We keep enquiries only as long as we need them to help you and to keep a reasonable record of our conversations. The period is set out at the end of this page. If you become a resident's family contact, the details needed for their care are covered by the admission agreement, not by this website policy."),

  h2("How we protect your details"),
  ul(
    "Website traffic is encrypted (HTTPS).",
    "Enquiries go to a private spreadsheet and inbox that only authorised staff can open.",
    "The keys that connect the website to these services are kept on the server and never sent to your browser.",
  ),

  h2("Your rights"),
  p("Under Indian law, including the Digital Personal Data Protection Act, 2023, you can ask us to:"),
  ul(
    "tell you what personal details we hold about you and how we've used them",
    "correct details that are wrong or out of date",
    "delete your details, where we don't need to keep them",
    "stop contacting you",
  ),
  p("You can also raise a complaint with us, and if you're not satisfied with our response, with the Data Protection Board of India. To make a request, contact the person named at the end of this page or email us. We'll reply as quickly as we can."),

  h2("Children"),
  p("This website is meant for adults looking for care for an older family member. We don't knowingly collect details from anyone under 18."),

  h2("Changes to this policy"),
  p("If we change how we handle your details, we'll update this page and the date at the end of it."),
];
