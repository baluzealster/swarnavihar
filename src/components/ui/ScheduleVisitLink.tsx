"use client";

import { prefillEnquiry } from "@/components/home/enquiry-events";
import { buttonClass } from "./Button";
import { Icon } from "./Icon";

/**
 * The primary CTA everywhere on the site. Jumps to the enquiry form with "Schedule a visit"
 * selected (and the home, when given). Works as a plain link without JavaScript.
 */
export function ScheduleVisitLink({
  branch, houseName, size = "md", variant = "primary", withIcon = false, className, children = "Schedule a visit",
}: {
  branch?: string;
  /** Home name, used for a distinct accessible name: "Schedule a visit to Ananda Nivas". */
  houseName?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "light" | "ghost-light";
  withIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href="#enquire"
      aria-label={houseName ? `Schedule a visit to ${houseName}` : undefined}
      onClick={() => prefillEnquiry({ intent: "visit", branch })}
      className={buttonClass(variant, size, className)}
    >
      {withIcon && <Icon name="calendar" className="size-5 shrink-0" />}
      <span>{children}</span>
    </a>
  );
}
