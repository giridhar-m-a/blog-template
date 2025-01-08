import { pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { roles } from "./user";

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
  name: text("name"),
  role: roles("role"),
  purpose: tokenPurpose("purpose").default("verification").notNull(),
});
