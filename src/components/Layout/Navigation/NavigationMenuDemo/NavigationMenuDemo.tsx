import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navConfig } from "@/utils/config";
import DemoNavItem from "./DemoNavItem/DemoNavItem";
import { ListItemData } from "@/types/types";

interface NavigationMenuDemoProps {
  navData: Partial<ListItemData>[];
}

export function NavigationMenuDemo({ navData }: NavigationMenuDemoProps) {
  return (
    <NavigationMenu className="hidden lg:flex h-full">
      <NavigationMenuList>
        {navConfig.map((link) => (
          <DemoNavItem
            key={link.id}
            linkData={link}
            menuTrigger={link.id === "zabiegi"}
            navData={navData}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
