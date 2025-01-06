import { getAllPosts } from "@/app/__actions/posts/get-all-posts";
import RedirectButton from "@/components/redirect-button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import PostTable from "./__components/PostTable";

export default async function Posts() {
  const posts = await getAllPosts(true);
  return (
    <div>
      <div className="flex w-full gap-4">
        <RedirectButton url="/dashboard/posts/new-post">
          <PlusIcon /> New Post
        </RedirectButton>
      </div>
      <Separator className="my-4" />
      <PostTable data={posts || []} />
    </div>
  );
}
