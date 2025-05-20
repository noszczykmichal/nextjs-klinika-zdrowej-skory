import {
  NavigationMenu,
  NavigationMenuList,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navConfig } from "@/utils/config";
import DemoNavItem from "./DemoNavItem/DemoNavItem";
import { ListItemData } from "@/types/types";

interface NavigationMenuDemoProps {
  navData: Partial<ListItemData>[];
  orientation: "vertical" | "horizontal";
}

export default function NavigationMenuDemo({
  navData,
  orientation,
}: NavigationMenuDemoProps) {
  return (
    <NavigationMenu
      className="hidden lg:flex h-full relative"
      orientation={orientation}
    >
      {/* <NavigationMenuViewport /> */}
      <NavigationMenuList className="flex flex-col">
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
