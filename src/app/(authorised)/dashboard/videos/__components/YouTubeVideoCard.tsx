"use client";
import PopOver from "@/app/(authorised)/__components/PopOver";
import YouTubeVideoPlayer from "@/app/__components/Video/YouTubePlayer";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import VideoForm from "./VideoForm";
import { YoutubeVideo } from "@prisma/client";
import DeleteVideoButton from "./DeleteVideoButton";
import { useState } from "react";

const TriggerButton = (
  <Button
    variant="link"
    className={"absolute top-1 right-1 text-blue-400 hover:text-blue-600"}
  >
    <Edit />
  </Button>
);

const YouTubeVideoCard: React.FC<{ video: YoutubeVideo }> = ({ video }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full basis-1/4 flex-shrink flex-auto aspect-video overflow-hidden">
      <div className="w-full h-full z-10">
        <PopOver
          trigger={TriggerButton}
          title={`Edit ${video.title}`}
          open={open}
          setOpen={setOpen}
        >
          <VideoForm option="update" videoData={video} open setOpen={setOpen} />
        </PopOver>
        <DeleteVideoButton videoId={video.id} />
        <YouTubeVideoPlayer url={video.url} title={video.title} />
      </div>
      <div className="bg-black opacity-75 absolute bottom-0 left-0 w-full p-2 text-white">
        <h2>{video.title}</h2>
      </div>
    </div>
  );
};

export default YouTubeVideoCard;
