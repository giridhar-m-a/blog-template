"use server";
import { db } from "@/lib/db";
import { ShortPost } from "@/Types/ShortPost";

export const getAllPosts = async (
  admin: boolean
): Promise<ShortPost[] | null> => {
  try {
    const posts = await db.blogPost.findMany({
      where: {
        isPublished: !admin,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        isPublished: true,
        featuredImage: {
          select: {
            url: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return posts;
  } catch (err) {
    console.log(err);
    return null;
  }
};
