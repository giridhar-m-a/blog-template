import FileGrid from "@/app/__components/gallery/FileGrid";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import PopOver from "../../__components/PopOver";
import ImageForm from "./__components/ImageForm";

const ImageUploadTrigger = (
  <Button>
    <PlusIcon />
    Add Image
  </Button>
);

export default async function Images() {
  return (
    <main>
      <div className="flex w-full gap-4">
        <PopOver trigger={ImageUploadTrigger} title="Upload Image">
          <ImageForm option="create" />
        </PopOver>
      </div>
      <Separator className="my-4" />
      <FileGrid />
    </main>
  );
}
