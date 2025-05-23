import { useRef } from "react";
import Image from "next/image";

import { urlFor } from "@/utils/utilityFunctions";
import { ListItemData } from "@/types/types";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";
import useScrollReveal from "@/hooks/useScrollReveal";

interface TreatmentCardProps {
  cardData: ListItemData;
}

export default function TreatmentCard({ cardData }: TreatmentCardProps) {
  const { altForMainImage, mainImage, title, summary, category, slug } =
    cardData;
  const { categorySlug } = category;
  const imageUrl = urlFor(mainImage)!.fit("max").url() || "";

  const revealItem = useRef<HTMLLIElement>(null);
  useScrollReveal(revealItem);

  return (
    <li
      className="p-[25px] border-1 border-[var(--gray-75)] rounded-tl-[var(--medium-border-radius)] rounded-br-[var(--medium-border-radius)] shadow-[var(--navigation-box-shadow)]"
      ref={revealItem}
    >
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-[25px]">
        <div className="h-[200px] xxs:h-[300px] sm:h-[200px] md:h-[250px] lg:h-[200px] aspect-square rounded-tl-[var(--medium-border-radius)] relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={altForMainImage}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 30vw, (max-width: 1024px) 50vw, (min-width: 1025px) min(15vw, 200px)"
          />
        </div>
        <div className="sm:w-[70%] md:w-full lg:w-[70%] flex flex-col justify-between gap-[10px]">
          <h5 className="uppercase text-[19px] text-[var(--magenta-100)]">
            {title}
          </h5>
          <p className="text-[14px] text-justify">{summary}</p>
          <StyledButton
            href={`/zabiegi/${categorySlug.current}/${slug.current}`}
          >
            Więcej
          </StyledButton>
        </div>
      </div>
    </li>
  );
}
