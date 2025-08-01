import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { TopLevelRoute, ListItemData } from "@/types/types";
import { urlFor } from "@/utils/clientSideUtils";

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
      className="aspect-square w-full overflow-hidden rounded-[var(--big-border-radius)] shadow-[var(--custom-box-shadow)] lg:max-w-[300px]"
    >
      <Card className="aspect-square border-none p-0">
        <CardContent className="relative flex aspect-square items-center justify-center p-0">
          <Image
            src={imageUrl}
            alt={altForMainImage}
            fill
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, (min-width: 769px) min(30vw, 300px)"
          />

          <div className="absolute top-0 left-0 z-[2] flex h-full w-full flex-col justify-between bg-black/30 p-2">
            <p className="xxs:text-[15px] my-2 w-fit rounded-[var(--small-border-radius)] bg-[var(--pink-100)] px-2 text-[14px] whitespace-nowrap text-white">
              {categoryTitle}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
