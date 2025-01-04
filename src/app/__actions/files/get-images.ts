"use server";

import db from "@/db";

export const getImages = async () => {
  try {
    const images = await db.query.image.findMany();
    return images;
  } catch (err) {
    console.log(err);
    return null;
  }
};
