import { site, whatsappLink } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { VisitBarLink } from "./VisitBarLink";

/** Fixed contact bar on phones and small tablets: the three things families do most. */
export function MobileActionBar() {
  const item = "flex min-h-16 flex-col items-center justify-center gap-0.5 text-[0.9375rem] font-bold no-underline";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-line-strong bg-paper pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <a href={`tel:${site.phone.value.tel}`} className={`${item} text-sage`}>
        <Icon name="phone" className="size-5" /> Call
      </a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" data-wa-location="mobile_bar" className={`${item} border-l border-line text-sage`}>
        <Icon name="whatsapp" className="size-5" /> WhatsApp
      </a>
      <VisitBarLink className={`${item} bg-sage text-paper`} />
    </nav>
  );
}
