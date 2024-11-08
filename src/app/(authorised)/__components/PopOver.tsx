"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
  title: string;
  description?: string;
  trigger: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
};

const PopOver: React.FC<props> = ({
  children,
  title,
  description,
  trigger,
  open,
  setOpen,
  className,
}) => {
  return (
    <Dialog open={open || false} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("lg:max-w-screen max-h-screen", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default PopOver;
