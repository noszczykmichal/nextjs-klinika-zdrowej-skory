import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { TopLevelRoute, ListItemData } from "@/types/types";
import { urlFor } from "@/utils/utilityFunctions";

interface ImageCardProps {
  itemData: ListItemData;
  rootRoute: TopLevelRoute;
}

export default function ImageCard({ itemData, rootRoute }: ImageCardProps) {
  const { mainImage, slug, category, altForMainImage } = itemData;
  const imageUrl = urlFor(mainImage)?.fit("max").url() || "";
  const { title: categoryTitle, categorySlug } = category;

  return (
    <Link
      key={itemData._id}
      href={`/${rootRoute}/${categorySlug.current}/${slug.current}`}
      className="w-full lg:max-w-[300px] rounded-[var(--big-border-radius)] overflow-hidden shadow-[var(--custom-box-shadow)] aspect-square"
    >
      <Card className="p-0 border-none aspect-square">
        <CardContent className="flex aspect-square items-center justify-center p-0 relative">
          <Image
            src={imageUrl}
            alt={altForMainImage}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, (min-width: 769px) min(30vw, 300px)"
          />

          <div className="absolute h-full w-full p-2 top-0 left-0 z-[2] flex flex-col justify-between bg-black/30">
            <p className="w-fit whitespace-nowrap text-[14px] xxs:text-[15px] text-white px-2 my-2 bg-[var(--pink-100)] rounded-[var(--small-border-radius)]">
              {categoryTitle}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
