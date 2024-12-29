import { SidebarMenuItemType } from "@/Types/SidebarMenu";
import {
  ClipboardPlus,
  Folder,
  Image,
  Layers3,
  ScrollText,
  StickyNote,
  Video,
} from "lucide-react";

export const SeoMenu: SidebarMenuItemType[] = [
  {
    title: "Media",
    icon: Folder,
    isActive: false,
    items: [
      {
        title: "Images",
        url: "/dashboard/images",
        icon: Image,
      },
      {
        title: "Videos",
        url: "/dashboard/videos",
        icon: Video,
      },
    ],
  },
  {
    title: "Blog Posts",
    icon: StickyNote,
    isActive: false,
    items: [
      {
        title: "Posts",
        url: "/dashboard/posts",
        icon: ScrollText,
      },
      {
        title: "New Post",
        url: "/dashboard/posts/new-post",
        icon: ClipboardPlus,
      },
      {
        title: "Categories",
        url: "/dashboard/posts/categories",
        icon: Layers3,
      },
    ],
  },
];
