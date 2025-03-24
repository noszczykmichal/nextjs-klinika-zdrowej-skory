import Link from "next/link";

import { linksConfig } from "@/utils/config";

interface NavigationItemsProps {
  className: string;
}

function NavigationItems({ className }: NavigationItemsProps) {
  return (
    <ul className={className}>
      {linksConfig.map((link) => (
        <li key={link.id} className="px-[20px]">
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default NavigationItems;
