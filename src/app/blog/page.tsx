import { client } from "@/sanity/client";

import { BreadcrumbBlog } from "@/components/BlogPage/BreadcrumbBlog/BreadcrumbBlog";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import ItemsList from "@/components/ui/custom/ItemsList/ItemsList";
import { ListItemData } from "@/types/types";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, altForMainImage, title, slug, mainImage, summary, category->{title, categorySlug}}`;

const options = { next: { revalidate: 30 } };

export default async function BlogPage() {
  const posts = await client.fetch<ListItemData[]>(POSTS_QUERY, {}, options);

  return (
    <>
      <BreadcrumbBlog className="breadcrumb-wrapper flex justify-start w-full max-w-[1300px] py-[20px] mx-auto" />
      <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
          <MainBanner headerText="Blog" />
          <ItemsList listItemsData={posts} />
        </section>
      </main>
    </>
  );
}
