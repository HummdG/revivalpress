import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center">
      <div className="container-prose py-32 text-center">
        <p
          className="eyebrow mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          404 — Not found
        </p>
        <h1
          className="heading-display text-[clamp(2.5rem,6vw,4.5rem)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We couldn't find that page.
        </h1>
        <p
          className="mt-6 text-base leading-relaxed text-muted-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          The page you were looking for may have been moved, or the link may
          be out of date. Try one of the suggestions below.
        </p>
        <div
          className="mt-10 flex flex-wrap justify-center gap-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background hover:opacity-90"
          >
            Home
          </Link>
          <Link
            href="/journals"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong px-6 text-sm font-medium hover:bg-surface-muted"
          >
            Journals
          </Link>
          <Link
            href="/books"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong px-6 text-sm font-medium hover:bg-surface-muted"
          >
            Books
          </Link>
        </div>
      </div>
    </section>
  );
}
