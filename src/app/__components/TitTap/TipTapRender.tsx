"use client";
import { EditorContent } from "@tiptap/react";
import GetEditor from "./editor";

type props = {
  content: string;
};

const TipTapRender: React.FC<props> = ({ content }) => {
  return (
    <EditorContent
      style={{ whiteSpace: "pre-line" }}
      editor={GetEditor(false, () => {}, content)}
    />
  );
};

export default TipTapRender;
