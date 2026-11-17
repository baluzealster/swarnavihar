import { cn } from "@/lib/cn";
import type { Branch } from "@/content/branches";

/**
 * The brass house nameplate — Swarnavihar's signature element.
 * Reserved for branch names, so it always means "a real place you can visit".
 */
export function Nameplate({ branch, size = "md", className }: { branch: Branch; size?: "sm" | "md" | "lg"; className?: string }) {
  const isPh = branch.house.status === "placeholder";
  return (
    <span className={cn("inline-block p-[5px]", className)} data-placeholder={isPh ? "true" : undefined}>
      <span
        className={cn(
          "nameplate",
          size === "sm" && "px-4 pb-2 pt-2.5",
          size === "md" && "px-6 pb-3 pt-3.5",
          size === "lg" && "px-8 pb-4 pt-5",
        )}
      >
        <span
          className={cn(
            "block font-serif leading-tight text-sage",
            size === "sm" && "text-lg",
            size === "md" && "text-[1.5rem]",
            size === "lg" && "text-[1.85rem]",
          )}
        >
          {branch.house.value}
        </span>
        <span className={cn("mt-1 block text-muted", size === "lg" ? "text-base" : "text-[0.9375rem]")}>{branch.locality}</span>
      </span>
    </span>
  );
}
