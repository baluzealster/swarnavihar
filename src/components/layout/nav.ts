import { areas, branches } from "@/content/branches";
import { serviceHref, services } from "@/content/services";
import type { IconName } from "@/content/care";
import { isLive } from "@/lib/routes";

export interface NavLink { href: string; label: string; hint?: string; icon?: IconName }
/** A titled group of links; an untitled group is a plain single list. */
export interface NavGroup { title?: string; links: NavLink[] }
export interface NavItem extends NavLink {
  /** Drop-down contents (shown on hover / focus on desktop, as an expandable list on phones). */
  groups?: NavGroup[];
  /** The "see everything" link at the foot of the drop-down. */
  allLabel?: string;
}

/** Services that have a page: one plain list (no categories), each with its icon. */
export const serviceMenu: NavGroup[] = [
  {
    links: services
      .filter((s) => isLive(serviceHref(s)))
      .map((s) => ({ href: serviceHref(s), label: s.title, icon: s.icon })),
  },
];

/** Our homes: one plain list (no city headings), each home with its area page. */
export const homesMenu: NavGroup[] = [
  {
    links: branches.map((b) => {
      const area = areas.find((a) => a.key === b.area);
      const city = b.area === "bengaluru" ? "Bengaluru" : "Pune";
      return {
        href: area?.href && isLive(area.href) ? area.href : "/branches/",
        label: b.house.value,
        hint: `${b.locality}, ${city}`,
        icon: "home" as const,
      };
    }),
  },
];

/** Pages that aren't built yet are left out until they go live (see src/lib/routes.ts). */
const allNav: NavItem[] = [
  { href: "/service/", label: "Care services", groups: serviceMenu, allLabel: "All care services" },
  { href: "/branches/", label: "Our homes", groups: homesMenu, allLabel: "All our homes" },
  { href: "/facilities/", label: "Facilities" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/admission/", label: "Admission" },
  { href: "/about/", label: "About" },
  { href: "/blog/", label: "Blog" },
];

export const mainNav = allNav.filter((item) => isLive(item.href));
