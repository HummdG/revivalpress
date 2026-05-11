import type { MetadataRoute } from "next";
import {
  journals,
  books,
  getIssuesForJournal,
  issueSlug,
} from "@/lib/content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://revivalpress.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/journals`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/books`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/editorial-team`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/author-info`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/prize`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  for (const j of journals) {
    entries.push({
      url: `${SITE_URL}/journals/${j.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
    for (const i of getIssuesForJournal(j.slug)) {
      entries.push({
        url: `${SITE_URL}/journals/${j.slug}/issues/${issueSlug(i)}`,
        lastModified: i.publishedAt ? new Date(i.publishedAt) : now,
        changeFrequency: "yearly",
        priority: 0.7,
      });
    }
  }

  for (const b of books) {
    entries.push({
      url: `${SITE_URL}/books/${b.slug}`,
      lastModified: b.publishedAt ? new Date(b.publishedAt) : now,
      changeFrequency: "yearly",
      priority: 0.7,
    });
  }

  return entries;
}
