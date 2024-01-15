import { pgEnum, serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const authMethod = pgEnum("auth_method", [
  "traditional",
  "google",
  "facebook",
  "x",
]);

export const users = pgTable("Users", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  profilePicture: text("profilePicture"),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  authMethod: authMethod("authMethod").default("traditional").notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
