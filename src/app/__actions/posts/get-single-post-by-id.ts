"use server";

import db from "@/db";
import { blogPost } from "@/db/schemas/blog-post";
import { image } from "@/db/schemas/image";
import { blogPostCategory } from "@/db/schemas/blog-post-category";
import { eq } from "drizzle-orm";

export type PostById = typeof blogPost.$inferSelect & {
  featuredImage: typeof image.$inferSelect | null;
  category: (typeof blogPostCategory.$inferSelect)[];
};

export const getSinglePostById = async (
  id: number
): Promise<PostById | null> => {
  try {
    const post = await db.query.blogPost.findFirst({
      where: eq(blogPost.id, id),
      with: {
        image: true,
        categories: {
          with: {
            category: true,
          },
        },
      },
    });

    if (!post) {
      return null;
    }

    return {
      ...post,
      featuredImage: post?.image || null,
      category:
        post?.categories.map((category) => ({ ...category.category })) || [],
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
