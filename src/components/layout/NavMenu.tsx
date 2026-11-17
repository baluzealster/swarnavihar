"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { NavItem } from "./nav";

const linkCls = "whitespace-nowrap rounded-md px-2 py-2 font-medium text-ink no-underline hover:bg-mist hover:text-sage min-[1360px]:px-3";

/**
 * Desktop menu item with a drop-down (disclosure navigation pattern):
 *  - the label stays a normal link to the section's main page;
 *  - hovering opens the drop-down; a small arrow button beside the label opens it for
 *    keyboard and touch users (aria-expanded), and Escape or moving away closes it.
 */
export function NavMenu({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** True while the menu is open only because the pointer is over it. */
  const byHover = useRef(false);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!open) byHover.current = true;
    setOpen(true);
  };
  // A short delay so the menu doesn't vanish while the pointer crosses the gap.
  const hide = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      byHover.current = false;
      setOpen(false);
    }, 150);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const groups = item.groups ?? [];
  const wide = groups.length > 2;
  const single = groups.length === 1 && !groups[0].title;

  return (
    <li
      ref={wrap}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => { if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      <div className="flex items-center">
        <Link href={item.href} className={linkCls}>{item.label}</Link>
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${item.label}: show the list`}
          onClick={() => {
            // A click right after hovering means "keep it open", not "close it again".
            if (byHover.current) {
              byHover.current = false;
              setOpen(true);
            } else {
              setOpen((v) => !v);
            }
          }}
          className="-ml-1.5 inline-flex size-8 items-center justify-center rounded-md text-muted hover:bg-mist hover:text-sage"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2"><path d="m4 6 4 4 4-4" /></svg>
        </button>
      </div>
      <div
        id={id}
        hidden={!open}
        className={`absolute left-0 top-full z-50 pt-3 ${wide ? "w-[46rem]" : single ? "w-[26rem]" : "w-[24rem]"}`}
      >
        <div className={`rounded-card border border-line bg-paper shadow-[0_18px_40px_-12px_rgb(27_42_32/0.35)] ${single ? "p-3" : "p-6"}`}>
          <div className={`grid gap-x-8 gap-y-6 ${wide ? "grid-cols-3" : "grid-cols-1"}`}>
            {groups.map((g) => (
              <div key={g.title ?? "list"}>
                {g.title && <p className="border-b-2 border-sage pb-2 text-small font-bold text-sage">{g.title}</p>}
                <ul className={g.title ? "mt-2" : undefined}>
                  {g.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`rounded-md px-2 py-2 text-ink no-underline hover:bg-mist hover:text-sage ${l.icon ? "flex items-center gap-3" : "block"}`}
                      >
                        {l.icon && (
                          <span aria-hidden="true" className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-cream ring-1 ring-brass/40">
                            <Icon name={l.icon} className="size-5 text-brass-deep" />
                          </span>
                        )}
                        <span>
                          <span className="block font-medium">{l.label}</span>
                          {l.hint && <span className="block text-small text-muted">{l.hint}</span>}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {item.allLabel && (
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 border-t border-line font-bold text-sage no-underline hover:underline ${single ? "mx-2 mt-2 pb-1 pt-3" : "mt-5 pt-4"}`}
            >
              {item.allLabel}
              <Icon name="chevron-right" className="size-4 text-brass-deep" />
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
