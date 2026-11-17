"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { GalleryItem } from "@/content/gallery";
import { Icon } from "@/components/ui/Icon";
import { Illustration } from "@/components/ui/Illustration";

/** A gallery picture: the real photo when there is one, otherwise its illustration. */
export function Picture({ item, sizes, priority, zoom = true }: { item: GalleryItem; sizes: string; priority?: boolean; zoom?: boolean }) {
  return item.src ? (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={"object-cover" + (zoom ? " transition-transform duration-700 ease-out group-hover:scale-[1.04]" : "")}
    />
  ) : (
    <Illustration scene={item.scene} label={item.alt} className="absolute inset-0 h-full w-full" />
  );
}

/**
 * Full-screen picture viewer shared by the gallery grid and the homepage carousel.
 * A native <dialog>: focus is trapped while open, Escape closes it, arrow keys step through,
 * and focus returns to the picture that opened it.
 */
export function useGalleryViewer(items: GalleryItem[], { onOpenChange }: { onOpenChange?: (open: boolean) => void } = {}) {
  const captionId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [current, setCurrent] = useState(0);

  const open = useCallback((i: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setCurrent(i);
    dialogRef.current?.showModal();
    onOpenChange?.(true);
  }, [onOpenChange]);
  const close = () => dialogRef.current?.close();
  const step = useCallback((d: number) => setCurrent((c) => (c + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => { openerRef.current?.focus(); onOpenChange?.(false); };
    dlg.addEventListener("keydown", onKey);
    dlg.addEventListener("close", onClose);
    return () => {
      dlg.removeEventListener("keydown", onKey);
      dlg.removeEventListener("close", onClose);
    };
  }, [step, onOpenChange]);

  const item = items[current];
  const viewer = (
    <dialog
      ref={dialogRef}
      aria-labelledby={captionId}
      className="m-auto w-[min(64rem,calc(100vw-2rem))] max-w-none rounded-card bg-paper p-0 backdrop:bg-ink/80"
      onClick={(e) => { if (e.target === dialogRef.current) close(); }}
    >
      {item && (
        <>
          <div className="relative aspect-[4/3] w-full bg-mist sm:aspect-[16/10]">
            <Picture item={item} sizes="(min-width: 1024px) 64rem, 100vw" zoom={false} />
          </div>
          <div className="flex items-center gap-3 p-4 sm:p-5">
            <p id={captionId} className="flex-1 font-serif text-[1.2rem] text-sage">
              {item.caption}
              <span className="ml-3 font-sans text-small text-muted">{current + 1} of {items.length}</span>
            </p>
            <button type="button" onClick={() => step(-1)} className="inline-flex size-12 items-center justify-center rounded-control text-sage hover:bg-mist" aria-label="Previous picture">
              <Icon name="chevron-left" />
            </button>
            <button type="button" onClick={() => step(1)} className="inline-flex size-12 items-center justify-center rounded-control text-sage hover:bg-mist" aria-label="Next picture">
              <Icon name="chevron-right" />
            </button>
            <button type="button" onClick={close} className="inline-flex size-12 items-center justify-center rounded-control text-sage hover:bg-mist" aria-label="Close" autoFocus>
              <Icon name="close" />
            </button>
          </div>
        </>
      )}
    </dialog>
  );

  return { open, viewer };
}
