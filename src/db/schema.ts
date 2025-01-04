import { user, userRelations, roles } from "@/db/schemas/user";
import {
  blogPost,
  blogPostRelations,
  blogsToCategory,
  blogsToCategoryRelations,
} from "@/db/schemas/blog-post";
import {
  blogPostCategory,
  blogPostCategoryRelations,
} from "@/db/schemas/blog-post-category";
import { token, tokenPurpose } from "@/db/schemas/token";
import { profile, profileRelations } from "@/db/schemas/profile";
import { image, imageRelations } from "@/db/schemas/image";
import { youtubeVideo } from "@/db/schemas/youtube-video";

export const schema = {
  user,
  roles,
  blogPost,
  blogPostCategory,
  blogsToCategory,
  token,
  tokenPurpose,
  profile,
  image,
  youtubeVideo,
  userRelations,
  blogPostRelations,
  blogPostCategoryRelations,
  blogsToCategoryRelations,
  profileRelations,
  imageRelations,
};
