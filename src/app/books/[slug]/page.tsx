import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { books, getBook } from "@/lib/content";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return {};
  return {
    title: book.title,
    description: book.overview.slice(0, 160),
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <section className="border-b border-border">
      <div className="container-wide pt-20 pb-24 md:pt-28">
        <Link
          href="/books"
          className="eyebrow inline-flex items-center gap-1.5 hover:text-foreground"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <ArrowLeft className="h-3 w-3" />
          Books
        </Link>

        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            {book.coverImagePath ? (
              <Image
                src={book.coverImagePath}
                alt={`Cover of ${book.title}`}
                width={520}
                height={720}
                priority
                className="h-auto w-full max-w-[360px] rounded-sm shadow-md"
              />
            ) : (
              <div
                aria-hidden
                className="aspect-[3/4] w-full max-w-[320px] rounded-sm bg-primary text-primary-foreground p-6 flex flex-col justify-between shadow-md"
              >
                <span
                  className="text-xs uppercase tracking-[0.16em] opacity-80"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Revival Press
                </span>
                <span
                  className="text-2xl leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {book.title}
                </span>
              </div>
            )}

            <dl
              className="mt-8 space-y-3 text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {book.editors && (
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 uppercase text-xs tracking-[0.16em] text-muted-foreground">
                    Editors
                  </dt>
                  <dd>{book.editors.join(", ")}</dd>
                </div>
              )}
              {book.authors && (
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 uppercase text-xs tracking-[0.16em] text-muted-foreground">
                    Authors
                  </dt>
                  <dd>{book.authors.join(", ")}</dd>
                </div>
              )}
              {book.isbnEbook && (
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 uppercase text-xs tracking-[0.16em] text-muted-foreground">
                    ISBN (eBook)
                  </dt>
                  <dd className="tabular-nums">{book.isbnEbook}</dd>
                </div>
              )}
              {book.isbnPrint && (
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 uppercase text-xs tracking-[0.16em] text-muted-foreground">
                    ISBN (Print)
                  </dt>
                  <dd className="tabular-nums">{book.isbnPrint}</dd>
                </div>
              )}
              {book.pricePounds !== undefined && (
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 uppercase text-xs tracking-[0.16em] text-muted-foreground">
                    Price
                  </dt>
                  <dd>£{book.pricePounds.toFixed(2)}</dd>
                </div>
              )}
              {book.pages && (
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 uppercase text-xs tracking-[0.16em] text-muted-foreground">
                    Pages
                  </dt>
                  <dd>{book.pages}</dd>
                </div>
              )}
              {book.publishedAt && (
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 uppercase text-xs tracking-[0.16em] text-muted-foreground">
                    Published
                  </dt>
                  <dd>
                    {new Date(book.publishedAt).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              )}
              {book.series && (
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 uppercase text-xs tracking-[0.16em] text-muted-foreground">
                    Series
                  </dt>
                  <dd>{book.series}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p
              className="eyebrow"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {book.status === "forthcoming" ? "Forthcoming" : "Available"}
            </p>
            <h1
              className="heading-display mt-4 text-[clamp(2.25rem,5vw,3.75rem)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {book.title}
            </h1>
            {book.subtitle && (
              <p
                className="mt-3 text-xl text-muted-foreground italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {book.subtitle}
              </p>
            )}
            {book.editors && (
              <p
                className="mt-4 text-base italic text-muted-foreground"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Edited by {book.editors.join(" and ")}
              </p>
            )}

            <div className="prose-rp mt-10">
              <p>{book.overview}</p>
            </div>

            <div
              className="mt-10 flex flex-wrap gap-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <a
                href="mailto:a.a.ghouri@outlook.com?subject=Book%20enquiry"
                className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Order or enquire
              </a>
              <Link
                href="/books"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
              >
                Back to books
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
