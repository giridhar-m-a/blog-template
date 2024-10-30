import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Video } from "lucide-react";
import PopOver from "../../__components/PopOver";
import VideoForm from "./components/VideoForm";

const AddVideoButton = (
  <Button>
    <Video />
    Add Youtube Video
  </Button>
);
export default function Videos() {
  return (
    <>
      <main>
        <div className="flex w-full gap-4">
          <PopOver
            trigger={AddVideoButton}
            title="Create An YouTube Video Recored"
          >
            <VideoForm option="create" />
          </PopOver>
        </div>
        <Separator className="my-4" />
      </main>
    </>
  );
}
