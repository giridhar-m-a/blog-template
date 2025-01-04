import { pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const tokenPurpose = pgEnum("token_purpose", [
  "verification",
  "forgetPassword",
  "newUser",
  "review",
]);

export const token = pgTable("tokens", {
  id: serial("id").primaryKey().notNull().unique(),
  token: text("token").notNull().unique(),
  email: text("email").notNull().unique(),
  purpose: tokenPurpose("purpose").default("verification").notNull(),
});
