import { getAllUsers } from "@/app/__actions/users/get-users";
import { Separator } from "@/components/ui/separator";
import AddNewUser from "./__components/AddNewUser";
import UserTable from "./__components/UserTable";

export default async function Users() {
    const users = await getAllUsers();
  return (
    <>
      <div className="flex w-full gap-4">
        <AddNewUser />  
      </div>
      <Separator className="my-4" />
      <UserTable data={users} />
    </>
  );
}
