import "server-only";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./client";

let migrated = false;

/**
 * Run pending migrations once per process. Safe to call on every request —
 * it short-circuits after the first run. Migrations live in `./drizzle`.
 */
export function ensureMigrated() {
  if (migrated) return;
  try {
    migrate(db, { migrationsFolder: "./drizzle" });
    migrated = true;
  } catch (err) {
    // Migrations are advisory in dev; surface but don't crash the request
    console.warn("[db] migrate skipped:", (err as Error).message);
  }
}
