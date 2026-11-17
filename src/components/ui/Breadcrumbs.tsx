import Link from "next/link";

export interface Crumb {
  name: string;
  href: string;
}

/** Breadcrumb trail. The last crumb is the current page and is not a link. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-small">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">{c.name}</span>
              ) : (
                <>
                  <Link href={c.href} className="text-sage underline-offset-4 hover:underline">{c.name}</Link>
                  <span aria-hidden="true" className="text-brass-deep">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
