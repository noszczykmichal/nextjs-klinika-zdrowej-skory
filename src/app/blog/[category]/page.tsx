import { client } from "@/sanity/client";

import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import ItemsList from "@/components/ui/custom/ItemsList/ItemsList";
import { PostDetails } from "@/types/types";

const POSTS_BY_CATEGORY_QUERY = `*[
  _type == "post"
  && category->categorySlug.current==$category]|order(publishedAt desc)[0...12]{_id, altForMainImage, title, slug, mainImage, summary, category->{title, categorySlug}}`;

const options = { next: { revalidate: 30 } };

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const posts = await client.fetch<PostDetails[]>(
    POSTS_BY_CATEGORY_QUERY,
    await params,
    options,
  );

  const { title: categoryTitle } = posts[0].category;

  const routesData = [
    {
      routeName: "Blog",
      url: "/blog",
    },
    { routeName: `${categoryTitle}` },
  ];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <MainBanner headerText={`Kategoria: ${categoryTitle}`} />
      <ItemsList listItemsData={posts} />
    </LayoutWrapper>
  );
}
