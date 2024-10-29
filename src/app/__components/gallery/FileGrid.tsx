import { getImages } from "@/app/__actions/files/get-images";
import Image from "next/image";

const FileGrid = async () => {
  const imsges = await getImages();
  if (!imsges) return null;

  return (
    <>
      <div className="flex items-center flex-wrap  gap-4">
        {imsges.map((image) => (
          <div
            key={image.id}
            className="relative w-full basis-1/4 flex-shrink flex-auto aspect-video overflow-hidden rounded-md p-1"
          >
            <Image
              src={image.url}
              alt={image.altText}
              width={image.width}
              height={image.height}
              className="aspect-video w-full object-cover object-center rounded-md"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FileGrid;
