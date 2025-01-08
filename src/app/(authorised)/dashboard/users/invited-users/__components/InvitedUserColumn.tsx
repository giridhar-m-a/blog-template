import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";

export const InvitedUserColumn: ColumnDef<{
  name: string | null;
  email: string;
  role: "admin" | "seo" | "manager" | "user" | "Super_Admin" | null;
}>[] = [
  {
    header: "S No.",
    cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <>{row.getValue("name")}</>,
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => <>{row.getValue("email")}</>,
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => <>{row.getValue("role")}</>,
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => <Ellipsis />,
  },
];
