import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { ListItemData } from "@/types/types";
import { urlFor } from "@/utils/clientSideUtils";
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
    <CarouselItem className="pl-4 sm:basis-1/2 lg:basis-1/3">
      <div className="h-full sm:p-4.25">
        <Card className="h-full rounded-none border-none bg-transparent p-0 shadow-none">
          <CardContent className="relative flex h-full min-w-0 flex-col justify-between gap-10 p-0">
            <div className="rounded-tl-big rounded-br-big relative aspect-square overflow-hidden border-none p-0">
              <Image
                src={imageUrl}
                alt={altForMainImage}
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, (min-width: 1025px) min(30vw, 385px)"
              />
            </div>
            <h3
              lang="pl"
              className="min-h-25 min-w-0 text-[17px] wrap-anywhere hyphens-auto lg:text-[22px]"
            >
              {title}
            </h3>
            <StyledButton
              href={`/blog/${categorySlug.current}/${postSlug?.current}`}
              aria-label={`Przeczytaj o: ${title}`}
            >
              Więcej
            </StyledButton>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
