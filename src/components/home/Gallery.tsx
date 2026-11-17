"use client";

import { gallery as allItems, type GalleryItem } from "@/content/gallery";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { Picture, useGalleryViewer } from "./GalleryViewer";

/**
 * Photo gallery: a mosaic of moments, opening into an accessible full-screen viewer.
 * The homepage mosaic is designed for 5 items (one large, four small); /gallery/ shows all.
 */
export function Gallery({ limit, items = allItems }: { limit?: number; items?: GalleryItem[] }) {
  const gallery = limit ? items.slice(0, limit) : items;
  /** One large + four small needs exactly 5; anything else uses a simple row. */
  const mosaic = gallery.length === 5;
  const { open, viewer } = useGalleryViewer(gallery);

  return (
    <>
      <ul className={cn("grid gap-x-3 gap-y-5 sm:gap-x-5", mosaic ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-3")}>
        {gallery.map((item, i) => (
          <li
            key={item.id}
            data-placeholder={item.status === "placeholder" ? "true" : undefined}
            className={cn("flex flex-col", mosaic && i === 0 && "col-span-2 lg:row-span-2")}
          >
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group flex flex-1 flex-col text-left"
              aria-label={`Open picture: ${item.caption}`}
            >
              <span className={cn("relative block w-full overflow-hidden rounded-card bg-mist shadow-soft", !mosaic ? "aspect-[4/3]" : i === 0 ? "aspect-square lg:aspect-auto lg:flex-1" : "aspect-square")}>
                <Picture item={item} sizes={!mosaic ? "(min-width: 1024px) 15vw, 33vw" : i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} />
                <span className="absolute right-3 top-3 rounded-full bg-paper/90 p-2 text-sage opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
                  <Icon name="expand" className="size-4" />
                </span>
              </span>
              <span className={cn("mt-2 text-muted group-hover:text-sage group-hover:underline", mosaic ? "text-small" : "text-[0.875rem] leading-snug")}>{item.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      {viewer}
    </>
  );
}
