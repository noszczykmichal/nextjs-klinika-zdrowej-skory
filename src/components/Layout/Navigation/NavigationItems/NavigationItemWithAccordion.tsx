import { usePathname } from "next/navigation";
import Link from "next/link";

import { ListItemData } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NavigationItemWithAccordionProps {
  linkData: { id: string; label: string; href: string };
  navData: Partial<ListItemData>[];
  onLinkClick?: () => void;
  contentClasses: string;
}

export default function NavigationItemWithAccordion({
  linkData,
  navData,
  onLinkClick,
  contentClasses,
}: NavigationItemWithAccordionProps) {
  const { label, href } = linkData;
  const pathname = usePathname();

  const activeLinkClasses =
    `/${pathname.split("/")[1]}` === href
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";

  const isDropDownLinkActive = (link: Partial<ListItemData>) =>
    pathname.split("/")[2] === link?.slug?.current
      ? "before:w-full text-[var(--magenta-100)]"
      : "before:w-[0px]";

  return (
    <Accordion type="multiple" className="w-full pl-[8px]">
      <AccordionItem value="treatments">
        <AccordionTrigger
          className={`w-auto flex-grow-0 py-0 text-[18px] font-normal ${contentClasses} ${activeLinkClasses}`}
        >
          {label}
        </AccordionTrigger>
        <AccordionContent className="flex w-[90%] flex-col gap-4 py-4 leading-0">
          {navData.map((link) => (
            <Link
              href={`/zabiegi/${link?.slug?.current}`}
              className={`xxs:text-[15px] inline-block w-fit leading-0 whitespace-nowrap ${contentClasses} ${isDropDownLinkActive(link)} `}
              key={link._id}
              onClick={onLinkClick}
            >
              {link.title}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
