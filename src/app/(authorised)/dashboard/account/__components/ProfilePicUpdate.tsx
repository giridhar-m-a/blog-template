"use client";

import PopOver from "@/app/(authorised)/__components/PopOver";
import { Button } from "@/components/ui/button";
import user from "@/public/user.png";
import { Pencil } from "lucide-react";
import Image from "next/image";
import ProfileImageForm from "./ProfileImageForm";
import { useState } from "react";

type props = {
  profilePic?: string | null;
};

const trigger = (
  <Button
    variant={"link"}
    size={"icon"}
    className={
      "absolute top-32 right-4 text-blue-400 hover:text-blue-600 p-4 rounded-full hover:bg-white/20 bg-black/50"
    }
  >
    <Pencil />
  </Button>
);

const ProfilePicUpdate: React.FC<props> = ({ profilePic }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-fit rounded-full">
      <Image
        src={profilePic || user}
        alt="profile picture"
        width={200}
        height={200}
        className="rounded-full aspect-square"
      />
      <PopOver
        trigger={trigger}
        title="Update Profile Picture"
        open={open}
        setOpen={setOpen}
      >
        <ProfileImageForm url={profilePic || user.src} setOpen={setOpen} />
      </PopOver>
    </div>
  );
};

export default ProfilePicUpdate;
