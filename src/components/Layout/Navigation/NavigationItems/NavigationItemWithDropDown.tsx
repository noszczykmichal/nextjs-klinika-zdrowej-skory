import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ListItemData } from "@/types/types";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavId } from "@/types/types";
import UIContext from "@/store/uiContext";

interface NavigationItemWithDropDownProps {
  linkData: { id: NavId; label: string; href: string };
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
  const { id, label } = linkData;
  const { idActiveLink, setIdActiveLink } = useContext(UIContext);
  const pathname = usePathname();

  const mainLinkActiveIndicator =
    idActiveLink === "zabiegi"
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";

  const isDropDownLinkActive = (link: Partial<ListItemData>) =>
    pathname.split("/")[2] === link?.slug?.current
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";

  const activeLinkHandler = () => setIdActiveLink(id);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={`${linkClasses} !bg-transparent text-[18px] leading-[28px] data-[state=open]:!bg-transparent`}
      >
        <span className={`${contentClasses} ${mainLinkActiveIndicator} `}>
          {label}
        </span>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="!mt-[20px]">
        <ul className="grid w-[300px] justify-center gap-6 p-3">
          {navData.map((link) => (
            <li key={link._id}>
              <NavigationMenuLink asChild>
                <Link
                  href={`/zabiegi/${link?.slug?.current}`}
                  className={`${linkClasses} ${isDropDownLinkActive(link)} w-fit leading-[20px]`}
                  onClick={activeLinkHandler}
                >
                  <span
                    className={`${contentClasses} ${isDropDownLinkActive(link)} text-[15px]`}
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
