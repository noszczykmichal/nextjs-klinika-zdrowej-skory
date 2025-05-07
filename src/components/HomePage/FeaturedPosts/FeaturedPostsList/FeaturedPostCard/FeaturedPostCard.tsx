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

  console.log(featuredPost);

  return (
    <li className="relative w-[30%] flex flex-col justify-between">
      <div className="p-0 border-none aspect-square relative rounded-tl-[var(--big-border-radius)] rounded-br-[var(--big-border-radius)] overflow-hidden">
        <Image
          src={imageUrl}
          alt={altValue}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-[22px] my-[40px]">{title}</h3>
      <StyledButton href={`/blog/${categorySlug}/${postSlug}`} text="Więcej" />
    </li>
  );
}
