import { ImageUploadType } from "@/app/(authorised)/dashboard/images/__schema/ImageUploadSchema";
import cloudinary from "./cloudinary";

const imageUploader = async (image: ImageUploadType["image"]) => {
  const arrayBuffer = await image[0].arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer).toString("base64");

  const result = await cloudinary.uploader.upload(
    `data:image/png;base64,${imageBuffer}`,
    {
      invalidate: true,
      folder: `blog-template/images`,
      filename_override: image[0].name,
      use_filename: true,
      unique_filename: true,
    }
  );
  return result;
};

export default imageUploader;
