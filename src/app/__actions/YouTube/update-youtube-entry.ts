"use server";
import { YouTubeVideoType } from "@/app/(authorised)/dashboard/videos/__schema/YouTubeVideoSchema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
    if (!existingVideo) {
      return { ok: false, message: "Video donot exist" };
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
      revalidatePath("/", "layout");
      return {
        ok: true,
        message: "Video created successfully",
        data: youtubeVideo,
      };
    }

    return { ok: false, message: "Something went wrong" };
  } catch (err) {
    console.log(err);
    return { ok: false, message: "Something went wrong" };
  }
};
