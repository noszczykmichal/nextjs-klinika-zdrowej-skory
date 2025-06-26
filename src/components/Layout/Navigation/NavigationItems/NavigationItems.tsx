"use client";

// import { useState } from "react";

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
  // const [idActiveLink, setIdActiveLink] = useState("");

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="hidden h-full gap-0 lg:flex">
        {navConfig.map((link) => (
          <NavigationItem
            key={link.id}
            navData={navData}
            linkData={link}
            // idActiveLink={idActiveLink}
            // setIdActiveLink={setIdActiveLink}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
