import Link from "next/link";

export const metadata = {
  title: "Check your email",
};

export default function VerifyRequestPage() {
  return (
    <section className="flex-1 flex items-center">
      <div className="container-prose py-24 text-center">
        <p
          className="eyebrow mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Almost there
        </p>
        <h1
          className="heading-display text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Check your email.
        </h1>
        <p
          className="mt-6 max-w-xl mx-auto text-base text-muted-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          We've sent a sign-in link to your email address. Open the message and
          click the link to complete signing in. The link is valid for 24
          hours.
        </p>
        <p
          className="mt-10"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Link
            href="/"
            className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}
