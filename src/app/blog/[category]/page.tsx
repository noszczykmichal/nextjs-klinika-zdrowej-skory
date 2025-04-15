import { client } from "@/sanity/client";

import { BreadcrumbCategoryPage } from "@/components/BlogPage/Category/BreadcrumbCategoryPage/BreadcrumbCategoryPage";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import PostsList from "@/components/BlogPage/PostsList/PostsList";
import { PostDetails } from "@/types/types";

const POSTS_BY_CATEGORY_QUERY = `*[
  _type == "post"
  && category->categorySlug.current==$category]|order(publishedAt desc)[0...12]{_id, title, slug, mainImage, summary, category->{title, categorySlug}}`;

const options = { next: { revalidate: 30 } };

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const posts = await client.fetch<PostDetails[]>(
    POSTS_BY_CATEGORY_QUERY,
    await params,
    options
  );

  const { title } = posts[0].category;
  return (
    <>
      <BreadcrumbCategoryPage
        category={title}
        className="w-full max-w-[1300px] flex py-[20px] px-[25px] md:px-[42px] mx-auto"
      />
      <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
          <MainBanner headerText={`Kategoria: ${title}`} />
          <PostsList postsDetails={posts} />
        </section>
      </main>
    </>
  );
}
