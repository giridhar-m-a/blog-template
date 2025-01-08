import { SidebarMenuItemType } from "@/Types/SidebarMenu";
import { ManagerMenu } from "./manager";
import { User, UserPlus } from "lucide-react";

export const AdminMenu: SidebarMenuItemType[] = [
  ...ManagerMenu,
  {
    title: "Users",
    icon: User,
    items: [
      {
        title: "Users",
        url: "/dashboard/users",
        icon: User,
      },
      {
        title: "Invited Users",
        url: "/dashboard/users/invited-users",
        icon: UserPlus,
      },
    ],
  },
];
