"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";

import { ListItemData } from "@/types/types";
import ImageCard from "@/components/ui/custom/ItemsList/ListItem/ImageCard/ImageCard";
import ItemSummary from "@/components/ui/custom/ItemsList/ListItem/ItemSummary/ItemSummary";
import useScrollReveal from "@/hooks/useScrollReveal";

interface ListItemProps {
  itemData: ListItemData;
}

export default function ListItem({ itemData }: ListItemProps) {
  const revealItem = useRef<HTMLLIElement | null>(null);
  const pathname = usePathname();
  const rootRoute = pathname.startsWith("/blog") ? "blog" : "zabiegi";
  useScrollReveal(revealItem);

  return (
    <li
      className="grid gap-[50px] lg:gap-[100px] md:grid-cols-[1fr_2fr] place-items-start border-b-1 border-[var(--gray-75)] py-[50px]"
      ref={revealItem}
    >
      <ImageCard itemData={itemData} rootRoute={rootRoute} />
      <ItemSummary itemData={itemData} rootRoute={rootRoute} />
    </li>
  );
}
