"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { SelectItem } from "@radix-ui/react-select";
import { Editor, JSONContent } from "@tiptap/react";
import {
  TvMinimalPlay,
  Bold,
  Strikethrough,
  Underline,
  Italic,
  List,
  ListOrdered,
  Code,
  Link,
  Quote,
  Undo,
  Redo,
  AlignCenter,
  AlignRight,
  AlignLeft,
  AlignJustify,
  ImageIcon,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

type Props = {
  editor: Editor | null;
  content?: JSONContent;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TipTapToolBar: React.FC<Props> = ({ editor, content }) => {
  console.log(content);
  const [headingLevel, setHeadingLevel] = useState<string>("p");
  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);
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

  const setHeading = (value: string) => {
    if (value === "p") {
      editor?.chain().focus().setParagraph().run();
    } else {
      editor
        ?.chain()
        .focus()
        .toggleHeading({ level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6 })
        .run();
    }
    setHeadingLevel(value);
  };

  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };
  const addImage = () => {
    const url = prompt("Enter Image URL");
    if (url) {
      editor.commands.setImage({
        src: url,
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-start items-center w-full">
      <>
        <Select onValueChange={setHeading} value={`${headingLevel}`}>
          <SelectTrigger className="w-fit">
            <SelectValue>
              {headingLevel === "p" ? "Paragraph" : `Heading ${headingLevel}`}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-fit">
            <SelectGroup className="px-2 py-2">
              <SelectItem value="p">Paragraph</SelectItem>
              <SelectSeparator />
              <SelectItem value="1">Heading 1</SelectItem>
              <SelectSeparator />
              <SelectItem value="2">Heading 2</SelectItem>
              <SelectSeparator />
              <SelectItem value="3">Heading 3</SelectItem>
              <SelectSeparator />
              <SelectItem value="4">Heading 4</SelectItem>
              <SelectSeparator />
              <SelectItem value="5">Heading 5</SelectItem>
              <SelectSeparator />
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
        <Bold size={14} />
      </Toggle>

      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        variant={"outline"}
      >
        <Italic size={14} />
      </Toggle>

      <Toggle
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        variant={"outline"}
      >
        <Strikethrough size={14} />
      </Toggle>

      <Toggle
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        variant={"outline"}
      >
        <Underline size={14} />
      </Toggle>

      <Toggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        variant={"outline"}
      >
        <List size={14} />
      </Toggle>

      <Toggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        variant={"outline"}
      >
        <ListOrdered size={14} />
      </Toggle>

      <Toggle
        pressed={editor.isActive("link")}
        onPressedChange={
          editor.isActive("link")
            ? () => editor.chain().focus().unsetLink().run()
            : setLink
        }
        variant={"outline"}
      >
        <Link size={14} />
      </Toggle>
      <Toggle
        variant={"outline"}
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={14} />
      </Toggle>
      <Toggle
        variant={"outline"}
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code size={14} />
      </Toggle>
      <Toggle
        variant={"outline"}
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
      >
        <AlignLeft size={14} />
      </Toggle>
      <Toggle
        variant={"outline"}
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
      >
        <AlignCenter size={14} />
      </Toggle>
      <Toggle
        variant={"outline"}
        pressed={editor.isActive({ textAlign: "justify" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
      >
        <AlignJustify size={14} />
      </Toggle>
      <Toggle
        variant={"outline"}
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
      >
        <AlignRight size={14} />
      </Toggle>

      <Toggle
        pressed={editor.isActive("youtube")}
        onPressedChange={addYoutubeVideo}
        variant={"outline"}
      >
        <TvMinimalPlay size={14} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("image")}
        onPressedChange={addImage}
        variant={"outline"}
      >
        <ImageIcon size={14} />
      </Toggle>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        variant={"outline"}
        size={"icon"}
      >
        <Redo size={14} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        variant={"outline"}
        size={"icon"}
      >
        <Undo size={14} />
      </Button>
    </div>
  );
};

export default TipTapToolBar;
