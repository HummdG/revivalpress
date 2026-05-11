"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

export function ManageBillingButton() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function go() {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/stripe/portal", { method: "POST" });
        if (!res.ok) {
          const data = await res
            .json()
            .catch(() => ({ error: "Could not open billing portal" }));
          throw new Error(
            typeof data.error === "string"
              ? data.error
              : "Could not open billing portal",
          );
        }
        const data = (await res.json()) as { url: string };
        window.location.href = data.url;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={go}
        disabled={pending}
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-border-strong px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted disabled:opacity-50"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        Manage billing
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
