import FileGrid from "@/app/__components/gallery/FileGrid";

import { Separator } from "@/components/ui/separator";
import AddImage from "./__components/AddImage";


export default async function Images() {
  return (
    <main>
      <AddImage/>
      <Separator className="my-4" />
      <FileGrid />
    </main>
  );
}
