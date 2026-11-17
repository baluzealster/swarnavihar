"use client";

import { useId, useRef, useState } from "react";
import { branches } from "@/content/branches";
import { site, whatsappLink } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Turnstile, type TurnstileHandle } from "./Turnstile";
import { trackLead } from "@/lib/analytics";
import { normalisePhone } from "@/lib/enquiry";
import { newSubmissionId, submitLead, type SubmitOutcome } from "@/lib/lead-client";

type State = "idle" | "sending" | SubmitOutcome["state"];
type Errors = Partial<Record<"name" | "phone" | "email" | "message" | "branch", string>>;

const fieldCls =
  "min-h-13 w-full rounded-control border-[1.5px] border-line-strong bg-paper px-4 text-[1.0625rem] text-ink placeholder:text-muted/80 focus:border-sage focus:outline-3 focus:outline-offset-1 focus:outline-sage aria-[invalid=true]:border-[#9b2c2c]";

function check(v: { name: string; phone: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your name so we know who to reply to.";
  if (!v.phone && !v.email) e.phone = "Give us a mobile number or an email address so we can reply.";
  if (v.phone && !/^[6-9]\d{9}$/.test(normalisePhone(v.phone))) e.phone = "Enter a 10-digit Indian mobile number, for example 98765 43210.";
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = "Enter a valid email address.";
  if (v.message.trim().length < 5) e.message = "Write a short message so we know how to help.";
  return e;
}

/** General contact form → /api/leads/contact → "Contact Messages" tab. */
export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const submissionId = useRef("");
  const busy = useRef(false);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>("idle");
  const [leadId, setLeadId] = useState<string>();
  const [token, setToken] = useState("");
  const [sentName, setSentName] = useState("");
  const [fallbackText, setFallbackText] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // A ref, not state: two clicks in the same tick both see the old state.
    if (busy.current) return;
    const d = new FormData(e.currentTarget);
    const v = {
      name: String(d.get("name") ?? ""), phone: String(d.get("phone") ?? ""), email: String(d.get("email") ?? ""),
      branch: String(d.get("branch") ?? ""), message: String(d.get("message") ?? ""), company: String(d.get("company") ?? ""),
    };
    const found = check(v);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) return formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();

    submissionId.current ||= newSubmissionId();
    setState("sending");
    setSentName(v.name.split(" ")[0]);
    setFallbackText(`Hello, my name is ${v.name}.\n${v.message}`);
    busy.current = true;
    const outcome = await submitLead("contact", { ...v, submissionId: submissionId.current, turnstileToken: token });
    busy.current = false;
    if (outcome.state === "invalid") {
      setErrors(outcome.fields as Errors);
      setState("idle");
      return;
    }
    if (outcome.state === "sent") {
      setLeadId(outcome.leadId);
      trackLead("contact", { branch: v.branch });
    } else {
      turnstileRef.current?.reset();
      if (outcome.state === "verification") submissionId.current = "";
      requestAnimationFrame(() => resultRef.current?.focus());
    }
    setState(outcome.state);
  }

  if (state === "sent") {
    return (
      <div tabIndex={-1} role="status" ref={(el) => el?.focus()} className="rounded-card border border-line bg-paper p-8">
        <Icon name="check" className="size-10 text-sage" />
        <h2 className="mt-4 text-h3">Thank you, {sentName}. We've got your message.</h2>
        <p className="mt-3 text-muted">Someone from the team will reply soon.</p>
        {leadId && <p className="mt-4 text-small text-muted">Your reference: <strong className="text-ink">{leadId}</strong></p>}
      </div>
    );
  }

  const err = (k: keyof Errors) => (errors[k] ? <p id={`${id}-${k}-err`} className="mt-2 text-small font-bold text-[#9b2c2c]">{errors[k]}</p> : null);
  const desc = (k: keyof Errors) => (errors[k] ? `${id}-${k}-err` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="contact-form-title" className="rounded-card border border-line bg-paper p-6 sm:p-8">
      <h2 id="contact-form-title" className="text-h3">Send us a message</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-name`} className="mb-2 block font-bold">Your name</label>
          <input id={`${id}-name`} name="name" autoComplete="name" maxLength={80} className={fieldCls} aria-invalid={!!errors.name} aria-describedby={desc("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="mb-2 block font-bold">Mobile number</label>
          <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} placeholder="98765 43210" className={fieldCls} aria-invalid={!!errors.phone} aria-describedby={desc("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-2 block font-bold">Email <span className="font-normal text-muted">(optional)</span></label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={120} className={fieldCls} aria-invalid={!!errors.email} aria-describedby={desc("email")} />
          {err("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-branch`} className="mb-2 block font-bold">About which home? <span className="font-normal text-muted">(optional)</span></label>
          <select id={`${id}-branch`} name="branch" defaultValue="" className={fieldCls}>
            <option value="">Any / not sure</option>
            {branches.map((b) => <option key={b.id} value={b.id}>{b.house.value}, {b.locality}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="mb-2 block font-bold">Your message</label>
          <textarea id={`${id}-message`} name="message" rows={5} maxLength={500} className={fieldCls + " min-h-36 py-3"}
            aria-invalid={!!errors.message} aria-describedby={`${id}-message-hint${errors.message ? ` ${id}-message-err` : ""}`} />
          <p id={`${id}-message-hint`} className="mt-2 text-small text-muted">Up to 500 characters. Please don't include detailed medical records.</p>
          {err("message")}
        </div>
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-company`}>Company</label>
          <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <Turnstile ref={turnstileRef} onToken={setToken} action="contact" />
      <button type="submit" disabled={state === "sending"} className={buttonClass("primary", "lg", "mt-6 w-full disabled:opacity-70")}>
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
      {(state === "failed" || state === "not-connected" || state === "verification") && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="mt-5 rounded-control border-l-4 border-brass-deep bg-cream p-5">
          <p className="font-bold">{state === "not-connected" ? "Online messages aren't connected yet." : state === "verification" ? "We couldn't confirm you're not a robot." : "Your message didn't go through."}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={whatsappLink(fallbackText)} target="_blank" rel="noopener noreferrer" data-wa-location="form_fallback" className={buttonClass("primary", "sm")}>
              <Icon name="whatsapp" className="size-5" /> Send on WhatsApp
            </a>
            <a href={`mailto:${site.email.value}`} className={buttonClass("outline", "sm")}>Email us</a>
          </div>
        </div>
      )}
    </form>
  );
}
