import { editorSchema, type Editor, type EditorRole } from "./schemas";

const LTIMS = "legal-transformation-in-muslim-societies";
const IILGA = "islamic-international-law-and-global-affairs";

const slug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type Raw = Omit<Editor, "id"> & { id?: string };

const raw: Raw[] = [
  // =============================================================
  // LTIMS — Legal Transformation in Muslim Societies
  // =============================================================

  // --- Editor in Chief ---
  {
    name: "Ahmad Ghouri",
    honorific: "Dr",
    affiliation: "University of Sussex",
    country: "United Kingdom",
    role: "editor-in-chief",
    journalSlug: LTIMS,
    bio: "Dr Ahmad Ghouri leads the editorial direction of Revival Press's two flagship journals. His scholarship sits at the intersection of Islamic commercial law, international economic law, and the comparative regulation of finance in Muslim-majority states. He oversees peer review, editorial commissioning, and the development of the press's book programme.",
  },

  // --- Deputy Editors in Chief ---
  {
    name: "Zubair Abbasi",
    honorific: "Dr",
    affiliation: "Royal Holloway, University of London",
    country: "United Kingdom",
    role: "deputy-editor-in-chief",
    journalSlug: LTIMS,
  },
  {
    name: "Fatima Dhanani",
    title: "PhD Candidate and Teaching Fellow",
    affiliation: "SOAS University of London",
    country: "United Kingdom",
    role: "deputy-editor-in-chief",
    journalSlug: LTIMS,
  },

  // --- Associate Editors ---
  {
    name: "Sufi Shahab Saqib",
    honorific: "Dr",
    affiliation: "University of Birmingham",
    country: "United Kingdom",
    role: "associate",
    journalSlug: LTIMS,
  },
  {
    name: "Shoukat Ahmad Wani",
    honorific: "Dr",
    affiliation: "Alliance University",
    country: "India",
    role: "associate",
    journalSlug: LTIMS,
  },
  {
    name: "Yousef Wahb",
    affiliation: "University of Windsor",
    country: "Canada",
    role: "associate",
    journalSlug: LTIMS,
  },
  {
    name: "Mariana Dussin",
    honorific: "Dr",
    affiliation: "Haqaiq Center",
    country: "Saudi Arabia",
    role: "associate",
    journalSlug: LTIMS,
  },
  {
    name: "Badreddine Berrahlia",
    honorific: "Dr",
    affiliation: "Badji Mukhtar University",
    country: "Algeria",
    role: "associate",
    journalSlug: LTIMS,
  },
  {
    name: "Mahmoud Ashami",
    honorific: "Dr",
    affiliation: "University of Aberdeen",
    country: "United Kingdom",
    role: "associate",
    journalSlug: LTIMS,
  },
  {
    name: "Maya Najeeb Ammar",
    honorific: "Dr",
    affiliation: "University of Jordan",
    country: "Jordan",
    role: "associate",
    journalSlug: LTIMS,
  },
  {
    name: "Ozat Shamshiyev",
    honorific: "Dr",
    affiliation: "Social Sciences University of Ankara",
    country: "Türkiye",
    role: "associate",
    journalSlug: LTIMS,
  },
  {
    name: "Sheikh Inam Ul Mansoor",
    honorific: "Dr",
    affiliation:
      "Symbiosis Law School, Hyderabad, Symbiosis International (Deemed University), Pune",
    country: "India",
    role: "associate",
    journalSlug: LTIMS,
  },
  {
    name: "Fatima Essop",
    honorific: "Dr",
    title: "Senior Lecturer",
    affiliation: "University of Western Cape",
    country: "South Africa",
    role: "associate",
    journalSlug: LTIMS,
  },
  {
    name: "Rabia Tus Saleha",
    title: "Lecturer, Department of Shariah & Law, Faculty of Law",
    affiliation: "The Islamia University of Bahawalpur",
    country: "Pakistan",
    role: "associate",
    journalSlug: LTIMS,
  },

  // --- Assistant Editors ---
  {
    name: "Asif Belal",
    affiliation: "Aligarh Muslim University",
    country: "India",
    role: "assistant",
    journalSlug: LTIMS,
  },
  {
    name: "Amina Karim",
    affiliation: "University of the Punjab",
    country: "Pakistan",
    role: "assistant",
    journalSlug: LTIMS,
  },
  {
    name: "Kaif Hasan",
    affiliation: "Aligarh Muslim University",
    country: "India",
    role: "assistant",
    journalSlug: LTIMS,
  },
  {
    name: "Amr Ibn Munir",
    affiliation: "International Islamic University Islamabad",
    country: "Pakistan",
    role: "assistant",
    journalSlug: LTIMS,
  },
  {
    name: "Md. Omar Farque",
    affiliation: "Eastern University",
    country: "Bangladesh",
    role: "assistant",
    journalSlug: LTIMS,
  },

  // --- Book Reviews Editor ---
  {
    name: "Muhammad Abdullah Fazi",
    honorific: "Dr",
    affiliation: "Monash University",
    country: "Malaysia",
    role: "book-reviews-editor",
    journalSlug: LTIMS,
  },

  // --- Editorial Board ---
  {
    name: "Md Maimul Ahsan Khan",
    honorific: "Prof.",
    affiliation: "Leading University",
    country: "Bangladesh",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Nisrin Mahasneh",
    honorific: "Prof.",
    affiliation: "Qatar University",
    country: "Qatar",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Faizan Mustafa",
    honorific: "Prof.",
    affiliation: "Chanakya National Law University",
    country: "India",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Adnan Sarhan",
    honorific: "Prof.",
    affiliation: "University of Sharjah",
    country: "United Arab Emirates",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Muhammad Faruque",
    honorific: "Prof.",
    affiliation: "University of Cincinnati",
    country: "United States",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Mahmoud Masud",
    honorific: "Prof.",
    affiliation: "Prince Mohammad bin Fahd University",
    country: "Saudi Arabia",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Ali Khaled Qtaishat",
    honorific: "Prof.",
    affiliation: "The World Islamic Sciences and Education University",
    country: "Jordan",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Malahayati Rahman",
    honorific: "Prof.",
    affiliation: "Universitas Malikussaleh",
    country: "Indonesia",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Germán Rodriguez",
    honorific: "Prof.",
    affiliation: "IE University",
    country: "Spain",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Jabeur Fathally",
    honorific: "Prof.",
    affiliation: "University of Ottawa",
    country: "Canada",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Saeid Nazari Tavakkoli",
    honorific: "Prof.",
    affiliation: "University of Tehran",
    country: "Iran",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Qudsia Mirza",
    affiliation: "University of East London",
    country: "United Kingdom",
    role: "editorial-board",
    journalSlug: LTIMS,
  },
  {
    name: "Safdar Ali Sohail",
    honorific: "Dr",
    affiliation: "Social Protection Resource Centre",
    country: "Pakistan",
    role: "editorial-board",
    journalSlug: LTIMS,
  },

  // =============================================================
  // IILGA — Islamic International Law and Global Affairs
  // =============================================================

  // --- Editor in Chief ---
  {
    name: "Nehaluddin Ahmad",
    honorific: "Prof.",
    affiliation: "Sultan Sharif Ali Islamic University",
    country: "Brunei Darussalam",
    role: "editor-in-chief",
    journalSlug: IILGA,
  },

  // --- Deputy Editors in Chief ---
  {
    name: "Yasmine Abdel Moneim",
    honorific: "Dr",
    affiliation: "University of London — European Universities",
    country: "Egypt",
    role: "deputy-editor-in-chief",
    journalSlug: IILGA,
  },
  {
    name: "Khaled Bashir",
    honorific: "Dr",
    title: "Lecturer",
    affiliation: "University of Aberdeen",
    country: "United Kingdom",
    role: "deputy-editor-in-chief",
    journalSlug: IILGA,
  },

  // --- Associate Editors ---
  {
    name: "Osama Hamza",
    honorific: "Dr",
    affiliation: "Helwan University Cairo",
    country: "Egypt",
    role: "associate",
    journalSlug: IILGA,
  },
  {
    name: "Nadia Ahmed",
    honorific: "Dr",
    affiliation: "Prince Mohammad Bin Fahd University",
    country: "Saudi Arabia",
    role: "associate",
    journalSlug: IILGA,
  },
  {
    name: "Busari Jamiu Muhammad",
    honorific: "Dr",
    affiliation: "Osun State University",
    country: "Nigeria",
    role: "associate",
    journalSlug: IILGA,
  },
  {
    name: "Zainab Dahham",
    honorific: "Dr",
    title: "Visiting Fellow",
    affiliation: "Dublin City University",
    country: "Ireland",
    role: "associate",
    journalSlug: IILGA,
  },
  {
    name: "Mohammad Hosein Vakili Moghadam",
    honorific: "Dr",
    title: "Assistant Professor",
    affiliation: "Hazrat-e Masoumeh University, Qom",
    country: "Iran",
    role: "associate",
    journalSlug: IILGA,
  },
  {
    name: "Khadija Younus",
    honorific: "Dr",
    title: "American Studies",
    affiliation: "Quaid-i-Azam University",
    country: "Pakistan",
    role: "associate",
    journalSlug: IILGA,
  },
  {
    name: "Rizwan ul Haq",
    title: "Deputy Secretary (Trade Diplomacy)",
    affiliation: "Ministry of Commerce",
    country: "Pakistan",
    role: "associate",
    journalSlug: IILGA,
  },
  {
    name: "Fetra Ardianto",
    title: "M.Soc. (Diplomacy)",
    affiliation: "Paramadina Graduate School of Diplomacy",
    country: "Indonesia",
    role: "associate",
    journalSlug: IILGA,
  },
  {
    name: "Saifuddin Patel",
    honorific: "Dr",
    affiliation: "BITS Law School, Mumbai",
    country: "India",
    role: "associate",
    journalSlug: IILGA,
  },
  {
    name: "Mohammad Shekaib Alam",
    honorific: "Dr",
    affiliation: "Villa College",
    country: "Maldives",
    role: "associate",
    journalSlug: IILGA,
  },
  {
    name: "Tran Minh Chien",
    affiliation: "Ho Chi Minh City Open University",
    country: "Vietnam",
    role: "associate",
    journalSlug: IILGA,
  },

  // --- Assistant Editors ---
  {
    name: "Khalil Dewan",
    title: "PhD Researcher",
    affiliation: "SOAS University of London",
    country: "United Kingdom",
    role: "assistant",
    journalSlug: IILGA,
  },
  {
    name: "Najumuddin Hamdani",
    title: "Visiting Lecturer",
    affiliation: "Karakorum Law College, Gilgit",
    country: "Pakistan",
    role: "assistant",
    journalSlug: IILGA,
  },
  {
    name: "Junaid ul Shafi",
    title: "PhD Researcher",
    affiliation: "BML Munjal University, Gurgaon",
    country: "India",
    role: "assistant",
    journalSlug: IILGA,
  },
  {
    name: "Faiz Ayat Ansari",
    title: "Assistant Professor",
    affiliation: "KIIT Deemed to be University, Bhubaneswar",
    country: "India",
    role: "assistant",
    journalSlug: IILGA,
  },
  {
    name: "Mehdi Ghaedsharaf",
    title: "PhD Candidate",
    affiliation: "University of Strasbourg",
    country: "France",
    role: "assistant",
    journalSlug: IILGA,
  },
  {
    name: "Syeda Aamna Hasan",
    title: "LLM International Human Rights Law",
    affiliation: "Brunel University",
    country: "United Kingdom",
    role: "assistant",
    journalSlug: IILGA,
  },

  // --- Book Reviews Editor ---
  {
    name: "S. M. Aamir Ali",
    title: "Assistant Professor of Law",
    affiliation: "Symbiosis Law School, Pune",
    country: "India",
    role: "book-reviews-editor",
    journalSlug: IILGA,
  },

  // --- Editorial Board ---
  {
    name: "Mutaz M. Qafisheh",
    honorific: "Prof.",
    affiliation: "Hebron University",
    country: "Palestine",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Ahmed Aldawoody",
    honorific: "Prof.",
    affiliation: "International Committee of the Red Cross, Geneva",
    country: "Switzerland",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Amer Fakhoury",
    honorific: "Prof.",
    affiliation: "American University in the Emirates",
    country: "United Arab Emirates",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Sarah Alshahrani",
    honorific: "Prof.",
    affiliation: "Taibah University",
    country: "Saudi Arabia",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Rana Moustafa",
    honorific: "Prof.",
    affiliation: "Alexandria University",
    country: "Egypt",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Muhammad Munir",
    honorific: "Prof.",
    affiliation: "International Islamic University, Islamabad",
    country: "Pakistan",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Mohammad Rababah",
    honorific: "Prof.",
    affiliation: "University of Dubai",
    country: "United Arab Emirates",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Ahmet F. Aysan",
    honorific: "Prof.",
    affiliation: "Hamad Bin Khalifa University",
    country: "Qatar",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Sarfaraz Ahmed Khan",
    honorific: "Prof.",
    affiliation:
      "West Bengal National University of Juridical Sciences, Kolkata",
    country: "India",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Ahmer Bilal Soofi",
    title: "Advocate Supreme Court",
    affiliation: "Supreme Court of Pakistan",
    country: "Pakistan",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Emilia Justyna Powell",
    honorific: "Prof.",
    affiliation: "University of Notre Dame",
    country: "United States",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Ali Abusedra",
    honorific: "Dr",
    title:
      "Senior Fellow, Mediterranean Basin, Middle East, and Gulf Initiative",
    affiliation: "Mediterranean Basin, Middle East, and Gulf Initiative",
    country: "United States",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Ayesha Malik",
    title: "Director",
    affiliation: "War Law Institute",
    country: "Pakistan",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Mohyedine Hajjar",
    honorific: "Dr",
    affiliation: "Islamic Development Bank Institute",
    country: "Saudi Arabia",
    role: "editorial-board",
    journalSlug: IILGA,
  },
  {
    name: "Wael Allam",
    honorific: "Prof.",
    title: "Professor of International Law",
    affiliation: "College of Law, University of Sharjah",
    country: "United Arab Emirates",
    role: "editorial-board",
    journalSlug: IILGA,
  },
];

export const editors: Editor[] = raw.map((e) =>
  editorSchema.parse({ ...e, id: e.id ?? `${e.journalSlug}-${slug(e.name)}` }),
);

export const editorsByJournal: Record<string, Editor[]> = editors.reduce<
  Record<string, Editor[]>
>((acc, e) => {
  (acc[e.journalSlug] ||= []).push(e);
  return acc;
}, {});

export function editorsForJournalByRole(
  journalSlug: string,
): Record<EditorRole, Editor[]> {
  const list = editorsByJournal[journalSlug] ?? [];
  return list.reduce(
    (acc, e) => {
      (acc[e.role] ||= []).push(e);
      return acc;
    },
    {} as Record<EditorRole, Editor[]>,
  );
}
