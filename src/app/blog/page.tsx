import { client } from "@/sanity/client";

import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import PostsList from "@/components/Blog/PostsList/PostsList";
import { PostDetails } from "@/types/types";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, mainImage}`;

const options = { next: { revalidate: 30 } };

async function Page() {
  const posts = await client.fetch<PostDetails[]>(POSTS_QUERY, {}, options);
  return (
    <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
      <MainBanner headerText="Blog" />
      <PostsList postsDetails={posts} />
    </section>
  );
}

export default Page;
