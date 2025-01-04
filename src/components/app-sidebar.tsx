"use client";
import {
  Folder,
  GalleryVerticalEnd,
  Image,
  Layers3,
  ScrollText,
  StickyNote,
  Video,
} from "lucide-react";
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
import { SidebarMenuItemType } from "@/Types/SidebarMenu";
import { AdminMenu } from "./menu-list/admin";
import { ManagerMenu } from "./menu-list/manager";
import { SeoMenu } from "./menu-list/seo";
import { SuperAdminMenu } from "./menu-list/super-admin";

// This is sample data.
const data = {
  details: {
    name: "Blog Template",
    logo: GalleryVerticalEnd,
    description: "Template For NextJs Blog",
  },

  navMain: [
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
          title: "Categories",
          url: "/dashboard/posts/categories",
          icon: Layers3,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = session?.user;
  const [menu, setMenu] = React.useState<SidebarMenuItemType[]>([]);

  React.useEffect(() => {
    if (user) {
      if (user.role === "Super_Admin") {
        setMenu(SuperAdminMenu);
      } else if (user.role === "admin") {
        setMenu(AdminMenu);
      } else if (user.role === "manager") {
        setMenu(ManagerMenu);
      } else if (user.role === "seo") {
        setMenu(SeoMenu);
      }
    }
  }, [user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher details={data.details} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
