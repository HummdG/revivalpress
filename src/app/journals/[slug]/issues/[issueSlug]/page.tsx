import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Lock, FileText } from "lucide-react";
import {
  journals,
  getJournal,
  getIssuesForJournal,
  getArticlesForIssue,
  findIssueBySlug,
  issueSlug,
} from "@/lib/content";
import { issueLabel } from "@/content/issues";
import { italicizeArabic } from "@/lib/italicize-arabic";

export function generateStaticParams() {
  return journals.flatMap((j) =>
    getIssuesForJournal(j.slug).map((i) => ({
      slug: j.slug,
      issueSlug: issueSlug(i),
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; issueSlug: string }>;
}) {
  const { slug, issueSlug: iSlug } = await params;
  const journal = getJournal(slug);
  const issue = journal ? findIssueBySlug(slug, iSlug) : undefined;
  if (!journal || !issue) return {};
  return {
    title: `${journal.shortCode} ${issueLabel(issue)} (${issue.year})`,
    description: `Contents of ${journal.title}, ${issueLabel(issue)}, ${issue.year}.`,
  };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ slug: string; issueSlug: string }>;
}) {
  const { slug, issueSlug: iSlug } = await params;
  const journal = getJournal(slug);
  if (!journal) notFound();
  const issue = findIssueBySlug(slug, iSlug);
  if (!issue) notFound();

  const articles = getArticlesForIssue(issue.id);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide pt-20 pb-12 md:pt-28">
          <Link
            href={`/journals/${journal.slug}`}
            className="eyebrow inline-flex items-center gap-1 hover:text-foreground"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            ← {journal.shortCode}
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
            <div
              className={
                issue.coverImagePath ? "md:col-span-8" : "md:col-span-12"
              }
            >
              <p
                className="eyebrow"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {journal.title}
              </p>
              <h1
                className="heading-display mt-3 text-[clamp(2.25rem,5vw,4rem)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {issueLabel(issue)}{" "}
                <span className="text-muted-foreground">· {issue.year}</span>
              </h1>
              {issue.title && (
                <p
                  className="mt-4 max-w-2xl text-lg italic text-muted-foreground"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {italicizeArabic(issue.title)}
                </p>
              )}
              {issue.themeBlurb && (
                <p
                  className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {italicizeArabic(issue.themeBlurb)}
                </p>
              )}

              {issue.pdfPath && (
                <div
                  className="mt-10 flex flex-wrap items-center gap-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <Link
                    href={`/account?subscribe=${journal.slug}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border-strong px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
                  >
                    <FileText className="h-4 w-4" />
                    Download full issue
                    {issue.pdfSizeKb &&
                      ` (${(issue.pdfSizeKb / 1024).toFixed(1)} MB)`}
                  </Link>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" /> subscribers only
                  </span>
                </div>
              )}
            </div>

            {issue.coverImagePath && (
              <div className="md:col-span-4">
                <Image
                  src={issue.coverImagePath}
                  alt={`Cover of ${journal.shortCode} ${issueLabel(issue)}`}
                  width={420}
                  height={560}
                  priority
                  className="h-auto w-full max-w-[320px] rounded-sm shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="container-wide py-16">
          <h2
            className="text-2xl md:text-3xl tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contents
          </h2>

          {articles.length > 0 ? (
            <ol className="mt-10 divide-y divide-border border-t border-border">
              {articles.map((a, i) => (
                <li key={a.id}>
                  <Link
                    href={`/journals/${journal.slug}/issues/${iSlug}/articles/${a.slug}`}
                    className="grid grid-cols-12 gap-6 py-6 -mx-4 px-4 rounded-lg transition-colors hover:bg-surface-muted"
                  >
                    <span
                      className="col-span-1 text-sm text-muted-foreground tabular-nums pt-1"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="col-span-11 md:col-span-8">
                      <p
                        className="text-lg md:text-xl leading-snug"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {italicizeArabic(a.title)}
                      </p>
                      <p
                        className="mt-1 text-sm text-muted-foreground"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {a.authors.join(", ")}
                      </p>
                      {a.abstract && (
                        <p
                          className="mt-3 text-sm leading-relaxed text-foreground/80"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {italicizeArabic(a.abstract)}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-span-12 md:col-span-3 flex items-start justify-end gap-3 text-xs"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {a.type === "book-review" && (
                        <span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground">
                          Book review
                        </span>
                      )}
                      {a.accessLevel === "subscriber" && (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <Lock className="h-3 w-3" />
                          Subscribers
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-10 rounded-xl border border-border bg-surface-muted p-8">
              <p
                className="text-base text-muted-foreground"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                The table of contents for this issue is being prepared and
                will be published shortly. In the meantime, the full issue
                PDF is available to subscribers.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
