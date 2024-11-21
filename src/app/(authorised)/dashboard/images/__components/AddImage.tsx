"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import PopOver from "@/app/(authorised)/__components/PopOver";
import ImageForm from "./ImageForm";
import { useState } from "react";

const ImageUploadTrigger = (
  <Button>
    <PlusIcon />
    Add Image
  </Button>
);

export default function AddImage() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex w-full gap-4">
      <PopOver
        trigger={ImageUploadTrigger}
        title="Upload Image"
        open={open}
        setOpen={setOpen}
      >
        <ImageForm option="create" open setClose={setOpen} />
      </PopOver>
    </div>
  );
}
