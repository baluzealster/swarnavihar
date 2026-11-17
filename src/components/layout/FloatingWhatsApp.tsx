"use client";

import { usePathname } from "next/navigation";
import { whatsappLink } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { whatsappMessageForPath } from "@/lib/whatsapp";

/**
 * Floating WhatsApp button for tablets and desktops. Phones already have WhatsApp in the
 * bottom action bar, so it's hidden there to avoid two overlapping buttons.
 * Click-to-chat only: nothing is sent automatically.
 */
export function FloatingWhatsApp() {
  const path = usePathname() ?? "/";
  return (
    <a
      href={whatsappLink(whatsappMessageForPath(path))}
      target="_blank"
      rel="noopener noreferrer"
      data-wa-location="floating_button"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-30 hidden items-center gap-2 rounded-full bg-sage py-3 pl-4 pr-5 font-bold text-paper no-underline ring-4 ring-paper/70 transition-colors hover:bg-sage-dark md:inline-flex"
    >
      <Icon name="whatsapp" className="size-6" />
      <span>WhatsApp</span>
    </a>
  );
}
