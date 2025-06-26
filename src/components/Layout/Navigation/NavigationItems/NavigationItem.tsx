"use client";

import { useContext } from "react";
import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ListItemData } from "@/types/types";
import NavigationItemWithDropDown from "./NavigationItemWithDropDown";
import UIContext from "@/store/uiContext";
import { NavId } from "@/types/types";

interface NavigationItemProps {
  linkData: { id: NavId; label: string; href: string };
  navData: Partial<ListItemData>[];
  //   idActiveLink: string;
  //   setIdActiveLink: (id: string) => void;
}

export default function NavigationItem({
  linkData,
  navData,
  // idActiveLink,
  // setIdActiveLink,
}: NavigationItemProps) {
  const { id, label, href } = linkData;
  const { idActiveLink, setIdActiveLink } = useContext(UIContext);

  const linkClasses =
    "px-[20px] hover:!bg-transparent focus:!bg-transparent active:!bg-transparent font-normal py-0";
  const contentClasses = `relative whitespace-nowrap before:absolute before:bottom-[-10px] before:left-0 before:h-[1px] before:w-[0px] before:bg-[var(--magenta-100)] before:transition-all before:duration-300 before:content-[''] hover:text-[var(--magenta-100)] hover:before:w-full active:before:w-full focus:before:w-full`;

  const activeLinkClasses =
    idActiveLink === id
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";

  const activeLinkHandler = () => setIdActiveLink(id);

  let content = (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href={href} className={linkClasses} onClick={activeLinkHandler}>
          <span
            className={`${contentClasses} ${activeLinkClasses} text-[18px] leading-[28px]`}
          >
            {label}
          </span>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

  if (id === "zabiegi") {
    content = (
      <NavigationItemWithDropDown
        linkData={linkData}
        navData={navData}
        linkClasses={linkClasses}
        contentClasses={contentClasses}
        setIdActiveLink={setIdActiveLink}
      />
    );
  }

  return <>{content}</>;
}
