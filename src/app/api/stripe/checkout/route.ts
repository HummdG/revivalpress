import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { stripe, TIER_TO_PRICE, isStripeConfigured } from "@/lib/stripe";
import { db, schema } from "@/lib/db/client";
import type { SubscriptionTier } from "@/lib/db/schema";

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured on the server" },
      { status: 503 },
    );
  }

  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { tier?: SubscriptionTier } = {};
  try {
    body = (await req.json()) as { tier?: SubscriptionTier };
  } catch {
    // empty body OK; tier will be undefined
  }
  const tier = body.tier;
  if (!tier || !TIER_TO_PRICE[tier]) {
    return NextResponse.json(
      { error: "Invalid or missing tier" },
      { status: 400 },
    );
  }
  const priceId = TIER_TO_PRICE[tier];

  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, session.user.id))
    .limit(1);

  let customerId = user?.stripeCustomerId ?? null;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name ?? undefined,
      metadata: { userId: session.user.id },
    });
    customerId = customer.id;
    await db
      .update(schema.users)
      .set({ stripeCustomerId: customerId })
      .where(eq(schema.users.id, session.user.id));
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    req.headers.get("origin") ??
    "http://localhost:3000";

  const checkout = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId!, quantity: 1 }],
    success_url: `${origin}/account?checkout=success`,
    cancel_url: `${origin}/account?checkout=cancelled`,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: { userId: session.user.id, tier },
    },
    metadata: { userId: session.user.id, tier },
  });

  return NextResponse.json({ url: checkout.url });
}
