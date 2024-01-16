import { sql } from "drizzle-orm";
import { pgEnum, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const authMethod = pgEnum("auth_method", [
  "traditional",
  "google",
  "facebook",
  "x",
]);

export const users = pgTable("Users", {
  id: serial("id").primaryKey(),
  uuid: text("uuid").notNull().unique(),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  profilePicture: text("profilePicture"),
  email: varchar("email", { length: 255 }).notNull().unique(),
  authMethod: authMethod("authMethod").default("traditional").notNull(),
  createdAt: timestamp("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
