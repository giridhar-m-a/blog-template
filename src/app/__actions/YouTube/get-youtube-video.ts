"user server";

import { db } from "@/lib/db";

export const getYouTuBeVideos = async () => {
  try {
    return await db.youtubeVideo.findMany();
  } catch (err) {
    console.log(err);
  }
};
