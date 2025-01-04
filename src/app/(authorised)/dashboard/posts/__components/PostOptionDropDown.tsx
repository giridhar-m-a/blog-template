import { deletePostById } from "@/app/__actions/posts/deletePostById";
import { publishUnPublishPost } from "@/app/__actions/posts/publish-unPublishPost";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { ShortPost } from "@/Types/ShortPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostOptionDropDown({ data }: { data: ShortPost }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: publish, isPending } = useMutation({
    mutationKey: ["Publish/UnpublishPost"],
    mutationFn: publishUnPublishPost,
    onSuccess: (data: { ok: boolean; message: string }) => {
      if (data) {
        if (data.ok) {
          toast({
            title: data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["getAllShortPosts"],
          });
        } else {
          toast({
            variant: "destructive",
            title: data.message,
          });
        }
      }
    },
  });

  const { mutate: deleteMutation, isPending: deletePending } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: deletePostById,
    onSuccess: (data: { ok: boolean; message: string }) => {
      if (data) {
        if (data.ok) {
          toast({
            title: data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["getAllShortPosts"],
          });
        } else {
          toast({
            variant: "destructive",
            title: data.message,
          });
        }
      }
    },
  });

  const editPost = () => {
    router.push(`/dashboard/posts/edit?id=${data.id}`);
  };

  const publishOrUnPublishPost = () => {
    publish(data.id);
  };

  const deletePost = () => {
    deleteMutation(data.id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2">
          <DropdownMenuItem
            className={`${data.isPublished ? "bg-red-500" : "bg-green-500"}`}
            onClick={publishOrUnPublishPost}
            disabled={isPending}
          >
            {data.isPublished ? "Unpublish" : "Publish"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={editPost}>edit</DropdownMenuItem>
          <DropdownMenuItem
            onClick={deletePost}
            disabled={deletePending}
            className="bg-red-600 hover:bg-red-600 focus:bg-red-600 "
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
