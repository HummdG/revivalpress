import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";
import { db, schema } from "@/lib/db/client";
import { PRICE_TO_TIER } from "@/lib/stripe";
import type { SubscriptionStatus } from "@/lib/db/schema";

export const runtime = "nodejs";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function upsertSubscription(sub: Stripe.Subscription) {
  const priceId = sub.items.data[0]?.price.id;
  if (!priceId) return;
  const tier = PRICE_TO_TIER[priceId];
  if (!tier) {
    console.warn("Stripe webhook: unknown priceId", priceId);
    return;
  }

  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;

  // Look up the user by stored stripeCustomerId; fall back to the
  // userId attached in subscription metadata.
  let userId = sub.metadata?.userId as string | undefined;
  if (!userId) {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.stripeCustomerId, customerId))
      .limit(1);
    userId = user?.id;
  }
  if (!userId) {
    console.warn(
      "Stripe webhook: could not resolve user for subscription",
      sub.id,
    );
    return;
  }

  const currentPeriodEnd = (sub as unknown as { current_period_end?: number })
    .current_period_end;

  const values = {
    userId,
    stripeCustomerId: customerId,
    stripeSubscriptionId: sub.id,
    stripePriceId: priceId,
    status: sub.status as SubscriptionStatus,
    tier,
    currentPeriodEnd: currentPeriodEnd
      ? new Date(currentPeriodEnd * 1000)
      : null,
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    updatedAt: new Date(),
  };

  // Insert or update by stripeSubscriptionId
  const [existing] = await db
    .select()
    .from(schema.subscriptions)
    .where(eq(schema.subscriptions.stripeSubscriptionId, sub.id))
    .limit(1);

  if (existing) {
    await db
      .update(schema.subscriptions)
      .set(values)
      .where(eq(schema.subscriptions.stripeSubscriptionId, sub.id));
  } else {
    await db.insert(schema.subscriptions).values(values);
  }
}

export async function POST(req: Request) {
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 503 },
    );
  }
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown";
    return NextResponse.json(
      { error: `Invalid signature: ${message}` },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
    case "customer.subscription.paused":
    case "customer.subscription.resumed":
      await upsertSubscription(event.data.object as Stripe.Subscription);
      break;
    default:
      // No-op for events we don't care about
      break;
  }

  return NextResponse.json({ received: true });
}
