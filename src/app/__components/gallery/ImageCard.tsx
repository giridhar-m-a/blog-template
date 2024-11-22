"use client";
import PopOver from "@/app/(authorised)/__components/PopOver";
import ImageDeleteButton from "@/app/(authorised)/dashboard/images/__components/ImageDeleteButton";
import ImageForm from "@/app/(authorised)/dashboard/images/__components/ImageForm";
import { Button } from "@/components/ui/button";
import { image } from "@prisma/client";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const TriggerButton = (
  <Button
    variant="link"
    className={"absolute top-1 right-1 text-blue-400 hover:text-blue-600"}
  >
    <Edit />
  </Button>
);

const ImageCard = ({ image }: { image: image }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full basis-1/4 flex-shrink flex-auto aspect-video overflow-hidden rounded-md p-1">
      <ImageDeleteButton
        imageId={image.id}
        className="absolute top-1 right-12 text-red-400 hover:text-red-600"
      />
      <PopOver
        trigger={TriggerButton}
        title={`Edit ${image.fileName}`}
        open={open}
        setOpen={setOpen}
      >
        <ImageForm option="update" imageData={image} open setClose={setOpen} />
      </PopOver>
      <Image
        src={image.url}
        alt={image.altText}
        width={image.width}
        height={image.height}
        className="aspect-video w-full object-cover object-center rounded-md"
      />
    </div>
  );
};

export default ImageCard;
