import type { Metadata } from "next";
import SideBar from "./__components/Layout/SideBar";
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
    <div className="relative">
      <SideBar />

      <div className="ml-24 relative py-6">
        <Header />
        <div className="px-12">{children}</div>
      </div>
    </div>
  );
}
