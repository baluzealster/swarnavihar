import { placeholder, sourced, type Fact } from "./types";
import type { GalleryItem } from "./gallery";

export type AreaKey = "baner" | "wakad" | "sinhgad-road" | "pimple-nilakh" | "bengaluru";

export interface Branch {
  id: string;
  house: Fact<string>;
  locality: string;
  address: Fact<string>;
  city: "Pune" | "Bengaluru";
  phone: Fact<{ display: string; tel: string }>;
  area: AreaKey;
}

export const branches: Branch[] = [
  {
    id: "baner",
    house: sourced("Ananda Nivas"),
    locality: "Baner",
    address: sourced("Constellation Building, Sr No 52/4/1/10, behind 52 Green Woods Apartments, Pashan–Sus Road, Baner, Pune 411045"),
    city: "Pune",
    phone: placeholder({ display: "+91 00000 00002", tel: "+910000000002" }),
    area: "baner",
  },
  {
    id: "sus",
    house: sourced("Achyutha Nivas"),
    locality: "Sus",
    address: sourced("Near Hyundai Service Center, Ravi Nagar, Pashan–Sus Road, Sus, Pune 411021"),
    city: "Pune",
    phone: placeholder({ display: "+91 00000 00003", tel: "+910000000003" }),
    area: "baner",
  },
  {
    id: "wakad",
    house: sourced("Akshaya Nivas"),
    locality: "Wakad",
    address: sourced("Laxmi Sadan Building, Sr No 176/1/5, Chowdhary Park, behind Sentosa Elysium, Wakad, Pune 411057"),
    city: "Pune",
    phone: placeholder({ display: "+91 00000 00004", tel: "+910000000004" }),
    area: "wakad",
  },
  {
    id: "sinhgad-road",
    house: sourced("Amulya Nivas"),
    locality: "Vadgaon Budruk",
    address: sourced("Sr No 53/2/15, Kudale Pravesh Baug, Narayan Baug Road, near Navle Bridge, Vadgaon Budruk, Sinhgad Road, Pune 411041"),
    city: "Pune",
    phone: placeholder({ display: "+91 00000 00001", tel: "+910000000001" }),
    area: "sinhgad-road",
  },
  {
    id: "pimple-nilakh",
    house: placeholder("Anugraha Nivas"),
    locality: "Pimple Nilakh",
    address: placeholder("Sample Road, Pimple Nilakh, Pune 411027"),
    city: "Pune",
    phone: placeholder({ display: "+91 00000 00005", tel: "+910000000005" }),
    area: "pimple-nilakh",
  },
  {
    id: "bengaluru",
    house: sourced("Swarnavihar Bengaluru"),
    locality: "Gottigere",
    address: sourced("118/2, Flat 102, Doctors Layout, Kembathalli Main Road, Bannerghatta Road, Gottigere, Bengaluru 560083"),
    city: "Bengaluru",
    phone: placeholder({ display: "+91 00000 00006", tel: "+910000000006" }),
    area: "bengaluru",
  },
];

export interface Area {
  key: AreaKey;
  label: string;
  /** Neighbourhoods families search for — used on chips and location pages. */
  covers: string[];
  /** Short label for the hero area picker. */
  chip: string;
  /** Location landing page (built in Phase 6). Bengaluru has none in the brief. */
  href?: string;
}

export const areas: Area[] = [
  { key: "baner", label: "Baner", chip: "Baner, Balewadi", covers: ["Baner", "Balewadi", "Pashan", "Sus"], href: "/old-age-home-baner-pune/" },
  { key: "wakad", label: "Wakad", chip: "Wakad, Hinjewadi", covers: ["Wakad", "Pimple Saudagar", "Hinjewadi"], href: "/old-age-home-wakad-pune/" },
  { key: "sinhgad-road", label: "Sinhgad Road", chip: "Sinhgad Road, Kothrud", covers: ["Vadgaon Budruk", "Dhayari", "Kothrud"], href: "/old-age-home-sinhgad-road-pune/" },
  { key: "pimple-nilakh", label: "Pimple Nilakh", chip: "Pimple Nilakh, Aundh", covers: ["Pimple Nilakh", "Aundh", "Sangvi"], href: "/old-age-home-pimple-nilakh-pune/" },
  { key: "bengaluru", label: "Bengaluru", chip: "Bengaluru", covers: ["Gottigere", "Bannerghatta Road"] },
];

export const branchesIn = (area: AreaKey) => branches.filter((b) => b.area === area);

/**
 * Photo set for a home's location page. Every entry is a placeholder until a real,
 * consented photograph of that home is added as `src` (see docs/photography-brief.md).
 */
export function branchPhotos(b: Branch): GalleryItem[] {
  const house = b.house.value;
  return [
    { id: `${b.id}-gate`, caption: `The gate at ${house}`, alt: `The front gate and brass nameplate of ${house}, ${b.locality}`, scene: "gate", status: "placeholder" },
    { id: `${b.id}-room`, caption: `A room at ${house}`, alt: `A made bed beside a window in a resident's room at ${house}`, scene: "room", status: "placeholder" },
    { id: `${b.id}-sitout`, caption: `The sit-out at ${house}`, alt: `Chairs and a small table in the sit-out at ${house}`, scene: "verandah", status: "placeholder" },
  ];
}

export const mapsSearchUrl = (b: Branch) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.house.value}, ${b.address.value}`)}`;
