"use client";

import { getAllUsers } from "@/app/__actions/users/get-users";
import DataTable from "@/app/__components/DataTable/Table";
import { ShortUser } from "@/Types/db-types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { UserColumn } from "./UserColumn";

type props = {
  data: ShortUser[];
};

const UserTable: React.FC<props> = ({ data }) => {
  const { data: users } = useQuery({
    queryKey: ["getAllUsers"],
    initialData: data,
    queryFn: async () => {
      return await getAllUsers();
    },
  });

  return <DataTable columns={UserColumn} data={users || []} isPaginated />;
};

export default UserTable;
