import { client } from "@/sanity/client";

import FeaturedPostsHeader from "./FeaturedPostsHeader/FeaturedPostsHeader";
import FeaturedPostsList from "./FeaturedPostsList/FeaturedPostsList";
import { PostDetails } from "@/types/types";

const RECENT_POST_QUERY = `*[_type=='post']|order(publishedAt desc)[0...3]{_id, title, mainImage, altForMainImage, slug, category->{categorySlug}}`;

const options = { next: { revalidate: 30 } };

export default async function FeaturedPosts() {
  const featuredPosts = await client.fetch<Partial<PostDetails>[]>(
    RECENT_POST_QUERY,
    {},
    options
  );

  // console.log(featuredPosts);
  return (
    <article className="px-[60px] py-[55px] flex flex-col items-center gap-[50px] bg-[var(--gray-75)] rounded-[var(--big-border-radius)]">
      <FeaturedPostsHeader />
      <FeaturedPostsList posts={featuredPosts} />
    </article>
  );
}
