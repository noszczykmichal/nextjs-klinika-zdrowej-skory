import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
// import { client } from "@/sanity/client";
// import imageUrlBuilder from "@sanity/image-url";
// import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { PostDetails } from "@/types/types";

interface PostCardProps {
  postData: PostDetails;
  imgSrc: string;
}

// const { projectId, dataset } = client.config();

// const urlFor = (source: SanityImageSource) =>
//   projectId && dataset
//     ? imageUrlBuilder({ projectId, dataset }).image(source)
//     : null;

export default function PostCard({ postData, imgSrc }: PostCardProps) {
  // const imgSrc = urlFor(postData.mainImage)?.width(width).url();

  return (
    <Link key={postData._id} href={`/blog/${postData.slug.current}`}>
      <Card className="p-0 border-[var(--green-100)] rounded-[var(--big-border-radius)] overflow-hidden">
        <CardContent className="flex aspect-square items-center justify-center p-0 relative">
          {imgSrc && (
            <Image
              src={imgSrc}
              alt=""
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {postData.slug.current}
        </CardContent>
      </Card>
    </Link>
  );
}
