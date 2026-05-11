"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex-1 flex items-center">
      <div className="container-prose py-32 text-center">
        <p
          className="eyebrow mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Error
        </p>
        <h1
          className="heading-display text-[clamp(2.25rem,5vw,3.75rem)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Something went wrong.
        </h1>
        <p
          className="mt-6 text-base leading-relaxed text-muted-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          An unexpected error occurred. Please try again, or return to the
          home page.
        </p>
        <div
          className="mt-10 flex flex-wrap justify-center gap-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong px-6 text-sm font-medium hover:bg-surface-muted"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
