import { bookSchema, type Book } from "./schemas";

export const books: Book[] = [
  bookSchema.parse({
    slug: "women-and-constitutions-in-muslim-contexts",
    title: "Women and Constitutions in Muslim Contexts",
    editors: ["Vrinda Narain", "Mona Tajali"],
    isbnEbook: "978-1-917099-01-1",
    pricePounds: 35,
    pages: 254,
    publishedAt: "2024-03-01",
    series: "Transformative Power of Law in Guiding Reform",
    overview:
      "This edited volume is premised on the understanding that women's inclusion in constitutional design is neither marginal nor cosmetic — it is foundational to the legitimacy of the legal order in any Muslim-majority or Muslim-minority polity. Across eleven chapters, leading scholars examine how constitutions in Muslim contexts have variously enabled and obstructed women's full citizenship, drawing on case studies from North Africa, South Asia, the Gulf, and diaspora communities. The collection moves between doctrinal analysis, comparative constitutional law, and feminist legal theory, asking how constitutional texts and practices can be reformed — and how Islamic legal traditions themselves can be mobilised — to advance substantive equality. Contributors engage with questions of gender quotas, personal status codes, family courts, religious tribunals, the role of constitutional courts, and the politics of constitutional drafting in transitional moments.",
    status: "available",
    coverImagePath: "/images/book-cover-women.png",
  }),
  bookSchema.parse({
    slug: "saudi-arabia-vision-2030-shariah-and-contemporary-legal-trends",
    title: "Saudi Arabia's Vision 2030: Shariah and Contemporary Legal Trends",
    authors: ["Mohammad Bashayreh"],
    subtitle: "The Transformative Power of Law in Guiding Reforms",
    pricePounds: 38,
    publishedAt: "2024-06-01",
    series: "Transformative Power of Law in Guiding Reform",
    overview:
      "A scholarly examination of the legal transformations underway in Saudi Arabia under the Vision 2030 reform programme. The book situates contemporary developments — judicial codification, women's rights reforms, foreign investment regimes, capital markets and Sukuk regulation, the criminal code, and the personal status law — within the broader framework of classical Shariah and modern comparative legal trends. It is essential reading for investors, practitioners, scholars and policymakers seeking to understand how one of the most consequential legal reform programmes in the contemporary Muslim world is reshaping rights and responsibilities for citizens, residents, and counterparties alike.",
    status: "available",
    coverImagePath: "/images/book-cover-saudi.png",
  }),
];

export const booksBySlug = Object.fromEntries(
  books.map((b) => [b.slug, b] as const),
);
