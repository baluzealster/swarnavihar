import { leadRoute } from "@/lib/leads/http";

/** Deprecated alias kept so nothing breaks; new code posts to /api/leads/enquiry. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = leadRoute("enquiry");
