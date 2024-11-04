import { getAuthUser } from "@/lib/getAuthUser";
import ProfilePicUpdate from "./__components/ProfilePicUpdate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PasswordChangeForm from "./__components/PasswordChangeForm";

export default async function AccountPage() {
  const user = await getAuthUser();
  return (
    <div className="space-y-8">
      <Card className="p-8  flex items-center gap-6">
        <ProfilePicUpdate profilePic={user?.avatar} />
        <Card className=" p-4 w-full h-full">
          <h1 className="text-3xl font-bold">{user?.name}</h1>
          <p>{user?.email}</p>
        </Card>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordChangeForm />
        </CardContent>
      </Card>
    </div>
  );
}
