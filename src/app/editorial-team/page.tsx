import Image from "next/image";
import Link from "next/link";
import { journals, editorsForJournalByRole } from "@/lib/content";
import {
  EDITOR_ROLE_LABEL_PLURAL,
  EDITOR_ROLE_ORDER,
} from "@/content/schemas";

export const metadata = {
  title: "Editorial Team",
  description:
    "Meet the editorial teams of Revival Press — Editor in Chief, Deputy Editors, Associate Editors, Assistant Editors, and Editorial Boards across LTIMS and IILGA.",
};

export default function EditorialTeamPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide pt-20 pb-12 md:pt-28 grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p
              className="eyebrow mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Editorial team
            </p>
            <h1
              className="heading-display text-[clamp(2.5rem,6vw,4.5rem)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our world-renowned editorial team.
            </h1>
            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The editorial boards of our two journals oversee every stage of
              the publication workflow — preliminary review, anonymous external
              reviewing, and final acceptance. Together they bring scholars from
              across five continents into a single editorial conversation.
            </p>
          </div>
          <div className="md:col-span-5 hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/community-watercolor.png"
                alt="Watercolour of scholars in conversation near a mosque"
                width={760}
                height={1024}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Per-journal navigation */}
      <nav
        aria-label="Editorial teams"
        className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur"
      >
        <div className="container-wide flex flex-wrap items-center gap-x-6 gap-y-2 py-3 text-sm">
          {journals.map((j) => (
            <a
              key={j.slug}
              href={`#${j.shortCode.toLowerCase()}`}
              className="whitespace-nowrap text-foreground/75 transition-colors hover:text-foreground"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {j.shortCode} — {j.title}
            </a>
          ))}
        </div>
      </nav>

      {journals.map((j) => {
        const team = editorsForJournalByRole(j.slug);
        const hasAny = EDITOR_ROLE_ORDER.some(
          (r) => (team[r]?.length ?? 0) > 0,
        );
        if (!hasAny) return null;
        return (
          <section
            key={j.slug}
            id={j.shortCode.toLowerCase()}
            className="border-b border-border scroll-mt-32"
          >
            <div className="container-wide py-20">
              <div className="mb-12 flex items-end justify-between gap-6">
                <div>
                  <p
                    className="eyebrow mb-2"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {j.shortCode}
                  </p>
                  <h2
                    className="text-3xl md:text-4xl tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {j.title}
                  </h2>
                </div>
                <Link
                  href={`/journals/${j.slug}`}
                  className="hidden sm:inline-flex items-center gap-1 text-sm text-foreground underline underline-offset-4 hover:text-primary"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Visit journal →
                </Link>
              </div>

              <div className="space-y-12">
                {EDITOR_ROLE_ORDER.map((role) => {
                  const members = team[role];
                  if (!members || members.length === 0) return null;
                  return (
                    <div key={role}>
                      <h3
                        className="eyebrow mb-5"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {EDITOR_ROLE_LABEL_PLURAL[role]}
                      </h3>
                      <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                        {members.map((e) => (
                          <li
                            key={e.id}
                            className="border-l border-border pl-4 py-1"
                          >
                            <p
                              className="text-base leading-tight"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {e.honorific ? `${e.honorific} ` : ""}
                              {e.name}
                            </p>
                            <p
                              className="mt-1 text-sm text-muted-foreground"
                              style={{ fontFamily: "var(--font-sans)" }}
                            >
                              {e.title ? `${e.title}, ` : ""}
                              {e.affiliation}
                              {e.country ? `, ${e.country}` : ""}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
