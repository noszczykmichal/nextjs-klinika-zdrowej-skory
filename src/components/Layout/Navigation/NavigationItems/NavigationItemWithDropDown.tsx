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
  linkClasses: string;
  contentClasses: string;
}

export default function NavigationItemWithDropDown({
  linkData,
  navData,
  linkClasses,
  contentClasses,
}: NavigationItemWithDropDownProps) {
  const { label } = linkData;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={`${linkClasses} text-[18px] leading-[28px] data-[state=open]:!bg-transparent`}
      >
        <span className={`${contentClasses} `}>{label}</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="!mt-[20px]">
        <ul className="grid w-[300px] justify-center gap-6 p-3">
          {navData.map((link) => (
            <li key={link._id}>
              <NavigationMenuLink asChild>
                <Link
                  href={`/zabiegi/${link?.slug?.current}`}
                  className={`${linkClasses} w-fit leading-[20px]`}
                >
                  <span className={`${contentClasses} text-[15px]`}>
                    {link.title}
                  </span>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
