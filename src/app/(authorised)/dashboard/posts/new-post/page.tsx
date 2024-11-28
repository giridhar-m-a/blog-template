import { getPostCategories } from "@/app/__actions/PostCategories/get-categories";
import PostForm from "../__components/PostsForm";

export default async function NewPost() {
  const categories = await getPostCategories();
  return (
    <>
      <PostForm option="create" categories={categories || []} />
    </>
  );
}
