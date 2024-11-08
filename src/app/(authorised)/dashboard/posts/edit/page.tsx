import { getSinglePostById } from "@/app/__actions/posts/get-single-post-by-id";
import PostForm from "../__components/PostsForm";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function NewPost({ searchParams }: Props) {
  const { id } = await searchParams;

  console.log("id in page : ", id);
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

  return (
    <main>
      <PostForm option="create" data={post} />
    </main>
  );
}
