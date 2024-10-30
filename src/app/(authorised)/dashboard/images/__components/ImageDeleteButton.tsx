"use client";
import { deleteImageById } from "@/app/__actions/files/delete-images";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";

interface ImageDeleteButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  imageId: number;
}

const ImageDeleteButton = ({ imageId, ...props }: ImageDeleteButtonProps) => {
  const { toast } = useToast();

  const deleteImage = async () => {
    const res = await deleteImageById(imageId);

    if (res.ok) {
      toast({
        title: "Image deleted successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.message,
      });
    }
  };

  return (
    <Button size="icon" variant="link" onClick={deleteImage} {...props}>
      <TrashIcon />
    </Button>
  );
};

export default ImageDeleteButton;
