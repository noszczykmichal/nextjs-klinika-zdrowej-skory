import Link from "next/link";

import { ListItemData } from "@/types/types";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavigationItemWithDropDownProps {
  linkData: { id: string; label: string; href: string };
  navData: Partial<ListItemData>[];
}

export default function NavigationItemWithDropDown({
  linkData,
  navData,
}: NavigationItemWithDropDownProps) {
  const { label } = linkData;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4">
          {navData.map((link) => (
            <li key={link._id}>
              <NavigationMenuLink asChild>
                <Link href={`/zabiegi/${link?.slug?.current}`}>
                  {link.title}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
