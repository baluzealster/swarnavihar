import type { Scene } from "@/components/ui/Illustration";
import type { FactStatus } from "./types";
import { photos, type Photo } from "./photos";

export interface GalleryItem {
  id: string;
  caption: string;
  /** Alt text for the real photo, written for someone who can't see it. */
  alt: string;
  /** Path of the real photo (see photos.ts). Without one, the illustration is shown. */
  src?: string;
  scene: Scene;
  /** "placeholder" until the photo is consented (people) or real (illustration). */
  status: FactStatus;
}

const fromPhoto = (id: string, caption: string, photo: Photo, scene: Scene): GalleryItem => ({
  id, caption, alt: photo.alt, src: photo.src, scene, status: photo.status,
});

/** The first five make the homepage mosaic (one large, four small); /gallery/ shows all. */
export const gallery: GalleryItem[] = [
  fromPhoto("garden", "The garden, in the evening", photos.gardenEvening, "verandah"),
  fromPhoto("celebration", "Birthdays, celebrated together", photos.celebrationBirthday, "festival"),
  fromPhoto("room", "A twin-sharing room", photos.roomTwin, "room"),
  fromPhoto("carrom", "An afternoon game of carrom", photos.activityCarrom, "daily"),
  fromPhoto("home", "Arriving at one of our homes", photos.building, "gate"),
  fromPhoto("dance", "Music, dancing and visitors", photos.celebrationDance, "festival"),
  fromPhoto("exercise", "Morning exercise in the courtyard", photos.physioCycling, "recovery"),
  fromPhoto("reading", "Reading together", photos.activityReading, "tea"),
  fromPhoto("lawn", "The lawn, ready for an event", photos.gardenLawn, "verandah"),
  fromPhoto("lounge", "Time together in the lounge", photos.loungeResidents, "tea"),
  fromPhoto("care", "A routine check, done gently", photos.careCheckup, "medical"),
  fromPhoto("programme", "A music programme at the home", photos.eventAudience, "festival"),
  fromPhoto("path", "Morning in the garden", photos.gardenPath, "verandah"),
  fromPhoto("ward", "A room set up for nursing care", photos.roomWard, "room"),
  fromPhoto("gathering", "Families and staff, gathered for an event", photos.communityGathering, "festival"),
  { id: "meal", caption: "Lunch from the home's kitchen", alt: "A home-style thali with dal, sabzi, rice and chapatis", scene: "meal", status: "placeholder" },
];

/** Only the real photographs (no illustration stand-ins), for the homepage "Glimpses" carousel. */
export const galleryPhotos: GalleryItem[] = gallery.filter((g) => g.src);
