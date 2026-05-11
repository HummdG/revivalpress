import Image from "next/image";
import { authorInfo } from "@/content/pages/author-info";

export const metadata = {
  title: "Author Information",
  description:
    "How to prepare and submit a manuscript to Revival Press: preparing your manuscript, peer review, exclusive submission, and response times.",
};

export default function AuthorInfoPage() {
  return (
    <article className="border-b border-border">
      <section className="border-b border-border">
        <div className="container-wide pt-20 pb-12 md:pt-28 grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p
              className="eyebrow mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Submissions
            </p>
            <h1
              className="heading-display text-[clamp(2.5rem,6vw,4.5rem)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Author information.
            </h1>
            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {authorInfo.intro}
            </p>
            <div
              className="mt-10"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <a
                href="mailto:a.a.ghouri@outlook.com?subject=Manuscript%20submission"
                className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Email submissions to a.a.ghouri@outlook.com
              </a>
            </div>
          </div>
          <div className="md:col-span-5 hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/mosque-pink-flowers.jpeg"
                alt="Watercolour of a mosque dome with cascading flowers"
                width={760}
                height={1500}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container-prose py-16">
        <div className="prose-rp">
          {authorInfo.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
