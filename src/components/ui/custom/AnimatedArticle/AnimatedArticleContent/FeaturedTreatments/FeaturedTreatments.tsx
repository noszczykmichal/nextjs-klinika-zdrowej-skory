import { useRef } from "react";

import { ListItemData } from "@/types/types";
import TreatmentCard from "@/components/ui/custom/AnimatedArticle/AnimatedArticleContent/FeaturedTreatments/TreatmentCard/TreatmentCard";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function FeaturedTreatments({
  treatmentsData,
}: {
  treatmentsData: ListItemData[];
}) {
  const revealItem = useRef<HTMLLIElement>(null);
  useScrollReveal(revealItem);
  return (
    <section>
      <h3 className="w-fit text-[24px] font-medium border-b-1 border-[var(--orange-100)] mb-[40px] pb-[12px]">
        Polecane zabiegi:
      </h3>
      <ul className="flex flex-col gap-[20px] mb-[30px]">
        {treatmentsData.map((treatment) => (
          <TreatmentCard
            cardData={treatment}
            key={treatment._id}
            ref={revealItem}
          />
        ))}
      </ul>
    </section>
  );
}
