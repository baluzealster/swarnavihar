import type { IconName } from "@/content/care";

/** Simple 24px line icons, drawn in-house so we ship no icon library. */
const paths: Record<IconName, React.ReactNode> = {
  phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  whatsapp: <><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19Z" /><path d="M9.5 9c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2Z" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  directions: <><path d="M12 2.5 21.5 12 12 21.5 2.5 12Z" /><path d="M9 13v-2h5" /><path d="m12.5 9 2 2-2 2" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  nurse: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /><path d="M12 15.5v4M10 17.5h4" /></>,
  stethoscope: <><path d="M6 3v6a5 5 0 0 0 10 0V3" /><path d="M11 14v2a4 4 0 0 0 8 0v-1" /><circle cx="19" cy="13" r="2" /></>,
  lungs: <><path d="M12 4v8" /><path d="M12 12c-1.5-1-3-1-3-4 0-1.5-1-2-2-1-2 2-3.5 6-3.5 9.5C3.5 19 5 20 7 20c3 0 5-2 5-5" /><path d="M12 12c1.5-1 3-1 3-4 0-1.5 1-2 2-1 2 2 3.5 6 3.5 9.5 0 2.5-1.5 3.5-3.5 3.5-3 0-5-2-5-5" /></>,
  tube: <><path d="M8 3h8" /><path d="M9 3v10a3 3 0 0 0 6 0V3" /><path d="M12 16v5" /><path d="M9 8h6" /></>,
  walk: <><circle cx="13" cy="4.5" r="2" /><path d="m9 21 2.5-6 2.5 2v4" /><path d="M7 11.5 10 8h4l2 4 3 1" /><path d="m11.5 15 1-5" /></>,
  flask: <><path d="M9 3h6" /><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" /><path d="M7.5 15h9" /></>,
  pill: <><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)" /><path d="m9.2 8.2 5.6 7.6" /></>,
  ambulance: <><path d="M3 17V8h11v9" /><path d="M14 11h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /><path d="M8.5 10.5v4M6.5 12.5h4" /></>,
  home: <><path d="M4 11 12 4l8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-5h4v5" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.5" /><path d="M15.5 14.2A5 5 0 0 1 21 19" /></>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></>,
  "chevron-left": <path d="m15 5-7 7 7 7" />,
  "chevron-right": <path d="m9 5 7 7-7 7" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  message: <path d="M4 5h16v11H9l-5 4Z" />,
  pause: <path d="M9 5v14M15 5v14" />,
  play: <path d="M8 5v14l11-7Z" />,
  hand: <><path d="M7 12V6.5a1.5 1.5 0 0 1 3 0V11" /><path d="M10 10V4.5a1.5 1.5 0 0 1 3 0V11" /><path d="M13 10V5.5a1.5 1.5 0 0 1 3 0V12" /><path d="M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5a6 6 0 0 1-5-2.7L4 14.5a1.5 1.5 0 0 1 2.4-1.8L7 13.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  bed: <><path d="M3 18V7" /><path d="M3 14h18v4" /><path d="M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>,
  brain: <><path d="M12 5.5a3 3 0 0 0-5.6-1.2A3 3 0 0 0 4 8a3 3 0 0 0-.5 5 3.5 3.5 0 0 0 3 5A3 3 0 0 0 12 19.5Z" /><path d="M12 5.5a3 3 0 0 1 5.6-1.2A3 3 0 0 1 20 8a3 3 0 0 1 .5 5 3.5 3.5 0 0 1-3 5 3 3 0 0 1-5.5 1.5" /><path d="M12 5.5v14" /></>,
  cane: <><circle cx="11" cy="4.5" r="2" /><path d="M10 21v-5l-2-3 1-5h3l2 4 2 1" /><path d="M8.5 13 7 21" /><path d="M17 12v9M17 12a1.5 1.5 0 0 0-3 0" /></>,
  pulse: <path d="M3 12h4l2-5 3 10 2.5-7 1.5 2h5" />,
  stroke: <><circle cx="10" cy="4.5" r="2" /><path d="M9 8h3l1.5 4.5" /><path d="M9 8 8 13l2 3v5" /><path d="M8 13l-2 8" /><path d="M16 11v10M16 11h2" /></>,
  wheelchair: <><circle cx="10" cy="4" r="1.8" /><path d="M10 7v6h5l2 5h2" /><path d="M10 10h4" /><path d="M7.5 10.5a5.5 5.5 0 1 0 7.8 6.5" /></>,
  bandage: <><rect x="2.8" y="8.2" width="18.4" height="7.6" rx="3.8" transform="rotate(-45 12 12)" /><path d="M10.5 10.5h.01M13.5 13.5h.01M10.5 13.5h.01M13.5 10.5h.01" /></>,
  meal: <><path d="M3 13h18a9 9 0 0 1-18 0Z" /><path d="M8 9c0-1.5 1-1.5 1-3M12 9c0-1.5 1-1.5 1-3M16 9c0-1.5 1-1.5 1-3" /></>,
  laundry: <><path d="M8 4 4 6.5 5.5 10 7 9.3V20h10V9.3l1.5.7L20 6.5 16 4a4 4 0 0 1-8 0Z" /></>,
  puzzle: <path d="M5 8h3.5a2 2 0 1 1 4 0H16v3.5a2 2 0 1 1 0 4V19h-3.5a2 2 0 1 0-4 0H5v-3.5a2 2 0 1 0 0-4Z" />,
  music: <><path d="M9 18V5.5l11-2V16" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="17.5" cy="16" r="2.5" /></>,
  lotus: <><path d="M12 19c-3-2-4.5-5-4.5-8.5C9.5 11.5 12 13 12 19Z" /><path d="M12 19c3-2 4.5-5 4.5-8.5C14.5 11.5 12 13 12 19Z" /><path d="M12 19c-1.5-3-1.5-8 0-12 1.5 4 1.5 9 0 12Z" /><path d="M12 19c-4 0-8-1.5-9-5 3 0 6.5 1.5 9 5ZM12 19c4 0 8-1.5 9-5-3 0-6.5 1.5-9 5Z" /></>,
  shield: <><path d="M12 3 5 6v5.5c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5V6Z" /><path d="m9 12 2 2 4-4" /></>,
  quote: <path d="M10 7H6.5A1.5 1.5 0 0 0 5 8.5V12h4v1.5A3.5 3.5 0 0 1 5.5 17M19 7h-3.5A1.5 1.5 0 0 0 14 8.5V12h4v1.5a3.5 3.5 0 0 1-3.5 3.5" />,
};

export function Icon({ name, className = "size-6", label }: { name: IconName; className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
