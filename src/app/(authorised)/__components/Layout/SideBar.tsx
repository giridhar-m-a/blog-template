"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Image, PanelRightClose } from "lucide-react";
import Link from "next/link";

const SideBar = () => {
  return (
    <>
      <div className="p-2 border-r-2 border-secondary w-24 fixed min-h-screen flex flex-col items-center">
        <Sheet>
          <SheetTrigger asChild>
            <div className="p-2 border-2 border-secondary rounded-md w-fit hover:bg-secondary">
              <PanelRightClose size={28} />
            </div>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-56">
            <SheetHeader>
              {/**
               * Title Of The Website
               */}
              <SheetTitle>SiteTitle</SheetTitle>
            </SheetHeader>
            <Separator className="my-4" />
            <ScrollArea className="h-[30rem]">
              <div className="text-xl font-bold">
                <Link href="/media" className="flex items-center gap-4">
                  <Image size={36} />
                  <span>Media</span>
                </Link>
                <Separator className="my-2" />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <Separator className="my-4" />
        <ScrollArea className="h-[30rem]">
          <Link href="/media">
            <Image size={36} />
          </Link>
        </ScrollArea>
      </div>
    </>
  );
};

export default SideBar;
