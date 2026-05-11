import "server-only";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Resend from "next-auth/providers/resend";
import { db } from "./db/client";
import * as schema from "./db/schema";

const RESEND_FROM = process.env.RESEND_FROM ?? "noreply@revivalpress.co.uk";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  session: { strategy: "database" },
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/verify-request",
  },
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: RESEND_FROM,
    }),
  ],
  trustHost: true,
});
