"use client";
import { demoData } from "./__components/TitTap/demo";
import TipTapEditor from "./__components/TitTap/TipTapEditor";
import { JSONContent } from "@tiptap/react";

export default function Home() {
  const setData = (data: JSONContent) => {
    console.log("content: ", data);
  };
  return (
    <main className="p-24">
      <TipTapEditor setContent={setData} content={demoData} />
    </main>
  );
}
