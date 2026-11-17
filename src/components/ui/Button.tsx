import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import type { IconName } from "@/content/care";

type Variant = "primary" | "outline" | "quiet" | "light" | "ghost-light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-bold leading-none no-underline transition-colors duration-150 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-sage text-paper border-2 border-sage hover:bg-sage-dark hover:border-sage-dark",
  outline: "bg-paper text-sage border-2 border-sage/35 hover:border-sage hover:bg-mist/60",
  quiet: "bg-transparent text-sage border-2 border-transparent hover:bg-mist",
  light: "bg-paper text-sage border-2 border-paper hover:bg-cream",
  /** For dark photo and sage bands only. */
  "ghost-light": "bg-white/5 text-paper border-2 border-paper/60 hover:border-paper hover:bg-white/15",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 text-base",
  md: "min-h-12 px-5 text-[1.0625rem]",
  lg: "min-h-14 px-7 text-lg",
};

/**
 * className is for layout only (margin, width, shrink). Never pass size, colour or display
 * utilities: they would compete with the variant and size classes above.
 */
export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
}

/** Button-styled link. Internal paths use next/link; tel:, wa.me and other URLs use a plain anchor. */
export function ButtonLink({ href, variant, size, icon, className, children, ...rest }: ButtonLinkProps) {
  const cls = buttonClass(variant, size, className);
  const content = (
    <>
      {icon && <Icon name={icon} className="size-5 shrink-0" />}
      <span>{children}</span>
    </>
  );
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {content}
    </a>
  );
}
