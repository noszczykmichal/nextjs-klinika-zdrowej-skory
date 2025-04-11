import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { PostDetails } from "@/types/types";
import { CategoryDetails } from "@/types/types";

interface PostCardProps {
  postData: PostDetails;
}

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const AUTHOR_QUERY = (searchedAuthorRef: string) =>
  `*[_type == "author" && _id == "${searchedAuthorRef}"][0]{name}`;

const CATEGORY_QUERY = (searchCategoryRef: string) =>
  `*[_type=="category" && _id=="${searchCategoryRef}"][0]{title, categorySlug}`;

const options = { next: { revalidate: 30 } };

const formatDate = (isoString: string, locale: string = "pl-PL") => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default async function PostCard({ postData }: PostCardProps) {
  const {
    mainImage,
    author,
    category: postCategory,
    publishedAt,
    slug,
  } = postData;
  const imageUrl = urlFor(mainImage)?.fit("max").url() || "";
  const postAuthor = await client.fetch<{ name: string }>(
    AUTHOR_QUERY(author._ref),
    {},
    options
  );

  const { title: categoryTitle, categorySlug } =
    await client.fetch<CategoryDetails>(
      CATEGORY_QUERY(postCategory._ref),
      {},
      options
    );

  const fullDate = formatDate(publishedAt);

  return (
    <li className="w-full rounded-[var(--big-border-radius)] overflow-hidden shadow-[var(--custom-box-shadow)] lg:transition-transform lg:hover:translate-y-[-10px] lg:ease-in-out lg:duration-[0.5s]">
      <Link
        key={postData._id}
        href={`/blog/${categorySlug.current}/${slug.current}`}
      >
        <Card className="p-0 border-none">
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
              <div className="h-[50%] sm:h-[60%] lg:h-[80%] xl:h-[60%] flex flex-col justify-between items-center">
                <h3 className="text-center font-semibold text-white drop-shadow-lg postCard-heading">
                  {postData.title}
                </h3>
                <div className="w-[90%] flex justify-between text-white mb-[10px] postCard-footnotes">
                  <p>{fullDate}</p>
                  <p className="ml-[5px]">{postAuthor.name}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
