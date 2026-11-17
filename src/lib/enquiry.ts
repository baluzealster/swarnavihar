/** Client-side enquiry shape and validation for the visit / call-back / enquiry form. The server re-validates in lib/leads. */
export type EnquiryIntent = "visit" | "callback" | "enquiry";

export interface EnquiryInput {
  intent: EnquiryIntent;
  name: string;
  phone: string;
  branch: string;
  need: string;
  /** Preferred visit date, YYYY-MM-DD. Only for visits; optional. */
  date: string;
  message: string;
  /** Honeypot: real people never fill this in. */
  company: string;
}

export type EnquiryErrors = Partial<Record<"name" | "phone" | "date", string>>;

export const LIMITS = { name: 80, phone: 20, branch: 40, need: 40, date: 10, message: 1000, company: 200 } as const;

export function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

/** Today's date in India, as YYYY-MM-DD. */
export function todayInIndia(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(now);
}

export function validateEnquiry(input: Pick<EnquiryInput, "name" | "phone" | "date" | "intent">, now = new Date()): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (input.name.trim().length < 2) errors.name = "Enter your name so we know who to ask for.";
  if (!/^[6-9]\d{9}$/.test(normalisePhone(input.phone))) {
    errors.phone = "Enter a 10-digit Indian mobile number, for example 98765 43210.";
  }
  if (input.intent === "visit" && input.date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date) || Number.isNaN(Date.parse(input.date))) {
      errors.date = "Choose a date from the calendar.";
    } else if (input.date < todayInIndia(now)) {
      errors.date = "Choose today or a later date.";
    }
  }
  return errors;
}

/** Reads untrusted input into a clean EnquiryInput, trimming and capping every field. */
export function parseEnquiry(raw: unknown): EnquiryInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (k: keyof typeof LIMITS) => (typeof r[k] === "string" ? (r[k] as string).trim().slice(0, LIMITS[k]) : "");
  return {
    intent: r.intent === "visit" || r.intent === "enquiry" ? r.intent : "callback",
    name: str("name"),
    phone: str("phone"),
    branch: str("branch"),
    need: str("need"),
    date: r.intent === "visit" ? str("date") : "",
    message: str("message"),
    company: str("company"),
  };
}

/** Plain-text summary used for the WhatsApp fallback and for notifications. */
export function enquiryMessage(input: EnquiryInput, branchLabel?: string, needLabel?: string) {
  const lines = [
    input.intent === "visit"
      ? "Hello, I'd like to schedule a visit."
      : input.intent === "enquiry"
        ? "Hello, I have a question about care for my parent."
        : "Hello, please call me back about care for my parent.",
    `Name: ${input.name}`,
    `Phone: ${normalisePhone(input.phone)}`,
  ];
  if (branchLabel) lines.push(`Home: ${branchLabel}`);
  if (needLabel) lines.push(`Care needed: ${needLabel}`);
  if (input.date) lines.push(`Preferred date: ${input.date}`);
  if (input.message) lines.push(`Note: ${input.message}`);
  return lines.join("\n");
}
