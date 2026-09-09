import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import BannerWithSummary from "@/components/ui/custom/BannerWithSummary/BannerWithSummary";
import AsideNavigation from "@/components/ui/custom/AsideNavigation/AsideNavigation";
import AnimatedArticle from "@/components/ui/custom/AnimatedArticle/AnimatedArticle";
import { getCategoryPageData } from "@/utils/sanityPageData";
import { notFound } from "next/navigation";

export default async function TreatmentCategoryPage({
  params,
}: {
  params: Promise<{ treatmentCategory: string }>;
}) {
  const { treatmentCategory } = await params;
  const pageData = await getCategoryPageData("treatment", treatmentCategory);
  if (!pageData) {
    notFound();
  }

  const { categoryData, categoryResources, imageData } = pageData;
  const { title, description, altForMainImage, summary } = categoryData;

  const bannerData = {
    title,
    altForMainImage,
    imageData,
    summary,
  };

  const routesData = [
    {
      routeName: "Zabiegi",
      url: "/zabiegi",
    },
    { routeName: `${title}` },
  ];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <BannerWithSummary bannerData={bannerData} />
      <div className="grid max-w-325 grid-cols-1 gap-5 md:grid-cols-[4fr__6fr] md:gap-10 lg:gap-15 xl:gap-22.5">
        <AsideNavigation
          className="order-2 sm:order-1"
          currentCategory={treatmentCategory}
          resourceType="treatment"
        />
        <AnimatedArticle
          articleContent={description}
          categoryResources={categoryResources}
          resourceType="treatment"
        />
      </div>
    </LayoutWrapper>
  );
}
