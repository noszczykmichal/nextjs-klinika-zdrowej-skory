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
}

export default function NavigationItemWithAccordion({
  linkData,
  navData,
}: NavigationItemWithAccordionProps) {
  const { label } = linkData;

  return (
    <Accordion type="multiple" className="w-full pl-[8px]">
      <AccordionItem value="treatments">
        <AccordionTrigger className="w-auto flex-grow-0 py-0 text-[18px] font-normal">
          {label}
        </AccordionTrigger>
        <AccordionContent className="flex w-[90%] flex-col">
          {navData.map((link) => (
            <Link
              href={`/zabiegi/${link?.slug?.current}`}
              className="overflow-hidden py-1 text-ellipsis whitespace-nowrap"
              key={link._id}
            >
              {link.title}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
