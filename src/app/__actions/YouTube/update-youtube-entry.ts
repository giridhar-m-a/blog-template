import { YouTubeVideoType } from "@/app/(authorised)/dashboard/videos/__schema/YouTubeVideoSchema";
import { db } from "@/lib/db";

export const updateYouTubeEntry = async (
  id: number,
  data: YouTubeVideoType
) => {
  try {
    const existingVideo = await db.youtubeVideo.findUnique({
      where: {
        url: data.url,
      },
    });
    if (existingVideo) {
      return { ok: false, message: "Video already exists" };
    }

    const youtubeVideo = await db.youtubeVideo.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    if (youtubeVideo) {
      return { ok: true, message: "Video created successfully" };
    }

    return { ok: false, message: "Something went wrong" };
  } catch (err) {
    console.log(err);
    return { ok: false, message: "Something went wrong" };
  }
};
