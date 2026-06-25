import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  site,
  journals,
  books,
  editors,
  prizeWinners,
  getLatestIssue,
  issueSlug,
} from "@/lib/content";
import { issueLabel } from "@/content/issues";

const featuredEditors = editors.filter(
  (e) => e.role === "editor-in-chief" || e.role === "deputy-editor-in-chief",
);

export default function HomePage() {
  const ltimsLatest = getLatestIssue(
    "legal-transformation-in-muslim-societies",
  );
  const iilgaLatest = getLatestIssue(
    "islamic-international-law-and-global-affairs",
  );
  const featuredBook = books[0];
  const latestPrize = prizeWinners[0];

  const latestIssues = [ltimsLatest, iilgaLatest].filter(Boolean) as NonNullable<
    ReturnType<typeof getLatestIssue>
  >[];

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="border-b border-border">
        <div className="container-wide pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mb-12 flex items-baseline justify-between gap-6 md:mb-16">
            <p className="eyebrow">Independent academic publisher</p>
            <p
              className="eyebrow hidden sm:block"
              aria-hidden
            >
              London · Est. 2023
            </p>
          </div>

          <h1
            className="heading-display max-w-[18ch] text-[clamp(2.75rem,9vw,7rem)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Shaping the future of Islamic research through{" "}
            <em
              className="italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              innovation
            </em>{" "}
            and critical insight.
          </h1>

          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:items-end md:gap-14">
            <div className="md:col-span-7 flex flex-col">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                {site.mission[0]}
              </p>
              <div
                className="mt-10 flex flex-col items-start gap-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <Link
                  href="/author-info"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Submit a manuscript
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/journals"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Browse the journals
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="overflow-hidden rounded-xl border border-border">
                <Image
                  src="/images/hero-notebook.png"
                  alt="Hand-painted Islamic geometric pattern on a sketchbook"
                  width={760}
                  height={760}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- LATEST ISSUES STRIP ---------- */}
      {latestIssues.length > 0 && (
        <section className="border-b border-border bg-surface-muted">
          <div className="container-wide py-5">
            <div
              className="flex flex-wrap items-baseline gap-x-10 gap-y-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <p className="eyebrow shrink-0">Latest issues</p>
              {latestIssues.map((issue) => {
                const journal = journals.find(
                  (j) => j.slug === issue.journalSlug,
                )!;
                return (
                  <Link
                    key={issue.id}
                    href={`/journals/${journal.slug}/issues/${issueSlug(issue)}`}
                    className="group inline-flex items-baseline gap-2.5 text-sm text-foreground/85 transition-colors hover:text-foreground"
                  >
                    <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {journal.shortCode}
                    </span>
                    <span
                      className="text-foreground"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {issueLabel(issue)}
                    </span>
                    <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {issue.year}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------- MISSION ---------- */}
      <section className="border-b border-border">
        <div className="container-wide py-20">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-4">About</p>
              <h2
                className="heading-display text-4xl md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Advancing legal scholarship through measured and deliberate inquiry.
              </h2>
            </div>
            <div className="md:col-span-7 prose-rp">
              {site.mission.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- JOURNALS ---------- */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-20">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow mb-3">The journals</p>
              <h2
                className="heading-display text-4xl md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Two flagship titles.
              </h2>
            </div>
            <Link
              href="/journals"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-foreground/80 underline underline-offset-4 transition-colors hover:text-foreground"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {journals.map((j) => (
              <Link
                key={j.slug}
                href={`/journals/${j.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-surface p-8 transition-colors hover:border-border-strong"
              >
                <div
                  className="mb-5 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <span>{j.shortCode} · {j.frequency}</span>
                  <span>
                    ISSN {j.printIssn}
                  </span>
                </div>
                <h3
                  className="text-3xl leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {j.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {j.tagline}
                </p>
                <span
                  className="mt-8 inline-flex items-center gap-1 text-sm text-foreground/85 transition-colors group-hover:text-primary"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Read more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED BOOK + PRIZE ---------- */}
      <section className="border-b border-border">
        <div className="container-wide py-20">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {featuredBook && (
              <div className="flex flex-col">
                <p className="eyebrow mb-5">Featured book</p>
                <div className="grid gap-6 sm:grid-cols-[140px_1fr] items-start">
                  {featuredBook.coverImagePath && (
                    <Link
                      href={`/books/${featuredBook.slug}`}
                      className="block overflow-hidden rounded-sm transition-transform hover:scale-[1.02]"
                    >
                      <Image
                        src={featuredBook.coverImagePath}
                        alt={`Cover of ${featuredBook.title}`}
                        width={280}
                        height={400}
                        className="h-auto w-full"
                      />
                    </Link>
                  )}
                  <div>
                    <h3
                      className="text-2xl leading-tight tracking-tight md:text-3xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {featuredBook.title}
                    </h3>
                    {featuredBook.editors && (
                      <p className="mt-2 text-sm italic text-muted-foreground">
                        Edited by {featuredBook.editors.join(" and ")}
                      </p>
                    )}
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {featuredBook.overview.slice(0, 200)}…
                    </p>
                    <Link
                      href={`/books/${featuredBook.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Read about the book
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {latestPrize && (
              <div className="flex flex-col md:border-l md:border-border md:pl-16">
                <p
                  className="eyebrow mb-5"
                  style={{ color: "var(--accent)" }}
                >
                  {latestPrize.year} prize winner
                </p>
                <h3
                  className="text-2xl leading-snug tracking-tight md:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {latestPrize.articleTitle}
                </h3>
                <p className="mt-3 text-base italic text-muted-foreground">
                  {latestPrize.authors.join(" and ")}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Recognised by the Imran Ahsan Khan Nyazee Prize for
                  exceptional scholarship in Islamic legal theory and the
                  evolving role of law in Muslim societies.
                </p>
                <div className="mt-auto pt-8">
                  <Link
                    href="/prize"
                    className="inline-flex items-center gap-1.5 text-sm text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    About the prize
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- EDITORIAL ---------- */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-20">
          <div className="grid gap-14 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <div className="mb-8 overflow-hidden rounded-xl border border-border">
                <Image
                  src="/images/library-study.jpeg"
                  alt="A quiet study with bookshelves — watercolour by Frederic Schuler Briggs"
                  width={690}
                  height={1024}
                  className="h-auto w-full"
                />
              </div>
              <p className="eyebrow mb-3">The editorial board</p>
              <h2
                className="heading-display text-4xl md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Scholars from three continents.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Our editors lead the peer review and editorial direction of
                Revival Press, drawing on expertise from the United Kingdom,
                North Africa, and Türkiye.
              </p>
              <Link
                href="/editorial-team"
                className="mt-6 inline-flex items-center gap-1 text-sm text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Meet the team
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <ul className="md:col-span-7 divide-y divide-border border-t border-border">
              {featuredEditors.map((e) => (
                <li
                  key={e.id}
                  className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <div>
                    <p
                      className="text-xl leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {e.honorific ? `${e.honorific} ` : ""}
                      {e.name}
                    </p>
                    <p
                      className="mt-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {e.role === "editor-in-chief"
                        ? "Editor in Chief"
                        : "Deputy Editor in Chief"}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-right">
                    {e.affiliation}
                    {e.country ? `, ${e.country}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section>
        <div className="container-wide py-24">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">Submissions</p>
              <h2
                className="heading-display text-4xl md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Submit your work.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                We welcome original scholarship for peer-reviewed publication
                across both journals and our book programme. Articles run
                5,000–15,000 words; book proposals are evaluated by two
                independent reviewers.
              </p>
            </div>
            <div
              className="md:col-span-5 flex flex-wrap gap-3 md:justify-end"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <Link
                href="/author-info"
                className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Submission guide
              </Link>
              <a
                href="mailto:a.a.ghouri@outlook.com"
                className="inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                Email the editor
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
