import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import BannerWithSummary from "@/components/ui/custom/BannerWithSummary/BannerWithSummary";
import AsideNavigation from "@/components/ui/custom/AsideNavigation/AsideNavigation";
import AnimatedArticle from "@/components/ui/custom/AnimatedArticle/AnimatedArticle";
import { getCategoryPageData } from "@/utils/sanityPageData";
import { notFound } from "next/navigation";

export default async function TrainingCategoryPage({
  params,
}: {
  params: Promise<{ trainingCategory: string }>;
}) {
  const { trainingCategory } = await params;
  const pageData = await getCategoryPageData("training", trainingCategory);

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
      routeName: "Szkolenia",
      url: "/szkolenia",
    },
    { routeName: `${title}` },
  ];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <BannerWithSummary bannerData={bannerData} />
      <div className="grid max-w-[1300px] grid-cols-1 gap-[20px] md:grid-cols-[4fr__6fr] md:gap-[40px] lg:gap-[60px] xl:gap-[90px]">
        <AsideNavigation
          className="order-2 sm:order-1"
          currentCategory={trainingCategory}
          resourceType="training"
        />
        <AnimatedArticle
          articleContent={description}
          categoryResources={categoryResources}
          resourceType="training"
        />
      </div>
    </LayoutWrapper>
  );
}
