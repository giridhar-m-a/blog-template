"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface RedirectButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  url: string;
}

const RedirectButton: React.FC<RedirectButtonProps> = ({
  url,
  children,
  ...props
}) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(url)} {...props}>
      {children}
    </Button>
  );
};

export default RedirectButton;
