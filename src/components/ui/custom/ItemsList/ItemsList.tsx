"use client";

import dynamic from "next/dynamic";

import { ListItemData } from "@/types/types";

const ListItem = dynamic(
  () => import("@/components/ui/custom/ItemsList/ListItem/ListItem"),
  { ssr: false }
);

interface ItemsListProps {
  listItemsData: ListItemData[];
}

export default function ItemsList({ listItemsData }: ItemsListProps) {
  return (
    <ul className="w-full max-w-[500px] md:max-w-none mx-auto ">
      {listItemsData.map((item) => (
        <ListItem key={item._id} itemData={item} />
      ))}
    </ul>
  );
}
