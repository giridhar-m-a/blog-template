"use client";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import PopOver from "@/app/(authorised)/__components/PopOver";
import VideoForm from "./VideoForm";
import { useState } from "react";

const AddVideoButton = (
  <Button>
    <Video />
    Add Youtube Video
  </Button>
);

export default function AddYouTubeVideo() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex w-full gap-4">
      <PopOver
        trigger={AddVideoButton}
        title="Create An YouTube Video Recored"
        open={open}
        setOpen={setOpen}
      >
        <VideoForm option="create" open setOpen={setOpen} />
      </PopOver>
    </div>
  );
}
