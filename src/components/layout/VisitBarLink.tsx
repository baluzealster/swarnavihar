"use client";

import { prefillEnquiry } from "@/components/home/enquiry-events";
import { Icon } from "@/components/ui/Icon";

export function VisitBarLink({ className }: { className: string }) {
  return (
    <a href="#enquire" onClick={() => prefillEnquiry({ intent: "visit" })} className={className}>
      <Icon name="calendar" className="size-5" /> Schedule a visit
    </a>
  );
}
