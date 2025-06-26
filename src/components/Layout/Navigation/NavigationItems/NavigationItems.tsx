"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavigationItem from "./NavigationItem";
import { ListItemData } from "@/types/types";
import { navConfig } from "@/utils/config";

interface NavigationItemsProps {
  navData: Partial<ListItemData>[];
}

export function NavigationItems({ navData }: NavigationItemsProps) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="hidden h-full gap-0 lg:flex">
        {navConfig.map((link) => (
          <NavigationItem key={link.id} navData={navData} linkData={link} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
