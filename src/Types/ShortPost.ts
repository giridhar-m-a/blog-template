/**
 * ShortPost
 * this is the type of post without the content along with feature image url and a list of categories
 * @type {ShortPost}
 *
 */

export type ShortPost = {
  id: number;
  title: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  featuredImage: {
    url: string;
  } | null;
  category: {
    name: string;
  }[];
  author: {
    name: string;
  };
};
