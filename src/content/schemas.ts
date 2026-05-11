import { z } from "zod";

export const journalSchema = z.object({
  slug: z.string(),
  shortCode: z.enum(["LTIMS", "IILGA"]),
  title: z.string(),
  tagline: z.string(),
  printIssn: z.string().optional(),
  onlineIssn: z.string().optional(),
  frequency: z.string().optional(),
  established: z.number().int().optional(),
  scope: z.array(z.string()).min(1),
  about: z.array(z.string()).min(1),
  submissionWordRange: z.tuple([z.number(), z.number()]).optional(),
  contactName: z.string(),
  contactEmail: z.string().email(),
  heroImagePath: z.string().optional(),
});
export type Journal = z.infer<typeof journalSchema>;

export const issueSchema = z.object({
  id: z.string(),
  journalSlug: z.string(),
  volume: z.number().int().positive(),
  issue: z.number().int().positive(),
  year: z.number().int(),
  publishedAt: z.string().optional(),
  title: z.string().optional(),
  themeBlurb: z.string().optional(),
  pdfPath: z.string().optional(),
  pdfSizeKb: z.number().int().optional(),
  available: z.boolean().default(true),
  coverImagePath: z.string().optional(),
});
export type Issue = z.infer<typeof issueSchema>;

export const articleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  issueId: z.string(),
  title: z.string(),
  authors: z.array(z.string()).min(1),
  abstract: z.string().optional(),
  pages: z.string().optional(),
  doi: z.string().optional(),
  type: z.enum(["article", "book-review", "editorial"]).default("article"),
  accessLevel: z.enum(["open", "subscriber"]).default("subscriber"),
});
export type Article = z.infer<typeof articleSchema>;

export const bookSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  editors: z.array(z.string()).min(1).optional(),
  authors: z.array(z.string()).optional(),
  isbnEbook: z.string().optional(),
  isbnPrint: z.string().optional(),
  pricePounds: z.number().nonnegative().optional(),
  pages: z.number().int().positive().optional(),
  publishedAt: z.string().optional(),
  series: z.string().optional(),
  overview: z.string(),
  coverImagePath: z.string().optional(),
  status: z.enum(["available", "forthcoming"]).default("available"),
});
export type Book = z.infer<typeof bookSchema>;

export const editorRoleSchema = z.enum([
  "editor-in-chief",
  "deputy-editor-in-chief",
  "associate",
  "assistant",
  "book-reviews-editor",
  "editorial-board",
]);
export type EditorRole = z.infer<typeof editorRoleSchema>;

export const editorSchema = z.object({
  id: z.string(),
  name: z.string(),
  honorific: z.string().optional(),
  title: z.string().optional(),
  affiliation: z.string(),
  country: z.string().optional(),
  role: editorRoleSchema,
  journalSlug: z.string(),
  bio: z.string().optional(),
  photoPath: z.string().optional(),
});
export type Editor = z.infer<typeof editorSchema>;

export const EDITOR_ROLE_LABEL: Record<EditorRole, string> = {
  "editor-in-chief": "Editor in Chief",
  "deputy-editor-in-chief": "Deputy Editor in Chief",
  associate: "Associate Editor",
  assistant: "Assistant Editor",
  "book-reviews-editor": "Book Reviews Editor",
  "editorial-board": "Editorial Board",
};

export const EDITOR_ROLE_LABEL_PLURAL: Record<EditorRole, string> = {
  "editor-in-chief": "Editor in Chief",
  "deputy-editor-in-chief": "Deputy Editors in Chief",
  associate: "Associate Editors",
  assistant: "Assistant Editors",
  "book-reviews-editor": "Book Reviews Editor",
  "editorial-board": "Editorial Board",
};

export const EDITOR_ROLE_ORDER: EditorRole[] = [
  "editor-in-chief",
  "deputy-editor-in-chief",
  "associate",
  "assistant",
  "book-reviews-editor",
  "editorial-board",
];

export const prizeWinnerSchema = z.object({
  year: z.number().int(),
  authors: z.array(z.string()).min(1),
  articleTitle: z.string(),
  citation: z.string(),
  articleSlug: z.string().optional(),
});
export type PrizeWinner = z.infer<typeof prizeWinnerSchema>;
