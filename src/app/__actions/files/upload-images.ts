"use server";

import { ImageUploadSchema } from "@/app/(authorised)/dashboard/images/__schema/ImageUploadSchema";
import imageUploader from "../utils/imageUploader";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const uploadImage = async (data: FormData) => {
  try {
    const formData = {
      image: data.getAll("image"),
      altText: data.getAll("altText")[0],
    };
    const parsedData = ImageUploadSchema.safeParse(formData);

    // console.log("image :", data.getAll("image"),"\n alt:", data.getAll("altText"));

    if (!parsedData.success) {
      console.log(parsedData.error);
      throw new Error("Validation failed");
    }

    const { image, altText } = parsedData.data;

    if (!image[0]) {
      throw new Error("No image selected");
    }

    const imageData = await imageUploader(image);

    if (!imageData) {
      throw new Error("Image upload failed");
    }

    if (!imageData?.url) {
      throw new Error(imageData?.message);
    }
    const { secure_url: url, public_id, width, height } = imageData;

    const newImage = await db.image.create({
      data: {
        url,
        publicId: public_id,
        altText,
        width,
        height,
        fileName: image[0].name,
      },
    });

    revalidatePath("/", "layout");
    return {
      ok: true,
      message: "Image uploaded successfully",
      image: newImage,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        ok: false,
        message: error.message !== "" ? error.message : "Something went wrong",
      };
    }

    return { ok: false, message: "Something went wrong" };
  }
};
