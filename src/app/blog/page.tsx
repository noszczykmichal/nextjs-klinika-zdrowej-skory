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
    <section className="">
      <MainBanner />
      <PostsList postsDetails={posts} />
    </section>
  );
}

export default Page;
