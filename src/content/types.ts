/**
 * Every business fact on the site carries a status.
 *  - verified:    confirmed by the owner
 *  - sourced:     copied from the old website, owner still to confirm
 *  - placeholder: dummy value — the production build refuses to run while any remain
 *  - editorial:   general information we wrote (how care works, what to ask). It makes no
 *                 claim about Swarnavihar itself, so there's nothing for the owner to confirm.
 */
export type FactStatus = "verified" | "sourced" | "placeholder" | "editorial";

export interface Fact<T> {
  value: T;
  status: FactStatus;
}

export const verified = <T,>(value: T): Fact<T> => ({ value, status: "verified" });
export const sourced = <T,>(value: T): Fact<T> => ({ value, status: "sourced" });
export const placeholder = <T,>(value: T): Fact<T> => ({ value, status: "placeholder" });
export const editorial = <T,>(value: T): Fact<T> => ({ value, status: "editorial" });

export const isPlaceholder = (f: { status: FactStatus }) => f.status === "placeholder";
