import { relations } from "drizzle-orm";
import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { user } from "./user";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey().notNull().unique(),
  fileName: text("file_name").notNull(),
  publicId: text("public_id").notNull().unique(),
  url: text("url").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, { fields: [profile.userId], references: [user.id] }),
}));
