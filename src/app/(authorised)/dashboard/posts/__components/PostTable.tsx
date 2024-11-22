"use client";

import DataTable from "@/app/__components/DataTable/Table";
import { PostColumn } from "./PostColumn";
import { ShortPost } from "@/Types/ShortPost";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/app/__actions/posts/get-all-posts";

type props = {
  data: ShortPost[];
};

const PostTable: React.FC<props> = ({ data }) => {
  const { data: posts } = useQuery({
    queryKey: ["getAllShortPosts"],
    initialData: data,
    queryFn: async () => {
      return getAllPosts(true);
    },
  });

  return <DataTable columns={PostColumn} data={posts || []} />;
};

export default PostTable;
