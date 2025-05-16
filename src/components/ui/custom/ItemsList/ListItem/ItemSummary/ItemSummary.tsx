import { ListItemData, TopLevelRoute } from "@/types/types";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";

interface ItemSummaryProps {
  itemData: ListItemData;
  rootRoute: TopLevelRoute;
}

export default function ItemSummary({ itemData, rootRoute }: ItemSummaryProps) {
  const { title, summary, slug, category } = itemData;
  const { categorySlug } = category;

  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-[17px] lg:text-[22px] font-medium">{title}</h3>
      <p className="text-justify text-[15px]">{summary}</p>
      <StyledButton
        href={`/${rootRoute}/${categorySlug.current}/${slug.current}`}
      >
        Więcej
      </StyledButton>
    </div>
  );
}
