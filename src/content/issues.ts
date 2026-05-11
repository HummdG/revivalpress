import { issueSchema, type Issue } from "./schemas";

export const issues: Issue[] = [
  // LTIMS — Legal Transformation in Muslim Societies
  issueSchema.parse({
    id: "ltims-v1-i1",
    journalSlug: "legal-transformation-in-muslim-societies",
    volume: 1,
    issue: 1,
    year: 2024,
    publishedAt: "2024-03-01",
    pdfPath: "/pdfs/ltims-v1-i1.pdf",
    pdfSizeKb: 1835,
    available: true,
    coverImagePath: "/images/journal-cover-ltims-v1-i1.png",
  }),
  issueSchema.parse({
    id: "ltims-v1-i2",
    journalSlug: "legal-transformation-in-muslim-societies",
    volume: 1,
    issue: 2,
    year: 2024,
    publishedAt: "2024-06-01",
    pdfPath: "/pdfs/ltims-v1-i2.pdf",
    pdfSizeKb: 2353,
    available: true,
  }),
  issueSchema.parse({
    id: "ltims-v1-i3",
    journalSlug: "legal-transformation-in-muslim-societies",
    volume: 1,
    issue: 3,
    year: 2024,
    publishedAt: "2024-09-01",
    pdfPath: "/pdfs/ltims-v1-i3.pdf",
    pdfSizeKb: 2310,
    available: true,
  }),
  issueSchema.parse({
    id: "ltims-v2-i1",
    journalSlug: "legal-transformation-in-muslim-societies",
    volume: 2,
    issue: 1,
    year: 2025,
    publishedAt: "2025-03-01",
    pdfPath: "/pdfs/ltims-v2-i1.pdf",
    pdfSizeKb: 2250,
    available: true,
  }),
  issueSchema.parse({
    id: "ltims-v2-i2",
    journalSlug: "legal-transformation-in-muslim-societies",
    volume: 2,
    issue: 2,
    year: 2025,
    publishedAt: "2025-06-01",
    pdfPath: "/pdfs/ltims-v2-i2.pdf",
    pdfSizeKb: 1820,
    available: true,
  }),
  // IILGA — Islamic International Law and Global Affairs
  issueSchema.parse({
    id: "iilga-v1-i1",
    journalSlug: "islamic-international-law-and-global-affairs",
    volume: 1,
    issue: 1,
    year: 2026,
    publishedAt: "2026-03-01",
    title: "Inaugural Issue",
    themeBlurb:
      "The inaugural issue of IILGA, opening a sustained conversation between classical siyar and contemporary global affairs.",
    pdfPath: "/pdfs/iilga-v1-i1.pdf",
    available: true,
  }),
];

export function issueLabel(issue: Issue): string {
  return `Vol. ${issue.volume}, Issue ${issue.issue}`;
}

export function issueSlug(issue: Issue): string {
  return `v${issue.volume}-i${issue.issue}`;
}

export const issuesByJournal = issues.reduce<Record<string, Issue[]>>(
  (acc, issue) => {
    (acc[issue.journalSlug] ||= []).push(issue);
    return acc;
  },
  {},
);

// Sort each journal's issues newest-first
for (const slug of Object.keys(issuesByJournal)) {
  issuesByJournal[slug].sort(
    (a, b) =>
      b.year - a.year || b.volume - a.volume || b.issue - a.issue,
  );
}
