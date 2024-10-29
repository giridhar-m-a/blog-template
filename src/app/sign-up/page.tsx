import RegisterForm from "@/app/__components/auth/RegisterForm";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div>
        <p>{session?.user?.email}</p>
      </div>
      <RegisterForm />
    </div>
  );
}
