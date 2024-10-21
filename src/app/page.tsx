"use client";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import TipTapEditor from "./__components/TitTap/TipTapEditor";
import TipTapRender from "./__components/TitTap/TipTapRender";

export default function Home() {
  const [content, setContent] = useState<string>("");
  const setData = (data: string) => {
    console.log("content: ", data);
    setContent(data);
  };
  return (
    <main className="p-24">
      <TipTapEditor setContent={setData} editorContentClass="h-[30rem]" />
      <Separator />
      <div className="py-14">
        <h2 className="py-8 text-center">Data</h2>
        <TipTapRender content={content} />
      </div>
    </main>
  );
}
