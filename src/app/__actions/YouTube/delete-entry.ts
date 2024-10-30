"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteYouTubeVideoEntry = async (id: number) => {
  try {
    await db.youtubeVideo.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/", "layout");
    return { ok: true, message: "Video deleted successfully" };
  } catch (err) {
    console.log(err);
    return { ok: false, message: "Something went wrong" };
  }
};
