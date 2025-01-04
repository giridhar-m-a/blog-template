import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { blogPostCategory } from "@/db/schemas/blog-post-category";
import { ColumnDef } from "@tanstack/react-table";
import CategoriesOption from "./CategoriesOption";

export const PostCategoryColumn: ColumnDef<
  typeof blogPostCategory.$inferSelect
>[] = [
  {
    header: "S No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "title",
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
    cell: ({ row }) => <CategoriesOption data={row.original} />,
  },
];
