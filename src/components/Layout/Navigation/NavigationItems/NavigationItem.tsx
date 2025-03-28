"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavigationColorVariant } from "@/types/types";

interface NavigationItemProps {
  href: string;
  label: string;
  variant: NavigationColorVariant;
  onLinkClick?: () => void;
}

function NavigationItem({
  href,
  label,
  variant,
  onLinkClick,
}: NavigationItemProps) {
  const pathname = usePathname();

  const primaryColor = variant === "dark" ? "--black-100" : "--white-100";

  const attachedClasses =
    pathname === href
      ? `border-[var(${primaryColor})]`
      : "border-b-transparent";

  return (
    <li className={"px-[20px]"}>
      <Link
        href={href}
        className={`pb-[5px] border-b-2 hover:border-[var(${primaryColor})] transition-all ease-in duration-[0.15s] ${attachedClasses}`}
        onClick={onLinkClick}
      >
        {label}
      </Link>
    </li>
  );
}

export default NavigationItem;
