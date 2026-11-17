import type { Scene } from "@/components/ui/Illustration";
import type { FactStatus } from "./types";

/**
 * Real Swarnavihar photographs, taken from the old website's media library
 * (see docs/photo-inventory.md) and optimised into /public/photos/ (EXIF and GPS stripped).
 *
 * Status rules:
 *  - "sourced":     no identifiable person (buildings, gardens, rooms). The owner still confirms
 *                   Swarnavihar owns the photo before launch.
 *  - "placeholder": shows residents or staff. Needs written consent from everyone recognisable,
 *                   so the production build is blocked until the owner marks it "verified"
 *                   (or removes it). Health care is a sensitive context.
 */
export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  people: boolean;
  status: FactStatus;
  /** Where in the frame the subject sits, for object-position on crops. */
  focus?: string;
}

const p = (file: string, alt: string, width: number, height: number, people: boolean, focus?: string): Photo => ({
  src: `/photos/${file}.jpg`,
  alt,
  width,
  height,
  people,
  status: people ? "placeholder" : "sourced",
  focus,
});

export const photos = {
  gardenLawn: p("garden-lawn", "A wide green lawn lined with palms and plants, beside the home's building", 1360, 907, false),
  gardenEvening: p("garden-evening", "The garden path at dusk, lit by soft green garden lights", 1360, 907, false),
  gardenPath: p("garden-path", "A stone stepping-path across a freshly watered lawn in the morning", 1360, 907, false),
  building: p("building", "The front of a Swarnavihar home: a clean, multi-storey residential building with balconies", 1600, 1066, false, "50% 40%"),
  entranceGate: p("entrance-gate", "The front gate of a Swarnavihar home, shaded by a large tree", 1280, 853, false),
  roomTwin: p("room-twin", "A bright twin-sharing room with two beds, large windows and blue curtains", 1280, 853, false),
  roomWard: p("room-ward", "A spacious, airy room with a hospital bed, ceiling fan and wide windows", 1280, 853, false),
  roomBed: p("room-bed", "A neatly made adjustable bed beside a window", 1280, 853, false),
  ambulance: p("ambulance", "The Swarnavihar ambulance parked at the home", 1360, 907, false),
  doctorRoom: p("doctor-room", "The consultation room with a desk, chairs and an examination bed", 1280, 853, false),

  careCheckup: p("care-checkup", "A nurse gently checking a resident's blood pressure", 1360, 907, true, "50% 35%"),
  careCompanion: p("care-companion", "A nurse sitting and talking with two smiling residents", 1174, 853, true, "50% 30%"),
  careWater: p("care-water", "A carer helping a resident drink a glass of water", 768, 514, true),
  physioCycling: p("physio-cycling", "Two residents exercising on stationary cycles in the courtyard", 853, 1280, true, "50% 35%"),
  physioBed: p("physio-bed", "A physiotherapist guiding a resident through leg exercises on a bed", 1280, 853, true),
  nursingBipap: p("nursing-bipap", "A nurse adjusting a resident's BiPAP breathing mask in bed", 1280, 853, true),
  activityCarrom: p("activity-carrom", "Residents playing a game of carrom together", 1280, 853, true),
  activityReading: p("activity-reading", "Residents and a carer reading together on a sofa", 1280, 853, true),
  celebrationBirthday: p("celebration-birthday", "A resident's birthday celebration with balloons, a cake and family", 1280, 854, true),
  celebrationDance: p("celebration-dance", "Residents and visitors dancing and laughing at a celebration", 1360, 907, true),
  loungeResidents: p("lounge-residents", "Residents relaxing together in the lounge", 1440, 855, true),
  careTeam: p("care-team", "The Swarnavihar care team, in uniform, in front of the home", 1280, 853, true),
  eventAudience: p("event-audience", "Residents enjoying a music programme at the home", 1360, 907, true),
  communityGathering: p("community-gathering", "Residents, families and staff gathered in the courtyard for an event", 1280, 853, true),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/**
 * The default photograph for each illustration scene. Any PhotoFrame without its own `src`
 * shows this photo; scenes without one (meal) keep their illustration.
 */
export const scenePhotos: Partial<Record<Scene, Photo>> = {
  verandah: photos.gardenLawn,
  tea: photos.loungeResidents,
  medical: photos.careCheckup,
  recovery: photos.physioCycling,
  room: photos.roomTwin,
  daily: photos.activityCarrom,
  festival: photos.celebrationBirthday,
  gate: photos.building,
};

/**
 * People-free defaults, for pages about a medical condition (service pages, health articles).
 * Showing a recognisable resident next to "dementia" or "paralysis" would imply their
 * diagnosis, so those pages only ever show places.
 */
export const scenePhotosNoPeople: Partial<Record<Scene, Photo>> = {
  verandah: photos.gardenLawn,
  tea: photos.gardenPath,
  medical: photos.doctorRoom,
  recovery: photos.roomBed,
  room: photos.roomTwin,
  daily: photos.roomWard,
  festival: photos.gardenEvening,
  gate: photos.building,
};

/** Homepage hero slideshow, "Glimpses of Swarnavihar": one photo at a time, every 2 seconds. */
export const heroSlides: { photo: Photo; caption: string }[] = [
  { photo: photos.building, caption: "One of our homes" },
  { photo: photos.gardenEvening, caption: "The garden, in the evening" },
  { photo: photos.roomTwin, caption: "A twin-sharing room" },
  { photo: photos.celebrationBirthday, caption: "Birthdays, celebrated together" },
  { photo: photos.gardenLawn, caption: "The lawn, ready for an event" },
  { photo: photos.activityCarrom, caption: "An afternoon game of carrom" },
  { photo: photos.careCompanion, caption: "Time to talk, every day" },
  { photo: photos.loungeResidents, caption: "Together in the lounge" },
];
