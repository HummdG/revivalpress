import { articleSchema, type Article } from "./schemas";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);

const raw: Array<Omit<Article, "slug">> = [
  // === LTIMS Vol 1, Issue 1 ===
  {
    id: "ltims-v1-i1-a01",
    issueId: "ltims-v1-i1",
    title: "Securitisation of Sovereign Assets for Sukuk in Nigeria",
    authors: ["Aishat Abdul-Qadir Zubair"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v1-i1-a02",
    issueId: "ltims-v1-i1",
    title:
      "A Shari'ah Appraisal of Virtual Currencies Based on Historical Perspective, Recent Legal Development and Financial Trends",
    authors: [
      "Badreddine Berrahli",
      "F. B. Lalayami",
      "M. Kabir Hassan",
      "Aishath Muneeza",
      "Ismail Mohamed",
    ],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v1-i1-a03",
    issueId: "ltims-v1-i1",
    title:
      "A Critical Analysis of the Legal Framework Addressing Violence Against Women and Marital Rape in Lebanon",
    authors: ["Beata Polok", "Caroline Attie"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v1-i1-a04",
    issueId: "ltims-v1-i1",
    title: "Nikah-Halala in India: Practice, Precept, and Perception",
    authors: ["Mohd Imran"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v1-i1-a05",
    issueId: "ltims-v1-i1",
    title:
      "Ensuring Economic Security for Women After Divorce: A Comparative Analysis of Alimony Rights",
    authors: ["Syeda Izza Maryam Rizvi"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v1-i1-a06",
    issueId: "ltims-v1-i1",
    title:
      "Trial of Civilians by Military Courts in Pakistan: Insights Through Constitutional, Islamic and International Law Lenses",
    authors: ["Amina Karim"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v1-i1-a07",
    issueId: "ltims-v1-i1",
    title: "Islamic Law and the Protection Against Enforced Disappearances",
    authors: ["Heidi Kandiel"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v1-i1-a08",
    issueId: "ltims-v1-i1",
    title:
      "The Role of Majority Muslim Littoral States to Establish a Prosperous and Stable Indian Ocean",
    authors: ["Hasan Yaser Malik"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v1-i1-a09",
    issueId: "ltims-v1-i1",
    title: "Legal Implications of Environmental Crimes in Islamic Jurisprudence",
    authors: ["Iftikhar Hussain Bhat"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v1-i1-a10",
    issueId: "ltims-v1-i1",
    title:
      "The Jus ad Bellum and Jus in Bello Predicament in the Context of the Israel–Hamas Conflict",
    authors: ["Nehaluddin Ahmad", "Aqilah Walin Ali"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v1-i1-r01",
    issueId: "ltims-v1-i1",
    title:
      "Book Review: Saudi Arabia's Vision 2030, Shariah, and Contemporary Legal Trends",
    authors: ["German Rodriguez Moreno"],
    type: "book-review",
    accessLevel: "subscriber",
  },

  // === LTIMS Vol 2, Issue 1 ===
  {
    id: "ltims-v2-i1-a01",
    issueId: "ltims-v2-i1",
    title:
      "The Evolution and Role of 'Justice, Equity and Good Conscience' under the Anglo-Indian and Pakistani Jurisprudence",
    authors: ["Amr Ibn Munir"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v2-i1-a02",
    issueId: "ltims-v2-i1",
    title:
      "Supporting Working Mothers and Child Development: A Policy Framework for Reforming the Qurrah Programme in Saudi Arabia",
    authors: ["Dalyah Hasanain", "Mariana Dussin"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v2-i1-a03",
    issueId: "ltims-v2-i1",
    title:
      "Diminishing Space of Muslim Personal Law in Post-Independent India: Political Identity, Nation State, and the Impact of Liberal Epistemology",
    authors: ["Mohammad Saif", "Md Nawaz Hasan"],
    abstract:
      "Winner of the 2025 Imran Ahsan Khan Nyazee Prize. Examines how Muslim personal law has been progressively constrained in post-Independence India through the interaction of political identity, the nation-state framework and liberal legal epistemology.",
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v2-i1-a04",
    issueId: "ltims-v2-i1",
    title:
      "Divorce in Saudi Personal Status Law: A Delicate Balance between Individual Rights and Family Stability",
    authors: ["Nawel Ben Sassi", "Nadia Ahmad"],
    type: "article",
    accessLevel: "subscriber",
  },

  // === LTIMS Vol 2, Issue 2 ===
  {
    id: "ltims-v2-i2-a01",
    issueId: "ltims-v2-i2",
    title:
      "Islamic Ethical Principles for Addressing Obesity: A Public Policy Perspective",
    authors: ["Nehaluddin Ahmad", "Sara Haji Ahmad", "Faizah Rahim"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v2-i2-a02",
    issueId: "ltims-v2-i2",
    title: "Mediation in Malaysia: A Solution to the Civil Cases Backlog?",
    authors: ["Hanis Wahed"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v2-i2-a03",
    issueId: "ltims-v2-i2",
    title:
      "Shari'ah Appraisal of Beneficial Ownership: A Qualitative Analysis of Sovereign Ijarah Sukuk Structures in Pakistan, Malaysia, and Bahrain",
    authors: [
      "Muhammad Shoaib Cheema",
      "Shafiqul Hassan",
      "Hafiz Ghulam Abbas",
    ],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v2-i2-a04",
    issueId: "ltims-v2-i2",
    title:
      "Ontological Transformations of Human Existence in Virtual Space: An Islamic Ethical and Spiritual Perspective",
    authors: ["Abdullah Salavati", "Ali Qanavati", "Abdulwasi Olawale"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v2-i2-a05",
    issueId: "ltims-v2-i2",
    title:
      "The Impact of Cultural and Economic Changes in Society on the Functions of Marriage",
    authors: ["Fahimeh Jahanian"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v2-i2-a06",
    issueId: "ltims-v2-i2",
    title:
      "Inheritability of the Right to Accept a Possessory Will: A Critical Analysis of Shiite Jurisprudence and Iranian Legal Doctrine",
    authors: ["Farzaneh Karami", "Javad Sarkhosh"],
    type: "article",
    accessLevel: "subscriber",
  },
  {
    id: "ltims-v2-i2-a07",
    issueId: "ltims-v2-i2",
    title:
      "Forced Marriage: An Analysis of Pakistani Culture in Light of Islamic and Human Rights Law",
    authors: ["Maryam Tariq"],
    type: "article",
    accessLevel: "subscriber",
  },

  // === LTIMS Vol 1, Issues 2-3 — TOC forthcoming ===
  // (Issues exist; full table of contents will be added when received from editors.)

  // === IILGA Vol 1, Issue 1 — TOC forthcoming ===
];

export const articles: Article[] = raw.map((a) =>
  articleSchema.parse({ ...a, slug: slugify(a.title) }),
);

export const articlesByIssue = articles.reduce<Record<string, Article[]>>(
  (acc, article) => {
    (acc[article.issueId] ||= []).push(article);
    return acc;
  },
  {},
);

export function findArticleBySlug(
  issueId: string,
  slug: string,
): Article | undefined {
  return articlesByIssue[issueId]?.find((a) => a.slug === slug);
}
