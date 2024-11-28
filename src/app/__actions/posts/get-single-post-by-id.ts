"use server";

import { db } from "@/lib/db";
import { BlogPost, image, PostCategory } from "@prisma/client";

export type PostById = BlogPost & {
  featuredImage: image | null;
  category: PostCategory[];
};

export const getSinglePostById = async (
  id: number
): Promise<PostById | null> => {
  try {
    
    const post = await db.blogPost.findUnique({
      where: {
        id,
      },
      include: {
        featuredImage: true,
        category: true,
      },
    });
    return post;
  } catch (err) {
    console.log(err);
    return null;
  }
};
