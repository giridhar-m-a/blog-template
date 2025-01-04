"use client";
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
import { ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockComponent from "./CodeBlockComponent";

const CustomCodeBlock = CodeBlock.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
});

const headingConfig: Partial<HeadingOptions> = {
  levels: [1, 2, 3, 4, 5, 6],
  HTMLAttributes: {
    class: "text-2xl font-bold",
  },
};
export default function GetEditor(
  isEditable: boolean,
  onChange: (content: string) => void,
  content?: string
) {
  return useEditor({
    extensions: [
      Bold.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
        },
      }),
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "min-h-[14px]",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure(headingConfig),
      ListItem.configure({
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-4",
        },
      }),
      Underline,
      Link.configure({
        HTMLAttributes: {
          class: "underline text-accent",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "italic mt-4 mb-4 pl-4 border-l-2 border-accent",
        },
      }),
      CustomCodeBlock.configure({
        HTMLAttributes: {
          class: "rounded bg-neutral-800 p-6 border-2 text-left",
        },
        defaultLanguage: "javascript",
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        controls: false,
        nocookie: true,
        allowFullscreen: true,
        autoplay: true,
        inline: true,
      }),
      Image,
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: "min-h-screen p-8 max-w-screen overflow-none border-accent",
      },
    },
    editable: isEditable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
}
