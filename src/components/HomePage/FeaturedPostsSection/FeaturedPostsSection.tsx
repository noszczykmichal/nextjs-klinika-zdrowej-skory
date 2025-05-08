import { client } from "@/sanity/client";

import { PostDetails } from "@/types/types";
import { ResponsiveCarousel } from "../ResponsiveCarousel/ResponsiveCarousel";
import FeaturedPostsHeader from "./FeaturedPostsHeader/FeaturedPostsHeader";

const RECENT_POST_QUERY = `*[_type=='post']|order(publishedAt desc)[0...3]{_id, title, mainImage, altForMainImage, slug, category->{categorySlug}}`;

const options = { next: { revalidate: 30 } };

export default async function FeaturedPostsSection() {
  const featuredPosts = await client.fetch<Partial<PostDetails>[]>(
    RECENT_POST_QUERY,
    {},
    options
  );

  // console.log(featuredPosts);
  return (
    <section className="flex flex-col gap-y-[50px] pb-[50px] max-w-[1300px]">
      <article className="px-[20px] py-[55px] flex flex-col gap-[50px] rounded-[var(--big-border-radius)] bg-[var(--gray-75)]">
        <FeaturedPostsHeader />
        <ResponsiveCarousel posts={featuredPosts} />
      </article>
    </section>
  );
}
