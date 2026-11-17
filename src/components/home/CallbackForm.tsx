"use client";

import { useEffect, useId, useRef, useState } from "react";
import { branches } from "@/content/branches";
import { serviceGroups } from "@/content/services";
import { site, whatsappLink } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Turnstile, type TurnstileHandle } from "@/components/forms/Turnstile";
import { trackLead } from "@/lib/analytics";
import { enquiryMessage, todayInIndia, validateEnquiry, type EnquiryErrors, type EnquiryInput, type EnquiryIntent } from "@/lib/enquiry";
import { newSubmissionId, submitLead, type SubmitOutcome } from "@/lib/lead-client";
import type { LeadKind } from "@/lib/leads/types";
import { PREFILL_EVENT, type EnquiryPrefill } from "./enquiry-events";
import { isLive } from "@/lib/routes";

type State = "idle" | "sending" | SubmitOutcome["state"];

const fieldCls =
  "min-h-13 w-full rounded-control border-[1.5px] border-line-strong bg-paper px-4 text-[1.0625rem] text-ink placeholder:text-muted/80 focus:border-sage focus:outline-3 focus:outline-offset-1 focus:outline-sage aria-[invalid=true]:border-[#9b2c2c]";

const INTENT: Record<EnquiryIntent, { label: string; button: string; kind: LeadKind }> = {
  visit: { label: "Schedule a visit", button: "Request a visit", kind: "schedule-visit" },
  callback: { label: "Get a call back", button: "Request a call back", kind: "callback" },
  enquiry: { label: "Ask a question", button: "Send my question", kind: "enquiry" },
};

const branchLabel = (id: string) => {
  const b = branches.find((x) => x.id === id);
  return b ? `${b.house.value}, ${b.locality}` : undefined;
};
const needLabel = (key: string) => serviceGroups.find((g) => g.key === key)?.title;

type FieldErrors = EnquiryErrors & Partial<Record<"message" | "branch" | "need", string>>;

/**
 * One form for visits, call-backs and enquiries. Each choice posts to its own API route
 * (/api/leads/schedule-visit, /callback or /enquiry) and lands in its own Google Sheets tab.
 */
