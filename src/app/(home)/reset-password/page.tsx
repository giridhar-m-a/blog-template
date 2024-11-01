import ResetPasswordForm from "@/app/__components/auth/ResetPasswordForm";
import { Card, CardHeader } from "@/components/ui/card";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function ResetPassword({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { token } = await searchParams;

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {token ? (
        <ResetPasswordForm token={token as string} />
      ) : (
        <Card>
          <CardHeader>
            <h1>Invalid Link</h1>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
