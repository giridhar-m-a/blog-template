import RedirectButton from "@/components/redirect-button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";

export default function Posts() {
  return (
    <div>
      <div className="flex w-full gap-4">
        <RedirectButton url="/dashboard/posts/new-post">
          <PlusIcon /> New Post
        </RedirectButton>
      </div>
      <Separator className="my-4" />
    </div>
  );
}
