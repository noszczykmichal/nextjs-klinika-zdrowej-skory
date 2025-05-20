"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ListItemData, NavigationColorVariant } from "@/types/types";

interface NavigationItemProps {
  linkData: { id: string; label: string; href: string };
  variant: NavigationColorVariant;
  onLinkClick?: () => void;
  navData: Partial<ListItemData>[];
}

function NavigationItem({
  linkData,
  variant,
  onLinkClick,
  navData,
}: NavigationItemProps) {
  const { id, label, href } = linkData;
  const pathname = usePathname();
  let textAndBackgroundColors = "before:bg-[var(--magenta-100)]";
  let collapsibleMenuColor = "bg-white";
  const isDisabled = id === "zabiegi";
  if (variant === "white") {
    textAndBackgroundColors =
      "before:bg-[var(--white-100)] text-[var(--white-100)] hover:text-[var(--white-100)]";
    collapsibleMenuColor = "bg-[var(--black-100)";
  }

  const isLinkActive =
    pathname === href
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";
  const attachedClasses = `relative hover:text-[var(--magenta-100)] before:w-[0px] before:absolute before:bottom-[-10px] before:left-0 before:content-[''] hover:before:w-full before:h-[1px]  before:transition-all before:duration-300 ${isLinkActive} ${textAndBackgroundColors}`;

  const dropDown = (
    <div className="collapsibleMenu pt-[30px]">
      <ul
        className={`grid w-[250px] gap-3 p-3 border border-[var(--gray-75)] rounded-[var(--small-border-radius)] ${collapsibleMenuColor}`}
      >
        {navData.map((link) => (
          <li key={link._id}>
            <Link
              href={`/zabiegi/${link?.slug?.current}`}
              onClick={onLinkClick}
              className={attachedClasses}
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
      className={`px-[20px] ${id === "zabiegi" ? "relative menuTrigger" : ""}`}
    >
      <Link
        href={href}
        className={attachedClasses}
        onClick={isDisabled ? (e) => e.preventDefault() : onLinkClick}
      >
        {label}
      </Link>
      {id === "zabiegi" && dropDown}
    </li>
  );
}

export default NavigationItem;
