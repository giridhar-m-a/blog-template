"use client";

import { getPostCategories } from "@/app/__actions/PostCategories/get-categories";
import DataTable from "@/app/__components/DataTable/Table";
import { blogPostCategory } from "@/db/schemas/blog-post-category";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PostCategoryColumn } from "./CategoryColumn";

type props = {
  data: (typeof blogPostCategory.$inferSelect)[];
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

  return <DataTable columns={PostCategoryColumn} data={posts || []} isPaginated />;
};

export default PostcategoryTable;
