"use server";

import { db } from "@/lib/db";

export const getImages = async () => {
  try {
    const images = await db.image.findMany();
    return images;
  } catch (err) {
    console.log(err);
    return null;
  }
};
