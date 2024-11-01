import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import AppSideBar from "./__components/Layout/AppSideBar";
import Header from "./__components/Layout/Header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSideBar />
        <SidebarInset>
          <Header />
          <div className="p-6 bg-primary-foreground rounded-md min-h-full mx-12">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
