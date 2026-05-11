import { journalSchema, type Journal } from "./schemas";

export const journals: Journal[] = [
  journalSchema.parse({
    slug: "legal-transformation-in-muslim-societies",
    shortCode: "LTIMS",
    title: "Legal Transformation in Muslim Societies",
    tagline:
      "A quarterly journal on how Islamic law continuously transforms to meet the changing needs of Muslim societies.",
    printIssn: "3029-0961",
    onlineIssn: "3029-097X",
    frequency: "Quarterly",
    established: 2024,
    scope: [
      "Reform and reinterpretation of Islamic law",
      "Diversity of legal thought within Islam",
      "Cross-cultural and comparative legal interactions",
      "Implementation, administration, and institutional transformation",
      "Gender, ethics, and constitutional theory in Muslim contexts",
    ],
    about: [
      "The Legal Transformation in Muslim Societies is a quarterly journal offering a platform for intellectually stimulating and critical commentaries and new discourses on issues that shape the law in Muslim societies around the globe. Legal transformation in societies is broadly construed as the processes and forms of reform of legal systems and their rules that reflect and promote values, goals, cultures, customs, structures, interests, and working mechanisms of societies. Legal transformation can involve creating new laws, reforming existing laws, or abolishing unjust or oppressive laws. Legal transformation can also affect the way law is interpreted, applied, enforced, and challenged by different actors and institutions.",
      "Islamic law is not a stagnant system and has continuously transformed reflecting to the changing needs and circumstances of Muslim societies around the globe. There are many factors that influence the transformation of Islamic law including, for example, the general conceptions of Islamic law, the role of customs and cultures in the adaptation and developments in Islamic law, and the intersections of Islamic law with non-Islamic legal systems. Islamic law scholars have different views on different aspects of Islamic law and often debate how it should be interpreted and applied. They place different degrees of emphasis on the primacy of the Qur'an and the Sunnah (the teachings and practices of Prophet Muhammad (PBUH)) as the sources of Islamic law whilst relying in different proportions on consensus (ijma) and rational arguments such as analogical reasoning (qiyas) or public interest (maslaha) as additional sources. Amidst scholarly debates on sources of Islamic law and methods of their interpretation, Islamic law has lived through a long and complex history that spans over fourteen centuries covering different regions, societies, and cultures. As Islamic law has replaced or reformed existing customs in societies that were incompatible with Islamic principles, local customs, traditions and cultures have also influenced the interpretation and progress of Islamic law. When Muslim societies expanded their influence, or when Muslims and Islam reached across different regions and continents, they encountered various legal norms and systems that have different origins, sources, methods, and outcomes. Islamic law has incorporated elements from other legal systems existing in societies when appropriate and it has also reshaped or repudiated element of other legal systems when necessary, giving rise to questions related to rejection, harmonisation, and reconciliation of these legal systems with Islamic law.",
      "The Legal Transformation in Muslim Societies welcomes contributions seeking to assess the existing or develop new legal concepts and categories to deal with issues that arise from the transformation, reform, reinterpretation, re-evaluation, and reconstruction of Islamic law, diversity and pluralism within Islam, and its cross-cultural interactions. We are also interested in new ideas on the implementation and administration of Islamic law in an efficient and effective manner in Muslim societies through transformation of institutions such as politics (siyasa), judgeship (qadayya), market inspection (hisba), consultation (shura), law schools (madrasas), colleges (madrasas al-tayyibah), etc. as these institutions play important roles in developing Islamic jurisprudence (fiqh), codifying legal norms (usul al-fiqh), resolving legal disagreements (fiqh al-madhdhab), producing legal scholarship (ijtihad), and building culture and civilisations (tamudan). We also seek contributions on aspects such as challenges and opportunities for modernisation. As modernity brings about social changes in the shape of, for example, technological advancements, industrialisation, urbanisation, secularisation, capitalism, liberalism, and globalisation, it also poses new challenges for Muslims in terms of preserving their identity, values, and traditions while making positive advancements to new realities, demands, and expectations from within and outside of their communities. Authors may also focus on modernisation as a source of new opportunities for Muslims in terms of promoting their interests, rights, and welfare while contributing to global peace, justice, and development, through innovation, dialogue, and cooperation with other actors.",
    ],
    submissionWordRange: [5000, 15000],
    contactName: "Dr Ahmad Ghouri",
    contactEmail: "a.a.ghouri@outlook.com",
    heroImagePath: "/images/mosque-tall-red.jpeg",
  }),
  journalSchema.parse({
    slug: "islamic-international-law-and-global-affairs",
    shortCode: "IILGA",
    title: "Islamic International Law and Global Affairs",
    tagline:
      "Scholarship on Islamic international law (siyar) and global affairs in a rapidly transforming world.",
    printIssn: "2977-9693",
    onlineIssn: "2977-9707",
    frequency: "Annual",
    established: 2026,
    scope: [
      "Classical siyar: diplomacy, treaties, armed conflict",
      "Trade law and Islamic commercial international law",
      "Human rights from Islamic and comparative perspectives",
      "Environmental law and stewardship",
      "Migration, refugees, and the law of peoples",
      "Cybersecurity, technology governance, and global health",
    ],
    about: [
      "Islamic International Law and Global Affairs is a peer-reviewed academic journal committed to advancing rigorous and innovative scholarship on Islamic international law (siyar) and its engagement with the evolving landscape of global legal affairs. The journal serves as a platform for critical inquiry into the historical foundations, normative frameworks, and contemporary relevance of siyar across diverse Muslim societies and international contexts.",
      "The journal's vision is to reinvigorate scholarly discourse on the classical doctrines of siyar and their intersections with modern international law. It explores the role of Islamic legal thought in shaping responses to global challenges in both classical domains, such as diplomacy, armed conflict, and treaty law, and contemporary fields including international trade and investment law, human rights and humanitarian law, environmental law and climate governance, migration and refugee protection, cybersecurity and digital sovereignty, and global health and transnational regulation.",
      "It fosters interdisciplinary research that bridges the fields of law, theology, history, political science, and international relations. It promotes comparative legal analysis and pluralistic approaches to global norm-making, with a focus on the voices and experiences of Muslim-majority and minority communities worldwide. It encourages contributions that challenge dominant paradigms, offer fresh perspectives, and engage with contemporary legal debates through the lens of Islamic jurisprudence. Islamic International Law and Global Affairs provides a leading forum for scholars, practitioners, and policymakers seeking to understand and shape the role of Islamic international law in a complex, interconnected, and rapidly transforming world.",
    ],
    submissionWordRange: [5000, 15000],
    contactName: "Dr Ahmad Ghouri",
    contactEmail: "a.a.ghouri@outlook.com",
    heroImagePath: "/images/mosque-blue-dome.jpeg",
  }),
];

export const journalsBySlug = Object.fromEntries(
  journals.map((j) => [j.slug, j] as const),
);

export const journalsByShortCode = Object.fromEntries(
  journals.map((j) => [j.shortCode, j] as const),
);
