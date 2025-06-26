"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ListItemData } from "@/types/types";
import NavigationItemWithDropDown from "./NavigationItemWithDropDown";

interface NavigationItemProps {
  linkData: { id: string; label: string; href: string };
  navData: Partial<ListItemData>[];
}

export default function NavigationItem({
  linkData,
  navData,
}: NavigationItemProps) {
  const { id, label, href } = linkData;
  const pathname = usePathname();

  const linkClasses =
    "px-[20px] hover:!bg-transparent focus:!bg-transparent active:!bg-transparent font-normal py-0";
  const contentClasses = `relative whitespace-nowrap before:absolute before:bottom-[-10px] before:left-0 before:h-[1px] before:w-[0px] before:bg-[var(--magenta-100)] before:transition-all before:duration-300 before:content-[''] hover:text-[var(--magenta-100)] hover:before:w-full active:before:w-full focus:before:w-full`;

  const activeLinkClasses =
    `/${pathname.split("/")[1]}` === href
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";

  let content = (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href={href} className={linkClasses}>
          <span
            className={`${contentClasses} ${activeLinkClasses} text-[18px] leading-[28px]`}
          >
            {label}
          </span>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

  if (id === "zabiegi") {
    content = (
      <NavigationItemWithDropDown
        linkData={linkData}
        navData={navData}
        linkClasses={linkClasses}
        contentClasses={contentClasses}
      />
    );
  }

  return <>{content}</>;
}
