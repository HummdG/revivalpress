import { journals, journalsBySlug } from "@/content/journals";
import { issues, issuesByJournal, issueSlug } from "@/content/issues";
import { articles, articlesByIssue, findArticleBySlug } from "@/content/articles";
import { books, booksBySlug } from "@/content/books";
import {
  editors,
  editorsByJournal,
  editorsForJournalByRole,
} from "@/content/editorial-team";
import { prizeMeta, prizeWinners } from "@/content/prize";
import { site } from "@/content/site";
import type { Issue } from "@/content/schemas";

export {
  journals,
  issues,
  articles,
  books,
  editors,
  editorsByJournal,
  editorsForJournalByRole,
  prizeMeta,
  prizeWinners,
  site,
  issueSlug,
};

export function getJournal(slug: string) {
  return journalsBySlug[slug];
}

export function getJournalBySlugOrThrow(slug: string) {
  const j = journalsBySlug[slug];
  if (!j) throw new Error(`Unknown journal: ${slug}`);
  return j;
}

export function getIssuesForJournal(slug: string): Issue[] {
  return issuesByJournal[slug] || [];
}

export function getLatestIssue(slug: string): Issue | undefined {
  return getIssuesForJournal(slug)[0];
}

export function findIssue(
  journalSlug: string,
  volume: number,
  issue: number,
): Issue | undefined {
  return issues.find(
    (i) =>
      i.journalSlug === journalSlug &&
      i.volume === volume &&
      i.issue === issue,
  );
}

export function findIssueBySlug(
  journalSlug: string,
  slug: string,
): Issue | undefined {
  const m = slug.match(/^v(\d+)-i(\d+)$/i);
  if (!m) return undefined;
  return findIssue(journalSlug, Number(m[1]), Number(m[2]));
}

export function getArticlesForIssue(issueId: string) {
  return articlesByIssue[issueId] || [];
}

export { findArticleBySlug };

export function getBook(slug: string) {
  return booksBySlug[slug];
}
