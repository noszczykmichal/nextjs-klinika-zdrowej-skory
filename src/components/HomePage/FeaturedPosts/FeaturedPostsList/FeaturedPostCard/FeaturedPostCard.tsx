import Image from "next/image";

import { PostDetails } from "@/types/types";
import { urlFor } from "@/utils/utilityFunctions";

interface FeaturedPostCardProps {
  featuredPost: Partial<PostDetails>;
}

export default function FeaturedPostCard({
  featuredPost,
}: FeaturedPostCardProps) {
  let imageUrl = "";
  let altValue = "";

  if (featuredPost.mainImage) {
    imageUrl = urlFor(featuredPost.mainImage)?.fit("max").url() || "";
  }

  if (featuredPost.altForMainImage) {
    altValue = featuredPost.altForMainImage;
  }
  console.log(featuredPost);

  return (
    <li className="relative w-[30%]">
      <div className="p-0 border-none aspect-square relative rounded-tl-[var(--big-border-radius)] rounded-br-[var(--big-border-radius)] overflow-hidden">
        <Image
          src={imageUrl}
          alt={altValue}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </li>
  );
}
