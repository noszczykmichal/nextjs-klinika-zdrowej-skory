import { Fragment } from "react";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RouteData } from "@/types/types";

interface BreadcrumbWrapperProps {
  routesData?: RouteData[];
}

export function BreadcrumbWrapper({ routesData = [] }: BreadcrumbWrapperProps) {
  return (
    <Breadcrumb className="breadcrumb-wrapper flex justify-start w-full max-w-[1300px] py-[20px] mx-auto">
      <BreadcrumbList className="breadcrumb-list__post-page">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="whitespace-nowrap">
            Klinika
          </BreadcrumbLink>
        </BreadcrumbItem>
        {routesData.length === 0 && (
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
        )}

        {routesData &&
          routesData.map((route, index) =>
            index < routesData.length - 1 ? (
              <Fragment key={route.routeName}>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={route.url}
                    className="whitespace-nowrap"
                  >
                    {route.routeName}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            ) : (
              <Fragment key={route.routeName}>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="breadcrumb__post-page max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap">
                    {route.routeName}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </Fragment>
            )
          )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
