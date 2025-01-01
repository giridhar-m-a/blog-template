import { getSinglePostById } from "../__actions/posts/get-single-post-by-id";
import TipTapRender from "../__components/TitTap/TipTapRender";

export default async function Home() {
  const post = await getSinglePostById(1);
  return (
    <main className="p-24">
      <h1 className="text-4xl font-bold">{post?.title}</h1>
      <TipTapRender content={post?.content || ""} />
    </main>
  );
}
