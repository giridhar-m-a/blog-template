import { verifyEmail } from "@/app/__actions/auth/verify-email";
import { Card, CardHeader } from "@/components/ui/card";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { token } = await searchParams;
  if (!token) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Card>
          <CardHeader>
            <h1>Invalid Link</h1>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const isVerified = await verifyEmail(token as string);

  if (isVerified) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Card>
          <CardHeader>
            <h1>{isVerified.message}</h1>
          </CardHeader>
        </Card>
      </div>
    );
  }
}
