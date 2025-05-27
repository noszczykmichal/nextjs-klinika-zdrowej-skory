import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { ListItemData } from "@/types/types";
import { urlFor } from "@/utils/utilityFunctions";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";

interface FeaturedPostCardProps {
  featuredPost: ListItemData;
}

export default function FeaturedPostCard({
  featuredPost,
}: FeaturedPostCardProps) {
  const { altForMainImage, title, category, slug: postSlug } = featuredPost;
  const { categorySlug } = category;
  const imageUrl = urlFor(featuredPost.mainImage)?.fit("max").url() || "";

  return (
    <CarouselItem className="pl-1 sm:basis-1/2 lg:basis-1/3">
      <div className="h-full p-1 sm:p-[17px]">
        <Card className="h-full p-0 rounded-none bg-transparent border-none shadow-none">
          <CardContent className="h-full flex flex-col justify-between gap-[40px] p-0 relative">
            <div className="p-0 border-none aspect-square relative rounded-tl-[var(--big-border-radius)] rounded-br-[var(--big-border-radius)] overflow-hidden">
              <Image
                src={imageUrl}
                alt={altForMainImage}
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, (min-width: 1025px) min(30vw, 385px)"
              />
            </div>
            <h3 className="min-h-[100px] text-[17px] lg:text-[22px] break-all xs:break-normal">
              {title}
            </h3>
            <StyledButton
              href={`/blog/${categorySlug.current}/${postSlug.current}`}
            >
              Więcej
            </StyledButton>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
