import Image from "next/image";
import { editorialTeam } from "@/content/editorial-team-featured";

export const metadata = {
  title: "Editorial Team",
  description:
    "Meet the editorial teams of Revival Press — Editor in Chief, Deputy Editors, Associate Editors, Assistant Editors, and Editorial Boards across LTIMS and IILGA.",
};

export default function EditorialTeamPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-wide pt-20 pb-12 md:pt-28 grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p
              className="eyebrow mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Editorial team
            </p>
            <h1
              className="heading-display text-[clamp(2.5rem,6vw,4.5rem)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our world-renowned editorial team.
            </h1>
            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Our editors lead the peer review and editorial direction of
              Revival Press, drawing on a wide range of scholarly expertise and
              perspectives.
            </p>
          </div>
          <div className="md:col-span-5 hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/community-watercolor.png"
                alt="Watercolour of scholars in conversation near a mosque"
                width={760}
                height={1024}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide py-20">
          <ul className="max-w-3xl divide-y divide-border border-t border-border">
            {editorialTeam.map((e) => (
              <li
                key={e.name}
                className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
              >
                <div>
                  <p
                    className="text-xl leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {e.name}
                  </p>
                  <p
                    className="mt-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {e.role}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground sm:text-right">
                  {e.affiliation}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
