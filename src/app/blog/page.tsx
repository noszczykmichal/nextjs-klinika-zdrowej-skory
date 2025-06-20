import { client } from "@/sanity/client";

import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import ItemsList from "@/components/ui/custom/ItemsList/ItemsList";
import { ListItemData } from "@/types/types";
import blogPhoto from "@/assets/blog.jpg";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, altForMainImage, title, slug, mainImage, summary, category->{title, categorySlug}}`;

const options = { next: { revalidate: 30 } };

export default async function BlogPage() {
  const posts = await client.fetch<ListItemData[]>(POSTS_QUERY, {}, options);

  const routesData = [
    {
      routeName: "Blog",
    },
  ];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <MainBanner
        headerText="Blog"
        customImage={blogPhoto}
        customAlt="Olga Noszczyk uśmiechnięta, ubrana w czarną, błyszczącą stylizację, pozuje na tle zielonej rośliny w jasnym wnętrzu."
      />
      <ItemsList listItemsData={posts} />
    </LayoutWrapper>
  );
}
