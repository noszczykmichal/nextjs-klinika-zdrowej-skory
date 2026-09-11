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
      <main className="mx-auto flex w-full flex-col items-center px-6.25 md:px-10.5">
        <section className="flex w-full max-w-325 flex-col gap-y-17.5 pb-17.5 lg:gap-y-25 lg:pb-25">
          {children}
        </section>
      </main>
    </>
  );
}
