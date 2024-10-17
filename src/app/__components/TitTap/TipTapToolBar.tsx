/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { SelectItem } from "@radix-ui/react-select";
import { Editor, JSONContent } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Underline,
  Italic,
  List,
  ListOrdered,
  Image,
  Code,
  Link,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  AlignCenter,
  AlignRight,
  AlignLeft,
  AlignJustify,
} from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
  editor: Editor | null;
  content: JSONContent;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TitTapToolBar: React.FC<Props> = ({ editor, content }) => {
  const [headingLevel, setHeadingLevel] = useState<string>("p");
  useEffect(() => {
    const updateHeadingLevel = () => {
      if (!editor) return;

      if (editor.isActive("paragraph")) {
        setHeadingLevel("p");
      } else {
        for (let i = 1; i <= 6; i++) {
          if (editor.isActive("heading", { level: i })) {
            setHeadingLevel(i.toString());
            return;
          }
        }
      }
    };

    editor?.on("selectionUpdate", updateHeadingLevel);
    editor?.on("update", updateHeadingLevel);

    return () => {
      editor?.off("selectionUpdate", updateHeadingLevel);
      editor?.off("update", updateHeadingLevel);
    };
  }, [editor]);
  if (!editor) return null;

  console.log("headingLevel : ", headingLevel);
  const setHeading = (value: string) => {
    console.log("heading value : ", value);
    if (value === "p") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({
          level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6,
        })
        .run();
    }
  };

  console.log("headingLevel : ", headingLevel);

  return (
    <div className="flex flex-wrap gap-2 justify-start items-center w-full">
      <>
        <Select onValueChange={setHeading} defaultValue={`${headingLevel}`}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Heading" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="p">Paragraph</SelectItem>
              <SelectItem value="1">Heading 1</SelectItem>
              <SelectItem value="2">Heading 2</SelectItem>
              <SelectItem value="3">Heading 3</SelectItem>
              <SelectItem value="4">Heading 4</SelectItem>
              <SelectItem value="5">Heading 5</SelectItem>
              <SelectItem value="6">Heading 6</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </>

      <Toggle
        pressed={editor.isActive("bold") ? true : false}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        variant={"outline"}
      >
        <Bold className={``} />
      </Toggle>
    </div>
  );
};

export default TitTapToolBar;
