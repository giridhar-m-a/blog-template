"use client";

import PopOver from "@/app/(authorised)/__components/PopOver";
import VideoForm from "@/app/(authorised)/dashboard/videos/__components/VideoForm";
import { youtubeVideo as YoutubeVideo } from "@/db/schemas/youtube-video";
import { ReactNode, useState } from "react";

type props = {
  setVideo: (data: typeof YoutubeVideo.$inferSelect) => void;
  trigger: ReactNode;
};

const VideoSelector: React.FC<props> = ({ trigger, setVideo }) => {
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
      <VideoForm setOpen={setOpen} onSubmit={setVideo} open option="noUpload" />
    </PopOver>
  );
};

export default VideoSelector;
