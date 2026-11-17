import Image from "next/image";
import { cn } from "@/lib/cn";
import { scenePhotos, scenePhotosNoPeople, type Photo } from "@/content/photos";
import { Illustration, type Scene } from "./Illustration";

/**
 * Every image slot on the site.
 * - With `src` or `photo`: that photograph via next/image.
 * - Otherwise: the scene's default Swarnavihar photo (src/content/photos.ts), and only when a
 *   scene has no photo yet, the matching illustration from the house set.
 * Photos showing people are placeholders until consent is confirmed (production build guard).
 */
export function PhotoFrame({
  src, alt, photo, scene, shot, ratio = "4/3", priority, sizes = "(min-width: 1024px) 50vw, 100vw", className, elevated, zoom, noPeople,
}: {
  src?: string;
  alt?: string;
  /** A specific photo from src/content/photos.ts, overriding the scene default. */
  photo?: Photo;
  /** Illustration (and default photo) for this slot. */
  scene: Scene;
  /** What the photographer should capture for this slot (kept for the brief and for editors). */
  shot: string;
  ratio?: "4/5" | "4/3" | "3/2" | "16/9" | "1/1";
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Soft shadow and rounded card corners, for photos that sit on a page band. */
  elevated?: boolean;
  /** Slow zoom when a parent `.group` is hovered. */
  zoom?: boolean;
  /** Only people-free photos (pages about a medical condition). */
  noPeople?: boolean;
}) {
  const aspect = { "4/5": "aspect-[4/5]", "4/3": "aspect-[4/3]", "3/2": "aspect-[3/2]", "16/9": "aspect-video", "1/1": "aspect-square" }[ratio];
  const chosen: Photo | undefined = src ? { src, alt: alt ?? "", width: 0, height: 0, people: false, status: "verified" } : photo ?? (noPeople ? scenePhotosNoPeople : scenePhotos)[scene];

  return (
    <div
      className={cn("relative overflow-hidden bg-mist", elevated ? "rounded-card shadow-soft" : "rounded-photo", aspect, className)}
      data-photo-shot={chosen ? undefined : shot}
      data-placeholder={chosen?.status === "placeholder" ? "true" : undefined}
    >
      {chosen ? (
        <Image
          src={chosen.src}
          alt={alt ?? chosen.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", zoom && "transition-transform duration-700 ease-out group-hover:scale-[1.04]")}
          style={chosen.focus ? { objectPosition: chosen.focus } : undefined}
        />
      ) : (
        <Illustration scene={scene} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
