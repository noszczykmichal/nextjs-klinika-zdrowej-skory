"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavigationItem from "./NavigationItem";
import { ListItemData } from "@/types/types";
import { navConfig } from "@/utils/config";

interface NavigationItemsProps {
  navWrapperClasses?: string;
  navData: Partial<ListItemData>[];
  listClasses: string;
  isMobileNav?: boolean;
}

export function NavigationItems({
  navWrapperClasses,
  navData,
  listClasses,
  isMobileNav = false,
}: NavigationItemsProps) {
  return (
    <NavigationMenu viewport={false} className={navWrapperClasses}>
      <NavigationMenuList className={listClasses}>
        {navConfig.map((link) => (
          <NavigationItem
            key={link.id}
            navData={navData}
            linkData={link}
            isMobileNav={isMobileNav}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
