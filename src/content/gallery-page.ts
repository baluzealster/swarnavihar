import { placeholder } from "./types";

/**
 * Gallery. Real photographs replace the illustrations only with consent from anyone
 * recognisable in them (see docs/photography-brief.md). The old site's gallery has 52
 * photos: they are listed in docs/photo-inventory.md for the owner to choose from.
 */
export const galleryPage = {
  path: "/gallery/",
  h1: "Life at Swarnavihar",
  metaTitle: "Photo Gallery: Life at Our Old Age Homes | Swarnavihar",
  metaDescription:
    "Photographs of daily life at Swarnavihar's homes in Pune: rooms, meals, festivals and the people who care for residents. Visit to see more for yourself.",
  lede: "A look at ordinary days in our homes: tea in the morning, a proper lunch, festivals celebrated together. The best way to see more is to visit.",
};

export const consentNote = placeholder(
  "These photographs were taken at our homes. Pictures that show residents are published only with their, or their family's, written consent.",
);
