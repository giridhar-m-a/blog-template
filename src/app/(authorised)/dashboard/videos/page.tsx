import { getYouTuBeVideos } from "@/app/__actions/YouTube/get-youtube-video";
import { Separator } from "@radix-ui/react-separator";
import AddYouTubeVideo from "./__components/AddYouTubeVideo";
import YouTubeVideoCard from "./__components/YouTubeVideoCard";

export default async function Videos() {
  const videos = await getYouTuBeVideos();
  return (
    <>
      <main>
        <AddYouTubeVideo />
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
