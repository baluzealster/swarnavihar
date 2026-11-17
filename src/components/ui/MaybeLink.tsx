import Link from "next/link";
import { isLive } from "@/lib/routes";

/**
 * A link when the page exists, plain text when it doesn't yet. Used in lists where the
 * item is still worth naming (for example a service whose page isn't written yet).
 */
export function MaybeLink({ href, className, textClassName, children }: {
  href: string;
  className?: string;
  /** Class for the plain-text version; defaults to className. */
  textClassName?: string;
  children: React.ReactNode;
}) {
  if (isLive(href)) return <Link href={href} className={className}>{children}</Link>;
  return <span className={textClassName ?? className}>{children}</span>;
}
