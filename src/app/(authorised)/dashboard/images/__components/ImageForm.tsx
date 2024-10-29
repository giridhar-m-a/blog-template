"use client";

import { image } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImageUploadSchema,
  type ImageUploadType,
} from "../__schema/ImageUploadSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImagePlus as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import { uploadImage } from "@/app/__actions/files/upload-images";
import { useToast } from "@/hooks/use-toast";

const ImageForm: React.FC<{ imageData?: image }> = ({ imageData }) => {
  const form = useForm<ImageUploadType>({
    resolver: zodResolver(ImageUploadSchema),
    defaultValues: {
      altText: imageData?.altText || "",
      image: imageData ? [imageData.url] : [],
    },
  });

  const { toast } = useToast();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;
  const imagePreviewUrl = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl.current) {
        URL.revokeObjectURL(imagePreviewUrl.current);
      }
    };
  }, []);

  const submitForm = async (data: ImageUploadType) => {
    const formData = new FormData();
    if (data.image && data.image.length === 1) {
      const file = data.image[0];
      formData.append("image", file);
    }
    formData.append("altText", data.altText);

    const res = await uploadImage(formData);
    if (!res.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.message,
      });
    } else {
      toast({
        title: "Image uploaded successfully",
        duration: 3000,
      });
      reset();
      imagePreviewUrl.current = null;
    }
  };

  const handleImageChange = (file: File) => {
    imagePreviewUrl.current = URL.createObjectURL(file);
    form.setValue("image", [file]);
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleSubmit(submitForm)}>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="image"
                  className="aspect-video flex justify-center items-center w-full bg-secondary"
                >
                  {imageData?.url ? (
                    <Image
                      src={imageData.url}
                      alt={imageData.altText}
                      width={imageData.width}
                      height={imageData.height}
                    />
                  ) : imagePreviewUrl.current ? (
                    <Image
                      src={imagePreviewUrl.current}
                      alt={field.value[0]?.name}
                      width={field.value[0]?.width || 400}
                      height={field.value[0]?.height || 100}
                      className="aspect-video object-fill object-center"
                    />
                  ) : (
                    <ImageIcon size={100} />
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) =>
                      handleImageChange(e.target.files?.[0] || new File([], ""))
                    }
                    disabled={isSubmitting || imageData?.url ? true : false}
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="altText"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="altText">Alt Text</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="altText"
                    placeholder="Enter Alt Text"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ImageForm;
