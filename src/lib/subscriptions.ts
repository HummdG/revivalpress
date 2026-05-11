import "server-only";
import { eq, and, inArray } from "drizzle-orm";
import { db, schema } from "./db/client";
import type {
  SubscriptionStatus,
  SubscriptionTier,
} from "./db/schema";
import { auth } from "./auth";

const ACTIVE_STATUSES: SubscriptionStatus[] = ["active", "trialing"];

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function getActiveSubscriptionsForUser(userId: string) {
  return db
    .select()
    .from(schema.subscriptions)
    .where(
      and(
        eq(schema.subscriptions.userId, userId),
        inArray(schema.subscriptions.status, ACTIVE_STATUSES),
      ),
    );
}

export async function userHasAccessTo(
  userId: string,
  tier: SubscriptionTier,
): Promise<boolean> {
  const subs = await getActiveSubscriptionsForUser(userId);
  return subs.some((s) => s.tier === "all" || s.tier === tier);
}
