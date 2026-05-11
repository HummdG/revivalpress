import "server-only";
import { auth } from "./auth";
import { userHasAccessTo } from "./subscriptions";
import { tierForJournalSlug } from "./stripe";

export type AccessInput = {
  journalSlug: string;
  accessLevel: "open" | "subscriber";
};

export async function canAccessArticle(
  input: AccessInput,
): Promise<boolean> {
  if (input.accessLevel === "open") return true;

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return false;

  const tier = tierForJournalSlug(input.journalSlug);
  if (!tier) return false;

  return userHasAccessTo(userId, tier);
}
