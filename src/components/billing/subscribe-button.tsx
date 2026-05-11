"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

type Tier = "ltims" | "iilga" | "all";

export function SubscribeButton({
  tier,
  label,
  variant = "primary",
  disabledReason,
}: {
  tier: Tier;
  label: string;
  variant?: "primary" | "secondary";
  disabledReason?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function go() {
    if (disabledReason) return;
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ tier }),
        });
        if (!res.ok) {
          const data = await res
            .json()
            .catch(() => ({ error: "Could not start checkout" }));
          throw new Error(
            typeof data.error === "string"
              ? data.error
              : "Could not start checkout",
          );
        }
        const data = (await res.json()) as { url: string };
        window.location.href = data.url;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  }

  const baseClass =
    "inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-medium transition";

  const variantClass =
    variant === "primary"
      ? "bg-foreground text-background hover:opacity-90"
      : "border border-border-strong text-foreground hover:bg-surface-muted";

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={go}
        disabled={pending || Boolean(disabledReason)}
        className={`${baseClass} ${variantClass} disabled:opacity-50 disabled:cursor-not-allowed`}
        style={{ fontFamily: "var(--font-sans)" }}
        title={disabledReason}
      >
        {pending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ArrowRight className="h-3.5 w-3.5" />
        )}
        {label}
      </button>
      {error && (
        <span
          className="text-xs text-red-600 dark:text-red-300"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
