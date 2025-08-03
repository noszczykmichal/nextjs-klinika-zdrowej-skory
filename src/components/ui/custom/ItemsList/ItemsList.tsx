import ListItem from "./ListItem/ListItem";
import { ListItemData } from "@/types/types";

interface ItemsListProps {
  listItemsData: ListItemData[];
}

export default function ItemsList({ listItemsData }: ItemsListProps) {
  return (
    <ul className="mx-auto w-full max-w-[500px] md:max-w-none">
      {listItemsData.map((item) => (
        <ListItem key={item._id} itemData={item} />
      ))}
    </ul>
  );
}
