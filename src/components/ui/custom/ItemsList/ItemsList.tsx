import ListItem from "./ListItem/ListItem";
import { ListItemData } from "@/types/types";

interface ItemsListProps {
  listItemsData: ListItemData[] | null;
  emptyMessage?: string;
}

export default function ItemsList({
  listItemsData,
  emptyMessage = "Lista jest pusta.",
}: ItemsListProps) {
  return listItemsData && listItemsData.length > 0 ? (
    <ul className="mx-auto w-full max-w-125 md:max-w-none">
      {listItemsData.map((item) => (
        <ListItem key={item._id} itemData={item} />
      ))}
    </ul>
  ) : (
    <p className="text-muted-foreground text-center">{emptyMessage}</p>
  );
}
