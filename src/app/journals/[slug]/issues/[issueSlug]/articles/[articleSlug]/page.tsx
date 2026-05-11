import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getJournal,
  findIssueBySlug,
  findArticleBySlug,
  getArticlesForIssue,
} from "@/lib/content";
import { issueLabel } from "@/content/issues";
import { canAccessArticle } from "@/lib/access";
import { AccessGate } from "@/components/journal/access-gate";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
    issueSlug: string;
    articleSlug: string;
  }>;
}) {
  const { slug, issueSlug: iSlug, articleSlug } = await params;
  const journal = getJournal(slug);
  const issue = journal ? findIssueBySlug(slug, iSlug) : undefined;
  const article =
    journal && issue ? findArticleBySlug(issue.id, articleSlug) : undefined;
  if (!article) return {};
  return {
    title: article.title,
    description: article.abstract ?? `${article.authors.join(", ")}.`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{
    slug: string;
    issueSlug: string;
    articleSlug: string;
  }>;
}) {
  const { slug, issueSlug: iSlug, articleSlug } = await params;
  const journal = getJournal(slug);
  if (!journal) notFound();
  const issue = findIssueBySlug(slug, iSlug);
  if (!issue) notFound();
  const article = findArticleBySlug(issue.id, articleSlug);
  if (!article) notFound();

  const allInIssue = getArticlesForIssue(issue.id);
  const idx = allInIssue.findIndex((a) => a.id === article.id);
  const prev = idx > 0 ? allInIssue[idx - 1] : null;
  const next = idx >= 0 && idx < allInIssue.length - 1 ? allInIssue[idx + 1] : null;

  const access = await canAccessArticle({
    journalSlug: journal.slug,
    accessLevel: article.accessLevel,
  });

  return (
    <article className="border-b border-border">
      <div className="container-prose pt-20 pb-24 md:pt-28">
        <Link
          href={`/journals/${journal.slug}/issues/${iSlug}`}
          className="eyebrow inline-flex items-center gap-1.5 hover:text-foreground"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <ArrowLeft className="h-3 w-3" />
          {journal.shortCode} · {issueLabel(issue)}
        </Link>

        <header className="mt-8 border-b border-border pb-10">
          <h1
            className="heading-display text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[1.1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title}
          </h1>
          <p
            className="mt-5 text-base italic text-muted-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {article.authors.join(", ")}
          </p>
          <p
            className="mt-2 text-xs text-muted-foreground"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {issue.year} · {journal.title} · {issueLabel(issue)}
            {article.pages ? ` · pp. ${article.pages}` : null}
          </p>
        </header>

        <div className="mt-10">
          {article.abstract ? (
            <section className="mb-8">
              <p
                className="eyebrow mb-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Abstract
              </p>
              <p
                className="text-lg leading-relaxed text-foreground"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {article.abstract}
              </p>
            </section>
          ) : null}

          {access ? (
            <div className="rounded-2xl border border-border bg-surface p-8 text-center">
              <p
                className="text-base text-muted-foreground"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                The full text of this article is delivered as a PDF. Open or
                download the issue PDF to read.
              </p>
              {issue.pdfPath && (
                <a
                  href={issue.pdfPath}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Open issue PDF
                </a>
              )}
            </div>
          ) : (
            <AccessGate
              journalShortCode={journal.shortCode}
              journalSlug={journal.slug}
              returnTo={`/journals/${journal.slug}/issues/${iSlug}/articles/${articleSlug}`}
            />
          )}
        </div>

        {(prev || next) && (
          <nav
            className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {prev ? (
              <Link
                href={`/journals/${journal.slug}/issues/${iSlug}/articles/${prev.slug}`}
                className="group block"
              >
                <span className="eyebrow">← Previous</span>
                <p
                  className="mt-1 text-base text-foreground transition-colors group-hover:text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {prev.title}
                </p>
              </Link>
            ) : <span />}
            {next ? (
              <Link
                href={`/journals/${journal.slug}/issues/${iSlug}/articles/${next.slug}`}
                className="group block sm:text-right"
              >
                <span className="eyebrow">Next →</span>
                <p
                  className="mt-1 text-base text-foreground transition-colors group-hover:text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {next.title}
                </p>
              </Link>
            ) : <span />}
          </nav>
        )}
      </div>
    </article>
  );
}
