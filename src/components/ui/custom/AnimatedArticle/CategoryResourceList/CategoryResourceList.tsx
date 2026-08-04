import { ListItemData, ResourceType } from "@/types/types";
import ResourceCard from "@/components/ui/custom/AnimatedArticle/CategoryResourceList/ResourceCard/ResourceCard";

interface CategoryResourceListProps {
  resources: ListItemData[];
  resourceType: ResourceType;
}

export default function CategoryResourceList({
  resources,
  resourceType,
}: CategoryResourceListProps) {
  const header =
    resourceType === "treatment"
      ? "Polecane zabiegi:"
      : "Szkolenia z tej kategorii:";

  return (
    <section>
      <h3 className="mb-[40px] w-fit border-b-1 border-[var(--orange-100)] pb-[12px] text-[24px] font-medium">
        {header}
      </h3>
      <ul className="mb-[30px] flex flex-col gap-[20px]">
        {resources.map((resource) => (
          <ResourceCard
            cardData={resource}
            key={resource._id}
            resourceType={resourceType}
          />
        ))}
      </ul>
    </section>
  );
}
