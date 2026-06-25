import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";

const nav = [
  { href: "/journals", label: "Journals" },
  { href: "/books", label: "Books" },
  { href: "/editorial-team", label: "Editorial" },
  { href: "/prize", label: "Prize" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Revival Press home"
        >
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={28}
            height={28}
            priority
            className="h-7 w-7"
          />
          <span
            className="text-base tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Revival Press
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/85 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className="hidden md:flex items-center gap-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Link
            href="/account"
            className="text-sm text-foreground/85 transition-colors hover:text-foreground"
          >
            Account
          </Link>
          <Link
            href="/journals"
            className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Browse journals
          </Link>
        </div>

        <MobileNav items={[...nav, { href: "/account", label: "Account" }]} />
      </div>
    </header>
  );
}
