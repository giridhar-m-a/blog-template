"use client";

import { deleteYouTubeVideoEntry } from "@/app/__actions/YouTube/delete-entry";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";

const DeleteVideoButton: React.FC<{ videoId: number }> = ({ videoId }) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    const res = await deleteYouTubeVideoEntry(videoId);
    if (res.ok) {
      toast({ title: "Video deleted successfully" });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.message,
      });
    }
  };
  return (
    <Button
      variant="link"
      className={"absolute top-1 right-8 text-red-400 hover:text-red-600"}
      size="icon"
      onClick={handleDelete}
    >
      <TrashIcon />
    </Button>
  );
};

export default DeleteVideoButton;
