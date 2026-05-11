import "server-only";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const dbPath = process.env.DATABASE_URL ?? "./data/revivalpress.db";

declare global {
  // eslint-disable-next-line no-var
  var __rp_sqlite: Database.Database | undefined;
}

const sqlite =
  global.__rp_sqlite ??
  new Database(dbPath.replace(/^file:/, ""));
if (process.env.NODE_ENV !== "production") global.__rp_sqlite = sqlite;

sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });
export { schema };

// Idempotent: creates tables if not present. Runs once per process.
let migrated = false;
function ensureSchema() {
  if (migrated) return;
  try {
    // Inline the table-creation DDL — avoids depending on drizzle-kit at
    // runtime and works equally well at first boot.
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS user (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT,
        email TEXT UNIQUE,
        emailVerified INTEGER,
        image TEXT,
        stripeCustomerId TEXT
      );
      CREATE TABLE IF NOT EXISTS account (
        userId TEXT NOT NULL,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        providerAccountId TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        PRIMARY KEY (provider, providerAccountId),
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS session (
        sessionToken TEXT PRIMARY KEY NOT NULL,
        userId TEXT NOT NULL,
        expires INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS verificationToken (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL,
        expires INTEGER NOT NULL,
        PRIMARY KEY (identifier, token)
      );
      CREATE TABLE IF NOT EXISTS subscription (
        id TEXT PRIMARY KEY NOT NULL,
        userId TEXT NOT NULL,
        stripeCustomerId TEXT NOT NULL,
        stripeSubscriptionId TEXT NOT NULL UNIQUE,
        stripePriceId TEXT NOT NULL,
        status TEXT NOT NULL,
        tier TEXT NOT NULL,
        currentPeriodEnd INTEGER,
        cancelAtPeriodEnd INTEGER NOT NULL DEFAULT 0,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      );
    `);
    migrated = true;
  } catch (err) {
    console.warn("[db] schema setup failed:", (err as Error).message);
  }
}
ensureSchema();
