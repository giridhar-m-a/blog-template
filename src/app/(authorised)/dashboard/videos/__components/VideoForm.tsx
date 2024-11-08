"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { YoutubeVideo } from "@prisma/client";
import { useForm } from "react-hook-form";
import {
  YouTubeVideoSchema,
  type YouTubeVideoType,
} from "../__schema/YouTubeVideoSchema";

import { createYouTubeEntry } from "@/app/__actions/YouTube/create-entry";
import { updateYouTubeEntry } from "@/app/__actions/YouTube/update-youtube-entry";
import YouTubeVideoPlayer from "@/app/__components/Video/YouTubePlayer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const VideoForm: React.FC<{
  videoData?: YoutubeVideo;
  option: "update" | "create" | "noUpload";
  onSubmit?: (video: YoutubeVideo) => void;
  setOpen?: (open: boolean) => void;
  open?: boolean;
}> = ({ videoData, option, onSubmit, setOpen, open }) => {
  const form = useForm<YouTubeVideoType>({
    resolver: zodResolver(YouTubeVideoSchema),
    defaultValues: {
      url: videoData?.url || "",
      title: videoData?.title || "",
    },
  });

  const { toast } = useToast();

  const {
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting },
  } = form;

  const submitForm = async (data: YouTubeVideoType) => {
    let res;

    if (option === "noUpload") {
      if (onSubmit) {
        if (data) {
          onSubmit({ ...data, id: 1 });
        }
      }
      if (setOpen) {
        setOpen(!open);
      }
    }

    if (option === "create") {
      res = await createYouTubeEntry(data);
    } else {
      if (videoData) {
        res = await updateYouTubeEntry(videoData.id, data);
      }
    }

    if (res) {
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.message,
        });
      } else {
        toast({
          title: "Video Record Created Successfully",
          duration: 3000,
        });
        if (onSubmit) {
          if (res.data) {
            onSubmit(res.data);
          }
        }
        if (setOpen) {
          setOpen(!open);
        }
        if (option === "create") {
          reset();
        }
      }
    }
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(submitForm)();
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-8 min-w-96" onSubmit={formSubmit}>
          {getValues("url") !== "" && (
            <div className="aspect-video">
              <YouTubeVideoPlayer
                url={getValues("url")}
                title={videoData?.title || getValues("title") || ""}
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter Title"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="url">Video Url</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="url"
                    placeholder="Enter Youtube Video Url"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default VideoForm;
