import { placeholder } from "./types";

/**
 * Family reviews. The brief forbids invented testimonials: this page shows only reviews that
 * families have agreed in writing to publish, or the homes' own Google reviews.
 */
export const testimonialsPage = {
  path: "/testimonials/",
  h1: "What families say",
  metaTitle: "Family Reviews of Swarnavihar Old Age Homes, Pune",
  metaDescription:
    "Reviews from families whose parents live with us, shared with their permission, and links to each home's Google reviews. We never publish invented reviews.",
  lede: "We only publish reviews that families have agreed, in writing, to share. You can also read each home's reviews on Google, and ask us to put you in touch with a family.",
};

export const googleReviews = placeholder(
  "Links to each home's Google Business Profile reviews, once the profiles are set up (see docs/seo/technical-seo.md).",
);
export const talkToAFamily = placeholder(
  "Whether families who are happy to talk to prospective families can be put in touch (owner to confirm).",
);
