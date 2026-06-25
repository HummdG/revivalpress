import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Lock } from "lucide-react";
import {
  journals,
  getJournal,
  getIssuesForJournal,
  issueSlug,
  editorsForJournalByRole,
  getArticlesForIssue,
} from "@/lib/content";
import { issueLabel } from "@/content/issues";
import {
  EDITOR_ROLE_LABEL_PLURAL,
  EDITOR_ROLE_ORDER,
} from "@/content/schemas";
import { italicizeArabic } from "@/lib/italicize-arabic";

const GUIDELINES_PDF = "/guidelines/journal-author-guidelines.pdf";

export function generateStaticParams() {
  return journals.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journal = getJournal(slug);
  if (!journal) return {};
  return {
    title: journal.title,
    description: journal.tagline,
  };
}

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "editorial", label: "Editorial team" },
  { id: "current-issue", label: "Current issue" },
  { id: "archive", label: "Archive" },
  { id: "submissions", label: "Submissions" },
] as const;

function SectionHeader({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div
        className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <span aria-hidden className="block h-px w-8 bg-[var(--accent)]" />
        <p
          className="text-[10px] font-medium uppercase tracking-[0.24em]"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--accent)",
          }}
        >
          {eyebrow}
        </p>
      </div>
      <h2
        className="mt-5 text-[2rem] leading-[1.1] tracking-tight md:text-[2.5rem]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
    </div>
  );
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journal = getJournal(slug);
  if (!journal) notFound();

  const issuesList = getIssuesForJournal(slug);
  const [latest, ...rest] = issuesList;
  const latestArticles = latest ? getArticlesForIssue(latest.id) : [];
  const teamByRole = editorsForJournalByRole(journal.slug);
  const wordRange = journal.submissionWordRange;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--accent) 20%, var(--accent) 80%, transparent)",
            opacity: 0.5,
          }}
        />
        <div className="container-wide pt-20 pb-16 md:pt-28 md:pb-20">
          <Link
            href="/journals"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            ← All journals
          </Link>

          <div className="mt-12 flex items-center gap-3">
            <span aria-hidden className="block h-px w-10 bg-[var(--accent)]" />
            <p
              className="text-[10px] font-medium uppercase tracking-[0.24em]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--accent)",
              }}
            >
              {journal.shortCode} · {journal.frequency} · Established{" "}
              {journal.established}
            </p>
          </div>

          <h1
            className="heading-display mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)] max-w-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {journal.title}
          </h1>

          <p
            className="mt-8 max-w-2xl text-lg italic leading-[1.7] text-muted-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {italicizeArabic(journal.tagline)}
          </p>

          <dl
            className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {journal.printIssn && (
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Print ISSN
                </dt>
                <dd className="mt-1 text-sm tabular-nums">
                  {journal.printIssn}
                </dd>
              </div>
            )}
            {journal.onlineIssn && (
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Online ISSN
                </dt>
                <dd className="mt-1 text-sm tabular-nums">
                  {journal.onlineIssn}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Editor
              </dt>
              <dd className="mt-1 text-sm">{journal.contactName}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Frequency
              </dt>
              <dd className="mt-1 text-sm">{journal.frequency}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------- In-page nav ---------- */}
      <nav
        aria-label="Section"
        className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur"
      >
        <div className="container-wide flex flex-wrap items-center gap-x-8 gap-y-2 overflow-x-auto py-4 text-sm">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group relative whitespace-nowrap text-foreground/70 transition-colors hover:text-foreground"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {s.label}
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}
        </div>
      </nav>

      {/* ---------- About ---------- */}
      <section id="about" className="scroll-mt-32 border-b border-border">
        <div className="container-wide grid gap-14 py-20 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-7">
            <SectionHeader eyebrow="About the journal" title="About" />
            <div
              className="mt-10 space-y-6 text-[1.0625rem] leading-[1.8] text-foreground/90"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {journal.about.map((p, i) => (
                <p key={i}>{italicizeArabic(p)}</p>
              ))}
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="md:sticky md:top-32">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="block h-px w-8 bg-[var(--accent)]"
                />
                <p
                  className="text-[10px] font-medium uppercase tracking-[0.24em]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--accent)",
                  }}
                >
                  Scope
                </p>
              </div>
              <ul
                className="mt-6 space-y-4 border-l border-border pl-5 text-sm leading-relaxed text-foreground/90"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {journal.scope.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span
                      className="shrink-0 text-[10px] tabular-nums uppercase tracking-[0.18em] text-muted-foreground"
                      style={{ paddingTop: "0.15rem" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{italicizeArabic(s)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- Editorial team ---------- */}
      <section
        id="editorial"
        className="scroll-mt-32 border-b border-border bg-[var(--surface-muted)]"
      >
        <div className="container-wide py-20">
          <SectionHeader
            eyebrow={`The team behind ${journal.shortCode}`}
            title="Editorial team"
          />

          <div className="mt-14 space-y-14">
            {EDITOR_ROLE_ORDER.map((role) => {
              const members = teamByRole[role];
              if (!members || members.length === 0) return null;
              return (
                <div key={role}>
                  <div className="mb-6 flex items-center gap-4">
                    <h3
                      className="text-[10px] font-medium uppercase tracking-[0.24em] text-foreground/85"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {EDITOR_ROLE_LABEL_PLURAL[role]}
                    </h3>
                    <span
                      aria-hidden
                      className="h-px flex-1 bg-border-strong/60"
                    />
                    <span
                      className="text-[10px] tabular-nums uppercase tracking-[0.18em] text-muted-foreground"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {String(members.length).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((e) => (
                      <li key={e.id} className="group">
                        <p
                          className="text-base leading-tight text-foreground"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {e.honorific ? `${e.honorific} ` : ""}
                          {e.name}
                        </p>
                        <p
                          className="mt-1.5 text-[13px] leading-snug text-muted-foreground"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {e.title ? `${e.title}, ` : ""}
                          {e.affiliation}
                          {e.country ? `, ${e.country}` : ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Current issue ---------- */}
      {latest && (
        <section
          id="current-issue"
          className="scroll-mt-32 border-b border-border"
        >
          <div className="container-wide py-20">
            <SectionHeader
              eyebrow={`${issueLabel(latest)} · ${latest.year}`}
              title="Current issue"
            />

            <div className="mt-14 grid gap-12 md:grid-cols-12 md:items-start md:gap-x-16">
              <div
                className={
                  latest.coverImagePath
                    ? "md:col-span-4"
                    : "hidden"
                }
              >
                {latest.coverImagePath && (
                  <Link
                    href={`/journals/${journal.slug}/issues/${issueSlug(latest)}`}
                    className="relative block transition-transform duration-500 hover:-translate-y-0.5"
                  >
                    <div
                      aria-hidden
                      className="absolute -inset-x-3 -inset-y-3 -z-10 rounded-sm bg-[var(--surface-muted)]"
                    />
                    <Image
                      src={latest.coverImagePath}
                      alt={`Cover of ${journal.shortCode} ${issueLabel(latest)}`}
                      width={420}
                      height={560}
                      className="h-auto w-full rounded-sm shadow-[0_30px_70px_-30px_rgba(26,24,20,0.55)]"
                    />
                  </Link>
                )}
              </div>

              <div
                className={
                  latest.coverImagePath
                    ? "md:col-span-8"
                    : "md:col-span-12"
                }
              >
                {latest.title && (
                  <p
                    className="text-xl italic leading-relaxed text-foreground/85"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {italicizeArabic(latest.title)}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p
                    className="text-xs uppercase tracking-[0.22em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {latestArticles.length > 0
                      ? `${String(latestArticles.length).padStart(2, "0")} contributions`
                      : "Contents forthcoming"}
                  </p>
                  <Link
                    href={`/journals/${journal.slug}/issues/${issueSlug(latest)}`}
                    className="group inline-flex items-center gap-2 text-sm"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <span className="border-b border-foreground pb-0.5 transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--primary)]">
                      Read the full issue
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {latestArticles.length > 0 ? (
                  <ol className="mt-8 divide-y divide-border border-y border-border">
                    {latestArticles.map((a, i) => (
                      <li key={a.id}>
                        <div className="grid grid-cols-12 items-baseline gap-4 py-5 transition-colors hover:bg-[var(--surface-muted)] -mx-3 px-3">
                          <span
                            className="col-span-1 text-[11px] tabular-nums uppercase tracking-[0.18em] text-muted-foreground"
                            style={{ fontFamily: "var(--font-sans)" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="col-span-11 md:col-span-9">
                            <p
                              className="text-base leading-snug text-foreground md:text-[1.0625rem]"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {italicizeArabic(a.title)}
                            </p>
                            <p
                              className="mt-1 text-[13px] text-muted-foreground"
                              style={{ fontFamily: "var(--font-sans)" }}
                            >
                              {a.authors.join(" · ")}
                            </p>
                          </div>
                          <div
                            className="col-span-12 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] md:col-span-2 md:justify-end"
                            style={{ fontFamily: "var(--font-sans)" }}
                          >
                            {a.type === "book-review" && (
                              <span className="text-muted-foreground">
                                Review
                              </span>
                            )}
                            {a.accessLevel === "subscriber" && (
                              <span className="inline-flex items-center gap-1 text-muted-foreground">
                                <Lock className="h-3 w-3" />
                                Subs.
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p
                    className="mt-8 italic text-muted-foreground"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    The table of contents for this issue will be added shortly.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- Archive ---------- */}
      {rest.length > 0 && (
        <section id="archive" className="scroll-mt-32 border-b border-border">
          <div className="container-wide py-20">
            <SectionHeader eyebrow="Archive" title="Past issues" />

            <ul className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
              {rest.map((issue) => (
                <li key={issue.id} className="bg-background">
                  <Link
                    href={`/journals/${journal.slug}/issues/${issueSlug(issue)}`}
                    className="group relative flex h-full flex-col p-7 transition-colors hover:bg-[var(--surface-muted)]"
                  >
                    <div className="flex items-baseline justify-between">
                      <span
                        className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {issue.year}
                      </span>
                      <span
                        className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        Vol. {issue.volume}
                      </span>
                    </div>
                    <p
                      className="mt-6 text-2xl leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {issueLabel(issue)}
                    </p>
                    {issue.title && (
                      <p
                        className="mt-3 text-sm italic leading-relaxed text-muted-foreground"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {italicizeArabic(issue.title)}
                      </p>
                    )}
                    <span
                      className="mt-auto pt-8 inline-flex items-center gap-1.5 text-xs text-foreground/85 transition-colors group-hover:text-[var(--primary)]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-[var(--accent)]">
                        Contents
                      </span>
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- Submissions ---------- */}
      <section
        id="submissions"
        className="scroll-mt-32 border-b border-border bg-[var(--surface-muted)]"
      >
        <div className="container-wide grid gap-14 py-20 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-7">
            <SectionHeader
              eyebrow="Author & submission guidelines"
              title={`Submit to ${journal.shortCode}`}
            />
            <div
              className="mt-10 space-y-5 text-[1.0625rem] leading-[1.8] text-foreground/90"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <p>
                The journal welcomes submission of scholarly articles for
                consideration with a view to publication. The normal word
                length for article contributions
                {wordRange
                  ? ` is between ${wordRange[0].toLocaleString()}–${wordRange[1].toLocaleString()} words`
                  : ""}
                . All submissions are peer reviewed, and it is a requirement
                that they are original and not previously published elsewhere.
              </p>
              <p>
                Editorial correspondence, including submissions to the journal,
                should be made electronically to {journal.contactName} by
                email:{" "}
                <a
                  href={`mailto:${journal.contactEmail}`}
                  className="text-[var(--primary)] underline underline-offset-4 decoration-1 hover:decoration-2"
                >
                  {journal.contactEmail}
                </a>
                . Receipt of all manuscripts will be acknowledged immediately.
                Please refer to our{" "}
                <a
                  href={GUIDELINES_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] underline underline-offset-4 decoration-1 hover:decoration-2"
                >
                  Detailed Guidelines for Journal Contributors
                </a>{" "}
                for further instructions and an explanation of our peer review
                process.
              </p>
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <a
                href={GUIDELINES_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <span className="border-b border-foreground pb-0.5 transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--primary)]">
                  Submission guide
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <span aria-hidden className="h-px w-4 bg-border-strong" />
              <a
                href={`mailto:${journal.contactEmail}?subject=${encodeURIComponent(`Manuscript submission — ${journal.shortCode}`)}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Email the editor
              </a>
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="border-t-2 border-foreground bg-background p-7">
              <p
                className="text-[10px] font-medium uppercase tracking-[0.24em]"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--accent)",
                }}
              >
                At a glance
              </p>
              <dl
                className="mt-6 space-y-5 text-sm"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Length
                  </dt>
                  <dd className="text-right tabular-nums">
                    {wordRange
                      ? `${wordRange[0].toLocaleString()}–${wordRange[1].toLocaleString()} words`
                      : "See guidelines"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Review
                  </dt>
                  <dd className="text-right">Double-anonymous</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Editor
                  </dt>
                  <dd className="text-right">{journal.contactName}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Submissions
                  </dt>
                  <dd className="text-right">
                    <a
                      href={`mailto:${journal.contactEmail}`}
                      className="text-[var(--primary)] underline underline-offset-4 decoration-1 hover:decoration-2"
                    >
                      Email
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
