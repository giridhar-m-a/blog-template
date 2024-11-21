"use client";

import PopOver from "@/app/(authorised)/__components/PopOver";
import { ReactNode, useState } from "react";
import ImageForm from "../ImageForm";
import { image } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectImageForm from "@/app/__components/images/SelectImageForm";

type props = {
  setImage?: (image: image) => void;
  trigger: ReactNode;
};

const ImageSelector: React.FC<props> = ({ trigger, setImage}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <PopOver
      trigger={trigger}
      title="Select Image"
      description="Select an image Image"
      open={open}
      setOpen={setOpen}
      className="w-fit h-8/12"
    >
      <Tabs defaultValue="account">
        <TabsList className="flex justify-around w-full">
          <TabsTrigger value="select">Select</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>
        <TabsContent value="select">
          <div className="w-[70rem]">
            <SelectImageForm setImage={setImage} open setClose={setOpen} />
          </div>
        </TabsContent>
        <TabsContent value="upload" className="flex items-center">
          <ImageForm
            option="create"
            setImage={setImage}
            setClose={setOpen}
            open
          />
        </TabsContent>
      </Tabs>
    </PopOver>
  );
};

export default ImageSelector;
