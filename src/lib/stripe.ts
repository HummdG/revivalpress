import "server-only";
import Stripe from "stripe";
import type { SubscriptionTier } from "./db/schema";

const apiKey = process.env.STRIPE_SECRET_KEY;

// We construct the Stripe client even when the key is missing so the module
// can be imported safely at build time. Route handlers gate every call with
// `isStripeConfigured()` and respond 503 when the key is absent.
export const stripe = new Stripe(apiKey ?? "sk_test_placeholder", {
  apiVersion: "2026-04-22.dahlia",
  appInfo: { name: "Revival Press" },
});

export const PRICE_TO_TIER: Record<string, SubscriptionTier> = {
  [process.env.STRIPE_PRICE_LTIMS ?? "price_ltims_placeholder"]: "ltims",
  [process.env.STRIPE_PRICE_IILGA ?? "price_iilga_placeholder"]: "iilga",
  [process.env.STRIPE_PRICE_ALL ?? "price_all_placeholder"]: "all",
};

export const TIER_TO_PRICE: Record<SubscriptionTier, string | undefined> = {
  ltims: process.env.STRIPE_PRICE_LTIMS,
  iilga: process.env.STRIPE_PRICE_IILGA,
  all: process.env.STRIPE_PRICE_ALL,
};

export function tierForJournalSlug(
  slug: string,
): SubscriptionTier | undefined {
  if (slug === "legal-transformation-in-muslim-societies") return "ltims";
  if (slug === "islamic-international-law-and-global-affairs") return "iilga";
  return undefined;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
