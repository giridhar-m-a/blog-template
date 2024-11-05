"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

function HeaderBreadcrumb() {
  const pathname = usePathname();
  const activePath = pathname?.split("/").filter(Boolean);
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname !== "/dashboard" && (
          <>
            {activePath.map((path, i) => (
              <React.Fragment key={i}>
                {path !== "dashboard" && (
                  <>
                    {i + 1 === activePath.length ? (
                      <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage className="capitalize">
                            {path.replace("-", " ")}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    ) : (
                      <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link href={`/dashboard/${path}`}>
                              {path.replace("-", " ")}
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </>
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default HeaderBreadcrumb;
