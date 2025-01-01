"use client";
import { EditorContent } from "@tiptap/react";
import getEditor from "./editor";

type props = {
  content: string;
};

const TipTapRender: React.FC<props> = ({ content }) => {
  return (
    <EditorContent
      style={{ whiteSpace: "pre-line" }}
      editor={getEditor(false, () => {}, content)}
    />
  );
};

export default TipTapRender;
