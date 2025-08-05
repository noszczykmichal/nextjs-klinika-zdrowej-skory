"use client";

import { usePathname as _usePathname } from "next/navigation";
import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ListItemData } from "@/types/types";
import NavigationItemWithDropDown from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItemWithDropDown/NavigationItemWithDropDown";
import NavigationItemWithAccordion from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItemWithAccordion/NavigationItemWithAccordion";

type UsePathnameType = typeof _usePathname;

interface NavigationItemProps {
  linkData: { id: string; label: string; href: string };
  navData: Partial<ListItemData>[];
  isMobileNav: boolean;
  onLinkClick?: () => void;
  usePathname?: UsePathnameType;
}

export default function NavigationItem({
  linkData,
  navData,
  isMobileNav,
  onLinkClick,
  usePathname = _usePathname,
}: NavigationItemProps) {
  const { id, label, href } = linkData;
  const pathname = usePathname();

  const linkClasses =
    "lg:px-[20px] hover:!bg-transparent focus:!bg-transparent active:!bg-transparent font-normal py-0";
  const contentClasses = `relative whitespace-nowrap before:absolute before:bottom-[-5px] py-[10px] before:left-0 before:h-[1px] before:bg-[var(--magenta-100)] before:transition-all before:duration-300 before:content-[''] hover:text-[var(--magenta-100)] hover:before:w-full active:before:w-full focus:before:w-full`;

  const activeLinkClasses =
    `/${pathname.split("/")[1]}` === href
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";

  let content = (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={linkClasses}
          onClick={onLinkClick}
          data-testid={id}
        >
          <span
            className={`inline-block ${contentClasses} ${activeLinkClasses} text-[18px] leading-[1]`}
          >
            {label}
          </span>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

  if (id === "zabiegi" && !isMobileNav) {
    content = (
      <NavigationItemWithDropDown
        linkData={linkData}
        navData={navData}
        linkClasses={linkClasses}
        contentClasses={contentClasses}
        pathname={pathname}
      />
    );
  } else if (id === "zabiegi" && isMobileNav) {
    content = (
      <li className="relative">
        <NavigationItemWithAccordion
          linkData={linkData}
          navData={navData}
          onLinkClick={onLinkClick}
          contentClasses={contentClasses}
          pathname={pathname}
        />
      </li>
    );
  }

  return <>{content}</>;
}
