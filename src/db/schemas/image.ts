import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { blogPost } from "./blog-post";

export const image = pgTable("images", {
  id: serial("id").primaryKey().notNull().unique(),
  publicId: text("public_id").notNull().unique(),
  fileName: text("file_name").notNull(),
  url: text("url").notNull().unique(),
  altText: text("alt_text").notNull(),
  height: integer("height").notNull(),
  width: integer("width").notNull(),
});

export const imageRelations = relations(image, ({ many }) => ({
  blogPosts: many(blogPost),
}));
