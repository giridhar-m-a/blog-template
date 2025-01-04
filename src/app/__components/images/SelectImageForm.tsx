import { getImages } from "@/app/__actions/files/get-images";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { image } from "@/db/schemas/image";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

type props = {
  setClose?: (value: boolean) => void;
  setImage?: (data: typeof image.$inferSelect) => void;
  open?: boolean;
};

export default function SelectImageForm({ setClose, setImage, open }: props) {
  const [selectedImage, setSelectedImage] =
    useState<typeof image.$inferSelect>();

  const { data: images, isLoading } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      return await getImages();
    },
  });

  const form = useForm<typeof image.$inferSelect>({
    defaultValues: selectedImage,
  });

  const { handleSubmit, reset } = form;

  const onSelectImage = (image: string) => {
    setSelectedImage(JSON.parse(image));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (setImage && selectedImage) {
      setImage(selectedImage);
      if (setClose) {
        setClose(false);
      }
      reset();
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={(e) => onSubmit(e)}>
        <ScrollArea className="h-72 w-full">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={onSelectImage}
                    className="grid grid-cols-5"
                  >
                    {images?.map((image) => (
                      <Card
                        key={image.id}
                        className={`flex items-center gap-4 p-2 ${
                          selectedImage?.id === image.id
                            ? "bg-secondary-foreground"
                            : ""
                        }`}
                      >
                        <RadioGroupItem
                          value={JSON.stringify(image)}
                          className="hidden"
                          id={`${image.id}`}
                        />
                        <label htmlFor={`${image.id}`}>
                          <Image
                            src={image.url}
                            alt={image.altText}
                            width={image.width}
                            height={image.height}
                            className="aspect-video w-full object-cover object-center rounded-md"
                          />
                        </label>
                      </Card>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </ScrollArea>
        <Button type="submit">Select</Button>
      </form>
    </Form>
  );
}
