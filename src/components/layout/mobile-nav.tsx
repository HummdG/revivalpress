"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

type Item = { href: string; label: string };

export function MobileNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </button>

      {open && (
        <div
          className="md:hidden fixed inset-0 top-16 z-30 bg-background border-t border-border"
          role="dialog"
          aria-modal="true"
        >
          <nav
            className="container-wide py-10 flex flex-col gap-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-xl border-b border-border last:border-0 text-foreground transition-colors hover:text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
