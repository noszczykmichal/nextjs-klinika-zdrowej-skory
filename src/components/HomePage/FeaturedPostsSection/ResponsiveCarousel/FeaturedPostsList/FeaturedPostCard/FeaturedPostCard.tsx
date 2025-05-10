import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { PostDetails } from "@/types/types";
import { urlFor } from "@/utils/utilityFunctions";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";

interface FeaturedPostCardProps {
  featuredPost: Partial<PostDetails>;
}

export default function FeaturedPostCard({
  featuredPost,
}: FeaturedPostCardProps) {
  let imageUrl = "",
    altValue = "",
    title = "",
    postSlug = "",
    categorySlug = "";

  if (featuredPost.mainImage) {
    imageUrl = urlFor(featuredPost.mainImage)?.fit("max").url() || "";
  }

  if (featuredPost.altForMainImage) {
    altValue = featuredPost.altForMainImage;
  }

  if (featuredPost.title) {
    title = featuredPost.title;
  }

  if (featuredPost.slug) {
    postSlug = featuredPost.slug.current;
  }

  if (featuredPost.category && featuredPost.category.categorySlug) {
    categorySlug = featuredPost.category.categorySlug.current;
  }

  return (
    <CarouselItem className="pl-1 sm:basis-1/2 lg:basis-1/3">
      <div className="h-full p-1 sm:p-[17px]">
        <Card className="h-full p-0 rounded-none bg-transparent border-none shadow-none">
          <CardContent className="h-full flex flex-col justify-between p-0 relative">
            <div className="w-full p-0 border-none aspect-square relative rounded-tl-[var(--big-border-radius)] rounded-br-[var(--big-border-radius)] overflow-hidden">
              <Image
                src={imageUrl}
                alt={altValue}
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-[17px] lg:text-[22px] my-[40px] break-all xs:break-normal">
              {title}
            </h3>
            <StyledButton
              href={`/blog/${categorySlug}/${postSlug}`}
              text="Więcej"
            />
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
