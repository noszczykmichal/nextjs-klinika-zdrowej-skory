import Link from "next/link";
import { usePathname } from "next/navigation";

import { ListItemData, NavigationDataInterface } from "@/types/types";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavConfigItem } from "@/types/types";

interface NavigationItemWithDropDownProps {
  linkData: NavConfigItem;
  navData: NavigationDataInterface;
  linkClasses: string;
  contentClasses: string;
}

export default function NavigationItemWithDropDown({
  linkData,
  navData,
  linkClasses,
  contentClasses,
}: NavigationItemWithDropDownProps) {
  const { label, href, resourceType } = linkData;
  const mainRoute = resourceType === "training" ? "szkolenia" : "zabiegi";
  const pathname = usePathname();
  const filteredNavItems = navData[resourceType!];

  const mainLinkActiveIndicator =
    `/${pathname.split("/")[1]}` === href
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";

  const isDropDownLinkActive = (link: Partial<ListItemData>) =>
    pathname.split("/")[2] === link?.slug?.current
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={`${linkClasses} !bg-transparent text-[18px] leading-[1] data-[state=open]:!bg-transparent`}
      >
        <span className={`${contentClasses} ${mainLinkActiveIndicator} `}>
          {label}
        </span>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="!mt-[10px]" data-testid="dropDown">
        <ul className="flex w-[300px] flex-col justify-center gap-4 py-4">
          {filteredNavItems.map((link) => (
            <li key={link._id}>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${mainRoute}/${link?.slug?.current}`}
                  className={`${linkClasses} w-fit`}
                >
                  <span
                    className={`inline-block ${contentClasses} ${isDropDownLinkActive(link)} text-[15px] leading-0`}
                  >
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
