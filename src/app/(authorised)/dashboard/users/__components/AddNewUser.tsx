"use client";
import PopOver from "@/app/(authorised)/__components/PopOver";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import InviteUserForm from "./InviteUserForm";

const Trigger = (
  <Button>
    <PlusIcon />
    Invite New User
  </Button>
);

const AddNewUser = () => {
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
          <InviteUserForm setOpen={setOpen} open={open} />
        </div>
      </PopOver>
    </div>
  );
};

export default AddNewUser;
