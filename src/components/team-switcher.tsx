"use client";

import * as React from "react";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function TeamSwitcher({
  details,
}: {
  details: {
    name: string;
    logo: React.ElementType;
    description: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex gap-6">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <details.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{details.name}</span>
            <span className="truncate text-xs">{details.description}</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
