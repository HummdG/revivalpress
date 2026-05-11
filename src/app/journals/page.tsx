import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { journals, getLatestIssue, issueSlug } from "@/lib/content";
import { issueLabel } from "@/content/issues";
import { italicizeArabic } from "@/lib/italicize-arabic";

export const metadata = {
  title: "Journals",
  description:
    "Revival Press publishes two peer-reviewed journals on Islamic law and global affairs: LTIMS and IILGA.",
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

export default function JournalsPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--accent) 20%, var(--accent) 80%, transparent)",
            opacity: 0.5,
          }}
        />
        <div className="container-wide pt-24 pb-20 md:pt-32 md:pb-24">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="block h-px w-10 bg-[var(--accent)]"
            />
            <p
              className="eyebrow"
              style={{ fontFamily: "var(--font-sans)", color: "var(--accent)" }}
            >
              The Journals
            </p>
          </div>

          <h1
            className="heading-display mt-6 text-[clamp(2.5rem,6vw,4.75rem)] max-w-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Two peer-reviewed journals shaping{" "}
            <em
              className="italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              Islamic legal
            </em>{" "}
            scholarship.
          </h1>

          <p
            className="mt-10 max-w-2xl text-lg leading-[1.7] text-muted-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {italicizeArabic(
              "Across Legal Transformation in Muslim Societies and Islamic International Law and Global Affairs, Revival Press publishes original research on the doctrines, institutions, and lived practices that make up Islamic law today — from classical fiqh and siyar to contemporary questions of reform and reinterpretation.",
            )}
          </p>

          <div
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>{journals.length} active titles</span>
            <span aria-hidden className="h-px w-6 bg-border-strong" />
            <span>Peer reviewed</span>
            <span aria-hidden className="h-px w-6 bg-border-strong" />
            <span>Open submissions</span>
          </div>
        </div>
      </section>

      {/* ---------- Journals ---------- */}
      <section>
        <div className="container-wide pb-24">
          {journals.map((j, idx) => {
            const latest = getLatestIssue(j.slug);
            const reverse = idx % 2 === 1;
            return (
              <article
                key={j.slug}
                className="relative grid gap-12 border-b border-border py-20 last:border-0 md:grid-cols-12 md:gap-x-14"
              >
                {/* Roman numeral marker */}
                <div
                  aria-hidden
                  className="absolute left-0 top-20 hidden select-none text-[10rem] leading-none text-foreground/[0.04] md:block"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontVariationSettings: '"opsz" 144',
                  }}
                >
                  {ROMAN[idx]}
                </div>

                <div
                  className={`relative md:col-span-5 ${reverse ? "md:order-2" : ""}`}
                >
                  <div
                    className="flex items-center gap-3"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <span
                      className="text-xs font-medium uppercase tracking-[0.22em]"
                      style={{ color: "var(--accent)" }}
                    >
                      № {ROMAN[idx]}
                    </span>
                    <span aria-hidden className="h-px w-6 bg-border-strong" />
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {j.shortCode} · {j.frequency} · Est. {j.established}
                    </span>
                  </div>

                  <h2
                    className="mt-6 text-[2rem] leading-[1.08] tracking-tight md:text-[2.5rem]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {j.title}
                  </h2>

                  <p
                    className="mt-6 text-base italic leading-[1.7] text-muted-foreground"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {italicizeArabic(j.tagline)}
                  </p>

                  <dl
                    className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-5 text-[11px]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {j.printIssn && (
                      <div>
                        <dt className="uppercase tracking-[0.18em] text-muted-foreground">
                          Print ISSN
                        </dt>
                        <dd className="mt-1 tabular-nums text-foreground">
                          {j.printIssn}
                        </dd>
                      </div>
                    )}
                    {j.onlineIssn && (
                      <div>
                        <dt className="uppercase tracking-[0.18em] text-muted-foreground">
                          Online ISSN
                        </dt>
                        <dd className="mt-1 tabular-nums text-foreground">
                          {j.onlineIssn}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <div
                    className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <Link
                      href={`/journals/${j.slug}`}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <span className="border-b border-foreground pb-0.5 transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--primary)]">
                        Visit the journal
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                    {latest && (
                      <>
                        <span
                          aria-hidden
                          className="h-px w-4 bg-border-strong"
                        />
                        <Link
                          href={`/journals/${j.slug}/issues/${issueSlug(latest)}`}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Latest · {issueLabel(latest)}
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={`md:col-span-6 ${reverse ? "md:col-start-1 md:order-1" : "md:col-start-7"}`}
                >
                  {j.heroImagePath && (
                    <div className="relative mb-10">
                      <div
                        aria-hidden
                        className="absolute -inset-x-3 -inset-y-3 -z-10 rounded-sm bg-[var(--surface-muted)]"
                      />
                      <Image
                        src={j.heroImagePath}
                        alt={`Watercolour artwork associated with ${j.title}`}
                        width={760}
                        height={500}
                        className="h-auto w-full rounded-sm shadow-[0_24px_60px_-30px_rgba(26,24,20,0.45)]"
                      />
                    </div>
                  )}

                  <p
                    className="text-[1.0625rem] leading-[1.75] text-foreground/90"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {italicizeArabic(j.about[0])}
                  </p>

                  <div className="mt-10">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="block h-px w-6 bg-[var(--accent)]"
                      />
                      <p
                        className="text-[10px] font-medium uppercase tracking-[0.22em]"
                        style={{
                          fontFamily: "var(--font-sans)",
                          color: "var(--accent)",
                        }}
                      >
                        Scope
                      </p>
                    </div>
                    <ul
                      className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/90"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {j.scope.map((s, i) => (
                        <li key={s} className="flex gap-4">
                          <span
                            aria-hidden
                            className="mt-[0.45rem] block h-px w-3 shrink-0 bg-foreground/35"
                          />
                          <span>
                            <span
                              className="mr-2 text-[10px] tabular-nums uppercase tracking-[0.18em] text-muted-foreground"
                              style={{ fontFamily: "var(--font-sans)" }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {italicizeArabic(s)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
