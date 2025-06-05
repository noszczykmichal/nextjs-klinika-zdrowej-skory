"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { ListItemData, NavigationColorVariant } from "@/types/types";

interface NavigationItemProps {
  linkData: { id: string; label: string; href: string };
  variant: NavigationColorVariant;
  onLinkClick?: () => void;
  navData: Partial<ListItemData>[];
  classForDropDown: string;
}

function NavigationItem({
  linkData,
  variant,
  onLinkClick,
  navData,
  classForDropDown,
}: NavigationItemProps) {
  const { id, label, href } = linkData;
  const pathname = usePathname();
  let textAndBackgroundColors = "before:bg-[var(--magenta-100)]";
  let collapsibleMenuColor = "bg-white";
  const isDisabled = id === "zabiegi";
  if (variant === "dark") {
    textAndBackgroundColors =
      "before:bg-[var(--white-100)] text-[var(--white-100)] hover:text-[var(--white-100)]";
    collapsibleMenuColor = "bg-[var(--black-100)";
  }

  const isLinkActive =
    pathname === href
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";
  const attachedClasses = `relative whitespace-nowrap  hover:text-[var(--magenta-100)] before:w-[0px] before:absolute before:bottom-[-10px] before:left-0 before:content-[''] hover:before:w-full active:before:w-full focus:before:w-full before:h-[1px]  before:transition-all before:duration-300 ${isLinkActive} ${textAndBackgroundColors}`;

  const dropDown = (
    <div className={`collapsibleMenu pt-[30px] ${classForDropDown}`}>
      <ul
        className={`grid w-[300px] gap-6 rounded-[var(--small-border-radius)] border border-[var(--gray-75)] bg-[var(--black-100)] p-3 ${collapsibleMenuColor}`}
      >
        {navData.map((link) => (
          <li key={link._id}>
            <Link
              href={`/zabiegi/${link?.slug?.current}`}
              onClick={onLinkClick}
              className={`${attachedClasses} text-[15px]`}
            >
              {link.title || ""}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <li
      className={`flex items-center px-[20px] ${
        id === "zabiegi" ? "menuTrigger relative" : ""
      }`}
    >
      <Link
        href={href}
        className={attachedClasses}
        onClick={isDisabled ? (e) => e.preventDefault() : onLinkClick}
      >
        {label}
      </Link>
      {id === "zabiegi" && (
        <ChevronDown className="chevron--down mt-[5px] h-[60%] cursor-pointer text-[var(--gray-100)] transition-transform duration-300 ease-in-out" />
      )}

      {id === "zabiegi" && dropDown}
    </li>
  );
}

export default NavigationItem;
