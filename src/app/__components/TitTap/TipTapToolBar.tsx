"use client";

import ImageSelector from "@/app/(authorised)/dashboard/images/__components/image-selector/ImageSelector";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { image as ImageType } from "@/db/schemas/image";
import { youtubeVideo as YoutubeVideo } from "@/db/schemas/youtube-video";
import { SelectItem } from "@radix-ui/react-select";
import { Editor, JSONContent } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  TvMinimalPlay,
  Underline,
} from "lucide-react";
import { useCallback } from "react";
import VideoSelector from "./VideoSelector";

type Props = {
  editor: Editor | null;
  content?: JSONContent;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TipTapToolBar: React.FC<Props> = ({ editor, content }) => {
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
  if (!editor) {
    return null;
  }

  const setHeading = (value: "1" | "2" | "3" | "4" | "5" | "6" | "p") => {
    if (value === "p") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6 })
        .run();
    }
  };

  const addYoutubeVideo = (data: typeof YoutubeVideo.$inferSelect) => {
    if (data) {
      editor.commands.setYoutubeVideo({
        src: data.url,
      });
    }
  };
  const addImage = (image: typeof ImageType.$inferSelect) => {
    editor.commands.setImage({
      src: image.url,
    });
  };

  return (
    <div className="flex flex-wrap gap-2 justify-start items-center w-full">
      <>
        <Select
          onValueChange={setHeading}
          defaultValue={"p"}
          value={
            editor.isActive("heading", { level: 1 })
              ? "1"
              : editor.isActive("heading", { level: 2 })
              ? "2"
              : editor.isActive("heading", { level: 3 })
              ? "3"
              : editor.isActive("heading", { level: 4 })
              ? "4"
              : editor.isActive("heading", { level: 5 })
              ? "5"
              : editor.isActive("heading", { level: 6 })
              ? "6"
              : "p"
          }
        >
          <SelectTrigger className="w-fit">
            <SelectValue>
              {editor.isActive("heading", { level: 1 })
                ? "Heading 1"
                : editor.isActive("heading", { level: 2 })
                ? "Heading 2"
                : editor.isActive("heading", { level: 3 })
                ? "Heading 3"
                : editor.isActive("heading", { level: 4 })
                ? "Heading 4"
                : editor.isActive("heading", { level: 5 })
                ? "Heading 5"
                : editor.isActive("heading", { level: 6 })
                ? "Heading 6"
                : "Paragraph"}
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
        pressed={editor.isActive("customCodeBlock")}
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

      <VideoSelector
        trigger={
          <Toggle pressed={editor.isActive("youtube")} variant={"outline"}>
            <TvMinimalPlay size={14} />
          </Toggle>
        }
        setVideo={addYoutubeVideo}
      />

      <ImageSelector
        trigger={
          <Toggle pressed={editor.isActive("image")} variant={"outline"}>
            <ImageIcon size={14} />
          </Toggle>
        }
        setImage={addImage}
      />
    </div>
  );
};

export default TipTapToolBar;
