"use client";
import { Folder, GalleryVerticalEnd, Image, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  details: {
    name: "Blog Template",
    logo: GalleryVerticalEnd,
    description: "Template For NextJs Blog",
  },

  navMain: [
    {
      title: "Media",
      url: "/#",
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher details={data.details} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
