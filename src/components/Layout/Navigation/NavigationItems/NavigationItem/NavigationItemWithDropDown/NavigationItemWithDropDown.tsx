import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { ListItemData, NavigationDataInterface } from "@/types/types";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
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

  const preventTriggerNavigation = (e: React.MouseEvent<HTMLLIElement>) => {
    const trigger = (e.target as HTMLElement).closest("a[data-nav-trigger]");
    if (trigger && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <NavigationMenuItem onClick={preventTriggerNavigation}>
      <NavigationMenuPrimitive.Trigger asChild>
        <a
          href={href}
          data-nav-trigger=""
          data-testid={`dropDownTrigger-${mainRoute}`}
          className={clsx(
            navigationMenuTriggerStyle(),
            "group bg-transparent! text-lg! leading-none data-[state=open]:bg-transparent!",
            linkClasses,
          )}
          data-slot="navigation-menu-trigger"
        >
          <span className={`${contentClasses} ${mainLinkActiveIndicator}`}>
            {label}
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="relative top-[1px] mt-0.5 h-4.5 w-6 stroke-gray-100 transition duration-300 group-data-[state=open]:rotate-180"
          />
        </a>
      </NavigationMenuPrimitive.Trigger>
      <NavigationMenuContent
        className="mt-2.5!"
        data-testid={`dropDown-${mainRoute}`}
      >
        <ul className="flex w-80 flex-col justify-center gap-4 py-4">
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
