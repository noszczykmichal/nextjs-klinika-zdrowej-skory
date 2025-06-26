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

interface NavigationItemWithDropDownProps {
  linkData: { id: string; label: string; href: string };
  navData: Partial<ListItemData>[];
  linkClasses: string;
  contentClasses: string;
  setIdActiveLink: (id: NavId) => void;
}

export default function NavigationItemWithDropDown({
  linkData,
  navData,
  linkClasses,
  contentClasses,
  setIdActiveLink,
}: NavigationItemWithDropDownProps) {
  const { label } = linkData;
  const pathname = usePathname();

  const mainLinkActiveIndicator =
    pathname.split("/")[1] === "zabiegi"
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";

  const activeLinkHandler = () => setIdActiveLink("");

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
                  className={`${linkClasses} w-fit leading-[20px]`}
                  onClick={activeLinkHandler}
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
