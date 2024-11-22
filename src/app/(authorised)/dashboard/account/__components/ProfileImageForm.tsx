"use client";

import { updateProfilePic } from "@/app/__actions/account/update-profile-pic";
import {
  ProfileImageSchema,
  type ProfileImageType,
} from "@/app/__schema/account/profilepicSchema";
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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const ProfileImageForm: React.FC<{
  url: string;
  setOpen: (data: boolean) => void;
}> = ({ url, setOpen }) => {
  const form = useForm<ProfileImageType>({
    resolver: zodResolver(ProfileImageSchema),
    defaultValues: {
      image: [],
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

  const submitForm = async (data: ProfileImageType) => {
    const formData = new FormData();
    if (data.image && data.image.length === 1) {
      const file = data.image[0];
      formData.append("image", file);
    }

    const res = await updateProfilePic(formData);

    if (res) {
      if (!res.ok) {
        setOpen(false);
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
    }
  };

  const handleImageChange = (file: File) => {
    imagePreviewUrl.current = URL.createObjectURL(file);
    console.log(imagePreviewUrl.current);
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
                  className="flex justify-center items-center bg-secondary"
                >
                  {imagePreviewUrl.current ? (
                    <Image
                      src={imagePreviewUrl.current}
                      alt={field.value[0]?.name}
                      width={field.value[0]?.width || 400}
                      height={field.value[0]?.height || 100}
                      className="object-fill object-center"
                    />
                  ) : url ? (
                    <Image
                      src={url}
                      alt={"profile picture"}
                      width={200}
                      height={200}
                      className=" object-fill object-center"
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
                    disabled={isSubmitting}
                    className="hidden"
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

export default ProfileImageForm;
