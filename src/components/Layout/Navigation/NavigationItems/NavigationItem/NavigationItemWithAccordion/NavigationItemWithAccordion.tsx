import { usePathname } from "next/navigation";
import Link from "next/link";

import { ListItemData, NavigationDataInterface } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavConfigItem } from "@/types/types";

interface NavigationItemWithAccordionProps {
  linkData: NavConfigItem;
  navData: NavigationDataInterface;
  onLinkClick?: () => void;
  contentClasses: string;
}

export default function NavigationItemWithAccordion({
  linkData,
  navData,
  onLinkClick,
  contentClasses,
}: NavigationItemWithAccordionProps) {
  const { label, href, resourceType } = linkData;
  const mainRoute = resourceType === "training" ? "szkolenia" : "zabiegi";
  const filteredNavItems = navData[resourceType!];
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
    <Accordion type="multiple" className="w-full pl-2">
      <AccordionItem
        value="treatments"
        data-testid={`accordionItem-${mainRoute}`}
      >
        <AccordionTrigger
          className={`w-auto grow-0 py-0 text-[18px] font-normal focus:no-underline focus:outline-none active:no-underline [&>svg]:self-center`}
          data-testid={`accordionTrigger-${mainRoute}`}
        >
          <span
            className={`inline-block ${contentClasses} ${activeLinkClasses}`}
          >
            {label}
          </span>
        </AccordionTrigger>
        <AccordionContent
          className="flex w-[90%] flex-col gap-6 py-5"
          data-testid={`accordionContent-${mainRoute}`}
        >
          {filteredNavItems.map((link) => (
            <Link
              href={`/${mainRoute}/${link?.slug?.current}`}
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