export function CallbackForm({
  intents = ["visit", "callback"],
  defaultIntent = intents[0],
  defaultBranch = "",
  defaultNeed = "",
  service = "",
}: {
  intents?: EnquiryIntent[];
  defaultIntent?: EnquiryIntent;
  defaultBranch?: string;
  defaultNeed?: string;
  /** Service slug when the form sits on a service page. */
  service?: string;
} = {}) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const submissionId = useRef<string>("");
  const busy = useRef(false);
  const [intent, setIntent] = useState<EnquiryIntent>(defaultIntent);
  const [branch, setBranch] = useState(defaultBranch);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<State>("idle");
  const [sent, setSent] = useState<EnquiryInput | null>(null);
  const [leadId, setLeadId] = useState<string | undefined>();
  const [token, setToken] = useState("");
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  const [maxDate, setMaxDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMinDate(todayInIndia());
    setMaxDate(todayInIndia(new Date(Date.now() + 365 * 24 * 3600 * 1000)));
    const onPrefill = (e: Event) => {
      const d = (e as CustomEvent<EnquiryPrefill>).detail;
      if (d.intent && intents.includes(d.intent)) setIntent(d.intent);
      if (d.branch !== undefined) setBranch(d.branch);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, [intents]);

  useEffect(() => {
    if (state !== "idle" && state !== "sending") resultRef.current?.focus();
  }, [state]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // A ref, not state: two clicks in the same tick both see the old state.
    if (busy.current) return;
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "");
    const input: EnquiryInput = {
      intent,
      name: get("name"),
      phone: get("phone"),
      branch: get("branch"),
      need: get("need"),
      date: intent === "visit" ? get("date") : "",
      message: get("message"),
      company: get("company"),
    };
    const found = validateEnquiry(input);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // One id per form fill: a retry after a network error can't create a second lead.
    submissionId.current ||= newSubmissionId();
    busy.current = true;
    setState("sending");
    setSent(input);
    const kind = INTENT[intent].kind;
    const outcome = await submitLead(kind, { ...input, service, submissionId: submissionId.current, turnstileToken: token });
    busy.current = false;

    if (outcome.state === "invalid") {
      setErrors(outcome.fields as FieldErrors);
      setState("idle");
      const f = Object.keys(outcome.fields)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${f}"]`)?.focus();
      return;
    }
    if (outcome.state === "sent") {
      setLeadId(outcome.leadId);
      trackLead(kind, { branch: input.branch, need: input.need, service });
    } else {
      // Tokens are single-use: get a fresh one for the next attempt.
      turnstileRef.current?.reset();
      if (outcome.state === "verification") submissionId.current = "";
    }
    setState(outcome.state);
  }

  if (state === "sent" && sent) {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-card border border-line bg-paper p-8 shadow-lift">
        <Icon name="check" className="size-10 text-sage" />
        <h3 className="mt-4 text-h3">Thank you, {sent.name.split(" ")[0]}.</h3>
        <p className="mt-3 text-muted">
          {sent.intent === "visit"
            ? "We'll call you to confirm a visiting time."
            : sent.intent === "enquiry"
              ? "We'll get back to you with an answer, usually by phone."
              : "We'll call you back on the number you gave us."}{" "}
          If it's urgent, call us now on <a className="font-bold text-sage" href={`tel:${site.phone.value.tel}`}>{site.phone.value.display}</a>.
        </p>
        {leadId && <p className="mt-4 text-small text-muted">Your reference: <strong className="font-bold text-ink">{leadId}</strong></p>}
      </div>
    );
  }

  const err = (k: keyof FieldErrors) =>
    errors[k] ? <p id={`${id}-${k}-err`} className="mt-2 text-small font-bold text-[#9b2c2c]">{errors[k]}</p> : null;
  const described = (k: keyof FieldErrors) => (errors[k] ? `${id}-${k}-err` : undefined);
  const failed = state === "not-connected" || state === "failed" || state === "verification";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="enquire-title" className="rounded-card border border-line bg-paper p-6 shadow-lift sm:p-8">
      {intents.length > 1 && (
        <fieldset>
          <legend className="mb-3 font-bold">I'd like to</legend>
          <div className={"grid gap-2 rounded-control bg-cream p-1.5 " + (intents.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2")}>
            {intents.map((value) => (
              <label
                key={value}
                className={
                  "flex min-h-12 cursor-pointer items-center justify-center rounded-[6px] px-3 text-center font-bold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sage " +
                  (intent === value ? "bg-sage text-paper" : "text-sage hover:bg-paper")
                }
              >
                <input type="radio" name="intent" value={value} checked={intent === value} onChange={() => setIntent(value)} className="sr-only" />
                {INTENT[value].label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-2 block font-bold">Your name</label>
          <input id={`${id}-name`} name="name" autoComplete="name" maxLength={80} className={fieldCls}
            aria-invalid={!!errors.name} aria-describedby={described("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="mb-2 block font-bold">Mobile number</label>
          <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} placeholder="98765 43210" className={fieldCls}
            aria-invalid={!!errors.phone} aria-describedby={described("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${id}-branch`} className="mb-2 block font-bold">Nearest home</label>
          <select id={`${id}-branch`} name="branch" value={branch} onChange={(e) => setBranch(e.target.value)} className={fieldCls}
            aria-invalid={!!errors.branch} aria-describedby={described("branch")}>
            <option value="">Not sure yet</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>{b.house.value}, {b.locality}</option>
            ))}
          </select>
          {err("branch")}
        </div>
        {intent === "visit" ? (
          <div>
            <label htmlFor={`${id}-date`} className="mb-2 block font-bold">
              Preferred date <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id={`${id}-date`} name="date" type="date" min={minDate} max={maxDate} className={fieldCls}
              aria-invalid={!!errors.date} aria-describedby={described("date")} />
            {err("date")}
          </div>
        ) : (
          <div>
            <label htmlFor={`${id}-need`} className="mb-2 block font-bold">What does your parent need?</label>
            <select id={`${id}-need`} name="need" defaultValue={defaultNeed} className={fieldCls}>
              <option value="">Not sure yet</option>
              {serviceGroups.map((g) => <option key={g.key} value={g.key}>{g.title}</option>)}
            </select>
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="mb-2 block font-bold">
            {intent === "enquiry" ? "Your question" : "Anything we should know?"} <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea id={`${id}-message`} name="message" rows={3} maxLength={500} className={fieldCls + " min-h-28 py-3"}
            aria-describedby={`${id}-message-hint${errors.message ? ` ${id}-message-err` : ""}`}
            placeholder="For example: Mother, 82, needs help walking after a hip operation" />
          <p id={`${id}-message-hint`} className="mt-2 text-small text-muted">A line or two is enough. Please don't share detailed medical records here; we'll ask for what we need when we talk.</p>
          {err("message")}
        </div>
        {/* Honeypot: hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-company`}>Company</label>
          <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <Turnstile ref={turnstileRef} onToken={setToken} action={INTENT[intent].kind} />

      <button type="submit" disabled={state === "sending"} className={buttonClass("primary", "lg", "mt-6 w-full disabled:opacity-70")}>
        {state === "sending" ? "Sending…" : INTENT[intent].button}
      </button>
      <p className="mt-4 text-small text-muted">
        We'll only use your details to talk to you about care.{isLive("/privacy-policy/") && <> <a href="/privacy-policy/" className="text-sage underline">Privacy policy</a></>}
      </p>

      {failed && sent && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="mt-5 rounded-control border-l-4 border-brass-deep bg-cream p-5">
          <p className="font-bold">
            {state === "not-connected"
              ? "Online requests aren't connected yet."
              : state === "verification"
                ? "We couldn't confirm you're not a robot."
                : "Your request didn't go through."}
          </p>
          <p className="mt-1 text-small text-muted">
            {state === "verification" ? "Please try again, or send" : "Send"} the same details to us on WhatsApp instead. It's already written for you.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={whatsappLink(enquiryMessage(sent, branchLabel(sent.branch), needLabel(sent.need)))}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-location="form_fallback"
              className={buttonClass("primary", "sm")}
            >
              <Icon name="whatsapp" className="size-5" /> Send on WhatsApp
            </a>
            <a href={`tel:${site.phone.value.tel}`} className={buttonClass("outline", "sm")}>
              <Icon name="phone" className="size-5" /> Call {site.phone.value.display}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
