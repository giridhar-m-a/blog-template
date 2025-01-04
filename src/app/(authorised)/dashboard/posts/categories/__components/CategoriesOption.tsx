"use client";
import PopOver from "@/app/(authorised)/__components/PopOver";
import { deleteCategory } from "@/app/__actions/PostCategories/delete-category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { blogPostCategory } from "@/db/schemas/blog-post-category";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import PostCategoryForm from "./PostCategoryForm";

export default function CategoriesOption({
  data,
}: {
  data: typeof blogPostCategory.$inferSelect;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const { mutate: deleteMutation, isPending: deletePending } = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: deleteCategory,
    onSuccess: (data: { ok: boolean; message: string }) => {
      if (data) {
        if (data.ok) {
          toast({
            title: data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["getAllPostCategories"],
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

  const deleteCategoryById = () => {
    deleteMutation(data.id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2">
          <DropdownMenuItem>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2"
            >
              Edit Category
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={deleteCategoryById}
            className="bg-red-600 hover:bg-red-600 focus:bg-red-600 "
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render PopOver outside of the DropdownMenu */}
      {open && (
        <PopOver
          trigger={null} // No trigger as PopOver is now manually controlled
          title="Edit Post Category"
          open={open}
          setOpen={setOpen}
        >
          <div>
            <PostCategoryForm
              setOpen={setOpen}
              option="update"
              data={data}
              open={open}
            />
          </div>
        </PopOver>
      )}
    </>
  );
}
