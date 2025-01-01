"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import CodeBlock from "@tiptap/extension-code-block";
import Heading, { HeadingOptions } from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapToolBar from "./TipTapToolBar";
import CodeBlockComponent from "./CodeBlockComponent";
import getEditor from "./editor";

const CustomCodeBlock = CodeBlock.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
});

type props = {
  content?: string;
  setContent: (content: string) => void;
  editorContentClass?: string; // in rem
};

const headingConfig: Partial<HeadingOptions> = {
  levels: [1, 2, 3, 4, 5, 6],
  HTMLAttributes: {
    class: "text-2xl font-bold",
  },
};

const TipTapEditor: React.FC<props> = ({
  content,
  setContent,
  editorContentClass,
}) => {
  const onChange = (content: string) => {
    setContent(content);
  };
  const editor = getEditor(true, onChange, content);

  return (
    <>
      <Card>
        <CardHeader>
          <TipTapToolBar editor={editor} />
        </CardHeader>
        <CardContent>
          <ScrollArea className={editorContentClass || "min-h-96"}>
            <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
};

export default TipTapEditor;
