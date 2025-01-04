import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { blogPostCategory } from "./blog-post-category";
import { image } from "./image";
import { user } from "./user";

export const blogPost = pgTable("blog_posts", {
  id: serial("id").primaryKey().notNull().unique(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  description: text("description").notNull(),
  keywords: text("keywords").notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  imageId: integer("image_id").references(() => image.id, {
    onDelete: "set null",
  }),
});

export const blogPostRelations = relations(blogPost, ({ one, many }) => ({
  user: one(user, { fields: [blogPost.userId], references: [user.id] }),
  image: one(image, { fields: [blogPost.imageId], references: [image.id] }),
  categories: many(blogsToCategory),
}));

export const blogsToCategory = pgTable(
  "blogs_to_categories",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => blogPost.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => blogPostCategory.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.categoryId] }),
  })
);

export const blogsToCategoryRelations = relations(
  blogsToCategory,
  ({ one }) => ({
    post: one(blogPost, {
      fields: [blogsToCategory.postId],
      references: [blogPost.id],
    }),
    category: one(blogPostCategory, {
      fields: [blogsToCategory.categoryId],
      references: [blogPostCategory.id],
    }),
  })
);
