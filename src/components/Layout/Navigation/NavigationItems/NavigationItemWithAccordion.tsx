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
    <Accordion type="multiple" className="top-0 left-0 w-full">
      <AccordionItem value="treatments">
        <AccordionTrigger>{label}</AccordionTrigger>
        <AccordionContent>
          {navData.map((link) => (
            <Link
              key={link._id}
              href={`/zabiegi/${link?.slug?.current}`}
              className="block py-1 pl-4 text-sm"
            >
              {link.title}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
