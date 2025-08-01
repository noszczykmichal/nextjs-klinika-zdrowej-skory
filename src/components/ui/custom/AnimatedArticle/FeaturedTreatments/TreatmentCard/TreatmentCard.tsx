import Image from "next/image";
import { RevealWrapper } from "next-reveal";

import { urlFor } from "@/utils/clientSideUtils";
import { ListItemData } from "@/types/types";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";

interface TreatmentCardProps {
  cardData: ListItemData;
}

export default function TreatmentCard({ cardData }: TreatmentCardProps) {
  const { altForMainImage, mainImage, title, summary, category, slug } =
    cardData;
  const { categorySlug } = category;
  const imageUrl = urlFor(mainImage)!.fit("max").url() || "";

  return (
    <RevealWrapper
      origin="bottom"
      distance="20px"
      duration={500}
      delay={200}
      viewFactor={0.25}
      easing="cubic-bezier(0.645, 0.045, 0.355, 1)"
    >
      <li className="rounded-tl-[var(--medium-border-radius)] rounded-br-[var(--medium-border-radius)] border-1 border-[var(--gray-75)] p-[25px] shadow-[var(--navigation-box-shadow)]">
        <div className="flex flex-col gap-[25px] sm:flex-row md:flex-col lg:flex-row">
          <div className="xxs:h-[300px] relative aspect-square h-[200px] overflow-hidden rounded-tl-[var(--medium-border-radius)] sm:h-[200px] md:h-[250px] lg:h-[200px]">
            <Image
              src={imageUrl}
              alt={altForMainImage}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 30vw, (max-width: 1024px) 50vw, (min-width: 1025px) min(15vw, 200px)"
            />
          </div>
          <div className="flex flex-col justify-between gap-[10px] sm:w-[70%] md:w-full lg:w-[70%]">
            <h5 className="text-[19px] text-[var(--magenta-100)] uppercase">
              {title}
            </h5>
            <p className="text-justify text-[14px]">{summary}</p>
            <StyledButton
              href={`/zabiegi/${categorySlug.current}/${slug.current}`}
            >
              Więcej
            </StyledButton>
          </div>
        </div>
      </li>
    </RevealWrapper>
  );
}
