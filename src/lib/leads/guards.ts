/**
 * Rate limiting and duplicate protection, held in memory.
 *
 * On Vercel each warm serverless instance keeps its own copy, so these are a cheap first
 * line of defence rather than a global guarantee. Turnstile is the main bot barrier, and the
 * per-submission id means a retried request never creates a second lead on the same instance.
 * No database is needed; if abuse ever becomes real, swap these for a hosted key-value store.
 */

export class SlidingWindowLimiter {
  private hits = new Map<string, number[]>();
  constructor(private limit: number, private windowMs: number) {}

  /** Records a hit and returns true when the key is over the limit. */
  hit(key: string, now: number): boolean {
    const recent = (this.hits.get(key) ?? []).filter((t) => now - t < this.windowMs);
    recent.push(now);
    this.hits.set(key, recent);
    if (this.hits.size > 5000) this.prune(now);
    return recent.length > this.limit;
  }

  private prune(now: number) {
    for (const [k, v] of this.hits) if (v.every((t) => now - t >= this.windowMs)) this.hits.delete(k);
  }

  clear() {
    this.hits.clear();
  }
}

export class TtlCache<V> {
  private items = new Map<string, { at: number; value: V }>();
  constructor(private ttlMs: number, private max = 2000) {}

  get(key: string, now: number): V | undefined {
    const item = this.items.get(key);
    if (!item) return undefined;
    if (now - item.at > this.ttlMs) {
      this.items.delete(key);
      return undefined;
    }
    return item.value;
  }

  set(key: string, value: V, now: number) {
    if (this.items.size >= this.max) {
      const oldest = this.items.keys().next().value;
      if (oldest !== undefined) this.items.delete(oldest);
    }
    this.items.set(key, { at: now, value });
  }

  clear() {
    this.items.clear();
  }
}

export interface GuardStores {
  /** 8 lead submissions per IP per 10 minutes, across all forms. */
  perIp: SlidingWindowLimiter;
  /** Same submissionId within 30 minutes → return the first result. */
  bySubmission: TtlCache<{ status: number; body: unknown }>;
  /** Same form + same phone/email within 3 minutes → treat as a double-click, return the first lead id. */
  byContact: TtlCache<string>;
  /** Requests currently being processed, so a simultaneous double submit waits for the first. */
  inFlight: Map<string, Promise<{ status: number; body: unknown }>>;
}

export function createGuardStores(): GuardStores {
  return {
    perIp: new SlidingWindowLimiter(8, 10 * 60 * 1000),
    bySubmission: new TtlCache(30 * 60 * 1000),
    byContact: new TtlCache(3 * 60 * 1000),
    inFlight: new Map(),
  };
}

/** Module-level stores shared by all lead routes in this server instance. */
export const defaultGuards = createGuardStores();
