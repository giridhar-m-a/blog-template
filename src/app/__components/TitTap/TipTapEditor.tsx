"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import TitTapToolBar from "./TipTapToolBar";
import { TextAlign } from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";

const TipTapEditor = () => {
  const [content, setContent] = useState<JSONContent>({
    type: "doc",
    content: [],
  });
  const onChange = (content: JSONContent) => {
    setContent(content);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: "text-2xl font-bold",
        },
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "min-h-screen p-8 max-h-screen overflow-none border-accent",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  return (
    <>
      <Card>
        <CardHeader>
          <TitTapToolBar editor={editor} content={content} />
        </CardHeader>
        <CardContent>
          <EditorContent editor={editor} />
        </CardContent>
      </Card>
    </>
  );
};

export default TipTapEditor;
