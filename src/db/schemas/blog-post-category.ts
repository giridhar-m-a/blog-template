import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { blogPost, blogsToCategory } from "./blog-post";
import { relations } from "drizzle-orm";

export const blogPostCategory = pgTable("blog_post_categories", {
  id: serial("id").primaryKey().notNull().unique(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
});

export const blogPostCategoryRelations = relations(
  blogPostCategory,
  ({ one, many }) => ({
    blogPosts: many(blogsToCategory),
  })
);
