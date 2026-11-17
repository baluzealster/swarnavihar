import type { EnquiryIntent } from "@/lib/enquiry";

/** Lets any "Schedule a visit" button pre-fill the enquiry form (intent and/or home). */
export const PREFILL_EVENT = "swarnavihar:prefill-enquiry";

export interface EnquiryPrefill {
  intent?: EnquiryIntent;
  branch?: string;
}

export function prefillEnquiry(detail: EnquiryPrefill) {
  window.dispatchEvent(new CustomEvent<EnquiryPrefill>(PREFILL_EVENT, { detail }));
}
