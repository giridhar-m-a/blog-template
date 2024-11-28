"use client";

import DataTable from "@/app/__components/DataTable/Table";
import { PostCategoryColumn } from "./CategoryColumn";
import { ShortPost } from "@/Types/ShortPost";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/app/__actions/posts/get-all-posts";
import { PostCategory } from "@prisma/client";
import { getPostCategories } from "@/app/__actions/PostCategories/get-categories";

type props = {
  data: PostCategory[];
};

const PostcategoryTable: React.FC<props> = ({ data }) => {
  const { data: posts } = useQuery({
    queryKey: ["getAllPostCategories"],
    initialData: data,
    queryFn: async () => {
      return getPostCategories();
    },
  });

  console.log("post category", posts);

  return <DataTable columns={PostCategoryColumn} data={posts || []} />;
};

export default PostcategoryTable;
