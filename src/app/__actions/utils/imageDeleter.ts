import cloudinary from "./cloudinary";

export const deleteImageByPublicId = async (publicId: string) => {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    const { result } = res;

    if (result === "not found") {
      return { ok: false, message: "Image not found" };
    }
    return res;
  } catch (err) {
    return { ok: false, message: err };
  }
};
