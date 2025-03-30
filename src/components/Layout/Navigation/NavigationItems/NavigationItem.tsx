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

  let isLinkActive =
    pathname === href ? `border-b-[var(--black-100)]` : "border-b-transparent";
  let onHoverBehaviour = `hover:border-b-[var(--black-100)]`;

  if (variant === "white") {
    isLinkActive =
      pathname === href
        ? `border-b-[var(--white-100)]`
        : "border-b-transparent";

    onHoverBehaviour = `hover:border-b-[var(--white-100)]`;
  }

  return (
    <li className={"px-[20px]"}>
      <Link
        href={href}
        className={`pb-[5px] border-b-2 transition-all ease-in duration-[0.15s] ${isLinkActive} ${onHoverBehaviour}`}
        onClick={onLinkClick}
      >
        {label}
      </Link>
    </li>
  );
}

export default NavigationItem;
