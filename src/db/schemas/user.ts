import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { profile } from "./profile";
import { blogPost } from "./blog-post";

export const roles = pgEnum("roles", [
  "Super_Admin",
  "admin",
  "manager",
  "seo",
  "user",
]);

export const user = pgTable("users", {
  id: uuid("id").defaultRandom().notNull().primaryKey().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  verifiedAt: timestamp("verified_at"),
  role: roles("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const userRelations = relations(user, ({ one, many }) => ({
  avatar: one(profile, { fields: [user.id], references: [profile.userId] }),
  posts: many(blogPost),
}));
