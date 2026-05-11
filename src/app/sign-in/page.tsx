import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signIn } from "@/lib/auth";

export const metadata = {
  title: "Sign in",
};

export const dynamic = "force-dynamic";

async function signInAction(formData: FormData) {
  "use server";
  const email = (formData.get("email") as string | null)?.trim();
  if (!email) throw new Error("Email is required");
  const callbackUrl = (formData.get("next") as string | null) || "/account";
  await signIn("resend", { email, redirectTo: callbackUrl });
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const session = await auth();
  const sp = await searchParams;
  if (session?.user) {
    redirect(sp.next || "/account");
  }

  return (
    <section className="flex-1 flex items-center">
      <div className="container-prose py-24">
        <div className="mx-auto max-w-md">
          <p
            className="eyebrow text-center mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Sign in to Revival Press
          </p>
          <h1
            className="heading-display text-center text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome back.
          </h1>
          <p
            className="mt-6 text-center text-base text-muted-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Enter your email and we'll send you a one-time link to sign in.
          </p>

          <form
            action={signInAction}
            className="mt-10 space-y-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <input type="hidden" name="next" value={sp.next ?? ""} />
            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-[0.16em] text-muted-foreground"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 block w-full h-12 rounded-lg border border-border-strong bg-surface px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="block w-full h-12 rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Send sign-in link
            </button>
          </form>

          {sp.error && (
            <p
              className="mt-6 rounded-lg border border-red-300/40 bg-red-50/50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-300"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              We couldn't sign you in. Please try again.
            </p>
          )}

          <p
            className="mt-8 text-center text-xs text-muted-foreground"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            No password required. By signing in you agree to our editorial
            policies.
          </p>
          <p
            className="mt-2 text-center text-xs"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
