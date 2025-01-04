"use server";

import db from "@/db";

export const getYouTuBeVideos = async () => {
  try {
    return await db.query.youtubeVideo.findMany();
  } catch (err) {
    console.log(err);
  }
};
