import { getImages } from "@/app/__actions/files/get-images";
import ImageCard from "./ImageCard";

const FileGrid = async () => {
  const imsges = await getImages();
  if (!imsges) return null;

  return (
    <>
      <div className="flex items-center flex-wrap  gap-4">
        {imsges.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </>
  );
};

export default FileGrid;
