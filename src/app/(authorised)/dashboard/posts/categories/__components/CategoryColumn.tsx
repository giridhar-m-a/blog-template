import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { PostCategory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";

export const PostCategoryColumn: ColumnDef<PostCategory>[] = [
  {
    header: "S No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => <>{getValue<string>()}</>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p>
                {getValue<string>()?.length > 30
                  ? `${getValue<string>().substring(0, 30)}...`
                  : getValue<string>()}
              </p>
            </TooltipTrigger>
            <TooltipContent className="w-64 text-sm">
              <p>{getValue<string>()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => <Ellipsis />,
  },
];
