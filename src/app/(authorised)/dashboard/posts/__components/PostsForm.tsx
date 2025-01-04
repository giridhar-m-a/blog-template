"use client";

import { createPost } from "@/app/__actions/posts/create-post";
import { PostById } from "@/app/__actions/posts/get-single-post-by-id";
import { publishUnPublishPost } from "@/app/__actions/posts/publish-unPublishPost";
import { updatePost } from "@/app/__actions/posts/update-post";
import { verifySlug } from "@/app/__actions/posts/verify-slug";
import TipTapEditor from "@/app/__components/TitTap/TipTapEditor";
import { PostSchema, type PostFormType } from "@/app/__schema/post/PostSchema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { blogPost } from "@/db/schemas/blog-post";
import { blogPostCategory } from "@/db/schemas/blog-post-category";
import { image } from "@/db/schemas/image";
import { useToast } from "@/hooks/use-toast";
import getSlug from "@/lib/getSlug";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, CircleX, ImageIcon, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ImageSelector from "../../images/__components/image-selector/ImageSelector";

type Props = {
  data?: PostById;
  categories: (typeof blogPostCategory.$inferSelect)[];
  option: "update" | "create";
};

const PostForm: React.FC<Props> = ({ data, option, categories }) => {
  const queryClient = useQueryClient();
  const [published, setPublished] = useState(data?.isPublished || false);
  const [postId, setPostId] = useState<number | null>(data?.id || null);
  const [currentOption, setCurrentOption] = useState(option);
  const [open, setOpen] = useState(false);

  const categoryIds: number[] = [];
  const [isSlugAvailable, setIsSlugAvailable] = useState<
    "available" | "notAvailable" | null
  >(null);

  const { mutate, isPending } = useMutation({
    mutationKey: ["Publish/UnpublishPost"],
    mutationFn: publishUnPublishPost,
    onSuccess: (data: { ok: boolean; message: string }) => {
      if (data) {
        if (data.ok) {
          setPublished(!published);
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

  const publishOrUnPublishPost = () => {
    if (postId) {
      mutate(postId);
    } else {
      toast({
        variant: "destructive",
        title: "You need to create a post first",
      });
    }
  };

  const [featureImage, setFeatureImage] = useState<
    typeof image.$inferSelect | null
  >(null);

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

  const onSubmit = async (postData: PostFormType) => {
    let res: {
      ok: boolean;
      message: string;
      data?: typeof blogPost.$inferSelect;
    } | null = null;

    if (currentOption === "create") {
      console.log("create");
      res = await createPost(postData);
      if (res?.ok) {
        if (res.data) {
          setPostId(res.data?.id);
        }
        setCurrentOption("update");
        toast({ title: "Post Updated successfully", duration: 3000 });
      } else {
        toast({
          title: res?.message,
          duration: 3000,
          variant: "destructive",
        });
      }
    } else {
      console.log("update");
      if (data?.id || postId) {
        if (data?.id) {
          res = await updatePost(data?.id, postData);
        } else if (postId) {
          res = await updatePost(postId, postData);
        }

        if (res?.ok) {
          if (res.data) {
            setPostId(res.data?.id);
          }
          toast({ title: "Post Updated successfully", duration: 3000 });
        } else {
          toast({
            title: res?.message,
            duration: 3000,
            variant: "destructive",
          });
        }
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

  const onImageSelect = (ImageData: typeof image.$inferSelect) => {
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
    <>
      <Form {...form}>
        <form className="space-y-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <div className="flex justify-between">
              <h1>
                {currentOption === "create" ? "Create Post" : "Update Post"}
              </h1>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Save />
                </Button>
              </SheetTrigger>
            </div>
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
            <SheetContent className="space-y-4">
              <SheetHeader>
                <SheetTitle>
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      onClick={handleSubmit(onSubmit)}
                    >
                      save
                    </Button>

                    {postId && (
                      <Button
                        className={`w-full ${
                          published ? "bg-red-500" : "bg-green-500"
                        }`}
                        disabled={isPending}
                        onClick={(e) => {
                          e.preventDefault();
                          publishOrUnPublishPost();
                        }}
                      >
                        {!published ? "Publish" : "Unpublish"}
                      </Button>
                    )}
                  </div>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[34rem]">
                <div className="space-y-4 pr-6 pl-1">
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
                              {!featureImage?.url &&
                              !data?.featuredImage?.url ? (
                                <ImageIcon
                                  className="w-full aspect-video"
                                  size={200}
                                />
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
                  <div className="space-y-4">
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
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            htmlFor="Category"
                            className="font-semi-bold text-lg flex gap-2 items-center"
                          >
                            Category
                          </FormLabel>
                          <FormControl>
                            <div className="flex gap-2 flex-wrap">
                              {categories.map((category) => (
                                <div
                                  key={category.id}
                                  className="flex items-center gap-2"
                                >
                                  <Checkbox
                                    id={`${category.id}`}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...field.value,
                                          category.id,
                                        ]);
                                      } else {
                                        field.onChange(
                                          field.value.filter(
                                            (c) => c !== category.id
                                          )
                                        );
                                      }
                                    }}
                                    checked={field.value.some(
                                      (c) => c === category.id
                                    )}
                                  />
                                  <Label htmlFor={`${category.id}`}>
                                    {category.title}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </form>
      </Form>
    </>
  );
};

export default PostForm;
