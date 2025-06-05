import { ReactNode } from "react";

import { BreadcrumbWrapper } from "@/components/ui/custom/BreadcrumbWrapper/BreadcrumbWrapper";
import { RouteData } from "@/types/types";

interface LayoutWrapperProps {
  children: ReactNode;
  breadcrumbData?: RouteData[];
}

export default function LayoutWrapper({
  children,
  breadcrumbData,
}: LayoutWrapperProps) {
  return (
    <>
      <BreadcrumbWrapper routesData={breadcrumbData} />
      <main className="mx-auto flex w-full flex-col items-center px-[25px] md:px-[42px]">
        <section className="flex w-full max-w-[1300px] flex-col gap-y-[70px] pb-[70px] lg:gap-y-[100px] lg:pb-[100px]">
          {children}
        </section>
      </main>
    </>
  );
}
