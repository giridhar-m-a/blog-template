"use server";
import db from "@/db";
import { ShortPost } from "@/Types/ShortPost";

export const getAllPosts = async (
  admin: boolean
): Promise<ShortPost[] | null> => {
  try {
    const posts = await db.query.blogPost.findMany({
      columns: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        description: true,
        updatedAt: true,
        isPublished: true,
      },
      orderBy: (blogPost, { desc }) => desc(blogPost.createdAt),
      with: {
        image: {
          columns: {
            url: true,
          },
        },
        user: {
          columns: {
            name: true,
          },
        },
        categories: {
          with: {
            category: {
              columns: {
                title: true,
              },
            },
          },
        },
      },
    });
    const res: ShortPost[] = posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      slug: post.slug,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      isPublished: post.isPublished,
      featuredImage: post.image
        ? {
            url: post.image.url,
          }
        : null,
      category: post.categories.map((category) => ({
        name: category.category.title,
      })),
      author: {
        name: post?.user?.name,
      },
    }));

    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
