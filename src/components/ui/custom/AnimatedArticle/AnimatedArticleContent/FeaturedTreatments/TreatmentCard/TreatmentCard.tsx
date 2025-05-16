import { RefObject } from "react";
import Image from "next/image";

import { urlFor } from "@/utils/utilityFunctions";
import { ListItemData } from "@/types/types";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";

interface TreatmentCardProps {
  cardData: ListItemData;
  ref: RefObject<HTMLLIElement | null>;
}

export default function TreatmentCard({ cardData, ref }: TreatmentCardProps) {
  const { altForMainImage, mainImage, title, summary, category, slug } =
    cardData;
  const { categorySlug } = category;
  const imageUrl = urlFor(mainImage)!.fit("max").url() || "";

  return (
    <li
      className="p-[25px] border-1 border-[var(--gray-75)] rounded-tl-[var(--medium-border-radius)] rounded-br-[var(--medium-border-radius)] shadow-[var(--navigation-box-shadow)]"
      ref={ref}
    >
      <div className="flex gap-[25px]">
        <div className="h-[200px] aspect-square rounded-tl-[var(--medium-border-radius)] relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={altForMainImage}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[70%] flex flex-col justify-between gap-[10px]">
          <h5 className="uppercase text-[19px] text-[var(--magenta-100)]">
            {title}
          </h5>
          <p className="text-[14px]">{summary}</p>
          <StyledButton
            href={`/zabiegi/${categorySlug.current}/${slug.current}`}
            className="text-[var(--magenta-100)] border-[var(--magenta-100)] before:bg-[var(--magenta-100)] hover:bg-[var(--magenta-100)]"
          >
            Więcej
          </StyledButton>
        </div>
      </div>
    </li>
  );
}
