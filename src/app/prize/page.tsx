import Link from "next/link";
import Image from "next/image";
import { prizeMeta, prizeWinners } from "@/lib/content";

export const metadata = {
  title: "Imran Ahsan Khan Nyazee Prize",
  description: prizeMeta.description[0],
};

export default function PrizePage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide pt-20 pb-16 md:pt-28 grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p
              className="eyebrow mb-6"
              style={{ color: "var(--accent)", fontFamily: "var(--font-sans)" }}
            >
              Annual prize · awarded by {prizeMeta.awardedBy}
            </p>
            <h1
              className="heading-display text-[clamp(2.5rem,6vw,4.5rem)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Imran Ahsan Khan Nyazee Prize.
            </h1>
            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Awarded annually for the most outstanding article published in
              Legal Transformation in Muslim Societies during the previous
              volume year.
            </p>
          </div>
          <div className="md:col-span-5 hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/mosque-dome-square.jpeg"
                alt="Watercolour of a mosque dome and minaret in soft light"
                width={760}
                height={760}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-prose py-16 prose-rp">
          {prizeMeta.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section>
        <div className="container-wide py-16">
          <p
            className="eyebrow mb-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Recipients
          </p>
          <h2
            className="text-3xl md:text-4xl tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Past winners
          </h2>

          <ol className="mt-12 space-y-10">
            {prizeWinners.map((w) => (
              <li
                key={w.year}
                className="grid gap-6 md:grid-cols-12 border-b border-border pb-10 last:border-0"
              >
                <div className="md:col-span-2">
                  <span
                    className="block text-5xl tabular-nums"
                    style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
                  >
                    {w.year}
                  </span>
                </div>
                <div className="md:col-span-9 md:col-start-4">
                  <h3
                    className="text-xl md:text-2xl leading-snug tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {w.articleTitle}
                  </h3>
                  <p
                    className="mt-2 text-base italic text-muted-foreground"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {w.authors.join(" and ")}
                  </p>
                  <p
                    className="mt-4 text-sm text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Citation: {w.citation}
                  </p>
                  {w.articleSlug && (
                    <Link
                      href={`/journals/legal-transformation-in-muslim-societies/issues/v2-i1/articles/${w.articleSlug}`}
                      className="mt-4 inline-block text-sm text-foreground underline underline-offset-4 hover:text-primary"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Read the article →
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
