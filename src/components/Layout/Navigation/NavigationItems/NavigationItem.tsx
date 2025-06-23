import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
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

  let content = (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href={href}>{label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

  if (id === "zabiegi") {
    content = (
      <NavigationItemWithDropDown linkData={linkData} navData={navData} />
    );
  }

  return <>{content}</>;
}
