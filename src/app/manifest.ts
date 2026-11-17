import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Web app manifest: name, colours and icons for "Add to home screen" on phones. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: "Old age homes in Pune and Bengaluru with nursing, visiting doctors and physiotherapy.",
    start_url: "/",
    display: "browser",
    background_color: "#f7f2e7",
    theme_color: "#33503f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
