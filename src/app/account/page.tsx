import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { auth, signOut } from "@/lib/auth";
import { journals } from "@/lib/content";
import { getActiveSubscriptionsForUser } from "@/lib/subscriptions";
import { isStripeConfigured } from "@/lib/stripe";
import { SubscribeButton } from "@/components/billing/subscribe-button";
import { ManageBillingButton } from "@/components/billing/manage-billing-button";
import type { Subscription, SubscriptionTier } from "@/lib/db/schema";

export const metadata = { title: "My account" };
export const dynamic = "force-dynamic";

const TIER_LABEL: Record<SubscriptionTier, string> = {
  ltims: "Legal Transformation in Muslim Societies",
  iilga: "Islamic International Law and Global Affairs",
  all: "Both Revival Press journals",
};

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ subscribe?: string; checkout?: string }>;
}) {
  const session = await auth();
  const sp = await searchParams;
  const user = session?.user ?? null;
  const stripeReady = isStripeConfigured();

  let subscriptions: Subscription[] = [];
  if (user?.id) {
    subscriptions = await getActiveSubscriptionsForUser(user.id);
  }

  const hasAll = subscriptions.some((s) => s.tier === "all");
  const hasTier = (t: SubscriptionTier) =>
    hasAll || subscriptions.some((s) => s.tier === t);

  return (
    <section className="border-b border-border">
      <div className="container-prose pt-20 pb-24 md:pt-28">
        <p
          className="eyebrow mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          My account
        </p>
        <h1
          className="heading-display text-[clamp(2.25rem,5vw,3.75rem)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {user ? "Subscriptions" : "Sign in to subscribe"}
        </h1>

        {!user ? (
          <>
            <p
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Sign in with your email to manage your subscription, view your
              invoices, and access all journal issues and articles.
            </p>
            <Link
              href={`/sign-in${sp.subscribe ? `?next=/account?subscribe=${sp.subscribe}` : ""}`}
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background hover:opacity-90"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            <p
              className="mt-4 text-base text-muted-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Signed in as{" "}
              <span className="font-medium text-foreground">
                {user.email}
              </span>
              .
            </p>

            {sp.checkout === "success" && (
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/5 p-5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p
                    className="text-sm font-medium text-foreground"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Checkout complete
                  </p>
                  <p
                    className="mt-1 text-sm text-muted-foreground"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Your subscription is being activated. It may take up to a
                    minute for access to appear here.
                  </p>
                </div>
              </div>
            )}

            {sp.checkout === "cancelled" && (
              <div
                className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-surface-muted p-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <AlertCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Checkout was cancelled. No changes were made to your account.
                </p>
              </div>
            )}

            {/* Active subscriptions */}
            {subscriptions.length > 0 && (
              <div className="mt-12">
                <p
                  className="eyebrow mb-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Active subscriptions
                </p>
                <ul className="space-y-3">
                  {subscriptions.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5"
                    >
                      <div>
                        <p
                          className="text-base"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {TIER_LABEL[s.tier]}
                        </p>
                        <p
                          className="mt-1 text-xs text-muted-foreground"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          Status:{" "}
                          <span className="text-foreground">{s.status}</span>
                          {s.currentPeriodEnd && (
                            <>
                              {" · Renews "}
                              {s.currentPeriodEnd.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </>
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ManageBillingButton />
                </div>
              </div>
            )}

            {/* Available plans */}
            <div className="mt-12 rounded-2xl border border-border bg-surface p-8">
              <p
                className="eyebrow mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {subscriptions.length > 0 ? "Add another plan" : "Plans"}
              </p>
              <h2
                className="text-2xl tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Choose your access
              </h2>

              <ul className="mt-6 space-y-6 divide-y divide-border">
                {journals.map((j) => {
                  const tier = (j.shortCode === "LTIMS"
                    ? "ltims"
                    : "iilga") as SubscriptionTier;
                  const owned = hasTier(tier);
                  return (
                    <li
                      key={j.slug}
                      className="grid items-center gap-4 pt-6 first:pt-0 sm:grid-cols-[1fr_auto]"
                    >
                      <div>
                        <p
                          className="text-xl tracking-tight"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {j.title}
                        </p>
                        <p
                          className="mt-1 text-sm text-muted-foreground"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          Full access to all {j.shortCode} issues, articles,
                          and PDFs.
                        </p>
                      </div>
                      {owned ? (
                        <span
                          className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs text-primary"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Active
                        </span>
                      ) : (
                        <SubscribeButton
                          tier={tier}
                          label="Subscribe"
                          disabledReason={
                            stripeReady
                              ? undefined
                              : "Stripe is not yet configured on this environment"
                          }
                        />
                      )}
                    </li>
                  );
                })}

                <li className="grid items-center gap-4 pt-6 sm:grid-cols-[1fr_auto]">
                  <div>
                    <p
                      className="text-xl tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Both journals
                    </p>
                    <p
                      className="mt-1 text-sm text-muted-foreground"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Combined subscription with a reduced rate.
                    </p>
                  </div>
                  {hasAll ? (
                    <span
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs text-primary"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Active
                    </span>
                  ) : (
                    <SubscribeButton
                      tier="all"
                      label="Subscribe"
                      disabledReason={
                        stripeReady
                          ? undefined
                          : "Stripe is not yet configured on this environment"
                      }
                    />
                  )}
                </li>
              </ul>

              {!stripeReady && (
                <p
                  className="mt-6 text-xs text-muted-foreground"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Subscription checkout will be enabled once Stripe is
                  configured. To purchase a subscription today, email{" "}
                  <a
                    href="mailto:a.a.ghouri@outlook.com"
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    a.a.ghouri@outlook.com
                  </a>
                  .
                </p>
              )}
            </div>

            <form action={signOutAction} className="mt-10">
              <button
                type="submit"
                className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Sign out
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
