"use client";

import { getInvitedUsers } from "@/app/__actions/users/get-invited";
import DataTable from "@/app/__components/DataTable/Table";
import { ShortUser } from "@/Types/db-types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { InvitedUserColumn } from "./InvitedUserColumn";

type props = {
  data: {
    name: string | null;
    email: string;
    role: "admin" | "seo" | "manager" | "user" | "Super_Admin" | null;
  }[];
};

const InvitedUserTable: React.FC<props> = ({ data }) => {
  const { data: users } = useQuery({
    queryKey: ["getInvitedUsers"],
    initialData: data,
    queryFn: async () => {
      return await getInvitedUsers();
    },
  });

  return (
    <DataTable columns={InvitedUserColumn} data={users || []} isPaginated />
  );
};

export default InvitedUserTable;
