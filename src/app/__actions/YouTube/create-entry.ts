"use server";
import { YouTubeVideoType } from "@/app/(authorised)/dashboard/videos/__schema/YouTubeVideoSchema";
import { youtubeVideo } from "@/db/schemas/youtube-video";
import db from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createYouTubeEntry = async (data: YouTubeVideoType) => {
  try {
    const existingVideo = await db.query.youtubeVideo.findFirst({
      where: eq(youtubeVideo.url, data.url),
    });
    if (existingVideo) {
      return { ok: false, message: "Video already exists" };
    }

    const [video] = await db.insert(youtubeVideo).values(data).returning();

    if (video) {
      revalidatePath("/", "layout");
      return {
        ok: true,
        message: "Video created successfully",
        data: video,
      };
    }

    return { ok: false, message: "Something went wrong" };
  } catch (err) {
    console.log(err);
    return { ok: false, message: "Something went wrong" };
  }
};
