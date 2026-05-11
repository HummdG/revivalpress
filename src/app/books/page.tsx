import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { books } from "@/lib/content";

export const metadata = {
  title: "Books",
  description:
    "Books published by Revival Press on Islamic legal scholarship, constitutional questions, and contemporary legal reform.",
};

export default function BooksPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide pt-20 pb-12 md:pt-28 grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p
              className="eyebrow mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Books
            </p>
            <h1
              className="heading-display text-[clamp(2.5rem,6vw,4.5rem)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Books on Islamic law, reform, and the constitutional imagination.
            </h1>
            <p
              className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Our book programme publishes monographs and edited collections at
              the leading edge of Islamic legal scholarship. Each title is
              developed in close collaboration with the editorial committee and
              reviewed by two independent external reviewers before publication.
            </p>
          </div>
          <div className="md:col-span-5 hidden md:block">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/books-stack.jpg"
                alt="A watercolour stack of books"
                width={800}
                height={533}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-wide py-16">
          <ul className="divide-y divide-border border-t border-b border-border">
            {books.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/books/${b.slug}`}
                  className="group grid grid-cols-12 gap-6 py-10 -mx-4 px-4 rounded-lg transition-colors hover:bg-surface-muted"
                >
                  <div className="col-span-12 md:col-span-3">
                    {b.coverImagePath ? (
                      <Image
                        src={b.coverImagePath}
                        alt={`Cover of ${b.title}`}
                        width={360}
                        height={500}
                        className="h-auto w-full max-w-[200px] rounded-sm shadow-sm"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="aspect-[3/4] w-full max-w-[180px] rounded-sm bg-primary text-primary-foreground p-4 flex flex-col justify-between shadow-sm"
                      >
                        <span
                          className="text-[0.65rem] uppercase tracking-[0.16em] opacity-80"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          Revival Press
                        </span>
                        <span
                          className="text-base leading-tight"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {b.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-8 md:col-start-5 flex flex-col">
                    <p
                      className="text-2xl md:text-3xl leading-tight tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {b.title}
                    </p>
                    {b.editors && (
                      <p
                        className="mt-2 text-sm italic text-muted-foreground"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        Edited by {b.editors.join(" and ")}
                      </p>
                    )}
                    <p
                      className="mt-4 line-clamp-3 text-base leading-relaxed text-muted-foreground"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {b.overview}
                    </p>
                    <div
                      className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {b.publishedAt && (
                        <span>
                          {new Date(b.publishedAt).toLocaleDateString("en-GB", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      {b.pages && <span>{b.pages} pp.</span>}
                      {b.pricePounds && (
                        <span>£{b.pricePounds.toFixed(2)}</span>
                      )}
                      {b.series && <span>Series: {b.series}</span>}
                    </div>
                    <p
                      className="mt-6 inline-flex items-center gap-1 text-sm text-foreground transition-colors group-hover:text-primary"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Read more
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
