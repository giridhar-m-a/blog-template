import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Video } from "lucide-react";
import PopOver from "../../__components/PopOver";
import VideoForm from "./__components/VideoForm";
import { getYouTuBeVideos } from "@/app/__actions/YouTube/get-youtube-video";
import YouTubeVideoCard from "./__components/YouTubeVideoCard";

const AddVideoButton = (
  <Button>
    <Video />
    Add Youtube Video
  </Button>
);
export default async function Videos() {
  const videos = await getYouTuBeVideos();
  return (
    <>
      <main>
        <div className="flex w-full gap-4">
          <PopOver
            trigger={AddVideoButton}
            title="Create An YouTube Video Recored"
          >
            <VideoForm option="create" />
          </PopOver>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center flex-wrap  gap-4">
          {videos?.map((video) => (
            <YouTubeVideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </>
  );
}
