import { Badge } from "@/components/ui/badge";
import { ShortUser } from "@/Types/db-types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Ellipsis } from "lucide-react";
import UserAction from "./UserAction";

export const UserColumn: ColumnDef<ShortUser>[] = [
  {
    header: "S No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ getValue }) => getValue<string>(),
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ getValue }) => getValue<string>(),
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ getValue }) => (
      <p className="capitalize">{getValue<string>().replaceAll("_", " ")}</p>
    ),
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ getValue }) => <>{format(getValue<Date>(), "dd/MM/yyyy")}</>,
  },
  {
    header: "Is Verified",
    accessorKey: "isVerified",
    cell: ({ getValue }) => (
      <Badge className={getValue<boolean>() ? "bg-green-500" : "bg-red-500"}>
        {getValue<boolean>() ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => <UserAction user={row.original} />,
  },
];
