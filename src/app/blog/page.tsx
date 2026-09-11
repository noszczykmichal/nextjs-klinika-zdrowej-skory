import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import ItemsList from "@/components/ui/custom/ItemsList/ItemsList";
import blogPhoto from "@/assets/blog.jpg";
import { getAllPostData } from "@/utils/sanityPageData";

export default async function BlogPage() {
  const posts = await getAllPostData();

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
        customAlt="Olga Noszczyk w białym fartuchu medycznym przegląda atlas anatomii klinicznej twarzy z ilustracją struktur anatomicznych, w tle widoczne podręczniki medyczne na regale."
      />
      <ItemsList listItemsData={posts} />
    </LayoutWrapper>
  );
}
