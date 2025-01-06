import { getSinglePostById } from "@/app/__actions/posts/get-single-post-by-id";
import PostForm from "../__components/PostsForm";
import { getPostCategories } from "@/app/__actions/PostCategories/get-categories";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function NewPost({ searchParams }: Props) {
  const { id } = await searchParams;
  if (!id) {
    return (
      <main>
        <p>No Post Id</p>
      </main>
    );
  }

  const post = await getSinglePostById(Number(id as string));

  if (!post) {
    return (
      <main>
        <p>No Post Found</p>
      </main>
    );
  }

  const categories = await getPostCategories();

  return (
    <>
      <PostForm option="update" data={post} categories={categories || []} />
    </>
  );
}
