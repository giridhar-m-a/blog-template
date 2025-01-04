"use server";

import db from "@/db";
import { youtubeVideo } from "@/db/schemas/youtube-video";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteYouTubeVideoEntry = async (id: number) => {
  try {
    await db.delete(youtubeVideo).where(eq(youtubeVideo.id, id));
    revalidatePath("/", "layout");
    return { ok: true, message: "Video deleted successfully" };
  } catch (err) {
    console.log(err);
    return { ok: false, message: "Something went wrong" };
  }
};
