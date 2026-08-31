import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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
      ? "before:w-full text-magenta-100"
      : "before:w-[0px]";

  const isDropDownLinkActive = (link: Partial<ListItemData>) =>
    pathname.split("/")[2] === link?.slug?.current
      ? "before:w-full text-magenta-100"
      : "before:w-[0px]";

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={clsx(
          "bg-transparent! text-lg leading-none data-[state=open]:bg-transparent!",
          linkClasses,
        )}
        data-testid={`dropDownTrigger-${mainRoute}`}
      >
        <span className={`${contentClasses} ${mainLinkActiveIndicator} `}>
          {label}
        </span>
      </NavigationMenuTrigger>
      <NavigationMenuContent
        className="mt-2.5!"
        data-testid={`dropDown-${mainRoute}`}
      >
        <ul className="flex w-75 flex-col justify-center gap-4 py-4">
          {filteredNavItems.map((link) => (
            <li key={link._id}>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${mainRoute}/${link?.slug?.current}`}
                  className={clsx("w-fit", linkClasses)}
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
