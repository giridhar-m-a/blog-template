import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShortPost } from "@/Types/ShortPost";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Ellipsis } from "lucide-react";

export const PostColumn: ColumnDef<ShortPost>[] = [
  {
    header: "S No.",
    cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ getValue }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p>
                {getValue<string>().length > 15
                  ? `${getValue<string>().substring(0, 15)}...`
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
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p>
                {getValue<string>().length > 15
                  ? `${getValue<string>().substring(0, 15)}...`
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
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ getValue }) => {
      return <p>{format(getValue<string>(), "dd-MM-yyyy")}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ getValue }) => {
      return <p>{format(getValue<string>(), "dd-MM-yyyy")}</p>;
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ getValue }) => <>{getValue<{ name: string }>().name}</>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => {
      let text: string = "";
      getValue<{ name: string }[]>().map((category) => {
        text += ", " + category.name;
      });
      console.log("text:", text);
      return text.length > 0 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p>{text.length > 15 ? `${text.substring(0, 15)}...` : text}</p>
            </TooltipTrigger>
            <TooltipContent className="w-64 text-sm">
              <p>{text}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <p>Un Categorised</p>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: "status",
    cell: ({ getValue }) => {
      const status = getValue<boolean>();
      return (
        <Badge
          className={`${
            status
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {status ? "published" : "unpublished"}
        </Badge>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const post = row.original;
      return <Ellipsis />;
    },
  },
];
