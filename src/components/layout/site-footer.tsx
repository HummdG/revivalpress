import Link from "next/link";
import Image from "next/image";

const footerColumns = [
  {
    title: "Journals",
    links: [
      { href: "/journals/legal-transformation-in-muslim-societies", label: "LTIMS" },
      { href: "/journals/islamic-international-law-and-global-affairs", label: "IILGA" },
      { href: "/journals", label: "All journals" },
    ],
  },
  {
    title: "Publish",
    links: [
      { href: "/author-info", label: "Submission guide" },
      { href: "/editorial-team", label: "Editorial team" },
      { href: "/prize", label: "Annual prize" },
    ],
  },
  {
    title: "Press",
    links: [
      { href: "/books", label: "Books" },
      { href: "/account", label: "My subscription" },
      { href: "mailto:a.a.ghouri@outlook.com", label: "Contact editor" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-muted">
      <div className="container-wide py-16 grid gap-12 md:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5"
            aria-label="Revival Press home"
          >
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span
              className="text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Revival Press
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Peer-reviewed scholarship on Islamic law, jurisprudence and global
            affairs. Published from the United Kingdom.
          </p>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3
              className="eyebrow mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {col.title}
            </h3>
            <ul
              className="space-y-2.5 text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/85 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div
          className="container-wide flex flex-col gap-2 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <p>
            © {new Date().getFullYear()} Revival Press Limited. All rights
            reserved. Registered in England and Wales, company number 15280723.
          </p>
        </div>
      </div>
    </footer>
  );
}
