import { Fragment } from "react";
import type { Block } from "@/content/blocks";
import { Icon } from "@/components/ui/Icon";
import { Ph } from "@/components/ui/Layout";
import { MaybeLink } from "@/components/ui/MaybeLink";
import { cn } from "@/lib/cn";

/** Renders **bold** inside a string. */
function Bold({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return <>{parts.map((part, i) => (/^\*\*[^*]+\*\*$/.test(part) ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>))}</>;
}

const linkCls = "font-medium text-sage underline decoration-sage/40 underline-offset-[3px] hover:decoration-sage";

/** Renders "[text](/path/)" links and **bold** inside a string. External links open in a new tab. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return <Bold key={i} text={part} />;
        if (/^https?:\/\//.test(m[2])) {
          return <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className={linkCls}>{m[1]}</a>;
        }
        return <MaybeLink key={i} href={m[2]} className={linkCls}>{m[1]}</MaybeLink>;
      })}
    </>
  );
}

const slug = (s: string) => s.replace(/\*\*/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";

/** Ids for every h2, unique within the article (old posts sometimes repeat a heading). */
export function tocEntries(blocks: Block[]) {
  const used = new Map<string, number>();
  const ids = new Map<number, string>();
  const entries: { text: string; id: string }[] = [];
  blocks.forEach((b, i) => {
    if (b.type !== "h2") return;
    const base = slug(b.text);
    const n = (used.get(base) ?? 0) + 1;
    used.set(base, n);
    const id = n === 1 ? base : `${base}-${n}`;
    ids.set(i, id);
    entries.push({ text: b.text, id });
  });
  return { entries, ids };
}

/** Long-form text at a comfortable reading width. Headings get ids for the contents list. */
export function Prose({ blocks, className }: { blocks: Block[]; className?: string }) {
  const { ids } = tocEntries(blocks);
  return (
    <div className={cn("max-w-read text-ink [overflow-wrap:anywhere]", className)}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i} id={ids.get(i)} className="mt-14 scroll-mt-28 text-h2 first:mt-0"><Inline text={b.text} /></h2>;
          case "h3":
            return <h3 key={i} className="mt-9 text-h3"><Inline text={b.text} /></h3>;
          case "p":
            return <Ph key={i} status={b.status ?? "editorial"} as="p" className="mt-5"><Inline text={b.text} /></Ph>;
          case "ul":
            return (
              <Ph key={i} status={b.status ?? "editorial"} as="div" className="mt-5">
                <ul className="list-disc space-y-2 pl-6 marker:text-brass-deep">
                  {b.items.map((it) => <li key={it}><Inline text={it} /></li>)}
                </ul>
              </Ph>
            );
          case "ol":
            return (
              <ol key={i} className="mt-5 list-decimal space-y-2 pl-6 marker:font-bold marker:text-brass-deep">
                {b.items.map((it) => <li key={it}><Inline text={it} /></li>)}
              </ol>
            );
          case "checklist":
            return (
              <ul key={i} className="mt-5 space-y-3">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <Icon name="check" className="mt-1 size-5 shrink-0 text-brass-deep" />
                    <span><Inline text={it} /></span>
                  </li>
                ))}
              </ul>
            );
          case "note":
            return (
              <Ph key={i} status={b.status ?? "editorial"} as="div" className={cn("mt-8 rounded-card border-l-4 p-5 sm:p-6", b.tone === "warning" ? "border-[#9b2c2c] bg-[#fbf1ee]" : "border-brass bg-mist")}>
                <p className="font-bold">{b.title}</p>
                <p className="mt-2"><Inline text={b.text} /></p>
              </Ph>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-card border border-line">
                <table className="w-full min-w-[34rem] border-collapse text-left text-small">
                  <thead className="bg-mist">
                    <tr>{b.head.map((h, j) => <th key={j} scope="col" className="p-3 font-bold">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-line align-top">
                        {r.map((c, k) => (k === 0 ? <th key={k} scope="row" className="p-3 font-bold">{c}</th> : <td key={k} className="p-3">{c}</td>))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "compare":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-card border border-line">
                <table className="w-full min-w-[34rem] border-collapse text-left text-small">
                  <thead className="bg-mist">
                    <tr>
                      <th scope="col" className="p-3 font-bold"><span className="sr-only">Question</span></th>
                      <th scope="col" className="p-3 font-bold">{b.columns[0]}</th>
                      <th scope="col" className="p-3 font-bold">{b.columns[1]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r) => (
                      <tr key={r.label} className="border-t border-line align-top">
                        <th scope="row" className="p-3 font-bold">{r.label}</th>
                        <td className="p-3">{r.a}</td>
                        <td className="p-3">{r.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
