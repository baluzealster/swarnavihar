import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Ph } from "@/components/ui/Layout";
import { ScheduleVisitLink } from "@/components/ui/ScheduleVisitLink";
import { MobileMenu } from "./MobileMenu";
import { NavMenu } from "./NavMenu";
import { mainNav } from "./nav";

/** Horizontal logo (emblem + "Swarnavihar" wordmark), 1228 × 403. */
const LOGO = { src: "/brand/swarnavihar-logo-horizontal.png", width: 1228, height: 403 };

/**
 * The Swarnavihar logo, linking home. The logo already carries the name, so no text sits
 * beside it; the link's accessible name says it. On dark bands (footer) it sits on a white
 * card, because the artwork is drawn for a light background.
 */
export function Logo({ light = false, size = "md" }: { light?: boolean; size?: "md" | "lg" }) {
  const img = (
    <Image
      src={LOGO.src}
      alt=""
      width={LOGO.width}
      height={LOGO.height}
      priority={!light}
      sizes={size === "lg" ? "260px" : "200px"}
      className={size === "lg" ? "h-20 w-auto sm:h-[5.5rem]" : "h-14 w-auto lg:h-16"}
    />
  );
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 shrink-0 items-center no-underline ${light ? "rounded-card bg-paper px-4 py-2" : ""}`}
      aria-label={`${site.shortName} ${site.tagline}, home page`}
    >
      {img}
    </Link>
  );
}

export function SiteHeader() {
  // Solid background, no backdrop blur: a blur makes the header the containing block for the
  // fixed phone-menu panel, which then shrinks to a strip instead of filling the screen.
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-sage focus:px-4 focus:py-2 focus:text-paper">
        Skip to main content
      </a>
      <Container className="flex min-h-[4.5rem] items-center gap-4 lg:min-h-20 xl:gap-6">
        <Logo />
        <nav aria-label="Main" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {mainNav.map((item) =>
              item.groups ? (
                <NavMenu key={item.href} item={item} />
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="whitespace-nowrap rounded-md px-2 py-2 font-medium text-ink min-[1360px]:px-3 no-underline hover:bg-mist hover:text-sage">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:ml-2">
          <Ph status={site.phone.status} className="hidden lg:inline-flex xl:hidden min-[1360px]:inline-flex">
            <ButtonLink href={`tel:${site.phone.value.tel}`} variant="quiet" icon="phone">
              {site.phone.value.display}
            </ButtonLink>
          </Ph>
          <span className="hidden md:inline-flex">
            <ScheduleVisitLink />
          </span>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
