import { getInvitedUsers } from "@/app/__actions/users/get-invited";
import AddNewUser from "../__components/AddNewUser";
import { Separator } from "@/components/ui/separator";
import InvitedUserTable from "./__components/InvitedUserTable";

export default async function InvitedUsers() {
    const users = await getInvitedUsers();
    return (
      <>
        <div className="flex w-full gap-4">
          <AddNewUser />
        </div>
        <Separator className="my-4" />
        <InvitedUserTable data={users} />
      </>
    );
}