import { client } from "@/sanity/client";

import { ListItemData } from "@/types/types";
import { ResponsiveCarousel } from "@/components/HomePage/FeaturedPostsArticle/ResponsiveCarousel/ResponsiveCarousel";
import FeaturedPostsHeader from "@/components/HomePage/FeaturedPostsArticle/FeaturedPostsHeader/FeaturedPostsHeader";

const RECENT_POSTS_QUERY = `*[_type=='post']|order(publishedAt desc)[0...3]{_id, title, mainImage, altForMainImage, slug, category->{categorySlug}}`;

const options = { next: { revalidate: 30 } };

export default async function FeaturedPostsSection() {
  const featuredPosts = await client.fetch<ListItemData[]>(
    RECENT_POSTS_QUERY,
    {},
    options,
  );

  return (
    <article className="flex w-full flex-col gap-[50px] rounded-[var(--big-border-radius)] bg-[var(--gray-75)] px-[20px] py-[55px]">
      <FeaturedPostsHeader />
      <ResponsiveCarousel posts={featuredPosts} />
    </article>
  );
}
