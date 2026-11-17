"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
import { site, whatsappLink } from "@/content/site";
import { prefillEnquiry } from "@/components/home/enquiry-events";
import { mainNav } from "./nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("summary, a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-control px-3 font-bold text-sage hover:bg-mist"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? "close" : "menu"} />
        <span className="sr-only sm:not-sr-only">{open ? "Close" : "Menu"}</span>
      </button>
      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="reveal fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto border-t border-line bg-paper px-5 pb-28 pt-4 sm:px-8"
        >
          <nav aria-label="Main">
            <ul>
              {mainNav.map((item) =>
                item.groups ? (
                  <li key={item.href} className="border-b border-line">
                    {/* Native disclosure: works without JavaScript and is announced as expandable. */}
                    <details className="group">
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between py-4 font-serif text-[1.45rem] text-sage [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <Icon name="plus" className="size-6 text-brass-deep transition-transform group-open:rotate-45" />
                      </summary>
                      <div className="pb-4">
                        {item.groups.map((g) => (
                          <div key={g.title ?? "list"} className="mt-2">
                            {g.title && <p className="text-small font-bold text-muted">{g.title}</p>}
                            <ul className="mt-1">
                              {g.links.map((l) => (
                                <li key={l.href + l.label}>
                                  <Link href={l.href} onClick={close} className={`py-2.5 pl-3 text-ink no-underline ${l.icon ? "flex items-center gap-3" : "block"}`}>
                                    {l.icon && (
                                      <span aria-hidden="true" className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-cream ring-1 ring-brass/40">
                                        <Icon name={l.icon} className="size-5 text-brass-deep" />
                                      </span>
                                    )}
                                    <span>
                                      {l.label}
                                      {l.hint && <span className="block text-small text-muted">{l.hint}</span>}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link href={item.href} onClick={close} className="mt-3 block py-2.5 pl-3 font-bold text-sage no-underline">
                          {item.allLabel ?? item.label}
                        </Link>
                      </div>
                    </details>
                  </li>
                ) : (
                  <li key={item.href} className="border-b border-line">
                    <Link href={item.href} onClick={close} className="block py-4 font-serif text-[1.45rem] text-sage no-underline">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="mt-8 grid gap-3">
            <a href="#enquire" onClick={() => { prefillEnquiry({ intent: "visit" }); close(); }} className={buttonClass("primary", "lg")}>Schedule a visit</a>
            <a href={`tel:${site.phone.value.tel}`} className={buttonClass("outline", "lg")}>
              <Icon name="phone" className="size-5" /> Call {site.phone.value.display}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={buttonClass("outline", "lg")}>
              <Icon name="whatsapp" className="size-5" /> WhatsApp us
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
