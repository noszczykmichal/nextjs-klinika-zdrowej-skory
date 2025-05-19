import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItemData } from "@/types/types";

interface DropDownMenuItemProps {
  className: string;
  navData: Partial<ListItemData>[];
}

export default function DropDownMenuItem({
  navData,
  className,
}: DropDownMenuItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={`${className} g-transparent focus:!bg-transparent data-[state=open]:!bg-transparent`}
      >
        Zabiegi
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[250px] gap-3 p-3">
          {navData.map((link) => (
            <Link
              href={`/zabiegi/${link?.slug?.current}`}
              className="inline-block relative"
              key={link._id}
            >
              <span className="relative text-[15px] hover:text-[var(--magenta-100)] before:absolute before:bottom-[-5px] before:left-0 before:h-[1px] before:w-0 before:content-[''] before:bg-[var(--magenta-100)] before:transition-all before:duration-300 hover:before:w-full">
                {link.title}
              </span>
            </Link>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
