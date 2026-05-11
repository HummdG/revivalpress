# Revival Press

The new revivalpress.co.uk — built with Next.js 16, Tailwind CSS v4, TypeScript, NextAuth.js v5, Stripe Checkout, and Drizzle + SQLite (Postgres-ready).

The site replaces the Framer-hosted version. It carries two flagship journals (**LTIMS** — Legal Transformation in Muslim Societies; **IILGA** — Islamic International Law and Global Affairs), a books programme, the editorial team page, the annual Imran Ahsan Khan Nyazee Prize, and an integrated subscription paywall for journal articles and issue PDFs.

## What's in the box

- **App Router** under `src/app` — fully typed pages, dynamic `params: Promise<…>` per Next.js 16 conventions.
- **Real content** in `src/content/` as typed TS modules, validated with Zod schemas at import time. Everything is launch-ready text (no Lorem Ipsum).
- **Auth** via NextAuth.js v5 with Resend magic-link emails, database sessions backed by SQLite/Postgres.
- **Stripe subscriptions** with three tiers (LTIMS, IILGA, both) via hosted Checkout + Customer Portal + a webhook handler that keeps the `subscription` table in sync.
- **Paywall** centralised in `src/lib/access.ts` — every gated server component calls `canAccessArticle()` and renders `<AccessGate />` when the user lacks the right subscription.
- **Refreshed design** — Fraunces (display) + Newsreader (body) + Inter (UI); a warm paper-and-ink palette in light, ink-and-vellum in dark.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars and fill in what you have
cp .env.local.example .env.local
# Minimum to boot dev: AUTH_SECRET (run `openssl rand -base64 32`).
# Stripe + Resend can be left blank — Subscribe buttons will be disabled
# and magic-link emails won't send, but every other page will work.

# 3. Run
npm run dev
```

The database file is created automatically at `./data/revivalpress.db` on first boot. All tables are created idempotently by `src/lib/db/client.ts`, so you don't need to run a migration step.

## Project structure

```
src/
  app/                            # App Router
    page.tsx                      # Home
    journals/                     # /journals, /journals/[slug], …/issues/[…], …/articles/[…]
    books/                        # /books, /books/[slug]
    editorial-team/               # /editorial-team
    author-info/                  # /author-info
    prize/                        # /prize
    account/                      # /account (auth + subscriptions)
    sign-in/                      # /sign-in (magic-link form)
    verify-request/               # /verify-request (check your email)
    api/
      auth/[...nextauth]/         # NextAuth handler
      stripe/checkout/            # POST → Checkout session
      stripe/portal/              # POST → Billing portal session
      stripe/webhook/             # POST ← Stripe (subscription events)
    sitemap.ts, robots.ts
  components/
    layout/                       # SiteHeader, SiteFooter, MobileNav
    journal/                      # AccessGate
    billing/                      # SubscribeButton, ManageBillingButton
  content/                        # All site copy as typed TS
    schemas.ts                    # Zod schemas (source of truth for shapes)
    journals.ts, issues.ts, articles.ts, books.ts, editorial-team.ts, prize.ts
    site.ts                       # Hero copy, mission, contact
    pages/author-info.ts          # Long-form author info copy
  lib/
    auth.ts                       # NextAuth v5 config (Drizzle adapter, Resend)
    stripe.ts                     # Stripe client + price ↔ tier mappings
    access.ts                     # canAccessArticle() — paywall logic
    subscriptions.ts              # DB lookups for current user's subs
    content.ts                    # Typed getters: getJournal, findIssue, etc.
    db/
      schema.ts                   # Drizzle schema (users, sessions, subscriptions, …)
      client.ts                   # Drizzle client + idempotent table setup
drizzle/                          # Generated migrations (optional — runtime setup is idempotent)
```

## Configuring Stripe

In the Stripe Dashboard, create three Products (each with a recurring Price) — one per tier:

| Tier   | Price env var          | What it grants                                        |
| ------ | ---------------------- | ----------------------------------------------------- |
| LTIMS  | `STRIPE_PRICE_LTIMS`   | Access to all LTIMS issues & articles                 |
| IILGA  | `STRIPE_PRICE_IILGA`   | Access to all IILGA issues & articles                 |
| All    | `STRIPE_PRICE_ALL`     | Access to both journals (combined plan, reduced rate) |

Paste the **price** IDs (not product IDs) into `.env.local`.

Then point a Stripe webhook at `https://YOUR_HOST/api/stripe/webhook` and listen for:

- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `customer.subscription.paused`
- `customer.subscription.resumed`

Set `STRIPE_WEBHOOK_SECRET` to the signing secret Stripe shows you when you create the endpoint.

In local dev, use the Stripe CLI:

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

## Configuring Resend (magic-link auth)

1. Add and verify your domain in the Resend dashboard.
2. Set `RESEND_API_KEY` and `RESEND_FROM` (e.g. `Revival Press <noreply@revivalpress.co.uk>`).
3. Until both are set, the sign-in form will appear but no email will be sent. The site otherwise works fine without auth — the paywall just stays closed for everyone.

## Adding content

Everything is typed TS — there is no CMS. To add an article, edit `src/content/articles.ts`. To add an issue, edit `src/content/issues.ts`. To add an editor or prize winner, edit `editorial-team.ts` or `prize.ts`. The Zod schemas in `schemas.ts` will reject invalid records at import time.

The article URL slug is generated automatically from the title (first 80 lowercase, alphanumeric-or-hyphen characters). Subsequent references (e.g. in `prize.ts` → `articleSlug`) must match.

## Known TODOs before production

- **PDFs** — Place issue PDFs at `public/pdfs/ltims-v1-i1.pdf` etc. (paths already wired in `issues.ts`). The site links to them once present.
- **Editor photos** — Drop into `public/images/editors/` and add `photoPath` in `editorial-team.ts`.
- **Subscription pricing** — Pricing isn't displayed yet; the existing Framer site doesn't show it either. Once tiers are priced, surface them on `/account` and the AccessGate.
- **IILGA + LTIMS Vol 1 Issues 2 & 3 article TOCs** — These were behind the paywall on the old site, so couldn't be scraped. Add to `articles.ts` when the editors supply them.

## Useful commands

```bash
npm run dev            # next dev
npm run build          # next build
npm run start          # next start
npx tsc --noEmit       # type-check
npx drizzle-kit generate  # regenerate SQL migration after schema change
```

## Built with

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com)
- [NextAuth.js v5](https://authjs.dev) + Resend
- [Drizzle ORM](https://orm.drizzle.team) + better-sqlite3
- [Stripe](https://stripe.com) Checkout + Customer Portal + webhooks
- [Zod](https://zod.dev), [lucide-react](https://lucide.dev)
