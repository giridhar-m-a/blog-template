import { getImages } from "@/app/__actions/files/get-images";
import Image from "next/image";

const FileGrid = async () => {
  const imsges = await getImages();
  if (!imsges) return null;

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        {imsges.map((image) => (
          <div
            key={image.id}
            className="relative aspect-video overflow-hidden rounded-md p-4"
          >
            <Image
              src={image.url}
              alt={image.altText}
              width={image.width}
              height={image.height}
              className="aspect-video w-96 object-cover object-center rounded-md"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FileGrid;
