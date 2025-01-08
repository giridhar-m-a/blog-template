import { getInvitedUserToken } from "@/app/__actions/users/get-invited-user-token";
import { Card, CardHeader } from "@/components/ui/card";
import RegisterForm from "./__component/RegisterForm";

export default async function RegisterInvitedUser({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const userData = await getInvitedUserToken(token);
  if (!userData.ok || !userData.data) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Card>
          <CardHeader>
            <h1>{userData.message}</h1>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <RegisterForm data={{ ...userData.data, token }} />
    </div>
  );
}
