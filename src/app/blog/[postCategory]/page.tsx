import { notFound } from "next/navigation";

import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import ItemsList from "@/components/ui/custom/ItemsList/ItemsList";
import { getPostsByCategory } from "@/utils/sanityPageData";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ postCategory: string }>;
}) {
  const { postCategory } = await params;

  const posts = await getPostsByCategory({ postCategorySlug: postCategory });

  if (posts.length === 0) {
    return notFound();
  }

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
