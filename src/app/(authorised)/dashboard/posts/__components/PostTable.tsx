"use client";

import DataTable from "@/app/__components/DataTable/Table";
import { PostColumn } from "./PostColumn";
import { ShortPost } from "@/Types/ShortPost";
import React from "react";

type props = {
  data: ShortPost[];
};

const PostTable: React.FC<props> = ({ data }) => {
  return <DataTable columns={PostColumn} data={data} />;
};

export default PostTable;
