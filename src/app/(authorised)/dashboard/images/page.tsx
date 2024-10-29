import FileGrid from "@/app/__components/gallery/FileGrid";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/SearchInput";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import ImageForm from "./__components/ImageForm";
import PopOver from "../../__components/PopOver";

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
          <ImageForm />
        </PopOver>
        <SearchInput />
      </div>
      <Separator className="my-4" />
      <FileGrid />
      {/* <ImageForm /> */}
    </main>
  );
}
