"use client";

import { createPost } from "@/app/__actions/posts/create-post";
import { PostById } from "@/app/__actions/posts/get-single-post-by-id";
import { verifySlug } from "@/app/__actions/posts/verify-slug";
import TipTapEditor from "@/app/__components/TitTap/TipTapEditor";
import { PostSchema, type PostFormType } from "@/app/__schema/post/PostSchema";
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
import { useToast } from "@/hooks/use-toast";
import getSlug from "@/lib/getSlug";
import { zodResolver } from "@hookform/resolvers/zod";
import { image } from "@prisma/client";
import { CircleCheck, CircleX, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ImageSelector from "../../images/__components/image-selector/ImageSelector";

type Props = {
  data?: PostById;
  option: "update" | "create";
};

const PostForm: React.FC<Props> = ({ data, option }) => {
  const categoryIds: number[] = [];
  const [isSlugAvailable, setIsSlugAvailable] = useState<
    "available" | "notAvailable" | null
  >(null);

  const [featureImage, setFeatureImage] = useState<image | null>(null);

  const { toast } = useToast();

  if (data) {
    data.category.map((item) => {
      categoryIds.push(item.id);
    });
  }

  const form = useForm<PostFormType>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: data?.title || "",
      content: data?.content || "",
      keywords: data?.keywords || "",
      description: data?.description || "",
      featureImage: data?.featuredImage?.id || undefined,
      slug: data?.slug || "",
      category: categoryIds || [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: PostFormType) => {
    let res;

    if (option === "create") {
      res = await createPost(data);
      if (res.ok) {
        toast({ title: "Post created successfully", duration: 3000 });
      } else {
        toast({ title: res.message, duration: 3000, variant: "destructive" });
      }
    }
  };

  const onSlugChange = async (title: string) => {
    const slug = getSlug(title);

    form.setValue("slug", slug);
    if (slug.length <= 0) {
      setIsSlugAvailable("notAvailable");
      form.setError("slug", { message: "Slug is required" });
      return null;
    }
    const isVerified = await verifySlug(slug);
    if (isVerified.ok) {
      setIsSlugAvailable("available");
      form.clearErrors("slug");
    } else {
      setIsSlugAvailable("notAvailable");
      form.setError("slug", { message: isVerified.message });
    }
  };

  const onImageSelect = (ImageData: image) => {
    form.setValue("featureImage", ImageData.id);
    setFeatureImage(ImageData);
  };

  const onTitleChange = async (title: string) => {
    const slug = getSlug(title);

    form.setValue("title", title);

    form.setValue("slug", slug);

    if (slug.length <= 0) {
      setIsSlugAvailable(null);
    }

    const isVerified = await verifySlug(slug);

    if (isVerified.ok) {
      setIsSlugAvailable("available");
      form.clearErrors("slug");
    } else {
      setIsSlugAvailable("notAvailable");
      form.setError("slug", { message: isVerified.message });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="title"
                className="font-semi-bold text-lg flex gap-2 items-center"
              >
                Title
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="Title"
                  placeholder="Title"
                  {...field}
                  disabled={isSubmitting}
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
              <FormLabel
                htmlFor="description"
                className="font-semi-bold text-lg flex gap-2 items-center"
              >
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  className="h-24"
                  id="description"
                  placeholder="Description"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="content"
                className="font-semi-bold text-lg flex gap-2 items-center"
              >
                Content
              </FormLabel>
              <FormControl>
                <TipTapEditor
                  setContent={field.onChange}
                  content={field.value}
                  editorContentClass="h-[34rem]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="featureImage"
            render={() => (
              <FormItem>
                <FormLabel
                  htmlFor="featureImage"
                  className="font-semi-bold text-lg flex gap-2 items-center"
                >
                  Feature Image
                </FormLabel>
                <ImageSelector
                  trigger={
                    <div className="w-full aspect-video bg-secondary rounded-md items-center justify-center flex">
                      {!featureImage?.url && !data?.featuredImage?.url ? (
                        <ImageIcon className="w-full aspect-video" size={200} />
                      ) : (
                        ""
                      )}

                      {featureImage?.url ? (
                        <Image
                          src={featureImage?.url}
                          alt={featureImage?.altText}
                          width={featureImage?.width}
                          height={featureImage.height}
                          className="w-full aspect-video rounded-md"
                        />
                      ) : data?.featuredImage?.url ? (
                        <Image
                          src={data?.featuredImage?.url}
                          alt=""
                          width={data?.featuredImage?.width}
                          height={data?.featuredImage?.height}
                          className="w-full aspect-video rounded-md"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  }
                  setImage={onImageSelect}
                />
                {/* <FormControl>
                  <Input
                    type="file"
                    className="hidden"
                    id="featureImage"
                    placeholder="Description"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="keywords"
                    className="font-semi-bold text-lg flex gap-2 items-center"
                  >
                    Keywords
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-24"
                      id="keywords"
                      placeholder="keywords"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
