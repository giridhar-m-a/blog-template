"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CodeBlock from "@tiptap/extension-code-block";
import { HeadingOptions } from "@tiptap/extension-heading";
import { EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockComponent from "./CodeBlockComponent";
import GetEditor from "./editor";
import TipTapToolBar from "./TipTapToolBar";

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
    1: {
      class: "text-2xl font-bold",
    },
    2: {
      class: "text-2xl",
    },
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
  const editor = GetEditor(true, onChange, content);

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
