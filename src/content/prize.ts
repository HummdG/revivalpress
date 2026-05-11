import { prizeWinnerSchema, type PrizeWinner } from "./schemas";

export const prizeMeta = {
  name: "Imran Ahsan Khan Nyazee Prize",
  awardedBy: "Legal Transformation in Muslim Societies",
  announcedIn: "January",
  description: [
    "The Imran Ahsan Khan Nyazee Prize is awarded annually by Legal Transformation in Muslim Societies to recognise exceptional scholarship in Islamic legal theory, comparative jurisprudence, and the evolving role of law in Muslim societies.",
    "Named in honour of Professor Imran Ahsan Khan Nyazee — whose groundbreaking work has reshaped contemporary understandings of usul al-fiqh and Islamic legal methodology — the prize celebrates academic excellence, originality, and critical engagement with the legal traditions and transformations of Muslim contexts.",
    "Each year, the editorial board selects the most outstanding article published in the journal during the previous volume year. The winning article is chosen for its scholarly depth, clarity of analysis, and its contribution to advancing the discourse on legal reform, continuity, and innovation in Muslim societies.",
    "The recipient is announced annually in January. The editorial board extends its sincere appreciation to all contributors for their valuable insights and contributions to the field.",
  ],
} as const;

export const prizeWinners: PrizeWinner[] = [
  prizeWinnerSchema.parse({
    year: 2025,
    authors: ["Mohammad Saif", "Md Nawaz Hasan"],
    articleTitle:
      "Diminishing Space of Muslim Personal Law in Post-Independent India: Political Identity, Nation State, and the Impact of Liberal Epistemology",
    citation:
      "Mohammad Saif and Md Nawaz Hasan, 'Diminishing Space of Muslim Personal Law in Post-Independent India: Political Identity, Nation State, and the Impact of Liberal Epistemology' (2025) 2(1) Legal Transformation in Muslim Societies 38–61.",
    articleSlug:
      "diminishing-space-of-muslim-personal-law-in-post-independent-india-political-ide",
  }),
];
