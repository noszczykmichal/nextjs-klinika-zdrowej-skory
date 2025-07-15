import { ListItemData } from "@/types/types";
import TreatmentCard from "@/components/ui/custom/AnimatedArticle/FeaturedTreatments/TreatmentCard/TreatmentCard";

interface FeaturedTreatmentsProps {
  treatmentsData: ListItemData[];
}

export default function FeaturedTreatments({
  treatmentsData,
}: FeaturedTreatmentsProps) {
  return (
    <section>
      <h3 className="mb-[40px] w-fit border-b-1 border-[var(--orange-100)] pb-[12px] text-[24px] font-medium">
        Polecane zabiegi:
      </h3>
      <ul className="mb-[30px] flex flex-col gap-[20px]">
        {treatmentsData.map((treatment) => (
          <TreatmentCard cardData={treatment} key={treatment._id} />
        ))}
      </ul>
    </section>
  );
}
