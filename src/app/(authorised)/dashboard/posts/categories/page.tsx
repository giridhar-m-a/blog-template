import { getPostCategories } from "@/app/__actions/PostCategories/get-categories";
import AddNewPostCategory from "./__components/AddNewCategory";
import { Separator } from "@/components/ui/separator";
import PostcategoryTable from "./__components/CategoryTable";

export default async function PostCategories() {
  const categories = await getPostCategories();
  return (
    <>
      <div className="flex w-full gap-4">
        <AddNewPostCategory />
      </div>
      <Separator className="my-4" />
      <PostcategoryTable data={categories || []} />
    </>
  );
}
