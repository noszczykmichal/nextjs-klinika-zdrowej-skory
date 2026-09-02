"use client";

import { usePathname } from "next/navigation";
import { RevealWrapper } from "next-reveal";

import { ListItemData } from "@/types/types";
import ImageCard from "@/components/ui/custom/ItemsList/ListItem/ImageCard/ImageCard";
import ItemSummary from "@/components/ui/custom/ItemsList/ListItem/ItemSummary/ItemSummary";

interface ListItemProps {
  itemData: ListItemData;
}

export default function ListItem({ itemData }: ListItemProps) {
  const pathname = usePathname();
  function calculateRoute() {
    if (pathname.startsWith("/blog")) {
      return "blog";
    } else if (pathname.startsWith("/zabiegi")) {
      return "zabiegi";
    } else {
      return "szkolenia";
    }
  }
  const rootRoute = calculateRoute();

  return (
    <RevealWrapper
      origin="bottom"
      distance="20px"
      duration={500}
      delay={200}
      viewFactor={0.25}
      easing="cubic-bezier(0.645, 0.045, 0.355, 1)"
    >
      <li className="grid place-items-start gap-[50px] border-b-1 border-[var(--gray-75)] py-[50px] md:grid-cols-[1fr_2fr] lg:gap-[100px]">
        <ImageCard itemData={itemData} rootRoute={rootRoute} />
        <ItemSummary itemData={itemData} rootRoute={rootRoute} />
      </li>
    </RevealWrapper>
  );
}
