import Link from "next/link";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ReactNode } from "react";

interface NavigationItemProps {
  title: string;
  children: ReactNode;
  href: string;
}

export default function NavigationItem({
  title,
  children,
  href,
}: NavigationItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
