import { getVideoId } from "@/lib/getVideoId";

const YouTubeVideoPlayer = ({ url, title }: { url: string; title: string }) => {
  const id = getVideoId(url);
  return (
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
      title={title}
    ></iframe>
  );
};

export default YouTubeVideoPlayer;
