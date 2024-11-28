import { NewPostCategory } from "@/app/__actions/PostCategories/create-new-category";
import { updatePostCategory } from "@/app/__actions/PostCategories/update-category";
import { verifyCategorySlug } from "@/app/__actions/PostCategories/verifySlug";
import {
  PostCategoryFormType,
  PostCategorySchema,
} from "@/app/__schema/post/PostCategorySchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import getSlug from "@/lib/getSlug";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCategory } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, CircleX } from "lucide-react";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  data?: PostCategory;
  option: "update" | "create";
  setOpen: (open: boolean) => void;
  open: boolean;
};

const PostCategoryForm: React.FC<Props> = ({ data, option, setOpen, open }) => {
  const [isSlugAvailable, setIsSlugAvailable] = useState<
    "available" | "notAvailable" | null
  >(null);

  const queryClient = useQueryClient();

  const form = useForm<PostCategoryFormType>({
    resolver: zodResolver(PostCategorySchema),
    defaultValues: {
      name: data?.name || "",
      slug: data?.slug || "",
      description: data?.description || "",
    },
  });

  const { mutate: createCategory, isPending: createPending } = useMutation({
    mutationKey: ["NewPostCategory"],
    mutationFn: NewPostCategory,
    onSuccess: (data: {
      ok: boolean;
      message: string;
      data?: PostCategory;
    }) => {
      if (data) {
        if (data.ok) {
          toast({
            title: data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["getAllPostCategories"],
          });
          setOpen(!open);
        } else {
          toast({
            variant: "destructive",
            title: data.message,
          });
        }
      }
    },
  });

  const { mutate: updateCategory, isPending: updatePending } = useMutation({
    mutationKey: ["updatePostCategory"],
    mutationFn: updatePostCategory,
    onSuccess: (data: {
      ok: boolean;
      message: string;
      data?: PostCategory;
    }) => {
      if (data) {
        if (data.ok) {
          toast({
            title: data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["getAllPostCategories"],
          });
          setOpen(!open);
        } else {
          toast({
            variant: "destructive",
            title: data.message,
          });
        }
      }
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSlugChange = async (title: string) => {
    const slug = getSlug(title);

    form.setValue("slug", slug);
    if (slug.length <= 0) {
      setIsSlugAvailable("notAvailable");
      form.setError("slug", { message: "Slug is required" });
      return null;
    }
    const isVerified = await verifyCategorySlug(slug);
    if (isVerified.ok) {
      setIsSlugAvailable("available");
      form.clearErrors("slug");
    } else {
      setIsSlugAvailable("notAvailable");
      form.setError("slug", { message: isVerified.message });
    }
  };

  const onTitleChange = async (title: string) => {
    const slug = getSlug(title);

    form.setValue("name", title);

    form.setValue("slug", slug);

    if (slug.length <= 0) {
      setIsSlugAvailable(null);
    }

    const isVerified = await verifyCategorySlug(slug);

    if (isVerified.ok) {
      setIsSlugAvailable("available");
      form.clearErrors("slug");
    } else {
      setIsSlugAvailable("notAvailable");
      form.setError("slug", { message: isVerified.message });
    }
  };

  const onSubmit = async (formData: PostCategoryFormType) => {
    if (option === "create") {
      createCategory(formData);
    } else {
      if (data) updateCategory({ formData: formData, id: data?.id });
    }
  };

  return (
    <div className="w-96">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    onChange={(e) => onTitleChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="slug"
                  className="font-semi-bold text-lg flex gap-2 items-center"
                >
                  Slug
                  {isSlugAvailable &&
                    (isSlugAvailable === "available" ? (
                      <CircleCheck
                        className={`text-green-500 text-sm h-4 w-4 ${
                          isSlugAvailable ? "" : "hidden"
                        }`}
                      />
                    ) : isSlugAvailable === "notAvailable" ? (
                      <CircleX
                        className="text-red-500 text-sm h-4 w-4"
                        size={16}
                      />
                    ) : (
                      ""
                    ))}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="slug"
                    placeholder="slug"
                    {...field}
                    disabled={isSubmitting}
                    onChange={(e) => onSlugChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="description"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={
              isSubmitting || isSlugAvailable === "notAvailable" ? true : false
            }
          >
            submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostCategoryForm;
