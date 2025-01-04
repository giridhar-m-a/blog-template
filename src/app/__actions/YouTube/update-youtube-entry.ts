"use server";
import { YouTubeVideoType } from "@/app/(authorised)/dashboard/videos/__schema/YouTubeVideoSchema";
import { youtubeVideo } from "@/db/schemas/youtube-video";
import db from "@/db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const updateYouTubeEntry = async (
  id: number,
  data: YouTubeVideoType
) => {
  try {
    const existingVideo = await db.query.youtubeVideo.findFirst({
      where: eq(youtubeVideo.id, id),
    });
    if (!existingVideo) {
      return { ok: false, message: "Video donot exist" };
    }

    const [video] = await db
      .update(youtubeVideo)
      .set(data)
      .where(eq(youtubeVideo.id, id))
      .returning();

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
