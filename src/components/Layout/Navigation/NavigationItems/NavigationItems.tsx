"use client";

import { usePathname as _usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavigationItem from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItem";
import { ListItemData } from "@/types/types";
import { navConfig } from "@/utils/config";

export type UsePathnameType = typeof _usePathname;

interface NavigationItemsProps {
  navWrapperClasses?: string;
  navData: Partial<ListItemData>[];
  listClasses: string;
  isMobileNav?: boolean;
  onClick?: () => void;
  usePathname?: UsePathnameType;
}

export default function NavigationItems({
  navWrapperClasses,
  navData,
  listClasses,
  isMobileNav = false,
  onClick,
  usePathname = _usePathname,
}: NavigationItemsProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false} className={navWrapperClasses}>
      <NavigationMenuList className={listClasses}>
        {navConfig.map((link) => (
          <NavigationItem
            key={link.id}
            navData={navData}
            linkData={link}
            isMobileNav={isMobileNav}
            onLinkClick={onClick}
            pathname={pathname}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
