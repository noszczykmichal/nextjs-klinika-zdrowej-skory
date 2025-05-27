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
      <main className="w-full flex flex-col items-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
          {children}
        </section>
      </main>
    </>
  );
}
