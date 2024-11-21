"use server";
import { YouTubeVideoType } from "@/app/(authorised)/dashboard/videos/__schema/YouTubeVideoSchema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createYouTubeEntry = async (data: YouTubeVideoType) => {
  try {
    const existingVideo = await db.youtubeVideo.findUnique({
      where: {
        url: data.url,
      },
    });
    if (existingVideo) {
      return { ok: false, message: "Video already exists" };
    }

    const youtubeVideo = await db.youtubeVideo.create({
      data,
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
