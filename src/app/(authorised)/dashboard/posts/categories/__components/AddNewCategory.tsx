"use client";
import PopOver from "@/app/(authorised)/__components/PopOver";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import PostCategoryForm from "./PostCategoryForm";

const Trigger = (
  <Button>
    <PlusIcon />
    Add New Category
  </Button>
);

const AddNewPostCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <PopOver
        trigger={Trigger}
        title="Add New Post Category"
        open={open}
        setOpen={setOpen}
      >
        <div>
          <PostCategoryForm setOpen={setOpen} option="create" open={open} />
        </div>
      </PopOver>
    </div>
  );
};

export default AddNewPostCategory;
