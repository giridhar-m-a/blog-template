"use server";
import { db } from "@/lib/db";

const getAllPosts = async (admin: boolean) => {
  const posts = await db.blogPost.findMany({
    where: {
      isPublished: admin,
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
};
