import Link from "next/link";
import { Lock } from "lucide-react";

export function AccessGate({
  journalShortCode,
  journalSlug,
  returnTo,
}: {
  journalShortCode: string;
  journalSlug: string;
  returnTo: string;
}) {
  const subscribeHref = `/account?subscribe=${journalSlug}`;
  const signInHref = `/sign-in?next=${encodeURIComponent(returnTo)}`;
  return (
    <div className="rounded-2xl border-2 border-accent/30 bg-surface p-8 md:p-10">
      <span
        className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs"
        style={{ fontFamily: "var(--font-sans)", color: "var(--accent)" }}
      >
        <Lock className="h-3 w-3" />
        Subscribers only
      </span>
      <h2
        className="mt-5 text-2xl md:text-3xl leading-tight tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Continue reading with a {journalShortCode} subscription.
      </h2>
      <p
        className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Full-text articles, PDF downloads, and the complete archive are
        available to subscribers. Individual and institutional plans are
        offered, with a combined plan covering both Revival Press journals.
      </p>
      <div
        className="mt-7 flex flex-wrap gap-3"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <Link
          href={subscribeHref}
          className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          View subscription plans
        </Link>
        <Link
          href={signInHref}
          className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
