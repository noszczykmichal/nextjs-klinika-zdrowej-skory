import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { PostDetails, CategoryDetails } from "@/types/types";

interface ImageCardProps {
  postData: PostDetails;
  categoryData: CategoryDetails;
}

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default function ImageCard({ postData, categoryData }: ImageCardProps) {
  const { mainImage, slug } = postData;
  const imageUrl = urlFor(mainImage)?.fit("max").url() || "";

  const { title: categoryTitle, categorySlug } = categoryData;

  return (
    <Link
      key={postData._id}
      href={`/blog/${categorySlug.current}/${slug.current}`}
      className="w-full lg:max-w-[300px] rounded-[var(--big-border-radius)] overflow-hidden shadow-[var(--custom-box-shadow)] aspect-square"
    >
      <Card className="p-0 border-none aspect-square">
        <CardContent className="flex aspect-square items-center justify-center p-0 relative">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <div className="absolute h-full w-full p-2 top-0 left-0 z-[2] flex flex-col justify-between bg-black/30">
            <div className="w-fit text-white px-2 m-2 bg-[var(--pink-100)] rounded-[var(--small-border-radius)]">
              {categoryTitle}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
