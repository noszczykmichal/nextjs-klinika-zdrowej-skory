"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import DropDownMenuItem from "./DropDownMenuItem/DropDownMenuItem";
import { ListItemData } from "@/types/types";

interface DemoNavItem {
  menuTrigger: boolean;
  linkData: { id: string; label: string; href: string };
  navData: Partial<ListItemData>[];
}

export default function DemoNavItem({
  menuTrigger,
  linkData,
  navData,
}: DemoNavItem) {
  const pathname = usePathname();

  const isLinkActive =
    pathname === linkData.href ? "before:w-full" : "before:w-[0px]";

  const attachedClasses = `text-[18px] font-normal relative bg-transparent focus:bg-transparent before:w-[0px] before:absolute before:bottom-0 before:left-0 before:content-[''] hover:bg-transparent hover:cursor-pointer hover:before:w-full before:h-[1px] before:bg-[var(--magenta-100)] before:transition-all before:duration-300 ${isLinkActive}`;

  return (
    <>
      {menuTrigger ? (
        <DropDownMenuItem navData={navData} className={attachedClasses} />
      ) : (
        <NavigationMenuItem>
          <Link
            href={linkData.href}
            legacyBehavior
            passHref
            scroll={linkData.id === "kontakt"}
          >
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} ${attachedClasses}`}
            >
              {linkData.label}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      )}
    </>
  );
}
